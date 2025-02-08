import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PropertyDetailsComponent} from './property-details/property-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'property/:id', component: PropertyDetailsComponent },
];
