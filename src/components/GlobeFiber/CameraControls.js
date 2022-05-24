/* eslint-disable */
import React, {
    forwardRef,
    ForwardedRef,
    MutableRefObject,
    useEffect,
    useRef,
    useCallback,
    useState,
} from 'react'
import Tween from '@tweenjs/tween.js'
import {
    MOUSE,
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    MathUtils,
} from 'three'
import { ReactThreeFiber, extend, useFrame, useThree } from '@react-three/fiber'
import CameraControlsDefault from 'camera-controls'
import { useImperativeHandle } from 'react'
import { distanceTo } from '../../utils/three.utils'
import { createVector3 } from '../../utils/three.utils'
import useDebounce from './../../hooks/useDebounce'

const subsetOfTHREE = {
    MOUSE: MOUSE,
    Vector2: Vector2,
    Vector3: Vector3,
    Vector4: Vector4,
    Quaternion: Quaternion,
    Matrix4: Matrix4,
    Spherical: Spherical,
    Box3: Box3,
    Sphere: Sphere,
    Raycaster: Raycaster,
    MathUtils: {
        DEG2RAD: MathUtils.DEG2RAD,
        clamp: MathUtils.clamp,
    },
}

CameraControlsDefault.install({ THREE: subsetOfTHREE })
extend({ CameraControlsDefault })

export const CameraControls = forwardRef(
    (
        {
            enableRotation = true,
            globe,
            loadModels,
            onUserControlStart,
            onUserControlEnd,
        },
        ref
    ) => {
        const [initialize, setInitialize] = useState(false)
        const cameraControls = useRef(null)
        const camera = useThree((state) => state.camera)
        const renderer = useThree((state) => state.gl)

        const getCurrentState = useCallback(() => {
            const currentState = {
                cx: camera.position.x,
                cy: camera.position.y,
                cz: camera.position.z,
            }

            return currentState
        }, [camera])

        const tweenZoom = useCallback(
            ({ distance, duration = 250 }, cb) => {
                const source = getCurrentState()

                const camaeraDistanceToOrigin = distanceTo(
                    camera.position,
                    createVector3()
                )

                const ESCALAR = distance / camaeraDistanceToOrigin

                const target = {
                    cx: source.cx * ESCALAR,
                    cy: source.cy * ESCALAR,
                    cz: source.cz * ESCALAR,
                }

                const t = new Tween.Tween(source)
                    .to(target, duration)
                    .easing(
                        ESCALAR > 1
                            ? Tween.Easing.Quadratic.Out
                            : Tween.Easing.Quadratic.In
                    )
                    .onUpdate((obj) => {
                        cameraControls.current.camera.updateProjectionMatrix()
                        cameraControls.current.setPosition(
                            obj.cx,
                            obj.cy,
                            obj.cz
                        )
                    })
                    .onComplete(() => {
                        if (cb) cb()
                    })
                    .start()
            },
            [getCurrentState, camera]
        )

        const tweenPath = useCallback(
            ({ points = [], duration = 250 }, cb) => {
                const source = { progress: 0 }

                const target = { progress: points.length - 1 }
                const t = new Tween.Tween(source)
                    .to(target, duration)
                    .easing(Tween.Easing.Quadratic.Out)
                    .onUpdate((obj) => {
                        const point = points[Math.floor(obj.progress)]
                        cameraControls.current.camera.updateProjectionMatrix()
                        cameraControls.current.setLookAt(
                            point.x,
                            point.y,
                            point.z,
                            0,
                            0,
                            0,
                            false
                        )
                    })
                    .onComplete(() => {
                        if (cb) cb()
                    })
                    .start()
            },
            [getCurrentState, camera]
        )

        useFrame((_, delta) => {
            if (enableRotation) {
                cameraControls.current.azimuthAngle +=
                    2 * delta * MathUtils.DEG2RAD
            }

            cameraControls?.current.update(delta)
            Tween.update()
        })

        const setCameraControls = useCallback(() => {
            cameraControls.current.mouseButtons.right =
                CameraControlsDefault.ACTION.NONE
            cameraControls.current.draggingDampingFactor = 0.45
            cameraControls.current.azimuthRotateSpeed = 0.2
            cameraControls.current.polarRotateSpeed = 0.2
            cameraControls.current.minDistance = globe.minZoom
            cameraControls.current.maxDistance = globe.maxZoom
            // cameraControls.current.enable = false
        }, [globe])

        useEffect(() => {
            setCameraControls()
        }, [])

        // useDebounce(
        //     () => {
        //         if (loadModels && !initialize) {
        //             setInitialize(true)
        //             tweenZoom(
        //                 { distance: globe.maxZoom, duration: 1200 },
        //                 () => {
        //                     console.log('Tween zoom')
        //                     cameraControls.current.enable = true
        //                 }
        //             )
        //         }
        //     },
        //     400,
        //     [loadModels, initialize, globe]
        // )

        useEffect(() => {
            const handleTransition = () => {}

            const handleUserControlStart = () => {
                if (onUserControlStart) onUserControlStart()
            }
            const handleUserControlEnd = () => {
                if (onUserControlEnd) onUserControlEnd()
            }

            cameraControls?.current?.addEventListener(
                'controlstart',
                handleUserControlStart
            )
            cameraControls?.current?.addEventListener(
                'controlend',
                handleUserControlEnd
            )
            console.log('Entro')

            return () => {
                cameraControls?.current?.removeEventListener(
                    'controlstart',
                    handleUserControlStart
                )
                cameraControls?.current?.removeEventListener(
                    'controlend',
                    handleUserControlEnd
                )
            }
        }, [onUserControlStart, onUserControlEnd])

        useImperativeHandle(
            ref,
            () => ({
                camera: camera,
                tweenZoom,
                tweenPath,
                rotate: (azimuthAngle, polarAngle, enableTransition) => {
                    cameraControls.current.rotate(
                        azimuthAngle,
                        polarAngle,
                        enableTransition
                    )
                },
                reset: (azimuthAngle, polarAngle, enableTransition) => {
                    cameraControls.current.reset(enableTransition)
                },
                enableControls: (enable = true) => {
                    cameraControls.current.enable = enable
                },
            }),
            [camera]
        )

        return (
            <cameraControlsDefault
                ref={cameraControls}
                args={[camera, renderer.domElement]}
            />
        )
    }
)

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
