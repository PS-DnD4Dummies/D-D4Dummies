import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lore-section',
  templateUrl: './lore-section.component.html',
  styleUrls: ['./lore-section.component.scss']
})
export class LoreSectionComponent { 
  @Input() labelText: string = '';
  @Input() isDisabled: boolean = true;
  @Input() placeholder: string = 'You must roll the dice first to write something!';
  @Input() textAreaContent: string = '';
}

