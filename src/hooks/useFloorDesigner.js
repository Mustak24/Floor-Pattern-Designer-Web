/**
 * useFloorDesigner Hook
 * Centralized state management for the floor designer application
 */

import { useState, useMemo, useCallback } from "react";
import { generatePattern, PATTERN_TYPES } from "../engine/patternEngine.js";
import { loadImageFromFile } from "../utils/imageLoader.js";

const DEFAULT_CONFIG = {
    patternType: PATTERN_TYPES.MIRROR,
    patternId: "2D-07", // Default mirror pattern - first in UI
    tileSize: 100,
    spacing: 0, // No spacing for mirror patterns
    rotation: 0,
    columns: null, // null = auto-calculate
    rows: null, // null = auto-calculate
    repeatX: 1, // Pattern repetitions horizontally (columns)
    repeatY: 1, // Pattern repetitions vertically (rows)
};

const DEFAULT_CANVAS_SIZE = {
    width: 800,
    height: 600,
};

/**
 * Main floor designer hook
 */
export function useFloorDesigner() {
    // State
    const [image, setImage] = useState(null);
    const [config, setConfig] = useState(DEFAULT_CONFIG);
    const [zoom, setZoom] = useState(1.0);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [canvasSize] = useState(DEFAULT_CANVAS_SIZE);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Load image from file
     */
    const loadImage = useCallback(async (file) => {
        setLoading(true);
        setError(null);

        try {
            const img = await loadImageFromFile(file);
            setImage(img);
        } catch (err) {
            setError(err.message);
            console.error("Image loading error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Update configuration
     */
    const updateConfig = useCallback((changes) => {
        setConfig((prev) => ({ ...prev, ...changes }));
    }, []);

    /**
     * Reset configuration to defaults
     */
    const resetConfig = useCallback(() => {
        setConfig(DEFAULT_CONFIG);
        setZoom(1.0);
        setPanOffset({ x: 0, y: 0 });
    }, []);

    /**
     * Update zoom level (clamped between 0.1 and 5)
     */
    const updateZoom = useCallback((delta) => {
        setZoom((prev) => Math.max(0.1, Math.min(5, prev + delta)));
    }, []);

    /**
     * Reset zoom to 100%
     */
    const resetZoom = useCallback(() => {
        setZoom(1.0);
        setPanOffset({ x: 0, y: 0 });
    }, []);

    /**
     * Clear loaded image
     */
    const clearImage = useCallback(() => {
        setImage(null);
        setError(null);
    }, []);

    /**
     * Set preset grid size (e.g., 2x2, 3x3, 4x4)
     */
    const setPresetGrid = useCallback((size) => {
        setConfig((prev) => ({ ...prev, columns: size, rows: size }));
    }, []);

    // Derived state - memoized tile positions
    const tiles = useMemo(() => {
        if (!image) return [];
        return generatePattern(config.patternType, config, canvasSize);
    }, [image, config, canvasSize]);

    // Calculate auto-zoom to fit pattern in canvas
    const autoZoom = useMemo(() => {
        if (!tiles || tiles.length === 0) return 1.0;

        // Find pattern bounds
        let minX = Infinity,
            minY = Infinity,
            maxX = -Infinity,
            maxY = -Infinity;
        tiles.forEach((tile) => {
            minX = Math.min(minX, tile.x);
            minY = Math.min(minY, tile.y);
            maxX = Math.max(maxX, tile.x + tile.size);
            maxY = Math.max(maxY, tile.y + tile.size);
        });

        const patternWidth = maxX - minX;
        const patternHeight = maxY - minY;

        // Calculate zoom to fit pattern in canvas with some padding
        const padding = 0.9; // 90% of canvas to leave some margin
        const scaleX = (canvasSize.width * padding) / patternWidth;
        const scaleY = (canvasSize.height * padding) / patternHeight;

        // Use the smaller scale to ensure pattern fits in both dimensions
        const fitZoom = Math.min(scaleX, scaleY, 5); // Cap at 5x max zoom

        return Math.max(0.1, fitZoom); // Ensure minimum 0.1x zoom
    }, [tiles, canvasSize]);

    // Auto-adjust zoom when pattern changes
    useMemo(() => {
        if (tiles.length > 0) {
            setZoom(autoZoom);
            // Center the pattern
            setPanOffset({ x: 0, y: 0 });
        }
    }, [autoZoom, tiles.length]);

    // Can export flag
    const canExport = Boolean(image && tiles.length > 0);

    return {
        // State
        image,
        config,
        zoom,
        panOffset,
        canvasSize,
        tiles,
        loading,
        error,
        canExport,

        // Actions
        loadImage,
        clearImage,
        updateConfig,
        resetConfig,
        updateZoom,
        resetZoom,
        setPanOffset,
        setPresetGrid,
    };
}

export { PATTERN_TYPES };
