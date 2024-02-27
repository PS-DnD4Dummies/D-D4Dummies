import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationFirebaseService {


  constructor(private auth:Auth) { }


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

}
