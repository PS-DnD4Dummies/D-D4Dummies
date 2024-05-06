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

  newId:string = '';
  newPostTitle: string = '';
  newPostContent: string = '';
  currentUser!: OurUser;
  authSubscription: Subscription | null = null;

  numberOfPosts!: number;

  currentPosts!:Post[];

  constructor(private authService: AuthenticationFirebaseService,
              private firestoreService: FirestoreService,
              private utilitiesService: UtilitiesService
  ){

  }

  ngOnInit() {
    this.authSubscription =  this.authService.currentAuthStatus.subscribe(
      user => {
        this.currentUser = this.utilitiesService.firebaseUserToOurUser(user)
      }
    );
    this.firestoreService.getNumberOfPost().then(numberOfPosts => {
      if (numberOfPosts!=null) this.numberOfPosts = numberOfPosts;
      this.firestoreService.getFirstsPosts(5).then( (posts:Post[]|null) => {
        if(posts==null) {
          console.log("Ha habido un fallo leyendo los posts");
          return;
        }
        this.currentPosts = posts;
        console.log(posts);
        
      })
    });

  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  publishPost() {
    if (this.newPostTitle.trim() !== '' && this.newPostContent.trim() !== '' && this.currentUser) {
      const newPost: Post = {
        id:"",
        title: this.newPostTitle,
        content: this.newPostContent,
        user: this.currentUser,
        timestamp: new Date(),
        like: 0,
        dislike: 0
      };

      this.firestoreService.addPost(newPost).then((docRef) => {
        console.log("Post added with ID: ", docRef);
        // Lógica adicional si es necesario
        this.newPostTitle = '';
        this.newPostContent = '';
      }).catch((error) => {
        console.error('Error adding post: ', error);
      });
    } else {
      console.error('Title and content are required, and user must be logged in.');
    }
  }

}
