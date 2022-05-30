/* eslint-disable react/display-name */
import React from 'react'
import * as THREE from 'three'

const Circle = React.forwardRef(
    (
        {
            color = 0xf09000,
            transparent = false,
            circleRadious = 0.7,
            circleSegments = 16,
            wireframe = false,
            ...restProps
        },
        ref
    ) => {
        return (
            <mesh ref={ref} {...restProps}>
                <circleGeometry args={[circleRadious, circleSegments]} />
                <meshBasicMaterial
                    color={color}
                    side={THREE.DoubleSide}
                    wireframe={wireframe}
                />
            </mesh>
        )
    }
)

export default Circle
