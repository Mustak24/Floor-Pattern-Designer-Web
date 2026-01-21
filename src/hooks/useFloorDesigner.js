/**
 * useFloorDesigner Hook
 * Centralized state management for the floor designer application
 */

import { useState, useMemo, useCallback } from "react";
import { generatePattern, PATTERN_TYPES } from "../engine/patternEngine.js";
import { loadImageFromFile } from "../utils/imageLoader.js";

const DEFAULT_CONFIG = {
  patternType: PATTERN_TYPES.GRID,
  tileSize: 100,
  spacing: 2,
  rotation: 0,
  columns: null, // null = auto-calculate
  rows: null, // null = auto-calculate
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
  // Individual tile rotations (Map: tileIndex -> additional rotation in degrees)
  const [tileRotations, setTileRotations] = useState(new Map());

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

  /**
   * Rotate a specific tile by 90 degrees
   * @param {number} tileIndex - Index of the tile in the tiles array
   */
  const rotateTile = useCallback((tileIndex) => {
    setTileRotations((prev) => {
      const newRotations = new Map(prev);
      const currentRotation = newRotations.get(tileIndex) || 0;
      const newRotation = (currentRotation + 90) % 360;

      if (newRotation === 0) {
        newRotations.delete(tileIndex);
      } else {
        newRotations.set(tileIndex, newRotation);
      }

      return newRotations;
    });
  }, []);

  // Derived state - memoized tile positions with individual rotations
  const tiles = useMemo(() => {
    if (!image) return [];

    const baseTiles = generatePattern(config.patternType, config, canvasSize);

    // Apply individual tile rotations
    return baseTiles.map((tile, index) => {
      const individualRotation = tileRotations.get(index) || 0;
      return {
        ...tile,
        rotation: tile.rotation + individualRotation,
      };
    });
  }, [image, config, canvasSize, tileRotations]);

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
    tileRotations,

    // Actions
    loadImage,
    clearImage,
    updateConfig,
    resetConfig,
    updateZoom,
    resetZoom,
    setPanOffset,
    setPresetGrid,
    rotateTile,
  };
}

export { PATTERN_TYPES };
