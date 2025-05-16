import {Component, inject, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {PropertyService} from "../service/property-service";
import {Property} from "../model/property";
import {ActivatedRoute} from "@angular/router";
import {NgClass, NgStyle} from "@angular/common";
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-property-details',
  standalone: true,
  standalone: true,
  imports: [
    MatIcon,
    NgClass,
    NgStyle,
    CommonModule
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

  private http = inject(HttpClient);
  public properties: any[] = [];
  //public currentIndex = 0;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Access the 'id' parameter from the URL
      this.propertyService.getProperty(this.id).subscribe(next => {
        this.property = next;
        this.images = next.images
        console.log(next)
      });

    });

    this.http.get<any[]>('properties.json').subscribe(data => {
      this.properties = data; //Access properties.json from the public folder
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
