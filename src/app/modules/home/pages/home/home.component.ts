import { Component, OnInit } from '@angular/core';
import { ROUTES } from '@data/constanst/routes';
import { FirebaseService } from '@core/services/firebase/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  images: Map<String, String> = new Map();

  constructor(private firebaseService:FirebaseService) { 
  }

  routesURL = ROUTES;
  
  banners= [
    {
      routeLink:ROUTES.GLOSSARY.DEFAULT,
      imageSrc:"/assets/images/vertical-banner.jpg"
    },
    {
      routeLink:ROUTES.CHARACTER.DEFAULT,
      imageSrc:"/assets/images/vertical-banner.jpg"
    },
    {
      routeLink:ROUTES.FORUM.DEFAULT,
      imageSrc:"/assets/images/vertical-banner.jpg"  
    }
  ];

  ngOnInit(): void {
    this.loadImages();
  }

  async loadImages(){
    this.images.clear();

    var url = this.firebaseService.getImagesFromFile("mainPagePhotos/");
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
