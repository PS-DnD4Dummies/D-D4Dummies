import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '@data/constanst/routes';
import { AuthenticationFirebaseService } from '@core/services/firebase/authentication/authentication-firebase.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  constructor(private Firebase:FirebaseService, private router:Router) { }
  userEmail = '';
  userConfirmEmail = '';
  username = '';
  userPassword = '';
  userConfirmPassword = '';
  userBirthDate = '';
  displayImage: string = '/assets/images/default.jpg';
  selectedFile: any;

  emailError: boolean = false;
  confirmEmailError: boolean = false;
  usernameError: boolean = false;
  passwordError: boolean = false;
  confirmPasswordError: boolean = false;
  birthDateError: boolean = false;

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

  async registerUser() {

    this.emailError = false;
    this.confirmEmailError = false;
    this.usernameError  = false;
    this.passwordError = false;
    this.confirmPasswordError = false;
    this.birthDateError = false;

    if (!this.checkForValidEmail(this.userEmail)) {
      this.emailError = true;
      alert('Please enter a valid email address.');
      return;
    }

    if (this.userEmail !== this.userConfirmEmail) {
      this.confirmEmailError = true;
      alert('Emails do not match!');
      return;
    }

    if (!this.checkForValidUsername(this.username)) {
      this.usernameError = true;
      alert('Username must be between 4 and 20 characters long and can only contain letters, numbers, hyphens, and underscores.');
      return;
    }

/*     if (!this.checkForValidPassword(this.userPassword)) {
      this.passwordError = true;
      alert('Password must be at least 8 characters long and include at least one letter, one number, and one special character.');
      return;
    } */

    if (this.userPassword !== this.userConfirmPassword) {
      this.confirmPasswordError = true;
      alert('Passwords do not match!');
      return;
    }

    if (!this.isAdult(this.userBirthDate)) {
      this.birthDateError = true;
      alert('You must be 18 years or older to sign up.');
      return;
    }

    try {
      let successfulSignUp = await this.Firebase.signUpProcess(this.userEmail, this.username, this.userPassword, this.userBirthDate, this.selectedFile);
  
      if (successfulSignUp) {
        // Inicia la sesión y redirige a la página principal
        this.router.navigate([ROUTES.HOME.DEFAULT]); // Asegúrate de reemplazar '/main-page' con la ruta correcta
      } else {
        // Muestra un mensaje de error referente a que el servicio de autenticación ha fallado
        alert('Authentication service failed. Please try again.');
      }
    } catch (error) {
      console.error("SignUp process error: ", error);
      alert('An error occurred during the sign up process. Please try again.');
    }
  
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
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  }

  
}import { FirebaseService } from '@core/services/firebase/firebase.service';

