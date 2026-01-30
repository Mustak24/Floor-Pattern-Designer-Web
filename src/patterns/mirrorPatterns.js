/**
 * Mirror Pattern Presets
 * Predefined 2x2 tile patterns with flip and rotate transformations
 */

export const MIRROR_PATTERNS = {
    "01": {
        index: 1,
        name: "01",
        displayName: "Flip on Right",
        layout: { cols: 2, rows: 1 },
        tiles: [
            { flipX: false, flipY: false, rotate: 0 },
            { flipX: true, flipY: false, rotate: 0 },
        ],
    },

    "02": {
        index: 2,
        name: "02",
        displayName: "Flip on Left",
        layout: { cols: 2, rows: 1 },
        tiles: [
            { flipX: true, flipY: false, rotate: 0 },
            { flipX: false, flipY: false, rotate: 0 },
        ],
    },

    "03": {
        index: 3,
        name: "03",
        displayName: "Flip on Bottom",
        layout: { cols: 1, rows: 2 },
        tiles: [
            { flipX: false, flipY: false, rotate: 0 },
            { flipX: false, flipY: true, rotate: 0 },
        ],
    },

    "04": {
        index: 4,
        name: "04",
        displayName: "Flip on Top",
        layout: { cols: 1, rows: 2 },
        tiles: [
            { flipX: false, flipY: true, rotate: 0 },
            { flipX: false, flipY: false, rotate: 0 },
        ],
    },

    11: {
        index: 11,
        name: "11",
        displayName: "Mirror Quad (Top-Left Origin)",
        layout: { cols: 2, rows: 2 },
        tiles: [
            { flipX: false, flipY: false, rotate: 0 },
            { flipX: true, flipY: false, rotate: 0 },
            { flipX: false, flipY: true, rotate: 0 },
            { flipX: true, flipY: true, rotate: 0 },
        ],
    },

    12: {
        index: 12,
        name: "12",
        displayName: "Mirror Quad (Bottom-Right Origin)",
        layout: { cols: 2, rows: 2 },
        tiles: [
            { flipX: true, flipY: false, rotate: 0 },
            { flipX: false, flipY: false, rotate: 0 },
            { flipX: true, flipY: true, rotate: 0 },
            { flipX: false, flipY: true, rotate: 0 },
        ],
    },

    13: {
        index: 13,
        name: "13",
        displayName: "Mirror Quad (Bottom-Left Origin)",
        layout: { cols: 2, rows: 2 },
        tiles: [
            { flipX: false, flipY: true, rotate: 0 },
            { flipX: true, flipY: true, rotate: 0 },
            { flipX: false, flipY: false, rotate: 0 },
            { flipX: true, flipY: false, rotate: 0 },
        ],
    },

    14: {
        index: 14,
        name: "14",
        displayName: "Mirror Quad (Top-Right Origin)",
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
    return MIRROR_PATTERNS[patternId] || MIRROR_PATTERNS["11"];
}

/**
 * Get all available patterns as an array
 */
export function getAllPatterns() {
    return Object.values(MIRROR_PATTERNS).sort((a, b) => a.index - b.index);
}
