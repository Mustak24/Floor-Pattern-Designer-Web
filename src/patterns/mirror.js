/**
 * Mirror Pattern Generator
 * Generates tile layouts based on predefined mirror patterns
 */

import { getPattern } from "./mirrorPatterns.js";

/**
 * Generate mirror pattern by tiling a 2x2 unit across the canvas
 * @param {Object} config - Pattern configuration
 * @param {string} config.patternId - ID of the pattern to use
 * @param {number} config.tileSize - Size of each tile in pixels
 * @param {Object} canvasSize - Canvas dimensions {width, height}
 * @returns {Array} - Array of tile placement objects
 */
export function generateMirrorPattern(config, canvasSize) {
    const { patternId = "11", tileSize, repeatX = 1, repeatY = 1 } = config;
    const pattern = getPattern(patternId);

    if (!pattern) {
        console.error(`Pattern ${patternId} not found`);
        return [];
    }

    const tiles = [];
    const { cols: unitCols, rows: unitRows } = pattern.layout;

    // Calculate unit size (pattern unit based on layout)
    const unitWidth = tileSize * unitCols;
    const unitHeight = tileSize * unitRows;

    // Use explicit repetition counts from config
    const unitsX = repeatX;
    const unitsY = repeatY;

    // Generate tiles by repeating the pattern unit
    for (let unitY = 0; unitY < unitsY; unitY++) {
        for (let unitX = 0; unitX < unitsX; unitX++) {
            // For each tile in the pattern unit
            pattern.tiles.forEach((tileDef, index) => {
                const tileCol = index % unitCols;
                const tileRow = Math.floor(index / unitCols);

                const x = unitX * unitWidth + tileCol * tileSize;
                const y = unitY * unitHeight + tileRow * tileSize;

                tiles.push({
                    x,
                    y,
                    size: tileSize,
                    rotation: tileDef.rotate || 0,
                    flipX: tileDef.flipX || false,
                    flipY: tileDef.flipY || false,
                });
            });
        }
    }

    return tiles;
}
