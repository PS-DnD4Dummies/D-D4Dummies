import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from "@modules/home/pages/home/home.component";
import { BannerComponent } from './components/banner/banner.component';
import { SharedModule } from '@shared/shared.module';
import { AppModule } from 'src/app/app.module';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
