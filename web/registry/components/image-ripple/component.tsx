// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";

import useRippleDimensions from "./ripple-dimensions";
import useMouse from "./use-mouse";
import { useMousePositionRef } from "@/hooks/use-mouse-position";
import { OrthographicCamera, useFBO, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const fragment = `
uniform sampler2D uTexture;
uniform sampler2D uDisplacement;
uniform vec4 winResolution;
varying vec2 vUv;
float PI = 3.141592653589793238;

void main() {
  vec2 vUvScreen = gl_FragCoord.xy / winResolution.xy;

  vec4 displacement = texture2D(uDisplacement, vUvScreen);
  float theta = displacement.r*2.0*PI;

  vec2 dir = vec2(sin(theta),cos(theta));
  vec2 uv = vUvScreen + dir*displacement.r*0.075;
  vec4 color = texture2D(uTexture,uv);

  gl_FragColor = color;
}
`;

const vertex = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

function Model({ containerRef }) {
	const { viewport } = useThree();
	const texture = useTexture("/thumbnail.png");
	const meshRefs = useRef([]);
	const [meshes, setMeshes] = useState([]);
	// const mouse = useMouse();
	const mouse = useMousePositionRef(containerRef);
	const device = useRippleDimensions();
	const [prevMouse, setPrevMouse] = useState({ x: 0, y: 0 });
	const [currentWave, setCurrentWave] = useState(0);
	const { gl, camera } = useThree();

	const scene = new THREE.Scene();
	const max = 100;

	const uniforms = useRef({
		uDisplacement: { value: null },
		uTexture: { value: null },
		winResolution: {
			value: new THREE.Vector2(0, 0),
		},
	});

	const fboBase = useFBO(device.width, device.height);
	const fboTexture = useFBO(device.width, device.height);

	const { scene: imageScene, camera: imageCamera } = Images(viewport);

	useEffect(() => {
		const generatedMeshes = Array.from({ length: max }).map((_, i) => (
			<mesh
				key={i + "ripple"}
				position={[0, 0, 0]}
				ref={(el) => (meshRefs.current[i] = el)}
				rotation={[0, 0, Math.random()]}
				visible={false}
			>
				<planeGeometry args={[60, 60, 1, 1]} />
				<meshBasicMaterial transparent={true} map={texture} />
			</mesh>
		));
		setMeshes(generatedMeshes);
	}, [texture]);

	function setNewWave(x, y, currentWave) {
		const mesh = meshRefs.current[currentWave];
		if (mesh) {
			mesh.position.x = x;
			mesh.position.y = y;
			mesh.visible = true;
			mesh.material.opacity = 1;
			mesh.scale.x = 1.75;
			mesh.scale.y = 1.75;
		}
	}

	function trackMousePos(x, y) {
		if (Math.abs(x - prevMouse.x) > 0.1 || Math.abs(y - prevMouse.y) > 0.1) {
			setCurrentWave((currentWave + 1) % max);
			setNewWave(x, y, currentWave);
		}
		setPrevMouse({ x: x, y: y });
	}

	useFrame(({ gl, scene: finalScene }) => {
		const x = mouse.current.x - device.width / 2;
		const y = -mouse.current.y + device.height / 2;
		trackMousePos(x, y);
		meshRefs.current.forEach((mesh) => {
			if (mesh.visible) {
				mesh.rotation.z += 0.025;
				mesh.material.opacity *= 0.95;
				mesh.scale.x = 0.98 * mesh.scale.x + 0.155;
				mesh.scale.y = 0.98 * mesh.scale.y + 0.155;
			}
		});

		if (device.width > 0 && device.height > 0) {
			// uniforms.current.uTexture.value = imageTexture;

			// Render to base texture with meshes
			gl.setRenderTarget(fboBase);
			gl.clear();
			meshRefs.current.forEach((mesh) => {
				if (mesh.visible) {
					scene.add(mesh);
				}
			});
			gl.render(scene, camera);
			meshRefs.current.forEach((mesh) => {
				if (mesh.visible) {
					scene.remove(mesh);
				}
			});
			uniforms.current.uTexture.value = fboTexture.texture;

			gl.setRenderTarget(fboTexture);
			gl.render(imageScene, imageCamera);
			uniforms.current.uDisplacement.value = fboBase.texture;

			gl.setRenderTarget(null);
			gl.render(finalScene, camera);
			// Render the scene with updated displacement
			// gl.setRenderTarget(fboTexture);
			// gl.clear();
			// gl.render(scene, camera);
			// uniforms.current.uTexture.value = fboTexture.texture;
			// gl.setRenderTarget(null);

			uniforms.current.winResolution.value = new THREE.Vector2(
				device.width,
				device.height
			).multiplyScalar(device.pixelRatio);
		}
	}, 1);

	function Images(viewport) {
		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(
			viewport.width / -2,
			viewport.width / 2,
			viewport.height / 2,
			viewport.height / -2,
			-1000,
			1000
		);
		camera.position.z = 2;
		scene.add(camera);
		const geometry = new THREE.PlaneGeometry(1, 1);
		const group = new THREE.Group();
		const texture1 = useTexture("/itjustworks.jpg");
		const material1 = new THREE.MeshBasicMaterial({ map: texture1 });
		const image1 = new THREE.Mesh(geometry, material1);
		image1.position.x = -0.25 * viewport.width;
		image1.position.y = 0;
		image1.position.z = 1;
		image1.scale.x = viewport.width / 5;
		image1.scale.y = viewport.width / 4;
		group.add(image1);

		const texture2 = useTexture("/thumbnail2.png");
		const material2 = new THREE.MeshBasicMaterial({ map: texture2 });
		const image2 = new THREE.Mesh(geometry, material2);
		image2.position.x = 0;
		image2.position.y = 0;
		image2.position.z = 1;
		image2.scale.x = viewport.width / 5;
		image2.scale.y = viewport.width / 4;
		group.add(image2);

		const texture3 = useTexture("/thumbnail.png");
		const material3 = new THREE.MeshBasicMaterial({ map: texture3 });
		const image3 = new THREE.Mesh(geometry, material3);
		image3.position.x = 0.25 * viewport.width;
		image3.position.y = 0;
		image3.position.z = 1;
		image3.scale.x = viewport.width / 5;
		image3.scale.y = viewport.width / 4;
		group.add(image3);

		scene.add(group);
		return { scene, camera };
	}

	return (
		<group>
			{meshes}
			{/* <Images /> */}
			<mesh>
				<planeGeometry args={[device.width, device.height, 1, 1]} />
				<shaderMaterial
					// args={[device.width, device.height, 1]}
					vertexShader={vertex}
					fragmentShader={fragment}
					transparent={true}
					uniforms={uniforms.current}
				/>
			</mesh>
		</group>
	);
}

export default function ImageRipple() {
	const device = useRippleDimensions();
	const ref = useRef(null);

	if (!device.width || !device.height) {
		return null;
	}

	const frustumSize = device.height;
	const aspect = device.width / device.height;

	return (
		<div
			className="h-screen w-full relative bg-background text-foreground"
			ref={ref}
		>
			<Canvas>
				<OrthographicCamera
					makeDefault
					args={[
						(frustumSize * aspect) / -2,
						(frustumSize * aspect) / 2,
						frustumSize / 2,
						frustumSize / -2,
						-1000,
						1000,
					]}
					position={[0, 0, 2]}
				/>
				<Model containerRef={ref} />
			</Canvas>
			<article className="absolute w-full bottom-14  text-center">
				<h1 className="2xl:text-8xl text-7xl tracking-tighter uppercase">
					Independent
				</h1>
				<p className="2xl:text-2xl text-xl">
					Live for yourself, not for society.
				</p>
			</article>
		</div>
	);
}
