import { Component, OnInit } from '@angular/core';
import { ROUTES } from '@data/constanst/routes';
import { FormBuilder } from '@angular/forms';
import { AuthenticationFirebaseService } from '@core/services/firebase/authentication/authentication-firebase.service';
import { LogInData } from '@data/interfaces';

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

  constructor(
    private formBuilder: FormBuilder,
    private auth:AuthenticationFirebaseService
  ){
    this.searchForm = this.formBuilder.group({
      search:""
    });
  }
  ngOnInit(): void {
    this.auth.currentAuthStatus.subscribe(result => this.currentUser=result);
  }

  onSubmitForm(searchFormData:any){
    /*POR IMPLEMENTAR*/
    console.log(searchFormData)
  }

  closePopUp($event:any){
    this.visibilityPopUpLogIn = false;
  }

  openPopUp(){
    this.visibilityPopUpLogIn = true;
  }

  logIn(logInData:LogInData){
    console.log(logInData);
   this.auth.signIn(logInData.email,logInData.password)
  }

  

}
