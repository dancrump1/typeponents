# Carousel Circle

Tilted ring of looping video thumbnails orbiting a phone mockup that plays whichever clip is at the front.

**Interaction.** The arrow buttons below turn the ring one slot left or right; it banks into the turn, overshoots and settles, and the phone in the middle crossfades to the clip that arrives at the front.

- Categories: Carousels
- Tags: featured, spring, hover, autoplay
- Import: `@/components/ui/carousel-circle`
- Inspiration: Serenity UI (adaptation) — https://www.serenity-ui.com/components/carousels/carousel360

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/carousel-circle.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`
- `react-icons`

## Registry dependencies

- `https://components.drivedev.net/r/iphone.json`
- `iphone`

## Usage

```tsx
"use client";

import React from "react";

import CarouselCircle from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<CarouselCircle
				images={[
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
				]}
			/>{" "}
		</div>
	);
}
```

## Source

### `components/ui/carousel-circle.tsx`

```tsx
// "use client";

// import React, { useEffect, useState } from "react";

// import Image from "next/image";

// import { motion } from "motion/react";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Credit:
// https://www.serenity-ui.com/components/carousels/carousel360

// interface CarouselCircleProps {
// 	images: string[];
// }

// const CarouselCircle: React.FC<CarouselCircleProps> = ({ images }) => {
// 	const [rotation, setRotation] = useState(0);
// 	const [centerImage, setCenterImage] = useState(images[0]);
// 	const numimages = images?.length;

// 	useEffect(() => {
// 		const interval = setInterval(() => {
// 			setRotation((prevRotation) => prevRotation + 360 / numimages);
// 		}, 2000);

// 		return () => clearInterval(interval);
// 	}, [numimages]);

// 	useEffect(() => {
// 		const index =
// 			Math.round((rotation % 360) / (360 / numimages)) % numimages;
// 		setCenterImage(images[index < 0 ? numimages + index : index]);
// 	}, [rotation, numimages, images]);

// 	const rotateCarousel = (direction: "left" | "right") => {
// 		const newRotation =
// 			rotation + (direction === "left" ? -360 / numimages : 360 / numimages);
// 		setRotation(newRotation);
// 	};

// 	return (
// 		<div className="relative h-screen w-full bg-background text-foreground overflow-hidden">
// 			{/* Carousel Container */}
// 			<div className="absolute inset-0 flex items-center justify-center">
// 				<motion.div
// 					className="relative w-[90vw] max-w-[600px] h-[60vw] max-h-[400px]"
// 					style={{ perspective: 500 }}
// 				>
// 					{images?.map((item, index) => (
// 						<motion.div
// 							key={index + "carousel-circle"}
// 							className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
// 							style={{
// 								rotateY: `${rotation + (360 / numimages) * index}deg`,
// 								rotateX: `${-40}deg`,
// 								transformStyle: "preserve-3d",
// 								backfaceVisibility: "hidden",
// 							}}
// 							animate={{
// 								rotateY: `${rotation + (360 / numimages) * index}deg`,
// 							}}
// 							transition={{ type: "spring", stiffness: 70, damping: 18 }}
// 						>
// 							<div
// 								className="rounded-xl overflow-hidden shadow-lg transform-gpu"
// 								style={{
// 									transform: `translateZ(350px) rotateY(${
// 										-rotation - (360 / numimages) * index
// 									}deg)`,
// 									boxShadow: "0px 10px 50px rgba(0, 0, 0, 0.5)",
// 								}}
// 							>
// 								<Image
// 									src={item}
// 									alt={`Carousel Image ${index + 1}`}
// 									width={100}
// 									height={100}
// 									className="object-cover hover:scale-105 transition duration-500"
// 								/>
// 							</div>
// 						</motion.div>
// 					))}
// 					{/* Central Image */}
// 					<motion.div
// 						className="absolute inset-0 flex items-center justify-center z-10"
// 						style={{ transformStyle: "preserve-3d" }}
// 					>
// 						<div
// 							className="rounded-xl overflow-hidden shadow-lg"
// 							style={{
// 								transform: `translateZ(0px) rotateX(20deg)`,
// 								boxShadow: "0px 10px 50px rgba(0, 0, 0, 0.5)",
// 							}}
// 						>
// 							<Image
// 								src={centerImage}
// 								alt="Central Large Image"
// 								width={400}
// 								height={400}
// 								className="object-cover"
// 							/>
// 						</div>
// 					</motion.div>
// 				</motion.div>
// 			</div>
// 			{/* Buttons */}
// 			<div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-4">
// 				<button
// 					className="bg-background/20 text-foreground px-8 py-3 rounded-full shadow-lg backdrop-blur-md border border-white/30 hover:bg-background/30 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-hidden"
// 					onClick={() => rotateCarousel("left")}
// 				>
// 					<FaArrowLeft className="text-foreground" />
// 				</button>
// 				<button
// 					className="bg-background/20 text-foreground px-8 py-3 rounded-full shadow-lg backdrop-blur-md border border-white/30 hover:bg-background/30 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-hidden"
// 					onClick={() => rotateCarousel("right")}
// 				>
// 					<FaArrowRight className="text-foreground " />
// 				</button>
// 			</div>
// 			{/* Overlay */}
// 			<div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background pointer-events-none" />
// 		</div>
// 	);
// };

// export default CarouselCircle;


"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
	animate,
	motion,
	useMotionValue,
	useTransform,
} from "motion/react";
import { Iphone } from "@/components/ui/iphone";

const CAROUSEL_SPRING = { type: "spring" as const, stiffness: 70, damping: 18 };
const CENTER_CROSSFADE = { duration: 0.45, ease: [0.4, 0, 0.2, 1] as const };

/** RotateZ impulse (degrees) when the ring steps — trailing twist then settles upright */
const ORBIT_BANK_PEAK = 26;

/** Orbit slot at viewer yaw 0°: `rotation + i * (360/n) ≡ 0 (mod 360)` → `i ≡ -rotation/step (mod n)`. */
function frontSlotIndex(rotation: number, n: number): number {
	if (n === 0) return 0;
	const step = 360 / n;
	const k = Math.round(-rotation / step);
	return ((k % n) + n) % n;
}

const Carousel360: React.FC = ({ images }) => {
	const [rotation, setRotation] = useState(45);
	const [autoRotateEpoch, setAutoRotateEpoch] = useState(0);
	const [centerTopLayer, setCenterTopLayer] = useState<"a" | "b">("a");
	const [centerSrcA, setCenterSrcA] = useState(images[0].src);
	const [centerSrcB, setCenterSrcB] = useState(images[0].src);
	const centerPendingFlip = useRef(false);
	const numimages = images.length;

	const centerSrc = useMemo(() => {
		const i = frontSlotIndex(rotation, numimages);
		return images[i]?.src ?? images[0].src;
	}, [rotation, numimages, images]);

	const prevRotationRef = useRef(rotation);
	const bankPlaybackRef = useRef<{ stop: () => void } | null>(null);
	const orbitBankMv = useMotionValue(0);
	const orbitBankDeg = useTransform(orbitBankMv, (deg) => `${deg}deg`);

	useEffect(() => {
		return () => bankPlaybackRef.current?.stop();
	}, []);

	useEffect(() => {
		const prev = prevRotationRef.current;
		prevRotationRef.current = rotation;
		const delta = rotation - prev;
		if (Math.abs(delta) < 1e-5) return;

		const step = 360 / numimages;
		const thrust = Math.min(Math.max(Math.abs(delta) / step, 0.55), 2.75);

		bankPlaybackRef.current?.stop();

		const sign = Math.sign(delta) || 1;
		const peak = sign * -(ORBIT_BANK_PEAK * thrust);
		const from = orbitBankMv.get();

		bankPlaybackRef.current = animate(
			orbitBankMv,
			[from, peak, peak * 0.32, sign * -(ORBIT_BANK_PEAK * 0.06 * thrust), 0],
			{
				duration: 1,
				ease: [
					[0.45, 0, 0.55, 1],
					[0.28, 0.82, 0.35, 1],
					[0.45, 0, 0.2, 1],
					[0.22, 1, 0.36, 1],
				],
				times: [0, 0.12, 0.32, 0.62, 1],
			},
		);
	}, [rotation, numimages, orbitBankMv]);

	// useEffect(() => {
	//     const interval = setInterval(() => {
	//         setRotation((prevRotation) => prevRotation + 360 / numimages);
	//     }, 10000);

	//     return () => clearInterval(interval);
	// }, [numimages, autoRotateEpoch]);

	useEffect(() => {
		const topSrc = centerTopLayer === "a" ? centerSrcA : centerSrcB;
		if (centerSrc === topSrc) return;
		centerPendingFlip.current = true;
		if (centerTopLayer === "a") setCenterSrcB(centerSrc);
		else setCenterSrcA(centerSrc);
	}, [centerSrc, centerTopLayer, centerSrcA, centerSrcB]);

	const onCenterLayerReady = (layer: "a" | "b") => {
		if (!centerPendingFlip.current) return;
		const hiddenWhenATop = centerTopLayer === "a" ? "b" : "a";
		if (layer !== hiddenWhenATop) return;
		const hiddenSrc = layer === "a" ? centerSrcA : centerSrcB;
		if (hiddenSrc !== centerSrc) return;
		centerPendingFlip.current = false;
		setCenterTopLayer((t) => (t === "a" ? "b" : "a"));
	};

	const rotateCarousel = (direction: "left" | "right") => {
		const newRotation =
			rotation + (direction === "left" ? -360 / numimages : 360 / numimages);
		setRotation(newRotation);
		setAutoRotateEpoch((n) => n + 1);
	};

	return (
		<div className="relative pb-56 pt-24 w-full  overflow-hidden">
			{/* Carousel Container */}
			<div className=" flex items-center justify-center">
				<motion.div
					className="relative w-[90vw] max-w-[600px] h-[60vw] max-h-[400px]"
					style={{ perspective: 800 }}
				>
					{images.map(({ src, key }, index) => {
						const slotDeg = rotation + (360 / numimages) * index;
						return (
							<motion.div
								key={key}
								className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
								style={{
									rotateX: `${-40}deg`,
									transformStyle: "preserve-3d",
									backfaceVisibility: "hidden",
								}}
								animate={{
									rotateY: `${slotDeg}deg`,
								}}
								transition={CAROUSEL_SPRING}
							>
								<motion.div
									className="relative shrink-0 overflow-hidden rounded-xl transform-gpu h-[min(112px,22vw)] w-[calc(min(112px,22vw)*9/16)]"
									style={{
										transformStyle: "preserve-3d",
										translateZ: 350,
										rotateZ: orbitBankDeg,
									}}
									animate={{
										rotateY: `${-slotDeg}deg`,
									}}
									transition={CAROUSEL_SPRING}
								>
									<video
										src={src}
										className="h-full w-full object-cover hover:scale-105 transition duration-500 pointer-events-none"
										muted
										playsInline
										loop
										autoPlay
									/>
								</motion.div>
							</motion.div>
						);
					})}
					{/* Central video: fixed box + A/B crossfade avoids size flicker on src change */}
					<motion.div
						className="absolute inset-0 flex items-center justify-center z-10 px-5 sm:px-0"
						style={{ transformStyle: "preserve-3d" }}
					>
						{/* YouTube Shorts: 9:16; height-capped so the frame stays inside the carousel */}
						<div
							className="relative mx-auto h-[min(48vh,352px)] w-[calc(min(48vh,352px)*9/16)] shrink-0"
							style={{
								transform: `translateZ(0px) rotateX(20deg)`,
							}}
						>
							<motion.div
								className="absolute inset-0"
								initial={false}
								animate={{ opacity: centerTopLayer === "a" ? 1 : 0 }}
								transition={CENTER_CROSSFADE}
								style={{ zIndex: centerTopLayer === "a" ? 2 : 1 }}
							>
								<Iphone
									videoSrc={centerSrcA}
									className="h-full w-full min-h-0 min-w-0"
									onVideoReady={() => onCenterLayerReady("a")}
								/>
							</motion.div>
							<motion.div
								className="absolute inset-0"
								initial={false}
								animate={{ opacity: centerTopLayer === "b" ? 1 : 0 }}
								transition={CENTER_CROSSFADE}
								style={{ zIndex: centerTopLayer === "b" ? 2 : 1 }}
							>
								<Iphone
									videoSrc={centerSrcB}
									className="h-full w-full min-h-0 min-w-0"
									onVideoReady={() => onCenterLayerReady("b")}
								/>
							</motion.div>
						</div>
					</motion.div>
				</motion.div>
			</div>
			{/* Buttons */}
			<div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-4">
				<button
					className="bg-white/20 text-black px-8 py-3 rounded-full shadow-lg backdrop-blur-md border border-white/30 hover:bg-white/30 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
					onClick={() => rotateCarousel("left")}
				>
					{"<"}
				</button>
				<button
					className="bg-white/20 text-black px-8 py-3 rounded-full shadow-lg backdrop-blur-md border border-white/30 hover:bg-white/30 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
					onClick={() => rotateCarousel("right")}
				>
					{">"}
				</button>
			</div>
			{/* Overlay */}
		</div>
	);
};

export default Carousel360;
```

## Attribution

Source: Serenity UI · Original: https://www.serenity-ui.com/components/carousels/carousel360

Adapted from the original. Credit the original author when you ship this.
