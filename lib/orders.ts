import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { IOrder } from '@/types/index';

export async function saveOrderToFirebase(order: IOrder) {
  const ordersRef = collection(db, 'orders');
  const docRef = await addDoc(ordersRef, order);
  return docRef.id;
}
