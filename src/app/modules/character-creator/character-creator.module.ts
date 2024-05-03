import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CharacterCreatorRoutingModule } from './character-creator-routing.module';
import { CharacterCreatorComponent } from './pages/character-creator.component';

import { SharedModule } from '@shared/shared.module';

import { LoreSectionComponent } from './components/lore-section/lore-section.component';



@NgModule({
  declarations: [CharacterCreatorComponent, LoreSectionComponent],
  imports: [
    CommonModule,
    CharacterCreatorRoutingModule,
    SharedModule,
    FormsModule
  ]
})

export class CharacterCreatorModule { }
