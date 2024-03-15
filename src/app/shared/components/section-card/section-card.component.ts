import {Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Field, RaceInfo } from "../index";
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
        console.log('Loading race data for:', this.itemIndex);
        this.dndApiService.getRace(this.itemIndex).subscribe((data: RaceInfo) => {
          console.log('Received race data:', data);
          this.itemInfo = data;
          this.fields = [
            { key: 'age', label: 'Age' },
            { key: 'alignment', label: 'Alignment' },
            { key: 'size_description', label: 'Size Description' },
            { key: 'language_desc', label: 'Languages' }
          ];
        });

      } else if (this.itemIndex?.startsWith('classes')) {
        // Cargar información de clases
      }


    });
  }

}
