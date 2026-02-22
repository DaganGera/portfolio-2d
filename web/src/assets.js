export const SPRITES = {
  // Rich detailed grass tile
  grass: `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128">
    <rect width="128" height="128" fill="#2e521f"/>
    <!-- Varied grass blades -->
    <path d="M 20 40 Q 30 10 40 40" stroke="#3a6927" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M 80 100 Q 90 70 100 100" stroke="#3a6927" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M 90 30 Q 100 10 110 30" stroke="#223f16" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M 10 110 Q 20 90 30 110" stroke="#437a2d" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="40" cy="90" r="2.5" fill="#6b8e23" opacity="0.6"/>
    <circle cx="100" cy="50" r="2" fill="#556b2f" opacity="0.8"/>
    <circle cx="60" cy="20" r="1.5" fill="#7ca52b" opacity="0.5"/>
    <circle cx="20" cy="70" r="3" fill="#556b2f" opacity="0.4"/>
  </svg>`,

  // Natural dirt/stone path
  path: `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128">
    <rect width="128" height="128" fill="#5a4d41"/>
    <rect x="5" y="5" width="40" height="30" fill="#726456" rx="8"/>
    <rect x="55" y="10" width="50" height="40" fill="#857666" rx="10"/>
    <rect x="10" y="50" width="60" height="30" fill="#685a4d" rx="9"/>
    <rect x="80" y="65" width="35" height="25" fill="#948575" rx="6"/>
    <rect x="15" y="90" width="40" height="25" fill="#726456" rx="7"/>
    <rect x="65" y="100" width="50" height="20" fill="#685a4d" rx="8"/>
    <circle cx="30" cy="20" r="3" fill="#4d4135" opacity="0.5"/>
    <circle cx="80" cy="30" r="4" fill="#4d4135" opacity="0.4"/>
    <circle cx="40" cy="65" r="2" fill="#4d4135" opacity="0.6"/>
  </svg>`,

  // Water/River tile
  water: `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128">
    <rect width="128" height="128" fill="#1e3a8a"/>
    <path d="M 10 30 Q 30 10 50 30 T 90 30 T 130 30" stroke="#3b82f6" stroke-width="2" fill="none" opacity="0.5" stroke-linecap="round"/>
    <path d="M -10 80 Q 10 60 30 80 T 70 80 T 110 80" stroke="#60a5fa" stroke-width="2.5" fill="none" opacity="0.6" stroke-linecap="round"/>
    <circle cx="40" cy="100" r="4" fill="#93c5fd" opacity="0.4"/>
    <circle cx="20" cy="50" r="2" fill="#bfdbfe" opacity="0.3"/>
    <circle cx="90" cy="110" r="3" fill="#60a5fa" opacity="0.5"/>
  </svg>`,

  // High-Res Tree with shading
  tree: `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="176">
    <defs>
      <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(0,0,0,0.6)"/>
        <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
      </radialGradient>
      <linearGradient id="trunk" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#3e2723"/>
        <stop offset="50%" stop-color="#5d4037"/>
        <stop offset="100%" stop-color="#2b1a17"/>
      </linearGradient>
    </defs>
    <ellipse cx="64" cy="160" rx="36" ry="16" fill="url(#shadow)"/>
    <!-- Trunk -->
    <rect x="52" y="100" width="24" height="68" fill="url(#trunk)"/>
    <!-- Leaves -->
    <path d="M 64 20 L 120 120 L 8 120 Z" fill="#1b5e20"/>
    <path d="M 64 0 L 108 90 L 20 90 Z" fill="#2e7d32"/>
    <path d="M 64 -20 L 92 60 L 36 60 Z" fill="#388e3c"/>
    <path d="M 64 20 L 64 120 L 8 120 Z" fill="#144517" opacity="0.4"/>
    <path d="M 64 0 L 64 90 L 20 90 Z" fill="#225c25" opacity="0.4"/>
    <path d="M 64 -20 L 64 60 L 36 60 Z" fill="#2b6e2f" opacity="0.4"/>
  </svg>`,

  // High-res Detailed Player
  player: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="80" viewBox="0 0 64 80">
    <ellipse cx="32" cy="76" rx="24" ry="8" fill="rgba(0,0,0,0.5)"/>
    <!-- Armor Body -->
    <rect x="16" y="32" width="32" height="28" fill="#94a3b8" rx="6"/>
    <rect x="24" y="32" width="16" height="28" fill="#cbd5e1"/>
    <path d="M 16 46 L 48 46 L 48 50 L 16 50 Z" fill="#64748b"/>
    <!-- Belt -->
    <rect x="16" y="52" width="32" height="6" fill="#5c4033"/>
    <rect x="28" y="50" width="8" height="10" fill="#fbbf24" rx="2"/>
    <rect x="30" y="52" width="4" height="6" fill="#1c1917" rx="1"/>
    <!-- Cape -->
    <path d="M 16 32 L 6 72 L 24 60 Z" fill="#991b1b"/>
    <path d="M 48 32 L 58 72 L 40 60 Z" fill="#991b1b"/>
    <path d="M 16 32 L 48 32 L 58 72 L 6 72 Z" fill="#7f1d1d" opacity="0.5"/>
    <!-- Helmet -->
    <circle cx="32" cy="22" r="18" fill="#64748b"/>
    <path d="M 16 22 A 16 16 0 0 1 48 22 Z" fill="#94a3b8"/>
    <!-- Visor -->
    <rect x="20" y="16" width="24" height="8" fill="#0f172a" rx="2"/>
    <rect x="20" y="26" width="24" height="2" fill="#334155"/>
    <!-- Weapon / Sword on back -->
    <rect x="12" y="10" width="4" height="40" fill="#d4d4d8" transform="rotate(-30 14 30)"/>
    <rect x="8" y="24" width="12" height="4" fill="#b45309" transform="rotate(-30 14 30)"/>
    <!-- Plume -->
    <path d="M 32 4 Q 44 -8 52 8 Q 44 16 32 4" fill="#dc2626"/>
  </svg>`,

  // Massive Castle (About)
  office: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 280" width="256" height="280">
    <ellipse cx="128" cy="260" rx="110" ry="30" fill="rgba(0,0,0,0.4)"/>
    <!-- Main Structure -->
    <rect x="48" y="80" width="160" height="176" fill="#64748b"/>
    <rect x="48" y="80" width="80" height="176" fill="#94a3b8"/>
    <!-- Battlements -->
    <path d="M 40 60 L 216 60 L 216 90 L 40 90 Z" fill="#475569"/>
    <rect x="40" y="40" width="24" height="20" fill="#64748b"/>
    <rect x="88" y="40" width="24" height="20" fill="#64748b"/>
    <rect x="144" y="40" width="24" height="20" fill="#64748b"/>
    <rect x="192" y="40" width="24" height="20" fill="#64748b"/>
    <!-- Base Extensions -->
    <rect x="16" y="236" width="224" height="20" fill="#334155"/>
    <!-- Grand Doors -->
    <path d="M 100 256 L 100 180 A 28 28 0 0 1 156 180 L 156 256 Z" fill="#3e2723"/>
    <rect x="126" y="180" width="4" height="76" fill="#1c1917"/>
    <rect x="92" y="176" width="72" height="80" fill="none" stroke="#1c1917" stroke-width="8"/>
    <!-- Banners -->
    <polygon points="68,90 84,90 76,140" fill="#b91c1c"/>
    <polygon points="172,90 188,90 180,140" fill="#b91c1c"/>
    <circle cx="76" cy="110" r="4" fill="#fcd34d"/>
    <circle cx="180" cy="110" r="4" fill="#fcd34d"/>
    <!-- Windows -->
    <rect x="72" y="160" width="16" height="32" fill="#fcd34d" rx="8"/>
    <rect x="168" y="160" width="16" height="32" fill="#fcd34d" rx="8"/>
    <rect x="112" y="40" width="32" height="12" fill="#3b82f6" rx="4"/>
  </svg>`,

  // Detailed Blacksmith Forge (Projects)
  lab: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
    <ellipse cx="128" cy="240" rx="110" ry="30" fill="rgba(0,0,0,0.4)"/>
    <rect x="32" y="120" width="192" height="120" fill="#78350f"/>
    <!-- Roof -->
    <polygon points="16,120 128,40 240,120" fill="#451a03"/>
    <polygon points="24,120 128,52 232,120" fill="#572205"/>
    <!-- Big Chimney -->
    <rect x="172" y="20" width="32" height="80" fill="#475569"/>
    <!-- Smoke Particles -->
    <circle cx="188" cy="0" r="16" fill="#cbd5e1" opacity="0.6"/>
    <circle cx="176" cy="-20" r="20" fill="#94a3b8" opacity="0.4"/>
    <circle cx="204" cy="-12" r="14" fill="#cbd5e1" opacity="0.5"/>
    <circle cx="188" cy="-40" r="24" fill="#64748b" opacity="0.3"/>
    <!-- Massive Forge Fire -->
    <path d="M 72 240 L 72 180 A 24 24 0 0 1 120 180 L 120 240 Z" fill="#1c1917"/>
    <path d="M 80 240 L 80 200 A 16 16 0 0 1 112 200 L 112 240 Z" fill="#ef4444"/>
    <path d="M 88 240 L 88 210 A 8 8 0 0 1 104 210 L 104 240 Z" fill="#f59e0b"/>
    <!-- Details: Logs & Anvil -->
    <rect x="140" y="200" width="48" height="16" fill="#3e2723" rx="4"/>
    <rect x="144" y="208" width="48" height="16" fill="#2b1a17" rx="4"/>
    <rect x="152" y="196" width="32" height="8" fill="#334155"/>
    <rect x="160" y="204" width="16" height="20" fill="#1e293b"/>
  </svg>`,

  // Majestic Mage Tower (Skills)
  library: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 320" width="256" height="320">
    <ellipse cx="128" cy="300" rx="70" ry="20" fill="rgba(0,0,0,0.5)"/>
    <!-- Main Tower Structure -->
    <polygon points="80,300 96,120 160,120 176,300" fill="#334155"/>
    <polygon points="80,300 96,120 128,120 128,300" fill="#475569"/>
    <!-- Base Details -->
    <rect x="72" y="280" width="112" height="20" fill="#1e293b"/>
    <!-- Grand Tower Roof -->
    <polygon points="88,120 128,20 168,120" fill="#4c1d95"/>
    <polygon points="96,120 128,40 160,120" fill="#6d28d9"/>
    <!-- Magic Energy Ring -->
    <ellipse cx="128" cy="18" rx="24" ry="6" fill="none" stroke="#c4b5fd" stroke-width="4" transform="rotate(-15 128 18)" opacity="0.8"/>
    <!-- Giant Glowing Orb -->
    <circle cx="128" cy="12" r="16" fill="#a78bfa" opacity="0.9"/>
    <circle cx="128" cy="12" r="8" fill="#fff"/>
    <!-- Tower Door -->
    <path d="M 108 300 L 108 250 A 20 20 0 0 1 148 250 L 148 300 Z" fill="#0f172a"/>
    <circle cx="140" cy="275" r="4" fill="#64748b"/>
    <!-- Glowing Runes / Windows -->
    <circle cx="128" cy="180" r="10" fill="#a78bfa"/>
    <circle cx="128" cy="180" r="5" fill="#fff"/>
    <circle cx="128" cy="220" r="8" fill="#c4b5fd"/>
    <circle cx="128" cy="140" r="8" fill="#c4b5fd"/>
  </svg>`,

  // Grand Notice Board / Guild (Contact)
  postoffice: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256">
    <ellipse cx="128" cy="240" rx="90" ry="24" fill="rgba(0,0,0,0.4)"/>
    <!-- Huge Wooden Frame -->
    <rect x="60" y="60" width="16" height="180" fill="#451a03"/>
    <rect x="180" y="60" width="16" height="180" fill="#451a03"/>
    <rect x="52" y="52" width="152" height="24" fill="#572205" rx="4"/>
    <rect x="52" y="200" width="152" height="16" fill="#572205"/>
    <polygon points="52,52 128,20 204,52" fill="#78350f"/>
    <!-- Main Board Surface -->
    <rect x="76" y="76" width="104" height="124" fill="#d4a373"/>
    <!-- High Detail Quests -->
    <rect x="84" y="88" width="32" height="40" fill="#fffbeb" transform="rotate(-5 100 108)" rx="2"/>
    <circle cx="100" cy="92" r="3" fill="#dc2626"/>
    <rect x="132" y="100" width="36" height="28" fill="#fef3c7" transform="rotate(3 150 114)" rx="2"/>
    <circle cx="150" cy="104" r="3" fill="#2563eb"/>
    <rect x="92" y="140" width="56" height="36" fill="#fdf6e3" transform="rotate(-2 120 158)" rx="2"/>
    <circle cx="120" cy="144" r="3" fill="#16a34a"/>
    <path d="M 96 150 L 140 150 M 96 160 L 130 160" stroke="#9ca3af" stroke-width="2"/>
  </svg>`
};
