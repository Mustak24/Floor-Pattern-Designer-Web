/**
 * Canvas Renderer Component
 * React wrapper for canvas element with rendering logic
 */

import { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { setupCanvas, renderPattern } from "./CanvasController.js";

/**
 * Check if a point is inside a tile (accounting for rotation)
 */
function isPointInTile(x, y, tile) {
  const centerX = tile.x + tile.width / 2;
  const centerY = tile.y + tile.height / 2;

  // Translate point to tile's coordinate system
  const dx = x - centerX;
  const dy = y - centerY;

  // If tile is rotated, rotate the point back to check against unrotated bounds
  if (tile.rotation !== 0) {
    const angleRad = -((tile.rotation * Math.PI) / 180);
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);

    const rotatedX = dx * cos - dy * sin;
    const rotatedY = dx * sin + dy * cos;

    // Check if rotated point is within tile bounds
    return (
      Math.abs(rotatedX) <= tile.width / 2 &&
      Math.abs(rotatedY) <= tile.height / 2
    );
  }

  // No rotation - simple rectangular check
  return Math.abs(dx) <= tile.width / 2 && Math.abs(dy) <= tile.height / 2;
}

/**
 * CanvasRenderer component
 * @param {Object} props
 * @param {HTMLImageElement} props.image - Tile image
 * @param {Array} props.tiles - Array of tile placements
 * @param {number} props.zoom - Zoom level
 * @param {Object} props.offset - Pan offset {x, y}
 * @param {number} props.width - Canvas width
 * @param {number} props.height - Canvas height
 * @param {Function} props.onTileClick - Callback when tile is clicked
 */
const CanvasRenderer = forwardRef(
  (
    {
      image,
      tiles,
      zoom = 1,
      offset = { x: 0, y: 0 },
      width = 800,
      height = 600,
      onTileClick,
    },
    ref,
  ) => {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    // Expose canvas element to parent via ref
    useImperativeHandle(ref, () => ({
      getCanvas: () => canvasRef.current,
      getContext: () => ctxRef.current,
    }));

    // Setup canvas on mount
    useEffect(() => {
      if (canvasRef.current) {
        ctxRef.current = setupCanvas(canvasRef.current, width, height);
      }
    }, [width, height]);

    // Render pattern whenever dependencies change
    useEffect(() => {
      if (canvasRef.current && ctxRef.current) {
        renderPattern(
          ctxRef.current,
          image,
          tiles,
          zoom,
          offset,
          width,
          height,
        );
      }
    }, [image, tiles, zoom, offset, width, height]);

    // Handle canvas clicks
    const handleCanvasClick = (event) => {
      if (!onTileClick || !tiles || tiles.length === 0) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      // Get click coordinates relative to canvas
      const canvasX = (event.clientX - rect.left) * scaleX;
      const canvasY = (event.clientY - rect.top) * scaleY;

      // Transform coordinates to account for zoom and pan
      const worldX = (canvasX - offset.x) / zoom;
      const worldY = (canvasY - offset.y) / zoom;

      // Find which tile was clicked (check from end to prioritize top tiles)
      for (let i = tiles.length - 1; i >= 0; i--) {
        const tile = tiles[i];
        if (isPointInTile(worldX, worldY, tile)) {
          onTileClick(i);
          break;
        }
      }
    };

    return (
      <div className="relative bg-white rounded-lg shadow-soft overflow-hidden">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="block w-full h-full cursor-pointer"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
    );
  },
);

CanvasRenderer.displayName = "CanvasRenderer";

export default CanvasRenderer;
