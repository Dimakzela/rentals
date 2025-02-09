import {Component, inject, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {PropertyService} from "../service/property-service";
import {Property} from "../model/property";
import {ActivatedRoute} from "@angular/router";
import {NgClass, NgStyle} from "@angular/common";

@Component({
  selector: 'app-property-details',
  imports: [
    MatIcon,
    NgClass,
    NgStyle
  ],
  providers: [PropertyService],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss'
})
export class PropertyDetailsComponent implements OnInit {
  private readonly propertyService = inject(PropertyService);
  private readonly route = inject(ActivatedRoute);
  private id: string = '';
  //private id: string;
  //public property$: Observable<Property> = this.propertyService.getProperty(this.id);
  public property!: Property;
  public images: string[] = [];
  public currentImageIndex: number = 0;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Access the 'id' parameter from the URL
      this.propertyService.getProperty(this.id).subscribe(next => {
        this.property = next;
        this.images = next.images
        console.log(next)
      });

    });
  }

  public open(index: number): void {
    this.currentImageIndex = index;
  }

  public next(): void {
    if(this.currentImageIndex == this.images?.length - 1) {
      this.currentImageIndex = 0;
    }else {
      this.currentImageIndex++;
    }
  }

  public prev(): void {
    if(this.currentImageIndex == 0) {
      this.currentImageIndex = this.images?.length - 1;
    }else {
      this.currentImageIndex--;
    }
  }
}
