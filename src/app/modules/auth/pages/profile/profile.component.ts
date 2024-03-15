import { Component } from '@angular/core';
import { AuthenticationFirebaseService } from '@core/services/firebase/authentication/authentication-firebase.service';
import { FormsModule } from '@angular/forms'; //para usar el form que cambia los paraametros
import { FirestoreService } from '@core/services/firebase/firestore/firestore.service';
import { FirebaseService } from '@core/services/firebase/firebase.service';
import { CloudStorageService } from '@core/services/firebase/cloud-storage/cloud-storage.service';
import { serverTimestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  username: string = '';
  email: string = '';
  birthDate: string = '';
  profilePhotoURL: string = '';

  newUsername: string = '';
  newEmail: string = '';
  newPassword: string = '';
  newBirthDate: string = '';
  selectedFile: File | null = null;

  auth: any;


  constructor(
    private authService: AuthenticationFirebaseService, 
    private firestoreService : FirestoreService, 
    private firebaseService : FirebaseService) {
  }

  ngOnInit(): void {

     this.authService.currentAuthStatus.subscribe(auth => {
      if (auth) {
        // Usuario está iniciado sesión.
        this.auth = auth;
        console.log("El UID del usuario es: " + auth.uid);
    //     this.firestoreService.readUser(auth.uid).then(user => {
    //       if (user) { // Asegura que user no es null

    //       } else {
    //         // Maneja el caso de que user sea null, si es necesario
    //         console.log('No se encontró el usuario.');
    //       }
    //     });
        
    //   } else {
    //     // No hay usuario iniciado sesión.
    //     console.log("No hay usuario iniciado sesión.");
    //   }
    // });
      this.firestoreService.readRealTimeUser(auth.uid).subscribe(user => {
        this.email = user.email;
        this.username = user.username;
        this.birthDate = user.birthdate;
        this.profilePhotoURL = user.photoURL;
      });

      }})
    }
  
  

  updateProfile(): void {
    let changes : {[key:string]:any} = {};

    if(this.newEmail != ''){
      if (this.checkForValidEmail(this.newEmail)) {
        changes["email"] = this.newEmail;
      } else {
        //this.emailError = true;
        alert('Please enter a valid email address.');
        return;
      }
    }

    if(this.newUsername != ''){
      if (this.checkForValidUsername(this.newUsername)) {
        changes["username"] = this.newUsername;
      } else {
        //this.usernameError = true;
        alert('Please enter a valid username.');
        return;
      }
    }

    
    if(this.newPassword != ''){
      if (this.checkForValidPassword(this.newPassword)) {
        changes["password"] = this.newPassword;
      } else {
        //this.passwordError = true;
        alert('Please enter a valid password.');
        return;
      }
    }

    if(this.newBirthDate != ''){
      if (this.isAdult(this.newBirthDate)) {
        changes["birthdate"] = this.newBirthDate;
      } else {
        //this.birthDateError = true;
        alert('Please enter a valid birthdate.');
        return;
      }
    }
    if(Object.keys(changes).length){
      
      this.firestoreService.readUser(this.auth.uid).then(user => {
        if (user) { // Asegura que user no es null
          this.firebaseService.updateProfileInfo(user, changes, this.selectedFile, this.auth)
        } else {
          // Maneja el caso de que user sea null, si es necesario
          console.log('No se encontró el usuario.');
        }
      });
    } 

/*     // Llama a la función updateProfile del servicio con los parámetros necesarios
    this.firestoreService.readUser(this.auth.uid).then(user => {
      if (user) { // Asegura que user no es null
        this.firebaseService.updateProfileInfo(user, );
      } else {
        // Maneja el caso de que user sea null, si es necesario
        console.log('No se encontró el usuario.');
      }
    }); */

  }

  isAdult(birthDate: string): boolean {
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    const adultYear = today.getFullYear() - 18;
    const adultDate = new Date(today.setFullYear(adultYear));

    return birthDateObj <= adultDate;
  }

  checkForValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  checkForValidUsername(username: string): boolean {
    const usernamePattern = /^[a-zA-Z0-9_-]{4,20}$/;
    return usernamePattern.test(username);
  }

  checkForValidPassword(password: string): boolean {
    return true;
    /*const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);*/
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileSizeInMB = file.size / 1024 / 1024;
      const validExtensions = ['image/jpeg', 'image/png'];
  
      if (!validExtensions.includes(file.type)) {
        alert('Only .jpg and .png files are allowed.');
        return;
      }
  
      if (fileSizeInMB > 10) {
        alert('File size must be less than 10MB.');
        return;
      }
  
      this.selectedFile = file;
    } else {
      this.selectedFile = null;
    }
  }

}

