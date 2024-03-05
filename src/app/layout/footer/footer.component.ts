import { Component } from '@angular/core';
import { socialMediaURL } from '@data/constanst/url';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  socialMediaURL = socialMediaURL;
}
