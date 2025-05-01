'use client';

import { useOrderStore } from '@/store/useOrderStore';
import { saveOrderToFirebase } from '@/lib/orders';
import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/context/ToastContext';

const popoverVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    y: 100,
    transition: {
      duration: 0.2,
    },
  },
};

const OrderPopover = () => {
  const { showToast } = useToast();
  const { rounds, clearOrder } = useOrderStore();
  const [loading, setLoading] = useState(false);


  const subtotal = useMemo(() => {
    return rounds
      .flatMap((r) => r.items)
      .reduce(
        (acc, item) =>
          acc + (item.price_per_unit || 0) * (item.quantity || item.total || 0),
        0
      );
  }, [rounds]);

  const handleSendOrder = async () => {
    setLoading(true);
    const now = dayjs().toISOString();

    const newOrder = {
      created: now,
      paid: false,
      subtotal,
      taxes: 0,
      discounts: 0,
      items: [],
      rounds,
    };

    try {
       await saveOrderToFirebase(newOrder);
      clearOrder();
      showToast('¡Orden enviada con éxito!', 'success');
    } catch (err) {
      console.error('Error al guardar la orden:', err);
      showToast('Error al enviar la orden', 'success');
    } finally {
      setLoading(false);
    }
  };
  const handleCancelOrder = () => {
    clearOrder();
    showToast('Orden cancelada', 'info');
  };

  if (rounds.length === 0) return null;

  return (
    <AnimatePresence>
      {rounds.length > 0 && (
        <motion.div
          variants={popoverVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-6 right-6 w-[320px] bg-white shadow-xl rounded-2xl p-5 border border-gray-100 z-50"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Orden en progreso</h3>

          <ul className="text-sm text-gray-700 mb-4 space-y-2">
            {rounds.map((round, i) => (
              <li key={i}>
                <div className="font-medium mb-1">Ronda {i + 1}:</div>
                <ul className="ml-4 space-y-1">
                  {round.items.map((item, j) => {
                    const quantity = item.quantity || item.total || 0;
                    const price = item.price_per_unit || 0;
                    const total = price * quantity;

                    return (
                      <li key={j} className="flex justify-between">
                        <span>
                          {item.name} <span className="text-gray-500">x{quantity}</span>
                        </span>
                        <span className="text-gray-600 font-medium">
                          ${total.toFixed(2)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>

          <div className="flex justify-between text-base font-semibold text-gray-800 mb-4">
            <span>Total:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex flex-col gap-2">
            <button
              disabled={loading}
              onClick={handleSendOrder}
              className={`w-full py-2 text-white rounded-xl font-medium transition ${
                loading
                  ? 'bg-red-300 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600 cursor-pointer'
              }`}
            >
              {loading ? 'Enviando...' : 'Ordenar ahora'}
            </button>

            <button
                disabled={loading}
                onClick={handleCancelOrder}
                className="w-full py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition cursor-pointer"
              >
                Cancelar orden
              </button>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderPopover;