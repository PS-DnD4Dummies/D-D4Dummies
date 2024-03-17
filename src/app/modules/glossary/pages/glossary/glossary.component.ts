import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToSection(section: string): void {
    this.router.navigate(['/glossary', section]);
  }

  goToInfo(section: string): void {
  this.router.navigate(['/glossary/info', section]);
}

}
