import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DndApiService {
  baseUrl = 'https://www.dnd5eapi.co/api';

  constructor(private http: HttpClient) { }

  getRaces(): Observable<any> {
    return this.http.get(`${this.baseUrl}/races`);
  }
  getClasses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/classes`);
  }
  getAlignments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/alignments`)
  }
  // Base de Datos FireBase
  getKnowYourRolls(): Observable<any> | null {
    return null
  }


  getWeapons(): Observable<any> {
    return this.http.get(`${this.baseUrl}/equipment-categories/weapon`)
  }
  getSpells(): Observable<any> {
    return this.http.get(`${this.baseUrl}/spells`)
  }
  getCombatGear(): Observable<any> {
    return this.http.get(`${this.baseUrl}/equipment-categories/armor`)
  }
  // Base de Datos FireBase
  getCombat(): Observable<any> | null {
    return null
  }


  // Base de Datos FireBase
  getAdventure(): Observable<any> | null {
    return null
  }
  getTools(): Observable<any> {
    return this.http.get(`${this.baseUrl}/equipment-categories/tools`)
  }
  getAdventuringGear(): Observable<any> {
    return this.http.get(`${this.baseUrl}/equipment-categories/adventuring-gear`)
  }

}
