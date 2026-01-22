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
        const { patternId = "2D-14", tileSize } = config;
        const pattern = getPattern(patternId);

        if (!pattern) {
                console.error(`Pattern ${patternId} not found`);
                return [];
        }

        const tiles = [];
        const { cols: unitCols, rows: unitRows } = pattern.layout;

        // Calculate unit size (2x2 pattern unit)
        const unitWidth = tileSize * unitCols;
        const unitHeight = tileSize * unitRows;

        // Calculate how many units we need to fill the canvas
        const unitsX = Math.ceil(canvasSize.width / unitWidth) + 1;
        const unitsY = Math.ceil(canvasSize.height / unitHeight) + 1;

        // Generate tiles by repeating the 2x2 pattern unit
        for (let unitY = 0; unitY < unitsY; unitY++) {
                for (let unitX = 0; unitX < unitsX; unitX++) {
                        // For each tile in the 2x2 pattern unit
                        pattern.tiles.forEach((tileDef, index) => {
                                const tileCol = index % unitCols;
                                const tileRow = Math.floor(index / unitCols);

                                const x =
                                        unitX * unitWidth + tileCol * tileSize;
                                const y =
                                        unitY * unitHeight + tileRow * tileSize;

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
