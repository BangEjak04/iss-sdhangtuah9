import { PropsWithChildren, Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Ring } from "@react-three/drei"
import { createXRStore, useXR, XR, XRDomOverlay } from "@react-three/xr"
import { useARHitTest } from "@/hooks/use-ar-hit-test"
import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, BoxIcon, EllipsisVerticalIcon, RotateCcwIcon } from "lucide-react"
import * as THREE from "three"

const store = createXRStore({
  depthSensing: true,
  hitTest: true
})

export function ModelViewer({ children }: PropsWithChildren) {
  return (
    <div className="relative w-full h-full">
      <Canvas>
        <XR store={store}>
          <Suspense fallback={null}>
            <directionalLight position={[-10, 10, 10]} />
            <ModelViewerARScene>
              {children}
            </ModelViewerARScene>
            <OrbitControls enablePan={false} />
          </Suspense>
        </XR>
      </Canvas>
      <Button
        variant="outline"
        size="icon"
        onClick={() => store.enterAR()}
        className="absolute right-4 bottom-4 z-10"
        aria-label="Enter AR"
      >
        <BoxIcon />
      </Button>
    </div>
  )
}

function ModelViewerARScene({ children }: PropsWithChildren) {
  const { session } = useXR()
  const hitResult = useARHitTest()
  const [placedPosition, setPlacedPosition] = useState<THREE.Vector3 | null>(null)
  const [placedRotation, setPlacedRotation] = useState<THREE.Quaternion | null>(null)

  const isPresenting = !!session

  const handleExitAR = () => {
    session?.end()
  }

  const handleResetObject = () => {
    setPlacedPosition(null)
    setPlacedRotation(null)
  }

  const handlePlaceObject = () => {
    if (hitResult && !placedPosition) {
      setPlacedPosition(hitResult.position.clone())
      setPlacedRotation(hitResult.rotation.clone())
    }
  }

  if (!isPresenting) {
    return children
  }

  return (
    <>
      {hitResult && !placedPosition && (
        <group
          position={hitResult.position}
          quaternion={hitResult.rotation}
        >
          <Ring args={[0.15, 0.2, 32]} rotation-x={-Math.PI / 2}>
            <meshBasicMaterial color="white" opacity={0.6} transparent />
          </Ring>
        </group>
      )}

      {placedPosition && placedRotation && (
        <>
          <group
            position={placedPosition}
            quaternion={placedRotation}
            scale={0.25}
          >
            {children}
          </group>
        </>
      )}

      <XRDomOverlay className="pointer-events-none absolute inset-0 flex flex-col justify-between pt-10 pb-4 px-4">
        <div className="flex justify-between items-start pointer-events-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExitAR}
          >
            <ArrowLeftIcon />
            <span>Kembali</span>
          </Button>
          <Button variant="outline" size="icon-sm">
            <EllipsisVerticalIcon />
          </Button>
        </div>

        <div className="flex justify-between items-start pointer-events-auto">
          {!hitResult && !placedPosition && (
            <div className="bg-black/50 text-white px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-md">
              <span className="text-sm">Mencari permukaan datar...</span>
            </div>
          )}
          {hitResult && !placedPosition && (
            <Button onClick={handlePlaceObject}>Letakkan</Button>
          )}
          {placedPosition && (
            <>
              <Button>Info</Button>
              <Button
                variant="destructive"
                size="icon-sm"
                onClick={handleResetObject}
              >
                <RotateCcwIcon />
              </Button>
            </>
          )}
        </div>
      </XRDomOverlay>
    </>
  )
}