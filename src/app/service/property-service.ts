import {Injectable, resource} from '@angular/core';
import {Property} from '../model/property';

@Injectable()
export class PropertyService {

  public getPropertiesResource = resource({
    loader: async () => {
      const response = await fetch(
        'property.json'
      );
      return await (await response.json() as Promise<Property[]>);
    },
  });
}
