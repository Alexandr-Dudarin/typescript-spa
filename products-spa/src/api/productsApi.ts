import { Product } from '../features/products/types';

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();

  return data.map((item: any) => ({
    id: String(item.id),
    title: item.title,
    description: item.description,
    image: item.image,
    liked: false,
  }));
}
