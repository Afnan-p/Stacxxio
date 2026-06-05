// utils/cloudinary.js

/**
 * Optimizes a Cloudinary URL by injecting transformation parameters.
 * @param {string} url - The original Cloudinary URL
 * @param {string} type - 'thumbnail' or 'hero'
 * @returns {string} - The optimized URL
 */
export const getOptimizedMedia = (url, type = 'thumbnail') => {
  if (!url) return '/fallback.jpg';
  
  // Only process Cloudinary URLs
  if (!url.includes('res.cloudinary.com')) {
    if (url.startsWith('http')) return url;
    return `${import.meta.env.VITE_API_URL}/${url}`;
  }

  // Define transformation strings
  // f_auto: automatic format (WebP/AVIF depending on browser)
  // q_auto: automatic quality
  // c_limit: resize maintaining aspect ratio only if image is larger
  const transformations = {
    thumbnail: 'w_800,c_limit,f_auto,q_auto',
    hero: 'w_1600,c_limit,f_auto,q_auto',
  };

  const transformStr = transformations[type] || transformations.thumbnail;

  // Cloudinary URLs typically look like:
  // https://res.cloudinary.com/cloud_name/image/upload/v1234567890/folder/image.jpg
  // We want to insert the transformation after '/upload/'
  
  if (url.includes('/upload/')) {
    const parts = url.split('/upload/');
    // Check if there are already transformations
    if (parts[1].match(/^v\d+\//) || parts[1].includes('/')) {
      return `${parts[0]}/upload/${transformStr}/${parts[1]}`;
    }
  }

  return url;
};
