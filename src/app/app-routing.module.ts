import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from '@data/constanst/routes';


const routes: Routes = [
  {
    path:ROUTES.HOME.DEFAULT,
    loadChildren: () => import('./modules/home/home.module').then(m=> m.HomeModule),
  },
  {
    path:ROUTES.GLOSSARY.DEFAULT,
    loadChildren: () => import('./modules/glossary/glossary.module').then(m=> m.GlossaryModule)
  },
  {
    path:ROUTES.AUTH.DEFAULT,
    loadChildren: () => import('./modules/auth/auth.module').then(m=> m.AuthModule)
  },
  // {
  //   path:'creador-personaje',
  //   loadChildren:() => import('./modules/character-creator/character.module').then(m => m.character)
  // }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
