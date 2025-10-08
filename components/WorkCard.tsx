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
  id,
  title,
  description,
  image,
  date,
  location,
  category,
  client,
}: WorkCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 relative">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Meta Information */}
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {date && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 ml-2 text-blue-500" />
                <span>{date}</span>
              </div>
            )}

            {location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 ml-2 text-blue-500" />
                <span>{location}</span>
              </div>
            )}
          </div>

          {client && (
            <div className="flex items-center">
              <User className="h-4 w-4 ml-2 text-blue-500" />
              <span>{client}</span>
            </div>
          )}
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-l from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></div>
    </div>
  );
}
