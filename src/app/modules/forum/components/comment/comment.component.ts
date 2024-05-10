// En tu archivo TypeScript del componente de comentario
import { Component, Input } from '@angular/core';
import { Comment } from '@data/interfaces';
import { FirestoreService } from "@core/services/firebase/firestore/firestore.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  @Input() comment!: Comment;
  @Input() commentId!: string;
  @Input() postId!: string;

  constructor(private firestoreService: FirestoreService) { }

  likeComment(commentId: string): void {
    const newLikes = this.comment.likes + 1;
    this.firestoreService.updateCommentLikes(this.postId, commentId, newLikes);
  }

  dislikeComment(commentId: string): void {
    const newDislikes = this.comment.dislikes + 1;
    this.firestoreService.updateCommentDislikes(this.postId, commentId, newDislikes);
  }

  convertToDate(timestamp: any): Date {
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    return new Date(milliseconds);
  }
}
