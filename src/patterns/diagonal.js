/**
 * Diagonal Pattern Generator
 * Generates a 45-degree rotated grid pattern
 */

import { degToRad } from "../utils/mathHelpers.js";

/**
 * Generate diagonal pattern tiles
 * @param {Object} config - Pattern configuration
 * @param {number} config.tileSize - Size of each tile
 * @param {number} config.spacing - Spacing between tiles
 * @param {number} config.rotation - Additional rotation in degrees
 * @param {Object} canvasSize - Canvas dimensions
 * @returns {Array} - Array of tile placement objects
 */
export function generateDiagonalPattern(config, canvasSize) {
  const { tileSize, spacing } = config;
  const { width, height } = canvasSize;

  const tiles = [];
  const effectiveTileSize = tileSize + spacing;

  // For diagonal pattern, we rotate the coordinate system by 45 degrees
  const angle = degToRad(45);

  // Calculate diagonal dimensions
  // The diagonal of the canvas is longer than its sides
  const diagonal = Math.sqrt(width * width + height * height);

  // We need more tiles to cover the rotated space
  const tilesNeeded = Math.ceil(diagonal / effectiveTileSize) + 2;

  // Generate tiles in a rotated grid
  // Start from negative positions to cover the entire rotated space
  const startOffset = -diagonal / 2;

  for (let row = 0; row < tilesNeeded; row++) {
    for (let col = 0; col < tilesNeeded; col++) {
      // Calculate position in rotated coordinate system
      const gridX = startOffset + col * effectiveTileSize;
      const gridY = startOffset + row * effectiveTileSize;

      // Rotate back to canvas coordinates
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      const x = gridX * cos - gridY * sin + width / 2;
      const y = gridX * sin + gridY * cos + height / 2;

      tiles.push({
        x,
        y,
        width: tileSize,
        height: tileSize,
        rotation: 45, // tiles are rotated 45 degrees
      });
    }
  }

  return tiles;
}
