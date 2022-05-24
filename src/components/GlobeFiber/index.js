/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, {
    useRef,
    useMemo,
    useCallback,
    useState,
    useEffect,
    useImperativeHandle,
} from 'react'
import Tween from '@tweenjs/tween.js'
import { Canvas } from '@react-three/fiber'
import { Html, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { CameraControls as Controls } from './CameraControls'
import Globe from './Globe'
import Markers from './Markers/Markers'
import PreviewMarker from './Markers/PreviewMarker'
import { createVector3, distanceTo } from '../../utils/three.utils'
import CameraPaths from './CameraPaths'
// import { AnimatePresence, motion } from 'framer-motion'
import useDebugInformation from './../../hooks/useDebugInformation'

const scaleVectorByCoeff = (vector3, coeff) => {
    const v3 = Object.keys(vector3).reduce(
        (acc, v) => ({ ...acc, [v]: vector3[v] * coeff }),
        {}
    )
    return new THREE.Vector3(v3.x, v3.y, v3.z)
}

const Loading = ({ onUnMount }) => {
    useEffect(() => {
        return () => {
            if (onUnMount) onUnMount()
        }
    })
    return <Html></Html>
}

const GlobeFiber = React.forwardRef(
    (
        {
            minZoom = 81.25,
            maxZoom = 106.25,
            radius = 50,
            opts = {},
            edit = false,
            markers = [],
            onUserControlStart,
            onUserControlEnd,
            onSelectMarker,
            onHoverMarker,
            onAddMarker,
            enableRotation = true,
            visiblePaths = true,
        },
        ref
    ) => {
        const container = useRef(null)
        const cameraControls = useRef(null)
        const globe = useRef()
        const cameraPaths = useRef()

        const coeff = useMemo(() => {
            return (radius + radius * 0.015) / radius
        }, [radius])

        const prevMarkerSelected = useRef(null)
        const [selectedMarker, setSelectedMarker] = useState(null)
        // const [stopRotation, setStopRotation] = useState(false);
        const [previewMarker, setPreviewMarker] = useState(null)

        const [
            {
                activeTransition,
                userControl,
                markerHover,
                htmlElementHover,
                scrollPosY,
                loadModels,
            },
            setEvents,
        ] = useState({
            activeTransition: false,
            userControl: false,
            markerHover: null,
            htmlElementHover: false,
            scrollPosY: 0,
            loadModels: false,
        })

        const setGlobeRef = useCallback(
            (node) => {
                if (node && !globe.current) {
                    globe.current = node
                }
            },
            [coeff, radius]
        )

        const cameraPosition = useCallback(
            () => cameraControls.current.camera.position,
            []
        )

        const cameraDistanceToOrigin = useCallback(() => {
            return distanceTo(cameraPosition(), new THREE.Vector3())
        }, [cameraPosition])

        const startCameraTransitionToMaker = useCallback(
            (marker) => {
                console.log('startCameraTransitionToMaker', { marker })
                const distance = distanceTo(cameraPosition(), marker.point)
                console.log({ distance, activeTransition })
                if (
                    JSON.stringify(marker) ===
                        JSON.stringify(prevMarkerSelected.current) &&
                    distance < minZoom - radius
                )
                    return

                console.log({ distance, activeTransition })
                if (!activeTransition) {
                    cameraControls.current.enableControls(false)

                    setEvents((state) => ({
                        ...state,
                        activeTransition: true,
                    }))

                    const ESCALAR = 1.2
                    const zoomRange = (minZoom - radius) * ESCALAR
                    prevMarkerSelected.current = marker
                    setSelectedMarker(marker)

                    const { point } = marker
                    const cameraAltitude = cameraDistanceToOrigin()

                    const setStartAndEndVectorsForArc = () => {
                        const cameraToOrigin = cameraDistanceToOrigin()

                        const pointToOrigin = distanceTo(point, createVector3())
                        const p = cameraToOrigin / pointToOrigin

                        const cPos = cameraPosition()
                        return [
                            createVector3(
                                point.x * p,
                                point.y * p,
                                point.z * p
                            ),
                            createVector3(cPos.x, cPos.y, cPos.z),
                        ]
                    }

                    Tween.removeAll()

                    const duration = (distance / 2) * 18

                    if (cameraAltitude !== maxZoom && distance > zoomRange) {
                        console.log('Zoom Out')
                        cameraControls.current.tweenZoom(
                            { distance: maxZoom * 1.5 },
                            () => {
                                console.log('Follow Path', point)

                                const points = cameraPaths.current.createPath(
                                    ...setStartAndEndVectorsForArc()
                                )
                                cameraControls.current.tweenPath(
                                    { points, duration },
                                    () => {
                                        console.log('Zoom In')
                                        cameraControls.current.tweenZoom(
                                            { distance: minZoom },
                                            () => {
                                                cameraControls.current.enableControls()
                                                setEvents((state) => ({
                                                    ...state,
                                                    activeTransition: false,
                                                }))
                                            }
                                        )
                                    }
                                )
                            }
                        )
                        console.log('Zoom In')
                    } else {
                        const points = cameraPaths.current.createPath(
                            ...setStartAndEndVectorsForArc()
                        )
                        console.log('Follow Path', point)
                        cameraControls.current.tweenPath(
                            { points, duration },
                            () => {
                                console.log('Zoom In')
                                cameraControls.current.tweenZoom(
                                    { distance: minZoom },
                                    () => {
                                        cameraControls.current.enableControls()
                                        setEvents((state) => ({
                                            ...state,
                                            activeTransition: false,
                                        }))
                                    }
                                )
                            }
                        )
                        setEvents((state) => ({
                            ...state,
                            activeTransition: false,
                        }))
                    }
                }
            },
            [
                maxZoom,
                minZoom,
                radius,
                activeTransition,
                cameraDistanceToOrigin,
                cameraPosition,
            ]
        )

        const resetOrbit = useCallback(() => {
            const cameraAltitude = cameraDistanceToOrigin()
            if (maxZoom === cameraAltitude) return
            if (!activeTransition) {
                cameraControls.current.enableControls(false)
                setEvents((state) => ({ ...state, activeTransition: true }))

                cameraControls.current.tweenZoom({ distance: maxZoom }, () => {
                    cameraControls.current.enableControls()
                    setEvents((state) => ({
                        ...state,
                        activeTransition: false,
                    }))
                    setSelectedMarker(null)
                })
            }
        }, [maxZoom, activeTransition, cameraDistanceToOrigin])

        const handleAddMarker = useCallback(
            (position) => {
                const marker = {
                    id: `marker-${markers.length}`,
                    point: scaleVectorByCoeff(position.point, coeff),
                    data: {},
                }
                if (onAddMarker) onAddMarker(marker)
            },
            [coeff, markers]
        )

        const handleClickMarker = useCallback(
            (marker) => {
                startCameraTransitionToMaker(marker)
                if (onSelectMarker) onSelectMarker(marker)
            },
            [startCameraTransitionToMaker, onSelectMarker]
        )

        const handleHoverMarker = useCallback(
            (marker) => {
                if (marker)
                    setEvents((state) => ({ ...state, markerHover: marker }))
                if (onHoverMarker) {
                    onHoverMarker(marker)
                }
            },
            [onHoverMarker]
        )

        const handleUserControlStart = useCallback(() => {
            setSelectedMarker(null)
            setEvents((state) => ({ ...state, userControl: true }))

            if (onUserControlStart) onUserControlStart()
        }, [onUserControlStart])

        const handleUserControlEnd = useCallback(() => {
            setEvents((state) => ({ ...state, userControl: false }))
            if (onUserControlEnd) onUserControlEnd()
        }, [onUserControlEnd])

        const handleListenScroll = useCallback(() => {
            setEvents((state) => ({ ...state, scrollPosY: scrollY }))
        }, [])

        useEffect(() => {
            window.addEventListener('scroll', handleListenScroll)
            return () => {
                window.removeEventListener('scroll', handleListenScroll)
            }
        }, [])

        useImperativeHandle(
            ref,
            () => ({
                startCameraTransitionToMaker,
                resetOrbit,
            }),
            [startCameraTransitionToMaker, resetOrbit]
        )

        const stopRotation = useMemo(() => {
            return (
                !enableRotation ||
                activeTransition ||
                userControl ||
                Boolean(markerHover) ||
                Boolean(selectedMarker) ||
                htmlElementHover
            )
        }, [
            activeTransition,
            userControl,
            markerHover,
            selectedMarker,
            enableRotation,
            htmlElementHover,
        ])

        const onLoadModels = useCallback(() => {
            setEvents((state) => ({ ...state, loadModels: true }))
        }, [])

        return (
            <div
                ref={container}
                style={{
                    position: 'absolute',
                    top: '0',
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            >
                <Canvas
                    style={{ width: '100%', height: '100%' }}
                    dpr={window.devicePixelRatio}
                    gl={{ antialias: true }}
                    camera={{
                        position: [0, 50, maxZoom],
                        onUpdate: (c) => c.updateProjectionMatrix(),
                    }}
                >
                    <color attach={'background'} args={['black']} />
                    <Stars />
                    <Controls
                        globe={{
                            minZoom,
                            maxZoom,
                            radius,
                        }}
                        ref={cameraControls}
                        loadModels={loadModels}
                        enableRotation={!stopRotation}
                        onUserControlStart={handleUserControlStart}
                        onUserControlEnd={handleUserControlEnd}
                    />
                    {edit && (
                        <PreviewMarker edit={edit} position={previewMarker} />
                    )}
                    <CameraPaths
                        ref={cameraPaths}
                        visiblePaths={visiblePaths}
                        loadModels={loadModels}
                    />

                    <React.Suspense fallback={null}>
                        <Markers
                            edit={edit}
                            markers={markers}
                            onClickMarker={handleClickMarker}
                            onHoverMarker={handleHoverMarker}
                            htmlElementHover={htmlElementHover}
                        />
                    </React.Suspense>
                    <React.Suspense
                        fallback={<Loading onUnMount={onLoadModels} />}
                    >
                        <Globe
                            ref={setGlobeRef}
                            edit={edit}
                            radius={radius}
                            onPointerMove={(position) => {
                                setPreviewMarker({
                                    ...position,
                                    point: scaleVectorByCoeff(
                                        position.point,
                                        coeff
                                    ),
                                })
                            }}
                            onPointerOut={() => setPreviewMarker(null)}
                            onPoinertDown={handleAddMarker}
                        />
                    </React.Suspense>
                </Canvas>

                <div style={{ position: 'absolute', top: '0' }}>
                    {markerHover && (
                        <div
                            className="w-32 cursor-pointer select-none"
                            onClick={() => {
                                handleClickMarker(markerHover)
                                setEvents((state) => ({
                                    ...state,
                                    htmlElementHover: false,
                                    markerHover: null,
                                }))
                            }}
                            onMouseLeave={() => {
                                if (!htmlElementHover) {
                                    setEvents((state) => ({
                                        ...state,
                                        htmlElementHover: false,
                                        markerHover: null,
                                    }))
                                }
                            }}
                            onMouseOver={() => {
                                if (htmlElementHover)
                                    setEvents((state) => ({
                                        ...state,
                                        htmlElementHover: true,
                                    }))
                            }}
                            // onWheel={(e) => e.preventDefault()}
                            style={{
                                transform: `translate(-50%, -0%) translate(${
                                    markerHover.positionOnCanvas.x
                                }px,${
                                    markerHover.positionOnCanvas.y - scrollPosY
                                }px)`,
                            }}
                        >
                            <div className="h-32 w-32 rounded-full bg-primary p-3">
                                <div className="w-full h-full bg-info rounded-full overflow-hidden">
                                    {markerHover.data?.image && (
                                        <img
                                            className="object-cover w-full h-full"
                                            src={markerHover.data.image}
                                            alt={markerHover.data.image}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="relative w-full px-2  -top-5 text-white text-center">
                                <div className="bg-blue-1 w-full">
                                    {markerHover.data?.country}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
)

export default GlobeFiber
