import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterCreatorRoutingModule } from './character-creator-routing.module';
import { CharacterCreatorComponent } from './pages/character-creator.component';


@NgModule({
  declarations: [CharacterCreatorComponent],
  imports: [
    CommonModule,
    CharacterCreatorRoutingModule
  ]
})

export class CharacterCreatorModule { }
