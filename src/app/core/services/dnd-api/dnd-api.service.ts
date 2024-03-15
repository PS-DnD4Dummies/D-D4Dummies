import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RaceInfo } from '../../../shared/components/index';


@Injectable({
  providedIn: 'root'
})
export class DndApiService {
  baseUrl = 'https://www.dnd5eapi.co/api';

  constructor(private http: HttpClient) { }

  getRaces(): Observable<any> {
    return this.http.get(`${this.baseUrl}/races`);
  }
  getRace(raceIndex: any): Observable<RaceInfo> {
    return this.http.get<RaceInfo>(`${this.baseUrl}/races/${raceIndex}`);
  }

  getClasses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/classes`);
  }
  getAlignments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/alignments`)
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

  getTools(): Observable<any> {
    return this.http.get(`${this.baseUrl}/equipment-categories/tools`)
  }
  getAdventuringGear(): Observable<any> {
    return this.http.get(`${this.baseUrl}/equipment-categories/adventuring-gear`)
  }

}
