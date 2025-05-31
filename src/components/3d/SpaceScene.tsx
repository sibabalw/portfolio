import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls, useTexture, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

function Planet({ position = [0, 0, 0], color = '#5686F5', size = 1, rotationSpeed = 0.005 }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });
  
  return (
    <mesh ref={meshRef} position={position as [number, number, number]}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.7} 
        metalness={0.3}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

function FloatingRing({ position = [0, 0, 0], color = '#8A2BE2', radius = 3, rotationSpeed = 0.003 }) {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z += rotationSpeed;
      ringRef.current.rotation.x += rotationSpeed * 0.5;
    }
  });
  
  return (
    <mesh ref={ringRef} position={position as [number, number, number]}>
      <torusGeometry args={[radius, 0.2, 16, 100]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.3} 
        metalness={0.7}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function FloatingParticles({ count = 50, spread = 10 }) {
  const particlesRef = useRef<THREE.Points>(null);
  
  // Create particles
  const particles = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    particles[i3] = (Math.random() - 0.5) * spread;
    particles[i3 + 1] = (Math.random() - 0.5) * spread;
    particles[i3 + 2] = (Math.random() - 0.5) * spread;
  }
  
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      particlesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.1;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
          count={particles.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.1} 
        color="#ffffff" 
        sizeAttenuation 
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  );
}

function AnimatedScene({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const cameraPositionZ = useTransform(scrollYProgress, [0, 0.5], [10, 15]);
  const sceneRotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 0.25]);
  
  const sceneRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = sceneRotationY.get();
    }
  });
  
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, cameraPositionZ.get()]} fov={60} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4260f5" />
      
      <group ref={sceneRef}>
        <Stars 
          radius={50} 
          depth={50} 
          count={1000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1}
        />
        
        <Planet position={[0, 0, 0]} color="#5686F5" size={1.5} />
        <Planet position={[3, 1, -2]} color="#8A2BE2" size={0.8} rotationSpeed={0.008} />
        <Planet position={[-4, -1, -3]} color="#4ADEDE" size={0.6} rotationSpeed={0.01} />
        
        <FloatingRing position={[0, 0, 0]} color="#5686F5" radius={2.5} />
        <FloatingRing position={[0, 0, 0]} color="#8A2BE2" radius={3.5} rotationSpeed={0.002} />
        
        <FloatingParticles count={100} spread={15} />
      </group>
      
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function SpaceScene() {
  const { scrollYProgress } = useScroll();
  
  return (
    <div className="absolute inset-0 z-0 opacity-80">
      <Canvas dpr={[1, 2]} style={{ background: 'transparent' }}>
        <AnimatedScene scrollYProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
} 