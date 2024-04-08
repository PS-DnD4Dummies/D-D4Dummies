import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterCreatorComponent } from './pages/character-creator.component';

const routes: Routes = [
  { path: '', component: CharacterCreatorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CharacterCreatorRoutingModule { }
