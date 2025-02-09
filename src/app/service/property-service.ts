import {inject, Injectable, resource} from '@angular/core';
import {Property} from '../model/property';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PropertyService {
  private readonly http: HttpClient = inject(HttpClient);
  public getPropertiesResource = resource({
    loader: async () => {
      const response = await fetch(
        'properties.json'
      );
      return await (await response.json() as Promise<Property[]>);
    },
  });

  public getPropertyResource = resource({
    loader: async () => {
      const response = await fetch(
        'property.json'
      );
      return await (await response.json() as Promise<Property>);
    },
  });

  public getProperty(id: string): Observable<Property> {
    return this.http.get<Property>('property.json');
  }
}
