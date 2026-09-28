# CSS Box

Six-sided 3D box that holds any content on each face, spun by dragging or snapped to a named side.

**Interaction.** Dragging across the box turns it in both directions and it springs to a stop when you let go; asking for a particular face rotates the box around until that side is square to you.

- Categories: Carousels, Images
- Tags: spring, drag, cursor-tracking
- Import: `@/components/ui/css-box`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/css-box.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Usage

```tsx
"use client";

import React, { useRef, useEffect } from "react";

import Image from "next/image";

import CSSBox, { CSSBoxRef } from "./component";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


const BoxText = ({
	children,
	className,
	i,
}: {
	children: React.ReactNode
	className?: string
	i: number
}) => (
	<div
		className={cn(
			"w-full h-full uppercase text-white flex items-center justify-center p-0 text-2xl md:text-3xl font-bold",
			className
		)}
	>
		{children}
	</div>
)

function CSSBoxHoverDemo() {
	const boxRefs = useRef<(CSSBoxRef | null)[]>([])
	const isRotating = useRef<boolean[]>([])
	const currentRotations = useRef<number[]>([])

	const boxes = [
		{ text: "January 15, 2025", size: 300 },
		{ text: "Live Q&A", size: 200 },
		{ text: "10:00", size: 120 },
		{ text: "to", size: 70 },
		{ text: "11:30", size: 120 },
		{ text: "CET", size: 120 },
		{ text: "Online", size: 180 },
		{ text: "Recording Available", size: 380 },
		{ text: "In English", size: 220 },
		{ text: "Register Now", size: 280 },
		{ text: "Free Access", size: 240 },
	]

	useEffect(() => {
		currentRotations.current = new Array(boxes.length).fill(0)
	}, [])

	const handleHover = async (index: number) => {
		if (isRotating.current[index]) return

		isRotating.current[index] = true
		const box = boxRefs.current[index]
		if (!box) return

		const nextRotation = currentRotations.current[index] + 90
		currentRotations.current[index] = nextRotation

		box.rotateTo(0, nextRotation)

		isRotating.current[index] = false
	}

	return (
		<div className="flex flex-col items-center justify-center w-dvw h-dvh bg-[#111]">
			{boxes.map(({ text, size }, index) => (
				<CSSBox
					key={index}
					ref={(el) => {
						if (el) {
							boxRefs.current[index] = el
							isRotating.current[index] = false
							currentRotations.current[index] = 0
						}
					}}
					width={size}
					height={35}
					depth={size}
					draggable={false}
					className="hover:z-10"
					onMouseEnter={() => handleHover(index)}
					faces={{
						front: <BoxText i={index}>{text}</BoxText>,
						back: (
							<BoxText i={index} className="">
								{text}
							</BoxText>
						),
						left: <BoxText i={index}>{text}</BoxText>,
						right: (
							<BoxText i={index} className="">
								{text}
							</BoxText>
						),
					}}
				/>
			))}
		</div>
	)
}


export default function Usage() {
	const cubeRef = useRef<CSSBoxRef>(null);

	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<CSSBoxHoverDemo />
			<>
				<CSSBox
					ref={cubeRef}
					width={220}
					height={220}
					depth={220}
					perspective={800}
					draggable
					faces={{
						front: (
							<Image
								width={100}
								height={100}
								src="/itjustworks.jpg"
								alt="Front"
							/>
						),
						back: (
							<Image
								src="/itjustworks.jpg"
								width={100}
								height={100}
								alt="Back"
							/>
						),
						left: (
							<Image
								width={100}
								height={100}
								src="/itjustworks.jpg"
								alt="Left"
							/>
						),
						right: (
							<Image
								src="/itjustworks.jpg"
								width={100}
								height={100}
								alt="Right"
							/>
						),
						top: (
							<Image
								width={100}
								height={100}
								src="/itjustworks.jpg"
								alt="Top"
							/>
						),
						bottom: (
							<Image
								width={100}
								height={100}
								src="/itjustworks.jpg"
								alt="Bottom"
							/>
						),
					}}
				/>

				<Button onClick={() => cubeRef.current?.showTop()}>Show Top</Button>
			</>{" "}
		</div>
	);
}
```

## Source

### `components/ui/css-box.tsx`

```tsx
"use client";

import {
	forwardRef,
	ReactNode,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
} from "react";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface FaceProps {
	transform: string;
	className?: string;
	showBackface?: boolean;
	children?: ReactNode;
	style?: React.CSSProperties;
}

const CubeFace = ({
	transform,
	className,
	showBackface,
	children,
	style,
}: FaceProps) => (
	<div
		className={cn(
			"absolute",
			showBackface ? "backface-visible" : "backface-hidden",
			className
		)}
		style={{ transform, ...style }}
	>
		{children}
	</div>
);

interface CubeFaces {
	front?: ReactNode;
	back?: ReactNode;
	right?: ReactNode;
	left?: ReactNode;
	top?: ReactNode;
	bottom?: ReactNode;
}

export interface CSSBoxRef {
	showFront: () => void;
	showBack: () => void;
	showLeft: () => void;
	showRight: () => void;
	showTop: () => void;
	showBottom: () => void;
	rotateTo: (x: number, y: number) => void;
	getCurrentRotation: () => { x: number; y: number };
}

interface CSSBoxProps extends React.HTMLProps<HTMLDivElement> {
	width: number;
	height: number;
	depth: number;
	className?: string;
	perspective?: number;
	stiffness?: number;
	damping?: number;
	showBackface?: boolean;
	faces?: CubeFaces;
	draggable?: boolean;
}

const CSSBox = forwardRef<CSSBoxRef, CSSBoxProps>(
	(
		{
			width,
			height,
			depth,
			className,
			perspective = 600,
			stiffness = 100,
			damping = 30,
			showBackface = false,
			faces = {},
			draggable = true,
			...props
		},
		ref
	) => {
		const isDragging = useRef(false);
		const startPosition = useRef({ x: 0, y: 0 });
		const startRotation = useRef({ x: 0, y: 0 });

		const baseRotateX = useMotionValue(0);
		const baseRotateY = useMotionValue(0);

		const springRotateX = useSpring(baseRotateX, {
			stiffness,
			damping,
			...(isDragging.current ? { stiffness: stiffness / 2 } : {}),
		});
		const springRotateY = useSpring(baseRotateY, {
			stiffness,
			damping,
			...(isDragging.current ? { stiffness: stiffness / 2 } : {}),
		});

		const currentRotation = useRef({ x: 0, y: 0 });

		useImperativeHandle(
			ref,
			() => ({
				showFront: () => {
					baseRotateX.set(0);
					baseRotateY.set(0);
				},
				showBack: () => {
					baseRotateX.set(0);
					baseRotateY.set(180);
				},
				showLeft: () => {
					baseRotateX.set(0);
					baseRotateY.set(-90);
				},
				showRight: () => {
					baseRotateX.set(0);
					baseRotateY.set(90);
				},
				showTop: () => {
					baseRotateX.set(-90);
					baseRotateY.set(0);
				},
				showBottom: () => {
					baseRotateX.set(90);
					baseRotateY.set(0);
				},
				rotateTo: (x: number, y: number) => {
					baseRotateX.set(x);
					baseRotateY.set(y);
				},

				getCurrentRotation: () => currentRotation.current,
			}),
			[]
		);

		const transform = useTransform(
			[springRotateX, springRotateY],
			([x, y]) =>
				`translateZ(-${depth / 2}px) rotateX(${x}deg) rotateY(${y}deg)`
		);
		const handleStart = useCallback(
			(e: React.MouseEvent | React.TouchEvent) => {
				if (!draggable) return;
				isDragging.current = true;
				const point = "touches" in e ? e.touches[0] : e;
				startPosition.current = { x: point.clientX, y: point.clientY };
				startRotation.current = {
					x: baseRotateX.get(),
					y: baseRotateY.get(),
				};
			},
			[draggable]
		);

		const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
			if (!isDragging.current) return;
			const point = "touches" in e ? e.touches[0] : e;
			const deltaX = point.clientX - startPosition.current.x;
			const deltaY = point.clientY - startPosition.current.y;
			baseRotateX.set(startRotation.current.x - deltaY / 2);
			baseRotateY.set(startRotation.current.y + deltaX / 2);
		}, []);

		const handleEnd = useCallback(() => {
			isDragging.current = false;
		}, []);

		useEffect(() => {
			if (draggable) {
				window.addEventListener("mousemove", handleMove);
				window.addEventListener("mouseup", handleEnd);
				window.addEventListener("touchmove", handleMove);
				window.addEventListener("touchend", handleEnd);
				return () => {
					window.removeEventListener("mousemove", handleMove);
					window.removeEventListener("mouseup", handleEnd);
					window.removeEventListener("touchmove", handleMove);
					window.removeEventListener("touchend", handleEnd);
				};
			}
		}, [draggable, handleMove, handleEnd]);

		useEffect(() => {
			const unsubscribeX = baseRotateX.on("change", (v) => {
				currentRotation.current.x = v;
			});
			const unsubscribeY = baseRotateY.on("change", (v) => {
				currentRotation.current.y = v;
			});
			return () => {
				unsubscribeX();
				unsubscribeY();
			};
		}, []);

		return (
			<div
				className={cn(draggable && "cursor-move", className)}
				style={{
					width,
					height,
					perspective: `${perspective}px`,
				}}
				onMouseDown={handleStart}
				onTouchStart={handleStart}
				{...props}
			>
				<motion.div
					className="relative w-full h-full transform-3d"
					style={{ transform }}
				>
					{/* Front and Back */}
					<CubeFace
						transform={`rotateY(0deg) translateZ(${depth / 2}px)`}
						style={{ width, height }}
						showBackface={showBackface}
					>
						{faces.front}
					</CubeFace>

					<CubeFace
						transform={`rotateY(180deg) translateZ(${depth / 2}px)`}
						style={{ width, height }}
						showBackface={showBackface}
					>
						{faces.back}
					</CubeFace>

					{/* Right and Left */}
					<CubeFace
						transform={`rotateY(90deg) translateZ(${width / 2}px)`}
						style={{
							width: depth,
							height,
							left: (width - depth) / 2,
						}}
						showBackface={showBackface}
					>
						{faces.right}
					</CubeFace>

					<CubeFace
						transform={`rotateY(-90deg) translateZ(${width / 2}px)`}
						style={{
							width: depth,
							height,
							left: (width - depth) / 2,
						}}
						showBackface={showBackface}
					>
						{faces.left}
					</CubeFace>

					{/* Top and Bottom */}
					<CubeFace
						transform={`rotateX(90deg) translateZ(${height / 2}px)`}
						style={{
							width,
							height: depth,
							top: (height - depth) / 2,
						}}
						showBackface={showBackface}
					>
						{faces.top}
					</CubeFace>

					<CubeFace
						transform={`rotateX(-90deg) translateZ(${height / 2}px)`}
						style={{
							width,
							height: depth,
							top: (height - depth) / 2,
						}}
						showBackface={showBackface}
					>
						{faces.bottom}
					</CubeFace>
				</motion.div>
			</div>
		);
	}
);

CSSBox.displayName = "CSSBox";

export default CSSBox;
```
