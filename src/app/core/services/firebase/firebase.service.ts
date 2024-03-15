import { Injectable } from '@angular/core';
import { AuthenticationFirebaseService } from './authentication/authentication-firebase.service';
import { FirestoreService } from './firestore/firestore.service';
import { CloudStorageService } from './cloud-storage/cloud-storage.service';
import { User } from '@data/interfaces';
import { defaultProfilePhotoURL } from '@data/constanst/url';
import { UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private authService:AuthenticationFirebaseService,
    private firestoreService:FirestoreService,
    private cloudStorageService:CloudStorageService
  ) { }

  


  async signUpProcess(email: string, username: string, password: string, birthdate: string, photo: File | null): Promise<Boolean> {
    const signUpCheck = await this.authService.signUp(email, password);
    if (signUpCheck === null) return false;
  
    let profilePhotoURL:string = defaultProfilePhotoURL;
  
    if (photo !== null) {
      try {
        profilePhotoURL = await this.cloudStorageService.uploadProfilePhoto(signUpCheck.uid, photo); // ojo por si devuelve null
      } catch (error) {
        console.error("Error uploading file: ", error);
        return false;
      }
    }
  
    const user: User = {
      uid: signUpCheck.uid,
      email: signUpCheck.email,
      username: username,
      birthdate: birthdate,
      photoURL: profilePhotoURL !== null ? profilePhotoURL : defaultProfilePhotoURL
    };
  
    console.log("Por ahora va bien");
    const createSchemaCheck = await this.firestoreService.addUser(user);
    if (!createSchemaCheck) return false;
  
    return true;
  }

  async signInWithGoogleProcess():Promise<Boolean>{
    const signInCheck = await this.authService.signInWithGoogle();
    if(signInCheck===null)  return false;

    const user:User={
      uid: signInCheck.uid,
      email: signInCheck.email,
      username: signInCheck.username,
      birthdate: signInCheck.birthdate,
      photoURL: signInCheck.photoURL !== null ? signInCheck.photoURL : defaultProfilePhotoURL
    }


    const createSchemaCheck = await this.firestoreService.addUser(user);
    if(!createSchemaCheck) return false;
    
    return true;
  }

    // no tengo bien claro cual es el tipo de el user_auth
  async updateProfileInfo(user:User, changes : {[key:string]:any}, profilePhoto:File | null, user_auth: any):Promise<Boolean>{
    let profilePhotoURL : string = '';
    if(profilePhoto != null){
      profilePhotoURL = await this.cloudStorageService.uploadProfilePhoto(user.uid, profilePhoto);
      changes["photoURL"] = profilePhotoURL;
      
    }
    this.firestoreService.updateUser(user, changes);
    this.authService.updateProfile(user_auth, profilePhotoURL);
    if("password" in changes) this.authService.updatePassword(changes["password"]);
    if("email" in changes) this.authService.updateEmail(changes["email"]);
    return true;
  }

  async getImagesFromFile(imageRoute:string):  Promise<String[]>{
    const urls = await this.cloudStorageService.getImagesFromFile(imageRoute);
    return urls;
  }
  


}
