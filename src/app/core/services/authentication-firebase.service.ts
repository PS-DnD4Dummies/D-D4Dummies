import { Injectable, inject } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';
import { error } from 'console';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationFirebaseService {


  constructor(private auth:Auth) {
    //this.authStatusListener();
  }

  currentUser!:any ;
  private authStatusSub = new BehaviorSubject(this.currentUser);
  currentAuthStatus = this.authStatusSub.asObservable();

  //https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithemailandpassword
  async login(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      return user;
    } catch (error) {
      console.log("Error al iniciar sesión con email y contraseña. Error: " + error);
      return null;
    }
  }

  //https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
  async signUp(email: string, password: string): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      return user;
    } catch (error) {
      console.log("Error al registrar un usuario. Error: " + error);
      return null;
    }
  }

  //https://medium.com/@anichidera/managing-auth-state-in-your-angular-firebase-app-c08d62cf3f43
  /*USAGE:  this.auth.authStatusListener();
            this.auth.currentAuthStatus.subscribe(authStatus => console.log(authStatus));
  */
  authStatusListener(){
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        //const uid = user.uid;
        this.authStatusSub.next(user);
      } else {
        this.authStatusSub.next(null);
        console.log('Usuario no está registrado');
      }
    });
  }

  //USAGE: this.auth.signOut();
  async signOut(){
    try {
      await this.auth.signOut();
      console.log("El usuario ha cerrado sesión correctamenta");
    } catch (error) {
      console.log("Error al cerrar sesión. Error: " + error);
    }
  }



    



}
