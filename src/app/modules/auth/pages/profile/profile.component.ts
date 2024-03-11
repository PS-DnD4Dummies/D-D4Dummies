import { Component } from '@angular/core';
import { AuthenticationFirebaseService } from '@core/services/firebase/authentication/authentication-firebase.service';
import { FormsModule } from '@angular/forms'; //para usar el form que cambia los paraametros

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  email: string = '';
  password: string = '';
  newDisplayName: string = '';
  newPhotoURL: string = '';

  auth!:any;

  constructor(private authService: AuthenticationFirebaseService) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authService.signUp("aaaa@getMaxListeners.com", "ccccccccccc")
    this.authService.currentAuthStatus.subscribe(auth =>this.auth = auth);
    console.log("auhhhth");
  }

}
