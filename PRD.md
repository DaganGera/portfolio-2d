# Product Requirements Document (PRD)

## 1. Project Overview
**Product Name:** DevTown - 2D RPG Interactive Portfolio
**Platform:** Web Browser (Desktop & Mobile)
**Target Audience:** Technical Recruiters, Engineering Managers, Hackathon Judges, Peers.
**Core Value Proposition:** A professional portfolio that feels like a playable, nostalgic 2D top-down game, presenting the developer's skills and projects in an engaging, memorable format while maintaining accessibility and speed.

## 2. Goals & Objectives
- **Engage:** Capture the visitor's attention within the first 5 seconds.
- **Inform:** Clearly communicate the developer's skills, projects, and contact information within 1-2 minutes of exploration.
- **Perform:** Load quickly (< 5MB initial asset load) and run smoothly at 60 FPS in modern web browsers.
- **Stand Out:** Provide a "Wow Factor" that differentiates the developer from standard scrolling web portfolios.

## 3. User Stories
- **As a Recruiter in a rush,** I want to click a "Skip Game / Standard View" button so I can immediately see the developer's PDF resume and standard project list without playing.
- **As an Engineering Manager,** I want to walk up to the "Projects Lab" and interact with a terminal to read detailed technical write-ups and watch demo videos of the developer's work.
- **As a Mobile User,** I want to tap on the screen to move the character (pathfinding) or use an on-screen D-pad so I can navigate the world without a keyboard.
- **As a Visitor,** I want to easily identify different sections of the portfolio by looking at distinctly designed buildings (e.g., Office, Lab, Library).

## 4. Functional Requirements
### 4.1. Core Mechanics
- 2D Top-down orthographic or perspective movement (4 or 8 directional).
- Collision detection against walls, buildings, and world boundaries.
- Proximity triggers: When the player is near an interactive object, a UI prompt (e.g., "[E] Interact") appears.

### 4.2. World & Navigation
- A single, compact map featuring distinct zones (Town Square, Office, Projects Lab, Skills Library, Achievements Hall, Contact Post Office).
- Fast travel options via a minimap or a persistent sidebar UI.

### 4.3. Interface & Overlays
- **Modals:** Interacting with objects freezes player movement and opens a responsive HTML/CSS overlay (modal) containing the relevant content.
- Modals must be easily dismissible (clickable 'X' or click-outside).
- Support for embedded media (`<iframe>` for videos, `<img src="...">` for images) inside modals.

### 4.4. Controls
- Keyboard: WASD or Arrow Keys for movement. 'E' or Spacebar for interaction.
- Mouse/Touch: Click/Tap to move.

## 5. Non-Functional Requirements
- **Performance:** App must load instantly. Game loop should target 60FPS. Asset sizes must be optimized.
- **Responsiveness:** HTML overlays must be fully responsive, readable on mobile screens, and accessible.
- **Accessibility:** Clear readable fonts in UI overlays, contrast-compliant colors, and alternative non-game navigation.

## 6. Future / Out of Scope (For V1)
- Multiplayer/Networking.
- Combat or enemy NPCs.
- Inventory systems.
- Procedural generation.
