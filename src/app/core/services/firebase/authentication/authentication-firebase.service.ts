import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, User, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile, updatePassword, updateEmail, FacebookAuthProvider } from '@angular/fire/auth';
import { defaultProfilePhotoURL } from '@data/constanst/url';
import { error } from 'console';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User as Usuario } from '@data/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationFirebaseService {


  constructor(private auth:Auth) {
    this.authStatusListener();
  }

  isAuthenticated(): boolean { //saber si esta autenticado
    return this.auth.currentUser !== null;
  }

  currentUser!:any ;
  private authStatusSub = new BehaviorSubject(this.currentUser);
  currentAuthStatus = this.authStatusSub.asObservable();

  //https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithemailandpassword
  async signIn(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      return user;
    } catch (error) {
      console.log("Error al iniciar sesión con email y contraseña. Error: " + error);
      return null;
    }
  }



  async signInWithGoogle(): Promise <any> {
    try{
      var provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      const result = await signInWithPopup(this.auth,provider);
      const user = result.user;
      // This gives you a Google Access Token.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      return user;
    }catch(error){
      console.log("Error al iniciar sesión con google. Error: "+ error);
    }
  }


  async signInWithFacebook(): Promise <any> {
    try{
      var provider = new FacebookAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      const result = await signInWithPopup(this.auth,provider);
      const user = result.user;
      // This gives you a Google Access Token.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      return user;
    }catch(error){
      console.log("Error al iniciar sesión con google. Error: "+ error);
    }
  }




  //https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
  async signUp(email: string, password: string): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      this.emailVerification(user);

      return user;
    } catch (error) {
      console.log("Error al registrar un usuario. Error: " + error);
      return null;
    }
  }

  emailVerification(user:User){
    sendEmailVerification(user).then(result => {
      console.log(result);

    }).catch(error=>{
      console.log("Error al mandar el correo de verificación. Error: "+error);

    })
  }

  //https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#sendpasswordresetemail
  resetPasword(email:string){
     sendPasswordResetEmail(this.auth,email).then(result=>{
       console.log(result);
       alert("Correo mandado a "+ email);
     }).catch(error=>{
       console.log("Error al mandar el correo de resetear contraseña. Error: "+error);
     })
  }

  //https://medium.com/@anichidera/managing-auth-state-in-your-angular-firebase-app-c08d62cf3f43
  /*USAGE:  this.auth.authStatusListener(); (se puede obviar si se pone en el constructor de este servicio)
            this.auth.currentAuthStatus.subscribe(authStatus => console.log(authStatus));
  */
  authStatusListener(){
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        //const uid = user.uid;
        /*const usuario : Usuario = {
          uid: user.uid,
          email: user.email!,
          photoURL: user.photoURL!
        }*/
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


  //https://firebase.google.com/docs/auth/web/manage-users?hl=es-419
  async updateProfile(user:User,displayName?:string,photoURL?:string): Promise<boolean>{
    return await updateProfile(user,{
      displayName: displayName!=undefined? displayName:user.displayName,
      photoURL:photoURL!=undefined? photoURL:user.photoURL,
    }).then( () => {
      //console.log(photoURL);
      console.log("El usuario ha modificado el perfil correctamenta");
      return true;
    }).catch(error=>{
      console.log("Error al actualizar el perfil. Error: " + error);
      return false;
    })
  }

  async updatePassword(newPassword: string) {
    if (this.auth.currentUser) {
      await updatePassword(this.auth.currentUser, newPassword).then(() => {
        console.log('Contraseña actualizada con éxito.');

      }).catch((error: any) => {
        console.error('Error al actualizar la contraseña:', error);

      });
    } else {
      console.log('No hay usuario autenticado.');

    }
  }


}
