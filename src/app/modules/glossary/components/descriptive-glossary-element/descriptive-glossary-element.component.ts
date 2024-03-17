import { Component,Input } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { SectionCardComponent } from "@modules/glossary/components/section-card/section-card.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-descriptive-glossary-element',
  templateUrl: './descriptive-glossary-element.component.html',
  styleUrl: './descriptive-glossary-element.component.scss'
})
export class DescriptiveGlossaryElementComponent {
  itemImages: { [key: string]: string } = {
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
    Tiefling:'/assets/glossary_icons/races_icons/tiefling.png',
    'Chaotic Evil': '/assets/glossary_icons/alignments_icons/chaotic-evil.png',
    'Chaotic Good': '/assets/glossary_icons/alignments_icons/chaotic-good.png',
    'Chaotic Neutral': '/assets/glossary_icons/alignments_icons/chaotic-neutral.png',
    'Lawful Evil': '/assets/glossary_icons/alignments_icons/lawful-evil.png',
    'Lawful Good': '/assets/glossary_icons/alignments_icons/lawful-good.png',
    'Lawful Neutral': '/assets/glossary_icons/alignments_icons/lawful-neutral.png',
    'Neutral': '/assets/glossary_icons/alignments_icons/neutral.png',
    'Neutral Evil': '/assets/glossary_icons/alignments_icons/neutral-evil.png',
    'Neutral Good': '/assets/glossary_icons/alignments_icons/neutral-good.png',
  };
  defaultItemImage: string = '/assets/glossary_icons/empty.png';
  sectionImages: { [key: string]: string } = {
    'weapons': '/assets/glossary_icons/weapons.png',
    'spells': '/assets/glossary_icons/spells.png',
    'CombatGear': '/assets/glossary_icons/gear.png',
    'tools': '/assets/glossary_icons/tools.png',
    'AdventuringGear': '/assets/glossary_icons/adventuring-gear.png',
  };
  defaultSectionImage: string = '/assets/glossary_icons/default.png';

  @Input() item: any;
  section: string = "";

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.section = this.route.snapshot.params['section'];
  }

  seeMore(item: any): void {
    const section = this.route.snapshot.params['section'];
    const url = `/glossary/${section}/${item.index}`;
    this.router.navigate([url], { relativeTo: this.route });
  }

}
