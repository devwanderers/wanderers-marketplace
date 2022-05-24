/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { useRef, useCallback } from 'react'
import * as THREE from 'three'
import Circle from '../Circle'
import { useTexture, Html } from '@react-three/drei'

const Degree90 = 90
const Degree180 = 180
const lineHeight = 8
const lineWidth = 2
const rotate90Degree = (Degree90 * Math.PI) / Degree180
const rotate180egree = (Degree180 * Math.PI) / Degree180

const Marker = React.forwardRef(
    ({ position, onPointerMove, onPointerDown, onPointerOut, hover }, ref) => {
        const marker = useRef()
        const highlight = useRef({})

        const setMarkerRef = useCallback((node) => {
            if (!marker.current) {
                marker.current = node

                marker.current.lookAt(new THREE.Vector3())
                marker.current.rotateX(rotate180egree)
            }
        }, [])

        const setHighLightRef = useCallback(
            (id) => (node) => {
                if (!highlight.current[id]) {
                    highlight.current = { ...highlight.current, [id]: node }

                    if (id === 'highlight1') {
                        const highlight1 = highlight.current[id]
                        highlight1.position.z = lineHeight / 2
                        highlight1.rotateZ(rotate90Degree)

                        highlight1.rotateX(-rotate90Degree)
                    }
                    if (id === 'highlight2') {
                        const highlight2 = highlight.current[id]
                        highlight2.position.z = lineHeight / 2
                        highlight2.rotateX(-rotate90Degree)
                    }
                }
            },
            []
        )
        const lightTrailTexture = useTexture('img/lightray.jpg')
        return (
            <group ref={mergeRefs(setMarkerRef, ref)} position={position}>
                <Circle
                    color={hover ? 0xf31633 : 0xf09000}
                    onPointerMove={onPointerMove}
                    onPointerDown={onPointerDown}
                    onPointerOut={onPointerOut}
                />
                <mesh ref={setHighLightRef('highlight1')}>
                    <planeGeometry args={[lineWidth, lineHeight]} />
                    <meshBasicMaterial
                        // color={0xfff}
                        side={THREE.DoubleSide}
                        blending={THREE.AdditiveBlending}
                        map={lightTrailTexture}
                        transparent
                    />
                </mesh>
                <mesh ref={setHighLightRef('highlight2')}>
                    <planeGeometry args={[lineWidth, lineHeight]} />
                    <meshBasicMaterial
                        // color={0xfff}
                        side={THREE.DoubleSide}
                        blending={THREE.AdditiveBlending}
                        map={lightTrailTexture}
                        transparent
                    />
                </mesh>
                {/* <Html>
                    <div className="py-1 px-6 bg-white">Hola Culo</div>
                </Html> */}
            </group>
        )
    }
)

export default Marker

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
