import { useRef } from "react"
import { PlanetModelProps } from "@/types"
import { useFrame } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

import Surface from "@/assets/textures/2k_saturn.jpg"

export default function SaturnModel({ position, scale }: PlanetModelProps) {
  const modelRef = useRef<THREE.Mesh>(null!)

  const [surface] = useTexture([
    Surface
  ])

  useFrame((_state, delta) => {
    modelRef.current.rotation.y += delta * 0.05
  })

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