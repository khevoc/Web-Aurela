import React from "react";
import { motion } from "framer-motion";

export default function HeroSlide({ slide, active }) {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      style={{
        backgroundImage: `url(${slide.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center text-white">
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: active ? 0 : 20, opacity: active ? 1 : 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {slide.title}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ delay: 0.5 }}
        >
          {slide.subtitle}
        </motion.p>
        <motion.a
          href="#shop"
          className="px-6 py-3 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition rounded-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: active ? 1 : 0.9, opacity: active ? 1 : 0 }}
          transition={{ delay: 0.7 }}
        >
          {slide.cta}
        </motion.a>
      </div>
    </motion.div>
  );
}
