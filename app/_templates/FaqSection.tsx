import { Card, CardContent } from "@/components/ui/Card";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/app/lib/services";

interface FaqSectionProps {
  title: string;
  items: FaqItem[];
}

export default function FaqSection({ title, items }: FaqSectionProps) {
  if (!items.length) return null;
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="mx-auto max-w-3xl space-y-4">
          {items.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between p-6 hover:bg-gray-50">
                    <h3 className="text-lg font-semibold">{item.question}</h3>
                    <ChevronDown className="h-5 w-5 text-gray-500 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="leading-relaxed text-gray-600">
                      {item.answer}
                    </p>
                  </div>
                </details>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
