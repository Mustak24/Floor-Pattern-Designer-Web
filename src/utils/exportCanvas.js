/**
 * Canvas export utilities
 */

/**
 * Export canvas as PNG and trigger download
 * @param {HTMLCanvasElement} canvas - The canvas to export
 * @param {string} filename - Desired filename (without extension)
 * @param {number} scale - Scale multiplier for high-res export (default: 1)
 */
export function exportCanvasAsPNG(
  canvas,
  filename = "floor-pattern",
  scale = 1,
) {
  let canvasToExport = canvas;

  // If scale is not 1, create a high-res version
  if (scale !== 1) {
    canvasToExport = createScaledCanvas(canvas, scale);
  }

  // Convert to blob and download
  canvasToExport.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = url;
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  }, "image/png");
}

/**
 * Create a scaled version of a canvas
 * @param {HTMLCanvasElement} sourceCanvas - Original canvas
 * @param {number} scale - Scale multiplier
 * @returns {HTMLCanvasElement}
 */
function createScaledCanvas(sourceCanvas, scale) {
  const scaledCanvas = document.createElement("canvas");
  scaledCanvas.width = sourceCanvas.width * scale;
  scaledCanvas.height = sourceCanvas.height * scale;

  const ctx = scaledCanvas.getContext("2d");
  ctx.scale(scale, scale);
  ctx.drawImage(sourceCanvas, 0, 0);

  return scaledCanvas;
}

/**
 * Create a high-resolution canvas with pattern rendered
 * @param {Array} tiles - Tile placement array
 * @param {HTMLImageElement} image - Tile image
 * @param {Object} config - Pattern configuration
 * @param {number} canvasWidth - Canvas width
 * @param {number} canvasHeight - Canvas height
 * @param {number} scale - Resolution scale
 * @returns {HTMLCanvasElement}
 */
export function createHighResCanvas(
  tiles,
  image,
  config,
  canvasWidth,
  canvasHeight,
  scale = 2,
) {
  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth * scale;
  canvas.height = canvasHeight * scale;

  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);

  // This will be populated by the actual rendering logic
  return canvas;
}
