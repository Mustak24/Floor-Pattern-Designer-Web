/**
 * FloorDesigner - Main Application Component
 * Orchestrates all child components and manages app layout
 */

import { useRef } from "react";
import { useFloorDesigner } from "../hooks/useFloorDesigner.js";
import CanvasRenderer from "../canvas/CanvasRenderer.jsx";
import UploadPanel from "../ui/UploadPanel.jsx";
import PatternControls from "../ui/PatternControls.jsx";
import Toolbar from "../ui/Toolbar.jsx";

export default function FloorDesigner() {
        const canvasRef = useRef(null);

        const {
                image,
                config,
                zoom,
                panOffset,
                canvasSize,
                tiles,
                loading,
                error,
                canExport,
                loadImage,
                clearImage,
                updateConfig,
                resetConfig,
                updateZoom,
                resetZoom,
                setPresetGrid,
        } = useFloorDesigner();

        return (
                <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
                        {/* Header */}
                        <header className="bg-white border-b border-gray-200 shadow-sm">
                                <div className="max-w-screen-2xl mx-auto px-6 py-5">
                                        <div className="flex items-center justify-between">
                                                <div>
                                                        <h1 className="text-2xl font-bold text-gray-900">
                                                                Floor Pattern
                                                                Designer
                                                        </h1>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                                Create
                                                                professional
                                                                floor patterns
                                                                with your tile
                                                                designs
                                                        </p>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                        <div className="px-3 py-1.5 bg-accent-50 rounded-lg">
                                                                <span className="text-xs font-semibold text-accent-700 uppercase tracking-wide">
                                                                        {
                                                                                tiles.length
                                                                        }{" "}
                                                                        tiles
                                                                </span>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </header>

                        {/* Main Content */}
                        <main className="max-w-screen-2xl mx-auto px-6 py-8">
                                <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
                                        {/* Left Sidebar - Controls */}
                                        <aside className="space-y-6">
                                                {/* Upload Panel Card */}
                                                <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6">
                                                        <UploadPanel
                                                                onImageLoad={
                                                                        loadImage
                                                                }
                                                                currentImage={
                                                                        image
                                                                }
                                                                onClear={
                                                                        clearImage
                                                                }
                                                        />
                                                </div>

                                                {/* Pattern Controls Card */}
                                                <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6">
                                                        <PatternControls
                                                                config={config}
                                                                onChange={
                                                                        updateConfig
                                                                }
                                                                onReset={
                                                                        resetConfig
                                                                }
                                                        />
                                                </div>

                                                {/* Info Card */}
                                                <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-5 border border-accent-200">
                                                        <h4 className="text-sm font-semibold text-accent-900 mb-2">
                                                                💡 Quick Tips
                                                        </h4>
                                                        <ul className="text-xs text-accent-800 space-y-1.5">
                                                                <li>
                                                                        • Upload
                                                                        a marble
                                                                        or tile
                                                                        image
                                                                </li>
                                                                <li>
                                                                        • Choose
                                                                        mirror
                                                                        pattern
                                                                        style
                                                                </li>
                                                                <li>
                                                                        • Adjust
                                                                        tile
                                                                        size
                                                                </li>
                                                                <li>
                                                                        • Zoom
                                                                        to see
                                                                        details
                                                                </li>
                                                                <li>
                                                                        • Export
                                                                        as
                                                                        high-res
                                                                        PNG
                                                                </li>
                                                        </ul>
                                                </div>
                                        </aside>

                                        {/* Right Side - Canvas Area */}
                                        <section className="space-y-6">
                                                {/* Toolbar */}
                                                <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-4">
                                                        <Toolbar
                                                                zoom={zoom}
                                                                onZoomChange={
                                                                        updateZoom
                                                                }
                                                                onResetZoom={
                                                                        resetZoom
                                                                }
                                                                canExport={
                                                                        canExport
                                                                }
                                                                canvasRef={
                                                                        canvasRef
                                                                }
                                                        />
                                                </div>

                                                {/* Canvas Container */}
                                                <div className="bg-white rounded-xl shadow-glass border border-gray-200 p-8">
                                                        {loading && (
                                                                <div className="flex items-center justify-center h-96">
                                                                        <div className="text-center">
                                                                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600 mx-auto"></div>
                                                                                <p className="text-gray-600 mt-4">
                                                                                        Loading
                                                                                        image...
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                        )}

                                                        {error && (
                                                                <div className="flex items-center justify-center h-96">
                                                                        <div className="text-center max-w-md">
                                                                                <div className="text-red-500 text-4xl mb-4">
                                                                                        ⚠️
                                                                                </div>
                                                                                <p className="text-red-600 font-medium">
                                                                                        {
                                                                                                error
                                                                                        }
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                        )}

                                                        {!loading &&
                                                                !error &&
                                                                !image && (
                                                                        <div className="flex items-center justify-center h-96">
                                                                                <div className="text-center max-w-md">
                                                                                        <div className="text-gray-300 text-6xl mb-4">
                                                                                                🎨
                                                                                        </div>
                                                                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                                                                                Get
                                                                                                Started
                                                                                        </h3>
                                                                                        <p className="text-gray-500">
                                                                                                Upload
                                                                                                a
                                                                                                tile
                                                                                                image
                                                                                                to
                                                                                                begin
                                                                                                designing
                                                                                                your
                                                                                                floor
                                                                                                pattern
                                                                                        </p>
                                                                                </div>
                                                                        </div>
                                                                )}

                                                        {!loading &&
                                                                !error &&
                                                                image && (
                                                                        <div className="flex justify-center">
                                                                                <CanvasRenderer
                                                                                        ref={
                                                                                                canvasRef
                                                                                        }
                                                                                        image={
                                                                                                image
                                                                                        }
                                                                                        tiles={
                                                                                                tiles
                                                                                        }
                                                                                        zoom={
                                                                                                zoom
                                                                                        }
                                                                                        offset={
                                                                                                panOffset
                                                                                        }
                                                                                        width={
                                                                                                canvasSize.width
                                                                                        }
                                                                                        height={
                                                                                                canvasSize.height
                                                                                        }
                                                                                />
                                                                        </div>
                                                                )}
                                                </div>
                                        </section>
                                </div>
                        </main>

                        {/* Footer */}
                        <footer className="mt-12 pb-8">
                                <div className="max-w-screen-2xl mx-auto px-6">
                                        <div className="text-center text-sm text-gray-500">
                                                <p>
                                                        Built with React •
                                                        Canvas API • Pure
                                                        Client-Side
                                                </p>
                                        </div>
                                </div>
                        </footer>
                </div>
        );
}
