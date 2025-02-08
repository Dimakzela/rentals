import {Component, input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {Property} from '../model/property';

@Component({
  selector: 'app-property-card',
  imports: [
    NgOptimizedImage,
    MatIcon
  ],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss'
})
export class PropertyCardComponent {
    readonly property = input<Property>();

}
