import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./Hero.css";
import hero1 from "../../assets/hero-5.png";
import hero2 from "../../assets/hero.png";
import hero3 from "../../assets/hero-2.png";
import hero4 from "../../assets/hero-4.png";

const slides = [
  {
    id: 1,
    title: "Sabores Exquisitos, Elegancia Atemporal",
    subtitle: "Experimenta la alta cocina redefinida con arte moderno.",
    image: hero1,
  },
  {
    id: 2,
    title: "Una Sinfonía de Sabor y Diseño",
    subtitle: "Donde la maestría culinaria se encuentra con un ambiente lujoso.",
    image: hero2,
  },
  {
    id: 3,
    title: "Elaborado para los Sentidos",
    subtitle: "Cada plato cuenta una historia de pasión y refinamiento.",
    image: hero3,
  },
  {
    id: 4,
    title: "Más allá de la comida — Un viaje culinario",
    subtitle: "Sumérgete en la esencia del placer.",
    image: hero4,
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const intervalRef = useRef(null);
  const { t } = useTranslation();

  // ✅ Función que cambia al siguiente slide
  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);

  // ✅ Función que cambia al slide anterior
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  // ✅ Reinicia el temporizador sin reiniciar el estado a la vez
  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  // ✅ Configura el auto-slide y lo reinicia cuando cambia el índice
  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, [index]);

  // ✅ Swipe táctil para móvil
  const handleTouchStart = (e) => (touchStartX.current = e.targetTouches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      className="hero-section"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          className="hero-slide"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            backgroundImage: `url(${slides[index].image})`,
          }}
        >
          <div className="hero-overlay">
            <motion.div
              className="hero-text"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1>{slides[index].title}</h1>
              <p>{slides[index].subtitle}</p>
              <a href="/product" className="hero-btn">
                Ver Carta
              </a>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ✅ Controles de navegación — ocultos en móvil */}
      <div className="hero-controls">
        <button onClick={() => { prevSlide(); resetInterval(); }} className="nav-btn left">
          <ChevronLeft size={28} />
        </button>
        <div className="dots">
          {slides.map((_, i) => (
            <div key={i} className={`dot ${i === index ? "active" : ""}`} />
          ))}
        </div>
        <button onClick={() => { nextSlide(); resetInterval(); }} className="nav-btn right">
          <ChevronRight size={28} />
        </button>
      </div>
    </section>
  );
}
