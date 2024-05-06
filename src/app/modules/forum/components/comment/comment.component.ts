import { Component, Input } from '@angular/core';
import { Comment } from '@data/interfaces';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {

  @Input() comment!:Comment;

}
