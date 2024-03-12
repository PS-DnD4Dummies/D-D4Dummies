import { Component } from '@angular/core';
import { AuthenticationFirebaseService } from '@core/services/firebase/authentication/authentication-firebase.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  constructor(private Firebase:FirebaseService) { }
  userEmail = '';
  userConfirmEmail = '';
  username = '';
  userPassword = '';
  userConfirmPassword = '';
  userBirthDate = '';
  selectedFile: File | null = null;

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

  registerUser() {
    if (this.userEmail !== this.userConfirmEmail) {
      alert('Emails do not match!');
      return;
    }
  
    if (this.userPassword !== this.userConfirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!this.isAdult(this.userBirthDate)) {
      alert('You must be 18 years or older to sign up.');
      return;
    }

    /* let successfulSignUp:boolean = this.Firebase.signUpProcess(this.userEmail, this.userPassword, this.selectedFile);

    if(successfulSignUp){

    } else {

    }
    */
  }

  isAdult(birthDate: string): boolean {
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    const adultYear = today.getFullYear() - 18;
    const adultDate = new Date(today.setFullYear(adultYear));

    return birthDateObj <= adultDate;
  }
  
}import { FirebaseService } from '@core/services/firebase/firebase.service';

