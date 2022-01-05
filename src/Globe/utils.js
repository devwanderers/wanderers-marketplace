const THREE = require("three");

function distanceTo(V1, V2) {
	return new THREE.Vector3(V1.x, V1.y, V1.z).distanceTo(
		new THREE.Vector3(V2.x, V2.y, V2.z)
	);
}
function getAngle(V1, V2) {
	const _V1 = new THREE.Vector3(V1.x, V1.y, V1.z);
	const _V2 = new THREE.Vector3(V2.x, V2.y, V2.z);

	return _V1.angleTo(_V2);
}

function radiansToDegree(radians) {
	return radians * (180 / Math.PI);
}
function degreeToRadians(degree) {
	return degree * (Math.PI / 180);
}

module.exports = { distanceTo, getAngle, radiansToDegree, degreeToRadians };
