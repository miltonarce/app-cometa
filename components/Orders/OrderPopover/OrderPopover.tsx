'use client';

import { useOrderStore } from '@/store/useOrderStore';
import { saveOrderToFirebase } from '@/lib/orders';
import { useState } from 'react';
import dayjs from 'dayjs';

const OrderPopover = () => {
  const { rounds, clearOrder } = useOrderStore();
  const [loading, setLoading] = useState(false);

  const handleSendOrder = async () => {
    setLoading(true);
    const now = dayjs().toISOString();

    const subtotal = rounds
      .flatMap((r) => r.items)
      .reduce((acc, item) => acc + (item.price_per_unit || 0) * (item.total || 0), 0);

    const newOrder = {
      created: now,
      paid: false,
      subtotal,
      taxes: 0,
      discounts: 0,
      items: [],
      rounds,
    };

    try {
      const id = await saveOrderToFirebase(newOrder);
      console.log('Orden guardada con ID:', id);
      clearOrder();
    } catch (err) {
      console.error('Error al guardar la orden:', err);
    } finally {
      setLoading(false);
    }
  };

  if (rounds.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 w-[320px] bg-white shadow-xl rounded-2xl p-5 border border-gray-100 z-50">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Orden en progreso</h3>

      <ul className="text-sm text-gray-700 mb-4 space-y-2">
        {rounds.map((round, i) => (
          <li key={i}>
            <div className="font-medium mb-1">Ronda {i + 1}:</div>
            <ul className="ml-4 list-disc">
              {round.items.map((item, j) => (
                <li key={j}>
                  {item.name} <span className="text-gray-500">x{item.quantity}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <button
        disabled={loading}
        onClick={handleSendOrder}
        className={`w-full py-2 text-white rounded-xl font-medium transition ${
          loading
            ? 'bg-red-300 cursor-not-allowed'
            : 'bg-red-500 hover:bg-red-600 cursor-pointer'
        }`}
      >
        {loading ? 'Enviando...' : 'Ordenar ahora'}
      </button>
    </div>
  );
};

export default OrderPopover;