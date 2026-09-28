"use client";

import type React from "react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { useHover } from "@/lib/hover-context";
import { useMousePosition } from "@/lib/elastic-line-position";
import { motion, useMotionValue, useTransform } from "motion/react";
import { twMerge } from "tailwind-merge";

// Credit:
// https://auraui.vercel.app/component/mask-cursor

interface MaskCursorProps {
	children: ReactNode;
	hoverColor?: string;
	maskColor?: string;
	className?: string;
	hovered?: string;
}
const MaskCursor: React.FC<MaskCursorProps> = ({
	children,
	className,
	hoverColor,
	maskColor = "#A5FECB",
	hovered,
}) => {
	const { x, y } = useMousePosition();

	const { hovering } = useHover();

	const [svgSize, setSvgSize] = useState(500);

	// Reference to the container to calculate offsets
	const containerRef = useRef<HTMLDivElement>(null);

	const [recentHover, setRecentHover] = useState(false);

	useEffect(() => {
		setRecentHover(true);
		setSvgSize(hovering ? 5000 : 500);
		setTimeout(() => {
			setRecentHover(false);
		}, 300);
	}, [hovering]);

	// keep track of the cursor center
	const [maskCenter, setMaskCenter] = useState({
		x: window.innerWidth / 2,
		y: window.innerHeight / 2,
	});

	useEffect(() => {
		if (x + y !== 0) {
			setMaskCenter({ x, y }); // always track mouse center, independent of size
		}
	}, [x, y]);

	// useMotionValues for smooth animation
	const maskX = useMotionValue(maskCenter.x);
	const maskY = useMotionValue(maskCenter.y);

	// animate the motion values when maskCenter updates
	useEffect(() => {
		maskX.set(maskCenter.x);
		maskY.set(maskCenter.y);
	}, [maskCenter, maskX, maskY]);

	// If user scrolls, keep centered on mouse
	useEffect(() => {
		if (containerRef.current && x + y !== 0) {
			const rect = containerRef.current.getBoundingClientRect();
			// adjust mouse position relative to the container
			const localX = x - rect.left;
			const localY = y - rect.top;

			setMaskCenter({ x: localX, y: localY });
		}
	}, [x, y]);

	// Keep mask position just the raw mouse coords
	const smoothMaskX = useTransform(
		maskX,
		(value) => `${value - svgSize / 2}px`
	);
	const smoothMaskY = useTransform(
		maskY,
		(value) => `${value - svgSize / 2}px`
	);

	return (
		<div
			className={twMerge("relative p-10 h-full w-full", className)}
			ref={containerRef}
		>
			<motion.div
				className={twMerge(
					"absolute inset-0 text-4xl",
					`dark:bg-[${maskColor}] bg-gray-200`
				)}
				animate={{
					WebkitMaskSize: `${svgSize}px`,
					WebkitMaskPosition: `${smoothMaskX.get()} ${smoothMaskY.get()}`,
				}}
				transition={{
					WebkitMaskSize: {
						type: "tween",
						ease: "easeOut",
						duration: 0.3,
					},

					WebkitMaskPosition:
						!hovering && !recentHover
							? {
									duration: 0,
								}
							: {
									type: "tween",
									ease: "easeOut",
									duration: 0.3,
								},
				}}
				style={{
					WebkitMaskImage: "url('/black-circle.svg')",
					WebkitMaskRepeat: "no-repeat",
					color: hoverColor ? hoverColor : "green",
				}}
			>
				{(hovered === "About Us" || hovered === "about") && (
					<video
						src="placeholder.mp4"
						height={1920}
						width={1080}
						className="h-screen w-screen object-cover"
						muted
						autoPlay
						preload="auto"
						loop
					/>
				)}
				{hovered === "WATCH REEL" && (
					<video
						src="IMG_4377 2.MOV"
						autoPlay
						muted
						height={1920}
						width={1080}
						loop
						preload="auto"
						className="h-screen w-screen object-cover"
					/>
				)}
				{hovered === "OUR TEAM" && (
					<video
						src="placeholder.mp4"
						height={1920}
						width={1080}
						className="h-screen w-screen object-cover"
						muted
						autoPlay
						loop
					/>
				)}
				{hovered === "CONTACT" && (
					<video
						src="placeholder.mp4"
						height={1920}
						width={1080}
						className="h-screen w-screen object-cover opacity-25"
						autoPlay
						muted
						loop
					/>
				)}
			</motion.div>
			{children}
		</div>
	);
};

export default MaskCursor;
