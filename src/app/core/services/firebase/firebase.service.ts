import { Injectable } from '@angular/core';
import { AuthenticationFirebaseService } from './authentication/authentication-firebase.service';
import { FirestoreService } from './firestore/firestore.service';
import { CloudStorageService } from './cloud-storage/cloud-storage.service';
import { User } from '@data/interfaces';
import { defaultProfilePhotoURL } from '@data/constanst/url';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private authService:AuthenticationFirebaseService,
    private firestoreService:FirestoreService,
    private cloudStorageService:CloudStorageService
  ) { }

  async signUpProcess(email:string,password:string):Promise<Boolean>{
    const signUpCheck = await this.authService.signUp(email,password);
    if(signUpCheck===null)  return false;

    const user:User={
      uid: signUpCheck.uid,
      email: signUpCheck.email,
      photoURL: signUpCheck.photoURL !== null ? signUpCheck.photoURL : defaultProfilePhotoURL
    }

    const createSchemaCheck = await this.firestoreService.addUser(user);
    if(!createSchemaCheck) return false;
    
    return true;
  }

  async signInWithGoogleProcess():Promise<Boolean>{
    const signInCheck = await this.authService.signInWithGoogle();
    if(signInCheck===null)  return false;

    const user:User={
      uid: signInCheck.uid,
      email: signInCheck.email,
      photoURL: signInCheck.photoURL !== null ? signInCheck.photoURL : defaultProfilePhotoURL
    }


    const createSchemaCheck = await this.firestoreService.addUser(user);
    if(!createSchemaCheck) return false;
    
    return true;
  }

  async getImagesFromFile(imageRoute:string):  Promise<String[]>{
    const urls = await this.cloudStorageService.getImagesFromFile(imageRoute);
    return urls;
  }


}
