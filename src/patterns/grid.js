/**
 * Grid Pattern Generator
 * Generates a standard aligned grid pattern
 */

/**
 * Generate grid pattern tiles
 * @param {Object} config - Pattern configuration
 * @param {number} config.tileSize - Size of each tile
 * @param {number} config.spacing - Spacing between tiles
 * @param {number} config.rotation - Rotation in degrees (not used for grid)
 * @param {Object} canvasSize - Canvas dimensions
 * @param {number} canvasSize.width - Canvas width
 * @param {number} canvasSize.height - Canvas height
 * @returns {Array} - Array of tile placement objects
 */
export function generateGridPattern(config, canvasSize) {
  const { tileSize, spacing, rotation = 0, columns, rows } = config;
  const { width, height } = canvasSize;

  const tiles = [];
  const effectiveTileSize = tileSize + spacing;

  // Calculate number of tiles needed (use manual override if provided)
  const cols = columns || Math.ceil(width / effectiveTileSize) + 1;
  const rowsCount = rows || Math.ceil(height / effectiveTileSize) + 1;

  // Generate tile positions
  for (let row = 0; row < rowsCount; row++) {
    for (let col = 0; col < cols; col++) {
      tiles.push({
        x: col * effectiveTileSize,
        y: row * effectiveTileSize,
        width: tileSize,
        height: tileSize,
        rotation: rotation, // Apply rotation from config
      });
    }
  }

  return tiles;
}
