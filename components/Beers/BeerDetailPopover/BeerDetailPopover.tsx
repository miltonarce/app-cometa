import { useState } from 'react';
import { IBeer } from '@/types/index';
import { useOrderStore } from '@/store/useOrderStore';

const BeerDetailPopover = ({ beer, onClose }: { beer: IBeer; onClose: () => void }) => {
  const [quantity, setQuantity] = useState(1);
  const addRound = useOrderStore((state) => state.addRound);

  const handleAddToOrder = () => {
    addRound([
      {
        name: beer.name,
        total: beer.price * quantity,
        price_per_unit: beer.price,
        quantity: quantity,
      },
    ]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-black rounded-2xl p-6 w-[90%] max-w-md shadow-xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl text-white">
          ×
        </button>
        <img
          src={beer.image || '/images/placeholder.png'}
          alt={beer.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-xl font-bold text-white">{beer.name}</h2>

        <div className="flex items-center justify-between my-4 text-white">
          <span>Cantidad:</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="text-lg px-2">
              −
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} className="text-lg px-2">
              +
            </button>
          </div>
        </div>

        <div className="text-right font-semibold text-lg text-white mb-4">
          Total: ${beer.price * quantity}
        </div>

        <button onClick={handleAddToOrder} className="w-full bg-red-500 text-white py-2 rounded-xl">
          Agregar a la orden
        </button>
      </div>
    </div>
  );
};

export default BeerDetailPopover;
