/**
 * Toolbar Component
 * Top-level actions for zoom, pan, and export
 */

import { exportCanvasAsPNG } from "../utils/exportCanvas.js";

export default function Toolbar({
  zoom,
  onZoomChange,
  onResetZoom,
  canExport,
  canvasRef,
}) {
  const handleExport = () => {
    if (canvasRef?.current) {
      const canvas = canvasRef.current.getCanvas();
      if (canvas) {
        exportCanvasAsPNG(canvas, "floor-pattern-design", 2);
      }
    }
  };

  const zoomPercentage = Math.round(zoom * 100);

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      {/* Zoom Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-medium text-gray-600">Zoom:</span>

        <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm border border-gray-200 px-1 py-1">
          <button
            onClick={() => onZoomChange(-0.1)}
            disabled={zoom <= 0.1}
            className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Zoom Out"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>

          <span className="py-1 text-sm font-mono font-semibold text-gray-700 min-w-[60px] text-center">
            {zoomPercentage}%
          </span>

          <button
            onClick={() => onZoomChange(0.1)}
            disabled={zoom >= 5}
            className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Zoom In"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>

          <div className="w-px h-6 bg-gray-300"></div>

          <button
            onClick={onResetZoom}
            className="pr-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors"
            title="Reset Zoom"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={handleExport}
        disabled={!canExport}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm shadow-sm transition-all duration-200 ${
          canExport
            ? "bg-accent-600 hover:bg-accent-700 text-white shadow-accent-200 hover:shadow-md"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
        title="Export as High-Res PNG"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        <span>Export PNG</span>
      </button>
    </div>
  );
}
