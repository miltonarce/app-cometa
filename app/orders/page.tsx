'use client';

import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { IOrder } from '@/types';
import dayjs from 'dayjs';
import OrderList from '@/components/Orders/OrderList';

export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [tab, setTab] = useState<'progress' | 'past'>('progress');

  useEffect(() => {
    const fetchOrders = async () => {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const fetchedOrders: IOrder[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          created: dayjs(data.created).toISOString(),
          paid: data.paid,
          subtotal: data.subtotal,
          taxes: data.taxes,
          discounts: data.discounts,
          items: data.items,
          rounds: data.rounds,
        };
      });
      setOrders(fetchedOrders);
    };

    fetchOrders();
  }, []);

  const filteredOrders = tab === 'progress'
    ? orders.filter((o) => !o.paid)
    : orders.filter((o) => o.paid);

  return (
    <main className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-800">Tus Órdenes</h1>
        <p className="text-sm text-gray-500">Esperando la mejor cerveza.</p>
      </div>

      <div className="flex border-b mb-4">
        <button
          className={`flex-1 pb-2 text-sm font-medium ${
            tab === 'progress' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-400'
          }`}
          onClick={() => setTab('progress')}
        >
          En progreso
        </button>
        <button
          className={`flex-1 pb-2 text-sm font-medium ${
            tab === 'past' ? 'border-b-2 border-red-500 text-red-500' : 'text-gray-400'
          }`}
          onClick={() => setTab('past')}
        >
          Órdenes pasadas
        </button>
      </div>

      <OrderList orders={filteredOrders} showStatus/>
    </main>
  );
}