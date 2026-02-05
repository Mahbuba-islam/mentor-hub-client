"use client";

import { useScrollAnimation } from "@/hooks/scrollAnimation";

export function Animated({ children }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`opacity-0 ${
        isVisible ? "animate-fadeUp" : ""
      }`}
    >
      {children}
    </div>
  );
}
