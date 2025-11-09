import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroControls({ next, prev, total, current }) {
  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-40">
      <button onClick={prev} className="p-3 bg-black/50 rounded-full hover:bg-yellow-400/70 transition">
        <ChevronLeft className="text-white" />
      </button>
      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${i === current ? "bg-yellow-400" : "bg-white/40"}`}
          ></div>
        ))}
      </div>
      <button onClick={next} className="p-3 bg-black/50 rounded-full hover:bg-yellow-400/70 transition">
        <ChevronRight className="text-white" />
      </button>
    </div>
  );
}
