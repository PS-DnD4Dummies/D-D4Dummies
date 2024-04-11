import { Component, Output,EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationFirebaseService } from '@core/services/firebase/authentication/authentication-firebase.service';
import { ROUTES } from '@data/constanst/routes';
import { LogInData } from '@data/interfaces';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  routes = ROUTES;

  @Output() closePopUpEmitter = new EventEmitter<boolean>();
  @Output() logInEmitter = new EventEmitter<LogInData>();
  @Output() logInGoogleEmitter = new EventEmitter<any>();
  @Output() logInFacebookEmitter = new EventEmitter<any>();

  @Input() validEmailPassword!: boolean;

  constructor(){

  }

  logInFormData = {
    email:"",
    password:""
  }


  logInForm = new FormGroup({
    email: new FormControl(this.logInFormData.email,[
      Validators.required,
      Validators.email
    ]),
    password:new FormControl(this.logInFormData.password,[
      Validators.required,
      Validators.minLength(6)
    ]) 
  });



  closePopUp(){
    this.closePopUpEmitter.emit(true);
  }

  logInWithEmail(){
    if(this.logInForm.valid){
      this.logInFormData = {
        email:this.logInForm.value.email as string,
        password:this.logInForm.value.password as string
      };
      this.logInEmitter.emit(this.logInFormData);
    }
  }

  logInWithGoogle(){
    this.logInGoogleEmitter.emit();
  }
  logInWithFacebook(){
    this.logInFacebookEmitter.emit();
  }
}

