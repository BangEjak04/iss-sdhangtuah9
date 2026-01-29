import { useRef } from "react"
import { PlanetModelProps } from "@/types"
import { useFrame } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

import EarthDayMap from "@/assets/textures/2k_earth_daymap.jpg"
import EarthNightMap from "@/assets/textures/2k_earth_nightmap.jpg"
import EarthNormalMap from "@/assets/textures/2k_earth_normal_map.jpg"
import EarthSpecularMap from "@/assets/textures/2k_earth_specular_map.jpg"
import EarthCloudsMap from "@/assets/textures/2k_earth_clouds.jpg"

export default function EarthModel({ position, scale }: PlanetModelProps) {
  const modelRef = useRef<THREE.Mesh>(null!)
  const cloudRef = useRef<THREE.Mesh>(null!)

  const [day, night, normal, specular, clouds] = useTexture([
    EarthDayMap,
    EarthNightMap,
    EarthNormalMap,
    EarthSpecularMap,
    EarthCloudsMap
  ])

  useFrame((_state, delta) => {
    modelRef.current.rotation.y += delta * 0.05
    cloudRef.current.rotation.y += delta * 0.07
  })

  return (
    <group position={position}>
      <mesh ref={modelRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial
          map={day}
          normalMap={normal}
          specularMap={specular}
          specular={new THREE.Color(0x333333)}
          emissiveMap={night}
          emissive={new THREE.Color(0xffff88)}
          emissiveIntensity={1.5}
          shininess={15}
        />

        <mesh ref={cloudRef}>
          <sphereGeometry args={[2.02, 64, 64]} />
          <meshStandardMaterial
            alphaMap={clouds}
            transparent={true}
            opacity={1}
            color="white"
          />
        </mesh>
      </mesh>
    </group>
  )
}