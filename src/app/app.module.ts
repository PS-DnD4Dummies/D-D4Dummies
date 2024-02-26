import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from "./app.component";
import {CoreModule} from "@core/core.module";
import {HeaderComponent} from "@layout/header/header.component";
import {FooterComponent} from "@layout/footer/footer.component";
import {SharedModule} from "@shared/shared.module";
import { AppRoutingModule } from './app-routing.module';

import { LocationStrategy, PathLocationStrategy } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
