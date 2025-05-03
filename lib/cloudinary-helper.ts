/**
 * Helper functions for working with Cloudinary images
 */

/**
 * Enhances a Cloudinary URL to ensure highest quality
 * @param url The original Cloudinary URL
 * @returns Enhanced URL with quality parameters
 */
export function enhanceCloudinaryUrl(url: string): string {
  if (!url || !url.includes("cloudinary.com")) {
    return url
  }

  // Remove any existing quality or transformation parameters
  let enhancedUrl = url

  // If URL contains '/upload/', insert quality parameters after it
  if (enhancedUrl.includes("/upload/")) {
    // Add high quality, auto format, and high DPR (device pixel ratio)
    enhancedUrl = enhancedUrl.replace("/upload/", "/upload/q_auto:best,f_auto,dpr_2.0/")
  }

  // Add a cache-busting parameter
  enhancedUrl = `${enhancedUrl}${enhancedUrl.includes("?") ? "&" : "?"}cb=${Date.now()}`

  return enhancedUrl
}

/**
 * Checks if a URL is a Cloudinary URL
 * @param url The URL to check
 * @returns Boolean indicating if it's a Cloudinary URL
 */
export function isCloudinaryUrl(url: string): boolean {
  return !!url && url.includes("cloudinary.com")
}
