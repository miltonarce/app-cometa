import { IOrder } from '@/types';
import dayjs from 'dayjs';

const OrderCard = ({
  order,
  showStatus,
}: {
  order: IOrder;
  showStatus?: boolean;
}) => {
  const item = order.items[0];
  const totalItems = order.items.reduce((acc, i) => acc + (i.quantity || 1), 0);

  return (
    <div className="flex items-center gap-4 bg-white rounded-xl shadow p-4">
      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200">
      <img src="/images/placeholder.png" alt={item?.name || 'Orden'}  className="object-cover" />
      </div>

      <div className="flex-1">
        <h3 className="text-base font-semibold text-gray-800">{item?.name || 'Orden'}</h3>
        <p className="text-sm text-gray-500">
          {totalItems} {totalItems === 1 ? 'item' : 'items'} • ${order.subtotal}
        </p>
        {showStatus && (
          <p className="text-xs text-gray-400 mt-1 flex justify-between">
            {dayjs(order.created).format('MMM D, HH:mm')}
            {order.paid ? (
              <span className="text-green-500">Paid</span>
            ) : (
              <span className="text-red-500">Cancelled</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderCard;