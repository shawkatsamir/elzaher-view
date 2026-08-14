import { business } from "@/app/lib/business";
import { themes } from "./theme";
import type { ColorTheme } from "@/app/lib/services";

export interface ProcessStep {
  titleAr: string;
  bodyAr: string;
}

interface ProcessSectionProps {
  steps: ProcessStep[];
  title: string;
  warrantyAr?: string;
  theme: ColorTheme;
}

// Someone searching «معلم تركيب سيراميك» is deciding whether to trust a stranger in
// their home. What they want is the mechanics of the job — who measures, when the
// price is fixed, what happens if it goes wrong. Generic "ضمان شامل" badges do not
// answer that; a numbered sequence with a stated warranty period does.
export default function ProcessSection({
  steps,
  title,
  warrantyAr,
  theme,
}: ProcessSectionProps) {
  const t = themes[theme];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
            {title}
          </h2>
          <ol className="space-y-6">
            {steps.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-bold ${t.pillBg} ${t.iconText}`}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-gray-900">
                    {step.titleAr}
                  </h3>
                  <p className="leading-relaxed text-gray-600">{step.bodyAr}</p>
                </div>
              </li>
            ))}
          </ol>
          {warrantyAr ? (
            <p className="mt-10 rounded-lg bg-gray-50 p-6 leading-relaxed text-gray-700">
              <strong className="text-gray-900">الضمان: </strong>
              {warrantyAr} للاستفسار أو تفعيل الضمان اتصل على {business.phoneDisplay}.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
