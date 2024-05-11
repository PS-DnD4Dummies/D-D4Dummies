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
      // Verificar si el usuario ya ha dado like
      const userLiked = this.comment.likes.some(like => like.userId === userId);
      if (!userLiked) {
        // El usuario aún no ha dado like, agregar el like
        const newLike = { userId };
        this.comment.likes.push(newLike);
        // Establecer isLiked a true
        this.isLiked = true;
        // Actualizar los likes en Firestore
        this.firestoreService.updateCommentLikes(this.postId, commentId, this.comment.likes);
      } else {
        // El usuario ya dio like, quitar el like
        this.comment.likes = this.comment.likes.filter(like => like.userId !== userId);
        // Establecer isLiked a false
        this.isLiked = false;
        // Actualizar los likes en Firestore
        this.firestoreService.updateCommentLikes(this.postId, commentId, this.comment.likes);
      }
    } else {
      console.log('Usuario no autenticado');
      // Manejar el caso en que el usuario no esté autenticado, por ejemplo, mostrar un mensaje de error.
    }
  }

  dislikeComment(commentId: string): void {
    // Obtener el ID de usuario actual
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      // Verificar si el usuario ya ha dado dislike
      const userDisliked = this.comment.dislikes.some(dislike => dislike.userId === userId);
      if (!userDisliked) {
        // El usuario aún no ha dado dislike, agregar el dislike
        const newDislike = { userId };
        this.comment.dislikes.push(newDislike);
        // Establecer isDisliked a true
        this.isDisliked = true;
        // Actualizar los dislikes en Firestore
        this.firestoreService.updateCommentDislikes(this.postId, commentId, this.comment.dislikes);
      } else {
        // El usuario ya dio dislike, quitar el dislike
        this.comment.dislikes = this.comment.dislikes.filter(dislike => dislike.userId !== userId);
        // Establecer isDisliked a false
        this.isDisliked = false;
        // Actualizar los dislikes en Firestore
        this.firestoreService.updateCommentDislikes(this.postId, commentId, this.comment.dislikes);
      }
    } else {
      console.log('Usuario no autenticado');
      // Manejar el caso en que el usuario no esté autenticado, por ejemplo, mostrar un mensaje de error.
    }
  }


  convertToDate(timestamp: any): Date {
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    return new Date(milliseconds);
  }
}
