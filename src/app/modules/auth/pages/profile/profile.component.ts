import { Component } from '@angular/core';
import { AuthenticationFirebaseService } from '@core/services/firebase/authentication/authentication-firebase.service';
import { FormsModule } from '@angular/forms'; //para usar el form que cambia los paraametros
import { FirestoreService } from '@core/services/firebase/firestore/firestore.service';
import { FirebaseService } from '@core/services/firebase/firebase.service';
import { CloudStorageService } from '@core/services/firebase/cloud-storage/cloud-storage.service';
import { serverTimestamp } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ROUTES } from '@data/constanst/routes';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  isAuthenticated: Boolean = false;
  username: string = '';
  email: string = '';
  birthDate: string = '';
  profilePhotoURL: string = '';

  newUsername: string = '';
  newEmail: string = '';
  newPassword: string = '';
  newBirthDate: string = '';
  selectedFile: any;

  auth: any;
  displayImage: string = '/assets/images/default.jpg'; 
  usernameError: any;
  passwordError: any;
  birthdateError: any;


  constructor(
    private authService: AuthenticationFirebaseService, 
    private firestoreService : FirestoreService, 
    private firebaseService : FirebaseService,
    private router : Router) {
  }

  ngOnInit(): void {

     this.authService.currentAuthStatus.subscribe(auth => {
     this.isAuthenticated = !!auth; //mira si el usuario esta autenticado
      if (auth) {
        // Usuario está iniciado sesión.
        this.auth = auth;
        //console.log("El UID del usuario es: " + auth.uid);
      this.firestoreService.readRealTimeUser(auth.uid).subscribe(user => {
        this.email = user.email;
        this.username = user.username;
        this.birthDate = user.birthdate;
        this.profilePhotoURL = user.photoURL;
      });

      }})
    }
  
  signOut() {
    this.authService.signOut();
    this.router.navigate([ROUTES.HOME.DEFAULT]);
  }
  

  updateProfile(): void {
    let changes : {[key:string]:any} = {};


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

    if(this.selectedFile){
      changes["photoURL"] = "";
    }

    //console.log(changes);

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

  }

  isAdult(birthDate: string): boolean {
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    const adultYear = today.getFullYear() - 18;
    const adultDate = new Date(today.setFullYear(adultYear));

    return birthDateObj <= adultDate;
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
      this.displayImage = URL.createObjectURL(this.selectedFile);
    } else {
      this.selectedFile = null;
    }
  }

  parsePhotoGoogleURL(url: string): string {
    // Dividir la URL por el signo igual
    const partes = url.split('=');
    
    if(!url.includes("https://lh3.googleusercontent.com")){
      return url;
    }

    // Verificar si se encontró el signo igual y la URL es válida
    if (partes.length === 2 && partes[0] && partes[1]) {
        // Modificar el tamaño del avatar a s1024
        partes[1] = 's1024';
        // Unir las partes nuevamente para formar la URL modificada
        return partes.join('=');
    } else {
        // Si la URL no tiene el formato esperado, devolver la URL original
        return url;
    }
  }

}

