import { Component } from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {PropertyListComponent} from "../property-list/property-list.component";

@Component({
  selector: 'app-home',
  imports: [
    MatFormField,
    MatIcon,
    MatInput,
    MatIconButton,
    SearchBarComponent,
    PropertyListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
