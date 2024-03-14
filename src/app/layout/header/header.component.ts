import { Component, OnInit, ViewChild } from '@angular/core';
import { ROUTES } from '@data/constanst/routes';
import { FormBuilder } from '@angular/forms';
import { AuthenticationFirebaseService } from '@core/services/firebase/authentication/authentication-firebase.service';
import { LogInData } from '@data/interfaces';
import { BehaviorSubject } from 'rxjs';
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
    this.auth.currentAuthStatus.subscribe(result => {
      console.log(result);
      this.currentUser=result;
    });
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

  

}
