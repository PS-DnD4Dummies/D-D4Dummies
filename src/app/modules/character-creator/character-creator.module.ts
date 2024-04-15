import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterCreatorRoutingModule } from './character-creator-routing.module';
import { CharacterCreatorComponent } from './pages/character-creator.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [CharacterCreatorComponent],
  imports: [
    CommonModule,
    CharacterCreatorRoutingModule,
    SharedModule
  ]
})

export class CharacterCreatorModule { }
