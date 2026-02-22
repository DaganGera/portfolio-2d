# 2D RPG Portfolio Design Specification

## 1) CONCEPT OVERVIEW
- **Theme of the world**: A charming, modern tech hub resembling a peaceful university campus or a quiet silicon-valley-style small town.
- **Narrative idea**: The user plays as a "Guest" who has just arrived in "DevTown"—a cozy settlement built by the developer to house their creations, knowledge, and experience. The developer acts as the "Mayor" or "Head Researcher" of this town.
- **Why this concept works**: It taps into the instant engagement of nostalgia (reminiscent of Pokémon, Zelda, or Stardew Valley) while keeping the setting strictly professional. It demonstrates technical execution, spatial organization, and creativity without forcing the reviewer to engage in complex game mechanics.

## 2) WORLD / MAP LAYOUT
- **Locations & Buildings**:
  - **Spawn Point (Town Square)**: Central area. A welcome sign gives quick instructions (e.g., "WASD to move").
  - **The Office (Resume & About)**: Top-center. Looks like a cozy, modern office. Contains the developer's bio, a downloadable PDF resume, and quick personal stats.
  - **Projects Lab (Portfolio)**: Right side. Looks like a high-tech garage or laboratory with glowing monitors.
  - **Skills Center (Library/Dojo)**: Left side. A library representing programming languages, tools, and frameworks.
  - **Hall of Achievements (Certificates)**: Top-left. A museum-style building showcasing certificates, hackathon wins, and degrees.
  - **Communication Hub (Post Office)**: Bottom-right. A post office where users can "send a letter" (contact form) or find links to GitHub/LinkedIn/Twitter.
- **Map Size & Density**: Extremely compact. About 2 to 3 screen widths maximum. All buildings are clustered tightly around the spawn point so the entire scope of the portfolio is visible within a few seconds of walking.
- **Spatial Organization**: A simple "cross" or main-street layout. No winding paths, no dead ends, no getting lost.

## 3) PROJECT MAPPING
- **Presentation**: Inside the "Projects Lab", each major project is represented by a "Workstation", "Server Rack", or "Arcade Cabinet" that the user can interact with.
- **Interaction Style**: Approaching a workstation and pressing 'E', Spacebar, or clicking on it opens a sleek HTML/CSS modal overlay on top of the game canvas.
- **Recommended Structure (3-4 Projects max)**:
  - **Workstation 1**: Highlight Project (Biggest impact, most complex)
  - **Workstation 2**: Full-stack / Web App
  - **Workstation 3**: Game / Experimental / Hackathon Project
  - **Workstation 4**: Open Source Contribution / Utility

## 4) NAVIGATION DESIGN
- **Movement System**:
  - Keyboard: WASD / Arrow keys for rigid 4-directional or smooth 8-directional movement.
  - Mouse/Touch: Click/Tap-to-move pathfinding (essential for recruiters using trackpads or mobile phones).
- **Accessibility Features**:
  - Always-visible UI button (top-right or bottom-right) reading: "Skip Game / View Standard Portfolio" for users in a rush.
  - On-screen translucent D-pad for mobile touchscreens.
- **Fast-Travel Options**: A small, clickable minimap or a persistent HTML sidebar menu that teleports the player instantly to a specific building.
- **Orientation Aids**: Large, readable signposts outside each building (e.g., "⬅️ Skills | Projects ➡️").

## 5) INTERACTION DESIGN
- **Opening Information**: Walking up to an interactive object shows a floating prompt above the player's head (e.g., "[E] Read" or a "💬" bubble). Interacting freezes player movement and fades in a standard web modal.
- **Panel/Modal Behavior**: Modals blur the background game canvas (`backdrop-filter: blur()`). They look like premium, modern website panels (glassmorphism or clean dark mode), bridging the 2D pixel world with modern web UI/UX. The modals must have a massive, obvious 'X' to close, and click-outside-to-dismiss behavior.
- **Media Handling**: Render all heavy media (videos, high-res images, text) inside the HTML overlay, *not* drawn on the HTML5 Canvas. Use native `<iframe>` for videos and `<img>` for screenshots to ensure crisp text and high performance.

## 6) VISUAL STYLE GUIDELINES
- **Art Direction**: Clean 16-bit to 32-bit pixel art or minimalist flat vector art. Use pre-made cohesive asset packs (like Modern City/Office tilesets available on Itch.io) to save time.
- **Color Palette**: Cozy and approachable. Soft greens (grass), warm browns (wood/paths), and modern blues/grays (tech areas).
- **Environmental Style**: Bright daylight. Clean ground textures to prevent visual noise. A subtle drop-shadow beneath the character to ground them in the world.
- **Complexity Level**: Keep it strictly 2D top-down. Static tilemap background layer, collision layer, and one animated spritesheet for the player (idle and walk in 4 directions).

## 7) TECHNICAL IMPLEMENTATION PLAN
- **Recommended Web Technologies**: **React.js + Kaboom.js** (or Phaser 3).
  - *Why React + Kaboom?* Kaboom is incredibly simple and developer-friendly for 2D movement and collision. React handles the complex UI overlays gracefully without having to build UI from scratch in a game engine canvas.
- **Architecture Overview**:
  - The React app mounts the Game Engine in a background `<canvas>` component.
  - The Game Engine handles movement, collision, and proximity triggers.
  - When a user interacts, the Game Engine emits an event to React (e.g., `setModalState('project_1')`), triggering the HTML overlay to render.
- **Performance Considerations**: Preload minimal sprite sheets. Bundle with Vite. Ensure the total load size is < 5MB for instant loading.
- **Hosting Suggestions**: Vercel, Netlify, or GitHub Pages.

## 8) CONTENT PLACEHOLDERS
*Use these exact markers in your code and UI layout so you can easily drop in content later.*

**Office (Resume)**
- [INSERT PROFESSIONAL HEADSHOT HERE]
- [INSERT BIO TEXT HERE]
- [INSERT RESUME PDF LINK HERE]

**Projects Lab (Overlays)**
- [INSERT PROJECT 1 TITLE] - [INSERT PROJECT 1 GITHUB LINK]
- [INSERT PROJECT 1 DEMO VIDEO HERE] (Embed YouTube/Vimeo/Loom)
- [INSERT PROJECT 1 SCREENSHOTS HERE]
- [INSERT PROJECT 1 DESCRIPTION & TECH STACK HERE]

**Skills Center**
- [INSERT FRONTEND SKILLS ICONS HERE]
- [INSERT BACKEND SKILLS ICONS HERE]

**Hall of Achievements**
- [INSERT CERTIFICATE 1 IMAGE HERE]
- [INSERT HACKATHON BADGE HERE]

## 9) DEVELOPMENT ROADMAP
1. **Phase 1: Foundation (Days 1-2)**: Setup Vite + React + Game Engine. Render a static tilemap background. Add a temporary character square.
2. **Phase 2: Movement & Collision (Days 3-4)**: Implement player spritesheet, WASD/Arrow movement, and add physical boundaries to walls and buildings.
3. **Phase 3: Interactions (Days 5-6)**: Create interaction zones bounding boxes. Connect Canvas triggers to React state. Emulate opening and closing a blank React modal.
4. **Phase 4: Content & Modals (Days 7-9)**: Build out the HTML/CSS modals for Resume, Projects, Skills, and Contact. Swap in placeholders.
5. **Phase 5: Polish & Accessibility (Days 10-12)**: Add click-to-move pathfinding, mobile touch controls, and the critical "Skip Game" fallback menu. Update to final art assets.
6. **Phase 6: Deployment (Day 13)**: Test performance, optimize asset sizes, and deploy to Vercel/Netlify.

## 10) WOW FACTOR FEATURES
*Include just 1-2 of these to stand out without causing scope creep:*
- **The "Good Boy" Follower**: A cute dog or cat NPC near the spawn point that, if interacted with, follows the player around the map indefinitely.
- **Day/Night Toggle**: A UI button outside the canvas that, when clicked, transitions the canvas to a dark tint and turns on glowing pixel-art streetlamps.
- **Konami Code Easter Egg**: Entering `Up Up Down Down Left Right Left Right B A` changes the player's sprite into a wizard or robot, giving them a 2x speed boost.
