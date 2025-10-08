import { Calendar, MapPin, User } from "lucide-react";
import { Img } from "./Image";

interface WorkCardProps {
  id?: string;
  title: string;
  description: string;
  image: string;
  date?: string;
  location?: string;
  category?: string;
  client?: string;
}

export function WorkCard({
  title,
  description,
  image,
  date,
  location,
  category,
  client,
}: WorkCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:border-blue-200 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Img
          src={image}
          alt={title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Category Badge */}
        {category && (
          <div className="absolute right-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
            {category}
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
          {title}
        </h3>

        <p className="mb-4 line-clamp-3 leading-relaxed text-gray-600">
          {description}
        </p>

        {/* Meta Information */}
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {date && (
              <div className="flex items-center">
                <Calendar className="ml-2 h-4 w-4 text-blue-500" />
                <span>{date}</span>
              </div>
            )}

            {location && (
              <div className="flex items-center">
                <MapPin className="ml-2 h-4 w-4 text-blue-500" />
                <span>{location}</span>
              </div>
            )}
          </div>

          {client && (
            <div className="flex items-center">
              <User className="ml-2 h-4 w-4 text-blue-500" />
              <span>{client}</span>
            </div>
          )}
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute bottom-0 left-0 h-1 w-full origin-right scale-x-0 transform bg-gradient-to-l from-blue-500 to-blue-600 transition-transform duration-300 group-hover:scale-x-100"></div>
    </div>
  );
}
