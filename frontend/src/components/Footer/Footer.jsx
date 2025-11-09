import React from "react";
import "./Footer.css";
import { Mail, Facebook, Instagram } from "lucide-react";
import LanguageSwitcher from "../Language.jsx";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo_footer.png";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src={logo} alt="Aurela Logo" className="footer-logo" />
        </div>

        <div className="footer-center">
          <p className="footer-copy">
            © {new Date().getFullYear()} Aurela Restaurant. {t("footer.rights")}
          </p>
        </div>

        <div className="footer-right">
          <div className="social-icons">
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
