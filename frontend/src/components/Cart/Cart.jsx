import React from "react";
import useCart from "../../hooks/useCart.js";
import IziPayModal from "../../widgets/IziPayModal.jsx";

export default function Cart() {
  const { cartItems, removeFromCart, total, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        Tu carrito está vacío 🛍️
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-2xl mt-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Carrito de compras</h2>
      <ul className="divide-y divide-gray-700">
        {cartItems.map((item) => (
          <li key={item.id} className="py-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-400">
                {item.quantity} x ${Number(item.price).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
            >
              Quitar
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-between items-center text-lg">
        <span>Total:</span>
        <span className="font-bold text-green-400">${Number(total).toFixed(2)}</span>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={clearCart}
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex-1"
        >
          Vaciar carrito
        </button>
        <IziPayModal total={total} />
      </div>
    </div>
  );
}
