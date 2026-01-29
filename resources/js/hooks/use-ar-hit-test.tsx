import { useXR } from '@react-three/xr'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

interface HitTestResult {
  position: THREE.Vector3
  rotation: THREE.Quaternion
}

export function useARHitTest() {
  const { session } = useXR()
  const [hitResult, setHitResult] = useState<HitTestResult | null>(null)
  const hitTestSourceRef = useRef<XRHitTestSource | null>(null)
  const { gl } = useThree()
  
  const isPresenting = !!session

  useEffect(() => {
    if (!isPresenting) {
      hitTestSourceRef.current = null
      setHitResult(null)
    }
  }, [isPresenting])

  useFrame((_state, _delta, xrFrame) => {
    if (!isPresenting || !xrFrame || !session) return

    const referenceSpace = gl.xr.getReferenceSpace()
    if (!referenceSpace) return

    // Request hit test source hanya sekali
    if (!hitTestSourceRef.current) {
      session.requestReferenceSpace('viewer').then((viewerSpace) => {
        session.requestHitTestSource?.({ space: viewerSpace })?.then((source) => {
          hitTestSourceRef.current = source
        }).catch((err) => {
          console.warn('Hit test not supported:', err)
        })
      }).catch((err) => {
        console.warn('Viewer reference space not available:', err)
      })
      return
    }

    try {
      const hitTestResults = xrFrame.getHitTestResults(hitTestSourceRef.current)
      
      if (hitTestResults.length > 0) {
        const hit = hitTestResults[0]
        const pose = hit.getPose(referenceSpace)
        
        if (pose) {
          const matrix = new THREE.Matrix4().fromArray(pose.transform.matrix)
          const position = new THREE.Vector3()
          const rotation = new THREE.Quaternion()
          const scale = new THREE.Vector3()
          
          matrix.decompose(position, rotation, scale)
          
          setHitResult({ position, rotation })
        }
      } else {
        setHitResult(null)
      }
    } catch (err) {
      console.warn('Hit test error:', err)
    }
  })

  return hitResult
}