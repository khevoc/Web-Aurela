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

  // ✅ Configura esto (y si quieres, pásalo a variables de entorno)
  const WHATSAPP_PHONE = "51960354239"; // sin "+" y sin espacios
  const ADDRESS_TEXT = "Av. Vasco Núñez de Balboa 741, Miraflores 15074";
  const GOOGLE_MAPS_URL =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(ADDRESS_TEXT);

  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    "Hola Aurela 👋, quiero hacer una consulta / reserva."
  )}`;

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <img src={logo} alt="Aurela Logo" className="footer-logo" />
          <p className="footer-tagline">
            Cocina natural · Arte culinario · Experiencia premium
          </p>
        </div>

        {/* Info */}
        <div className="footer-info">
          <div className="footer-line">
            <MapPin size={16} className="footer-ico" />
            <a
              className="footer-link"
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Open location on Google Maps"
            >
              {ADDRESS_TEXT}
            </a>
          </div>

          <div className="footer-line">
            <Phone size={16} className="footer-ico" />
            <a className="footer-link" href="tel:+51999555123">
              +51 999 555 123
            </a>
          </div>

          <div className="footer-line">
            <Clock size={16} className="footer-ico" />
            <span className="footer-muted">Lun–Dom: 12:00 – 23:00</span>
          </div>          
        </div>

        {/* Right */}
        <div className="footer-right">
          <div className="social-icons" aria-label="Social links">
            <a href={waUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp Chat">
              <MessageCircle />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram />
            </a>
            <a href="#" aria-label="Facebook">
              <Facebook />
            </a>
            <a href="mailto:reservas@aurela.com" aria-label="Email">
              <Mail />
            </a>
          </div>          
        </div>
      </div>
    </footer>
  );
}
