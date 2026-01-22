/**
 * Pattern Controls Component
 * User controls for pattern configuration
 */

import { getAllPatterns } from "../patterns/mirrorPatterns.js";

const PATTERN_OPTIONS = getAllPatterns();

/**
 * Generate SVG preview for a mirror pattern
 */
function PatternPreview({ pattern }) {
        const size = 40;
        const tileSize = size / 2;

        return (
                <svg
                        width={size}
                        height={size}
                        viewBox={`0 0 ${size} ${size}`}
                        className="mx-auto"
                >
                        {pattern.tiles.map((tile, index) => {
                                const col = index % 2;
                                const row = Math.floor(index / 2);
                                const x = col * tileSize;
                                const y = row * tileSize;

                                // Create a transform string for flip and rotate
                                const transforms = [];
                                const centerX = x + tileSize / 2;
                                const centerY = y + tileSize / 2;

                                // Apply transformations in order: translate to center, scale (flip), rotate, translate back
                                let transform = `translate(${centerX}, ${centerY})`;

                                if (tile.flipX || tile.flipY) {
                                        const scaleX = tile.flipX ? -1 : 1;
                                        const scaleY = tile.flipY ? -1 : 1;
                                        transform += ` scale(${scaleX}, ${scaleY})`;
                                }

                                if (tile.rotate) {
                                        transform += ` rotate(${tile.rotate})`;
                                }

                                transform += ` translate(${-tileSize / 2}, ${-tileSize / 2})`;

                                return (
                                        <g key={index} transform={transform}>
                                                {/* Base tile shape - a gradient triangle */}
                                                <rect
                                                        width={tileSize}
                                                        height={tileSize}
                                                        fill="#e0e7ff"
                                                        stroke="#6366f1"
                                                        strokeWidth="0.5"
                                                />
                                                <path
                                                        d={`M 0,0 L ${tileSize},0 L 0,${tileSize} Z`}
                                                        fill="#818cf8"
                                                />
                                        </g>
                                );
                        })}
                </svg>
        );
}

export default function PatternControls({ config, onChange, onReset }) {
        const handleChange = (key, value) => {
                onChange({ [key]: value });
        };

        return (
                <div className="space-y-6">
                        {/* Pattern Selector */}
                        <div className="space-y-3">
                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                        Mirror Pattern
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                        {[...PATTERN_OPTIONS]
                                                .reverse()
                                                .map((pattern) => (
                                                        <button
                                                                key={
                                                                        pattern.name
                                                                }
                                                                onClick={() =>
                                                                        handleChange(
                                                                                "patternId",
                                                                                pattern.name,
                                                                        )
                                                                }
                                                                className={`flex items-center justify-center px-3 py-4 rounded-lg border-2 transition-all duration-200 ${
                                                                        config.patternId ===
                                                                        pattern.name
                                                                                ? "border-accent-500 bg-accent-50 shadow-sm"
                                                                                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                                                                }`}
                                                                title={
                                                                        pattern.displayName
                                                                }
                                                        >
                                                                <PatternPreview
                                                                        pattern={
                                                                                pattern
                                                                        }
                                                                />
                                                        </button>
                                                ))}
                                </div>
                                <p className="text-xs text-gray-500">
                                        Each pattern creates unique symmetrical
                                        effects
                                </p>
                        </div>

                        {/* Tile Size Slider */}
                        <div className="space-y-3">
                                <label className="flex items-center justify-between text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                        <span>Tile Size</span>
                                        <span className="text-accent-600 font-mono">
                                                {config.tileSize}px
                                        </span>
                                </label>
                                <input
                                        type="range"
                                        min="20"
                                        max="300"
                                        value={config.tileSize}
                                        onChange={(e) =>
                                                handleChange(
                                                        "tileSize",
                                                        Number(e.target.value),
                                                )
                                        }
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                        <span>20px</span>
                                        <span>300px</span>
                                </div>
                        </div>

                        {/* Reset Button */}
                        <div className="pt-4 border-t border-gray-200">
                                <button
                                        onClick={onReset}
                                        className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                                >
                                        Reset to Defaults
                                </button>
                        </div>
                </div>
        );
}
