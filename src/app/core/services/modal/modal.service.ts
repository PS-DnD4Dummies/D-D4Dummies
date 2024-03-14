import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showModalSubject = new Subject<any>();
  showModal$ = this.showModalSubject.asObservable();

  openModal(content: any) {
    console.log('Modal abierto con contenido:', content); // Agregamos un log para asegurarnos de que se llama a esta función
    this.showModalSubject.next(content);
  }

  closeModal() {
    this.showModalSubject.next(null);
  }
}
