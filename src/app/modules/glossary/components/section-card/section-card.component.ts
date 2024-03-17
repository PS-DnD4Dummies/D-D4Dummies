import {Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {
  AdventuringGearInfo,
  AlignmentInfo,
  ArmorInfo,
  Field,
  RaceInfo,
  SpellInfo,
  ToolInfo,
  WeaponInfo
} from "@data/interfaces/api_parameters";
import {DndApiService} from "@core/services/dnd-api/dnd-api.service";
import { FirebaseService } from '@core/services/firebase/firebase.service';
import { FirestoreService } from '@core/services/firebase/firestore/firestore.service';


@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.scss'
})
export class SectionCardComponent {
  itemIndex: string | null = "";
  section: string | null = "";

  featureStates: boolean[] = [];

  itemInfo: any = {};
  fields: Field[] = [];

  constructor(private route: ActivatedRoute, private location: Location,
              private dndApiService: DndApiService, private firestoreService:FirestoreService
              ) {}

  goBack(): void {
    this.location.back();
  }

  toggleFeature(featureIndex: number) {
    if (this.featureStates.length <= featureIndex) {
      this.featureStates[featureIndex] = false;
    }
    this.featureStates[featureIndex] = !this.featureStates[featureIndex];
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.itemIndex = params.get('itemIndex');
      this.section = params.get('section');

      if (this.section?.includes('races')) {
        this.dndApiService.getRace(this.itemIndex).subscribe((data: RaceInfo) => {
          this.itemInfo = data;

          this.itemInfo.traitsAsString = this.getTraitNames(data.traits);
          this.fields = [
            { key: 'age', label: 'Age' },
            { key: 'alignment', label: 'Alignment' },
            { key: 'size_description', label: 'Size Description' },
            { key: 'language_desc', label: 'Languages' },
            { key: 'traitsAsString', label: 'Traits' },
          ];
        });


      } else if (this.section?.includes('classes')) {
        this.firestoreService.readClass((this.itemIndex ?? 'defaultValue').toLowerCase()).then(baseClass => {
          this.itemInfo = baseClass;
          this.fields = [
            { key: 'description', label: 'Class Description', value: this.itemInfo.description },
            { key: 'hit_die', label: 'Hit Die', value: this.itemInfo.hit_die  },
            { key: 'proficiencies', label: 'Proficiency', value: this.itemInfo.proficiencies },
            { key: 'proficiency_choices', label: 'Proficiency Choices', value: this.itemInfo.proficiency_choices },
            { key: 'saving_throws', label: 'Saving Throws', value: this.itemInfo.saving_throws  },
            { key: 'starting_equipment', label: 'Starting Equipment', value: this.itemInfo.starting_equipment  },
            { key: 'starting_equipment_options', label: 'Starting Equipment Options', value: this.itemInfo.starting_equipment_options  },
            { key: 'subclasses', label: 'Subclasses', value: this.itemInfo.subclasses  },

            {key: 'spellcasting_ability', label: 'Spellcasting Ability', value: this.itemInfo.spellcasting_ability && this.itemInfo.spellcasting_ability.length > 0 ? this.itemInfo.spellcasting_ability : null },
            {key: 'cantrips', label: 'Cantrips', value: this.itemInfo.cantrips && this.itemInfo.cantrips.length > 0 ? this.itemInfo.cantrips : null },
            {key: 'spell_slots', label: 'Spell Slots', value: this.itemInfo.spell_slots && this.itemInfo.spell_slots.length > 0 ? this.itemInfo.spell_slots : null },
            {key: 'spells_known_of_1st_level_and_higher', label: 'Spells known of 1st level and higher', value: this.itemInfo.spells_known_of_1st_level_and_higher && this.itemInfo.spells_known_of_1st_level_and_higher.length > 0 ? this.itemInfo.spells_known_of_1st_level_and_higher : null },
            {key: 'spellcasting_focus', label: 'Spellcasting Focus', value: this.itemInfo.spellcasting_focus && this.itemInfo.spellcasting_focus.length > 0 ? this.itemInfo.spellcasting_focus : null },

          ].filter(field => field.value !== undefined && field.value !== null);
        });


      } else if (this.section?.includes('alignments')) {
        this.dndApiService.getAlignment(this.itemIndex).subscribe((data: AlignmentInfo) => {
          this.itemInfo = data;
          this.fields = [
            { key: 'desc', label: 'Description' }
          ];
        });


      } else if (this.section?.includes('weapons')) {
        this.dndApiService.getWeapon(this.itemIndex).subscribe((data: WeaponInfo) => {
          this.itemInfo = data;

          const normalRange = this.itemInfo.range.normal;
          const longRange = this.itemInfo.range.long;
          this.itemInfo.rangeAsString = longRange !== undefined ?
            `Normal: ${normalRange}, Long: ${longRange}` :
            `Normal: ${normalRange}`;
          this.fields = [
            { key: 'category_range', label: 'Category Ranged' },
            { key: 'rangeAsString', label: 'Range' },
            { key: 'weight', label: 'Weight' },
          ];
        });


      } else if (this.section?.includes('spells')) {
        this.dndApiService.getSpell(this.itemIndex).subscribe((data: SpellInfo) => {
          this.itemInfo = data;
          this.fields = [
            { key: 'desc', label: 'Description' },
            { key: 'duration', label: 'Duration' },
            { key: 'range', label: 'Range' },
          ];
        });


      } else if (this.section?.includes('CombatGear')) {
        this.dndApiService.getArmor(this.itemIndex).subscribe((data: ArmorInfo) => {
          this.itemInfo = data;
          this.fields = [
            {key: 'armor_category', label: 'Armor Category', value: this.itemInfo.armor_category},
            {key: 'stealth_disadvantage', label: 'Stealth Disadvantage', value: this.itemInfo.stealth_disadvantage},
            {key: 'weight', label: 'Weight', value: this.itemInfo.weight},
            {key: 'desc', label: 'Description', value: this.itemInfo.desc && this.itemInfo.desc.length > 0 ? this.itemInfo.desc : null },
          ].filter(field => field.value !== undefined && field.value !== null);
        });


      } else if (this.section?.includes('tools')) {
        this.dndApiService.getTool(this.itemIndex).subscribe((data: ToolInfo) => {
          this.itemInfo = data;
          this.fields = [
            {key: 'tool_category', label: 'Tool Category'},
            {key: 'desc', label: 'Description'},
            {key: 'weight', label: 'Weight'},
          ];
        });


      } else if (this.section?.includes('AdventuringGear')) {
        this.dndApiService.getAdventureGearInfo(this.itemIndex).subscribe((data: AdventuringGearInfo) => {
          this.itemInfo = data;
          this.itemInfo.gearCategoryAsString = this.getGearCategoryNames(data.gear_category);
          this.fields = [
            {key: 'gearCategoryAsString', label: 'Gear Category', value: this.itemInfo.gearCategoryAsString },
            {key: 'desc', label: 'Description', value: this.itemInfo.desc && this.itemInfo.desc.length > 0 ? this.itemInfo.desc : null },
            {key: 'weight', label: 'Weight', value: this.itemInfo.weight },
          ].filter(field => field.value !== undefined && field.value !== null);
        });
      }

    });
  }

  getTraitNames(traits: any[]): string {
    if (!traits || !Array.isArray(traits)) return '';
    return traits.map(trait => trait.name).join(', ');
  }

  getGearCategoryNames(gearCategory: any): string {
    if (!gearCategory || !gearCategory.name) return '';
    return gearCategory.name;
  }

  formatNewLines(text: string): string {
    return text.replace(/\\n/g, '<br> - ');
  }

}
