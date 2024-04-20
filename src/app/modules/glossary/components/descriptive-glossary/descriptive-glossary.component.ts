import {Component, Input, OnInit} from '@angular/core';
import {DndApiService} from "@core/services/dnd-api/dnd-api.service";
import {ActivatedRoute} from "@angular/router";
import { Location} from "@angular/common";

@Component({
  selector: 'app-descriptive-glossary',
  templateUrl: './descriptive-glossary.component.html',
  styleUrl: './descriptive-glossary.component.scss'
})

export class DescriptiveGlossaryComponent implements OnInit {
  selectedSection?: string | null;
  @Input() items: any[]=[];
  textDescription: string = "";
  filteredItems: any[] = [];
  searchTerm: string = "";
  noResults: boolean = false;

  constructor(private route: ActivatedRoute, private dndApiService: DndApiService, private location: Location) { }

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedSection = params.get('section');
      this.loadItems();
    });
    this.applyFilter();
    console.log(this.searchTerm);
  }

  loadItems(): void {
    switch (this.selectedSection) {
      case 'races':
        this.dndApiService.getRaces().subscribe((data: any) => {
          this.items = data.results;
          this.textDescription = "Civilized and savages, including humans and a tremendous variety of other species. They have language and culture, few if any innate magical abilities.";
          this.applyFilter();
        });
        break;
      case 'classes':
        this.dndApiService.getClasses().subscribe((data: any) => {
          this.items = data.results;
          this.textDescription = "By swords, sorcery, pure evil, or something else entirely! Your choices have never been greater.";
          this.applyFilter();
        });
        break;
      case 'alignments':
        this.dndApiService.getAlignments().subscribe((data: any) => {
          this.items = data.results;
          this.textDescription = "Explore the moral compass of characters, determining their ethical and moral perspectives.";
          this.applyFilter();
        });
        break;
      case 'weapons':
        this.dndApiService.getWeapons().subscribe((data: any) => {
          this.items = data.equipment;
          this.textDescription = "Equip your adventurers with an arsenal of weapons to face their foes.";
          this.applyFilter();
        });
        break;
      case 'spells':
        this.dndApiService.getSpells().subscribe((data: any) => {
          this.items = data.results;
          this.textDescription = "Harness the power of magic with a wide array of spells to suit any wizard or sorcerer.";
          this.applyFilter();
        });
        break;
      case 'CombatGear':
        this.selectedSection = "Combat Gear"
        this.dndApiService.getCombatGear().subscribe((data: any) => {
          this.items = data.equipment;
          this.textDescription = "Prepare for battle with specialized equipment designed for combat scenarios.";
          this.applyFilter();
        });
        break;
      case 'tools':
        this.dndApiService.getTools().subscribe((data: any) => {
          this.items = data.equipment;
          this.textDescription = "Equip your adventurers with essential tools for exploration, crafting, and survival.";
          this.applyFilter();
        });
        break;
      case 'AdventuringGear':
        this.selectedSection = "Adventuring Gear"
        this.dndApiService.getAdventuringGear().subscribe((data: any) => {
          this.items = data.equipment;
          this.textDescription = "Stock up on supplies and gear for your adventures into the unknown.";
          this.applyFilter();
        });
        break;
      default:
        this.items = [];
    }
  }

  applyFilter(): void {
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.noResults = this.filteredItems.length === 0;
  }

  filterItems(): void {
    this.applyFilter();
  }

}
