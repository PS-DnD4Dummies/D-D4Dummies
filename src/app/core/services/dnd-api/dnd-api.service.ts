import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DndApiService {
  private baseUrl = 'https://www.dnd5eapi.co/api';

  constructor(private http: HttpClient) {}

  getClasses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/classes`);
  }

  getClassDetails(className: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/classes/${className}`);
  }
}
