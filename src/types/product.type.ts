export interface Product {
  _id: string;
  images: string[];
  price: number;
  rating: number;
  price_before_discount: number;
  quantity: number;
  sold: number;
  view: number;
  name: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductList {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    page_size: number;
  };
}

export interface ProductListConfig {
  page?: number | string;
  limit?: number | string;
  sort_by?: 'createdAt' | 'price' | 'sold' | 'view';
  order?: 'asc' | 'desc';
  exclude?: string;
  rating_filer?: number | string;
  price_max?: number | string;
  price_min?: number | string;
  name?: string;
}
