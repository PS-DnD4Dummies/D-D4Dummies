import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CharacterCreatorRoutingModule } from './character-creator-routing.module';
import { CharacterCreatorComponent } from './pages/character-creator.component';


@NgModule({
  declarations: [CharacterCreatorComponent],
  imports: [
    CommonModule,
    CharacterCreatorRoutingModule,
    FormsModule
  ]
})

export class CharacterCreatorModule { }
