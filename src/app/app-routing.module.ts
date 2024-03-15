import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DescriptiveGlossaryComponent} from "@shared/components/descriptive-glossary/descriptive-glossary.component";
import {SectionCardComponent} from "@shared/components/section-card/section-card.component";
import {InformativeGlossaryComponent} from "@shared/components/informative-glossary/informative-glossary.component";

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./modules/home/home.module').then(m=> m.HomeModule),
  },
  {
    path:'glossary',
    loadChildren: () => import('./modules/glossary/glossary.module').then(m=> m.GlossaryModule)
  },
  { path: 'glossary/:section', component: DescriptiveGlossaryComponent },
  { path: 'glossary/:section/:itemIndex', component: SectionCardComponent,},
  { path: 'glossary/info/:section', component: InformativeGlossaryComponent,},
  {
    path:'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m=> m.AuthModule)
  }
  // {
  //   path:'creador-personaje',
  //   loadChildren:() => import('./modules/caracter-creator/caracter.module').then(m => m.caracter)
  // }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: false })],
	exports: [RouterModule],
})
export class AppRoutingModule { }
