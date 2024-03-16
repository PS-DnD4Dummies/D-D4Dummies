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


@Component({
  selector: 'app-section-card',
  standalone: true,
  templateUrl: './section-card.component.html',
  imports: [
    FormsModule,
    NgForOf
  ],
  styleUrl: './section-card.component.scss'
})
export class SectionCardComponent {
  itemIndex: string | null = "";
  section: string | null = "";

  featureStates: boolean[] = [];

  itemInfo: any = {};
  fields: Field[] = [];

  constructor(private route: ActivatedRoute, private location: Location,
              private dndApiService: DndApiService
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
        // Cargar información de clases



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

}
