import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Grid } from '@react-three/drei';
import { Units } from './Units';
import { PostProcessing } from './effects/PostProcessing';
import { Suspense, useEffect, useState } from 'react';
import { CloudRing } from './effects/CloudRing';

function ResponsiveCamera() {
  const [cameraPosition, setCameraPosition] = useState([0, 20, 25]);
  const [fov, setFov] = useState(45);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // Small phones
        setCameraPosition([0, 30, 35]);
        setFov(65);
      } else if (window.innerWidth < 768) { // Larger phones and small tablets
        setCameraPosition([0, 28, 32]);
        setFov(60);
      } else {
        setCameraPosition([0, 20, 25]);
        setFov(45);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <PerspectiveCamera makeDefault position={cameraPosition} fov={fov} />;
}

export function Scene() {
  return (
    <Canvas
      style={{ background: '#050505' }}
      gl={{ antialias: true }}
      dpr={[1, 2]}
      shadows
    >
      <Suspense fallback={null}>
        <ResponsiveCamera />
        <ambientLight intensity={0.15} />
        <spotLight
          position={[10, 20, 10]}
          angle={0.15}
          penumbra={1}
          intensity={0.8}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <Units />
        <PostProcessing />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 3}
          autoRotate
          autoRotateSpeed={0.3}
          enableDamping
          dampingFactor={0.05}
        />
        
        <CloudRing />

        <Grid
          position={[0, -0.01, 0]}
          args={[50, 50]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#111111"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#222222"
          fadeDistance={50}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid={true}
        />

        <Environment preset="night" />
        <fog attach="fog" args={['#000000', 30, 60]} />
      </Suspense>
    </Canvas>
  );
}