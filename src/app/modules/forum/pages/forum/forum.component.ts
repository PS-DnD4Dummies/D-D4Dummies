import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthenticationFirebaseService } from '@core/services/firebase/authentication/authentication-firebase.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss'
})
export class ForumComponent {
  dummyList = [1, 2, 3, 4, 5];

  user !: User;

  constructor(private authService: AuthenticationFirebaseService){
    this.authService.currentAuthStatus.subscribe(user => this.user=user);
  }

}
