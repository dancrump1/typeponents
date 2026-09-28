# Tabs Transition Panel

- Categories: Navigation
- Tags: hover
- Import: `@/components/ui/tabs-transition-panel/component`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/tabs-transition-panel.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`
- `html-react-parser`
- `motion`
- `react-inlinesvg`

## Registry dependencies

- `content-with-image`
- `cursor-mask`
- `https://components.drivedev.net/r/content-with-image.json`
- `https://components.drivedev.net/r/cursor-mask.json`
- `https://components.drivedev.net/r/infinite-scrolling-logos-animation.json`
- `https://components.drivedev.net/r/marquee-along-svg.json`
- `https://components.drivedev.net/r/opposite-scroll-links.json`
- `https://components.drivedev.net/r/parallax-floating.json`
- `https://components.drivedev.net/r/preloader.json`
- `https://components.drivedev.net/r/scroll-velocity.json`
- `https://components.drivedev.net/r/target-cursor.json`
- `https://components.drivedev.net/r/text-rotate.json`
- `infinite-scrolling-logos-animation`
- `marquee-along-svg`
- `opposite-scroll-links`
- `parallax-floating`
- `preloader`
- `scroll-velocity`
- `target-cursor`
- `text-rotate`

## Usage

```tsx
"use client";

import React from "react";

import { TabsTransitionPanel } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<TabsTransitionPanel />
		</div>
	);
}
```

## Source

### `components/ui/tabs-transition-panel/component.tsx`

```tsx
"use client";

import React, { useState } from "react";

import Image from "next/image";

import { fake_workspotlight } from "./home";
import {
	AnimatePresence,
	motion,
	MotionProps,
	Transition,
	Variant,
} from "framer-motion";
import parse from "html-react-parser";

import { cn } from "@/lib/utils";

export function TabsTransitionPanel({
	data = { workSpotlight: fake_workspotlight },
}) {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<section className="pb-24 bg-background mt-[50vh]">
			<span className="my-12 block text-center">
				<h2>Like your brand's personal chauffeur</h2>
				<h3>Leave the driving to us</h3>
			</span>
			<div className="mb-4 flex space-x-2 overflow-x-auto">
				{data.workSpotlight.map(({ title, firstName }, index) => (
					<button
						key={index}
						onMouseEnter={() => setActiveIndex(index)}
						className={`rounded-md px-3 py-1 text-sm font-medium ${activeIndex === index
								? "bg-background text-foreground dark:bg-background dark:text-foreground"
								: "bg-background text-foreground dark:bg-background dark:text-foreground"
							}`}
					>
						{firstName}
					</button>
				))}
			</div>
			<div className="overflow-hidden border-t border-zinc-200 dark:border-zinc-700">
				<TransitionPanel
					activeIndex={activeIndex}
					data={data.workSpotlight}
				/>
			</div>
		</section>
	);
}

type TransitionPanelProps = {
	children: React.ReactNode[];
	className?: string;
	transition?: Transition;
	activeIndex: number;
	variants?: { enter: Variant; center: Variant; exit: Variant };
} & MotionProps;

export function TransitionPanel({
	children,
	className,
	transition,
	variants,
	activeIndex,
	data,
	...motionProps
}: TransitionPanelProps) {
	return (
		<div className={cn("relative", className)}>
			<AnimatePresence
				initial={false}
				mode="popLayout"
				custom={motionProps.custom}
			>
				{data.map(
					({ title, firstName, description, image }, index) =>
						index == activeIndex && (
							<motion.div
								key={title}
								className="cont-page"
								initial="enter"
								animate="center"
								exit="exit"
								transition={{ duration: 0.2, ease: "easeInOut" }}
								variants={{
									enter: {
										opacity: 0,
										y: -50,
										filter: "blur(4px)",
									},
									center: { opacity: 1, y: 0, filter: "blur(0px)" },
									exit: { opacity: 0, y: 50, filter: "blur(4px)" },
								}}
							>
								<h3 className="mb-2 font-medium text-foreground">
									{title}
								</h3>
								<span className="text-foreground">
									{parse(description || "")}
								</span>
								<Image
									src={image[0]?.url}
									height={200}
									width={400}
									alt={image[0]?.title || "Work by Drive Brand Studio"}
								/>
							</motion.div>
						)
				)}{" "}
			</AnimatePresence>
		</div>
	);
}
```

### `components/ui/tabs-transition-panel/home.tsx`

```tsx
"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";

import MarqueeAlongSvgPathDemo from "@/components/ui/marquee-along-svg/component";
import { useHover } from "@/lib/hover-context";
import ContentWithImage from "@/components/ui/content-with-image";
import MaskCursor from "@/components/ui/cursor-mask";
import InfiniteScrollingLogosAnimation from "@/components/ui/infinite-scrolling-logos-animation";
import OppositeScroll from "@/components/ui/opposite-scroll-links";
import Floating, {
	FloatingElement,
} from "@/components/ui/parallax-floating";
import Preloader from "@/components/ui/preloader";
import {
	ScrollVelocityContainer,
	ScrollVelocityRow,
} from "@/components/ui/scroll-velocity";
import TargetCursor from "@/components/ui/target-cursor";
import TextRotate from "@/components/ui/text-rotate";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import SVG from "react-inlinesvg";

export const fake_workspotlight = [
	{
		id: "work1",
		title: "work 1",
		image: { url: "/itjustworks.jpg" },
		uri: "https://google.com",
	},
	{
		id: "work2",
		title: "work 2",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work3",
		title: "work 3",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work4",
		title: "work 4",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work5",
		title: "work 5",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work6",
		title: "work 6",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work7",
		title: "work 7",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work8",
		title: "work 8",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work9",
		title: "work 9",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work10",
		title: "work 10",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
];

export const exampleImages = [
	{
		url: "/itjustworks.jpg",
		author: "Branislav Rodman",
		title: "A Black and White Photo of a Woman Brushing Her Teeth",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-painting-of-a-palm-leaf-on-a-multicolored-background-AaNPwrSNOFE",
		title: "Neon Palm",
		author: "Tim Mossholder",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-blurry-photo-of-a-crowd-of-people-UgbxzloNGsc",
		author: "ANDRII SOLOK",
		title: "A blurry photo of a crowd of people",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/rippling-crystal-blue-water-9-OCsKoyQlk",
		author: "Wesley Tingey",
		title: "Rippling Crystal Blue Water",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/de/fotos/mann-im-schwarzen-hemd-unter-blauem-himmel-m8RDNiuEXro",
		author: "Serhii Tyaglovsky",
		title: "Mann im schwarzen Hemd unter blauem Himmel",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-woman-with-a-flower-crown-on-her-head-0S3muIttbsY",
		author: "Vladimir Yelizarov",
		title: "A women with a flower crown on her head",
	},
	{
		url: "/itjustworks.jpg",
		title: "A blurry photo of white flowers in a field",
		author: "Eugene Golovesov",
		link: "https://unsplash.com/photos/a-blurry-photo-of-white-flowers-in-a-field-6qbx0lzGPyc",
	},
	{
		url: "/itjustworks.jpg",
		author: "Mathilde Langevin",
		link: "https://unsplash.com/photos/a-table-topped-with-two-wine-glasses-and-plates-Ig0gRAHspV0",
		title: "A table topped with two wine glasses and plates",
	},
];

function extractString(str: string) {
	// Find the last occurrence of '/'
	const lastSlashIndex = str.lastIndexOf("/");

	// Find the first occurrence of '?' after the last '/'
	const questionMarkIndex = str.indexOf("?", lastSlashIndex);

	// Extract the part after the last '/' and before the first '?'
	if (questionMarkIndex !== -1) {
		return str.substring(lastSlashIndex + 1, questionMarkIndex);
	} else {
		// If there's no '?' in the string, return the part after the last '/'
		return str.substring(lastSlashIndex + 1);
	}
}

function Home({ data, javaData }) {
	const [loader, setLoader] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoader(false);
		}, 2250);
	}, [loader]);

	const { image, headline, workSpotlight, callToAction } = data.homeEntries[0];
	const { assets, asset, cta } = data;
	const hero = image;

	// useEffect(() => {
	// 	console.log(javaData);
	// 	console.log(data);
	// }, [javaData]);

	const video = hero?.find((asset) => !!asset.embeddedAsset)?.embeddedAsset;
	const videoId = video ? extractString(video.iframeSrc) : null;

	const { hovered } = useHover();

	return (
		<>
			<AnimatePresence mode="wait">
				{loader && <Preloader />}
			</AnimatePresence>

			{!loader && (
				<main className="">
					<section className="h-screen w-full flex items-center justify-center relative overflow-x-clip">
						<MaskCursor hovered={hovered}>
							<div className="w-full h-screen overflow-hidden md:overflow-visible flex flex-col items-center justify-center relative">
								<Floating sensitivity={-0.5} className="h-full">
									<FloatingElement
										depth={0.5}
										className="top-[15%] left-[2%] md:top-[25%] md:left-[5%]"
									>
										{!!video?.iframeSrc ? (
											<div id="video" className="hidden lg:block">
												<motion.iframe
													src={
														video.iframeSrc +
														`playlist=${videoId}&loop=1&playsinline=1&autoplay=1&mute=1&controls=0&enablejsapi=0&iv_load_policy=3`
													}
													width={64}
													height={48}
													allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
													referrerPolicy="strict-origin-when-cross-origin"
													allowFullScreen
													className="pointer-events-none w-full h-full object-cover"
												/>
											</div>
										) : (
											<motion.img
												title={hero?.[0]?.alt}
												src={hero?.[0]?.url}
												alt={hero?.[0].alt || hero?.[0].title || ""}
												width={hero?.[0]?.width || 1920}
												height={hero?.[0]?.height || 1080}
												style={
													hero?.[0]?.focalPoint
														? {
																objectPosition: `${hero?.[0].focalPoint[0] * 100}% ${
																	hero?.[0].focalPoint[1] * 100
																}%`,
															}
														: {}
												}
												className="w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-3 shadow-2xl rounded-xl"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 0.5 }}
											/>
										)}
									</FloatingElement>

									<FloatingElement
										depth={1}
										className="top-[0%] left-[8%] md:top-[6%] md:left-[11%]"
									>
										{!!video?.iframeSrc ? (
											<div id="video" className="hidden lg:block">
												<motion.iframe
													src={
														video.iframeSrc +
														`playlist=${videoId}&loop=1&playsinline=1&autoplay=1&mute=1&controls=0&enablejsapi=0&iv_load_policy=3`
													}
													width={64}
													height={48}
													allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
													referrerPolicy="strict-origin-when-cross-origin"
													allowFullScreen
													className="pointer-events-none w-full h-full object-cover"
												/>
											</div>
										) : (
											<motion.img
												title={hero?.[0].alt}
												src={hero?.[0].url}
												alt={hero?.[0].alt || hero?.[0].title || ""}
												width={hero?.[0].width || 1920}
												height={hero?.[0].height || 1080}
												style={
													hero?.[0].focalPoint
														? {
																objectPosition: `${hero?.[0].focalPoint[0] * 100}% ${
																	hero?.[0].focalPoint[1] * 100
																}%`,
															}
														: {}
												}
												className="w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-48 hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-12 shadow-2xl rounded-xl object-cover"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 0.7 }}
											/>
										)}
									</FloatingElement>

									<FloatingElement
										depth={4}
										className="top-[90%] left-[6%] md:top-[80%] md:left-[8%]"
									>
										{!!video?.iframeSrc ? (
											<div id="video" className="hidden lg:block">
												<motion.iframe
													src={
														video.iframeSrc +
														`playlist=${videoId}&loop=1&playsinline=1&autoplay=1&mute=1&controls=0&enablejsapi=0&iv_load_policy=3`
													}
													width={64}
													height={48}
													allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
													referrerPolicy="strict-origin-when-cross-origin"
													allowFullScreen
													className="pointer-events-none w-full h-full object-cover"
												/>
											</div>
										) : (
											<motion.img
												title={hero?.[0].alt}
												src={hero?.[0].url}
												alt={hero?.[0].alt || hero?.[0].title || ""}
												width={hero?.[0].width || 1920}
												height={hero?.[0].height || 1080}
												style={
													hero?.[0].focalPoint
														? {
																objectPosition: `${hero?.[0].focalPoint[0] * 100}% ${
																	hero?.[0].focalPoint[1] * 100
																}%`,
															}
														: {}
												}
												className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 object-cover -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 0.9 }}
											/>
										)}
									</FloatingElement>

									<FloatingElement
										depth={2}
										className="top-[0%] left-[87%] md:top-[2%] md:left-[83%]"
									>
										{!!video?.iframeSrc ? (
											<div id="video" className="hidden lg:block">
												<motion.iframe
													src={
														video.iframeSrc +
														`playlist=${videoId}&loop=1&playsinline=1&autoplay=1&mute=1&controls=0&enablejsapi=0&iv_load_policy=3`
													}
													width={64}
													height={48}
													allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
													referrerPolicy="strict-origin-when-cross-origin"
													allowFullScreen
													className="pointer-events-none w-full h-full object-cover"
												/>
											</div>
										) : (
											<motion.img
												title={hero?.[0].alt}
												src={hero?.[0].url}
												alt={hero?.[0].alt || hero?.[0].title || ""}
												width={hero?.[0].width || 1920}
												height={hero?.[0].height || 1080}
												style={
													hero?.[0].focalPoint
														? {
																objectPosition: `${hero?.[0].focalPoint[0] * 100}% ${
																	hero?.[0].focalPoint[1] * 100
																}%`,
															}
														: {}
												}
												className="w-40 h-36 sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-56 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-6 rounded-xl"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 1.1 }}
											/>
										)}
									</FloatingElement>

									<FloatingElement
										depth={1}
										className="top-[78%] left-[83%] md:top-[68%] md:left-[83%]"
									>
										{!!video?.iframeSrc ? (
											<div id="video" className="hidden lg:block">
												<motion.iframe
													src={
														video.iframeSrc +
														`playlist=${videoId}&loop=1&playsinline=1&autoplay=1&mute=1&controls=0&enablejsapi=0&iv_load_policy=3`
													}
													width={64}
													height={48}
													allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
													referrerPolicy="strict-origin-when-cross-origin"
													allowFullScreen
													className="pointer-events-none w-full h-full object-cover"
												/>
											</div>
										) : (
											<motion.img
												title={hero?.[0].alt}
												src={hero?.[0].url}
												alt={hero?.[0].alt || hero?.[0].title || ""}
												width={hero?.[0].width || 1920}
												height={hero?.[0].height || 1080}
												style={
													hero?.[0].focalPoint
														? {
																objectPosition: `${hero?.[0].focalPoint[0] * 100}% ${
																	hero?.[0].focalPoint[1] * 100
																}%`,
															}
														: {}
												}
												className="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-19 rounded-xl"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 1.3 }}
											/>
										)}
									</FloatingElement>
								</Floating>

								<div className="flex py-32 flex-col justify-center items-center w-[250px] sm:w-[300px] md:w-[500px] lg:w-[700px] z-50 pointer-events-auto">
									<motion.h1
										className="text-3xl text-white mix-blend-soft-light dark:text-black sm:text-5xl md:text-7xl lg:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight tracking-tight space-y-1 md:space-y-4"
										animate={{ opacity: 1, y: 0 }}
										initial={{ opacity: 0, y: 20 }}
										transition={{
											duration: 0.2,
											ease: "easeOut",
											delay: 0.3,
										}}
									>
										<LayoutGroup>
											<motion.span
												layout
												className="flex whitespace-pre"
											>
												<motion.span
													layout
													className="flex whitespace-pre"
													transition={{
														type: "spring",
														damping: 30,
														stiffness: 400,
													}}
												></motion.span>
												<TextRotate
													texts={[
														"DRIVE",
														"pop ✨",
														"DRIVE",
														"perfect",
														"DRIVE",
														"quirkasauruses",
														"DRIVE",
														"🪩 funky",
														"DRIVE",
														"rock 🤘",
														"DRIVE",
													]}
													mainClassName="overflow-hidden pr-3 text-primary py-0 pb-2 md:pb-4 rounded-xl"
													staggerDuration={0.03}
													staggerFrom="last"
													rotationInterval={3000}
													transition={{
														type: "spring",
														damping: 30,
														stiffness: 400,
													}}
												/>
											</motion.span>
										</LayoutGroup>
									</motion.h1>
									<SVG
										src={"/dbsbottom.svg"}
										title={"half of our logo"}
										height={100}
										width={800}
										className="stroke-white"
										role="img"
										aria-label={"half of our logo"}
										loader={<span>Loading...</span>}
									/>
								</div>
							</div>
						</MaskCursor>
					</section>

					<section className="bg-secondary my-32 py-32">
						<ScrollVelocityContainer className="text-4xl md:text-7xl md:leading-20 font-bold tracking-[-0.02em]">
							<ScrollVelocityRow
								baseVelocity={5}
								direction={1}
								className="z-10 relative"
							>
								{callToAction?.title}
							</ScrollVelocityRow>
							<Image
								src={asset?.url}
								alt={asset?.title}
								height={300}
								width={300}
								className="absolute left-[calc(50vw-155px)] -top-[70px] z-20 h-[250px] w-fit"
							/>
							<ScrollVelocityRow
								baseVelocity={5}
								direction={-1}
								className="z-30 relative"
							>
								{callToAction?.customText}
							</ScrollVelocityRow>
						</ScrollVelocityContainer>{" "}
					</section>

					<section className="flex my-32 relative">
						<TargetCursor spinDuration={2} hideDefaultCursor={false} />
						<ContentWithImage image={{ url: cta?.url }} />
					</section>

					<section className="my-32">
						<OppositeScroll works={workSpotlight} />
					</section>

					<section className="relative w-full">
						<MarqueeAlongSvgPathDemo />
					</section>

					<section className="my-64">
						<InfiniteScrollingLogosAnimation assets={assets} />
					</section>
				</main>
			)}
		</>
	);
}

export default Home;
```

### `lib/hover-context.tsx`

```tsx
"use client";

import { createContext, useContext, useState } from "react";

type HoverContextType = {
	hovered: string | null;
	setHovered: (id: string | null) => void;
	hovering: boolean;
	setHovering: (value: boolean) => void;
};

const HoverContext = createContext<HoverContextType | undefined>(undefined);

export function HoverProvider({ children }: { children: React.ReactNode }) {
	const [hovered, setHovered] = useState<string | null>("about");
	const [hovering, setHovering] = useState<boolean>(false);

	return (
		<HoverContext.Provider
			value={{ hovered, setHovered, hovering, setHovering }}
		>
			{children}
		</HoverContext.Provider>
	);
}

export function useHover() {
	const ctx = useContext(HoverContext);
	if (!ctx) throw new Error("useHover must be used within HoverProvider");
	return ctx;
}
```
