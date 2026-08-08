import React, { useState, useEffect } from 'react'
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Geometry2 = () => {

 const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 3. Set up an event listener to update the state on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    // Cleanup listener when component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 4. Derived values (these will now recalculate every time windowWidth changes)
  const adjustScreenForGeometry = () => {
    if (windowWidth < 768) {
      return [-1.7, -0.8, .8];
    }
    return [-2, -0.8, 1];
  };

  const ModelPosition = adjustScreenForGeometry();

  const screenWidth = window.innerWidth
  const width = screenWidth <= 768 ? 4 : 5 
  const height = screenWidth <= 768 ? 4 : 5

  const texture = useLoader(TextureLoader, '/3dIcons/3dRender-Icon-1.png');

  return (
    <group>
      <mesh rotation={[0, 0, 0]} scale={0.5} position={ModelPosition} >
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </group>
  )
}

export default Geometry2


