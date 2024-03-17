import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location,  NgForOf} from "@angular/common";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '@core/services/firebase/firestore/firestore.service';

@Component({
  selector: 'app-informative-glossary',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './informative-glossary.component.html',
  styleUrl: './informative-glossary.component.scss'
})
export class InformativeGlossaryComponent {
  selectedSection?: string | null;
  @Input() items: any[]=[]
  sectionTitle?: string | null;
  sectionContent?: string | null;
  fields: { title: string; value: string }[] = [];

  constructor(private route: ActivatedRoute, private location: Location, private firestoreService:FirestoreService) { }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedSection = params.get('section');
      this.loadItems();
    });
  }

  async loadItems(): Promise<void> {
    
    const sectionData = await this.firestoreService.readGlossarySection((this.selectedSection ?? 'defaultValue').toLowerCase());
    if (sectionData) {
      console.log(sectionData)
      this.fields = sectionData;
    } else {

      console.log('No se pudieron obtener los datos de la sección del glosario');
    }
  }


}
