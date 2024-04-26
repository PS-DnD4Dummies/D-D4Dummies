import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainForumComponent } from './pages/main-forum/main-forum.component';
import { TopicPageComponent } from './pages/topic-page/topic-page.component';

const routes: Routes = [
  { path: '', component: MainForumComponent },
  { path: ':topic', component: TopicPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ForumRoutingModule { }
