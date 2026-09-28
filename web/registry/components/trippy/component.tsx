import React, { useCallback, useMemo, useRef, useState } from "react";

import { motion } from "motion/react";

// Credit:
// https://github.com/tkh44/data-driven-motion/blob/master/demo/src/demos/Trippy.js

type TrippyProps = {
	data?: unknown[];
	// Diameter in pixels for each circle
	circleSize?: number;
};

const DEFAULT_DATA = Array.from({ length: 8 }, (_, i) => ({
	key: `item-${i}`,
}));

export default function Trippy({
	data = DEFAULT_DATA,
	circleSize = 48,
}: TrippyProps) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [mouseX, setMouseX] = useState(0);
	const [mouseY, setMouseY] = useState(0);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			const rect = containerRef.current?.getBoundingClientRect();
			if (!rect) return;
			setMouseX(e.clientX - rect.left);
			setMouseY(e.clientY - rect.top);
		},
		[]
	);

	const handleMouseDown = useCallback(() => {
		setIsMouseDown(true);
	}, []);

	const handleMouseUpOrLeave = useCallback(() => {
		setIsMouseDown(false);
	}, []);

	const satellites = useMemo(() => {
		type HasKey = { key?: string | number };
		const hasKey = (o: unknown): o is HasKey =>
			typeof o === "object" &&
			o !== null &&
			"key" in (o as Record<string, unknown>);
		const num = data.length;
		if (num === 0)
			return [] as Array<{
				key: string | number;
				x: number;
				y: number;
				hue: number;
			}>;
		return data.map((item, index) => {
			// Stack directly under the cursor; no polar offset when stacking
			const x = mouseX;
			const y = mouseY;
			const hue = (((mouseX + mouseY + index * 45) % 360) + 360) % 360;
			const key = hasKey(item) && item.key !== undefined ? item.key : index;
			return { key, x, y, hue };
		});
	}, [data, mouseX, mouseY]);

	const diameter = circleSize;
	const radius = diameter / 2;

	return (
		<div
			ref={containerRef}
			style={{
				position: "relative",
				width: "100%",
				height: "100%",
				background: "#0f1115",
				overflow: "hidden",
				cursor: "none",
			}}
			onMouseMove={handleMouseMove}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUpOrLeave}
			onMouseLeave={handleMouseUpOrLeave}
		>
			{/* Primary follower circle */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: `${diameter}px`,
					height: `${diameter}px`,
					borderRadius: "50%",
					transform: `translate(${mouseX - radius}px, ${mouseY - radius}px)`,
					background: "transparent",
					border: `3px solid hsl(${(((mouseX + mouseY) % 360) + 360) % 360}, 70%, 55%)`,
					boxShadow: "0 0 12px rgba(255,255,255,0.15)",
					transition:
						"transform 120ms ease-out, border-color 200ms linear",
					pointerEvents: "none",
				}}
			/>

			{/* Satellite circles when mouse is down */}
			{satellites.map(({ key, x, y, hue }, idx) => (
				<motion.div
					key={key}
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: `${diameter + idx * 15}px`,
						height: `${diameter + idx * 15}px`,
						borderRadius: "50%",
						transform: `translate3d(calc(${x}px - 5vw), calc(${y}px - 5vh), ${idx * 30}px)`,
						background: "transparent",
						border: `2px solid hsl(${hue + idx * 20}, 65%, 50%)`,
						opacity: isMouseDown ? 1 : 0,
						zIndex: isMouseDown ? 1000 + idx : 0,
						transition:
							"transform 180ms ease-out, width 180ms ease-out, height 180ms ease-out, opacity 120ms ease-out",
						pointerEvents: "none",
					}}
				/>
			))}
		</div>
	);
}
