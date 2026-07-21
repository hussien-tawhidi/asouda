export interface homeCategoryTypes {
  item: {
    slug: string;
    name: string;
    image: string;
    discount?: number;
  };
  big?: boolean;
}

export interface ProductColor {
  name: string; // سفید
  value: string; // #FFFFFF
  image?: string; // Optional image for this color
}

export interface MostSellProductType {
  _id: string;
  name: string;
  price: number;
  image: string[];
  category: string;

  size: string;
  material: string;

  colors: ProductColor[];

  rating: number;
  reviews: number;
  sold: number;
  stock: number;
  discount: number;

  brand?: string;
  description?: string;
  dimensions?: string;
  weight?: string;
  careInstructions?: string;
  features?: string[];
  bedSize?: string;
  frameType?: string;
  assemblyRequired?: boolean;
  warranty?: string;

  comment?: {
    comment: string;
    userId: string;
  }[];
}
