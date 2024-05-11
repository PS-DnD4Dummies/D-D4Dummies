import { Component, Input } from '@angular/core';
import { Comment } from '@data/interfaces';
import { FirestoreService } from "@core/services/firebase/firestore/firestore.service";
import {AuthenticationFirebaseService} from "@core/services/firebase/authentication/authentication-firebase.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  @Input() comment!: Comment;
  @Input() commentId!: string;
  @Input() postId!: string;
  isLiked: boolean = false;
  isDisliked: boolean = false;


  constructor(private firestoreService: FirestoreService,
              private authService: AuthenticationFirebaseService) { }

  likeComment(commentId: string): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      const userLiked = this.comment.likes.some(like => like.userId === userId);
      if (!userLiked) {
        const newLike = { userId };
        this.comment.likes.push(newLike);
        this.isLiked = true;
        this.firestoreService.updateCommentLikes(this.postId, commentId, this.comment.likes);
      } else {
        this.comment.likes = this.comment.likes.filter(like => like.userId !== userId);
        this.isLiked = false;
        this.firestoreService.updateCommentLikes(this.postId, commentId, this.comment.likes);
      }
    } else {
      console.log('Usuario no autenticado');
    }
  }

  dislikeComment(commentId: string): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      const userDisliked = this.comment.dislikes.some(dislike => dislike.userId === userId);
      if (!userDisliked) {
        const newDislike = { userId };
        this.comment.dislikes.push(newDislike);
        this.isDisliked = true;
        this.firestoreService.updateCommentDislikes(this.postId, commentId, this.comment.dislikes);
      } else {
        this.comment.dislikes = this.comment.dislikes.filter(dislike => dislike.userId !== userId);
        this.isDisliked = false;
        this.firestoreService.updateCommentDislikes(this.postId, commentId, this.comment.dislikes);
      }
    } else {
      console.log('Usuario no autenticado');
    }
  }


  convertToDate(timestamp: any): Date {
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    return new Date(milliseconds);
  }
}
