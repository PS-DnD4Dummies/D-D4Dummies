import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlossaryComponent } from './pages/glossary/glossary.component';
import {InformativeGlossaryComponent} from "@shared/components/informative-glossary/informative-glossary.component";
import {SectionCardComponent} from "@shared/components/section-card/section-card.component";
import {DescriptiveGlossaryComponent} from "@shared/components/descriptive-glossary/descriptive-glossary.component";

const routes: Routes = [
  { path: '', component: GlossaryComponent },
  { path: 'info/:section', component: InformativeGlossaryComponent },
  { path: ':section/:itemIndex', component: SectionCardComponent },
  { path: ':section', component: DescriptiveGlossaryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlossaryRoutingModule {}
