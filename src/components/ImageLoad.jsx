import React, { useState } from 'react';

const ImageLoad = ({ src, alt, className = '', wrapperClassName = '', ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-shimmer z-0" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          e.target.src = '/fallback.jpg';
          setIsLoaded(true);
        }}
        className={`${className} relative z-10 transition-all duration-700 ease-in-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};

export default ImageLoad;
