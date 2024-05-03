import { Component, Input, Output, EventEmitter, Injectable } from '@angular/core';
import { Character } from '@data/interfaces';

@Component({
  selector: 'app-character-list-loader',
  templateUrl: './character-list-loader.component.html',
  styleUrls: ['./character-list-loader.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class CharacterListLoaderComponent {
  @Input() characters: Character[] = []; 
  @Input() profileMode: boolean = false;
  @Output() selectCharacter = new EventEmitter<any>();
  @Output() deleteCharacter = new EventEmitter<any>();

  closeModal() {
    this.selectCharacter.emit(null);
  }

  onCharacterSelect(character: any) {
    this.selectCharacter.emit(character);
  }

  onDeleteCharacter(character: any) {
    this.deleteCharacter.emit(character);
  }
}
