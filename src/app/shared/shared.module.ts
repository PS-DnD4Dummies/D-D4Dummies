import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
  ],
  imports: [
    MatIconModule,
    CommonModule
  ],
  exports: [MatIconModule,CommonModule]
})
export class SharedModule { }
