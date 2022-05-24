import React, { useRef, useMemo, useEffect, useCallback, useState } from 'react'
import * as THREE from 'three'
import Circle from './../Circle'
import { useFrame } from '@react-three/fiber'

const PreviewMarker = ({ position }) => {
    const circle = useRef()
    const arrow = useRef()
    const prevPostion = useRef({ point: new THREE.Vector3() })
    const [keyPress, setKeyPress] = useState(false)

    const _position = useMemo(() => {
        if (!position) return prevPostion.current
        prevPostion.current = position
        return position
    }, [position])

    useFrame(() => {
        if (position && circle.current) {
            circle.current.lookAt(new THREE.Vector3())
            arrow.current.setDirection(_position.direction)
        }
    })

    const handlePressAltKeyDown = useCallback((e) => {
        e.preventDefault()

        if (e.keyCode === 18) {
            setKeyPress(true)
        }
    }, [])

    const handlePressAltKeyUp = useCallback((e) => {
        e.preventDefault()
        console.log({ e })
        if (e.keyCode === 18) {
            setKeyPress(false)
        }
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', handlePressAltKeyDown)
        window.addEventListener('keyup', handlePressAltKeyUp)

        return () => {
            window.removeEventListener('keydown', handlePressAltKeyDown)
            window.removeEventListener('keyup', handlePressAltKeyUp)
        }
    }, [])

    return (
        <group visible={!!position && !keyPress} position={_position.point}>
            <Circle ref={circle} color={0xa46200} wireframe />
            <arrowHelper
                ref={arrow}
                visible={true}
                args={[new THREE.Vector3(), new THREE.Vector3(), 15, 0xa46200]}
            />
        </group>
    )
}

export default PreviewMarker
