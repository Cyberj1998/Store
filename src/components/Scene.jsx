import React, { useState, useEffect, useRef, Suspense } from 'react' 
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
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
import LoadingImage from '../assets/images/LoadingImage.png'
import { Float, useProgress } from '@react-three/drei'
import CardScene from './CardScene'

const Scene = () => {

  //----------------array de subtitulos

  const promoSubtitles = ['los envios se entregan en menos de 24 horas', 'metodo de pago sencillo y rapido por zelle', 'atencion al cliente para su tranquilidad' ]

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 

        prevIndex === promoSubtitles.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);


    return () => clearInterval(interval);
  }, [promoSubtitles.length]);

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

  //--------------------------Animation code for the cards

  const containerRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(containerRef.current.children);
    if (!cards.length) return;

    const tl = gsap.timeline({ repeat: -1 });

    cards.forEach((card, i) => {
      tl.to(card, {
        x: -100,
        duration: 1,
        ease: 'power2.out',
      })

      .to({}, { duration: 0.5 })  // pause while shifted left

      .to(card, {
        x: 0,
        duration: 1,
        ease: 'power2.in',
      });

      if (i < cards.length - 1) {
        tl.to({}, { duration: 0.6 });
      }
    });

    tl.to({}, { duration: 1 });

    return () => tl.kill();
  }, []);

  //------------------------------3d model loading logic

  const { progress, active } = useProgress();
  const [showCanvas, setShowCanvas] = useState(false);
  useEffect(() => {
    if (!active) {
      // Small delay to prevent flicker
      const timer = setTimeout(() => setShowCanvas(true), 100);
      return () => clearTimeout(timer);
    }
  }, [active]);


  return (
    <div className='h-120 w-full overflow-visible flex flex-row justify-center items-center'>

      <div className='h-full w-[50%] max-md:w-full relative flex justify-center items-center'>
        {!showCanvas ? (
          <div className='w-full h-full flex flex-col justify-center items-center relative'>
            <h3 className='uppercase font-bold text-[25px] max-md:text-[35px] absolute top-0 text-[#535353]'>Tu Tienda <span className='text-transparent bg-clip-text bg-linear-to-r from-[#246ae3] to-[#8af7e1]'>Online</span></h3>
            <img 
              src={LoadingImage}
              alt="Loading 3D model" 
              className="object-contain w-full h-full"
            />
            <p className='absolute bottom-0 text-[25px] font-bold text-[#535353] p-2 text-center'>{promoSubtitles[currentIndex]}</p>
          </div>
        ) : (
          <Canvas className='w-[50%] max-md:w-full'>
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

            <Suspense fallback={null}>
              {activeModel === 'model1' ? (
                <Model1 position={ModelPosition} scale={ModelScale} rotation={Modelrotation} />
              ) : (
                <Model2 position={ModelPosition} scale={ModelScale} rotation={Modelrotation} />
              )}
            </Suspense>
          </Canvas>
        )}
      </div>

      <div ref={containerRef} className='hidden md:flex h-full w-full sm:w-[50%] flex-col justify-center items-center p-4 gap-4'>
        {/* Card Component Pattern */}
        {cards.map((card) => (
          <CardScene key={card.id} card={card} />
        ))}

      </div>
    </div>
  )
}



export default Scene