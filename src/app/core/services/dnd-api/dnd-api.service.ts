import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {
  AdventuringGearInfo,
  AlignmentInfo,
  ArmorInfo,
  RaceInfo,
  SpellInfo,
  ToolInfo,
  WeaponInfo
} from '@data/interfaces/api_parameters';


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
  getAlignment(alignmentIndex: any): Observable<AlignmentInfo> {
    return this.http.get<AlignmentInfo>(`${this.baseUrl}/alignments/${alignmentIndex}`)
  }

  getWeapons(): Observable<any> {
    return this.http.get(`${this.baseUrl}/equipment-categories/weapon`)
  }
  getWeapon(weaponIndex: any): Observable<WeaponInfo> {
    return this.http.get<WeaponInfo>(`${this.baseUrl}/equipment/${weaponIndex}`);
  }

  getSpells(): Observable<any> {
    return this.http.get(`${this.baseUrl}/spells`)
  }
  getSpell(spellIndex: any): Observable<SpellInfo> {
    return this.http.get<SpellInfo>(`${this.baseUrl}/spells/${spellIndex}`);
  }

  getCombatGear(): Observable<any> {
    return this.http.get(`${this.baseUrl}/equipment-categories/armor`);
  }
  getArmor(armorIndex: any): Observable<ArmorInfo> {
    return this.http.get<any>(`${this.baseUrl}/equipment/${armorIndex}`).pipe(
      catchError(() => {
        return this.http.get<any>(`${this.baseUrl}/magic-items/${armorIndex}`).pipe(
          catchError(() => {
            return of({});
          })
        );
      }),
      map((armorData: any) => {
        return {
          ...armorData,
          name: armorData?.name || armorData?.equipment_category?.name || ''
        };
      })
    );
  }

  getTools(): Observable<any> {
    return this.http.get(`${this.baseUrl}/equipment-categories/tools`)
  }
  getTool(toolIndex: any): Observable<ToolInfo> {
    return this.http.get<ToolInfo>(`${this.baseUrl}/equipment/${toolIndex}`);
  }


  getAdventuringGear(): Observable<any> {
    return this.http.get(`${this.baseUrl}/equipment-categories/adventuring-gear`)
  }
  getAdventureGearInfo(AdventuringGearInfo: any): Observable<AdventuringGearInfo> {
    return this.http.get<AdventuringGearInfo>(`${this.baseUrl}/equipment/${AdventuringGearInfo}`);
  }

}
