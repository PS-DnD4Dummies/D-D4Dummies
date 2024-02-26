import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './modules/home/home.module';
import { HomeComponent } from './modules/home/pages/home/home.component';

const routes: Routes = [
  {
    path: 'home', // Ruta de inicio
    component: HomeComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirigir desde la ruta base a /home
  { path: '**', redirectTo: 'home', pathMatch: 'full' }, // Manejo de rutas no encontradas
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
