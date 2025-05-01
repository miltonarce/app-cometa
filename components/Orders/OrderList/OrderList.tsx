import { Order } from '@/types/index';
import OrderCard from '@/components/Orders/OrderCard';

const OrderList = ({ orders }: { orders: Order[] }) => {
  if (orders.length === 0) {
    return <p className="text-muted-foreground">No hay órdenes registradas.</p>;
  }

  return (
    <div>
      {orders.map((order, i) => (
        <OrderCard key={i} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
