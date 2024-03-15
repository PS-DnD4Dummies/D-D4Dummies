import {Component, Input, OnInit} from '@angular/core';
import {DndApiService} from "@core/services/dnd-api/dnd-api.service";
import {ActivatedRoute} from "@angular/router";
import {NgForOf, NgIf, UpperCasePipe, Location} from "@angular/common";
import {
  DescriptiveGlossaryElementComponent
} from "@shared/components/descriptive-glossary-element/descriptive-glossary-element.component";

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
  @Input() items: any[]=[]; // Aquí deberías definir una interfaz para los elementos según tu estructura de datos
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
          this.textDescription= "Aqui un poco texto paranoia de que son las razas ";
        });
        break;
      case 'classes':
        this.dndApiService.getClasses().subscribe((data: any) => {
          this.items = data.results;
          this.textDescription= "Aqui un poco texto paranoia de que son las clases y taituca ";
        });
        break;
      case 'alignments':
        this.dndApiService.getAlignments().subscribe((data: any) => {
          this.items = data.results;
        });
        break;
      case 'KnowYourRolls':
        // Fire
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
        this.dndApiService.getCombatGear().subscribe((data: any) => {
          this.items = data.equipment;
        });
        break;
      case 'combat':
        // Fire
        break;
      case 'adventure':
        // Fire
        break;
      case 'tools':
        this.dndApiService.getTools().subscribe((data: any) => {
          this.items = data.equipment;
        });
        break;
      case 'AdventuringGear':
        this.dndApiService.getAdventuringGear().subscribe((data: any) => {
          this.items = data.equipment;
        });
        break;
      default:
        this.items = [];
    }
  }
}
