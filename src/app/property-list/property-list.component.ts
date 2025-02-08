import {Component, computed, inject} from '@angular/core';
import {PropertyCardComponent} from '../property-card/property-card.component';
import {PropertyService} from '../service/property-service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-property-list',
  imports: [
    PropertyCardComponent,
    RouterLink
  ],
  providers: [PropertyService],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss'
})
export class PropertyListComponent {

  private readonly propertyService = inject(PropertyService);

  public properties  = computed(() => this.propertyService.getPropertiesResource.value() || []);

}
