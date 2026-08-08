import React, { useState } from 'react' 
import { Canvas } from '@react-three/fiber'
import Model1 from './Model1'
import Model2 from './Model2'
import Icon1 from '../assets/images/Minimalistic-icon-1.png'
import Icon2 from '../assets/images/Minimalistic-icon-2.png'
import Icon3 from '../assets/images/Minimalistic-icon-3.png'
import Geometry1 from './PlaneMaterials/Geometry1'
import Geometry2 from './PlaneMaterials/Geometry2'
import Geometry3 from './PlaneMaterials/Geometry3'
import Geometry4 from './PlaneMaterials/Geometry4'
import Geometry5 from './PlaneMaterials/Geometry5'
import { Float } from '@react-three/drei'

const Scene = () => {

  const [activeModel] = useState(() => (Math.random() > 0.5 ? 'model1' : 'model2'))

  const adjustScreen = () => {
    let screenScale = null;
    let screenPosition = [0, -19, -26];
    let rotation = [0.3, 0.5, 0];

    if(window.innerWidth < 768){
      screenScale = [17, 17, 17]
    }
    else{
      screenScale = [19, 19, 19]
    }

    return [screenScale, screenPosition, rotation]
  }


  const [ModelScale, ModelPosition, Modelrotation] = adjustScreen()

  return (
    <div className='h-120 w-full overflow-visible flex flex-row justify-center items-center'>

      <div className='h-full w-[50%] max-md:w-full'>
        <Canvas className='w-[50%]'>
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <pointLight position={[-5, 2, -5]} intensity={1.5} color="blue" /> 
          <ambientLight intensity={2} />
          <Float speed={5} floatIntensity={.5} rotationIntensity={.5}>
            <Geometry1 />
            <Geometry2 />
            <Geometry3 />
            <Geometry4 />
            <Geometry5 />
          </Float>

          {activeModel === 'model1' ? (
            <Model1 
              position={ModelPosition}
              scale={ModelScale}  
              rotation={Modelrotation}
            />
          ) : (
            <Model2 
              position={ModelPosition}
              scale={ModelScale}  
              rotation={Modelrotation}
            />
          )}
        </Canvas>
      </div>

      <div className='hidden md:flex h-full w-full sm:w-[50%] flex-col justify-center items-center p-4 gap-4'>
        {/* Card Component Pattern */}
        {[Icon1, Icon2, Icon3].map((icon, index) => (
          <div 
            key={index}
            className='border border-indigo-500 bg-indigo-300 w-full max-w-md min-h-25 rounded-3xl flex flex-row items-center p-4 shadow-lg transition-transform hover:scale-[1.02]'
          >
            {/* Icon Container */}
            <div className='shrink-0 mr-4'>
              <img 
                src={icon} 
                alt="icon"
                className='h-16 w-16 sm:h-20 sm:w-20 object-contain' 
              />
            </div>

            {/* Text Container */}
            <div className='flex flex-col justify-center items-start overflow-hidden'>
              <h3 className='text-lg sm:text-[20px] font-bold uppercase text-gray-700 leading-tight'>
                Test <span className='text-transparent bg-clip-text bg-linear-to-r from-[#246ae3] to-[#8af7e1]'>title</span>
              </h3>
              <p className='text-sm sm:text-base text-gray-600 line-clamp-2'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Scene