export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  priceAtTimeOfOrder: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  orderDate: string;
  status: string;
  totalAmount: number;
  items: OrderItem[];
}
