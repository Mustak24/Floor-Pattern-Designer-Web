/**
 * Canvas Renderer Component
 * React wrapper for canvas element with rendering logic
 */

import { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { setupCanvas, renderPattern } from "./CanvasController.js";

/**
 * CanvasRenderer component
 * @param {Object} props
 * @param {HTMLImageElement} props.image - Tile image
 * @param {Array} props.tiles - Array of tile placements
 * @param {number} props.zoom - Zoom level
 * @param {Object} props.offset - Pan offset {x, y}
 * @param {number} props.width - Canvas width
 * @param {number} props.height - Canvas height
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

        return (
            <div className="relative bg-white rounded-lg shadow-soft overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full"
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                    }}
                />
            </div>
        );
    },
);

CanvasRenderer.displayName = "CanvasRenderer";

export default CanvasRenderer;
