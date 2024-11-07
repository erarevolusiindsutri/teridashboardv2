import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Torus } from '@react-three/drei';
import { Group } from 'three';

export function StockUnit({ color, isSelected }: { color: string; isSelected: boolean }) {
  const groupRef = useRef<Group>();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.rotation.y = Math.sin(t + i) * 0.3;
        if (child.type === 'Mesh') {
          child.position.y = Math.sin(t * 2 + i) * 0.1;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      <Cylinder args={[0.8, 1, 2, 6]} position={[0, 1, 0]}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          emissive={color}
          emissiveIntensity={isSelected ? 2 : 0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Cylinder>
      <Torus args={[1.2, 0.1, 16, 32]} position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.5}
          emissive={color}
          emissiveIntensity={isSelected ? 1.5 : 0.3}
        />
      </Torus>
    </group>
  );
}