import { Component, OnInit } from '@angular/core';
import { ROUTES } from '@data/constanst/routes';
import { FirebaseService } from '@core/services/firebase/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  homeImages: String[];

  constructor(private firebaseService:FirebaseService) { 
    this.homeImages = [];
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
    this.homeImages = [];

    var url = this.firebaseService.getImagesFromFile("mainPagePhotos/");
    await url.then((link) => {

      var urls = link; 
      this.homeImages = urls;
      console.log(urls);
      
    })
  }
}
