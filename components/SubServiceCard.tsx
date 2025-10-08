import { Card, CardContent } from './ui/Card';
import { CheckCircle } from 'lucide-react';
import { Img } from './Image';

interface SubServiceCardProps {
  title: string;
  subtitle: string;
  features: string[];
  image?: string;
}

export function SubServiceCard({
  title,
  subtitle,
  features,
  image,
}: SubServiceCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardContent className="flex flex-1 flex-col p-6">
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="mb-3 text-xl font-bold leading-tight text-gray-900">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-600">{subtitle}</p>
          </div>

          {image && (
            <div className="aspect-video flex-shrink-0 overflow-hidden">
              <Img
                src={image}
                alt={title}
                className="h-full w-full rounded-lg object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}

          <div>
            <h4 className="mb-3 text-lg font-semibold text-gray-800">
              المميزات الرئيسية:
            </h4>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3 space-x-reverse text-sm text-gray-600"
                >
                  <CheckCircle className="mt-1 h-4 w-4 flex-shrink-0 text-green-600" />
                  <span className="text-sm leading-relaxed text-gray-700">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
