import { Component } from '@angular/core';
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {PropertyListComponent} from "../property-list/property-list.component";

@Component({
  selector: 'app-home',
  imports: [
    SearchBarComponent,
    PropertyListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
