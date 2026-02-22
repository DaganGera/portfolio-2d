# Project Initiation Document (PID)

## 1. Project Definition
**Project Name:** DevTown - 2D RPG Interactive Portfolio
**Project Purpose:** To create a standout, interactive portfolio that acts as a 2D RPG game to showcase the developer's skills, resume, and projects to potential employers and collaborators.

## 2. Project Scope
**In Scope:**
- Creation of a 2D tile-based map.
- Implementation of a player character with movement and collision.
- Proximity-based interaction system.
- Development of React-based UI modals to display portfolio content (Resume, Projects, Skills, Contact).
- Asset integration (sprites, tilesets).
- Responsive design for mobile and desktop.
- Deployment to a static hosting provider (Vercel/Netlify).

**Out of Scope:**
- Complex game mechanics (combat, inventory, leveling).
- Backend server or database (fully static site).
- Multiplayer functionality.
- Massive open-world maps.

## 3. Deliverables
- Fully functional web application hosted on a public URL.
- Source code hosted on GitHub with comprehensive README.
- 1x Static Tilemap.
- 1x Player Spritesheet.
- 4-6 Interactive HTML Modals (About, Projects, Skills, Certificates, Contact).

## 4. Project Organization & Roles
- **Project Manager / Lead Developer:** Solo Developer. Responsible for all programming, asset integration, and deployment.
- **Stakeholders:** Recruiters, Hiring Managers, Hackathon Judges (Target Audience).

## 5. Timeline & Milestones (2-Week Sprint)
- **Milestone 1 (Days 1-2):** Project Setup. Vite, React, Kaboom.js configured. Tilemap rendered.
- **Milestone 2 (Days 3-4):** Player Movement & Collision implemented.
- **Milestone 3 (Days 5-6):** Interaction System and React State Bridge created.
- **Milestone 4 (Days 7-9):** UI Modals built and integrated with real portfolio content.
- **Milestone 5 (Days 10-12):** Mobile controls, accessibility features (Skip Game button), and visual polish.
- **Milestone 6 (Day 13-14):** Final testing, performance optimization, and project deployment.

## 6. Risks & Mitigation
- **Risk:** Game engine integration with React causes performance issues or re-rendering loops.
  - **Mitigation:** Carefully manage React component lifecycle. Mount the canvas only once and use an event bus or state manager to communicate between the game loop and React.
- **Risk:** Scope Creep (adding too many game features).
  - **Mitigation:** Strictly adhere to the "Out of Scope" list. Treat it as a portfolio first, game second.
- **Risk:** Unusable on mobile devices.
  - **Mitigation:** Prioritize the "Skip Game" fallback UI and implement an on-screen D-pad early in development.
