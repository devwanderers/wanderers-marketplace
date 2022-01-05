/* eslint-disable no-loss-of-precision */
import React, { Component } from 'react'
import Globe from '../../Globe/Globe'
import * as THREE from 'three'
import { AnimatePresence, motion } from 'framer-motion'

class GlobeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: this.props.data ? [...this.props.data] : [],
            marker: null,
            markers: this.props.data.reduce(
                (acc, { label, image }) => ({
                    ...acc,
                    [label]: {
                        label,
                        image,
                    },
                }),
                {}
            ),
            enableClick: true,
        }

        this.canvasRef = React.createRef()
        this.htmlRef = React.createRef()
    }

    componentDidMount() {
        const { width, height } = this.props
        this.clock = new THREE.Clock()
        this.pointer = new THREE.Vector2()
        this.globe = new Globe(width, height, {
            htmlContainer: this.htmlRef.current,
            data: this.state.data,
            // mode: 'addMarker',
        })

        this.canvasRef.current.appendChild(this.globe.domElement)
        this.globe.init()
        this.globe.initGui()
        // this.globe.enabledRotation = false
        this.initListeners()
        this.initCameraControlsListeners()
        this.start()
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.width !== this.props.width ||
            prevProps.height !== this.props.height
        ) {
            this.updateSize()
        }
    }

    componentWillUnmount() {
        this.stop()
        this.removeListeners()
        this.removeCameraControlsListeners()
        this.globe.destroy()
    }

    addMarker = () => {
        const intersect = this.globe.intersect[0]

        const coeff = (this.globe.radius + 4) / this.globe.radius

        const point = {
            x: intersect.point.x * coeff,
            y: intersect.point.y * coeff,
            z: intersect.point.z * coeff,
        }

        this.setState({
            data: [
                ...this.state.data,
                {
                    coordinates: {
                        x: point.x,
                        y: point.y,
                        z: point.z,
                    },
                },
            ],
        })

        if (typeof this.props.onAddMarker === 'function') {
            this.props.onAddMarker({
                coordinates: {
                    x: point.x,
                    y: point.y,
                    z: point.z,
                },
            })
        }

        this.globe.addMarker(point.x, point.y, point.z, 'Hi')
    }

    handleOnClickMarker = () => {
        const marker = this.globe.getSelectedMaker()
        if (marker === -1) return
        this.goToMarkerSelected(marker.label)
        this.props.onClickMarker(marker.label)
    }

    goToMarkerSelected = (marker) => {
        const _marker =
            typeof marker !== 'string'
                ? marker
                : this.globe.getMarkerByLabel(marker)
        if (_marker === -1) return

        this.globe.stopTweenAnimation()
        // const data = marker.getData()
        const point = new THREE.Vector3(
            _marker.posX,
            _marker.posY,
            _marker.posZ
        )
        this.globe.moveCameraToMarker(point)
    }

    moveCameraToOriginalOrbit = () => {
        this.globe.prevMarkerSelected = null
        this.globe.cameraToOriginalOrbit()
    }

    updateSize = () => {
        const { width, height } = this.props
        this.globe.width = width
        this.globe.height = height
        this.globe.camera.aspect = width / height
        this.globe.camera.updateProjectionMatrix()

        this.globe.renderer.setSize(width, height)
    }

    onMouseMove = (e) => {
        const topOffset =
            this.globe.domElement.getBoundingClientRect().top +
            document.documentElement.scrollTop

        this.globe.pointer.x =
            (e.pageX / this.globe.domElement.clientWidth) * 2 - 1
        this.globe.pointer.y =
            -((e.pageY - topOffset) / this.globe.domElement.clientHeight) * 2 +
            1
    }

    onMouseClick = (e) => {
        if (!this.state.enableClick) return

        this.setState({ enableClick: false })
        if (
            this.globe.intersect.length > 0 &&
            this.globe.mode === 'addMarker'
        ) {
            this.addMarker()
        }
        if (this.globe.intersects.length > 0) {
            this.handleOnClickMarker()
        }

        setTimeout(() => {
            this.setState({ enableClick: true })
        }, 1000)
    }

    initListeners = () => {
        window.addEventListener('resize', this.onWindowResize, false)
        this.canvasRef.current.addEventListener(
            'mousemove',
            this.onMouseMove,
            false
        )
        this.canvasRef.current.addEventListener(
            'click',
            this.onMouseClick,
            false
        )
    }

    removeListeners = () => {
        window.removeEventListener('resize', this.onWindowResize)
        this.canvasRef.current.removeEventListener(
            'mousemove',
            this.onMouseMove
        )
        this.canvasRef.current.removeEventListener('click', this.onMouseClick)
    }

    onReset = () => {
        this.globe.cameraControls.removeEventListener('rest', this.onReset)
        this.globe.userDragging = false
        this.globe.enabledRotation = true
    }

    onControlStart = () => {
        this.globe.cameraControls.removeEventListener('rest', this.onReset)
        this.globe.userDragging = true
        this.globe.enabledRotation = false
    }

    onControlEnd = () => {
        if (this.globe.hasIntersected()) return
        if (
            this.globe.cameraControls.active &&
            this.globe.cameraControls.enabled
        ) {
            this.globe.cameraControls.addEventListener('rest', this.onReset)
        } else {
            this.onReset()
        }
    }

    onTransitionStart = () => {
        if (this.globe.userDragging && !this.globe.cameraControls.enabled)
            return

        this.enabledRotation = false
        this.globe.cameraControls.addEventListener('reset', this.onReset)
    }

    initCameraControlsListeners = () => {
        this.globe.cameraControls.addEventListener(
            'controlstart',
            this.onControlStart
        )
        this.globe.cameraControls.addEventListener(
            'controlend',
            this.onControlEnd
        )
        this.globe.cameraControls.addEventListener(
            'transitionstart',
            this.onTransitionStart
        )
    }

    removeCameraControlsListeners = () => {
        this.globe.cameraControls.removeEventListener(
            'controlstart',
            this.onControlStart
        )
        this.globe.cameraControls.removeEventListener(
            'controlend',
            this.onControlEnd
        )
        this.globe.cameraControls.removeEventListener(
            'transitionstart',
            this.onTransitionStart
        )
    }

    checkMarkerHover = () => {
        const marker = this.globe.markers.reduce((acc, m) => {
            if (acc) return acc
            if (m.markerHover) return m
            return acc
        }, null)

        if (marker) {
            const position = marker.getMakerPositionOnCanvas()
            if (
                JSON.stringify(position) !==
                JSON.stringify(this.state.marker?.position)
            ) {
                this.setState({
                    marker: { label: marker.label, position: position },
                })
            }
        } else if (this.state.marker) {
            this.setState({ marker: null })
        }
    }

    animate = () => {
        const delta = this.clock.getDelta()
        if (this.globe) {
            this.checkMarkerHover()
            this.globe.tick(delta, this.pointer)
        }
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop = () => {
        cancelAnimationFrame(this.frameId)
    }

    render() {
        const { width, height } = this.props
        const { marker, markers } = this.state

        return (
            <div className="relative" style={{ width, height }}>
                <div ref={this.htmlRef} className="absolute left-0 right-0 ">
                    <AnimatePresence>
                        {marker && (
                            <motion.div
                                className="w-32 cursor-pointer select-none"
                                onClick={() => {
                                    this.handleOnClickMarker()
                                }}
                                // onWheel={(e) => e.preventDefault()}
                                style={{
                                    transform: `translate(-50%, -0%) translate(${marker.position.x}px,${marker.position.y}px)`,
                                }}
                                initial={{
                                    transform: 'translate(-50%, -0%)',
                                    // 128 is the width of div elemnent
                                    x: marker.position.x - 128 / 2,
                                    y: marker.position.y,
                                    scale: 0.4,
                                }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.4 }}
                                transition={{
                                    delay: 0.01,
                                }}
                            >
                                <div className="h-32 w-32 rounded-full bg-primary p-3">
                                    <div className="w-full h-full bg-info rounded-full overflow-hidden">
                                        <img
                                            className="object-cover w-full h-full"
                                            src={markers[marker.label].image}
                                            alt={markers[marker.label].image}
                                        />
                                    </div>
                                </div>
                                <div className="relative w-full px-2  -top-5 text-white text-center">
                                    <div className="bg-blue-1 w-full">
                                        {marker.label}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div ref={this.canvasRef} className="w-full h-full"></div>
            </div>
        )
    }
}

export default GlobeComponent
