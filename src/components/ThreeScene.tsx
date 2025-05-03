'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Sphere, 
  MeshDistortMaterial, 
  RoundedBox, 
  Text, 
  Float, 
  Environment,
  useTexture
} from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function AnimatedSphere({ isHovered, onHover, onLeave }: { 
  isHovered: boolean; 
  onHover: () => void; 
  onLeave: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialDistort = 0.3;
  const hoverDistort = 0.5;
  
  const [distortValue, setDistortValue] = useState(initialDistort);
  
  useEffect(() => {
    setDistortValue(isHovered ? hoverDistort : initialDistort);
  }, [isHovered]);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.05;
      meshRef.current.rotation.y = time * 0.08;
      
      // Smoother pulsating effect
      const scale = 1 + Math.sin(time * 1.5) * 0.04;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Sphere 
      args={[1, 128, 256]} 
      ref={meshRef}
      onPointerOver={onHover}
      onPointerOut={onLeave}
      position={[0, 0, 0]}
    >
      <MeshDistortMaterial 
        color="#2563eb" 
        attach="material" 
        distort={distortValue} 
        speed={1.5} 
        roughness={0.3}
        metalness={0.7}
        transparent
        opacity={0.9}
      />
    </Sphere>
  );
}

function FloatingCubes() {
  const group = useRef<THREE.Group>(null);
  // Create a consistent pattern of cubes in orbit
  const cubes = Array(7).fill(null).map((_, i) => {
    const angle = (i / 7) * Math.PI * 2;
    const radius = 2.8;
    return {
      position: [
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 0.8,
        Math.sin(angle) * radius
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ],
      scale: 0.15 + (i % 3) * 0.06,
      color: new THREE.Color().setHSL(i * 0.1, 0.8, 0.6)
    };
  });
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (group.current) {
      group.current.rotation.y = time * 0.12;
      
      group.current.children.forEach((cube, i) => {
        // More dynamic movement
        cube.position.y += Math.sin(time * (0.3 + i * 0.1)) * 0.003;
        cube.rotation.x += 0.003 + i * 0.001;
        cube.rotation.y += 0.003 + i * 0.001;
        
        // Subtle scale pulsing unique to each cube
        const scale = cubes[i].scale as number;
        const pulseFactor = 1 + Math.sin(time * (0.5 + i * 0.2)) * 0.05;
        cube.scale.set(scale * pulseFactor, scale * pulseFactor, scale * pulseFactor);
      });
    }
  });
  
  return (
    <group ref={group} position={[0, 0, 0]}>
      {cubes.map((cube, i) => (
        <RoundedBox
          key={i}
          args={[1, 1, 1]}
          radius={0.1}
          position={cube.position as [number, number, number]}
          rotation={cube.rotation as [number, number, number]}
          scale={cube.scale}
        >
          <meshStandardMaterial 
            color={cube.color} 
            roughness={0.2} 
            metalness={0.8}
            transparent
            opacity={0.9}
            envMapIntensity={1.5}
          />
        </RoundedBox>
      ))}
    </group>
  );
}

function FloatingText() {
  const { viewport } = useThree();
  const textRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (textRef.current) {
      // Gentle floating effect
      textRef.current.position.y = -1.8 + Math.sin(time * 0.8) * 0.1;
      // Subtle rotation
      textRef.current.rotation.x = Math.sin(time * 0.4) * 0.02;
      textRef.current.rotation.z = Math.sin(time * 0.3) * 0.01;
    }
  });
  
  return (
    <Float 
      speed={1.5}
      rotationIntensity={0.4}
      floatIntensity={0.8}
      position={[0, -1.8, 0]}
    >
      <Text
        ref={textRef}
        font="https://fonts.bunny.net/inter/files/inter-latin-700-normal.woff"
        fontSize={viewport.width > 3 ? 0.4 : 0.25}
        color="#f97316"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.9}
        outlineColor="#933e00"
        outlineWidth={0.004}
      >
        Creative Developer
      </Text>
    </Float>
  );
}

function ParticleRing() {
  const ringRef = useRef<THREE.Group>(null);
  const particleCount = 400;
  const particles = useRef<THREE.Vector3[]>([]);
  
  useEffect(() => {
    if (!particles.current.length) {
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = 3 + Math.random() * 0.2;
        const x = Math.cos(angle) * radius;
        const y = (Math.random() - 0.5) * 0.4;
        const z = Math.sin(angle) * radius;
        
        particles.current.push(new THREE.Vector3(x, y, z));
      }
    }
  }, []);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.15;
    
    if (ringRef.current) {
      ringRef.current.rotation.y = time * 0.2;
      
      // Update particle positions
      ringRef.current.children.forEach((particle, i) => {
        const angle = time + (i / particleCount) * Math.PI * 2;
        const wobble = Math.sin(time * 2 + i * 0.1) * 0.08;
        const radius = 3 + wobble;
        
        const position = particles.current[i];
        particle.position.x = Math.cos(angle) * radius;
        particle.position.z = Math.sin(angle) * radius;
        particle.position.y += Math.sin(time * 3 + i * 0.02) * 0.002;
        
        // Reset y position if it goes too far
        if (Math.abs(particle.position.y - position.y) > 0.4) {
          particle.position.y = position.y;
        }
        
        // Adjust opacity based on position for a twinkling effect
        const material = (particle as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (material) {
          material.opacity = 0.6 + Math.sin(time * 4 + i) * 0.4;
        }
      });
    }
  });
  
  return (
    <group ref={ringRef} position={[0, 0, 0]}>
      {particles.current.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[0.015 + Math.random() * 0.01, 8, 8]} />
          <meshBasicMaterial 
            color={new THREE.Color().setHSL(i / particleCount, 0.9, 0.6)} 
            transparent 
            opacity={0.6 + Math.random() * 0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ThreeScene() {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div 
      className="w-full h-full absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }} 
        className="w-full h-full"
        style={{ 
          background: 'transparent',
          mixBlendMode: 'normal',
        }}
        dpr={[1, 2]} // Better performance on high-DPI displays
      >
        <color attach="background" args={['transparent']} />
        
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, 0, -20]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[0, -10, 0]} intensity={1.2} color="#6d28d9" />
        
        <AnimatedSphere 
          isHovered={hovered} 
          onHover={() => setHovered(true)} 
          onLeave={() => setHovered(false)} 
        />
        <FloatingCubes />
        <FloatingText />
        <ParticleRing />
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.3}
          enablePan={false}
          minPolarAngle={Math.PI / 2 - 0.4}
          maxPolarAngle={Math.PI / 2 + 0.4}
        />
        
        <Environment preset="city" />
      </Canvas>
    </motion.div>
  );
} 