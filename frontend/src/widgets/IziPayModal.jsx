import React, { useState } from "react";

export default function IziPayModal({ total }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/izipay/create_payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      const data = await res.json();
      if (data && data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        alert("Error iniciando el pago con Izipay.");
      }
    } catch (err) {
      console.error(err);
      alert("Hubo un error al conectar con Izipay.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading || total <= 0}
      className={`${
        loading ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"
      } text-black px-4 py-2 rounded-lg flex-1 font-semibold`}
    >
      {loading ? "Procesando..." : `Pagar $${total.toFixed(2)}`}
    </button>
  );
}
