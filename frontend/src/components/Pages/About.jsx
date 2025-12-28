import React from "react";
import "./About.css";
import { useTranslation } from "react-i18next";
import { Leaf, Palette, Recycle, Sparkles } from "lucide-react";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <section className="about-luxury" aria-label="About Aurela">
      {/* === HERO === */}
      <header className="about-hero">
        <div className="overlay" aria-hidden="true" />
        <div className="about-hero-content">
          <h1 className="page-title">Aurela</h1>
          <p className="page-subtitle">Cocina natural y arte en armonía</p>
        </div>
      </header>

      {/* === MAIN CONTENT === */}
      <main className="about-content">
        {/* Intro */}
        <div className="intro">
          <p>
            En <span className="highlight">Aurela</span>, concebimos la cocina
            como un arte en el que la naturaleza y la creatividad se funden para
            crear experiencias memorables.
          </p>
          <p>
            Nuestra misión es honrar los ingredientes de la tierra y ofrecer un
            espacio donde cada detalle —textura, aroma y color— refleje{" "}
            <strong>equilibrio, elegancia y esencia natural.</strong>
          </p>
        </div>

        {/* === VALUES GRID === */}
        <section className="values-grid" aria-label="Core values">
          <article className="value-card">
            <div className="icon" aria-hidden="true">
              <Leaf size={34} strokeWidth={1.6} />
            </div>
            <h3>Ingredientes Puros</h3>
            <p>
              Productos frescos y locales que dan vida a una experiencia auténtica.
            </p>
          </article>

          <article className="value-card">
            <div className="icon" aria-hidden="true">
              <Palette size={34} strokeWidth={1.6} />
            </div>
            <h3>Arte Culinario</h3>
            <p>
              Cada plato es una composición visual y sensorial cuidadosamente creada.
            </p>
          </article>

          <article className="value-card">
            <div className="icon" aria-hidden="true">
              <Recycle size={34} strokeWidth={1.6} />
            </div>
            <h3>Sostenibilidad</h3>
            <p>
              Apostamos por prácticas responsables que respeten el entorno natural.
            </p>
          </article>
        </section>

        {/* === FOOTER QUOTE === */}
        <footer className="about-quote">
          <h4>“La naturaleza inspira, el arte transforma.”</h4>
        </footer>
      </main>
    </section>
  );
}
