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
