import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-informative-glossary',
  standalone: true,
  imports: [],
  templateUrl: './informative-glossary.component.html',
  styleUrl: './informative-glossary.component.scss'
})
export class InformativeGlossaryComponent {
  selectedSection?: string | null;
  @Input() items: any[]=[]

  constructor(private route: ActivatedRoute, private location: Location) { }

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
      case 'KnowYourRolls':
        this.selectedSection = "Know Your Roles";
        // Fire
        break;
      case 'combat':
        // Fire
        break;
      case 'adventure':
        // Fire
        break;
      default:
        this.items = [];
    }
  }

}
