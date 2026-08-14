import Link from "next/link";
import { Img } from "@/components/Image";
import { Card, CardContent } from "@/components/ui/Card";
import { MapPin, ArrowLeft } from "lucide-react";

export interface RelatedProject {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: unknown;
  completedAt?: string;
  resultHighlight?: string;
  neighborhood?: string;
}

interface RelatedProjectsSectionProps {
  projects: RelatedProject[];
  title?: string;
  subtitle?: string;
}

// Real finished work, named down to the neighbourhood. On a «معلم …» query this is
// the strongest trust signal the page can carry — it is the one thing a searcher
// checking out a craftsman actually wants to see, and the one thing generic service
// copy cannot fake.
export default function RelatedProjectsSection({
  projects,
  title = "أعمال نفذناها",
  subtitle = "مشاريع حقيقية بصور وتفاصيل التنفيذ",
}: RelatedProjectsSectionProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">{subtitle}</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project._id}
              className="group overflow-hidden transition-shadow duration-300 hover:shadow-xl"
            >
              <Link href={`/works/${project.slug.current}`}>
                <CardContent className="p-0">
                  {project.mainImage ? (
                    <div className="relative h-48 overflow-hidden">
                      <Img
                        src={project.mainImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ) : null}
                  <div className="p-6">
                    {project.neighborhood ? (
                      <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span>{project.neighborhood}</span>
                      </div>
                    ) : null}
                    <h3 className="mb-2 text-lg font-bold leading-snug text-gray-900">
                      {project.title}
                    </h3>
                    {project.resultHighlight ? (
                      <p className="mb-4 text-sm leading-relaxed text-gray-600">
                        {project.resultHighlight}
                      </p>
                    ) : null}
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900">
                      تفاصيل التنفيذ
                      <ArrowLeft className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/works"
            className="font-semibold text-gray-900 underline underline-offset-4"
          >
            تصفح جميع أعمالنا
          </Link>
        </div>
      </div>
    </section>
  );
}
