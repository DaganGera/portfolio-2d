# System & UI/UX Design Document

## 1. Architectural Overview
The application uses a hybrid architecture combining a 2D HTML5 Canvas Game Engine for rendering the world, and a modern frontend framework (React) for rendering UI overlays and handling application state.

### 1.1. High-Level Architecture
- **DOM Layer (React):** Handles routing (if any), global state, accessible navigation menus, and floating UI modals.
- **Canvas Layer (Kaboom.js / Phaser):** Handles the game loop, rendering sprites, tilemaps, sprite animations, physics (AABB collision), and input polling for player movement.
- **Bridge / Event Bus:** A communication layer that passes events from the Canvas (e.g., `onInteract('projectId')`) to React (e.g., `setModalOpen('projectId')`), and vice versa.

## 2. World Design & Layout
**Theme:** "DevTown" - A pristine, cozy technical campus.

### 2.1. Map Topology
- **Center:** Spawn point with a directional signpost.
- **North:** "The Office" (About Me & Resume). Cohesive wooden flooring, desk, bookshelf.
- **East:** "Projects Lab" (Portfolio). High-tech flooring, server racks, glowing monitors.
- **West:** "Skills Library" (Technologies). Bookshelves, reading tables, parchment.
- **North-West:** "Achievements Hall" (Certificates). Trophies, framed art on walls.
- **South-East:** "Post Office" (Contact). Mailboxes, desk.

### 2.2. Camera Behavior
- Camera strictly follows the player character.
- Camera clamping: The camera should not show the black void outside the map boundaries; it clamps to world edges.

## 3. Interaction Design (UX)
### 3.1. The Interaction Loop
1. Player walks into a predefined "Interaction Zone" (invisible trigger box near an object).
2. Game draws a floating 'E' or '?' sprite above the player.
3. Player presses the interaction key.
4. Game loop triggers an event, pausing player input.
5. React receives the event and mounts a Modal component over the canvas with a blur backdrop.
6. Player reads the content, clicks 'X' to close.
7. React unmounts the Modal; Game loop resumes player input.

### 3.2. Fallback UI
- A persistent floating React component layered above the canvas (Z-index: 100).
- Contains:
  - Mini-map / Fast Travel dropdown.
  - Controls toggle (Show on-screen D-pad).
  - "View Standard Portfolio" link.

## 4. Visual Assets & UI Styling
- **Game Art:** 16x16 or 32x32 pixel art. Clean, high contrast to distinguish walkable areas from walls.
- **UI Art (React):**
  - Modern web design (Glassmorphism or clean Flat Design).
  - Inter font or similar modern sans-serif.
  - Generous padding, rounded corners (Border-radius: 12px), subtle box-shadows.
  - Strong visual separation between the "retro" game and the "modern, professional" UI modals.
