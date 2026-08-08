import React, { useState, useEffect } from 'react'
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Geometry1 = () => {

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
        return [1.5, 2, 0];
      }
      return [2, 2.5, 0];
    };
  
    const ModelPosition = adjustScreenForGeometry();

  //------------------adjust for screen width
  const screenWidth = window.innerWidth
  const width = screenWidth <= 768 ? 4 : 5 
  const height = screenWidth <= 768 ? 4 : 5

  const texture = useLoader(TextureLoader, '/3dIcons/3dRender-Icon-4.png');

  return (
    <group>
      <mesh rotation={[0, 0, 0]} scale={0.5} position={ModelPosition} >
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
    </group>
  )
}

export default Geometry1


