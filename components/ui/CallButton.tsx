"use client";

import { Button } from "./Button";

export function CallButton() {
  const handleClick = () => {
    window.open("tel:+966501234567");
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      variant="secondary"
      className="flex items-center space-x-2 space-x-reverse"
    >
      <span>اتصل الآن</span>
      <span>📞</span>
    </Button>
  );
}
