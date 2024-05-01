import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { User as OurUser} from '@data/interfaces'

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }


  firebaseUserToOurUser(user:User): OurUser{
    const ourUser:OurUser = {
      uid: user.uid,
      email: user.email!,
      username: user.displayName!,
      birthdate: new Date(),
      photoURL: user.photoURL!
    }
    return ourUser; 
  }

}
