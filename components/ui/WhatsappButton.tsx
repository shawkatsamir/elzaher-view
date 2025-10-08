"use client";

import { Button } from "./Button";

export function WhatsAppButton() {
  const handleClick = () => {
    window.open("https://wa.me/966501234567");
  };
  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="bg-green-600 hover:bg-green-700 flex items-center space-x-2 space-x-reverse"
    >
      <span>واتساب</span>
      <span>📱</span>
    </Button>
  );
}
