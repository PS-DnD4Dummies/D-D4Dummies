import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import { RealtimedbService } from '@core/services/firebase/realtimedb/realtimedb.service';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent implements OnInit {
  constructor(
    private router: Router,
    private realTimeService:RealtimedbService
  ) {}

  @ViewChild('sectionCharacter') sectionCharacter: any;

  photos!: any;

  ngOnInit(): void {
    this.loadImages();
  }

  async loadImages(){ 
    
    this.realTimeService.readPhotos("glossaryPhotos").then(result => {
      this.photos = result;    

    });
  }


  goToSection(section: string): void {
    this.router.navigate(['/glossary', section]);
  }

  goToInfo(section: string): void {
  this.router.navigate(['/glossary/info', section]);
}

}
