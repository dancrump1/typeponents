# Cubes

- Categories: 3D & Canvas
- Tags: cursor-tracking, autoplay
- Import: `@/components/ui/cubes`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/cubes.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `gsap`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `gridSize` | `number` | `10` | — |
| `cubeSize` | `number` | — | — |
| `maxAngle` | `number` | `45` | — |
| `radius` | `number` | `3` | — |
| `easing` | `gsap.EaseString` | `"power3.out"` | — |
| `duration` | `Duration` | `{ enter: 0.3, leave: 0.6 }` | — |
| `cellGap` | `number | Gap` | — | — |
| `borderStyle` | `string` | `"1px solid #fff"` | — |
| `faceColor` | `string` | `"#060010"` | — |
| `shadow` | `string | boolean` | `false` | — |
| `autoAnimate` | `boolean` | `true` | — |
| `rippleOnClick` | `boolean` | `true` | — |
| `rippleColor` | `string` | `"#fff"` | — |
| `rippleSpeed` | `number` | `2` | — |

## Usage

```tsx
"use client";

import React, { useState } from "react";

import Cubes from "./component";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export default function Usage() {
	const [borderStyle, setBorderStyle] = useState("2px dashed #B19EEF");
	const [gridSize, setGridSize] = useState(10);
	const [maxAngle, setMaxAngle] = useState(45);
	const [radius, setRadius] = useState(3);
	const [autoAnimate, setAutoAnimate] = useState(true);
	const [rippleOnClick, setRippleOnClick] = useState(true);

	// Border style options for select
	const borderOptions = [
		{ value: "2px dotted #fff", label: "Dotted White" },
		{ value: "2px dashed #B19EEF", label: "Dashed Purple" },
		{ value: "3px solid #fff", label: "Solid White" },
	];

	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div style={{ height: "600px", position: "relative" }}>
				<Cubes
					faceColor="#1a1a2e"
					rippleColor="#ff6b6b"
					rippleSpeed={1.5}
					borderStyle={borderStyle}
					gridSize={gridSize}
					maxAngle={maxAngle}
					radius={radius}
					autoAnimate={autoAnimate}
					rippleOnClick={rippleOnClick}
				/>
			</div>
			<section>
				<label>Grid Size</label>
				<Slider
					defaultValue={[50]}
					max={100}
					step={1}
					className={"w-[60%]"}
					onChange={(value) => setGridSize(value)}
				/>
				<label>max angle</label>
				<Slider
					defaultValue={[50]}
					max={180}
					step={1}
					className={"w-[60%]"}
					onChange={(value) => setMaxAngle(value)}
				/>
				<label>radius</label>
				<Slider
					defaultValue={[5]}
					max={180}
					step={1}
					className={"w-[60%]"}
					onChange={(value) => setRadius(value)}
				/>
				<label>auto animate</label>
				<Checkbox
					defaultValue={true}
					className={"w-[60%]"}
					onChange={(value) => setAutoAnimate(value)}
				/>
			</section>
		</div>
	);
}
```

## Source

### `components/ui/cubes.tsx`

```tsx
import React, { useCallback, useEffect, useRef } from "react";

import gsap from "gsap";

interface Gap {
	row: number;
	col: number;
}
interface Duration {
	enter: number;
	leave: number;
}

export interface CubesProps {
	gridSize?: number;
	cubeSize?: number;
	maxAngle?: number;
	radius?: number;
	easing?: gsap.EaseString;
	duration?: Duration;
	cellGap?: number | Gap;
	borderStyle?: string;
	faceColor?: string;
	shadow?: boolean | string;
	autoAnimate?: boolean;
	rippleOnClick?: boolean;
	rippleColor?: string;
	rippleSpeed?: number;
}

const Cubes: React.FC<CubesProps> = ({
	gridSize = 10,
	cubeSize,
	maxAngle = 45,
	radius = 3,
	easing = "power3.out",
	duration = { enter: 0.3, leave: 0.6 },
	cellGap,
	borderStyle = "1px solid #fff",
	faceColor = "#060010",
	shadow = false,
	autoAnimate = true,
	rippleOnClick = true,
	rippleColor = "#fff",
	rippleSpeed = 2,
}) => {
	const sceneRef = useRef<HTMLDivElement | null>(null);
	const rafRef = useRef<number | null>(null);
	const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
	const userActiveRef = useRef(false);
	const simPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const simTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const simRAFRef = useRef<number | null>(null);

	const colGap =
		typeof cellGap === "number"
			? `${cellGap}px`
			: (cellGap as Gap)?.col !== undefined
				? `${(cellGap as Gap).col}px`
				: "5%";
	const rowGap =
		typeof cellGap === "number"
			? `${cellGap}px`
			: (cellGap as Gap)?.row !== undefined
				? `${(cellGap as Gap).row}px`
				: "5%";

	const enterDur = duration.enter;
	const leaveDur = duration.leave;

	const tiltAt = useCallback(
		(rowCenter: number, colCenter: number) => {
			if (!sceneRef.current) return;
			sceneRef.current
				.querySelectorAll<HTMLDivElement>(".cube")
				.forEach((cube) => {
					const r = +cube.dataset.row!;
					const c = +cube.dataset.col!;
					const dist = Math.hypot(r - rowCenter, c - colCenter);
					if (dist <= radius) {
						const pct = 1 - dist / radius;
						const angle = pct * maxAngle;
						gsap.to(cube, {
							duration: enterDur,
							ease: easing,
							overwrite: true,
							rotateX: -angle,
							rotateY: angle,
						});
					} else {
						gsap.to(cube, {
							duration: leaveDur,
							ease: "power3.out",
							overwrite: true,
							rotateX: 0,
							rotateY: 0,
						});
					}
				});
		},
		[radius, maxAngle, enterDur, leaveDur, easing]
	);

	const onPointerMove = useCallback(
		(e: PointerEvent) => {
			userActiveRef.current = true;
			if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

			const rect = sceneRef.current!.getBoundingClientRect();
			const cellW = rect.width / gridSize;
			const cellH = rect.height / gridSize;
			const colCenter = (e.clientX - rect.left) / cellW;
			const rowCenter = (e.clientY - rect.top) / cellH;

			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			rafRef.current = requestAnimationFrame(() =>
				tiltAt(rowCenter, colCenter)
			);

			idleTimerRef.current = setTimeout(() => {
				userActiveRef.current = false;
			}, 3000);
		},
		[gridSize, tiltAt]
	);

	const resetAll = useCallback(() => {
		if (!sceneRef.current) return;
		sceneRef.current
			.querySelectorAll<HTMLDivElement>(".cube")
			.forEach((cube) =>
				gsap.to(cube, {
					duration: leaveDur,
					rotateX: 0,
					rotateY: 0,
					ease: "power3.out",
				})
			);
	}, [leaveDur]);

	const onClick = useCallback(
		(e: MouseEvent) => {
			if (!rippleOnClick || !sceneRef.current) return;
			const rect = sceneRef.current.getBoundingClientRect();
			const cellW = rect.width / gridSize;
			const cellH = rect.height / gridSize;
			const colHit = Math.floor((e.clientX - rect.left) / cellW);
			const rowHit = Math.floor((e.clientY - rect.top) / cellH);

			const baseRingDelay = 0.15;
			const baseAnimDur = 0.3;
			const baseHold = 0.6;

			const spreadDelay = baseRingDelay / rippleSpeed;
			const animDuration = baseAnimDur / rippleSpeed;
			const holdTime = baseHold / rippleSpeed;

			const rings: Record<number, HTMLDivElement[]> = {};
			sceneRef.current
				.querySelectorAll<HTMLDivElement>(".cube")
				.forEach((cube) => {
					const r = +cube.dataset.row!;
					const c = +cube.dataset.col!;
					const dist = Math.hypot(r - rowHit, c - colHit);
					const ring = Math.round(dist);
					if (!rings[ring]) rings[ring] = [];
					rings[ring].push(cube);
				});

			Object.keys(rings)
				.map(Number)
				.sort((a, b) => a - b)
				.forEach((ring) => {
					const delay = ring * spreadDelay;
					const faces = rings[ring].flatMap((cube) =>
						Array.from(cube.querySelectorAll<HTMLElement>(".cube-face"))
					);

					gsap.to(faces, {
						backgroundColor: rippleColor,
						duration: animDuration,
						delay,
						ease: "power3.out",
					});
					gsap.to(faces, {
						backgroundColor: faceColor,
						duration: animDuration,
						delay: delay + animDuration + holdTime,
						ease: "power3.out",
					});
				});
		},
		[rippleOnClick, gridSize, faceColor, rippleColor, rippleSpeed]
	);

	useEffect(() => {
		if (!autoAnimate || !sceneRef.current) return;
		simPosRef.current = {
			x: Math.random() * gridSize,
			y: Math.random() * gridSize,
		};
		simTargetRef.current = {
			x: Math.random() * gridSize,
			y: Math.random() * gridSize,
		};
		const speed = 0.02;
		const loop = () => {
			if (!userActiveRef.current) {
				const pos = simPosRef.current;
				const tgt = simTargetRef.current;
				pos.x += (tgt.x - pos.x) * speed;
				pos.y += (tgt.y - pos.y) * speed;
				tiltAt(pos.y, pos.x);
				if (Math.hypot(pos.x - tgt.x, pos.y - tgt.y) < 0.1) {
					simTargetRef.current = {
						x: Math.random() * gridSize,
						y: Math.random() * gridSize,
					};
				}
			}
			simRAFRef.current = requestAnimationFrame(loop);
		};
		simRAFRef.current = requestAnimationFrame(loop);
		return () => {
			if (simRAFRef.current != null) cancelAnimationFrame(simRAFRef.current);
		};
	}, [autoAnimate, gridSize, tiltAt]);

	useEffect(() => {
		const el = sceneRef.current;
		if (!el) return;
		el.addEventListener("pointermove", onPointerMove);
		el.addEventListener("pointerleave", resetAll);
		el.addEventListener("click", onClick);
		return () => {
			el.removeEventListener("pointermove", onPointerMove);
			el.removeEventListener("pointerleave", resetAll);
			el.removeEventListener("click", onClick);
			if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
			if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
		};
	}, [onPointerMove, resetAll, onClick]);

	const cells = Array.from({ length: gridSize });
	const sceneStyle: React.CSSProperties = {
		gridTemplateColumns: cubeSize
			? `repeat(${gridSize}, ${cubeSize}px)`
			: `repeat(${gridSize}, 1fr)`,
		gridTemplateRows: cubeSize
			? `repeat(${gridSize}, ${cubeSize}px)`
			: `repeat(${gridSize}, 1fr)`,
		columnGap: colGap,
		rowGap: rowGap,
		perspective: "99999999px",
		gridAutoRows: "1fr",
	};
	const wrapperStyle = {
		"--cube-face-border": borderStyle,
		"--cube-face-bg": faceColor,
		"--cube-face-shadow":
			shadow === true ? "0 0 6px rgba(0,0,0,.5)" : shadow || "none",
		...(cubeSize
			? {
					width: `${gridSize * cubeSize}px`,
					height: `${gridSize * cubeSize}px`,
				}
			: {}),
	} as React.CSSProperties;

	return (
		<div
			className="relative w-1/2 max-md:w-11/12 aspect-square"
			style={wrapperStyle}
		>
			<div ref={sceneRef} className="grid w-full h-full" style={sceneStyle}>
				{cells.map((_, r) =>
					cells.map((__, c) => (
						<div
							key={`${r}-${c}`}
							className="cube relative w-full h-full aspect-square transform-3d"
							data-row={r}
							data-col={c}
						>
							<span className="absolute pointer-events-none -inset-9" />

							<div
								className="cube-face absolute inset-0 flex items-center justify-center"
								style={{
									background: "var(--cube-face-bg)",
									border: "var(--cube-face-border)",
									boxShadow: "var(--cube-face-shadow)",
									transform: "translateY(-50%) rotateX(90deg)",
								}}
							/>
							<div
								className="cube-face absolute inset-0 flex items-center justify-center"
								style={{
									background: "var(--cube-face-bg)",
									border: "var(--cube-face-border)",
									boxShadow: "var(--cube-face-shadow)",
									transform: "translateY(50%) rotateX(-90deg)",
								}}
							/>
							<div
								className="cube-face absolute inset-0 flex items-center justify-center"
								style={{
									background: "var(--cube-face-bg)",
									border: "var(--cube-face-border)",
									boxShadow: "var(--cube-face-shadow)",
									transform: "translateX(-50%) rotateY(-90deg)",
								}}
							/>
							<div
								className="cube-face absolute inset-0 flex items-center justify-center"
								style={{
									background: "var(--cube-face-bg)",
									border: "var(--cube-face-border)",
									boxShadow: "var(--cube-face-shadow)",
									transform: "translateX(50%) rotateY(90deg)",
								}}
							/>
							<div
								className="cube-face absolute inset-0 flex items-center justify-center"
								style={{
									background: "var(--cube-face-bg)",
									border: "var(--cube-face-border)",
									boxShadow: "var(--cube-face-shadow)",
									transform:
										"rotateY(-90deg) translateX(50%) rotateY(90deg)",
								}}
							/>
							<div
								className="cube-face absolute inset-0 flex items-center justify-center"
								style={{
									background: "var(--cube-face-bg)",
									border: "var(--cube-face-border)",
									boxShadow: "var(--cube-face-shadow)",
									transform:
										"rotateY(90deg) translateX(-50%) rotateY(-90deg)",
								}}
							/>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Cubes;
```
