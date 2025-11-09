import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useTranslation } from "react-i18next";
import { Mail, Phone } from "lucide-react";
import "./pages.css";

export default function ContactPage() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!formData.email.trim())
      newErrors.email = "El correo es obligatorio.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Correo no válido.";
    if (!formData.message.trim())
      newErrors.message = "Por favor escribe tu mensaje.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);

    emailjs
      .send(
        "TU_SERVICE_ID",
        "TU_TEMPLATE_ID",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "TU_PUBLIC_KEY"
      )
      .then(
        () => {
          setSent(true);
          setSending(false);
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("Error al enviar:", error);
          setSending(false);
          alert("Ocurrió un error al enviar el mensaje.");
        }
      );
  };

  return (
    <section
      className="contact-page-container"
      style={{
        backgroundImage:
          "linear-gradient(rgba(244,237,228,0.9), rgba(244,237,228,0.95)), url('https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1500&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="contact-card">
        <h2 className="contact-title">
          Contáctanos
        </h2>

        {sent ? (
          <p className="success-text">
            ¡Gracias por tu mensaje! Te responderemos pronto.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <label>Nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Tu nombre"
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <label>Correo electrónico</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="nombre@correo.com"
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <label>Mensaje</label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Escribe tu mensaje aquí..."
            />
            {errors.message && <p className="error-text">{errors.message}</p>}

            <button type="submit" disabled={sending} className="send-button">
              {sending ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>
        )}

        <div className="contact-info">
          <p className="contact-subtitle">Información de contacto</p>
          <div className="info-grid">
            <div className="info-item">
              <Mail size={20} className="info-icon" />                
                <p className="info-value">reservas@aurela.com</p>
            </div>
            <div className="info-item">
              <Phone size={20} className="info-icon" />
                <p className="info-value">+51 999 555 123</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
