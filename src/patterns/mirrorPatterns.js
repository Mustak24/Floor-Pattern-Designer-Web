/**
 * Mirror Pattern Presets
 * Predefined 2x2 tile patterns with flip and rotate transformations
 */

export const MIRROR_PATTERNS = {
    "2D-14": {
        name: "2D-14",
        displayName: "Mirror Quad",
        layout: { cols: 2, rows: 2 },
        tiles: [
            { flipX: false, flipY: false, rotate: 0 },
            { flipX: true, flipY: false, rotate: 0 },
            { flipX: false, flipY: true, rotate: 180 },
            { flipX: true, flipY: true, rotate: 180 },
        ],
    },

    "2D-01": {
        name: "2D-01",
        displayName: "Rotate 180",
        layout: { cols: 2, rows: 2 },
        tiles: [
            { flipX: false, flipY: false, rotate: 0 },
            { flipX: false, flipY: false, rotate: 180 },
            { flipX: false, flipY: false, rotate: 180 },
            { flipX: false, flipY: false, rotate: 0 },
        ],
    },

    "2D-02": {
        name: "2D-02",
        displayName: "Vertical Mirror",
        layout: { cols: 2, rows: 1 }, // 1 row, 2 cols - horizontal strip
        tiles: [
            { flipX: false, flipY: false, rotate: 0 },
            { flipX: true, flipY: false, rotate: 0 },
        ],
    },

    "2D-03": {
        name: "2D-03",
        displayName: "Horizontal Mirror",
        layout: { cols: 1, rows: 2 }, // 2 rows, 1 col - vertical strip
        tiles: [
            { flipX: false, flipY: false, rotate: 0 },
            { flipX: false, flipY: true, rotate: 0 },
        ],
    },

    "2D-04": {
        name: "2D-04",
        displayName: "Diagonal Mirror",
        layout: { cols: 2, rows: 2 },
        tiles: [
            { flipX: false, flipY: false, rotate: 0 },
            { flipX: false, flipY: true, rotate: 90 },
            { flipX: true, flipY: false, rotate: 270 },
            { flipX: false, flipY: false, rotate: 180 },
        ],
    },

    "2D-05": {
        name: "2D-05",
        displayName: "Kaleidoscope",
        layout: { cols: 2, rows: 2 },
        tiles: [
            { flipX: false, flipY: false, rotate: 0 },
            { flipX: true, flipY: false, rotate: 90 },
            { flipX: false, flipY: true, rotate: 270 },
            { flipX: true, flipY: true, rotate: 180 },
        ],
    },

    "2D-06": {
        name: "2D-06",
        displayName: "Pinwheel",
        layout: { cols: 2, rows: 2 },
        tiles: [
            { flipX: false, flipY: false, rotate: 0 },
            { flipX: false, flipY: false, rotate: 90 },
            { flipX: false, flipY: false, rotate: 270 },
            { flipX: false, flipY: false, rotate: 180 },
        ],
    },

    "2D-07": {
        name: "2D-07",
        displayName: "Diamond Flip",
        layout: { cols: 2, rows: 2 },
        tiles: [
            { flipX: true, flipY: true, rotate: 0 },
            { flipX: false, flipY: true, rotate: 0 },
            { flipX: true, flipY: false, rotate: 0 },
            { flipX: false, flipY: false, rotate: 0 },
        ],
    },
};

/**
 * Get pattern by ID
 */
export function getPattern(patternId) {
    return MIRROR_PATTERNS[patternId] || MIRROR_PATTERNS["2D-14"];
}

/**
 * Get all available patterns as an array
 */
export function getAllPatterns() {
    return Object.values(MIRROR_PATTERNS);
}
