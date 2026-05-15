"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * DemoLightingRig — interactive 3D fixture rig for the /demo playground.
 *
 * Props-driven (no scroll listeners, no internal state). Each fixture's
 * color and intensity is controlled by the parent. Clicking a fixture
 * fires onSelectFixture(index) so the parent can highlight it.
 *
 * This is where three.js earns its bundle weight — on the demo page,
 * not the homepage.
 */

interface Fixture {
  id: number;
  color: string; // hex
  intensity: number; // 0-1
}

interface Props {
  fixtures: Fixture[];
  selectedIndex: number;
  onSelectFixture: (i: number) => void;
}

function FixtureBeam({
  position,
  color,
  intensity,
  index,
  selected,
  onSelect,
}: {
  position: [number, number, number];
  color: string;
  intensity: number;
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const lightRef = useRef<THREE.PointLight>(null);

  // Gentle, idle filament breathing — not scroll-driven
  useFrame((state) => {
    if (!lightRef.current) return;
    const breathe = Math.sin(state.clock.elapsedTime * 0.6 + index) * 0.1 + 0.9;
    lightRef.current.intensity = breathe * intensity * 4;
  });

  return (
    <group position={position}>
      {/* Selection ring — only visible when this fixture is selected */}
      {selected && (
        <mesh position={[0, 0.05, 0]}>
          <torusGeometry args={[0.42, 0.02, 8, 32]} />
          <meshBasicMaterial color="#FF6A1F" />
        </mesh>
      )}

      {/* Fixture housing — click target */}
      <mesh
        position={[0, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        <cylinderGeometry args={[0.28, 0.32, 0.42, 18]} />
        <meshStandardMaterial color="#1A1A1A" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Mounting yoke */}
      <mesh position={[0, 0.27, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.22, 0.025, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.75} roughness={0.3} />
      </mesh>

      {/* Glowing lens */}
      <mesh position={[0, -0.24, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.04, 18]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={intensity * 1.2}
          metalness={0.3}
          roughness={0.1}
        />
      </mesh>

      <pointLight
        ref={lightRef}
        color={color}
        intensity={intensity * 4}
        distance={28}
        decay={1.4}
        position={[0, -0.3, 0]}
      />

      {/* Wide beam cone */}
      <mesh position={[0, -9.3, 0]} renderOrder={1}>
        <cylinderGeometry args={[0.45, 6.5, 18, 32, 1, true]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.22 * intensity}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner brighter cone */}
      <mesh position={[0, -9.3, 0]} renderOrder={2}>
        <cylinderGeometry args={[0.28, 3.2, 18, 32, 1, true]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15 * intensity}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Truss() {
  return (
    <group position={[0, 8, 0]}>
      {/* Main horizontal bar */}
      <mesh>
        <boxGeometry args={[13, 0.22, 0.22]} />
        <meshStandardMaterial color="#3D3D3D" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0, 0.3]}>
        <boxGeometry args={[13, 0.22, 0.22]} />
        <meshStandardMaterial color="#3D3D3D" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Cross-braces */}
      {[-5, -2.5, 0, 2.5, 5].map((x, i) => (
        <mesh
          key={x}
          position={[x, 0, 0.15]}
          rotation={[0, (i % 2 === 0 ? 1 : -1) * Math.PI / 4, 0]}
        >
          <boxGeometry args={[0.42, 0.07, 0.07]} />
          <meshStandardMaterial color="#5C5C5C" metalness={0.6} roughness={0.3} />
        </mesh>
      ))}

      {/* End caps */}
      <mesh position={[-6.5, 0, 0.15]}>
        <boxGeometry args={[0.3, 0.32, 0.32]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[6.5, 0, 0.15]}>
        <boxGeometry args={[0.3, 0.32, 0.32]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Drop cables */}
      <mesh position={[-6.5, 1.6, 0.15]}>
        <cylinderGeometry args={[0.025, 0.025, 3.2, 8]} />
        <meshStandardMaterial color="#1F1F1F" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[6.5, 1.6, 0.15]}>
        <cylinderGeometry args={[0.025, 0.025, 3.2, 8]} />
        <meshStandardMaterial color="#1F1F1F" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function Scene({
  fixtures,
  selectedIndex,
  onSelectFixture,
}: Props) {
  // Spread fixtures evenly across the truss
  const trussLength = 10;
  const step = fixtures.length > 1 ? trussLength / (fixtures.length - 1) : 0;
  const startX = -trussLength / 2;

  return (
    <>
      <ambientLight intensity={0.08} />
      <directionalLight position={[5, 5, 5]} intensity={0.25} />
      <Truss />
      {fixtures.map((f, i) => (
        <FixtureBeam
          key={f.id}
          position={[startX + i * step, 7.6, 0.15]}
          color={f.color}
          intensity={f.intensity}
          index={i}
          selected={selectedIndex === i}
          onSelect={() => onSelectFixture(i)}
        />
      ))}
    </>
  );
}

export function DemoLightingRig(props: Props) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 16], fov: 55 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene {...props} />
      </Canvas>
    </div>
  );
}
