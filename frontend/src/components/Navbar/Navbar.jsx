import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../../contexts/CartContext.jsx";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const { cart, totalItems } = useCart();
  const { t } = useTranslation();
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

      <nav ref={menuRef} className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? "active" : ""}> Inicio </NavLink>
        <NavLink to="/product" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? "active" : ""}> Carta </NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? "active" : ""}> Sobre Nosotros</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={({isActive}) => isActive ? "active" : ""}> Contacto </NavLink>

      </nav>

      <div className="nav-actions">
        <NavLink to="/cart" className="btn-cart">
          🛒
          {totalItems > 0 && (
            <span className="cart-count">{totalItems}</span>
          )}
        </NavLink>
        <NavLink to="/checkout" className="btn-primary">{t("navbar.checkout")}</NavLink>
      </div>

    </header>
  );
}
