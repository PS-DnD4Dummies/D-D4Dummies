import { Injectable } from '@angular/core';
import { FirestoreService } from '../firebase/firestore/firestore.service';
import { Character } from '@data/interfaces';
import { AuthenticationFirebaseService } from '../firebase/authentication/authentication-firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterListHandlerService {

  character: Character = {
    name: '',
    class: '',
    race: '',
    alignment: '',
    background: '',
    stats: new Map<string, number>(),
    skillModifiers: new Map<string, number>(),
    skillOptions: new Map<string, number>(),
    loreSections: [],
    photoURL: ''  
  };

  fromProfile: boolean = false;

  constructor(private firestoreService:FirestoreService,
    private authService: AuthenticationFirebaseService
  ) { }

  async loadCharacterList(uid:string): Promise<Character[] | undefined> {
    try {
      const characters = await this.firestoreService.readAllCharacters(uid);
      if(characters){
        return characters;

      } else {
        return undefined;
      }
      
    } catch (error) {
      console.error('Error al cargar la lista de personajes:', error);
      throw error; 
    }
  }

  async saveCharacterData(character : Character){
      this.character = character;
      this.fromProfile = true;
  }

  async loadCharacterData(){
    const result = this.character;
    this.cleanCharacter();

    return result;
  }

  async isFromProfile(){
    return this.fromProfile;
  }
  
  async cleanCharacter(){
    this.character = {
      name: '',
      class: '',
      race: '',
      alignment: '',
      background: '',
      stats: new Map<string, number>(),
      skillModifiers: new Map<string, number>(),
      skillOptions: new Map<string, number>(),
      loreSections: [],
      photoURL: ''
    };
    this.fromProfile = false;
  }
}
