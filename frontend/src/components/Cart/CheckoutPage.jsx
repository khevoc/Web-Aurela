import React, { useState, useMemo } from "react";
import { useCart } from "../../contexts/CartContext.jsx";
import MaintenanceModal from "../../components/MaintenanceModal.jsx";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const { cart, total } = useCart();
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "" });

  //  errores para mostrar debajo de inputs y en WhatsApp
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));

    // limpia error en vivo
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  // Agrupar productos idénticos
  const groupedCart = useMemo(() => {
    const map = {};
    cart.forEach((item) => {
      const key = `${item.id}-${item.name}-${item.price}-${item.image}`;
      const qty = item.quantity || 1;
      if (!map[key]) map[key] = { ...item, quantity: qty };
      else map[key].quantity += qty;
    });
    return Object.values(map);
  }, [cart]);

  const WHATSAPP_PHONE = "51960354239"; // <-- tu número

  const buildWhatsAppText = () => {
    const lines = [];
    lines.push(" *Nueva orden - Aurela*");
    lines.push("");
    lines.push(` *Cliente:* ${form.name}`);
    lines.push(` *Dirección:* ${form.address}`);
    lines.push("");
    lines.push(" *Detalle:*");

    groupedCart.forEach((item) => {
      const unit = Number(item.price);
      const qty = Number(item.quantity || 1);
      const subtotal = unit * qty;

      lines.push(`- ${item.name} x${qty}`);
      lines.push(
        `  Unit: S/ ${unit.toFixed(2)} | Subtotal: S/ ${subtotal.toFixed(2)}`
      );
    });

    lines.push("");
    lines.push(`  *Total:* S/ ${Number(total).toFixed(2)}`);

    return lines.join("\n");
  };

  // Validación para WhatsApp (y te sirve también si luego validas "Pagar")
  const validateForOrder = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Ingresa tu nombre.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email.trim()))
      nextErrors.email = "Correo no válido.";

    if (!form.address.trim()) nextErrors.address = "Ingresa tu dirección.";

    // carrito con items
    if (groupedCart.length === 0) nextErrors.cart = "Tu carrito está vacío.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // Click WhatsApp: valida y abre con window.open (no uses href fijo)
  const handleWhatsAppClick = (e) => {
    e.preventDefault();

    if (!validateForOrder()) {
      // opcional: te llevo al inicio del resumen para que veas el error
      // window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
      buildWhatsAppText()
    )}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const isCartEmpty = groupedCart.length === 0;

  return (
    <section className="checkout-section">
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-content">
          {/* 🧾 FORMULARIO */}
          <div className="checkout-form">
            <h2>Información del cliente</h2>

            <form>
              <label>
                Nombre
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John "
                />
                {errors.name && <p className="field-error">{errors.name}</p>}
              </label>

              <label>
                Correo electrónico
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@email.com"
                />
                {errors.email && <p className="field-error">{errors.email}</p>}
              </label>

              <label>
                Dirección de envío
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="123 Ocean Drive"
                />
                {errors.address && (
                  <p className="field-error">{errors.address}</p>
                )}
              </label>
            </form>
          </div>

          {/*  RESUMEN */}
          <div className="checkout-summary">
            <h2>Resumen de la orden</h2>

            <div className="summary-top">
              <p className="summary-total">
                <strong>Total:</strong> S/ {Number(total).toFixed(2)}
              </p>

              <button
                type="button"
                className="btn-toggle"
                onClick={() => setShowDetails((v) => !v)}
              >
                {showDetails ? "Ocultar detalles" : "Ver detalles"}
              </button>
            </div>

            {/*  error de carrito */}
            {errors.cart && <p className="summary-error">{errors.cart}</p>}

            {showDetails && (
              <ul className="summary-list">
                {groupedCart.map((item, index) => (
                  <li key={index} className="summary-item">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="summary-thumb"
                    />
                    <div className="summary-info">
                      <p className="summary-name">{item.name}</p>
                      <p className="summary-qty">Cantidad: {item.quantity}</p>
                      <p className="summary-unit">
                        Precio unitario: S/ {Number(item.price).toFixed(2)}
                      </p>
                      <p className="summary-subtotal">
                        Subtotal: S/{" "}
                        {Number(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/*  Acciones: WhatsApp + Pagar */}
            <div className="checkout-actions">
              <button
                type="button"
                className="btn-whatsapp"
                onClick={handleWhatsAppClick}
                disabled={isCartEmpty}
                title={isCartEmpty ? "Tu carrito está vacío" : "Enviar por WhatsApp"}
              >
                WhatsApp
              </button>

              <button
                type="button"
                className="btn-pay"
                onClick={() => setShowModal(true)}
              >
                Pagar
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && <MaintenanceModal onClose={() => setShowModal(false)} />}
    </section>
  );
}
