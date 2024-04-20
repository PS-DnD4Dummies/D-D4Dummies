import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location,  NgForOf} from "@angular/common";
import { FirestoreService } from '@core/services/firebase/firestore/firestore.service';
import { CloudStorageService } from '@core/services/firebase/cloud-storage/cloud-storage.service';

@Component({
  selector: 'app-informative-glossary',
  templateUrl: './informative-glossary.component.html',
  styleUrl: './informative-glossary.component.scss'
})
export class InformativeGlossaryComponent {
  selectedSection?: string | null;
  @Input() items: any[]=[]
  sectionTitle?: string | null;
  sectionImageURL?: string | null;
  fields: { title: string; value: string }[] = [];
  textDescription: string = "";

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
      this.selectedSection = this.splitCamelCase(this.selectedSection ?? "default");
      this.fields = sectionData;
    } else {
      console.log('Data not found');
    }
    switch (this.selectedSection) {
      case 'Know Your Rolls':
        this.textDescription = "Dice rolls are essential in D&D, determining success or failure for actions like attacking, casting spells, and skill checks, adding an element of chance to the game.";
        break;
      case 'Combat':
        this.textDescription = "D&D combat is dynamic and strategic, featuring mechanics like falling unconscious, surprise, underwater combat, movement and positioning, initiative, mounted combat, damage and healing, and structured rounds and turns."
        break;
      case 'adventure':
        this.textDescription = "In D&D, adventures are shaped by the environment, exploration, difficult terrain, social interactions, activities while traveling, resting, travel pace, downtime between adventures, speed, movement, time management, and special types of movement.";
        break;
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


