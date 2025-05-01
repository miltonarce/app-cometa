import { Order } from '@/types/index';
import BeerCard from '@/components/Beers/BeerCard';

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <div className="mb-4">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">Orden - {new Date(order.created).toLocaleString()}</h3>
          <div>{order.paid ? 'Pagado' : 'Pendiente'}</div>
        </div>
        <div className="text-sm mb-2 text-muted-foreground">
          Subtotal: ${order.subtotal} | Descuentos: ${order.discounts} | Impuestos: ${order.taxes}
        </div>
        <div className="border-t pt-2">
          {order.items.map((item, i) => (
            <BeerCard key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
