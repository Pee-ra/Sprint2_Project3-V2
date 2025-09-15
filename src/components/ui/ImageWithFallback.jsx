import { useState } from 'react';

export function ImageWithFallback({ src, alt, className, fallbackSrc = "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=300&fit=crop", ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className={className}
      onError={handleError}
      {...props}
    />
  );
}