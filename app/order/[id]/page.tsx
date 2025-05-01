'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { IOrder } from '@/types';
import dayjs from 'dayjs';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      const ref = doc(db, 'orders', String(id));
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setOrder(snap.data() as IOrder);
      }
      setLoading(false);
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p className="p-4">Cargando orden...</p>;
  if (!order) return <p className="p-4 text-red-600">Orden no encontrada</p>;

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Orden #{id}</h1>
      <p className="text-gray-600">Creada: {dayjs(order.created).format('DD/MM/YYYY HH:mm')}</p>
      <p className="text-gray-600">Estado: {order.paid ? 'Pagada' : 'Pendiente'}</p>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Resumen</h2>
        <p>Subtotal: ${order.subtotal}</p>
        <p>Impuestos: ${order.taxes}</p>
        <p>Descuentos: ${order.discounts}</p>
        <p className="font-bold mt-2">Total: ${order.subtotal + order.taxes - order.discounts}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Rondas</h2>
        {order.rounds.map((round, index) => (
          <div key={index} className="border rounded p-3">
            <p className="text-sm text-gray-500">
              Ronda {index + 1} - {dayjs(round.created).format('HH:mm:ss')}
            </p>
            <ul className="list-disc list-inside">
              {round.items.map((item, idx) => (
                <li key={idx}>
                  {item.quantity} × {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
