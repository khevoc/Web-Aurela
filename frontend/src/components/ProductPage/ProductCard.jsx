import React from "react";
import useCart from "../../hooks/useCart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-gray-900 text-white rounded-xl p-4 shadow-lg flex flex-col hover:scale-105 transition">
      <img
        src={product.image}
        alt={product.name}
        className="rounded-lg mb-4 h-48 w-full object-cover"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-400 mt-1">{product.description}</p>
      <p className="text-green-400 font-bold mt-2">S/ {product.price.toFixed(2)}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-3 bg-green-500 hover:bg-green-600 text-black py-2 rounded-lg font-semibold"
      >
        Agregar al carrito
      </button>
    </div>
  );
}
