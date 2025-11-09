import React, { useState, useMemo } from "react";
import { useCart } from "../../contexts/CartContext.jsx";
import MaintenanceModal from "../../components/MaintenanceModal.jsx";
import { useTranslation } from "react-i18next";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const { cart, total } = useCart();
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { t } = useTranslation();

  // 🔹 Agrupar productos idénticos (como en el carrito)
  const groupedCart = useMemo(() => {
    const map = {};
    cart.forEach((item) => {
      const key = `${item.id}-${item.name}-${item.price}-${item.image}`;
      if (!map[key]) {
        map[key] = { ...item, quantity: item.quantity || 1 };
      } else {
        map[key].quantity += item.quantity || 1;
      }
    });
    return Object.values(map);
  }, [cart]);

  return (
    <section className="checkout-section">
      <div className="checkout-container">
        <h1 className="checkout-title">{"Checkout"}</h1>

        <div className="checkout-content">
          {/* 🧾 FORMULARIO */}
          <div className="checkout-form">
            <h2>{"Información del cliente"}</h2>
            <form>
              <label>
                {"Nombre completo"}
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </label>
              <label>
                {"Correo electrónico"}
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@email.com"
                  required
                />
              </label>
              <label>
                {"Dirección de envío"}
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="123 Ocean Drive"
                  required
                />
              </label>
            </form>
          </div>

          {/* 💰 RESUMEN */}
          <div className="checkout-summary">
            <h2>{"Resumen de la orden"}</h2>
            <div className="summary-top">
              <p className="summary-total">
                <strong>{"Total"}:</strong> S/ {Number(total).toFixed(2)}
              </p>
              <button
                className="btn-toggle"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? "Ocultar detalles" : "Ver detalles"}
              </button>
            </div>

            {/* 🔽 DETALLE */}
            {showDetails && (
              <ul className="summary-list">
                {groupedCart.map((item, index) => (
                  <li key={index} className="summary-item">
                    <img src={item.image} alt={item.name} className="summary-thumb" />
                    <div className="summary-info">
                      <p className="summary-name">{item.name}</p>
                      <p className="summary-qty">
                        Cantidad: {item.quantity}
                      </p>
                      <p className="summary-unit">
                        Precio unitario: S/ {Number(item.price).toFixed(2)}
                      </p>
                      <p className="summary-subtotal">
                        Subtotal: S/ {Number(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <button className="btn-pay" onClick={() => setShowModal(true)}>
              Pagar
            </button>
          </div>
        </div>
      </div>

      {showModal && <MaintenanceModal onClose={() => setShowModal(false)} />}
    </section>
  );
}
