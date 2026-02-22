# Technology Stack Document

## 1. Core Stack Selection
This project leverages a hybrid approach: rendering the interactive 2D world using a lightweight game engine via HTML5 Canvas, while utilizing a robust UI framework for standard web components (text, images, videos) to ensure accessibility, crisp typography, and responsive design.

### Frontend Framework: React.js
- **Why React?** State management for UI overlays is necessary. Creating rich, scrollable web interfaces inside an HTML5 Canvas is notoriously difficult, performs poorly, and is bad for accessibility (text cannot be highlighted). React allows us to build premium UI modals layered _over_ the game canvas effortlessly.
- **Build Tool:** **Vite**
  - Provides instant server start, extremely fast HMR (Hot Module Replacement), and highly optimized production builds.

### Game Engine: Kaboom.js (Alternative: Phaser 3)
- **Why Kaboom.js?** Kaboom is incredibly simple, lightweight, and fast to prototype with. It handles sprites, animations, simple physics, and collision out of the box with an intuitive, component-based API.
- **Why not Phaser?** Phaser is incredibly powerful but has a steeper learning curve and larger bundle size. For a simple top-down walking simulator without complex physics, Kaboom is perfectly scoped. (Note: If using React, `kaboom` can be initialized in a simple `useEffect` referencing a canvas ref).

### Styling: Tailwind CSS (or Vanilla CSS Modules)
- **Why Tailwind?** Rapid UI development for the React overlays. It allows for quick implementation of modern UI patterns like glassmorphism (`backdrop-blur`, `bg-opacity`), flexbox centering, and responsive design for the modals without maintaining separate stylesheets.

## 2. Media & Asset Pipeline
- **Map Editor:** **Tiled (MapEditor.org)**
  - Tiled allows for easy drag-and-drop creation of 2D orthogonal tilemaps. Maps can be exported as JSON and parsed directly by Kaboom/Phaser to generate the collision and background layers.
- **Vector/UI Assets:** Figma (for designing the React modals and layout structure).
- **Pixel Art Assets:** Aseprite or free assets from Itch.io.

## 3. Hosting & Deployment
- **Platform:** **Vercel** or **Netlify**
  - Both offer seamless continuous deployment from GitHub, global edge-CDN delivery for fast loading of image/audio assets, and automated SSL.

## 4. Development Tools
- **Version Control:** Git & GitHub.
- **Package Manager:** `npm` or `pnpm`.
- **Linting & Formatting:** ESLint & Prettier.

## 5. Summary of Technologies
| Layer | Tech Choice | Purpose |
| :--- | :--- | :--- |
| **View (UI)** | React (via Vite) | Managing modals, accessible UI, and overall app state. |
| **View (Game)** | Kaboom.js | Rendering the world, player movement, physics, and collisions. |
| **Styling** | Tailwind CSS | Styling the React UI overlays and layout. |
| **Level Design**| Tiled Map Editor | Generating the map layout and collision geometry (JSON). |
| **Hosting** | Vercel | Fast, global CDN delivery of the static site. |
