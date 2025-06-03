import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PropertyDetailsComponent} from './property-details/property-details.component';
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegistrationPageComponent} from "./registration-page/registration-page.component";
import {AdminComponent} from "./admin/admin.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'property/:id', component: PropertyDetailsComponent },
  { path: 'login', component: LoginPageComponent},
  { path: 'register', component: RegistrationPageComponent},
  { path: 'admin', component: AdminComponent},

  { path: '**', redirectTo: '',},
];
