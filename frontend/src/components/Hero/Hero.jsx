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
    title: "Exquisite Flavors, Timeless Elegance",
    subtitle: "Experience fine dining redefined with modern artistry.",
    image: hero1,
  },
  {
    id: 2,
    title: "A Symphony of Taste and Design",
    subtitle: "Where culinary mastery meets luxurious ambiance.",
    image: hero2,
  },
  {
    id: 3,
    title: "Crafted for the Senses",
    subtitle: "Every dish tells a story of passion and refinement.",
    image: hero3,
  },
  {
    id: 4,
    title: "Beyond Dining — A Culinary Journey",
    subtitle: "Immerse yourself in the essence of indulgence.",
    image: hero4,
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const intervalRef = useRef(null);
  const { t } = useTranslation();

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
    resetInterval();
  };
  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    resetInterval();
  };

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, []);

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
          transition={{ duration: 1.4, ease: "easeInOut" }}
          style={{
            backgroundImage: `url(${slides[index].image})`,
          }}
        >
          <div className="hero-overlay">
            <motion.div
              className="hero-text"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9 }}
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

      <div className="hero-controls">
        <button onClick={prevSlide} className="nav-btn left">
          <ChevronLeft size={28} />
        </button>
        <div className="dots">
          {slides.map((_, i) => (
            <div key={i} className={`dot ${i === index ? "active" : ""}`} />
          ))}
        </div>
        <button onClick={nextSlide} className="nav-btn right">
          <ChevronRight size={28} />
        </button>
      </div>
    </section>
  );
}
