import { Injectable } from '@angular/core';
import { DocumentData, Firestore, QuerySnapshot, addDoc, arrayUnion, collection, collectionData, doc, docData, getDocs,orderBy,query,updateDoc,where } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Message } from '../models/message';
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

  getMessages(): Observable<Message[]> {
    const data = query(collection(this.firestore, 'messages'), orderBy('time', 'asc'));
    return collectionData<any>(data)
    .pipe(map( (messages : Message[]) => {
        return messages.map( (message : any) => ({
          username: message.username,
          message: message.message,
          time: message.time.toDate(),
          section: message.section
        }));
      })
    ) as Observable<Message[]>
  }

  sendMessage(username : string, message: string, section:string) : void
  {
    try {
      const date = new Date();
      addDoc(collection(this.firestore,"messages"),{
        username: username,
        message: message,
        time: date,
        section:section
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

}
