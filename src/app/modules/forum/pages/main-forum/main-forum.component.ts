import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthenticationFirebaseService } from '@core/services/firebase/authentication/authentication-firebase.service';

@Component({
  selector: 'app-main-forum',
  templateUrl: './main-forum.component.html',
  styleUrl: './main-forum.component.scss'
})
export class MainForumComponent {

  dummyList = [1, 2, 3, 4, 5];

  user !: User;

  constructor(private authService: AuthenticationFirebaseService){
    this.authService.currentAuthStatus.subscribe(user => this.user=user);
  }

}
