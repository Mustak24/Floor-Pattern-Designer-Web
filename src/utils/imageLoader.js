/**
 * Image loading utilities
 */

/**
 * Validate if a file is a valid image (PNG or JPG)
 */
export function validateImageFile(file) {
  if (!file) return false;

  const validTypes = ["image/png", "image/jpeg", "image/jpg"];
  return validTypes.includes(file.type);
}

/**
 * Load an image file and return an HTMLImageElement
 * @param {File} file - The image file to load
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    if (!validateImageFile(file)) {
      reject(new Error("Invalid file type. Please upload a PNG or JPG image."));
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        resolve(img);
      };

      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };

      img.src = e.target.result;
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Create an image from a URL
 * @param {string} url - Image URL
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImageFromUrl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image from URL"));

    img.src = url;
  });
}
