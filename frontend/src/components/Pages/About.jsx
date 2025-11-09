import React from "react";
import "./About.css";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <section className="about-luxury">
      {/* === HERO === */}
      <div className="about-hero">
        <div className="overlay" />
        <div className=" about-hero-content">
          <h1 className="page-title">Aurela</h1>
          <p className="page-subtitle">Cocina natural y arte en armonía</p>
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="about-content">
        <div className="intro">
          <p>
            En <span className="highlight">Aurela</span>, concebimos la cocina
            como un arte en el que la naturaleza y la creatividad se funden
            para crear experiencias memorables.
          </p>
          <p>
            Nuestra misión es honrar los ingredientes de la tierra y ofrecer
            un espacio donde cada detalle —textura, aroma y color— refleje{" "}
            <strong>equilibrio, elegancia y esencia natural.</strong>
          </p>
        </div>

        {/* === VALUES GRID === */}
        <div className="values-grid">
          <div className="value-card">
            <div className="icon">🍃</div>
            <h3>Ingredientes Puros</h3>
            <p>Productos frescos y locales que dan vida a una experiencia auténtica.</p>
          </div>
          <div className="value-card">
            <div className="icon">🎨</div>
            <h3>Arte Culinario</h3>
            <p>Cada plato es una composición visual y sensorial cuidadosamente creada.</p>
          </div>
          <div className="value-card">
            <div className="icon">🌿</div>
            <h3>Sostenibilidad</h3>
            <p>Apostamos por prácticas responsables que respeten el entorno natural.</p>
          </div>
        </div>

        {/* === FOOTER QUOTE === */}
        <div className="about-quote">
          <h4>“La naturaleza inspira, el arte transforma.”</h4>
        </div>
      </div>
    </section>
  );
}
