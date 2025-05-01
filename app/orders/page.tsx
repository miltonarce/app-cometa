import { getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { collection } from 'firebase/firestore';
import { IOrder } from '@/types';
import OrderList from '@/components/Orders/OrderList';
import dayjs from 'dayjs';

export default async function OrdersPage() {
  const querySnapshot = await getDocs(collection(db, 'orders'));

  const orders: IOrder[] = querySnapshot.docs.map((doc) => {
    const orderData = doc.data();
    console.log('orderData', orderData);
    return {
      id: doc.id,
      created: dayjs(orderData.created).toISOString(),
      paid: orderData.paid,
      subtotal: orderData.subtotal,
      taxes: orderData.taxes,
      discounts: orderData.discounts,
      items: orderData.items,
      rounds: orderData.rounds,
    };
  });

  const inProgressOrders = orders.filter((order) => !order.paid);
  const pastOrders = orders.filter((order) => order.paid);

  return (
    <main className="max-w-2xl mx-auto py-8 px-4 space-y-10">
      <section>
        <h1 className="text-2xl font-bold mb-4">Órdenes en progreso</h1>
        <OrderList orders={inProgressOrders} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Órdenes pasadas</h2>
        <OrderList orders={pastOrders} />
      </section>
    </main>
  );
}
