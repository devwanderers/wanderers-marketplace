/* eslint-disable react/display-name */
import { useTexture } from '@react-three/drei'
import React, { useCallback, useRef } from 'react'
import * as THREE from 'three'

const intersectPostion = (intersections) => {
    if (intersections.length === 0) return

    const mesh = intersections[0]
    const n = new THREE.Vector3()

    n.copy(mesh.face.normal)
    n.transformDirection(mesh.object.matrixWorld)

    return { point: mesh.point, direction: n }
}

const Globe = React.forwardRef(
    ({ radius, onPoinertDown, onPointerMove, onPointerOut, edit }, ref) => {
        const globe = useRef()
        const handlePointerMove = useCallback(
            (e) => {
                const { intersections } = e
                e.stopPropagation()
                const intersectPos = intersectPostion(intersections)
                if (!intersectPos) return

                if (onPointerMove) {
                    onPointerMove(intersectPos)
                }
            },
            [onPointerMove]
        )

        const handlePointerDown = useCallback(
            (e) => {
                const { intersections } = e
                e.stopPropagation()
                const intersectPos = intersectPostion(intersections)
                if (!intersectPos) return

                if (onPoinertDown && e.ctrlKey) onPoinertDown(intersectPos)
            },
            [onPoinertDown]
        )

        const handlePointerOut = useCallback(() => {
            if (onPointerOut) onPointerOut()
        }, [onPointerOut])

        const events = edit
            ? {
                  onPointerDown: handlePointerDown,
                  onPointerMove: handlePointerMove,
                  onPointerOut: handlePointerOut,
              }
            : {}

        const map = useTexture(
            edit ? 'img/map-line.png' : 'img/global-dot3.png'
        )

        return (
            <React.Suspense fallback={null}>
                <mesh ref={mergeRefs(globe, ref)} {...events}>
                    <icosahedronBufferGeometry args={[radius, 10]} />
                    <meshBasicMaterial
                        side={THREE.DoubleSide}
                        blending={THREE.AdditiveBlending}
                        transparent
                        map={map}
                    />
                </mesh>
            </React.Suspense>
        )
    }
)

export default Globe

function mergeRefs(...refs: []) {
    return (instance) => {
        for (const ref of refs) {
            if (typeof ref === 'function') {
                ref(instance)
            } else if (ref) {
                ref.current = instance
            }
        }
    }
}
