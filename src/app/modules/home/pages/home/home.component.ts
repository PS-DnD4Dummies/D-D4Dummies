import { Component, OnInit } from '@angular/core';
import { ROUTES } from '@data/constanst/routes';
import { FirebaseService } from '@core/services/firebase/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  insurance: Boolean;

  constructor(private firebaseService:FirebaseService) { 
    this.insurance = false;
  }

  routesURL = ROUTES;
  
  banners= [
    {
      routeLink:ROUTES.GLOSSARY.DEFAULT,
      imageSrc:"/assets/images/vertical-banner-glossary.jpg",
      bannerLabel:"Glossary"
    },
    {
      routeLink:ROUTES.CHARACTER.DEFAULT,
      imageSrc:"/assets/images/vertical-banner-character-creator.jpg",
      bannerLabel:"Character Creator"
    },
    {
      routeLink:ROUTES.FORUM.DEFAULT,
      imageSrc:"/assets/images/vertical-banner-forum.jpg",
      bannerLabel:"Forum"
    }
  ];

  ngOnInit(): void {
    this.loadImages();

    // this.cleanStorage();
  }

  async loadImages(){
    
    const urlMainBanner = sessionStorage.getItem('mainpagebanner1.jpeg');
    const urlCharacterCreator = sessionStorage.getItem('vertical-banner-character-creator.jpg');
    const urlGlossary = sessionStorage.getItem('vertical-banner-glossary.jpg');
    const urlForum = sessionStorage.getItem('vertical-banner-forum.jpg');

    if (urlMainBanner && urlCharacterCreator && urlGlossary && urlForum) {

      var image = document.querySelector('.banner__image') as HTMLImageElement;
      image.src = urlMainBanner;

      image = document.querySelector('.character-creator-img') as HTMLImageElement;
      image.src = urlCharacterCreator;

      image = document.querySelector('.glossary-img') as HTMLImageElement;
      image.src = urlGlossary;

      image = document.querySelector('.forum-img') as HTMLImageElement;
      image.src = urlForum;
      
    } else {
      !this.insurance ? await this.takeImagesFromCloudService(): console.log("ERROR: Casi se ejecuta un segundo intento de acceder al Cloud.");
      this.insurance = true;
    }

  }

  async takeImagesFromCloudService(){
    var url = this.firebaseService.getImagesFromFile("mainPagePhotos/");
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
}
