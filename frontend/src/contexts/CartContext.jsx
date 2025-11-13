import React, { createContext, useContext, useState, useMemo } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Generar clave única para identificar productos idénticos
  const getItemKey = (item) => {
    return `${item.id}-${item.name}-${item.price}-${item.image}`;
  };

  // Agregar producto (si ya existe, aumenta cantidad)
  const addToCart = (product) => {
    const key = getItemKey(product);
    setCart((prev) => {
      const existing = prev.find((p) => getItemKey(p) === key);
      if (existing) {
        return prev.map((p) =>
          getItemKey(p) === key ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Actualizar cantidad de producto específico
  const updateQuantity = (product, newQty) => {
    const key = getItemKey(product);
    setCart((prev) =>
      prev
        .map((p) =>
          getItemKey(p) === key ? { ...p, quantity: Math.max(newQty, 1) } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  // Remover completamente un producto (todas sus unidades)
  const removeFromCart = (product) => {
    const key = getItemKey(product);
    setCart((prev) => prev.filter((p) => getItemKey(p) !== key));
  };

  // Vaciar carrito
  const clearCart = () => setCart([]);

  // Calcular total con cantidades
  const total = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + Number(item.price) * (item.quantity || 1),
        0
      ),
    [cart]
  );

  // Calcular número total de ítems
  const itemCount = useMemo(
    () => cart.reduce((count, item) => count + (item.quantity || 1), 0),
    [cart]
  );

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + (item.quantity || 1), 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        itemCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
