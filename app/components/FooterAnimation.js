'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { Sparkles, useTexture, Environment } from '@react-three/drei';
import { Vector3 } from 'three';
import * as THREE from 'three';

// Custom shader for the cyber grid
class CyberGridMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(1, 1) },
        gridColor: { value: new THREE.Color(0x00ffcc) },
        pulseColor: { value: new THREE.Color(0x0088ff) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        uniform vec3 gridColor;
        uniform vec3 pulseColor;
        varying vec2 vUv;
        
        float line(vec2 p, vec2 a, vec2 b, float width) {
          vec2 pa = p - a;
          vec2 ba = b - a;
          float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
          float d = length(pa - ba * h);
          return smoothstep(width, 0.0, d);
        }
        
        void main() {
          vec2 uv = vUv * 2.0 - 1.0;
          uv.x *= resolution.x / resolution.y;
          
          // Create grid
          float gridSize = 20.0;
          vec2 grid = fract(uv * gridSize) - 0.5;
          vec2 gridId = floor(uv * gridSize);
          
          // Animate pulse
          float pulse = sin(time * 0.5 + length(gridId) * 0.5) * 0.5 + 0.5;
          pulse = smoothstep(0.2, 1.0, pulse);
          
          // Draw grid lines
          float width = 0.02 * (0.5 + pulse * 0.5);
          float x = smoothstep(width, 0.0, abs(grid.x));
          float y = smoothstep(width, 0.0, abs(grid.y));
          
          // Create an energy wave effect
          float dist = length(uv);
          float wave = sin(dist * 5.0 - time * 1.5) * 0.5 + 0.5;
          wave = smoothstep(0.3, 1.0, wave) * smoothstep(1.0, 0.3, dist);
          
          // Combine effects
          float brightness = max(x, y) * 0.5 + wave * 0.5;
          vec3 color = mix(gridColor, pulseColor, pulse * wave);
          
          gl_FragColor = vec4(color * brightness, brightness * 0.5);
        }
      `,
      transparent: true,
      depthWrite: false,
    });
  }
}

// Register the custom shader material
extend({ CyberGridMaterial });

// Grid component
function CyberGrid() {
  const material = useRef();
  
  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <cyberGridMaterial ref={material} />
    </mesh>
  );
}

// Energy Orb component
function EnergyOrb({ position }) {
  const orbRef = useRef();
  
  const particleCount = 300;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 0.5 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, [particleCount]);
  
  useFrame(({ clock }) => {
    if (orbRef.current) {
      const time = clock.getElapsedTime();
      orbRef.current.rotation.x = time * 0.1;
      orbRef.current.rotation.y = time * 0.15;
      orbRef.current.scale.x = 1 + Math.sin(time * 0.8) * 0.1;
      orbRef.current.scale.y = 1 + Math.sin(time * 0.7) * 0.1;
      orbRef.current.scale.z = 1 + Math.sin(time * 0.9) * 0.1;
    }
  });

  return (
    <group position={position} ref={orbRef}>
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#00ffaa"
          emissive="#00ffaa"
          emissiveIntensity={2}
          roughness={0.1}
          metalness={1}
          transparent
          opacity={0.3}
        />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            itemSize={3}
            array={positions}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#00ffaa"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <Sparkles count={100} scale={3} size={1} speed={0.3} />
    </group>
  );
}

// Data stream effect
function DataStream({ count = 20, speed = 1 }) {
  const mesh = useRef();
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => {
      const x = (Math.random() - 0.5) * 15;
      const y = Math.random() * 10 - 5;
      const z = (Math.random() - 0.5) * 15;
      const size = Math.random() * 0.3 + 0.1;
      const speed = Math.random() * 1.5 + 0.5;
      return { position: new Vector3(x, y, z), size, speed };
    });
  }, [count]);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      const positions = mesh.current.geometry.attributes.position.array;
      const sizes = mesh.current.geometry.attributes.size.array;
      
      const time = clock.getElapsedTime();
      
      for (let i = 0; i < particles.length; i++) {
        const i3 = i * 3;
        const p = particles[i];
        
        // Move particles downward
        positions[i3 + 1] -= p.speed * speed * 0.03;
        
        // Reset position when out of view
        if (positions[i3 + 1] < -5) {
          positions[i3 + 1] = 5;
          positions[i3] = (Math.random() - 0.5) * 15;
          positions[i3 + 2] = (Math.random() - 0.5) * 15;
        }
        
        // Pulse size
        sizes[i] = p.size * (0.8 + Math.sin(time * 2 + i) * 0.2);
      }
      
      mesh.current.geometry.attributes.position.needsUpdate = true;
      mesh.current.geometry.attributes.size.needsUpdate = true;
    }
  });

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const p = particles[i];
      
      positions[i3] = p.position.x;
      positions[i3 + 1] = p.position.y;
      positions[i3 + 2] = p.position.z;
      
      sizes[i] = p.size;
    }
    
    return { positions, sizes };
  }, [particles, count]);

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          itemSize={3}
          array={particlePositions.positions}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          itemSize={1}
          array={particlePositions.sizes}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        color="#00ffff"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main animation scene
function AnimationScene() {
  return (
    <>
      <Environment preset="night" />
      <CyberGrid />
      <EnergyOrb position={[-4, 0, 0]} />
      <EnergyOrb position={[4, 0, 0]} />
      <DataStream count={100} speed={1} />
      <ambientLight intensity={0.2} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

export default function FooterAnimation() {
  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%',
      zIndex: 0
    }}>
      <Canvas camera={{ position: [0, 3, 10], fov: 60 }}>
        <AnimationScene />
      </Canvas>
    </div>
  );
}
