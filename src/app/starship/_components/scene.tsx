"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { StarshipModel } from "./starship-model";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [5, 4, 9], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#0A0A0A"]} />
      <fog attach="fog" args={["#0A0A0A", 14, 28]} />

      <ambientLight intensity={0.25} />
      <directionalLight
        position={[6, 10, 4]}
        intensity={1.4}
        color="#ffffff"
      />
      <directionalLight
        position={[-6, 2, -4]}
        intensity={0.4}
        color="#A78BFA"
      />

      <Suspense fallback={null}>
        <Environment preset="studio" />
        <StarshipModel />
      </Suspense>

      <EffectComposer>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.2}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
