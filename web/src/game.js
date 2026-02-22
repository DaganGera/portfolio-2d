import kaboom from 'kaboom';
import { SPRITES } from './assets';

export function initGame(canvasRef) {
    const k = kaboom({
        global: false,
        canvas: canvasRef,
        background: [34, 63, 22], // Deep darker forest green for high-res theme
        width: window.innerWidth,
        height: window.innerHeight,
        scale: 1, // Keep native scaling, assets are high-res now
    });

    // Helper to bulletproof SVG loading for Kaboom using Base64 Data URIs
    const loadSvgSafe = (name, svgString) => {
        try {
            const base64 = btoa(svgString);
            k.loadSprite(name, `data:image/svg+xml;base64,${base64}`);
        } catch (e) {
            console.error(`Error encoding SVG ${name}:`, e);
        }
    };

    k.onError((err) => {
        k.add([
            k.text(`ERROR: ${err}`, { size: 32, font: "sans-serif" }),
            k.color(255, 0, 0),
            k.pos(window.innerWidth / 2, window.innerHeight / 2),
            k.anchor("center"),
            k.z(99999)
        ]);
        console.error("Kaboom Error:", err);
    });

    // Load High-Res Sprites safely
    loadSvgSafe("grass", SPRITES.grass);
    loadSvgSafe("path", SPRITES.path);
    loadSvgSafe("water", SPRITES.water);
    loadSvgSafe("tree", SPRITES.tree);
    loadSvgSafe("player", SPRITES.player);
    loadSvgSafe("office", SPRITES.office);
    loadSvgSafe("lab", SPRITES.lab);
    loadSvgSafe("library", SPRITES.library);
    loadSvgSafe("postoffice", SPRITES.postoffice);

    k.scene("main", () => {
        // ----------------------------------------------------------------
        // 1. WORLD GENERATION (LARGE ORGANIC MAP)
        // ----------------------------------------------------------------

        // Base grass layer
        k.add([
            k.rect(5000, 5000),
            k.pos(-2500, -2500),
            k.color(34, 63, 22),
            k.z(-10000) // Ground Layer must be deep underground
        ]);

        // Scatter grass tiles naturally (not strict grid)
        for (let i = 0; i < 600; i++) {
            k.add([
                k.sprite("grass"),
                k.pos(-2000 + Math.random() * 4000, -2000 + Math.random() * 4000),
                k.z(-9999),
                k.opacity(0.9)
            ]);
        }

        // A beautiful river cutting through the left side
        for (let y = -2000; y < 2000; y += 100) {
            for (let x = -1000; x < -700; x += 100) {
                // Wobbly river curve
                const curveOffset = Math.sin(y * 0.005) * 300;
                if (Math.random() > 0.1) {
                    k.add([
                        k.sprite("water"),
                        k.pos(x + curveOffset, y),
                        k.z(-9998),
                        "water_tile"
                    ]);
                }
            }
        }

        // Main winding path connecting locations
        const paintPath = (x, y) => {
            k.add([
                k.sprite("path"),
                k.pos(x, y),
                k.z(-9997), // Path is above water
                k.anchor("center")
            ]);
            // Small chance for a wide path
            if (Math.random() > 0.5) {
                k.add([k.sprite("path"), k.pos(x + 40, y + 20), k.z(-9997), k.anchor("center")]);
            }
        };

        // Vertical Main Street (North and South)
        for (let y = -450; y <= 450; y += 60) paintPath(0, y);
        // Path to Forge (East)
        for (let x = 0; x <= 480; x += 60) paintPath(x, 150);
        // Path to Mage Tower (West)
        for (let x = 0; x >= -480; x -= 60) paintPath(x + (Math.sin(x * 0.01) * 50), -150); // Wobbly path

        // Central Plaza
        for (let px = -120; px <= 120; px += 60) {
            for (let py = -120; py <= 120; py += 60) {
                paintPath(px, py);
            }
        }

        // ----------------------------------------------------------------
        // 2. BUILDINGS & INTERACTION ZONES
        // ----------------------------------------------------------------
        // Organic, asymmetrical placement closer to center
        const buildings = [
            { id: 'about', sprite: 'office', pos: k.vec2(0, -500), colSize: k.vec2(200, 150) }, // Citadel (North)
            { id: 'projects', sprite: 'lab', pos: k.vec2(550, 150), colSize: k.vec2(220, 160) }, // Forge (East)
            { id: 'skills', sprite: 'library', pos: k.vec2(-550, -150), colSize: k.vec2(160, 200) }, // Tower (West)
            { id: 'contact', sprite: 'postoffice', pos: k.vec2(0, 500), colSize: k.vec2(200, 150) }, // Guild (South)
        ];

        buildings.forEach(b => {
            // Draw the base building shape directly using registered sprites
            k.add([
                k.sprite(b.sprite),
                k.pos(b.pos.x, b.pos.y - 60), // Visual offset so player stands *in front* of the door
                k.anchor("center"),
                k.z(b.pos.y) // Y-Sort depth
            ]);

            // Invisible interaction/collision box covering the base
            k.add([
                k.rect(b.colSize.x, b.colSize.y),
                k.pos(b.pos.x, b.pos.y),
                k.anchor("center"),
                k.area(),
                k.body({ isStatic: true }),
                b.id,
                "interactable",
                k.opacity(0.0), // Keep it invisible
                k.z(Math.floor(b.pos.y) + 1000)
            ]);
        });

        // ----------------------------------------------------------------
        // 3. ORGANIC FOREST (Collision Trees)
        // ----------------------------------------------------------------
        const scatterTrees = (centerX, centerY, radius, count) => {
            for (let i = 0; i < count; i++) {
                const a = Math.random() * Math.PI * 2;
                const r = Math.random() * radius;
                const tx = centerX + Math.cos(a) * r;
                const ty = centerY + Math.sin(a) * r;

                // Prevent trees from spawning on main pathways
                if (Math.abs(tx) < 220 && Math.abs(ty) < 800) continue; // N/S road and plaza
                if (Math.abs(ty) < 220 && Math.abs(tx) < 800) continue; // E/W road

                // Prevent trees from spawning directly on top of buildings
                let overlapsBuilding = false;
                buildings.forEach(b => {
                    if (k.vec2(tx, ty).dist(b.pos) < (Math.max(b.colSize.x, b.colSize.y) + 50)) {
                        overlapsBuilding = true;
                    }
                });

                if (overlapsBuilding) continue;

                k.add([
                    k.sprite("tree"),
                    k.pos(tx, ty),
                    k.anchor("center"),
                    k.area({ shape: new k.Rect(k.vec2(0, 40), 30, 20) }), // Trunk collision
                    k.body({ isStatic: true }),
                    k.z(Math.floor(ty) + 1000) // Huge Z-Offset to guarantee proper overlap
                ]);
            }
        };

        scatterTrees(-500, -600, 500, 40); // North West Forest
        scatterTrees(600, -500, 600, 50); // North East Forest
        scatterTrees(-500, 600, 500, 40); // South West Forest
        scatterTrees(600, 600, 600, 50); // South East Forest

        // ----------------------------------------------------------------
        // 3.5 ENVIRONMENTAL EFFECTS (FALLING LEAVES/SPORES)
        // ----------------------------------------------------------------
        k.loop(0.2, () => {
            if (isPaused) return;

            // Spawn relative to current camera position to ensure they always fall around the player
            const cam = k.camPos();
            const spawnX = cam.x + (Math.random() - 0.5) * k.width() * 1.5;
            const spawnY = cam.y - k.height() / 2 - 50;

            const leaf = k.add([
                k.rect(Math.random() * 6 + 2, Math.random() * 6 + 2, { radius: 2 }),
                k.color(
                    Math.random() > 0.5 ? 40 : 200, // Mix of deep forest green and golden
                    Math.random() > 0.5 ? 200 : 215,
                    Math.random() > 0.5 ? 40 : 0
                ),
                k.pos(spawnX, spawnY),
                k.opacity(Math.random() * 0.5 + 0.1),
                k.z(20000), // Above everything
                "particle",
                {
                    speedY: Math.random() * 40 + 20,
                    swayFreq: Math.random() * 2 + 1,
                    swayAmp: Math.random() * 30 + 10,
                    initX: spawnX,
                    time: Math.random() * 100
                }
            ]);

            leaf.onUpdate(() => {
                if (isPaused) return;
                leaf.time += k.dt();
                leaf.pos.y += leaf.speedY * k.dt();
                // Gentle swaying side to side to simulate wind
                leaf.pos.x = leaf.initX + Math.sin(leaf.time * leaf.swayFreq) * leaf.swayAmp;

                // Destroy when far below the camera
                if (leaf.pos.y > k.camPos().y + k.height() / 2 + 100) {
                    leaf.destroy();
                }
            });
        });

        // ----------------------------------------------------------------
        // 4. HIGH-RES PLAYER SETUP
        // ----------------------------------------------------------------
        const speed = 350; // Faster movement for bigger map

        const player = k.add([
            k.sprite("player"),
            k.pos(0, 0),
            k.anchor("center"),
            k.scale(1.2), // Slightly larger hero
            k.rotate(0),
            k.area({ shape: new k.Rect(k.vec2(0, 20), 30, 20) }), // Collision around feet
            k.body(),
            k.z(0),
            "player",
            { isMoving: false }
        ]);

        k.onUpdate(() => {
            const camPos = k.camPos();
            k.camPos(camPos.lerp(player.pos, 0.08)); // Very smooth cinematic camera
            player.z = Math.floor(player.pos.y) + 1000;
        });

        // ----------------------------------------------------------------
        // 5. ENHANCED EXPLICIT INTERACTION
        // ----------------------------------------------------------------
        let isPaused = false;

        // Listen to the React bridge to unpause
        window.addEventListener('resumeGame', () => {
            isPaused = false;
            player.isMoving = false; // Reset velocity
            isMovingToClick = false; // Stop any ongoing pathfinding
        });

        k.onKeyDown("a", () => { if (!isPaused) { player.move(-speed, 0); player.isMoving = true; player.flipX = true; } });
        k.onKeyDown("d", () => { if (!isPaused) { player.move(speed, 0); player.isMoving = true; player.flipX = false; } });
        k.onKeyDown("w", () => { if (!isPaused) { player.move(0, -speed); player.isMoving = true; } });
        k.onKeyDown("s", () => { if (!isPaused) { player.move(0, speed); player.isMoving = true; } });
        k.onKeyDown("left", () => { if (!isPaused) { player.move(-speed, 0); player.isMoving = true; player.flipX = true; } });
        k.onKeyDown("right", () => { if (!isPaused) { player.move(speed, 0); player.isMoving = true; player.flipX = false; } });
        k.onKeyDown("up", () => { if (!isPaused) { player.move(0, -speed); player.isMoving = true; } });
        k.onKeyDown("down", () => { if (!isPaused) { player.move(0, speed); player.isMoving = true; } });

        // Premium Interaction Prompt
        let closestZone = null;
        const promptContainer = k.add([
            k.rect(160, 40, { radius: 12 }),
            k.color(0, 0, 0),
            k.anchor("center"),
            k.opacity(0),
            k.z(9999),
            k.area() // Make it clickable
        ]);

        promptContainer.onClick(() => {
            // Only interact if the prompt is actually visible and we aren't paused
            if (!isPaused && closestZone && promptContainer.opacity > 0) {
                triggerInteraction();
            }
        });
        const promptText = k.add([
            // Agnostic text for PC (E) and Mobile (Tap)
            k.text("Press E or Tap to Open", { size: 14, font: "sans-serif", weight: "bold" }),
            k.color(255, 215, 0), // Gold text
            k.anchor("center"),
            k.opacity(0),
            k.z(10000)
        ]);

        let time = 0;
        k.onUpdate(() => {
            time += k.dt();

            // Hero Animation
            if (player.isMoving) {
                player.angle = Math.sin(time * 12) * 6; // Confident striding
                player.scale.y = 1.2;
            } else {
                player.angle = k.lerp(player.angle, 0, 0.2);
                player.scale.y = 1.2 + Math.sin(time * 3) * 0.03; // Smooth breathing
            }
            player.isMoving = false;

            // Reliable Zone Detection
            closestZone = null;
            let minDistance = 350; // Increased radius for bigger buildings

            const interactables = k.get("interactable");
            for (const entity of interactables) {
                if (!player.pos) continue;
                const dist = player.pos.dist(entity.pos);
                if (dist < minDistance) {
                    closestZone = entity;
                    minDistance = dist;
                }
            }

            // Render Prompt gracefully
            if (closestZone && !isPaused) {
                const bounce = Math.sin(time * 8) * 5; // Bouncing prompt
                promptContainer.opacity = 0.85;
                promptText.opacity = 1;
                promptContainer.pos = player.pos.add(0, -70 + bounce);
                promptText.pos = player.pos.add(0, -70 + bounce);
                // Outline the closest object slightly to show it's selected
                closestZone.opacity = 0.2; // Show the debug rectangle slightly as a highlight
            } else {
                promptContainer.opacity = 0;
                promptText.opacity = 0;
                interactables.forEach(z => z.opacity = 0); // Hide highlights
            }
        });

        const triggerInteraction = () => {
            console.log("Interaction Key Pressed. closestZone:", closestZone?.id, "isPaused:", isPaused);
            if (closestZone && !isPaused) {
                // In modern Kaboom, use .is(tagName) instead of checking .tags array Directly
                const zoneId = ["about", "projects", "skills", "contact"].find(t => closestZone.is(t));
                if (zoneId) {
                    console.log("Dispatching openModal for zone:", zoneId);
                    isPaused = true;
                    player.isMoving = false;
                    closestZone.opacity = 0;

                    window.dispatchEvent(new CustomEvent('openModal', { detail: zoneId }));
                }
            }
        };

        k.onKeyPress("e", triggerInteraction);
        k.onKeyPress("space", triggerInteraction);
        k.onKeyPress("enter", triggerInteraction); // Added enter for safety

        // ----------------------------------------------------------------
        // 6. MOUSE PATHFINDING 
        // ----------------------------------------------------------------
        let isMovingToClick = false;
        let targetPos = null;

        k.onMousePress((button) => {
            if (isPaused || button !== "left") return;

            // Do not walk if the user is clicking the interaction UI prompt!
            if (promptContainer.isHovering() && promptContainer.opacity > 0) return;

            targetPos = k.toWorld(k.mousePos());
            isMovingToClick = true;

            // Click visual effect
            const marker = k.add([
                k.circle(6),
                k.color(255, 215, 0), // Gold click
                k.pos(targetPos),
                k.anchor("center"),
                k.opacity(0.8),
                k.z(9000)
            ]);
            k.tween(marker.opacity, 0, 0.4, (v) => marker.opacity = v, k.easings.easeOutQuad).onEnd(() => marker.destroy());
        });

        k.onUpdate(() => {
            if (isMovingToClick && targetPos && !isPaused) {
                if (player.pos.dist(targetPos) > 10) {
                    player.moveTo(targetPos, speed);
                    player.isMoving = true;
                    if (targetPos.x < player.pos.x) player.flipX = true;
                    else if (targetPos.x > player.pos.x) player.flipX = false;
                } else {
                    isMovingToClick = false;
                }
            }
        });

        k.onKeyPress(["w", "a", "s", "d", "up", "down", "left", "right"], () => isMovingToClick = false);

        // ----------------------------------------------------------------
        // 7. VIRTUAL JOYSTICK FOR MOBILE
        // ----------------------------------------------------------------
        let joystickActive = false;
        let joystickDir = k.vec2(0, 0);
        let touchOrigin = k.vec2(0, 0);

        // Visual Joystick Base
        const joyBase = k.add([
            k.circle(50),
            k.color(255, 255, 255),
            k.opacity(0.1),
            k.pos(100, k.height() - 100),
            k.fixed(),
            k.z(100000)
        ]);

        // Visual Joystick Stick
        const joyStick = k.add([
            k.circle(25),
            k.color(255, 255, 255),
            k.opacity(0.3),
            k.pos(100, k.height() - 100),
            k.fixed(),
            k.z(100001)
        ]);

        k.onTouchStart((id, pos) => {
            if (isPaused) return;
            // Only activate joystick if touching the left half of the screen
            if (pos.x < k.width() / 2) {
                joystickActive = true;
                touchOrigin = pos;
                joyBase.pos = pos;
                joyStick.pos = pos;
                joyBase.opacity = 0.3;
                joyStick.opacity = 0.6;
                isMovingToClick = false; // Override mouse click navigation
            }
        });

        k.onTouchMove((id, pos) => {
            if (!joystickActive || isPaused) return;

            const delta = pos.sub(touchOrigin);
            const dist = delta.len();
            const maxDist = 40;

            // Constrain visual stick
            if (dist > maxDist) {
                joyStick.pos = touchOrigin.add(delta.unit().scale(maxDist));
                joystickDir = delta.unit();
            } else {
                joyStick.pos = pos;
                joystickDir = delta.scale(1 / maxDist);
            }

            player.isMoving = true;
            if (joystickDir.x < 0) player.flipX = true;
            else if (joystickDir.x > 0) player.flipX = false;
        });

        k.onTouchEnd((id, pos) => {
            joystickActive = false;
            joystickDir = k.vec2(0, 0);

            // Reset visuals to default position
            joyBase.pos = k.vec2(100, k.height() - 100);
            joyStick.pos = k.vec2(100, k.height() - 100);
            joyBase.opacity = 0.1;
            joyStick.opacity = 0.3;

            player.isMoving = false;
        });

        // Apply joystick movement in the main update loop
        k.onUpdate(() => {
            if (joystickActive && !isPaused) {
                player.move(joystickDir.scale(speed));
            }

            // Keep joystick anchored to bottom left dynamically if resized
            if (!joystickActive) {
                joyBase.pos = k.vec2(100, k.height() - 100);
                joyStick.pos = k.vec2(100, k.height() - 100);
            }
        });

    });

    k.go("main");

    window.addEventListener('resize', () => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });

    return k;
}
