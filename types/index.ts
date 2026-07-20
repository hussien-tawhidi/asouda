export interface homeCategoryTypes {
  item: {
    slug: string;
    name: string;
    image: string;
    discount?: number;
  };
  big?: boolean;
}

export interface MostSellProductType {
  id: number;
  name: string;
  image: string;
  category: string;
  material: string;
  size: string;
  rating: number;
  reviews: number;
  price: number;
  discount: number;
}