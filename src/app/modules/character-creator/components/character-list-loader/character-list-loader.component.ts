import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '@data/interfaces';

@Component({
  selector: 'app-character-list-loader',
  templateUrl: './character-list-loader.component.html',
  styleUrls: ['./character-list-loader.component.scss']
})
export class CharacterListLoaderComponent {
  @Input() characters: Character[] = []; 
  @Output() selectCharacter = new EventEmitter<any>();

  closeModal() {
    this.selectCharacter.emit(null);
  }

  onCharacterSelect(character: any) {
    this.selectCharacter.emit(character);
  }
}
