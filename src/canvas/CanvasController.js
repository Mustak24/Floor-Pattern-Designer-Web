/**
 * Canvas Controller - Pure canvas rendering logic (no React)
 * This module handles all direct canvas manipulation
 */

import { degToRad } from "../utils/mathHelpers.js";

/**
 * Setup canvas with proper dimensions and context
 * @param {HTMLCanvasElement} canvas
 * @param {number} width
 * @param {number} height
 * @returns {CanvasRenderingContext2D}
 */
export function setupCanvas(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    // Enable image smoothing for better quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    return ctx;
}

/**
 * Clear the entire canvas
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 */
export function clearCanvas(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);

    // Draw a subtle background
    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(0, 0, width, height);
}

/**
 * Render a single tile on the canvas
 * @param {CanvasRenderingContext2D} ctx
 * @param {HTMLImageElement} image
 * @param {Object} tile - {x, y, size, rotation, flipX, flipY}
 */
function renderTile(ctx, image, tile) {
    ctx.save();

    // Support both 'size' and 'width/height' for backwards compatibility
    const tileSize = tile.size || tile.width;

    // Move to tile position
    const centerX = tile.x + tileSize / 2;
    const centerY = tile.y + tileSize / 2;
    ctx.translate(centerX, centerY);

    // Apply flips if specified
    const scaleX = tile.flipX ? -1 : 1;
    const scaleY = tile.flipY ? -1 : 1;
    ctx.scale(scaleX, scaleY);

    // Apply rotation if needed
    if (tile.rotation) {
        ctx.rotate(degToRad(tile.rotation));
    }

    // Draw the image centered at the current position
    ctx.drawImage(image, -tileSize / 2, -tileSize / 2, tileSize, tileSize);

    ctx.restore();
}

/**
 * Render pattern on canvas
 * @param {CanvasRenderingContext2D} ctx
 * @param {HTMLImageElement} image - Tile image
 * @param {Array} tiles - Array of tile objects
 * @param {number} zoom - Zoom level
 * @param {Object} offset - Pan offset {x, y}
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 */
export function renderPattern(
    ctx,
    image,
    tiles,
    zoom,
    offset,
    canvasWidth,
    canvasHeight,
) {
    // Clear canvas first
    clearCanvas(ctx, canvasWidth, canvasHeight);

    if (!image || !tiles || tiles.length === 0) {
        return;
    }

    ctx.save();

    // Apply zoom and pan transformations
    ctx.translate(offset.x, offset.y);
    ctx.scale(zoom, zoom);

    // Render each tile
    tiles.forEach((tile) => {
        renderTile(ctx, image, tile);
    });

    ctx.restore();

    // Draw border around canvas
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, canvasWidth, canvasHeight);
}

/**
 * Export canvas at a specific scale
 * @param {HTMLCanvasElement} canvas
 * @param {number} scale
 * @returns {HTMLCanvasElement}
 */
export function exportCanvas(canvas, scale = 1) {
    if (scale === 1) {
        return canvas;
    }

    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = canvas.width * scale;
    exportCanvas.height = canvas.height * scale;

    const ctx = exportCanvas.getContext("2d");
    ctx.scale(scale, scale);
    ctx.drawImage(canvas, 0, 0);

    return exportCanvas;
}

/**
 * Render pattern to a new canvas (for export)
 * @param {HTMLImageElement} image
 * @param {Array} tiles
 * @param {number} width
 * @param {number} height
 * @param {number} scale
 * @returns {HTMLCanvasElement}
 */
export function renderToNewCanvas(image, tiles, width, height, scale = 1) {
    const canvas = document.createElement("canvas");
    const ctx = setupCanvas(canvas, width * scale, height * scale);

    ctx.scale(scale, scale);
    renderPattern(ctx, image, tiles, 1, { x: 0, y: 0 }, width, height);

    return canvas;
}
