/**
 * LightBeams — hand-coded SVG hero backdrop.
 *
 * Replaces the three.js InteractiveLightingRig on the homepage (it lives on
 * at /demo, where it earns its bundle weight). Three downstage fixtures hang
 * from a hairline truss, each casting a conic beam with realistic falloff
 * and a halo glow. Beams overlap via additive blending (mix-blend-mode:
 * screen on the container), so the wash brightens where they intersect —
 * exactly like a real stage.
 *
 * Bundle: ~9KB inline SVG vs the ~145KB gzipped three.js implementation.
 *
 * No JS animation loop — all motion is CSS-only and pauses when the user
 * has prefers-reduced-motion set.
 */
export function LightBeams() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ mixBlendMode: "screen" }}
    >
      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMin slice"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          {/* Beam falloff: full color at fixture, fades through atmosphere to nothing */}
          <linearGradient id="beam-amber" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FF6A1F" stopOpacity="0.55" />
            <stop offset="40%" stopColor="#FF6A1F" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#FF6A1F" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beam-cyan" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#7EE7FF" stopOpacity="0.42" />
            <stop offset="40%" stopColor="#7EE7FF" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#7EE7FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beam-magenta" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#C84BC8" stopOpacity="0.40" />
            <stop offset="40%" stopColor="#C84BC8" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#C84BC8" stopOpacity="0" />
          </linearGradient>

          {/* Halo glow at the fixture — radial */}
          <radialGradient id="halo-amber" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF6A1F" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FF6A1F" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="halo-cyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7EE7FF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7EE7FF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="halo-magenta" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C84BC8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#C84BC8" stopOpacity="0" />
          </radialGradient>

          {/* Soften beam edges */}
          <filter id="beam-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="halo-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        {/* Truss — hairline horizontal bar suggestion */}
        <line
          x1="120"
          y1="120"
          x2="1480"
          y2="120"
          stroke="#2A2A2A"
          strokeWidth="1.5"
        />
        {/* Truss support drops */}
        <line x1="180" y1="0" x2="180" y2="120" stroke="#1F1F1F" strokeWidth="1" />
        <line x1="1420" y1="0" x2="1420" y2="120" stroke="#1F1F1F" strokeWidth="1" />

        {/* ──────────────────────────────────────── Fixture 1 — amber ──── */}
        <g className="beam-fixture beam-fixture-1">
          {/* Halo */}
          <circle
            cx="380"
            cy="120"
            r="80"
            fill="url(#halo-amber)"
            filter="url(#halo-blur)"
            className="beam-halo"
          />
          {/* Beam cone — narrow trapezoid widening downward */}
          <path
            d="M 360 120 L 400 120 L 720 1000 L 40 1000 Z"
            fill="url(#beam-amber)"
            filter="url(#beam-blur)"
            className="beam-cone"
          />
          {/* Fixture body marker — tiny rectangle representing the par */}
          <rect
            x="368"
            y="108"
            width="24"
            height="20"
            rx="2"
            fill="#0A0A0A"
            stroke="#FF6A1F"
            strokeWidth="0.5"
          />
          {/* Filament dot */}
          <circle cx="380" cy="124" r="2.5" fill="#FF6A1F" className="beam-filament" />
        </g>

        {/* ──────────────────────────────────────── Fixture 2 — cyan ──── */}
        <g className="beam-fixture beam-fixture-2">
          <circle
            cx="800"
            cy="120"
            r="70"
            fill="url(#halo-cyan)"
            filter="url(#halo-blur)"
            className="beam-halo"
          />
          <path
            d="M 780 120 L 820 120 L 1080 1000 L 520 1000 Z"
            fill="url(#beam-cyan)"
            filter="url(#beam-blur)"
            className="beam-cone"
          />
          <rect
            x="788"
            y="108"
            width="24"
            height="20"
            rx="2"
            fill="#0A0A0A"
            stroke="#7EE7FF"
            strokeWidth="0.5"
          />
          <circle cx="800" cy="124" r="2.5" fill="#7EE7FF" className="beam-filament-cyan" />
        </g>

        {/* ──────────────────────────────────────── Fixture 3 — magenta ──── */}
        <g className="beam-fixture beam-fixture-3">
          <circle
            cx="1220"
            cy="120"
            r="75"
            fill="url(#halo-magenta)"
            filter="url(#halo-blur)"
            className="beam-halo"
          />
          <path
            d="M 1200 120 L 1240 120 L 1560 1000 L 880 1000 Z"
            fill="url(#beam-magenta)"
            filter="url(#beam-blur)"
            className="beam-cone"
          />
          <rect
            x="1208"
            y="108"
            width="24"
            height="20"
            rx="2"
            fill="#0A0A0A"
            stroke="#C84BC8"
            strokeWidth="0.5"
          />
          <circle cx="1220" cy="124" r="2.5" fill="#C84BC8" className="beam-filament-magenta" />
        </g>
      </svg>

      {/* Component-scoped styles — keyframes for sway + filament breathing.
          All motion respects prefers-reduced-motion via globals.css. */}
      <style>{`
        @keyframes beam-sway-1 {
          0%, 100% { transform: rotate(-0.6deg); }
          50%      { transform: rotate(0.6deg); }
        }
        @keyframes beam-sway-2 {
          0%, 100% { transform: rotate(0.4deg); }
          50%      { transform: rotate(-0.4deg); }
        }
        @keyframes beam-sway-3 {
          0%, 100% { transform: rotate(-0.5deg); }
          50%      { transform: rotate(0.5deg); }
        }
        @keyframes filament-pulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.7; }
        }
        @keyframes beam-rise {
          /* House lights up: beams reveal in sequence from black */
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .beam-fixture {
          transform-origin: center 120px;
          animation: beam-rise 1.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .beam-fixture-1 { animation-delay: 0.3s, 0s; }
        .beam-fixture-2 { animation-delay: 0.6s, 0s; }
        .beam-fixture-3 { animation-delay: 0.9s, 0s; }

        .beam-fixture-1 > path,
        .beam-fixture-1 > circle:first-child {
          transform-origin: 380px 120px;
          animation: beam-sway-1 13s ease-in-out infinite;
        }
        .beam-fixture-2 > path,
        .beam-fixture-2 > circle:first-child {
          transform-origin: 800px 120px;
          animation: beam-sway-2 17s ease-in-out infinite;
        }
        .beam-fixture-3 > path,
        .beam-fixture-3 > circle:first-child {
          transform-origin: 1220px 120px;
          animation: beam-sway-3 19s ease-in-out infinite;
        }

        .beam-filament,
        .beam-filament-cyan,
        .beam-filament-magenta {
          animation: filament-pulse 4s ease-in-out infinite;
        }
        .beam-filament-cyan { animation-duration: 5s; }
        .beam-filament-magenta { animation-duration: 6s; }
      `}</style>
    </div>
  );
}
