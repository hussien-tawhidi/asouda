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
  image: File[] | string[];
  category: string;
  size: string;
  material: string;

  colors: ProductColor[];

  rating: number;
  reviews?: number;
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
  sold?: number;
  comment?: {
    comment: string;
    userId: string;
  }[];
}

export interface MultipleImageUploadType {
  images: File[];
  setImages: (files: File[]) => void;
  maxImages?: number;
  required?: boolean;
}

export interface SearchOverlayProps {
  query: string;
  setQuery: (value: string) => void;
  recentSearches: string[];
  onClose: () => void;
  onSearch: (term: string) => void;
}

export interface SearchInputProps {
  query: string;
  setQuery: (value: string) => void;
  onClose: () => void;
  onSearch: (term: string) => void;
}

export interface SearchSuggestionsProps {
  recentSearches: string[];
  onSearch: (term: string) => void;
}

export interface SearchResultsProps {
  query: string;
  onSearch: (term: string) => void;
}

export interface userAddressesType {
  title: string;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  receiver: string;
  phone: string;
  isDefault: boolean;
}