# Media Between Text

- Categories: Images
- Tags: spring, scroll-driven, hover, autoplay
- Import: `@/components/ui/media-between-text`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/media-between-text.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Usage

```tsx
import React, { useRef, useState } from "react";

import MediaBetweenText, {
	MediaBetweenTextRef,
} from "./component";
import { useWindowSize } from "@/hooks/use-window-size";

import { Button } from "@/components/ui/button";

// Credit:
// https://www.fancycomponents.dev/docs/components/blocks/media-between-text

export const elements = [
	{
		src: "/itjustworks.jpg",

		left: "Tim",
		right: "Rodenböker",
		url: "https://www.instagram.com/tim_rodenbroeker/",
	},
	{
		src: "/itjustworks.jpg",

		left: "Simon ",
		right: "Alexander-Adams",
		url: "https://www.instagram.com/polyhop/",
	},
	{
		src: "/itjustworks.jpg",

		left: "Andreion",
		right: "de Castro",
		url: "https://www.instagram.com/andreiongd/",
	},
	{
		src: "/itjustworks.jpg",

		left: "Lorraine",
		right: "Li",
		url: "https://www.instagram.com/lorrr.l/",
	},
];

export default function MediaBetweenTextScrollDemo() {
	const ref = React.useRef<HTMLDivElement>(null);
	const { width } = useWindowSize();

	const isMobile = width < 1024;

	const ref2 = useRef<MediaBetweenTextRef>(null);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<section>
			<h3>Media between text</h3>

			<div
				className="w-full h-dvh items-center justify-center bg-background overflow-auto"
				ref={ref}
			>
				<div className="h-full relative w-full flex">
					<h3 className="text-5xl sm:text-8xl tracking-wide absolute sm:bottom-12 sm:left-12 bottom-4 left-4 w-64">
						today's inspo
					</h3>
					<p className="bottom-4 right-4 sm:right-12 sm:bottom-12 absolute ">
						Scroll down ↓
					</p>
				</div>

				<div className="h-full w-full flex flex-col space-y-12 mt-24 justify-center items-center text-6xl px-6">
					{elements.map((element, index) => (
						<a href={element.url} target="_blank" rel="noreferrer">
							<MediaBetweenText
								key={index + "media-between-text"}
								firstText={element.left}
								secondText={element.right}
								mediaUrl={element.src}
								mediaType="video"
								triggerType="inView"
								useInViewOptionsProp={{
									once: false,
									amount: 1,
									root: ref,
									margin: "-5% 0px -0% 0px",
								}}
								containerRef={ref}
								mediaContainerClassName="w-full h-[40px] sm:h-[80px] overflow-hidden mx-1 sm:mx-3 mt-1 sm:mt-4"
								className="cursor-pointer text-lg sm:text-4xl font-light flex flex-row items-center justify-center"
								animationVariants={{
									initial: { width: 0 },
									animate: {
										width: isMobile ? "40px" : "100px",
										transition: {
											duration: 1,
											type: "spring",
											bounce: 0,
											delay: 0.1,
										},
									},
								}}
							/>
						</a>
					))}
				</div>
			</div>

			<div className="relative w-full h-dvh flex flex-col items-center justify-center bg-background">
				<Button
					onClick={() => {
						setIsOpen(!isOpen);
						if (!isOpen) {
							ref2.current?.animate();
						} else {
							ref2.current?.reset();
						}
					}}
					size={"sm"}
					variant={"outline"}
					className="absolute top-4 left-4 h-8"
				>
					{isOpen ? "Close" : "Open"}
				</Button>

				<MediaBetweenText
					firstText="Artificial "
					secondText="Intelligence"
					mediaUrl={
						"https://cdn.cosmos.so/47c0223f-c704-4d5a-8b47-c48262ebe301?format=jpeg"
					}
					mediaType="image"
					triggerType="ref"
					ref={ref2}
					mediaContainerClassName="w-full h-[60px] sm:h-[100px] overflow-hidden pt-1"
					className="cursor-pointer text-3xl sm:text-7xl font-calendas flex flex-col font-light items-center justify-center"
					leftTextClassName=""
					rightTextClassName="italic"
					animationVariants={{
						initial: {
							width: isMobile ? "160px" : "280px",
							height: 0,
							transition: {
								duration: 0.7,
								ease: [0.944, 0.008, 0.147, 1.002],
							},
						},
						animate: {
							width: isMobile ? "200px" : "330px",
							height: isMobile ? "200px" : "300px",
							transition: {
								duration: 0.7,
								ease: [0.944, 0.008, 0.147, 1.002],
							},
						},
					}}
				/>
			</div>
		</section>
	);
}
```

## Source

### `components/ui/media-between-text.tsx`

```tsx
"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { motion, useInView, UseInViewOptions, Variants } from "motion/react";

type MediaBetweenTextProps = {
	firstText: string;
	secondText: string;
	// Media props
	mediaUrl: string;
	mediaType: "image" | "video";
	mediaContainerClassName?: string;
	fallbackUrl?: string;
	// Video props
	autoPlay?: boolean;
	loop?: boolean;
	muted?: boolean;
	playsInline?: boolean;
	// Image props
	alt?: string;
	// Animation props
	triggerType?: "hover" | "ref" | "inView";
	containerRef?: React.RefObject<HTMLDivElement>;
	useInViewOptionsProp?: UseInViewOptions;
	animationVariants?: {
		initial: Variants["initial"];
		animate: Variants["animate"];
	};
	className?: string;
	// Text styling
	leftTextClassName?: string;
	rightTextClassName?: string;
};

export type MediaBetweenTextRef = {
	animate: () => void;
	reset: () => void;
};

const MediaBetweenText = forwardRef<MediaBetweenTextRef, MediaBetweenTextProps>(
	(
		{
			firstText,
			secondText,
			mediaUrl,
			mediaType,
			mediaContainerClassName,
			fallbackUrl,
			autoPlay = true,
			loop = true,
			muted = true,
			playsInline = true,
			alt,
			triggerType = "hover",
			containerRef,
			useInViewOptionsProp = {
				once: true,
				amount: 0.5,
				root: containerRef,
			},
			animationVariants = {
				initial: { width: 0, opacity: 1 },
				animate: {
					width: "auto",
					opacity: 1,
					transition: { duration: 0.4, type: "spring", bounce: 0 },
				},
			},
			className,
			leftTextClassName,
			rightTextClassName,
		},
		ref
	) => {
		const componentRef = useRef<HTMLDivElement>(null);
		const [isAnimating, setIsAnimating] = useState(false);

		const isInView =
			triggerType === "inView"
				? useInView(componentRef || containerRef, useInViewOptionsProp)
				: false;
		const [isHovered, setIsHovered] = useState(false);

		useImperativeHandle(ref, () => ({
			animate: () => setIsAnimating(true),
			reset: () => setIsAnimating(false),
		}));

		const shouldAnimate =
			triggerType === "hover"
				? isHovered
				: triggerType === "inView"
					? isInView
					: triggerType === "ref"
						? isAnimating
						: false;

		return (
			<div
				className={cn("flex", className)}
				ref={componentRef}
				onMouseEnter={() => triggerType === "hover" && setIsHovered(true)}
				onMouseLeave={() => triggerType === "hover" && setIsHovered(false)}
			>
				<motion.p layout className={leftTextClassName}>
					{firstText}
				</motion.p>
				<motion.div
					className={mediaContainerClassName}
					variants={animationVariants}
					initial="initial"
					animate={shouldAnimate ? "animate" : "initial"}
				>
					{mediaType === "video" ? (
						<video
							className="w-full h-full object-cover"
							autoPlay={autoPlay}
							loop={loop}
							muted={muted}
							playsInline={playsInline}
							poster={fallbackUrl}
						>
							<source src={mediaUrl} type="video/mp4" />
						</video>
					) : (
						<img
							src={mediaUrl}
							alt={alt || `${firstText} ${secondText}`}
							className="w-full h-full object-cover"
						/>
					)}
				</motion.div>
				<motion.p layout className={rightTextClassName}>
					{secondText}
				</motion.p>
			</div>
		);
	}
);

export default MediaBetweenText;
```
