import { NgModule } from '@angular/core';
import {AppComponent} from "./app.component";
import {CoreModule} from "@core/core.module";
import {HeaderComponent} from "@layout/header/header.component";
import {FooterComponent} from "@layout/footer/footer.component";
import {SharedModule} from "@shared/shared.module";
import { AppRoutingModule } from './app-routing.module';

import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, CoreModule, SharedModule],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
