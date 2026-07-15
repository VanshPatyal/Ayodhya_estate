/**
 * Optimizes Cloudinary image URLs by injecting transformation parameters
 * @param {string} url - The original image URL
 * @param {string} transformations - Cloudinary transformation string (default: 'f_auto,q_auto,w_500')
 * @returns {string} - Optimized URL with transformations
 */
export const optimizeCloudinaryImage = (url, transformations = 'f_auto,q_auto,w_500') => {
  if (!url || typeof url !== 'string') {
    return url;
  }

  // Check if URL contains 'cloudinary.com'
  if (url.includes('cloudinary.com') && url.includes('/upload/')) {
    // Inject transformations after '/upload/'
    return url.replace('/upload/', `/upload/${transformations}/`);
  }

  // Return original URL if not a Cloudinary URL
  return url;
};

/**
 * Optimizes Cloudinary image URL for hero/large images
 * @param {string} url - The original image URL
 * @returns {string} - Optimized URL with hero-specific transformations
 */
export const optimizeHeroImage = (url) => {
  return optimizeCloudinaryImage(url, 'f_auto,q_auto,w_1200');
};

/**
 * Optimizes Cloudinary image URL for thumbnail/card images
 * @param {string} url - The original image URL
 * @returns {string} - Optimized URL with thumbnail-specific transformations
 */
export const optimizeThumbnailImage = (url) => {
  return optimizeCloudinaryImage(url, 'f_auto,q_auto,w_500');
};
