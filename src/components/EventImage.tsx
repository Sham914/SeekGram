import React, { useState } from 'react';
import { CalendarDays, Image as ImageIcon } from 'lucide-react';

interface EventImageProps {
  imageUrl?: string;
  eventTitle: string;
  eventCategory?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'fill';
  roundedClassName?: string;
}

const EventImage: React.FC<EventImageProps> = ({
  imageUrl,
  eventTitle,
  eventCategory = 'Event',
  className = '',
  size = 'md',
  roundedClassName = 'rounded-lg'
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const hashIndex = (value: string, poolSize: number) => {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % poolSize;
  };

  const IMAGE_POOL = [
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=800&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=800&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=800&fit=crop&auto=format&q=80',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=800&fit=crop&auto=format&q=80'
  ];

  const CATEGORY_GRADIENTS: Record<string, string> = {
    workshop: 'from-sky-700 to-cyan-500',
    hackathon: 'from-indigo-700 to-blue-500',
    conference: 'from-slate-700 to-slate-500',
    meetup: 'from-emerald-700 to-green-500',
    seminar: 'from-amber-700 to-orange-500'
  };

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64',
    fill: ''
  };

  const normalizedCategory = eventCategory.toLowerCase();
  const fallbackImage = IMAGE_POOL[hashIndex(`${eventTitle}-${normalizedCategory}`, IMAGE_POOL.length)];
  const gradientClass = Object.entries(CATEGORY_GRADIENTS).find(([key]) => normalizedCategory.includes(key))?.[1] || 'from-slate-700 to-blue-500';
  const displayImage = !imageError && imageUrl ? imageUrl : fallbackImage;
  const showGradient = imageError && !imageUrl;

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {imageLoading && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${roundedClassName} flex items-center justify-center`}>
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
      )}

      {showGradient ? (
        <div className={`w-full h-full bg-gradient-to-br ${gradientClass} ${roundedClassName} flex flex-col items-center justify-center gap-2 p-4`}>
          <CalendarDays className="w-8 h-8 text-white/90" />
          <p className="text-sm font-semibold text-center text-white/90 line-clamp-3">{eventTitle}</p>
        </div>
      ) : (
        <img
          src={displayImage}
          alt={eventTitle}
          className={`w-full h-full object-cover ${roundedClassName} transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageError(true);
            setImageLoading(false);
          }}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default EventImage;
