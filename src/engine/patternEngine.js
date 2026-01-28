/**
 * Pattern Engine - Main entry point for pattern generation
 */

import { generateGridPattern } from "../patterns/grid.js";
import { generateDiagonalPattern } from "../patterns/diagonal.js";
import { generateMirrorPattern } from "../patterns/mirror.js";

/**
 * Pattern type constants
 */
export const PATTERN_TYPES = {
    GRID: "grid",
    DIAGONAL: "diagonal",
    MIRROR: "mirror",
};

/**
 * Generate pattern based on type and configuration
 * @param {string} patternType - Type of pattern to generate
 * @param {Object} config - Pattern configuration
 * @param {number} config.tileSize - Tile size in pixels
 * @param {number} config.spacing - Spacing between tiles
 * @param {number} config.rotation - Rotation in degrees
 * @param {number} config.patternId - Mirror pattern ID (for MIRROR type)
 * @param {Object} canvasSize - Canvas dimensions {width, height}
 * @returns {Array} - Array of tile placement objects
 */
export function generatePattern(patternType, config, canvasSize) {
    // Validate inputs
    if (!canvasSize || !canvasSize.width || !canvasSize.height) {
        return [];
    }

    if (!config || !config.tileSize) {
        return [];
    }

    // Route to appropriate pattern generator
    switch (patternType) {
        case PATTERN_TYPES.GRID:
            return generateGridPattern(config, canvasSize);

        case PATTERN_TYPES.DIAGONAL:
            return generateDiagonalPattern(config, canvasSize);

        case PATTERN_TYPES.MIRROR:
            return generateMirrorPattern(config, canvasSize);

        default:
            console.warn(
                `Unknown pattern type: ${patternType}, defaulting to mirror`,
            );
            return generateMirrorPattern(config, canvasSize);
    }
}

/**
 * Get display name for pattern type
 */
export function getPatternDisplayName(patternType) {
    const names = {
        [PATTERN_TYPES.GRID]: "Grid",
        [PATTERN_TYPES.DIAGONAL]: "Diagonal",
        [PATTERN_TYPES.MIRROR]: "Mirror",
    };

    return names[patternType] || "Unknown";
}
