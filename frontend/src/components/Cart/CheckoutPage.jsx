import React, { useMemo, useState } from "react";
import { useCart } from "../../contexts/CartContext.jsx";
import MaintenanceModal from "../../components/MaintenanceModal.jsx";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  User,
} from "lucide-react";
import "./CheckoutPage.css";

export default function CheckoutPage() {
  const { cart, total } = useCart();

  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", address: "" });

  // Errores por campo + mensaje general visible
  const [errors, setErrors] = useState({});
  const [banner, setBanner] = useState(null); // { type: "error"|"success", text: string }

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

  const WHATSAPP_PHONE = "51960354239"; // <-- cambia aquí (sin +)

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((p) => ({ ...p, [name]: value }));

    // Limpia error del campo en vivo
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });

    // limpia banner al empezar a corregir
    if (banner?.type === "error") setBanner(null);
  };

  const validate = () => {
    const next = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const address = form.address.trim();

    if (!name) next.name = "Por favor ingresa tu nombre para continuar.";
    if (next.email && !/^\S+@\S+\.\S+$/.test(email)) next.email = "Por favor ingresa un correo electrónico válido.";

    if (!address) next.address = "Por favor proporciona tu dirección de entrega.";

    if (groupedCart.length === 0) next.cart = "Tu carrito está vacío. Por favor agrega al menos un artículo.";

    setErrors(next);

    const ok = Object.keys(next).length === 0;
    if (!ok) {
      // Mensaje general siempre visible
      setBanner({
        type: "error",
        text:
          "No pudimos enviar tu orden aún. Por favor revisa los campos resaltados y asegúrate de que tu carrito tenga artículos.",
      });
    }
    return ok;
  };

  const buildWhatsAppText = () => {
    const lines = [];
    lines.push(" *Aurela — Nueva Orden*");
    lines.push("");
    lines.push(` *Cliente:* ${form.name.trim()}`);
    lines.push(` *Dirección:* ${form.address.trim()}`);
    lines.push("");
    lines.push(" *Detalle:*");

    groupedCart.forEach((item) => {
      const unit = Number(item.price);
      const qty = Number(item.quantity || 1);
      const subtotal = unit * qty;

      lines.push(`- ${item.name} × ${qty}`);
      lines.push(` Unitario: S/ ${unit.toFixed(2)} | Subtotal: S/ ${subtotal.toFixed(2)}`);
    });

    lines.push("");
    lines.push(` *Total:* S/ ${Number(total).toFixed(2)}`);
    lines.push("");
    return lines.join("\n");
  };

  const handleWhatsApp = () => {
    if (!validate()) return;

    setBanner({
      type: "success",
      text: "Perfecto. Estamos abriendo WhatsApp con tu orden completa para confirmación.",
    });

    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(buildWhatsAppText())}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const isCartEmpty = groupedCart.length === 0;

  return (
    <section className="checkout-section">
      <div className="checkout-container">
        <header className="checkout-header">
          <div className="checkout-badge">
            <Leaf size={16} />
            <span>Aurela</span>
          </div>
          <h1 className="checkout-title">Checkout</h1>
          <p className="checkout-subtitle">
            Comparte tu orden instantáneamente vía WhatsApp, o procede al pago.
          </p>
        </header>

        <div className="checkout-content">
          {/* 🧾 FORM */}
          <div className="checkout-form">
            <h2>Detalles del cliente</h2>

            <div className="form-field">
              <label>Nombre</label>
              <div className={`input-wrap ${errors.name ? "has-error" : ""}`}>
                <User size={18} />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g., Juan "
                  autoComplete="name"
                />
              </div>
              {errors.name && (
                <p className="field-error">
                  <AlertCircle size={16} /> {errors.name}
                </p>
              )}
            </div>

            <div className="form-field">
              <label>Email</label>
              <div className={`input-wrap ${errors.email ? "has-error" : ""}`}>
                <Mail size={18} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="e.g., juan@email.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="field-error">
                  <AlertCircle size={16} /> {errors.email}
                </p>
              )}
            </div>

            <div className="form-field">
              <label>Dirección de entrega</label>
              <div className={`input-wrap ${errors.address ? "has-error" : ""}`}>
                <MapPin size={18} />
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="e.g., Av. Example 123, Miraflores"
                  autoComplete="street-address"
                />
              </div>
              {errors.address && (
                <p className="field-error">
                  <AlertCircle size={16} /> {errors.address}
                </p>
              )}
            </div>

            <div className="form-note">
              <AlertCircle size={16} />
              <span>
                Tus datos son usados únicamente para preparar y confirmar tu orden.
              </span>
            </div>
          </div>

          {/* 💰 SUMMARY */}
          <div className="checkout-summary">
            <h2>Resumen de la orden</h2>

            {/* ✅ Banner visible */}
            {banner && (
              <div className={`summary-banner ${banner.type}`}>
                {banner.type === "error" ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                <p>{banner.text}</p>
              </div>
            )}

            {/* ✅ error cart visible incluso sin banner */}
            {errors.cart && (
              <div className="summary-banner error">
                <AlertCircle size={18} />
                <p>{errors.cart}</p>
              </div>
            )}

            <div className="summary-top">
              <p className="summary-total">
                <strong>Total:</strong> S/ {Number(total).toFixed(2)}
              </p>

              <button
                type="button"
                className="btn-toggle"
                onClick={() => setShowDetails((v) => !v)}
              >
                {showDetails ? (
                  <>
                    Ocultar detalles <ChevronUp size={18} />
                  </>
                ) : (
                  <>
                    Ver detalles <ChevronDown size={18} />
                  </>
                )}
              </button>
            </div>

            {showDetails && (
              <ul className="summary-list">
                {groupedCart.map((item, index) => (
                  <li key={index} className="summary-item">
                    <img src={item.image} alt={item.name} className="summary-thumb" />
                    <div className="summary-info">
                      <p className="summary-name">{item.name}</p>
                      <div className="summary-meta">
                        <span>Cantidad: {item.quantity}</span>
                        <span>Unitario: S/ {Number(item.price).toFixed(2)}</span>
                      </div>
                      <p className="summary-subtotal">
                        Subtotal: S/ {Number(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Actions */}
            <div className="checkout-actions">
              <button
                type="button"
                className="btn-whatsapp"
                onClick={handleWhatsApp}
                disabled={isCartEmpty}
                title={isCartEmpty ? "Add items to your cart first" : "Send order via WhatsApp"}
              >
                <MessageCircle size={18} />
                Orden WhatsApp
              </button>

              <button
                type="button"
                className="btn-pay"
                onClick={() => setShowModal(true)}
              >
                <CreditCard size={18} />
                Pagar
              </button>
            </div>

            <p className="summary-footnote">
              Al realizar tu pedido, aceptas que Aurela te contacte para confirmar disponibilidad.
            </p>
          </div>
        </div>
      </div>

      {showModal && <MaintenanceModal onClose={() => setShowModal(false)} />}
    </section>
  );
}
