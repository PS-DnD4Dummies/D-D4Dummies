import { Injectable } from '@angular/core';
import { AuthenticationFirebaseService } from './authentication/authentication-firebase.service';
import { FirestoreService } from './firestore/firestore.service';
import { CloudStorageService } from './cloud-storage/cloud-storage.service';
import { User } from '@data/interfaces';

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
      photoURL: signUpCheck.photoURL
    }
    const createSchemaCheck = await this.firestoreService.addUser(user);
    if(!createSchemaCheck) return false;
    
    return true;
  }


}
