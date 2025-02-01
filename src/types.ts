export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  firstName: string;
  lastName: string;
  items: CartItem[];
  totalPrice: number;
  date: string;
}

export interface Category {
  id: string;
  name: string;
}