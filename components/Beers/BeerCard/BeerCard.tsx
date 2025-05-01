import { IOrderItem } from '@/types/index';

const BeerCard = ({ item }: { item: IOrderItem }) => (
  <div className="flex justify-between items-center py-1">
    <span>{item.name}</span>
    <span className="text-muted-foreground">x{item.quantity}</span>
  </div>
);

export default BeerCard;
