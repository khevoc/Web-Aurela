import React from "react";
import "./Footer.css";
import {
  Mail,
  Facebook,
  Instagram,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo_footer-2.png";

export default function Footer() {
  const { t } = useTranslation();

  // ✅ Ajusta datos reales
  const WHATSAPP_PHONE = "51960354239"; // sin "+" y sin espacios
  const ADDRESS_TEXT = "Av. Vasco Núñez de Balboa 741, Miraflores 15074";
  const PHONE_TEXT = "+51 999 999 999";
  const EMAIL = "reservas@aurela.com";
  const HOURS = "Mon–Sun · 12:00 — 23:00";

  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(ADDRESS_TEXT);

  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    "Hello Aurela 👋 I’d like to book a table / ask about the menu."
  )}`;

  return (
    <footer className="footer">
      <div className="footer-shell">
        {/* Left / Brand */}
        <div className="footer-brand">
          <img src={logo} alt="Aurela" className="footer-logo" />
        </div>

        {/* Middle / Details */}
        <div className="footer-panel" role="contentinfo" aria-label="Contact info">
          <div className="panel-row">
            <MapPin size={16} className="panel-ico" />
            <div className="panel-text">
              <span className="panel-label">Location</span>
              <a className="panel-link" href={mapsUrl} target="_blank" rel="noreferrer">
                {ADDRESS_TEXT}
              </a>
            </div>
          </div>

          <div className="panel-row">
            <Phone size={16} className="panel-ico" />
            <div className="panel-text">
              <span className="panel-label">Phone</span>
              <a className="panel-link" href="tel:+51999999999">
                {PHONE_TEXT}
              </a>
            </div>
          </div>

          <div className="panel-row">
            <Mail size={16} className="panel-ico" />
            <div className="panel-text">
              <span className="panel-label">Email</span>
              <a className="panel-link" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </div>
          </div>

          <div className="panel-row">
            <Clock size={16} className="panel-ico" />
            <div className="panel-text">
              <span className="panel-label">Hours</span>
              <span className="panel-muted">{HOURS}</span>
            </div>
          </div>
        </div>

        {/* Right / Social + copy */}
        <div className="footer-right">
          <div className="footer-actions">
            <a className="btn-pill" href={waUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp Chat">
              <MessageCircle size={18} />
              <span>Chat / Reservations</span>
            </a>

            <div className="social-icons" aria-label="Social links">
              <a href="#" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href={`mailto:${EMAIL}`} aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="footer-divider" />

          <p className="footer-copy">
            © {new Date().getFullYear()} Aurela Restaurant. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
