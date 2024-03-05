import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserAnimationsModule,
    MatIconModule,
    CommonModule,
    RouterModule,
  ],
  exports: [CommonModule,RouterModule,BrowserAnimationsModule,MatIconModule]
})
export class SharedModule { }
