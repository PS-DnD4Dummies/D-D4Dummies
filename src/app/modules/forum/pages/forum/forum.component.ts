import {Component, OnDestroy, OnInit} from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthenticationFirebaseService } from '@core/services/firebase/authentication/authentication-firebase.service';
import {Subscription} from "rxjs";
import {FirestoreService} from "@core/services/firebase/firestore/firestore.service";
import {Post, User as OurUser} from "@data/interfaces";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { UtilitiesService } from '@core/services/utilities/utilities.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss'
})
export class ForumComponent implements OnInit, OnDestroy{
  dummyList = [1, 2, 3, 4, 5];


  newPostTitle: string = '';
  newPostContent: string = '';
  currentUser!: OurUser;
  authSubscription: Subscription | null = null;

  constructor(private authService: AuthenticationFirebaseService,
              private firestoreService: FirestoreService,
              private utilitiesService: UtilitiesService
  ){
    
  }

  ngOnInit() {
    this.authSubscription =  this.authService.currentAuthStatus.subscribe(

      user => {
        this.currentUser = this.utilitiesService.firebaseUserToOurUser(user)
        console.log(user);
        console.log(this.currentUser);
        
      }
    );
  }

  ngOnDestroy() {
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
