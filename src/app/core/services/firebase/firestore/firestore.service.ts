import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';
import { Character, User } from '@data/interfaces';
import { Observable } from 'rxjs';

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
  async readUser(uid:string): Promise<User|null>{
    return await getDoc(doc(this.firestore,"users",uid))
      .then( (docSnap) => {
        if (docSnap.exists()) {
          console.log("Lectura en firestore de manera correcta");
          return docSnap.data() as User;
        } else {
          console.log("Lectura en firestore de manera incorrecta");
          return null;
        }
      }).catch(error=>{
        console.log("Error al actualizar en firestore. Error: "+error);
        return null;
      })
  }

  readRealTimeUser(uid: string): Observable<any> {
    return new Observable((subscriber) => {
      const unsubscribe = onSnapshot(doc(this.firestore, "users", uid),
        (doc) => {
          if (doc.exists()) {
            subscriber.next(doc.data());
          } else {
            subscriber.error("User not found");
          }
        },
        (error) => {
          subscriber.error(error);
        }
      );

      // Cleanup on unsubscribe
      return () => unsubscribe();
    });
  }


  /*character:Character = {
      name: 'pepe',
      class: Class.Barbarian,
      race: Race.Dragonborn,
      subrace: '',
      alignment: Alignment.Chaotic_evil,
      backgroud: '',
      skills: Skill.Acrobatics,
      abilityScore: {
        Charisma: 0,
        Constitution: 0,
        Dexterity: 0,
        Inteligence: 0,
        Strength: 0,
        Wisdom: 0
      }
    }*/
  //this.firestore.addCharacter("puta",this.character).then(result=>console.log(result));
  async addCharacter(uid:string,character:Character): Promise<boolean>{
    return await addDoc(collection(this.firestore,"users",uid,"characters"),{
      ...character
    }).then( () => {
      console.log("Escritura en firestore de manera correcta");
      return true;
    }).catch(error=>{
      console.log("Error al escribir en firestore. Error: "+error);
      return false;
    })
  }

  //this.firestore.deleteCharacter("puta","sWiK1xdy8xD6EuXaj5vb").then(result=>console.log(result));
  async deleteCharacter(uid:string,characterID:string): Promise<boolean>{
    return await deleteDoc(doc(this.firestore,"users",uid,"characters",characterID))
      .then( () => {
        console.log("Borrado en firestore de manera correcta");
        return true;
      }).catch(error=>{
        console.log("Error al borrar en firestore. Error: "+error);
        return false;
      })
  }


  /*this.firestore.updateCharacter("puta","sWiK1xdy8xD6EuXaj5vb",{abilityScore: {
      Charisma: 0,
      Constitution: 1,
      Dexterity: 0,
      Inteligence: 0,
      Strength: 0,
      Wisdom: 0
    }}).then(result=>console.log(result));*/
  async updateCharacter(uid:string,characterID:string,fieldsToUpdate:any): Promise<boolean>{
    return await updateDoc(doc(this.firestore,"users",uid,"characters",characterID),{...fieldsToUpdate})
      .then( () => {
        console.log("Actualizado en firestore de manera correcta");
        return true;
      }).catch(error=>{
        console.log("Error al actualizar en firestore. Error: "+error);
        return false;
      })
  }

  async readCharacter(uid:string,characterID:string): Promise<Character|null>{
    return await getDoc(doc(this.firestore,"users",uid,"characters",characterID))
      .then( (docSnap) => {
        if (docSnap.exists()) {
          console.log("Lectura en firestore de manera correcta");
          return docSnap.data() as Character;
        } else {
          console.log("Lectura en firestore de manera incorrecta");
          return null;
        }
      }).catch(error=>{
        console.log("Error al actualizar en firestore. Error: "+error);
        return null;
      })
  }

  //this.firestore.readAllCharacters("puta").then(result=>console.log(result));
  async readAllCharacters(uid:string): Promise<Character[]|null>{
    return await getDocs(collection(this.firestore,"users",uid,"characters"))
      .then( (querySnapshot) => {
        console.log("Lectura en firestore de manera correcta");
        const characters : Character[] = [];
        querySnapshot.forEach((doc)=>{
          characters.push(doc.data() as Character);
        })
        return characters;
      }).catch(error=>{
        console.log("Error al actualizar en firestore. Error: "+error);
        return null;
      })
  }



}
