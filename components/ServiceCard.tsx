import Link from "next/link";
import { Img } from "./Image";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  onClick?: () => void;
  link?: string;
  features?: string[];
}

export function ServiceCard({
  title,
  description,
  icon,
  image,
  onClick,
  link,
  features,
}: ServiceCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 relative">
      <div className="p-6 pb-4">
        {image ? (
          <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
            <Img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          icon && (
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <div className="text-white text-2xl">{icon}</div>
            </div>
          )
        )}

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
      </div>

      {features && features.length > 0 && (
        <div className="px-6 pb-4">
          <ul className="space-y-2">
            {features.slice(0, 3).map((feature, index) => (
              <li
                key={index}
                className="flex items-center text-sm text-gray-600"
              >
                <div className="flex items-start space-x-3 space-x-reverse">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0"/>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    {feature}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="px-6 pb-6">
        {link ? (
          <Link
            href={link}
            className="inline-flex items-center justify-center w-full bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 font-medium py-3 px-4 rounded-lg transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white"
          >
            <span>اعرف المزيد</span>
            <ArrowLeft className="mr-2 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <button
            onClick={handleClick}
            className="inline-flex items-center justify-center w-full bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 font-medium py-3 px-4 rounded-lg transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white"
          >
            <span>اعرف المزيد</span>
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></div>
    </div>
  );
}
