# Floor Pattern Designer

A professional tool for designing floor patterns using tile images. Built with React and the HTML5 Canvas API.

## Features

- **Upload & Preview**: Upload your own tile or marble images to visualize patterns instantly.
- **Advanced Pattern Patterns**:
     - Standard Grid and Offset layouts
     - Complex Mirror patterns (Diamond, Hexagon, etc.)
     - Customizable tile sizes and spacing
- **Interactive Workspace**:
     - Smooth Zoom and Pan controls
     - Real-time rendering
- **Export Options**: Save your designs as high-resolution PNG files.
- **Privacy Focused**: Pure client-side processing - your images never leave your browser.

## Technologies Used

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Graphics**: HTML5 Canvas API

## Getting Started

Follow these steps to run the project locally:

1. **Clone the repository**

      ```bash
      git clone <repository-url>
      cd my-app
      ```

2. **Install dependencies**

      ```bash
      npm install
      ```

3. **Start the development server**

      ```bash
      npm run dev
      ```

4. **Open in Browser**
   Navigate to `http://localhost:5173` to view the application.

## Project Structure

- `src/app`: Main application layout and state management
- `src/canvas`: Core canvas rendering logic and drawing functions
- `src/patterns`: Algorithms for generating different floor patterns
- `src/ui`: Reusable UI components (Toolbar, UploadPanel, etc.)
- `src/hooks`: Custom React hooks implementation

## License

[MIT](LICENSE)
