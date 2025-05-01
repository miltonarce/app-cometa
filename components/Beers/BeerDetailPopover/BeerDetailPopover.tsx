import { useState } from 'react';
import { IBeer } from '@/types/index';
import { useOrderStore } from '@/store/useOrderStore';
import StarRating from '@/components/StarRating';

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
      <div className="bg-white rounded-xl p-7 w-[90%] max-w-md shadow-lg relative text-gray-800">
        <button
          onClick={onClose}
          className="absolute top-0.5 right-3 text-gray-500 text-xl font-semibold cursor-pointer"
        >
          ×
        </button>

        <img
          src={beer.image || '/images/placeholder.png'}
          alt={beer.name}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />

        <h2 className="text-lg font-semibold mb-1">{beer.name}</h2>

        <div className="flex items-center gap-2 mb-2">
          <StarRating value={beer.rating || 0} />
          <span className="text-sm text-gray-500">{beer?.rating?.toFixed(1)}</span>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed mb-3">
          Makanan khas Bandung yang cukup sering dipesan oleh anak muda dengan pola makan yang cukup
          tinggi dengan mengutamakan diet yang sehat dan teratur.
        </p>

        <p className="text-sm font-semibold mb-1">Ingredients:</p>
        <p className="text-sm text-gray-500 mb-4">Seledri, telur, blueberry, madu.</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Cantidad:</span>
          <div className="flex items-center gap-3 border rounded-full px-3 py-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="text-lg font-bold text-gray-600 cursor-pointer"
            >
              −
            </button>
            <span className="text-sm font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="text-lg font-bold text-gray-600 cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-500 mb-1">Total:</div>
        <div className="text-lg font-bold text-gray-800 mb-4">
          $ {(beer.price * quantity).toLocaleString('id-ID')}
        </div>

        <button
          onClick={handleAddToOrder}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-medium cursor-pointer transition duration-200"
        >
          Ordenar ahora
        </button>
      </div>
    </div>
  );
};

export default BeerDetailPopover;