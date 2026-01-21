/**
 * Layout calculation utilities
 */

/**
 * Calculate the number of tiles needed to fill the canvas
 * @param {number} canvasWidth - Canvas width in pixels
 * @param {number} canvasHeight - Canvas height in pixels
 * @param {number} tileSize - Tile size in pixels
 * @param {number} spacing - Spacing between tiles in pixels
 * @returns {Object} - { cols, rows }
 */
export function calculateTileCount(
  canvasWidth,
  canvasHeight,
  tileSize,
  spacing,
) {
  const effectiveTileSize = tileSize + spacing;

  const cols = Math.ceil(canvasWidth / effectiveTileSize) + 2; // +2 for buffer
  const rows = Math.ceil(canvasHeight / effectiveTileSize) + 2; // +2 for buffer

  return { cols, rows };
}

/**
 * Calculate visible canvas bounds considering zoom and pan offset
 * @param {number} canvasWidth - Canvas width
 * @param {number} canvasHeight - Canvas height
 * @param {number} zoom - Zoom level (1 = 100%)
 * @param {Object} offset - Pan offset {x, y}
 * @returns {Object} - { x, y, width, height }
 */
export function calculateVisibleBounds(
  canvasWidth,
  canvasHeight,
  zoom,
  offset,
) {
  return {
    x: -offset.x / zoom,
    y: -offset.y / zoom,
    width: canvasWidth / zoom,
    height: canvasHeight / zoom,
  };
}

/**
 * Check if a tile is within visible bounds
 * @param {Object} tile - Tile object {x, y, width, height}
 * @param {Object} bounds - Visible bounds
 * @returns {boolean}
 */
export function isTileVisible(tile, bounds) {
  return !(
    tile.x + tile.width < bounds.x ||
    tile.x > bounds.x + bounds.width ||
    tile.y + tile.height < bounds.y ||
    tile.y > bounds.y + bounds.height
  );
}

/**
 * Calculate grid dimensions for pattern generation
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @param {number} tileSize
 * @param {number} spacing
 * @returns {Object} - Comprehensive grid info
 */
export function calculateGridDimensions(
  canvasWidth,
  canvasHeight,
  tileSize,
  spacing,
) {
  const { cols, rows } = calculateTileCount(
    canvasWidth,
    canvasHeight,
    tileSize,
    spacing,
  );
  const effectiveTileSize = tileSize + spacing;

  return {
    cols,
    rows,
    tileSize,
    spacing,
    effectiveTileSize,
    totalWidth: cols * effectiveTileSize,
    totalHeight: rows * effectiveTileSize,
  };
}
