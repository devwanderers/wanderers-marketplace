import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import videoUrl from "../assets/video/stars.mp4";

const BackgroundVideo = (props) => {
	const scene = useThree((state) => state.scene);

	useEffect(() => {
		const vid = document.createElement("video");
		vid.src = videoUrl;
		vid.crossOrigin = "Anonymous";
		vid.loop = true;
		vid.muted = true;
		vid.play();

		const bgTexture = new THREE.VideoTexture(vid);
		bgTexture.minFilter = THREE.LinearFilter;
		bgTexture.magFilter = THREE.LinearFilter;
		bgTexture.format = THREE.RGBFormat;

		scene.background = bgTexture;
	}, [scene]);

	return null;
};

export default BackgroundVideo;
