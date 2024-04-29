import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { SharedModule } from "@shared/shared.module";
import { ForumComponent } from './pages/forum/forum.component';
import { TopicPageComponent } from './pages/topic-page/topic-page.component';
import { CommentComponent } from './components/comment/comment.component';
import { TopicPreviewComponent } from './components/topic-preview/topic-preview.component';



@NgModule({
  declarations: [ForumComponent, TopicPageComponent, CommentComponent, TopicPreviewComponent],
    imports: [
        CommonModule,
        ForumRoutingModule,
        SharedModule,
    ]
})
export class ForumModule {}
