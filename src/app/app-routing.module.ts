import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./modules/home/home.module').then(m=> m.HomeModule),
  },
  {
    path:'glosario',
    loadChildren: () => import('./modules/glossary/glossary.module').then(m=> m.GlossaryModule) 
  },
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
