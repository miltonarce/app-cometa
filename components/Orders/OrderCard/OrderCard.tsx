import { IOrder } from '@/types';
import dayjs from 'dayjs';

const OrderCard = ({
  order,
  showStatus,
}: {
  order: IOrder;
  showStatus?: boolean;
}) => {
  const allItems = order.rounds.flatMap((round) => round.items || []);
  const totalItems = allItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const totalRounds = order.rounds.length;

  const firstItemWithName = allItems.find((item) => item.name);

  return (
    <div className="flex items-center gap-4 bg-white rounded-xl shadow p-4 transition-all hover:shadow-lg">
      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200 shrink-0">
        <img
          src="/images/placeholder.png"
          alt={firstItemWithName?.name || 'Orden'}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-base font-semibold text-gray-800">
          {firstItemWithName?.name || 'Orden'}
        </h3>
        <p className="text-sm text-gray-500">
          {totalItems} {totalItems === 1 ? 'item' : 'items'} • {totalRounds} {totalRounds === 1 ? 'ronda' : 'rondas'} • ${order.subtotal.toFixed(2)}
        </p>

        {showStatus && (
          <p className="text-xs text-gray-400 mt-1 flex justify-between">
            <span>{dayjs(order.created).format('MMM D, HH:mm')}</span>
            <span className={order.paid ? 'text-green-500' : 'text-red-500'}>
              {order.paid ? 'Pagada' : 'Pendiente'}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderCard;