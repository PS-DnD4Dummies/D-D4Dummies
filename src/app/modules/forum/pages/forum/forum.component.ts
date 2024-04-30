import {Component, OnDestroy, OnInit} from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthenticationFirebaseService } from '@core/services/firebase/authentication/authentication-firebase.service';
import {Subscription} from "rxjs";
import {FirestoreService} from "@core/services/firebase/firestore/firestore.service";
import {Post, User as OurUser} from "@data/interfaces";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss'
})
export class ForumComponent implements OnInit, OnDestroy{
  dummyList = [1, 2, 3, 4, 5];

  user !: User;

  newPostTitle: string = '';
  newPostContent: string = '';
  currentUser!: OurUser;
  authSubscription: Subscription | null = null;

  constructor(private authService: AuthenticationFirebaseService,
              private firestoreService: FirestoreService,
              private authService2: AngularFireAuth,
  ){
    this.authService.currentAuthStatus.subscribe(user => this.user=user);
  }

  ngOnInit() {
    this.authSubscription = this.authService2.authState.subscribe(user => {
      if (user) {
        // Si hay un usuario autenticado, obtener su información
        this.firestoreService.readUser(user.uid).then(userData => {
          if (userData) {
            this.currentUser = userData;
          } else {
            console.error('User data not found.');
          }
        }).catch(error => {
          console.error('Error retrieving user data:', error);
        });
      } /*else {
        this.currentUser = null; // Reiniciar el usuario actual si no hay usuario autenticado
      }*/
    });
  }

  ngOnDestroy() {
    // Desechar la suscripción para evitar fugas de memoria
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  publishPost() {
    if (this.newPostTitle.trim() !== '' && this.newPostContent.trim() !== '' && this.currentUser) {
      const newPost: Post = {
        title: this.newPostTitle,
        content: this.newPostContent,
        user: this.currentUser,
        timestamp: new Date(),
        like: 0,
        dislike: 0
      };

      this.firestoreService.addPost(newPost).then((success) => {
        if (success) {
          this.newPostTitle = '';
          this.newPostContent = '';
          console.log('Post added successfully!');
        } else {
          console.error('Failed to add post.');
        }
      });
    } else {
      console.error('Title and content are required, and user must be logged in.');
    }
  }

}
