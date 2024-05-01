import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '@data/interfaces';

@Component({
  selector: 'app-topic-preview',
  templateUrl: './topic-preview.component.html',
  styleUrl: './topic-preview.component.scss'
})
export class TopicPreviewComponent {

  constructor(private router: Router) {

  }

  @Input() post!:Post;
  
  goToDisplay(){
    this.router.navigate(["/forum/pages/topic-page"]);
  }

  convertToDate(timestamp:any): Date {
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    return new Date(milliseconds);
  }

}
