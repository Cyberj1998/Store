import React, { useState, useEffect } from 'react' // Added hooks
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Geometry3 = () => {
  // 1. Track window width in state to trigger re-renders on resize
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 2. Listen for window resize events
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 3. Calculate position based on the current state
  const adjustScreenForGeometry = () => {
    if (windowWidth < 768) {
      return [1, -1.7, -1];
    }
    return [1.5, -2.5, -1.5];
  };

  const ModelPosition = adjustScreenForGeometry();

  // 4. Use the state variable for width/height calculations
  const width = windowWidth <= 768 ? 4 : 5;
  const height = windowWidth <= 768 ? 4 : 5;

  const texture = useLoader(TextureLoader, '/3dIcons/3dRender-Icon-2.png');

  return (
    <group>
      <mesh rotation={[0, 0, 0]} scale={0.5} position={ModelPosition}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </group>
  );
};

export default Geometry3;