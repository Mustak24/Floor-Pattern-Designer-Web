/**
 * Math helper utilities for floor pattern calculations
 */

/**
 * Clamp a value between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Convert degrees to radians
 */
export function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

/**
 * Round value to nearest multiple
 */
export function roundToNearest(value, multiple) {
  return Math.round(value / multiple) * multiple;
}

/**
 * Calculate distance between two points
 */
export function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * Rotate a point around an origin
 */
export function rotatePoint(x, y, originX, originY, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const dx = x - originX;
  const dy = y - originY;

  return {
    x: cos * dx - sin * dy + originX,
    y: sin * dx + cos * dy + originY,
  };
}
