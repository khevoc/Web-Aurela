import React from "react";
import "./MaintenanceModal.css";

export default function MaintenanceModal({ onClose }) {
  const phrase = "Opcion en mantenimiento • ";
  const repeatCount = 2; // repetir para llenar el círculo
  const text = phrase.repeat(repeatCount).trim();
  const chars = text.split("");

  const radius = 140; // distancia del texto al centro

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="maintenance-container">
          <img
            src="/maintenance.gif"
            alt="Maintenance animation"
            className="maintenance-gif"
          />

          <div className="circle-text">
            {chars.map((char, i) => {
              const angle = (360 / chars.length) * i;
              return (
                <span
                  key={i}
                  style={{
                    transform: `
                      rotate(${angle}deg)
                      translate(${radius}px)
                      rotate(${90}deg)
                    `,
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
