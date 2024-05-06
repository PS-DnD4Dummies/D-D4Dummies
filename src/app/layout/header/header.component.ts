import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ROUTES } from '@data/constanst/routes';
import { FormBuilder } from '@angular/forms';
import { AuthenticationFirebaseService } from '@core/services/firebase/authentication/authentication-firebase.service';
import { LogInData } from '@data/interfaces';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from '@core/services/firebase/firebase.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeComponent } from '@modules/home/pages/home/home.component';
import { HomeModule } from '@modules/home/home.module';
import { NavigationEnd, Router } from '@angular/router';
import { FirestoreService } from '@core/services/firebase/firestore/firestore.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  
  routesURL = ROUTES;
  searchForm;

  insurance: Boolean;

  glossaryLiContents = [
    {
      text:"Main Glossary",
      route:"glossary"
    },
    {
      text:"Races",
      route:"glossary/races"
    },
    {
      text:"Classes",
      route:"glossary/classes"
    },
    {
      text:"Alignments",
      route:"glossary/alignments"
    },
    {
      text:"Know your rolls",
      route:"glossary/info/KnowYourRolls"
    },
    {
      text:"Weapons",
      route:"glossary/weapons"
    },
    {
      text:"Spells",
      route:"glossary/spells"
    },
    {
      text:"Combat Gear",
      route:"glossary/CombatGear"
    },
    {
      text:"Combat",
      route:"glossary/info/combat"
    },
    {
      text:"Adventure",
      route:"glossary/info/adventure"
    },
    {
      text:"Tools",
      route:"glossary/tools"
    },
    {
      text:"Adventuring Gear",
      route:"glossary/AdventuringGear"
    }
  ]

  currentUser!:any;
  visibilityPopUpLogIn=false;
  visibilityMatMenuPopUp=false;
  visibilityPremium=false;
  validEmailPassword: boolean = true;
  userPhotoURL : string = "";
  isPremium : boolean = false;

  urlLogo!:string;
  urlProfile!:string;

  

  constructor(
    private formBuilder: FormBuilder,
    private auth:AuthenticationFirebaseService,
    private firebaseService:FirebaseService,
    private firestoreService:FirestoreService,
    private _snackBar: MatSnackBar,
    private router: Router
  ){
    this.searchForm = this.formBuilder.group({
      search:""
    });

    this.insurance = false;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeSideBar();
      }
    });
  }

  /*@ViewChild('sidenav') sidenav!: MatSidenav;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }*/


  ngOnInit(): void {
    this.auth.currentAuthStatus.subscribe(result => {
      this.currentUser=result;
      if (result) {
        this.firestoreService.readRealTimeUser(result.uid).subscribe(user => {
          this.userPhotoURL = user.photoURL;
          this.isPremium = user.isPremium;
          
          console.log(user)
        });
      }
      //console.log(result);
    });

    //this.auth.signOut();
    
    this.loadImages();
  
    // this.cleanStorage();

  }

  onSubmitForm(searchFormData:any){
    /*POR IMPLEMENTAR*/
    console.log(searchFormData)
  }

  openClosePopUp(){
    this.visibilityPopUpLogIn = !this.visibilityPopUpLogIn;
    this.closeSideBar();
  }
  openCloseMatMenu(){
    this.visibilityMatMenuPopUp = !this.visibilityMatMenuPopUp;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration:3000
    });
  }


  logIn(logInData:LogInData){
    this.auth.signIn(logInData.email,logInData.password).then(result => {
      if(result===null){
        this.validEmailPassword = false;

      }else{
        this.validEmailPassword = true;
        this.visibilityPopUpLogIn = false;
      }
    });

    this.closeSideBar();
  }

  signOut(){
    this.auth.signOut().then(result => {
      this.openSnackBar("Sign Out","Close")
      this.router.navigate(["/"]);
    })

    this.closeSideBar();
  }

  logInWithGoogle(){
    console.log("asdf")
    this.firebaseService.signInWithGoogleProcess().then(result=>{
      console.log(result)
      this.visibilityPopUpLogIn = false;
    });

  }
  logInWithFacebook(){
    this.firebaseService.signInWithFacebookProcess().then(result=>{
      console.log(result)
      this.visibilityPopUpLogIn = false;
    });

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

  async loadImages(){
    
    const urlLogo = sessionStorage.getItem('logo.png');
    const urlProfile = sessionStorage.getItem('usuario.png');

    if (urlLogo && urlProfile) {

      //var image = document.querySelector('.upper-bar_main-logo-image') as HTMLImageElement;
      this.urlLogo = urlLogo;

      //var image = document.querySelector('.upper-bar__login-logo-image') as HTMLImageElement;
      this.urlProfile = urlProfile; // Esto no carga por cosas raras que hicieron
      
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

  async cleanStorage(){
    localStorage.clear();
    sessionStorage.clear();
  }

  openSideBar(){
    const side = document.querySelector('.side-bar');

    if (side){
      side.classList.add("visible");

    }
  }

  closeSideBar(){
    const side = document.querySelector('.side-bar');

    if (side){
      side.classList.remove("visible");

    }
  }

  PopUpPremium(){
    this.visibilityPremium = !this.visibilityPremium;
    this.closeSideBar();
  }

}
