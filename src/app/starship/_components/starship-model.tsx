"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

const HULL_COLOR = "#C7CBD1";
const HULL_METALNESS = 0.85;
const HULL_ROUGHNESS = 0.35;

const BELL_COLOR = "#16181B";
const BELL_EMISSIVE = "#FF6308";

const R = 0.5;

function EngineCluster() {
  // 33 Raptors: 3 inner (gimballed) + 10 middle + 20 outer.
  const positions = useMemo(() => {
    const out: [number, number][] = [];
    const inner = 3;
    const middle = 10;
    const outer = 20;
    for (let i = 0; i < inner; i++) {
      const a = (i / inner) * Math.PI * 2;
      out.push([Math.cos(a) * 0.08, Math.sin(a) * 0.08]);
    }
    for (let i = 0; i < middle; i++) {
      const a = (i / middle) * Math.PI * 2;
      out.push([Math.cos(a) * 0.22, Math.sin(a) * 0.22]);
    }
    for (let i = 0; i < outer; i++) {
      const a = (i / outer) * Math.PI * 2 + Math.PI / outer;
      out.push([Math.cos(a) * 0.4, Math.sin(a) * 0.4]);
    }
    return out;
  }, []);

  return (
    <group position={[0, -0.08, 0]}>
      {positions.map(([x, z], i) => (
        <mesh key={i} position={[x, 0, z]}>
          <cylinderGeometry args={[0.045, 0.06, 0.18, 12]} />
          <meshStandardMaterial
            color={BELL_COLOR}
            metalness={0.6}
            roughness={0.5}
            emissive={BELL_EMISSIVE}
            emissiveIntensity={1.8}
          />
        </mesh>
      ))}
    </group>
  );
}

function GridFins() {
  return (
    <group position={[0, 6.4, 0]}>
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2;
        const x = Math.cos(a) * (R + 0.18);
        const z = Math.sin(a) * (R + 0.18);
        return (
          <mesh
            key={i}
            position={[x, 0, z]}
            rotation={[0, -a, 0]}
            castShadow
          >
            <boxGeometry args={[0.05, 0.35, 0.35]} />
            <meshStandardMaterial
              color={HULL_COLOR}
              metalness={HULL_METALNESS}
              roughness={HULL_ROUGHNESS}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Flap({
  y,
  size,
  outward,
  rotationY,
  pitch,
}: {
  y: number;
  size: [number, number, number];
  outward: number;
  rotationY: number;
  pitch: number;
}) {
  const x = Math.cos(rotationY) * outward;
  const z = Math.sin(rotationY) * outward;
  return (
    <group position={[x, y, z]} rotation={[0, -rotationY, 0]}>
      <mesh rotation={[0, 0, pitch]}>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={HULL_COLOR}
          metalness={HULL_METALNESS}
          roughness={HULL_ROUGHNESS}
        />
      </mesh>
    </group>
  );
}

export function StarshipModel() {
  const root = useRef<Group>(null);

  useFrame((_state, delta) => {
    if (root.current) {
      root.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group ref={root} position={[0, -5.8, 0]}>
      {/* Super Heavy booster body */}
      <mesh position={[0, 3.5, 0]}>
        <cylinderGeometry args={[R, R, 7, 64]} />
        <meshStandardMaterial
          color={HULL_COLOR}
          metalness={HULL_METALNESS}
          roughness={HULL_ROUGHNESS}
        />
      </mesh>

      {/* Booster bottom skirt (slight flare) */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[R, R * 1.04, 0.1, 64]} />
        <meshStandardMaterial
          color={HULL_COLOR}
          metalness={HULL_METALNESS}
          roughness={HULL_ROUGHNESS}
        />
      </mesh>

      <EngineCluster />
      <GridFins />

      {/* Hot stage / interstage ring */}
      <mesh position={[0, 7.05, 0]}>
        <cylinderGeometry args={[R * 1.02, R * 1.02, 0.18, 64]} />
        <meshStandardMaterial
          color="#2A2D32"
          metalness={0.7}
          roughness={0.5}
        />
      </mesh>

      {/* Starship upper stage body */}
      <mesh position={[0, 9.3, 0]}>
        <cylinderGeometry args={[R, R, 4.2, 64]} />
        <meshStandardMaterial
          color={HULL_COLOR}
          metalness={HULL_METALNESS}
          roughness={HULL_ROUGHNESS}
        />
      </mesh>

      {/* Nose cone — tapered */}
      <mesh position={[0, 12.0, 0]}>
        <cylinderGeometry args={[0.02, R, 1.2, 64]} />
        <meshStandardMaterial
          color={HULL_COLOR}
          metalness={HULL_METALNESS}
          roughness={HULL_ROUGHNESS}
        />
      </mesh>

      {/* Aft flaps — 2 larger, near base of ship */}
      <Flap
        y={7.7}
        size={[0.06, 0.5, 0.7]}
        outward={R + 0.32}
        rotationY={0}
        pitch={-0.25}
      />
      <Flap
        y={7.7}
        size={[0.06, 0.5, 0.7]}
        outward={R + 0.32}
        rotationY={Math.PI}
        pitch={0.25}
      />

      {/* Forward flaps — 2 smaller, near nose */}
      <Flap
        y={11.3}
        size={[0.06, 0.35, 0.45]}
        outward={R + 0.22}
        rotationY={Math.PI / 2}
        pitch={-0.15}
      />
      <Flap
        y={11.3}
        size={[0.06, 0.35, 0.45]}
        outward={R + 0.22}
        rotationY={-Math.PI / 2}
        pitch={0.15}
      />

      {/* Ship engine bells (3 sea-level + 3 vacuum) — peek out from skirt */}
      <group position={[0, 7.18, 0]}>
        {[0, 1, 2].map((i) => {
          const a = (i / 3) * Math.PI * 2;
          return (
            <mesh
              key={`sl-${i}`}
              position={[Math.cos(a) * 0.12, 0, Math.sin(a) * 0.12]}
            >
              <cylinderGeometry args={[0.04, 0.05, 0.12, 12]} />
              <meshStandardMaterial
                color={BELL_COLOR}
                metalness={0.6}
                roughness={0.5}
                emissive={BELL_EMISSIVE}
                emissiveIntensity={1.5}
              />
            </mesh>
          );
        })}
        {[0, 1, 2].map((i) => {
          const a = (i / 3) * Math.PI * 2 + Math.PI / 3;
          return (
            <mesh
              key={`vac-${i}`}
              position={[Math.cos(a) * 0.3, 0, Math.sin(a) * 0.3]}
            >
              <cylinderGeometry args={[0.07, 0.085, 0.14, 16]} />
              <meshStandardMaterial
                color={BELL_COLOR}
                metalness={0.6}
                roughness={0.5}
                emissive={BELL_EMISSIVE}
                emissiveIntensity={1.5}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
