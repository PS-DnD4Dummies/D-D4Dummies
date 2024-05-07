import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '@data/interfaces';

declare var window: any;

@Component({
  selector: 'app-topic-preview',
  templateUrl: './topic-preview.component.html',
  styleUrl: './topic-preview.component.scss'
})

export class TopicPreviewComponent {

  constructor(private router: Router) {}

  @Input() post!:Post;

  goToDisplay(){
    this.router.navigate(['/forum', this.post.id]);
  }

  convertToDate(timestamp:any): Date {
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    return new Date(milliseconds);
  }

  getShorterText(text:string) : string {
    if (window.innerWidth < 768) {
      return text.length > 21 ? text.slice(0, 21) + ' ...' : text;
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1023) {
      return text.length > 50 ? text.slice(0, 50) + ' ...' : text;
    } else {
      return text.length > 74 ? text.slice(0, 74) + ' ...' : text;
    }
  }

  protected readonly window = window;
}
