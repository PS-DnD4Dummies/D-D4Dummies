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
    // Si aún no se ha inicializado el estado del desplegable, lo inicializamos como false
    if (this.featureStates.length <= featureIndex) {
      this.featureStates[featureIndex] = false;
    }
    // Cambiamos el estado del desplegable correspondiente
    this.featureStates[featureIndex] = !this.featureStates[featureIndex];
  }

  ngOnInit(): void {
    console.log('Initializing SectionCardComponent');
    this.route.paramMap.subscribe(params => {
      console.log('Received params:', params);
      this.itemIndex = params.get('itemIndex');
      this.section = params.get('section');
      console.log('Item index:', this.itemIndex)
      // Aquí puedes determinar la sección actual y cargar la información correspondiente
      if (this.section?.includes('races')) {
        console.log('Loading race data for:', this.itemIndex);
        // Cargar información de razas
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
