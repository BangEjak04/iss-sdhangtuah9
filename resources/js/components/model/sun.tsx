import { useRef } from "react"
import { PlanetModelProps } from "@/types"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

import Surface from "@/assets/textures/2k_sun.jpg"

export default function SunModel({ position }: PlanetModelProps) {
  const modelRef = useRef<THREE.Mesh>(null!)

  const [surface] = useTexture([
    Surface
  ])

  return (
    <group position={position}>
      <mesh ref={modelRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          map={surface}
          emissive={"#ff6600"}
          emissiveIntensity={2}
          emissiveMap={surface}
        />
      </mesh>
    </group>
  )
}