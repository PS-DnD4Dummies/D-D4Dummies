import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ROUTES } from '@data/constanst/routes';
import { AuthenticationFirebaseService } from '@core/services/firebase/authentication/authentication-firebase.service';
import { FirestoreService } from '@core/services/firebase/firestore/firestore.service';
import { Router } from '@angular/router';
import { FirebaseServerApp } from '@angular/fire/app';
import { FirebaseService } from '@core/services/firebase/firebase.service';

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
  urlLogo!: string;
  insurance!: Boolean;

  constructor( 
    private authService: AuthenticationFirebaseService, 
    private firestoreService: FirestoreService, 
    private firebaseService: FirebaseService,
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
    this.loadImages();
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
   
    premiumform = new FormGroup({
    tarjeta: new FormControl(this.FormData.tarjeta, [
      Validators.required,
      Validators.minLength(17),
      Validators.maxLength(20), 

    ]),
    nombre: new FormControl(this.FormData.nombre, [
      Validators.required,
    ]),
    fecha: new FormControl(this.FormData.fecha, [
      Validators.required,
      Validators.pattern(/^\d{2}\/\d{4}$/) 
    ]),
    code: new FormControl(this.FormData.code, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(4)
    ]),
  });

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
          let dict: { [key: string]: any } = {};
          dict['isPremium'] = this.user.isPremium;
          this.firebaseService.updateProfileInfo(this.user, dict, this.user.profilePhotoURL,this.auth)//preguntar si esto es asi  
          this.closePopUp();
          this.router.navigate([ROUTES.AUTH .PROFILE]);
          console.log(this.user);
          console.log(this.auth);
        } else {
          alert('Premium form is not valid ');
        }
      } catch (error) {
        console.error("Premium process error: ", error);
        alert('An error occurred during the payment process. Please try again.');
      }
    }

    Goregister(){
      this.closePopUp();
      this.router.navigate([ROUTES.AUTH.REGISTER])
    }

    
  async loadImages(){
    
    const urlLogo = sessionStorage.getItem('logo.png');

    if (urlLogo) {


      this.urlLogo = urlLogo;

      
    } else {
      !this.insurance ? await this.takeImagesFromCloudService(): console.log("ERROR: Casi se ejecuta un segundo intento de acceder al Cloud.");
      this.insurance = true;
    }

  }

  async takeImagesFromCloudService(){
    var url = this.firebaseService.getImagesFromFile("miscPhotos/");
      await url.then((links) => {
        const regex = /%2F([^?]+)/;
        var urls = links; 

        for (let item of urls){
          const match = item.match(regex);
  
          if (match !== null){
            sessionStorage.setItem(decodeURIComponent(match[1]), JSON.stringify(item).replace(/^["']|["']$/g, ''));
          }
        }
        
    })

    this.loadImages();
  }

  formatCardNumber(event: any) {
    let input = event.target.value.replace(/\D/g, '');
    let formattedInput = '';

    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedInput += '-';
      }
      formattedInput += input[i];
    }

    this.premiumform.controls['tarjeta'].setValue(formattedInput);
  }

}
