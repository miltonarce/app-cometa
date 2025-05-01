// app/page.tsx

import BeerList from '@/components/Beers/BeerList';
import { IBeers } from '@/types/index';
import OrderPopover from '@/components/Orders/OrderPopover';

const mockBeers: IBeers = {
  last_updated: '2024-09-10 12:00:00',
  beers: [
    {
      name: 'Corona',
      price: 115,
      quantity: 2,
      rating: 5,
    },
    {
      name: 'Quilmes',
      price: 120,
      quantity: 0,
      rating: 1.5,
    },
    {
      name: 'Club Colombia',
      price: 110,
      quantity: 3,
      rating: 3.5,
    },
    {
      name: 'Heineken',
      price: 200,
      quantity: 10,
      rating: 5,
    },
    {
      name: 'Brahama',
      price: 100,
      quantity: 20,
      rating: 1,
    },
  ],
};

export default function HomePage() {
  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-red-500">Cervezas</h1>
      <BeerList beers={mockBeers.beers} />
      <OrderPopover />
    </main>
  );
}
