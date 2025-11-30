import { Phone, MessageCircle } from "lucide-react";
import { Button } from "./ui/Button";

export function StickyContactButons() {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col space-y-4">
      <Button
        size="lg"
        className="animate-float sticky-contact-shadow group flex h-14 w-14 transform items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-700 hover:shadow-xl"
        aria-label="اتصل بنا"
        title="اتصل بنا"
        asChild
      >
        <a href="tel:+966590123782">
          <Phone className="h-6 w-6" />
        </a>
      </Button>

      <Button
        size="lg"
        variant="outline"
        className="animate-float sticky-contact-shadow group flex h-14 w-14 transform items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600 hover:shadow-xl"
        asChild
        aria-label="تواصل عبر واتساب"
        title="تواصل عبر واتساب"
        style={{ animationDelay: "1s" }}
      >
        <a
          href="https://wa.me/966590123782"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
      </Button>
    </div>
  );
}
