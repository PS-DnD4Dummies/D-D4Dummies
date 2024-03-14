import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {ModalService} from "@core/services/modal/modal.service";

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

  @Input() item: any;

  constructor(private modalService: ModalService) {}

  seeMore(item: any): void {
    this.modalService.openModal(item);
  }

}
