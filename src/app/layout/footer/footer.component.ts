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

  insurance: Boolean;
  
  constructor(private firebaseService:FirebaseService){
    this.insurance = false;
  }

  ngOnInit(): void {
    this.loadImages();

    // this.cleanStorage();
  }

  async loadImages(){
    
    const urlGithub = sessionStorage.getItem('github.png');
    const urlLinkedin = sessionStorage.getItem('logotipo-de-linkedin.png');
    const urlTwitter = sessionStorage.getItem('signo-de-twitter.png');
    const urlInstagram = sessionStorage.getItem('instagram.png');

    if (urlGithub && urlLinkedin && urlTwitter && urlInstagram) {

      var image = document.querySelector('.follow-us__img--github') as HTMLImageElement;
      image.src = urlGithub;

      image = document.querySelector('.follow-us__img--linkedin') as HTMLImageElement;
      image.src = urlLinkedin;

      image = document.querySelector('.follow-us__img--twitter') as HTMLImageElement;
      image.src = urlTwitter;

      image = document.querySelector('.follow-us__img--instagram') as HTMLImageElement;
      image.src = urlInstagram;
      
    } else {
      !this.insurance ? await this.takeImagesFromCloudService(): console.log("ERROR: Casi se ejecuta un segundo intento de acceder al Cloud.");
      this.insurance = true;
    }

  }

  async takeImagesFromCloudService(){
    var url = this.firebaseService.getImagesFromFile("miscPhotos/");
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

