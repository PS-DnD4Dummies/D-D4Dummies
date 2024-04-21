import { Component, OnInit } from '@angular/core';
import { ROUTES } from '@data/constanst/routes';
import { FirebaseService } from '@core/services/firebase/firebase.service';
import { RealtimedbService } from '@core/services/firebase/realtimedb/realtimedb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  insurance: Boolean;

  constructor(
    private firebaseService:FirebaseService,
    private realTimeService:RealtimedbService
  ) { 
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

  photos!: any;

  ngOnInit(): void {
    this.loadImages();
  }

  async loadImages(){ 
    
    this.realTimeService.readPhotos("mainPagePhotos").then(result => {
      this.photos = result;
    });

  }

}
