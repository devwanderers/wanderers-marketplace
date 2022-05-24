import * as THREE from 'three'

export const distanceTo = (V1, V2) => {
    return new THREE.Vector3(V1.x, V1.y, V1.z).distanceTo(
        new THREE.Vector3(V2.x, V2.y, V2.z)
    )
}
export const getAngle = (V1, V2) => {
    const _V1 = new THREE.Vector3(V1.x, V1.y, V1.z)
    const _V2 = new THREE.Vector3(V2.x, V2.y, V2.z)

    return _V1.angleTo(_V2)
}

export const radiansToDegree = (radians) => {
    return radians * (180 / Math.PI)
}

export const degreeToRadians = (degree) => {
    return degree * (Math.PI / 180)
}

export const createVector3 = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z)

export const createArc = (start, end, clockWise = false, smoothness = 150) => {
    const cb = createVector3()
    const ab = createVector3()
    const normal = createVector3()

    cb.subVectors(createVector3(), end)
    ab.subVectors(start, end)
    cb.cross(ab)
    normal.copy(cb).normalize()

    let angle = getAngle(start, end)
    console.log({ angle })

    if (clockWise) angle = angle - Math.PI * 2

    const angleDelta = angle / (smoothness - 1)

    console.log({ angleDelta })

    const points = []

    for (let index = 0; index < smoothness; index++) {
        const point = createVector3(start.x, start.y, start.z).applyAxisAngle(
            normal,
            angleDelta * index
        )
        // console.log({ point });
        points.push(point)
    }

    return points
}
