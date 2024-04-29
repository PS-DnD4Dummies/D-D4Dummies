import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './pages/forum/forum.component';
import { TopicPageComponent } from './pages/topic-page/topic-page.component';

const routes: Routes = [
  { path: '', component: ForumComponent },
  { path: ':topic', component: TopicPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ForumRoutingModule { }
