import { Component, Input } from '@angular/core';
import {Post} from "@data/interfaces";
import {FirestoreService} from "@core/services/firebase/firestore/firestore.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrl: './topic-page.component.scss'
})
export class TopicPageComponent {

  dummyList = [1,2,3,4,5]
  @Input() post!:Post;

  constructor(private firestoreService: FirestoreService, private route: ActivatedRoute) { }

  convertToDate(timestamp:any): Date {
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    return new Date(milliseconds);
  }
}
