import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cloud } from '@react-three/drei';
import { Group } from 'three';

export function CloudRing() {
  const groupRef = useRef<Group>();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0003;
    }
  });

  const createCloud = (angle: number, radius: number = 25) => {
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const randomHeight = 1 + Math.random() * 5;
    const randomSpeed = 0.02 + Math.random() * 0.05;
    const randomWidth = 12 + Math.random() * 8;
    const randomDepth = 2 + Math.random() * 2;
    const randomOpacity = 0.08 + Math.random() * 0.06;

    return (
      <Cloud
        key={angle}
        opacity={randomOpacity}
        speed={randomSpeed}
        width={randomWidth}
        depth={randomDepth}
        segments={20}
        position={[x, randomHeight, z]}
      />
    );
  };

  const createCloudRing = (baseRadius: number, count: number) => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i * Math.PI * 2) / count;
      const radiusVariation = Math.random() * 5;
      return createCloud(angle, baseRadius + radiusVariation);
    });
  };

  return (
    <group ref={groupRef}>
      {createCloudRing(35, 16)} {/* Outer ring */}
      {createCloudRing(28, 12)} {/* Middle ring */}
      {createCloudRing(22, 10)} {/* Inner ring */}
      {createCloudRing(42, 20)} {/* Distant atmospheric clouds */}
    </group>
  );
}