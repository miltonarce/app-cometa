import { IOrder } from '@/types';
import OrderCard from '@/components/Orders/OrderCard';

const OrderList = ({
  orders,
  showStatus,
}: {
  orders: IOrder[];
  showStatus?: boolean;
}) => {
  if (orders.length === 0) {
    return <p className="text-gray-400 text-sm text-center">No hay órdenes registradas.</p>;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.created} order={order} showStatus={showStatus} />
      ))}
    </div>
  );
};

export default OrderList;