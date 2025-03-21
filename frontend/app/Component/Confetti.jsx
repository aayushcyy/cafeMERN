"use client";

import React, { useEffect, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

export default function Confetti({ onComplete }) {
  const confettiRef = useRef(null);

  useEffect(() => {
    if (confettiRef.current) {
      confettiRef.current({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 },
      });
    }

    // Automatically remove the confetti effect after 3 seconds
    const timer = setTimeout(() => {
      if (onComplete) onComplete(); // Callback to hide confetti
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 z-50">
      <ReactCanvasConfetti
        refConfetti={confettiRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
      />
      <div className="text-center bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-green-600">
          ✅Booking Successful!
        </h2>
        <p className="text-gray-600">Check booking detail in your profile.</p>
      </div>
    </div>
  );
}
