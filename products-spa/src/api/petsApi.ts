import type { Pet } from '../features/pets/types';

export async function fetchPets(): Promise<Pet[]> {
  const res = await fetch('https://dog.ceo/api/breeds/image/random/12');
  const data = await res.json();

  return data.message.map((url: string, index: number) => ({
    id: String(index),
    title: `Dog #${index + 1}`,
    description: 'Cute dog image!',
    image: url,
    liked: false,
  }));
}
