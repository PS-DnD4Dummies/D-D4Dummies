import { Component, OnInit } from '@angular/core';
import { ROUTES } from '@data/constanst/routes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
