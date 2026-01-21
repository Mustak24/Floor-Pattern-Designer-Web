/**
 * Pattern Controls Component
 * User controls for pattern configuration
 */

import { PATTERN_TYPES } from "../engine/patternEngine.js";

const PATTERN_OPTIONS = [
        { value: PATTERN_TYPES.GRID, label: "Grid", icon: "▦" },
        { value: PATTERN_TYPES.DIAGONAL, label: "Diagonal", icon: "⟍" },
];

export default function PatternControls({
        config,
        onChange,
        onReset,
        onPresetGrid,
}) {
        const handleChange = (key, value) => {
                onChange({ [key]: value });
        };

        return (
                <div className="space-y-6">
                        {/* Pattern Type Selector */}
                        <div className="space-y-3">
                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                        Pattern Type
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                        {PATTERN_OPTIONS.map((option) => (
                                                <button
                                                        key={option.value}
                                                        onClick={() =>
                                                                handleChange(
                                                                        "patternType",
                                                                        option.value,
                                                                )
                                                        }
                                                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 font-medium text-sm transition-all duration-200 ${
                                                                config.patternType ===
                                                                option.value
                                                                        ? "border-accent-500 bg-accent-50 text-accent-700 shadow-sm"
                                                                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                                                        }`}
                                                >
                                                        <span className="text-lg">
                                                                {option.icon}
                                                        </span>
                                                        <span>
                                                                {option.label}
                                                        </span>
                                                </button>
                                        ))}
                                </div>
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

                        {/* Spacing Slider */}
                        <div className="space-y-3">
                                <label className="flex items-center justify-between text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                        <span>Grout Spacing</span>
                                        <span className="text-accent-600 font-mono">
                                                {config.spacing}px
                                        </span>
                                </label>
                                <input
                                        type="range"
                                        min="0"
                                        max="20"
                                        value={config.spacing}
                                        onChange={(e) =>
                                                handleChange(
                                                        "spacing",
                                                        Number(e.target.value),
                                                )
                                        }
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                        <span>0px</span>
                                        <span>20px</span>
                                </div>
                        </div>

                        {/* Rotation Slider */}
                        <div className="space-y-3">
                                <label className="flex items-center justify-between text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                        <span>Tile Rotation</span>
                                        <span className="text-accent-600 font-mono">
                                                {config.rotation}°
                                        </span>
                                </label>
                                <input
                                        type="range"
                                        min="0"
                                        max="360"
                                        value={config.rotation}
                                        onChange={(e) =>
                                                handleChange(
                                                        "rotation",
                                                        Number(e.target.value),
                                                )
                                        }
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-500"
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                        <span>0°</span>
                                        <span>360°</span>
                                </div>
                        </div>

                        {/* Grid Preset Buttons */}
                        <div className="space-y-3">
                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                        Grid Presets
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                        <button
                                                onClick={() => onPresetGrid(2)}
                                                className="px-3 py-2 bg-white border-2 border-gray-200 hover:border-accent-400 hover:bg-accent-50 rounded-lg font-semibold text-sm text-gray-700 hover:text-accent-700 transition-all duration-200"
                                        >
                                                2×2
                                        </button>
                                        <button
                                                onClick={() => onPresetGrid(3)}
                                                className="px-3 py-2 bg-white border-2 border-gray-200 hover:border-accent-400 hover:bg-accent-50 rounded-lg font-semibold text-sm text-gray-700 hover:text-accent-700 transition-all duration-200"
                                        >
                                                3×3
                                        </button>
                                        <button
                                                onClick={() => onPresetGrid(4)}
                                                className="px-3 py-2 bg-white border-2 border-gray-200 hover:border-accent-400 hover:bg-accent-50 rounded-lg font-semibold text-sm text-gray-700 hover:text-accent-700 transition-all duration-200"
                                        >
                                                4×4
                                        </button>
                                </div>
                        </div>

                        {/* Manual Column/Row Controls */}
                        <div className="space-y-3">
                                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                        Manual Grid Size
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                        <div>
                                                <label className="block text-xs text-gray-600 mb-1">
                                                        Columns
                                                </label>
                                                <input
                                                        type="number"
                                                        min="1"
                                                        max="50"
                                                        value={
                                                                config.columns ||
                                                                ""
                                                        }
                                                        placeholder="Auto"
                                                        onChange={(e) =>
                                                                handleChange(
                                                                        "columns",
                                                                        e.target
                                                                                .value
                                                                                ? Number(
                                                                                          e
                                                                                                  .target
                                                                                                  .value,
                                                                                  )
                                                                                : null,
                                                                )
                                                        }
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-sm"
                                                />
                                        </div>
                                        <div>
                                                <label className="block text-xs text-gray-600 mb-1">
                                                        Rows
                                                </label>
                                                <input
                                                        type="number"
                                                        min="1"
                                                        max="50"
                                                        value={
                                                                config.rows ||
                                                                ""
                                                        }
                                                        placeholder="Auto"
                                                        onChange={(e) =>
                                                                handleChange(
                                                                        "rows",
                                                                        e.target
                                                                                .value
                                                                                ? Number(
                                                                                          e
                                                                                                  .target
                                                                                                  .value,
                                                                                  )
                                                                                : null,
                                                                )
                                                        }
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 text-sm"
                                                />
                                        </div>
                                </div>
                                <p className="text-xs text-gray-500">
                                        Leave blank for automatic calculation
                                </p>
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
