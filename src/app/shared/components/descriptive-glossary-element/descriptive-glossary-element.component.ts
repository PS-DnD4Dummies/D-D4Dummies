import {Component, Input} from '@angular/core';
import {DndApiService} from "@core/services/dnd-api/dnd-api.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-descriptive-glossary-element',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './descriptive-glossary-element.component.html',
  styleUrl: './descriptive-glossary-element.component.scss'
})
export class DescriptiveElementComponent {
  @Input() item: any; // Aquí deberías definir una interfaz para el elemento según tu estructura de datosmyImages: { [key: string]: string } = {
  myImages: { [key: string]: string } = {
    Barbarian: '/assets/glossary_icons/classes_icons/barbarian.png',
    Bard: '/assets/glossary_icons/classes_icons/bard.png',
    Cleric: '/assets/glossary_icons/classes_icons/cleric.png',
    Druid: '/assets/glossary_icons/classes_icons/druid.png',
    Fighter: '/assets/glossary_icons/classes_icons/fighter.png',
    Monk: '/assets/glossary_icons/classes_icons/monk.png',
    Paladin: '/assets/glossary_icons/classes_icons/paladin.png',
    Ranger: '/assets/glossary_icons/classes_icons/ranger.png',
    Rogue: '/assets/glossary_icons/classes_icons/rogue.png',
    Sorcerer: '/assets/glossary_icons/classes_icons/sorcerer.png',
    Warlock: '/assets/glossary_icons/classes_icons/warlock.png',
    Wizard: '/assets/glossary_icons/classes_icons/wizard.png',
    Dragonborn: '/assets/glossary_icons/races_icons/dragonborn.png',
    Dwarf: '/assets/glossary_icons/races_icons/dwarf.png',
    Elf: '/assets/glossary_icons/races_icons/elf.png',
    Gnome: '/assets/glossary_icons/races_icons/gnome.png',
    'Half-Elf': '/assets/glossary_icons/races_icons/halfelf.png',
    'Half-Orc': '/assets/glossary_icons/races_icons/halforc.png',
    Halfling: '/assets/glossary_icons/races_icons/halfling.png',
    Human: '/assets/glossary_icons/races_icons/human.png',
    Tiefling:'/assets/glossary_icons/races_icons/tiefling.png'
  };
  defaultImage: string = '/assets/glossary_icons/empty.png';

  constructor(private  dndApiService: DndApiService) {
  }
  ngOnInit(): void {
    //this.loadItems();
  }

  seeMore(item: any): void {
    // Implementa lo que desees hacer cuando se selecciona un elemento
  }

}
