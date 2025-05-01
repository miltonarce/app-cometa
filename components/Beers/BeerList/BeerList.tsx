'use client';

import { useState } from 'react';
import { IBeer } from '@/types/index';
import BeerDetailPopover from '../BeerDetailPopover/BeerDetailPopover';
import StarRating from '@/components/StarRating';

const BeerList = ({ beers }: { beers: IBeer[] }) => {
  const [selectedBeer, setSelectedBeer] = useState<IBeer | null>(null);

  return (
    <>
      <div className="flex flex-col gap-4 bg-white p-4 rounded-xl">
        {beers.map((beer) => (
          <div
            key={beer.name}
            className="flex items-center gap-4 p-3 bg-white rounded-xl shadow border cursor-pointer"
            onClick={() => setSelectedBeer(beer)}
          >
            <img
              src={beer.image || '/images/placeholder.png'}
              alt={beer.name}
              className="h-16 w-16 rounded-md object-cover"
            />
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-gray-800">{beer.name}</h2>
              <p className="text-xs text-gray-500">$ {beer.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-1">
              <StarRating value={beer?.rating || 0} />
              <span className="text-xs text-gray-600">{beer?.rating?.toFixed(1)}</span>
            </div>
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
