'use client';

import { useState } from 'react';
import { IBeer } from '@/types/index';
import BeerDetailPopover from '../BeerDetailPopover/BeerDetailPopover';

const BeerList = ({ beers }: { beers: IBeer[] }) => {
  const [selectedBeer, setSelectedBeer] = useState<IBeer | null>(null);

  return (
    <>
      <div className="grid gap-4">
        {beers.map((beer) => (
          <div
            key={beer.name}
            className="p-4 border rounded-lg shadow-sm cursor-pointer"
            onClick={() => setSelectedBeer(beer)}
          >
            <img
              src={beer.image || '/images/placeholder.png'}
              alt={beer.name}
              className="h-32 w-full object-cover rounded-md mb-2"
            />
            <h2 className="font-semibold">{beer.name}</h2>
            <p className="text-sm text-muted-foreground">${beer.price}</p>
          </div>
        ))}
      </div>

      {selectedBeer && (
        <BeerDetailPopover beer={selectedBeer} onClose={() => setSelectedBeer(null)} />
      )}
    </>
  );
};

export default BeerList;
