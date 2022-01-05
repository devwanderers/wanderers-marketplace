const THREE = require('three')

const calculatePositionOnCanvas = function () {
    const topOffset =
        this.canvas.getBoundingClientRect().top +
        document.documentElement.scrollTop
    const widthHalf = this.opts.canvasWidth / 2
    const heightHalf = this.opts.canvasHeight / 2
    const temp = this.marker.position.clone()
    temp.project(this.camera)
    temp.x = temp.x * widthHalf + widthHalf
    temp.y = -(temp.y * heightHalf) + heightHalf - topOffset

    return temp
}

function Marker(
    posX,
    posY,
    posZ,
    label,
    globe,
    camera,
    canvas,
    htmlContainer,
    _opts
) {
    this.posX = posX
    this.posY = posY
    this.posZ = posZ
    this.globe = globe
    this.htmlContainer = htmlContainer
    this.showHtml = false
    this.camera = camera
    this.label = label
    this.markerHover = false
    this.canvas = canvas

    const opts = {
        canvasWidth: 0,
        canvasHeight: 0,
        radius: 5,
        segments: 32,
        color: 0x00ff00,
        lineHeight: 45,
        lineWidth: 8,
        highLightColor: 0x00ff00,
    }

    if (_opts) {
        for (var i in opts) {
            if (_opts[i] !== undefined) {
                opts[i] = _opts[i]
            }
        }
    }

    this.opts = opts

    this.normal = new THREE.Vector3(this.posX, this.posY, this.posZ)
    this.normal.sub(globe.position)

    this.markerGeometry = new THREE.CircleGeometry(opts.radius, opts.segments)
    this.markerMaterial = new THREE.MeshBasicMaterial({ color: opts.color })
    // this.markerMaterial.side = THREE.DoubleSide
    this.marker = new THREE.Mesh(this.markerGeometry, this.markerMaterial)

    this.marker.lookAt(this.normal)
    this.marker.position.copy(
        new THREE.Vector3(this.posX, this.posY, this.posZ)
    )

    this.highlightedMaterial = new THREE.MeshBasicMaterial({
        wireframe: true,
        color: opts.highLightColor,
    })

    const lightTrailGeo = new THREE.PlaneGeometry(
        opts.lineWidth,
        opts.lineHeight
    )
    const lightTrailTexture = new THREE.TextureLoader().load('img/lightray.jpg')
    const lightTrailMaterial = new THREE.MeshBasicMaterial({
        map: lightTrailTexture,
    })

    lightTrailMaterial.transparent = true
    lightTrailMaterial.blending = THREE.AdditiveBlending

    this.lightTrailMesh1 = new THREE.Mesh(lightTrailGeo, lightTrailMaterial)

    this.lightTrailMesh1.position.z = opts.lineHeight / 2
    this.lightTrailMesh1.rotateX((-90 * Math.PI) / 180)
    this.lightTrailMesh1.material.side = THREE.DoubleSide

    this.marker.add(this.lightTrailMesh1)

    this.lightTrailMesh2 = new THREE.Mesh(lightTrailGeo, lightTrailMaterial)
    this.lightTrailMesh2.position.z = opts.lineHeight / 2
    this.lightTrailMesh2.rotateX((-90 * Math.PI) / 180)
    this.lightTrailMesh2.rotateY((90 * Math.PI) / 180)
    this.lightTrailMesh2.material.side = THREE.DoubleSide

    this.marker.add(this.lightTrailMesh2)

    this.globe.add(this.marker)

    // this.element = document.createElement('div')
    // this.element.textContent = this.label

    // this.element.style.color = '#ff0'
    // this.element.style.position = 'absolute'
    // this.element.style.left = 0
    // this.element.style.top = 0
}

Marker.prototype.selected = function () {
    this.marker.remove(this.lightTrailMesh1)
    this.marker.remove(this.lightTrailMesh2)
    this.marker.material = this.highlightedMaterial
    console.log('selected')
    this.markerHover = true
}

Marker.prototype.unSelected = function () {
    this.marker.add(this.lightTrailMesh1)
    this.marker.add(this.lightTrailMesh2)
    this.marker.material = this.markerMaterial
    this.markerHover = false

    // if (this.showHtml) {
    //     this.htmlContainer.removeChild(this.element)
    //     this.showHtml = false
    // }
}

Marker.prototype.getMakerPositionOnCanvas = function () {
    const pos = calculatePositionOnCanvas.call(this)
    const { x, y, z } = pos
    return { x, y, z }
}

Marker.prototype.clearHtml = function () {
    if (this.showHtml) {
        this.htmlContainer.removeChild(this.element)
        this.showHtml = false
    }
}

Marker.prototype.setEnabledHtml = function (enable) {
    this.enableHtml = enable
}

module.exports = Marker
