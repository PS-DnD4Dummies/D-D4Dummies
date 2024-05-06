import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, setDoc, updateDoc, query, limit, startAt, getCountFromServer } from '@angular/fire/firestore';
import { BaseClass, Character, Comment, Post, User } from '@data/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore:Firestore) { }

  //this.firestore.addUser(this.user).then(result=>console.log(result));
  async addUser(user:User): Promise<boolean>{
    if(!user.birthdate) user.birthdate = new Date();
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

  mapToObject(map: Map<string, number>): {[key: string]: number} {
    const obj: {[key: string]: number} = {};
    map.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
  }

  async addCharacter(uid:string,character:Character): Promise<boolean>{

    const characterData = {
      ...character,
      stats: this.mapToObject(character.stats),
      skillModifiers: this.mapToObject(character.skillModifiers),
      skillOptions: this.mapToObject(character.skillOptions)
    };

    return await setDoc(doc(this.firestore,"users",uid,"characters",characterData.name),characterData).then( () => {
      console.log("Escritura en firestore de manera correcta");
      return true;
    }).catch(error=>{
      console.log("Error al escribir en firestore. Error: "+error);
      return false;
    })
  }

  async deleteCharacter(uid:string,characterName:string): Promise<boolean>{
    return await deleteDoc(doc(this.firestore,"users",uid,"characters",characterName))
      .then( () => {
        console.log("Borrado en firestore de manera correcta");
        return true;
      }).catch(error=>{
        console.log("Error al borrar en firestore. Error: "+error);
        return false;
      })
  }


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

  async readGlossarySection(section:string): Promise<{ title: string; value: any }[] | null>{
    try {
      const docSnap = await getDoc(doc(this.firestore, "glossarySections", section));
      if (docSnap.exists()) {
        console.log("Lectura en firestore de manera correcta");
        const data = docSnap.data();
        const fieldsArray = Object.keys(data).map((key) => ({
          title: key,
          value: data[key]
        }));
        return fieldsArray;
      } else {
        console.log("Lectura en firestore de manera incorrecta");
        return null;
      }
    } catch (error) {
      console.log("Error al leer de firestore. Error: " + error);
      return null;
    }
  }

  async readClass(className:string): Promise<BaseClass|null>{
    return await getDoc(doc(this.firestore,"classes",className))
      .then( (docSnap) => {
        if (docSnap.exists()) {
          console.log("Lectura en firestore de manera correcta");
          return docSnap.data() as BaseClass;
        } else {
          console.log("Lectura en firestore de manera incorrecta");
          return null;
        }
      }).catch(error=>{
        console.log("Error al actualizar en firestore. Error: "+error);
        return null;
      })
  }


  async addPost(post:Post): Promise<boolean>{

    return await addDoc(collection(this.firestore,"posts"),post).then( () => {
      console.log("Escritura en firestore de manera correcta");
      return true;
    }).catch(error=>{
      console.log("Error al escribir en firestore. Error: "+error);
      return false;
    })
  }

  async addComment(comment:Comment,postId:string): Promise<boolean>{

    return await addDoc(collection(this.firestore,"posts",postId,"comments"),comment).then( () => {
      console.log("Escritura en firestore de manera correcta");
      return true;
    }).catch(error=>{
      console.log("Error al escribir en firestore. Error: "+error);
      return false;
    })
  }

  async getComments(id:string): Promise<Comment[]|null>{

    const commentRef = collection(this.firestore, "posts",id,"comments");
    const q = query(commentRef);

    return await getDocs(q).then( (querySnapshot) => {
      console.log("Lectura en firestore de manera correcta");
      const comments : Comment[] = [];
      querySnapshot.forEach((doc)=>{
        let comment = doc.data() as Comment;
        comments.push(comment);
        console.log(comment);
        
      })
      return comments;
    }).catch(error=>{
      console.log("Error al leer en firestore. Error: "+error);
      return null;
    })
  }

  async getPost(postId:string): Promise<Post|null>{

    return await getDoc(doc(this.firestore,"posts",postId)).then( (docSnap) => {
      if (docSnap.exists()) {
        console.log("Lectura en firestore de manera correcta");
        return docSnap.data() as Post;
      } else {
        console.log("Lectura en firestore de manera incorrecta");
        return null;
      }
    }).catch(error=>{
      console.log("Error al leer en firestore. Error: "+error);
      return null;
    })
  }

  async getFirstsPosts(numberOfPosts:number): Promise<Post[]|null>{

    const postsRef = collection(this.firestore, "posts");
    const q = query(postsRef,orderBy("timestamp","desc"),limit(numberOfPosts))

    return await getDocs(q).then( (querySnapshot) => {
      console.log("Lectura en firestore de manera correcta");
      const posts : Post[] = [];
      querySnapshot.forEach((doc)=>{
        let post = doc.data() as Post;
        post.id = doc.id;
        posts.push(post);
        console.log(post);
        
      })
      return posts;
    }).catch(error=>{
      console.log("Error al leer en firestore. Error: "+error);
      return null;
    })
  }

  async getNextPosts(numberOfPosts:number,lastPostTimestamp:Date): Promise<Post[]|null>{

    const postsRef = collection(this.firestore, "posts");
    const q = query(postsRef,orderBy("timestamp","desc"),limit(numberOfPosts),startAt(lastPostTimestamp))

    return await getDocs(q).then( (querySnapshot) => {
      console.log("Lectura en firestore de manera correcta");
      const posts : Post[] = [];
      querySnapshot.forEach((doc)=>{
        posts.push(doc.data() as Post);
      })
      return posts;
    }).catch(error=>{
      console.log("Error al leer en firestore. Error: "+error);
      return null;
    })
  }

  async getNumberOfPost(): Promise<number|null>{
    const postsRef = collection(this.firestore, "posts");
    return await getCountFromServer(postsRef).then((querySnapshot)=>{
      return querySnapshot.data().count;
    }).catch(error=>{
      console.log("Error al leer la cantidad de documentos en firestore. Error: "+error);
      return null;
    })
  }

}
