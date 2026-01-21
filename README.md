# Floor Pattern Designer

A professional web-based floor pattern design tool built with React and Canvas API. Create beautiful floor tile patterns by uploading your own tile images and experimenting with different layouts, sizes, and rotations.

![Floor Pattern Designer](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.19-38B2AC?logo=tailwindcss)

## ✨ Features

- **🖼️ Image Upload**: Upload your own tile images (marble, ceramic, wood, etc.)
- **🎨 Pattern Types**: Choose from Grid and Diagonal patterns
- **📏 Customizable Sizing**: Adjust tile size from 20px to 300px
- **📐 Grout Spacing**: Control spacing between tiles (0-20px)
- **🔄 Tile Rotation**: Rotate individual tiles by 90° with a click
- **🔍 Zoom & Pan**: Zoom in/out to view pattern details
- **📊 Grid Presets**: Quick 2×2, 3×3, and 4×4 grid layouts
- **🎯 Manual Grid Control**: Set custom column and row counts
- **💾 Export**: Download your design as high-resolution PNG (2x scale)
- **⚡ Real-time Preview**: Instant pattern updates as you adjust settings

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd my-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- **`npm run dev`** - Start development server with hot module replacement
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint for code quality checks

## 📁 Project Structure

```
my-app/
├── src/
│   ├── app/              # Main application components
│   │   └── FloorDesigner.jsx
│   ├── canvas/           # Canvas rendering logic
│   │   ├── CanvasController.js
│   │   └── CanvasRenderer.jsx
│   ├── engine/           # Pattern generation engine
│   │   ├── patternEngine.js
│   │   └── layoutCalculator.js
│   ├── patterns/         # Pattern generators
│   │   ├── grid.js
│   │   └── diagonal.js
│   ├── hooks/            # React hooks
│   │   └── useFloorDesigner.js
│   ├── ui/               # UI components
│   │   ├── PatternControls.jsx
│   │   ├── Toolbar.jsx
│   │   └── UploadPanel.jsx
│   └── utils/            # Utility functions
│       ├── exportCanvas.js
│       ├── imageLoader.js
│       └── mathHelpers.js
├── public/               # Static assets
├── index.html
├── package.json
└── vite.config.js
```

## 🎯 How to Use

1. **Upload a Tile Image**
      - Click "Choose Image" or drag & drop your tile image
      - Supported formats: JPG, PNG, WebP

2. **Select a Pattern Type**
      - **Grid**: Traditional straight-laid pattern
      - **Diagonal**: 45° rotated grid pattern

3. **Adjust Settings**
      - **Tile Size**: Control the size of each tile
      - **Grout Spacing**: Set the gap between tiles
      - **Tile Rotation**: Modify the rotation angle (0-360°)

4. **Fine-tune the Layout**
      - Use preset grid sizes (2×2, 3×3, 4×4)
      - Or manually set columns and rows
      - Click individual tiles to rotate them 90°

5. **Export Your Design**
      - Zoom to desired view
      - Click "Export PNG" to download high-resolution image

## 🧩 Pattern Types

### Grid Pattern

Classic straight-laid pattern where tiles are aligned in rows and columns. Perfect for traditional flooring designs.

### Diagonal Pattern

Tiles are rotated 45° creating a diamond-like appearance. Adds visual interest and can make spaces appear larger.

## 🎨 Tech Stack

- **React 19.2** - UI framework
- **Vite 7.2** - Build tool and dev server
- **TailwindCSS 3.4** - Utility-first CSS framework
- **Canvas API** - For rendering tile patterns
- **ESLint** - Code quality and consistency

## 🔧 Configuration

### Tailwind Configuration

Custom colors and styles are defined in `tailwind.config.js`. The app uses a custom accent color scheme and soft shadow utilities.

### Vite Configuration

Hot Module Replacement (HMR) is configured in `vite.config.js` for fast development feedback.

## 📝 Development Notes

- The application is purely client-side with no backend requirements
- All image processing happens in the browser
- Patterns are generated using the HTML5 Canvas API
- State management is handled via React hooks
- The app is responsive and works on desktop browsers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and not licensed for public use.

## 🐛 Known Limitations

- Large images may affect performance
- Export quality depends on browser canvas limitations
- Mobile support is limited (desktop recommended)

## 💡 Future Enhancements

- Additional pattern types (chevron, basketweave, etc.)
- Color adjustment tools
- Multiple tile support for complex patterns
- Pattern templates library
- Mobile-responsive design improvements

---

**Built with ❤️ using React, Canvas API, and modern web technologies**
