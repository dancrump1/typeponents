"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Canvas, extend, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Color, MathUtils, Vector3 } from "three";
import * as THREE from "three";

extend({ IcosahedronGeometry: THREE.IcosahedronGeometry });

// Credits:
// https://www.ui-layouts.com/components/mesh-gradients
// https://v0.app/chat/shader-svg-TcgLzaGaXRC

const vertexShader = `
uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;

// Classic Perlin 3D Noise functions
vec4 permute(vec4 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P) {
    vec3 Pi0 = floor(P);
    vec3 Pi1 = Pi0 + vec3(1.0);
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P);
    vec3 Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
}

void main() {
    vUv = uv;

    vDisplacement = cnoise(position + vec3(2.0 * u_time));
  
    vec3 newPosition = position + normal * (u_intensity * vDisplacement);
  
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectedPosition;
}
`;

const fragmentShader = `
uniform float u_intensity;
uniform float u_time;
uniform vec3 u_color;

varying vec2 vUv;
varying float vDisplacement;

// Function to generate random noise
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  float distort = 2.0 * vDisplacement * u_intensity * sin(vUv.y * 10.0 + u_time);
  vec3 color = mix(u_color, vec3(1.0, 1.0, 1.0), distort);

  // Add screen-space random noise
  float noise = random(gl_FragCoord.xy * u_time * 0.05) * 0.05; // tweak strength
  color += noise;

  gl_FragColor = vec4(color, 1.0);
}
`;

const GhostSVGElement = () => {
	const mesh = useRef<THREE.Mesh>(null);
	const hover = useRef(false);

	const uniforms = useMemo(
		() => ({
			u_time: { value: 0 },
			u_intensity: { value: 0.3 },
			u_color: { value: new Color("#ffd717") },
		}),
		[]
	);

	const targetPosition = useRef(new Vector3(0, 0, 0));
	const currentPosition = useRef(new Vector3(0, 0, 0));

	useFrame((state) => {
		const { clock, mouse } = state;

		if (mesh.current) {
			const material = mesh.current.material as THREE.ShaderMaterial;

			material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();

			material.uniforms.u_intensity.value = MathUtils.lerp(
				material.uniforms.u_intensity.value,
				hover.current ? 0.7 : 1,
				0.02
			);

			// Update target position based on mouse
			targetPosition.current.set(mouse.x * 0.3, mouse.y * 0.3, 0);
			currentPosition.current.lerp(targetPosition.current, 0.1);

			mesh.current.position.copy(currentPosition.current);
		}
	});

	return (
		<mesh
			ref={mesh}
			scale={1.5}
			position={[0, 0, 0]}
			onPointerOver={() => (hover.current = true)}
			onPointerOut={() => (hover.current = false)}
		>
			<icosahedronGeometry args={[2, 20]} />
			<shaderMaterial
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				uniforms={uniforms}
			/>
		</mesh>
	);
};

export default function GhostSVG() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	useEffect(() => {
		const rect = document.querySelector("svg")?.getBoundingClientRect();
		if (rect) {
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			const deltaX = (mousePosition.x - centerX) * 0.08;
			const deltaY = (mousePosition.y - centerY) * 0.08;

			const maxOffset = 8;
			setEyeOffset({
				x: Math.max(-maxOffset, Math.min(maxOffset, deltaX)),
				y: Math.max(-maxOffset, Math.min(maxOffset, deltaY)),
			});
		}
	}, [mousePosition]);

	return (
		<motion.div
			className="relative w-full max-w-sm mx-auto p-8 rounded-lg"
			animate={{
				y: [0, -8, 0],
				scaleY: [1, 1.08, 1],
			}}
			transition={{
				duration: 2.8,
				repeat: Number.POSITIVE_INFINITY,
				ease: "easeInOut",
			}}
			style={{ transformOrigin: "top center" }}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="231"
				height="289"
				viewBox="0 0 231 289"
				className="w-full h-auto"
			>
				<defs>
					<clipPath id="shapeClip">
						<path d="M230.809 115.385V249.411C230.809 269.923 214.985 287.282 194.495 288.411C184.544 288.949 175.364 285.718 168.26 280C159.746 273.154 147.769 273.461 139.178 280.23C132.638 285.384 124.381 288.462 115.379 288.462C106.377 288.462 98.1451 285.384 91.6055 280.23C82.912 273.385 70.9353 273.385 62.2415 280.23C55.7532 285.334 47.598 288.411 38.7246 288.462C17.4132 288.615 0 270.667 0 249.359V115.385C0 51.6667 51.6756 0 115.404 0C179.134 0 230.809 51.6667 230.809 115.385Z" />
					</clipPath>
				</defs>

				<foreignObject width="231" height="289" clipPath="url(#shapeClip)">
					<div className="w-full h-full">
						<Canvas>
							<GhostSVGElement />
						</Canvas>
					</div>
				</foreignObject>

				<motion.ellipse
					rx="20"
					ry="30"
					fill="currentColor"
					className="animate-blink"
					animate={{
						cx: 80 + eyeOffset.x,
						cy: 120 + eyeOffset.y,
					}}
					transition={{ type: "spring", stiffness: 150, damping: 15 }}
				/>
				<motion.ellipse
					rx="20"
					ry="30"
					fill="currentColor"
					className="animate-blink"
					animate={{
						cx: 150 + eyeOffset.x,
						cy: 120 + eyeOffset.y,
					}}
					transition={{ type: "spring", stiffness: 150, damping: 15 }}
				/>
			</svg>

			<style jsx>{`
				.animate-blink {
					animation: blink 3s infinite ease-in-out;
				}

				@keyframes blink {
					0%,
					90%,
					100% {
						ry: 30;
					}
					95% {
						ry: 3;
					}
				}
			`}</style>
		</motion.div>
	);
}
