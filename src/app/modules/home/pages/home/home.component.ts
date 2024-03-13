import { Component, OnInit } from '@angular/core';
import { ROUTES } from '@data/constanst/routes';
import { FirebaseService } from '@core/services/firebase/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private firebaseService:FirebaseService) { }

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
  }

  async getImageRoute(fileRoute:string): Promise<string>{

    return this.firebaseService.getImageRoute(fileRoute);
  }

}
