"use client";

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ScrollPosition {
  scrollY: number;
}

function LightBeam({ 
  position, 
  color, 
  scrollPosition,
  index
}: { 
  position: [number, number, number]; 
  color: string;
  scrollPosition: ScrollPosition;
  index: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (groupRef.current && lightRef.current) {
      // Calculate target rotation based on scroll position
      // Each light moves differently based on its index
      const scrollFactor = scrollPosition.scrollY * 0.001;
      const offset = (index - 1) * 0.3; // -0.3, 0, 0.3 for three lights
      
      // Reverse the direction - negative scroll factor
      const targetX = Math.sin(-scrollFactor + offset) * 0.3;
      const targetZ = Math.cos(-scrollFactor + offset) * 0.2;
      
      // Smooth rotation towards target
      const currentRotation = groupRef.current.rotation;
      currentRotation.x += (targetX - currentRotation.x) * 0.05;
      currentRotation.z += (targetZ - currentRotation.z) * 0.05;
      
      // Subtle intensity pulsing
      const pulse = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.15 + 0.85;
      lightRef.current.intensity = pulse * 3;
    }
  });

  return (
    <group position={position}>
      {/* Fixture housing - more detailed */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.4, 16]} />
        <meshStandardMaterial color="#1F2937" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Mounting yoke */}
      <mesh position={[0, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.2, 0.03, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Lens front */}
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.05, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.3}
          roughness={0.1}
        />
      </mesh>
      
      {/* Point light source */}
      <pointLight
        ref={lightRef}
        color={color}
        intensity={3}
        distance={25}
        decay={1.5}
        position={[0, -0.3, 0]}
      />
      
      {/* Light beam group - rotates from the fixture position (origin at top) */}
      <group ref={groupRef} position={[0, -0.3, 0]}>
        {/* Wide light beam cone - starts at fixture */}
        {/* Using cylinder with different top/bottom radius for truncated cone effect */}
        <mesh position={[0, -9, 0]}>
          <cylinderGeometry args={[0.5, 6, 18, 32, 1, true]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        
        {/* Inner brighter cone for more depth */}
        <mesh position={[0, -9, 0]}>
          <cylinderGeometry args={[0.3, 3, 18, 32, 1, true]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}

function TrussStructure() {
  return (
    <group position={[0, 8, 0]}>
      {/* Main horizontal truss bar - thicker and more substantial */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[12, 0.25, 0.25]} />
        <meshStandardMaterial color="#4B5563" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Secondary parallel bar for box truss effect */}
      <mesh position={[0, 0, 0.3]}>
        <boxGeometry args={[12, 0.25, 0.25]} />
        <meshStandardMaterial color="#4B5563" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Connecting cross members */}
      <mesh position={[-5, 0, 0.15]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.42, 0.08, 0.08]} />
        <meshStandardMaterial color="#6B7280" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[-2.5, 0, 0.15]} rotation={[0, -Math.PI / 4, 0]}>
        <boxGeometry args={[0.42, 0.08, 0.08]} />
        <meshStandardMaterial color="#6B7280" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.15]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.42, 0.08, 0.08]} />
        <meshStandardMaterial color="#6B7280" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[2.5, 0, 0.15]} rotation={[0, -Math.PI / 4, 0]}>
        <boxGeometry args={[0.42, 0.08, 0.08]} />
        <meshStandardMaterial color="#6B7280" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[5, 0, 0.15]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.42, 0.08, 0.08]} />
        <meshStandardMaterial color="#6B7280" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Vertical support cables/chains at ends */}
      <mesh position={[-6, 1.5, 0.15]}>
        <cylinderGeometry args={[0.03, 0.03, 3, 8]} />
        <meshStandardMaterial color="#374151" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[6, 1.5, 0.15]}>
        <cylinderGeometry args={[0.03, 0.03, 3, 8]} />
        <meshStandardMaterial color="#374151" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* End caps */}
      <mesh position={[-6, 0, 0.15]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[6, 0, 0.15]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Scene({ scrollPosition }: { scrollPosition: ScrollPosition }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} />
      
      <TrussStructure />
      
      {/* Three light fixtures spread across the truss - more spacing */}
      <LightBeam position={[-4.5, 7.6, 0.15]} color="#FF9800" scrollPosition={scrollPosition} index={0} />
      <LightBeam position={[0, 7.6, 0.15]} color="#2196F3" scrollPosition={scrollPosition} index={1} />
      <LightBeam position={[4.5, 7.6, 0.15]} color="#9C27B0" scrollPosition={scrollPosition} index={2} />
    </>
  );
}

export function InteractiveLightingRig() {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ scrollY: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({ scrollY: window.scrollY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 opacity-50">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene scrollPosition={scrollPosition} />
      </Canvas>
    </div>
  );
}
