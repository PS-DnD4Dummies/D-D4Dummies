import { Component, OnInit } from '@angular/core';
import { DndApiService } from '@core/services/dnd-api/dnd-api.service';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent implements OnInit {
  classes: any[] = [];

  constructor(private dndApiService: DndApiService) { }

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.dndApiService.getClasses().subscribe(
      (data: any) => {
        this.classes = data.results;
      },
      (error: any) => {
        console.error('Error loading classes:', error);
      }
    );
  }
}
