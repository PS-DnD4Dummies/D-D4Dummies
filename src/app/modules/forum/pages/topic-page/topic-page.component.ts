import { Component, Input } from '@angular/core';
import {Comment, Post, User} from "@data/interfaces";
import {FirestoreService} from "@core/services/firebase/firestore/firestore.service";
import {ActivatedRoute} from "@angular/router";
import { AuthenticationFirebaseService } from '@core/services/firebase/authentication/authentication-firebase.service';
import { UtilitiesService } from '@core/services/utilities/utilities.service';

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrl: './topic-page.component.scss'
})
export class TopicPageComponent {

  post!:Post;
  id!:string;
  comments!: Comment[];

  currentUser!: User;

  newCommentContent: string = '';

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private authService:AuthenticationFirebaseService,
    private utilitiesService: UtilitiesService

  ) { }

  ngOnInit(){

    this.authService.currentAuthStatus.subscribe(user => {
      if(user != null)this.currentUser = this.utilitiesService.firebaseUserToOurUser(user)
    })


    this.route.params.subscribe(params => {
      this.id = params['topic'];
      if(this.id) this.firestoreService.getPost(this.id).then(result => {
        if(result!=null)this.post = result;
      });

      if(this.id) this.firestoreService.getComments(this.id).then(result => {
        if(result!=null)this.comments = result;
      })


    })
  }

  addComment() {
    let comment:Comment = {
      content: this.newCommentContent,
      user: this.currentUser,
      timestamp: new Date(),
      likes: [],
      dislikes: []
    }
    if(this.currentUser!=null){
       this.firestoreService.addComment(comment,this.id).then(result => {
        console.log(result);
       })
    }else{
      console.log("usuario tiene que estar registrado");
    }
  }

  convertToDate(timestamp:any): Date {
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    return new Date(milliseconds);
  }
}
