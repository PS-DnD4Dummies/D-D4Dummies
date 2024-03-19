import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { Auth } from '@angular/fire/auth';
import { components } from '@modules/glossary/components';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'signUp', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

