export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    image: string;
    brand?: string;
    price?: number;
    stock?: number;
    createdAt?: Date;   // timestamps
    updatedAt?: Date;
  }