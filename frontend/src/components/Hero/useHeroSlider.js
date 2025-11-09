import { useEffect, useState } from "react";

export default function useHeroSlider(length) {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000); // cambia cada 7 segundos
    return () => clearInterval(timer);
  }, [length]);

  return { current, nextSlide, prevSlide };
}
