import { Component, OnInit } from '@angular/core';
import { ROUTES } from '@data/constanst/routes';
import { FormBuilder } from '@angular/forms';
import { AuthenticationFirebaseService } from '@core/services/firebase/authentication/authentication-firebase.service';
import { FirebaseService } from '@core/services/firebase/firebase.service';

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


  constructor(
    private formBuilder: FormBuilder,
    private auth:AuthenticationFirebaseService,
    private firebaseService:FirebaseService
  ){
    this.searchForm = this.formBuilder.group({
      search:""
    });

  }

  ngOnInit(): void {
    this.auth.currentAuthStatus.subscribe(result => this.currentUser=result);
    this.loadImages();
  }

  onSubmitForm(searchFormData:any){
    /*POR IMPLEMENTAR*/
    console.log(searchFormData)
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
