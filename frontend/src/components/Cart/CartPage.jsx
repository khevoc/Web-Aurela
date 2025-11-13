import React, { useMemo } from "react";
import { useCart } from "../../contexts/CartContext.jsx";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./CartPage.css";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, total } = useCart();
  const { t } = useTranslation();

  // ✅ Agrupar productos *idénticos* (mismo id, nombre, imagen, precio)
  const groupedCart = useMemo(() => {
    const groups = {};
    for (const item of cart) {
      const key = `${item.id}-${item.name}-${item.price}-${item.image}`;
      if (!groups[key]) {
        groups[key] = { ...item, quantity: item.quantity || 1 };
      } else {
        groups[key].quantity += item.quantity || 1;
      }
    }
    return Object.values(groups);
  }, [cart]);

  // ✅ Calcular total del carrito (sin depender de key incorrecto)
  const grandTotal = useMemo(() => {
    return groupedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [groupedCart]);

  return (
    <section className="cart-section">
      <div className="cart-container">
        <h1 className="cart-title"> Carrito de Compra </h1>

        {groupedCart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={64} className="empty-icon" />
            <p>Tu carrito está vacío</p>
            <Link to="/product" className="btn-return">
              Ver Carta
            </Link>
          </div>
        ) : (
          <div className="cart-box">
            <ul className="cart-list">
              {groupedCart.map((item) => (
                <li key={item.id + item.name} className="cart-item">
                  {/* Imagen */}
                  <div className="cart-thumb-wrapper">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-thumb"
                    />
                  </div>

                  {/* Info */}
                  <div className="cart-info">
                    <h3>{item.name}</h3>
                    <p className="cart-price">
                      S/ {item.price.toFixed(2)} × {item.quantity} ={" "}
                      <strong>
                        S/ {(item.price * item.quantity).toFixed(2)}
                      </strong>
                    </p>
                  </div>

                  {/* Controles */}
                  <div className="cart-controls">
                    <button
                      className="btn-qty"
                      onClick={() =>
                        updateQuantity(item, item.quantity - 1)
                      }
                    >
                      <Minus size={16} />
                    </button>
                    <span className="item-qty">{item.quantity}</span>
                    <button
                      className="btn-qty"
                      onClick={() =>
                        updateQuantity(item, item.quantity + 1)
                      }
                    >
                      <Plus size={16} />
                    </button>

                    <div className="divider">|</div>

                    <button
                      onClick={() => removeFromCart(item)}
                      className="btn-remove"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Total */}
            <div className="cart-summary">
              <h2>
                Total:{" "}
                <span>S/ {grandTotal.toFixed(2)}</span>
              </h2>
              <div className="cart-actions">
                <button onClick={clearCart} className="btn-clear">
                  Limpiar Carrito
                </button>
                <Link to="/checkout" className="btn-checkout">
                  Proceder al Pago
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
