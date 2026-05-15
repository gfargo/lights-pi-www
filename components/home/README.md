# Home Page Components

## LightBeams

Hand-coded SVG light rig used as the hero backdrop on the homepage.
Three downstage fixtures hang from a hairline truss and project conic
beams with realistic falloff and halo glow. Additive blending via
`mix-blend-mode: screen` brightens overlapping beams — the same way a
real stage wash does.

### Bundle

About 9KB of inline SVG. Replaces the previous three.js implementation
(~145KB gzipped) on the homepage. The three.js rig moved to `/demo`
(see `components/demo/DemoLightingRig.tsx`), where it earns its weight
by being genuinely interactive.

### Motion

All animation is CSS-only and pauses under `prefers-reduced-motion`:
- House-lights-up reveal staggered across the three fixtures (0.3s / 0.6s / 0.9s)
- 13–19s sway per beam group
- 4/5/6s filament breathing per fixture

### Usage

```tsx
import { LightBeams } from "./LightBeams";

<section className="relative">
  <LightBeams />
  {/* hero content */}
</section>
```
