import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic-preview',
  templateUrl: './topic-preview.component.html',
  styleUrl: './topic-preview.component.scss'
})
export class TopicPreviewComponent {

  constructor(private router: Router) {}
  
  goToDisplay(){
    this.router.navigate(["/forum/pages/topic-page"]);
  }
}
