import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlossaryComponent } from './pages/glossary/glossary.component';

const routes: Routes = [
  { path: '', component: GlossaryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlossaryRoutingModule { }
