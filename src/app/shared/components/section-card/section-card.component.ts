import { Component, OnDestroy } from '@angular/core';
import { ModalService } from "@core/services/modal/modal.service";
import { Subscription } from "rxjs";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-section-card',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.scss'
})
export class SectionCardComponent implements OnDestroy {
  content: any;
  private modalSubscription: Subscription;

  constructor(private modalService: ModalService) {
    this.modalSubscription = this.modalService.showModal$.subscribe(content => {
      console.log('Contenido del modal:', content);
      // Asignamos el contenido del modal a la variable content
      this.content = content;
    });
  }

  ngOnDestroy() {
    // Nos aseguramos de cancelar la suscripción al destruir el componente
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }

  closeModal() {
    // Llamamos al método closeModal del servicio ModalService
    this.modalService.closeModal();
  }
}
