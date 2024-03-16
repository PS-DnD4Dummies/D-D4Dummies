import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import { FirestoreService } from '@core/services/firebase/firestore/firestore.service';

@Component({
  selector: 'app-informative-glossary',
  standalone: true,
  imports: [],
  templateUrl: './informative-glossary.component.html',
  styleUrl: './informative-glossary.component.scss'
})
export class InformativeGlossaryComponent {
  selectedSection?: string | null;
  @Input() items: any[]=[]
  sectionTitle?: string | null;
  sectionContent?: string | null;

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
    
    this.firestoreService.readGlossarySection((this.selectedSection ?? 'defaultValue').toLowerCase()).then(section => {
      if (section !== null) {
        this.selectedSection = section.title;
        this.sectionTitle = section.title;
        this.sectionContent = section.description;
      } else {
        this.selectedSection = '404 ERROR: Section not found';
        this.sectionTitle = 'Section not found';
        this.sectionContent = 'Missing content.';
      }
    })

  }

}
