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
import { AuthRoutingModule } from '@modules/auth/auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { components } from './components';
import {MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
  declarations: [
    components
  ],
  imports: [
    MatIconModule,
    MatPaginatorModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule
  ],
  exports: [MatIconModule,CommonModule,LoginComponent,MatFormFieldModule,MatInputModule,FormsModule,ReactiveFormsModule,MatButtonModule,MatSidenavModule,MatButtonModule,MatMenuModule,MatSnackBarModule,MatPaginatorModule, ...components]
})
export class SharedModule { }