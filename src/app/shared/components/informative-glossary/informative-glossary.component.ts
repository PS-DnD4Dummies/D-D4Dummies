import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location,  NgForOf} from "@angular/common";
import { FirestoreService } from '@core/services/firebase/firestore/firestore.service';
import { CloudStorageService } from '@core/services/firebase/cloud-storage/cloud-storage.service';

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
  sectionImageURL?: string | null;
  fields: { title: string; value: string }[] = [];

  constructor(private route: ActivatedRoute, private location: Location, private firestoreService:FirestoreService, private cloudStorageService:CloudStorageService) { }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedSection = params.get('section');
      this.loadSectionImage((this.selectedSection ?? 'defaultValue').toLowerCase());

      this.loadItems();
    });
  }

  async loadItems(): Promise<void> {
    
    const sectionData = await this.firestoreService.readGlossarySection((this.selectedSection ?? 'defaultValue').toLowerCase());
    if (sectionData) {
      console.log(sectionData)
      this.selectedSection = this.splitCamelCase(this.selectedSection ?? "default");
      this.fields = sectionData;
    } else {

      console.log('No se pudieron obtener los datos de la sección del glosario');
    }
  }

  splitCamelCase(text: string): string {
    return text.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  }

  loadSectionImage(section:any){
    this.cloudStorageService.getSingleImageURL('glossaryPhotos/informative-page/' + section + '.jpg').then(imgUrl => {
      this.sectionImageURL = imgUrl;
    })
  }
}


