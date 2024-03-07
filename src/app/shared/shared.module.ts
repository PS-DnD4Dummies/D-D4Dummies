import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@core/core.module';
import { LoginComponent } from './components/login-popup/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [MatIconModule,CommonModule,LoginComponent,MatFormFieldModule,MatInputModule]
})
export class SharedModule { }
