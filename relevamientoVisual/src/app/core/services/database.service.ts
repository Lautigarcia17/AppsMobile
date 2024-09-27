import { Injectable } from '@angular/core';
import { DocumentData, Firestore, QuerySnapshot, addDoc, arrayUnion, collection, collectionData, doc, docData, getDocs,orderBy,query,updateDoc,where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public firestore: Firestore) { }

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

  saveScore(name : string, date:Date, time:number, mode:string) : void{
    try{
      addDoc(collection(this.firestore,"scores"),{
        name: name,
        date: date,
        time: time,
        mode:mode
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

  getScores(): Observable<any> {
    const data = query(collection(this.firestore, 'scores'), orderBy('time', 'asc'));
    return collectionData<any>(data);
  }


}
