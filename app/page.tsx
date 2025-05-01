// app/page.tsx

import BeerList from '@/components/Beers/BeerList';
import {  IBeer } from '@/types/index';
import OrderPopover from '@/components/Orders/OrderPopover';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default async function HomePage() {
  const snapshot = await getDocs(collection(db, 'beers'));

  const beers: IBeer[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      name: data.name,
      price: data.price || 300,
      quantity: data.quantity || 0,
      rating: data.rating || 0,
      description: data.description || 'No description',
    };
  });

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-red-500">Cervezas</h1>
      <BeerList beers={beers} />
      <OrderPopover />
    </main>
  );
}
