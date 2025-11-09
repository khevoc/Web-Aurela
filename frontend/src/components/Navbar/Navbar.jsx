import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../../contexts/CartContext.jsx";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const { cart } = useCart();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">
        <NavLink to="/" className="logo-link">AURELA</NavLink>
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? "active" : ""}> Inicio </NavLink>
        <NavLink to="/product" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? "active" : ""}> Carta </NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? "active" : ""}> Sobre Nosotros</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? "active" : ""}> Contacto </NavLink>

      </nav>

      <div className="nav-actions">
        <NavLink to="/cart" className="btn-cart">
          🛒
          {cart.length > 0 && (
            <span className="cart-count">{cart.length}</span>
          )}
        </NavLink>
        <NavLink to="/checkout" className="btn-primary">{t("navbar.checkout")}</NavLink>
      </div>

    </header>
  );
}
