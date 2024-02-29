import { Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { User } from '@data/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore:Firestore) { }

  //this.firestore.addUser(this.user).then(result=>console.log(result));
  async addUser(user:User): Promise<boolean>{
    return await setDoc(doc(this.firestore,"users",user.uid),{
      ...user
    }).then( () => {
      console.log("Escritura en firestore de manera correcta");
      return true;
    }).catch(error=>{
      console.log("Error al escribir en firestore. Error: "+error);
      return false;
    })
  }

  //this.firestore.deleteUser(this.user).then(result=>console.log(result));
  async deleteUser(user:User): Promise<boolean>{
    return await deleteDoc(doc(this.firestore,"users",user.uid))
      .then( () => {
        console.log("Borrado en firestore de manera correcta");
        return true;
      }).catch(error=>{
        console.log("Error al borrar en firestore. Error: "+error);
        return false;
      })
  }

  //this.firestore.updateUser(this.user,{email:"pepe23a"}).then(result=>console.log(result));
  async updateUser(user:User,fieldsToUpdate:any): Promise<boolean>{
    return await updateDoc(doc(this.firestore,"users",user.uid),{...fieldsToUpdate})
      .then( () => {
        console.log("Actualizado en firestore de manera correcta");
        return true;
      }).catch(error=>{
        console.log("Error al actualizar en firestore. Error: "+error);
        return false;
      })
  }

  //this.firestore.readUser(this.user.uid).then(result=>console.log(result));
  async readUser(uid:string): Promise<any>{
    return await getDoc(doc(this.firestore,"users",uid))
      .then( (docSnap) => {
        if (docSnap.exists()) {
          console.log("Lectura en firestore de manera correcta");
          return docSnap.data();
        } else {
          console.log("Lectura en firestore de manera incorrecta");
          return null;
        }
      }).catch(error=>{
        console.log("Error al actualizar en firestore. Error: "+error);
        return null;
      })
  }
}
