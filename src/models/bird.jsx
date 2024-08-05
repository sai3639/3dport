import {useRef, useEffect} from "react";
import birdScene from '../assets/3d/bird.glb';
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Bird = () => {
  const { scene, animations } = useGLTF(birdScene);
  const birdRef = useRef();
  const {actions} = useAnimations(animations, birdRef);

  useEffect(() =>{
    actions['Take 001'].play();
  }, []);

  useFrame(({clock, camera}) => {
    //update y position to simulate flight moving like sine wave
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2

    //check if bird reaches certain endpoint relaive to camera
    if(birdRef.current.position.x > camera.position.x + 10){
        //change direction to backward 
        birdRef.current.rotation.y = Math.PI;
        //change direction to forward - reset birds rotation
    }else if(birdRef.current.position.x < camera.position.x -10){
        birdRef.current.rotation.y = 0;
    }
    

    //update x and z pos based on direction
    if(birdRef.current.rotation.y === 0){
        birdRef.current.position.x += 0.01;
        birdRef.current.position.z -= 0.01;
        //moving backwards
    }else{
        birdRef.current.position.x -= 0.01;
        birdRef.current.position.z += 0.01;
    }
  })


  return (
    <mesh position={[-5, 2, 1]} scale={[0.003, 0.003, 0.003]}ref={birdRef}>
        <primitive object={scene}/>
    </mesh>
  )
};

export default Bird;
