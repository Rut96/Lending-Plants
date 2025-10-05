import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { useLoader } from '@react-three/fiber';

function Loader() {
  return (
    <Html center>
      <div style={{
        color: '#4a7c59',
        fontSize: '18px',
        fontWeight: '600',
        textAlign: 'center'
      }}>
        Loading plant...
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e8f5e9',
          borderTop: '4px solid #4a7c59',
          borderRadius: '50%',
          margin: '10px auto',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </Html>
  );
}

function PlantModel() {
  const meshRef = useRef<THREE.Group>(null);

  // Load both FBX models (plant and vase)
  const plantFbx = useLoader(FBXLoader, '/src/assets/PlantZZ001/PlantZZ001.fbx');
  const vaseFbx = useLoader(FBXLoader, '/src/assets/PlantZZ001/PlantZZVase001.fbx');

  // Load plant textures
  const plantColorMap = useLoader(THREE.TextureLoader, '/src/assets/PlantZZ001/PlantZZ001_COL_3K_METALNESS.jpg');
  const plantNormalMap = useLoader(THREE.TextureLoader, '/src/assets/PlantZZ001/PlantZZ001_NRM_3K_METALNESS.jpg');
  const plantRoughnessMap = useLoader(THREE.TextureLoader, '/src/assets/PlantZZ001/PlantZZ001_ROUGHNESS_3K_METALNESS.jpg');
  const plantMetalnessMap = useLoader(THREE.TextureLoader, '/src/assets/PlantZZ001/PlantZZ001_METALNESS_3K_METALNESS.jpg');

  // Load vase textures
  const vaseColorMap = useLoader(THREE.TextureLoader, '/src/assets/PlantZZ001/PlantZZVase001_COL_3K_METALNESS.jpg');
  const vaseNormalMap = useLoader(THREE.TextureLoader, '/src/assets/PlantZZ001/PlantZZVase001_NRM_3K_METALNESS.png');
  const vaseRoughnessMap = useLoader(THREE.TextureLoader, '/src/assets/PlantZZ001/PlantZZVase001_ROUGHNESS_3K_METALNESS.jpg');
  const vaseMetalnessMap = useLoader(THREE.TextureLoader, '/src/assets/PlantZZ001/PlantZZVase001_METALNESS_3K_METALNESS.jpg');

  // Auto-rotate animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  // Apply textures to the plant
  if (plantFbx) {
    plantFbx.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: plantColorMap,
          normalMap: plantNormalMap,
          roughnessMap: plantRoughnessMap,
          metalnessMap: plantMetalnessMap,
          metalness: 0.1,
          roughness: 0.7,
        });
      }
    });
    plantFbx.scale.set(0.1, 0.1, 0.1);
  }

  // Apply textures to the vase
  if (vaseFbx) {
    vaseFbx.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: vaseColorMap,
          normalMap: vaseNormalMap,
          roughnessMap: vaseRoughnessMap,
          metalnessMap: vaseMetalnessMap,
          metalness: 0.2,
          roughness: 0.8,
        });
      }
    });
    vaseFbx.scale.set(0.1, 0.1, 0.1);
  }

  return (
    <group ref={meshRef} position={[0, -1.5, 0]}>
      <primitive object={plantFbx} />
      <primitive object={vaseFbx} />
    </group>
  );
}

export default function Plant3D() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 4, 9]} fov={50} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <pointLight position={[0, 5, 0]} intensity={0.5} />

        {/* 3D Model with loading fallback */}
        <Suspense fallback={<Loader />}>
          <PlantModel />
        </Suspense>

        {/* Controls for user interaction */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          target={[0, 2, 0]}
        />
      </Canvas>
    </div>
  );
}
