// En tu archivo TypeScript del componente de comentario
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

  userId: string | undefined;


  constructor(private firestoreService: FirestoreService,
              private authService: AuthenticationFirebaseService) { }

  likeComment(commentId: string): void {
    // Obtener el ID de usuario actual
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      if (!this.comment.likes.some(like => like.userId === userId)) {
        // El usuario no ha dado like aún
        this.comment.likes.push({ userId: userId });
        // Actualizar los likes en Firestore
        this.firestoreService.updateCommentLikes(this.postId, commentId, this.comment.likes);
      }
    }
  }

  dislikeComment(commentId: string): void {
    // Obtener el ID de usuario actual
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      if (!this.comment.dislikes.some(dislike => dislike.userId === userId)) {
        // El usuario no ha dado dislike aún
        this.comment.dislikes.push({ userId: userId });
        // Actualizar los dislikes en Firestore
        this.firestoreService.updateCommentDislikes(this.postId, commentId, this.comment.dislikes);
      }
    }
  }





  convertToDate(timestamp: any): Date {
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    return new Date(milliseconds);
  }
}
