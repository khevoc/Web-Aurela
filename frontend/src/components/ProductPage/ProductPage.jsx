import React, { useEffect, useState, useRef } from "react";
import Papa from "papaparse";
import { useCart } from "../../contexts/CartContext.jsx";
import "./ProductPage.css";
import { t } from "i18next";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortOrder, setSortOrder] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [page, setPage] = useState(1);

  const { addToCart } = useCart();
  const dropdownRef = useRef(null);
  const itemsPerPage = 20;

  // 🔹 Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowCategories(false);
        setShowSortMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Cargar y parsear CSV (usa delimitador | y columnas en español)
  useEffect(() => {
    Papa.parse("/data/menu.csv", {
      download: true,
      header: true,
      delimiter: "|",
      skipEmptyLines: true,
      complete: (results) => {
        const parsed = results.data
          .filter((p) => p.nombre && p.precio && p.categoria)
          .map((p) => ({
            category: p.categoria.trim(),
            name: p.nombre.trim(),
            description: p.descripcion?.trim() || "",
            price: Number(p.precio),
            image: p.imagen?.trim() || "",
          }));
        setProducts(parsed);
      },
    });
  }, []);

  // 🔹 Filtrado + orden
  useEffect(() => {
    let data = products.filter((p) => {
      const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        selectedCategory === "Todos" || p.category === selectedCategory;
      return matchSearch && matchCategory;
    });

    if (sortOrder === "asc") data.sort((a, b) => a.price - b.price);
    else if (sortOrder === "desc") data.sort((a, b) => b.price - a.price);

    setFilteredData(data);
    setPage(1);
  }, [search, selectedCategory, sortOrder, products]);

  // 🔹 Actualizar productos visibles según página
  useEffect(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setDisplayed(filteredData.slice(start, end));
  }, [filteredData, page]);

  const uniqueCategories = ["Todos", ...new Set(products.map((p) => p.category))];

  // 🔹 Agregar al carrito con animación
  const handleAddToCart = (product, e) => {
    addToCart(product);

    const btn = e.target;
    btn.classList.add("added");
    setTimeout(() => btn.classList.remove("added"), 400);

    const img = e.target.closest(".product-card").querySelector("img");
    if (img) {
      const clone = img.cloneNode();
      const rect = img.getBoundingClientRect();
      clone.style.position = "fixed";
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.transition = "all 0.8s cubic-bezier(0.55, 0.1, 0.3, 1)";
      clone.style.zIndex = 9999;
      clone.style.borderRadius = "12px";
      document.body.appendChild(clone);

      const cartIcon = document.querySelector(".btn-cart");
      if (cartIcon) {
        const targetRect = cartIcon.getBoundingClientRect();
        requestAnimationFrame(() => {
          clone.style.left = `${targetRect.left}px`;
          clone.style.top = `${targetRect.top}px`;
          clone.style.width = "25px";
          clone.style.height = "25px";
          clone.style.opacity = "0";
        });
      }
      setTimeout(() => clone.remove(), 900);
    }
  };

  const handleNext = () => {
    setPage((prev) => {
      const nextPage = prev + 1;
      window.scrollTo({ top: 0, behavior: "smooth" });
      return nextPage;
    });
  };
  const handlePrev = () => {
    setPage((prev) => {
      const prevPage = prev - 1;
      window.scrollTo({ top: 0, behavior: "smooth" });
      return prevPage;
    });
  };

  return (
    <section className="product-section">
      <h1 className="product-title"> Carta </h1>

      {/* 🔹 Barra de filtros */}
      <div className="filters-bar" ref={dropdownRef}>
        <div className="search-box">
          <input
            type="text"
            placeholder= "Buscar productos..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="clear-btn" onClick={() => setSearch("")}>
              ✕
            </button>
          )}
        </div>

        <div className="dropdown-group">
          {/* Categorías */}
          <div className="dropdown">
            <button
              className="dropdown-btn"
              onClick={() => {
                setShowCategories(!showCategories);
                setShowSortMenu(false);
              }}
            >
              {selectedCategory}
            </button>
            {showCategories && (
              <div className="dropdown-menu">
                {uniqueCategories.map((cat, i) => (
                  <button
                    key={i}
                    className={`dropdown-item ${
                      selectedCategory === cat ? "active" : ""
                    }`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowCategories(false);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ordenar */}
          <div className="dropdown">
            <button
              className="dropdown-btn"
              onClick={() => {
                setShowSortMenu(!showSortMenu);
                setShowCategories(false);
              }}
            >
              Ordenar por:
            </button>
            {showSortMenu && (
              <div className="dropdown-menu">
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setSortOrder("asc");
                    setShowSortMenu(false);
                  }}
                >
                  Precio: menor a mayor
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setSortOrder("desc");
                    setShowSortMenu(false);
                  }}
                >
                  Precio: mayor a menor
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔹 Grilla de productos */}
      <div className="product-grid">
        {displayed.map((product, i) => (
          <div key={i} className="product-card">
            <div className="img-wrapper">
              <img src={product.image} alt={product.name} loading="lazy" />
            </div>
            <h3>{product.name}</h3>
            <p className="category">{product.category}</p>
            <p className="description">{product.description}</p>
            <p className="price">S/ {product.price.toFixed(2)}</p>
            <button onClick={(e) => handleAddToCart(product, e)}>
              Añadir al carrito
            </button>
          </div>
        ))}
        {displayed.length === 0 && (
          <p className="no-results">{t("product.noResults")}</p>
        )}
      </div>

      {/* 🔹 Paginación */}
      {filteredData.length > itemsPerPage && (
        <div className="pagination">
          <button disabled={page === 1} onClick={handlePrev}>
            ⟨ {t("product.prev")}
          </button>
          <span>
            {t("product.page")} {page} {t("product.of")}{" "}
            {Math.ceil(filteredData.length / itemsPerPage)}
          </span>
          <button
            disabled={page >= Math.ceil(filteredData.length / itemsPerPage)}
            onClick={handleNext}
          >
            {t("product.next")} ⟩
          </button>
        </div>
      )}
    </section>
  );
}
