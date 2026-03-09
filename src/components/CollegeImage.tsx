import React, { useState } from 'react';
import { Building2, Image as ImageIcon } from 'lucide-react';

interface CollegeImageProps {
  imageUrl?: string;
  collegeName: string;
  collegeType?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const CollegeImage: React.FC<CollegeImageProps> = ({
  imageUrl,
  collegeName,
  collegeType = 'College',
  className = '',
  size = 'md'
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Deterministically pick an image from a pool based on college name
  const hashIndex = (name: string, poolSize: number) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = (hash << 5) - hash + name.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % poolSize;
  };

  // Visually distinct image pools per college type
  const IMAGE_POOLS: Record<string, string[]> = {
    'government': [
      'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800&h=600&fit=crop&auto=format&q=80',
    ],
    'government controlled': [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9a1?w=800&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop&auto=format&q=80',
    ],
    'private': [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1504275107627-0c2ba7a43dba?w=800&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop&auto=format&q=80',
    ],
  };

  // Distinct gradient fallback per type (shown if image fails to load)
  const TYPE_GRADIENT: Record<string, { gradient: string; icon: string; text: string }> = {
    'government':          { gradient: 'from-blue-800 to-blue-500',   icon: 'text-blue-100',   text: 'text-blue-100' },
    'government controlled': { gradient: 'from-teal-700 to-teal-400', icon: 'text-teal-100',   text: 'text-teal-100' },
    'private':             { gradient: 'from-violet-700 to-violet-400', icon: 'text-violet-100', text: 'text-violet-100' },
  };

  const getFallbackImage = (): string => {
    const type = collegeType.toLowerCase();
    const key = type.includes('government controlled') ? 'government controlled'
               : type.includes('government')           ? 'government'
               : type.includes('private')              ? 'private'
               : null;
    if (!key) return IMAGE_POOLS['government'][0];
    const pool = IMAGE_POOLS[key];
    return pool[hashIndex(collegeName, pool.length)];
  };

  const getGradient = () => {
    const type = collegeType.toLowerCase();
    const key = type.includes('government controlled') ? 'government controlled'
               : type.includes('government')           ? 'government'
               : type.includes('private')              ? 'private'
               : 'government';
    return TYPE_GRADIENT[key];
  };

  // Size classes
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  // Use provided imageUrl first; fall back to type-specific pool image
  const displayImage = (!imageError && imageUrl) ? imageUrl : getFallbackImage();
  // Only show the gradient placeholder when the fallback image itself also fails
  const showGradient = imageError && !imageUrl;

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
      )}

      {showGradient ? (
        <div className={`w-full h-full bg-gradient-to-br ${getGradient().gradient} rounded-lg flex flex-col items-center justify-center gap-1`}>
          <Building2 className={`w-8 h-8 ${getGradient().icon}`} />
          <p className={`text-xs font-semibold text-center px-1 leading-tight ${getGradient().text}`}>{collegeName}</p>
        </div>
      ) : (
        <img
          src={displayImage}
          alt={`${collegeName} campus`}
          className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default CollegeImage; 