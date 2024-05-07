import { Component, Input } from '@angular/core';
import { Comment } from '@data/interfaces';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {

  @Input() comment!:Comment;

  convertToDate(timestamp:any): Date {
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    return new Date(milliseconds);
  }

}
