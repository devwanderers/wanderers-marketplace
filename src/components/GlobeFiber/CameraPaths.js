/* eslint-disable react/display-name */
import React, { useImperativeHandle, useRef, useState } from 'react'
import * as THREE from 'three'
import { createArc, createVector3 } from '../../utils/three.utils'
import useInterval from '../../hooks/useInterval'

const CameraPaths = React.forwardRef(({ visiblePaths }, ref) => {
    const group = useRef()

    const [paths, setPaths] = useState([])

    useImperativeHandle(ref, () => ({
        createPath: (targetPos, cameraPos) => {
            const { x: tx, y: ty, z: tz } = targetPos
            const { x: cx, y: cy, z: cz } = cameraPos

            const points = createArc(
                createVector3(cx, cy, cz),
                createVector3(tx, ty, tz),
                false,
                150
            )

            if (visiblePaths)
                setPaths((state) => {
                    let index = 1
                    if (state.length > 0) {
                        index = state[state.length - 1].index + 1
                    }

                    return [
                        ...state,
                        { index: 1, id: `path-${index}`, points: [...points] },
                    ]
                })

            return points
        },
    }))

    useInterval(
        () => {
            setPaths((a) => [...a.slice(0, 0), ...a.slice(1, a.length)])
        },
        paths.length > 0 ? 3000 : null
    )

    return (
        <group ref={group}>
            {paths.map((v, i) => {
                const lineGeometry = new THREE.BufferGeometry().setFromPoints(
                    v.points
                )
                return (
                    <line key={i} geometry={lineGeometry}>
                        <lineBasicMaterial color={0xa46200} />
                    </line>
                )
            })}
        </group>
    )
})

export default CameraPaths
