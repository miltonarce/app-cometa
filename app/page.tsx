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
    },
    {
      name: 'Quilmes',
      price: 120,
      quantity: 0,
    },
    {
      name: 'Club Colombia',
      price: 110,
      quantity: 3,
    },
  ],
};

export default function HomePage() {
  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cervezas</h1>
      <BeerList beers={mockBeers.beers} />
      <OrderPopover />
    </main>
  );
}
