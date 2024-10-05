import { Injectable } from '@angular/core';
import { DocumentData, Firestore, QuerySnapshot, addDoc, arrayUnion, collection, collectionData, doc, docData, getDocs,orderBy,query,updateDoc,where } from '@angular/fire/firestore';

import { ref, uploadBytes,Storage, getDownloadURL } from '@angular/fire/storage';
import { UtilitiesService } from './utilities.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public firestore: Firestore, private storage : Storage, private utilities : UtilitiesService) { }

  saveUser(name : string, email:string, password:string) : void{
    try{
      addDoc(collection(this.firestore,"users"),{
        name: name,
        email: email,
        password: password,
      });
    }catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  
  
  savePhoto(user : string,image : string,type:string) : void{
    try{
      addDoc(collection(this.firestore,"photos"),{
        day: this.utilities.getCurrentDate(),
        time: this.utilities.getCurrentHourMinute(),
        user: user,
        image: image,
        type: type,
        votes: []
      });
    }catch (error) {
      console.error("Error adding document: ", error);
    }
  }


  findUsernameDatabase(email: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let username = "";

      getDocs(collection(this.firestore, 'users'))
        .then((querySnapshot: QuerySnapshot<DocumentData>) => {
          querySnapshot.forEach((document) => {
            if (email == document.data()['email']) {
              username = document.data()['name']
              resolve(username);
            }
          })
          resolve(username);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
          reject(error);
        })
    })
  }

  
  async uploadImage(file : any, path : string) : Promise<string>{

    let blod = this.utilities.dataUrlToBlob(file);
    const imgRef = ref(this.storage, 'images/' + path);

    try {
      await uploadBytes(imgRef, blod);
      const downloadURL = await getDownloadURL(imgRef);
      return downloadURL;
    } catch (error) {
      console.log(error);
      throw error; 
    }
  }


  getPhotosDatabase(): Observable<any[]> {
    const photosRef = collection(this.firestore, 'photos');
  
    return collectionData(photosRef, {idField : 'id'}).pipe(
      map(photos => photos.sort((a : any, b : any) => {
        const dateA = new Date(a.day.split('/').reverse().join('-') + 'T' + a.time);
        const dateB = new Date(b.day.split('/').reverse().join('-') + 'T' + b.time);
        
     
        return dateB.getTime() - dateA.getTime();
      }))
    );
  }

  updateLikePhoto(id: string, user: string, like: boolean) {
    try {
      const photosRef = collection(this.firestore, 'photos');
      getDocs(query(photosRef))
        .then((querySnapshot: QuerySnapshot<DocumentData>) => {
          querySnapshot.forEach((doc: any) => {
            if (doc.id === id) {
              const votes = doc.data().votes || [];  // Obtener el array 'votes'
  
              let updatedVotes;
  
              if (like) {

                  updatedVotes = [...votes, user];
           
              } else {
                // Si es un 'dislike', remover el usuario del array
                updatedVotes = votes.filter((voteUser: string) => voteUser !== user);
              }
  
              // Actualizar el documento con el array 'votes' modificado
              updateDoc(doc.ref, { votes: updatedVotes })
                .then(() => {
                  console.log('Vote updated successfully');
                })
                .catch((error) => {
                  console.error('Error updating vote: ', error);
                });
            }
          });
        })
        .catch((error) => {
          console.error('Error fetching photos: ', error);
        });
    } catch (error) {
      console.error('Error updating vote: ', error);
    }
  }



}
