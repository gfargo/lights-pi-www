# Home Page Components

## InteractiveLightingRig

An interactive 3D lighting truss visualization built with React Three Fiber that responds to mouse movement.

### Features

- Professional lighting truss structure with cross bracing and mounting hardware
- Three colored light fixtures (orange, blue, purple) matching the brand colors
- Mouse-tracking light beams that smoothly follow cursor movement
- Subtle intensity pulsing for dynamic effect
- Optimized performance with smooth animations

### Technical Details

- Built with `@react-three/fiber` and `three.js`
- Uses `useFrame` hook for smooth 60fps animations
- Light beam rotation smoothly interpolates towards mouse position
- Point lights with realistic decay and distance falloff
- Additive blending for authentic light beam appearance

### Usage

```tsx
import { InteractiveLightingRig } from './InteractiveLightingRig';

<section className="relative">
  <InteractiveLightingRig />
  {/* Your content here */}
</section>
```

The component is positioned absolutely and should be used within a relative container. Adjust opacity via the className prop if needed.
