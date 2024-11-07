import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

export function SalesUnit({ color, isSelected }: { color: string; isSelected: boolean }) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      
      // Scale effect when selected
      const targetScale = isSelected ? 1.2 : 1;
      groupRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main building structure */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={isSelected ? 0.4 : 0.2}
        />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[0.7, 1.1, 0.4, 4]} rotation={[0, Math.PI / 4, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Windows */}
      {[-0.3, 0.3].map((x) =>
        [-0.3, 0.3].map((y) => (
          <mesh key={`${x}-${y}`} position={[0.51, y + 1, x]}>
            <boxGeometry args={[0.05, 0.2, 0.2]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={isSelected ? 1 : 0.2}
            />
          </mesh>
        ))
      )}

      {/* Base glow effect */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.1, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.2}
          emissive={color}
          emissiveIntensity={isSelected ? 2 : 0.5}
        />
      </mesh>

      {/* Data flow particles */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2}
        />
      </mesh>
    </group>
  );
}