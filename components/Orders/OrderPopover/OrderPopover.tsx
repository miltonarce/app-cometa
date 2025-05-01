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
    <div className="fixed bottom-4 right-4 bg-black border shadow-lg p-4 rounded-lg w-[300px] z-50">
      <h3 className="font-bold text-lg mb-2">Orden en progreso</h3>
      <ul className="text-sm mb-3">
        {rounds.map((round, i) => (
          <li key={i}>
            Ronda {i + 1}:
            <ul className="ml-4">
              {round.items.map((item, j) => (
                <li key={j}>
                  {item.name} x{item.quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <button disabled={loading} onClick={handleSendOrder}>
        {loading ? 'Enviando...' : 'Ordenar ahora'}
      </button>
    </div>
  );
};

export default OrderPopover;
