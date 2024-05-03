import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrl: './profile-image.component.scss'
})
export class ProfileImageComponent {
  @Input() componentMode : String = "";
  @Input() isPremium : boolean = false;
  @Input() profileImageURL : String = "";

}
