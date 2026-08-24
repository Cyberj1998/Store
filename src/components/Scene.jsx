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

  //-------------------------adjust size and position for screen sizes

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


  //-------------------array for the cards
  const cards = [
    {
      id: 0,
      icon: Icon1,
      title: 'rapidez',
      subtitle: 'los envios se entregan en menos de 24 horas',
    },
    {
      id: 1,
      icon: Icon2,
      title: 'pago',
      subtitle: 'metodo de pago sencillo y rapido por zelle',
    },
    {
      id: 2,
      icon: Icon3,
      title: 'seguridad',
      subtitle: 'atencion al cliente para su tranquilidad',
    }
  ]


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
        {cards.map((card) => (
          <div 
            key={card.id}
            className='border border-indigo-500 bg-linear-to-r from-[#246ae3] to-[#8af7e1] w-full max-w-md min-h-25 rounded-3xl flex flex-row items-center p-4 shadow-lg transition-transform hover:scale-[1.02]'
          >
            {/* Icon Container */}
            <div className='shrink-0 mr-4 bg-[#c4def9] rounded-full'>
              <img 
                src={card.icon} 
                alt="icon"
                className='h-16 w-16 sm:h-20 sm:w-20 object-contain' 
              />
            </div>

            {/* Text Container */}
            <div className='flex flex-col justify-center items-start overflow-hidden'>
              <h3 className='text-lg sm:text-[20px] font-bold uppercase text-gray-700 leading-tight'>
                {card.title}
              </h3>
              <p className='text-sm sm:text-base text-gray-800 line-clamp-2'>
                {card.subtitle}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}



export default Scene