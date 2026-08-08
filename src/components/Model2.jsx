import React, { useRef, useEffect, useMemo } from 'react'
import { useGLTF, useFBX, useAnimations } from '@react-three/drei'
import idleAnimationFBX from '../assets/animations/idle.fbx'

const Model2 = ({ animationName = 'idle', ...props }) => {
  const group = useRef()

  // 1. Load the Model
  const { scene, nodes, materials } = useGLTF('/models/Girl.glb')

  // 2. Load the FBX
  const { animations: fbxAnimations } = useFBX(idleAnimationFBX)

  // 3. Process animations safely
  const processedAnimations = useMemo(() => {
    const anims = [...fbxAnimations]
    if (anims[0]) {
      anims[0].name = animationName
    }
    return anims
  }, [fbxAnimations, animationName])

  // 4. Connect animations to the group ref
  const { actions } = useAnimations(processedAnimations, group)

  useEffect(() => {
    const action = actions[animationName]
    if (action) {
      action.reset().fadeIn(0.5).play()
    }
    return () => {
      action?.fadeOut(0.5)
    }
  }, [animationName, actions])

  return (
    <primitive 
      object={scene} 
      ref={group} 
      {...props} 
    />
  )
}

useGLTF.preload('/models/Girl.glb')
export default Model2