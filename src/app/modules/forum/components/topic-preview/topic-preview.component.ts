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

  getContentPreview() {
    if (window.innerWidth < 768) {
      return this.post.content.length > 21 ? this.post.content.slice(0, 21) + ' ...' : this.post.content;
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1023) {
      return this.post.content.length > 50 ? this.post.content.slice(0, 50) + ' ...' : this.post.content;
    } else {
      return this.post.content.length > 74 ? this.post.content.slice(0, 74) + ' ...' : this.post.content;
    }
  }

  protected readonly window = window;
}
