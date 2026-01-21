/**
 * Upload Panel Component
 * Handles image upload with drag-and-drop support
 */

import { useCallback, useState } from "react";
import { validateImageFile } from "../utils/imageLoader.js";

export default function UploadPanel({ onImageLoad, currentImage, onClear }) {
  const [dragActive, setDragActive] = useState(false);

  const handleFile = useCallback(
    (file) => {
      if (validateImageFile(file)) {
        onImageLoad(file);
      } else {
        alert("Please upload a valid PNG or JPG image");
      }
    },
    [onImageLoad],
  );

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile],
  );

  const handleChange = useCallback(
    (e) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    },
    [handleFile],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Upload Tile
        </h3>
        {currentImage && (
          <button
            onClick={onClear}
            className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {!currentImage ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            dragActive
              ? "border-accent-500 bg-accent-50"
              : "border-gray-300 bg-gray-50 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="space-y-2">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="text-sm text-gray-600">
              <span className="font-semibold text-accent-600 hover:text-accent-700">
                Click to upload
              </span>{" "}
              or drag and drop
            </div>

            <p className="text-xs text-gray-500">PNG or JPG (MAX. 10MB)</p>
          </div>
        </div>
      ) : (
        <div className="relative bg-white rounded-lg shadow-inner-soft p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-16 h-16 rounded bg-gray-100 overflow-hidden">
              <img
                src={currentImage.src}
                alt="Uploaded tile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Tile Image Loaded
              </p>
              <p className="text-xs text-gray-500">
                {currentImage.width} × {currentImage.height} px
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
