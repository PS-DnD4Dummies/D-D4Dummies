import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ROUTES } from '@data/constanst/routes';
import { AuthenticationFirebaseService } from '@core/services/firebase/authentication/authentication-firebase.service';
import { FirestoreService } from '@core/services/firebase/firestore/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-premium-popup',
  templateUrl: './premium-popup.component.html',
  styleUrl: './premium-popup.component.scss'
})
export class PremiumPopupComponent implements OnInit{
  Routes = ROUTES;
  @Output() closePopUpPremiumEmitter = new EventEmitter<boolean>();

  @Output() PremiumEmitter = new EventEmitter<any>();
  
  mensualidad = false;
  anualidad = false;
  cantidad = "";
  auth: any;
  isAuthenticated: boolean = false;
  user:any;

  constructor( 
    private authService: AuthenticationFirebaseService, 
    private firestoreService: FirestoreService, 
    private router:Router){
  }
  ngOnInit(): void {
    this.authService.currentAuthStatus.subscribe(auth => {
      if(auth){
        this.auth = auth;
        this.isAuthenticated = true;
        this.firestoreService.readRealTimeUser(auth.uid).subscribe(user => {
        console.log(user);
        this.user = user;
        })
      }
    })
  }
  FormData = {
    tarjeta:"",
    nombre:"",
    fecha:"",
    code:""
  }

    closePopUp(){
      this.closePopUpPremiumEmitter.emit(true);
    }
    selectSubscription(subscriptionType: string) {
      if (subscriptionType === 'mensual') {
        this.mensualidad = true;
        this.anualidad = false;
        this.setMontly();
      } else if (subscriptionType === 'anual') {
        this.anualidad = true;
        this.mensualidad = false;
        this.setYear();
      }
    }
  
    premiumform =  new FormGroup({
      tarjeta: new FormControl(this.FormData.tarjeta,[
        Validators.required,
        Validators.minLength(16)
      ]),
      nombre: new FormControl(this.FormData.nombre,[
        Validators.required,
      ]),
      fecha: new FormControl(this.FormData.fecha,[
        Validators.required,
        //Validators.pattern(/^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/)
      ]),
      code: new FormControl(this.FormData.code,[
        Validators.required,
        Validators.minLength(3)
      ]),
    })

    mensual(){
      if(this.premiumform.valid){
        this.FormData = {
          tarjeta: this.premiumform.value.tarjeta as string,
          nombre:this.premiumform.value.nombre as string,
          fecha:this.premiumform.value.fecha as string,
          code:this.premiumform.value.code as string
        }
        this.PremiumEmitter.emit(this.FormData);
      }
    }
    setMontly(){
        this.cantidad = "5$";
    }

    setYear(){
      this.cantidad = "60$";
    }

    pay() {
      try {
        if (this.premiumform.valid && this.isAuthenticated) {
          this.user.isPremium = true; 
          this.closePopUp();
          this.router.navigate([ROUTES.AUTH .PROFILE]);
          console.log(this.user);
        } else {
          alert('Premium form is not valid ');
        }
      } catch (error) {
        console.error("Premium process error: ", error);
        alert('An error occurred during the payment process. Please try again.');
      }
    }

    Goregister(){
      this.router.navigate([ROUTES.AUTH.REGISTER])
      this.closePopUp();
    }
}

