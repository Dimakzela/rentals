export interface Property {
  id: number;
  address: string;
  description: string;
  availableFrom: Date;
  available: boolean;
  price: number;
  noOfBedroom: number;
  noOfBathroom: number;
  noOfParking: number;
  previewImage: string;
  images: string[];
  contactPerson: string
  contactPersonCellNumber: string
}

