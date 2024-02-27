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
    path:'registro',
    loadChildren: () => import('./modules/register/register.module').then(m=> m.RegisterModule)
  },
  {
    path:'perfil',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
  },
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
