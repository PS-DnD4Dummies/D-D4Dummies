import { Component, OnInit} from '@angular/core';
import { socialMediaURL } from '@data/constanst/url';
import { FirebaseService } from '@core/services/firebase/firebase.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{
  socialMediaURL = socialMediaURL;
  images: Map<String, String> = new Map();
  
  constructor(private firebaseService:FirebaseService){}

  ngOnInit(): void {
    this.loadImages();
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

