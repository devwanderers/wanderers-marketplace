import React, { useState, useCallback, useRef } from 'react'
import Marker from './Marker'
import { useThree } from '@react-three/fiber'

const Markers = ({
    onHoverMarker,
    onClickMarker,
    markers = [],
    htmlElementHover,
    edit,
}) => {
    const [markerHover, setmarkerHover] = useState(null)
    const markersRef = useRef({})
    const camera = useThree((state) => state.camera)
    const renderer = useThree((state) => state.gl)

    const calculatePositionOnCanvas = useCallback(
        (id) => {
            const { domElement } = renderer
            const marker = markersRef.current[id]
            const topOffset =
                domElement.getBoundingClientRect().top +
                document.documentElement.scrollTop

            const widthHalf = domElement.clientWidth / 2
            const heightHalf = domElement.clientHeight / 2

            const markerPosition = marker.position.clone()
            markerPosition.project(camera)
            markerPosition.x = markerPosition.x * widthHalf + widthHalf
            markerPosition.y =
                -(markerPosition.y * heightHalf) + heightHalf - topOffset

            return markerPosition
        },
        [renderer, camera]
    )

    const handlePointerMove = useCallback(
        (id) => (e) => {
            if ((!markerHover && !edit) || (!markerHover && edit && e.altKey)) {
                const marker = markers.find((v) => v.id === id)
                setmarkerHover({ id, point: marker.point })
                if (onHoverMarker)
                    onHoverMarker({
                        ...marker,
                        positionOnCanvas: calculatePositionOnCanvas(id),
                    })
            }
        },
        [markerHover, markers, onHoverMarker, calculatePositionOnCanvas]
    )

    const handlePointerDown = useCallback(
        (id) => (e) => {
            // e.stopPropagation()
            if (markerHover && markerHover.id === id) {
                if (onClickMarker) onClickMarker(markerHover)
                console.log('Move to marker')
            }
        },
        [markerHover, onClickMarker]
    )

    const handlePointerOut = useCallback(
        (id) => (e) => {
            // e.stopPropagation()
            if (markerHover && markerHover.id === id) {
                console.log('Remove Marker')
                setmarkerHover(null)
                if (onHoverMarker) onHoverMarker(null)
            }
        },
        [markerHover, onHoverMarker]
    )

    const setMarkersRef = useCallback(
        (id) => (node) => {
            markersRef.current[id] = node
        },
        []
    )

    return markers.map((v, i) => (
        <Marker
            ref={setMarkersRef(v.id)}
            key={i}
            hover={markerHover?.id === v.id}
            position={v.point}
            normal={v.normal}
            onPointerMove={handlePointerMove(v.id)}
            onPointerDown={handlePointerDown(v.id)}
            onPointerOut={handlePointerOut(v.id)}
        />
    ))
}
export default Markers
