import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Phone, MessageCircle } from "lucide-react";
import { business, telLink, whatsappLink } from "@/app/lib/business";
import { themes } from "./theme";
import type { ColorTheme } from "@/app/lib/services";

interface CtaSectionProps {
  title: string;
  subtitle: string;
  theme: ColorTheme;
}

export default function CtaSection({
  title,
  subtitle,
  theme,
}: CtaSectionProps) {
  const t = themes[theme];
  return (
    <section className={`${t.ctaBg} py-16 text-white`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold">{title}</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">{subtitle}</p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="flex items-center space-x-2 space-x-reverse"
            asChild
          >
            <Link href={telLink()}>
              <Phone className="h-5 w-5" />
              <span>اتصل الآن {business.phoneDisplay}</span>
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex items-center space-x-2 space-x-reverse"
            asChild
          >
            <a
              href={whatsappLink(`أرغب في الاستفسار عن ${title}`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" />
              <span>واتساب</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
