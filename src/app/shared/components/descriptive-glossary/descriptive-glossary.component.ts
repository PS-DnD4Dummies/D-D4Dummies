import {Component, Input, OnInit} from '@angular/core';
import {DndApiService} from "@core/services/dnd-api/dnd-api.service";
import {ActivatedRoute} from "@angular/router";
import {NgForOf, NgIf, UpperCasePipe, Location} from "@angular/common";
import { DescriptiveGlossaryElementComponent } from "@shared/components/descriptive-glossary-element/descriptive-glossary-element.component";

@Component({
  selector: 'app-descriptive-glossary',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    UpperCasePipe,
    DescriptiveGlossaryElementComponent,
  ],
  templateUrl: './descriptive-glossary.component.html',
  styleUrl: './descriptive-glossary.component.scss'
})

export class DescriptiveGlossaryComponent implements OnInit {
  selectedSection?: string | null;
  @Input() items: any[]=[];
  textDescription: string = "";

  constructor(private route: ActivatedRoute, private dndApiService: DndApiService, private location: Location) { }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedSection = params.get('section');
      this.loadItems();
    });
  }

  loadItems(): void {
    switch (this.selectedSection) {
      case 'races':
        this.dndApiService.getRaces().subscribe((data: any) => {
          this.items = data.results;
          this.textDescription= "Civilized and savages, including humans and a tremendous variety of other species. They have language and culture, few if any innate magical abilities.";
        });
        break;
      case 'classes':
        this.dndApiService.getClasses().subscribe((data: any) => {
          this.items = data.results;
          this.textDescription= "By swords, sorcerery, pure evil or something else entirely! Your choices have never been greater.";
        });
        break;
      case 'alignments':
        this.dndApiService.getAlignments().subscribe((data: any) => {
          this.items = data.results;
        });
        break;
      case 'weapons':
        this.dndApiService.getWeapons().subscribe((data: any) => {
          this.items = data.equipment;
        });
        break;
      case 'spells':
        this.dndApiService.getSpells().subscribe((data: any) => {
          this.items = data.results;
        });
        break;
      case 'CombatGear':
        this.selectedSection = "Combat Gear"
        this.dndApiService.getCombatGear().subscribe((data: any) => {
          this.items = data.equipment;
        });
        break;
      case 'tools':
        this.dndApiService.getTools().subscribe((data: any) => {
          this.items = data.equipment;
        });
        break;
      case 'AdventuringGear':
        this.selectedSection = "Adventuring Gear"
        this.dndApiService.getAdventuringGear().subscribe((data: any) => {
          this.items = data.equipment;
        });
        break;
      default:
        this.items = [];
    }
  }
}
