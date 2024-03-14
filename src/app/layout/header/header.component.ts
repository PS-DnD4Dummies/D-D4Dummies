import { Component, OnInit, ViewChild } from '@angular/core';
import { ROUTES } from '@data/constanst/routes';
import { FormBuilder } from '@angular/forms';
import { AuthenticationFirebaseService } from '@core/services/firebase/authentication/authentication-firebase.service';
import { LogInData } from '@data/interfaces';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from '@core/services/firebase/firebase.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  routesURL = ROUTES;
  searchForm;
  images: Map<String, String> = new Map();


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
      text:"Know your rolls",
      route:"glossary/know-your-rolls"
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
      text:"Objects",
      route:"glossary/objects"
    },
    {
      text:"Adventure",
      route:"glossary/adventure"
    },
    {
      text:"Combat",
      route:"glossary/combat"
    }
  ]

  currentUser!:any;
  visibilityPopUpLogIn=false;
  validEmailPassword: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private auth:AuthenticationFirebaseService,
    private firebaseService:FirebaseService,
    private _snackBar: MatSnackBar
  ){
    this.searchForm = this.formBuilder.group({
      search:""
    });

  }

  /*@ViewChild('sidenav') sidenav!: MatSidenav;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }*/


  ngOnInit(): void {
    this.auth.currentAuthStatus.subscribe(result => this.currentUser=result);
    this.loadImages();
  }

  onSubmitForm(searchFormData:any){
    /*POR IMPLEMENTAR*/
    console.log(searchFormData)
  }

  openClosePopUp(){
    this.visibilityPopUpLogIn = !this.visibilityPopUpLogIn;
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
  }

  signOut(){
    this.auth.signOut().then(result => {
      this.openSnackBar("Sign Out","Close")
    })
  }

  logInWithGoogle(){
    this.auth.signInWithGoogle().then(result=>{
      console.log(result)
      this.visibilityPopUpLogIn = false;
    });
    
  }



  parsePhotoGoogleURL(url: string): string {
    // Dividir la URL por el signo igual
    const partes = url.split('=');
    
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
    this.images.clear();

    var url = this.firebaseService.getImagesFromFile("miscPhotos/");
    await url.then((links) => {
      const regex = /%2F([^?]+)/;
      var urls = links; 

      for (let item of urls){
        const match = item.match(regex);

        if (match !== null){
          this.images.set(decodeURIComponent(match[1]), item);
        }
      }
      
    })
  }

}
