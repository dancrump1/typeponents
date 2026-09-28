# Cielia Replication

- Categories: Grids & Layouts
- Tags: hover
- Import: `@/components/ui/cielia-replication/component`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/cielia-replication.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `@gsap/react`
- `gsap`
- `lenis`
- `lottie-web`
- `tempus`

## Usage

```tsx
import Link from "next/link";

import AboutSection from "./about";
import Features from "./features";
import Gallery from "./gallery";
import { GsapProvider } from "./gsap-provider";
import Improvements from "./improvements";
import Introduction from "./introduction";
import Services from "./services";
import { ReactLenis } from "lenis/react";

const ExampleReplication = () => {
	return (
		<div>
			<ReactLenis>
				<div>
					<div className="grid min-h-screen place-items-center bg-background py-20 text-secondary">
						<div className="container flex min-h-[50vh] flex-col justify-center gap-y-20 text-center">
							<h1 className="fs-40-85">
								<Link
									href={"https://www.cielia.com/m/special/plus/"}
									target="_blank"
									className="underline transition duration-300 hover:text-blue-600"
								>
									Cielia
								</Link>{" "}
								Replication
							</h1>

							<div className="flex items-center justify-center gap-x-5 text-center fs-25-43">
								<Link
									href={
										"https://github.com/PhanDangKhoa96/cielia-replication"
									}
									target="_blank"
									className="hover:underline"
								>
									Source code
								</Link>
								<span>|</span>
								<Link
									href={"https://www.pldkhoa.dev/playground"}
									target="_blank"
									className="hover:underline"
								>
									All demos
								</Link>
								<span>|</span>
								<Link
									href={"https://www.lummi.ai/"}
									target="_blank"
									className="hover:underline"
								>
									Images
								</Link>
							</div>
						</div>
					</div>

					<div className="container grid h-screen place-items-center lg:hidden">
						<h2 className="text-balance uppercase fs-38-56">
							Apologies, this screen is currently not optimized for
							mobile devices and is only available for screens wider than
							1024px.
						</h2>
					</div>

					<div className="hidden space-y-52 lg:block">
						<Introduction />
						<Features />
						<AboutSection />
						<Services />
						<Improvements />
						<Gallery />
					</div>

					<div className="container grid h-screen place-items-center">
						<h2 className="text-balance uppercase fs-40-85">
							Have a good day!
						</h2>
					</div>
				</div>
			</ReactLenis>
			<GsapProvider scrollTrigger />
		</div>
	);
};

export default ExampleReplication;
```

## Source

### `components/ui/cielia-replication/about.tsx`

```tsx
"use client";

import React, { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import SectionHeader from "./section-header";

const AboutSection = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const introRef = useRef<HTMLDivElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	useGSAP(
		() => {
			const introMovAnim = gsap.timeline({
				scrollTrigger: {
					// scroller: ".scroll-container",
					trigger: introRef.current,
					start: "top 0%",
					endTrigger: textRef.current,
					end: "top center",
					scrub: true,
				},
			});
			gsap.set(imgRef.current, {
				transformOrigin: "left bottom",
			});
			introMovAnim.to(imgRef.current, {
				scale: 0.5,
			});
		},
		{ scope: sectionRef }
	);
	return (
		<section ref={sectionRef} id="#about">
			<SectionHeader>About Section</SectionHeader>

			<div className="sticky top-0 z-10 h-screen w-full" ref={introRef}>
				<div className="h-full">
					<img
						ref={imgRef}
						src="/itjustworks.jpg"
						alt="about section image"
						loading="lazy"
						className="h-full w-full object-cover object-[50%_35%]"
					/>
				</div>
			</div>
			<div className="container relative z-0 pb-[500px] pt-40" ref={textRef}>
				<div className="sticky top-0 isolate z-20 grid h-[50vh] place-items-center">
					<h2 className="mx-auto max-w-(--breakpoint-md) text-center fs-25-43">
						Choosing what matters most and adding it mindfully creates a
						life true to yourself.
					</h2>
					<div className="absolute inset-0 -z-10 bg-linear-to-b from-[rgb(255,255,255)] from-75% to-[rgba(255,255,255,0)] to-100%"></div>
				</div>

				<div className="ml-auto w-1/2 pl-[10vw] pt-36 pb-40">
					<p>
						Many feel suffocated by the pressure to seek more than
						necessary or follow others' choices.
						<br />
						<br />
						In the rush of daily life, it’s time to rethink what truly
						brings fulfillment.
						<br />
						<br />
						The scent of fresh greenery carried by the wind,
						<br />
						<br />
						the warmth of sunlight,
						<br />
						<br />
						the cheerful chirping of birds—moments like these enrich our
						senses and transform a house into a cherished home.
						<br />
						<br />
						<br />
						By focusing on what truly matters and adding thoughtful
						details,
						<br />
						<br />
						we create spaces that reflect individuality.
						<br />
						<br />
						we craft homes with this vision at heart.
					</p>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
```

### `components/ui/cielia-replication/component.tsx`

```tsx
import Link from "next/link";

import { ReactLenis } from "lenis/react";

import AboutSection from "./about";
import Features from "./features";
import Gallery from "./gallery";
import { GsapProvider } from "./gsap-provider";
import Improvements from "./improvements";
import Introduction from "./introduction";
import Services from "./services";

export const ExampleReplication = () => {
	return (
		<div>
			<ReactLenis root>
				<div>
					<div className="grid min-h-screen place-items-center bg-background py-20 text-foreground">
						<div className="container flex min-h-[50vh] flex-col justify-center gap-y-20 text-center">
							<h1 className="fs-40-85">
								<Link
									href={"https://www.cielia.com/m/special/plus/"}
									target="_blank"
									className="underline transition duration-300 hover:text-blue-600"
								>
									Cielia
								</Link>{" "}
								Replication
							</h1>

							<div className="flex items-center justify-center gap-x-5 text-center fs-25-43">
								<Link
									href={
										"https://github.com/PhanDangKhoa96/cielia-replication"
									}
									target="_blank"
									className="hover:underline"
								>
									Source code
								</Link>
								<span>|</span>
								<Link
									href={"https://www.pldkhoa.dev/playground"}
									target="_blank"
									className="hover:underline"
								>
									All demos
								</Link>
								<span>|</span>
								<Link
									href={"https://www.lummi.ai/"}
									target="_blank"
									className="hover:underline"
								>
									Images
								</Link>
							</div>
						</div>
					</div>

					<div className="container grid h-screen place-items-center lg:hidden">
						<h2 className="text-balance uppercase fs-38-56">
							Apologies, this screen is currently not optimized for
							mobile devices and is only available for screens wider than
							1024px.
						</h2>
					</div>

					<div className="hidden space-y-52 lg:block">
						<Introduction />
						<Features />
						<AboutSection />
						<Services />
						<Improvements />
						<Gallery />
					</div>

					<div className="container grid h-screen place-items-center">
						<h2 className="text-balance uppercase fs-40-85">
							Have a good day!
						</h2>
					</div>
				</div>
			</ReactLenis>
			<GsapProvider scrollTrigger />
		</div>
	);
};
```

### `components/ui/cielia-replication/features.tsx`

```tsx
"use client";

import React, { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import SectionHeader from "./section-header";

const features = [
	{
		id: "01",
		totalItems: "03",
		title: "EQUIPMENT",
		subtitle: "Features & Specifications",
		description:
			"Carefully curated equipment and specifications\nthat adapt seamlessly to your individual lifestyle",
		image: "/itjustworks.jpg",
	},
	{
		id: "02",
		totalItems: "03",
		title: "STORAGE",
		subtitle: "Storage Solutions",
		description:
			"Refined storage systems that create\nspace and harmony in your daily life",
		image: "/itjustworks.jpg",
	},
	{
		id: "03",
		totalItems: "03",
		title: "KITCHEN",
		subtitle: "Kitchen Design",
		description:
			"Functional kitchen spaces that elevate\nyour culinary experience",
		image: "/itjustworks.jpg",
	},
];

const Features = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	useGSAP(
		() => {
			const features = gsap.utils.toArray(".feature") as HTMLDivElement[];

			features.forEach((feature) => {
				gsap.to(feature, {
					yPercent: 20,
					startAt: {
						filter: "brightness(1)",
					},
					filter: "brightness(0.5)",
					ease: "none",
					scrollTrigger: {
						// scroller: ".scroll-container",
						trigger: feature,
						start: "top top",
						end: "bottom top",
						scrub: true,
						// markers: true,
					},
				});
			});
		},
		{ scope: sectionRef }
	);
	return (
		<section
			ref={sectionRef}
			className="overflow-hidden"
			id="parallax-content-image"
		>
			<SectionHeader>Parallax Content Image</SectionHeader>
			{features.map((feature, index) => (
				<div
					key={index + "features-item"}
					className="feature relative isolate overflow-hidden"
				>
					<div className="container grid min-h-[60vh] place-items-center py-28 text-foreground lg:min-h-[80vh]">
						<div className="flex h-full w-full flex-col items-center justify-between">
							<div className="flex w-full items-start justify-between gap-x-[20vw] border-t border-white pt-5 lg:mr-auto lg:max-w-[40vw] xl:max-w-[30vw]">
								<div>
									<span className="fs-38-56">0{index + 1}</span>
									<span className="text-xs">/0{features.length}</span>
								</div>
								<p className="text-xxs">Number of contents.</p>
							</div>
							<div className="text-center">
								<h2 className="mb-2 uppercase fs-40-85">
									{feature.title}
								</h2>
								<p>{feature.subtitle}</p>
							</div>

							<div className="flex w-full items-start justify-between gap-x-[20vw] border-t border-white pt-5 lg:ml-auto lg:w-fit lg:max-w-[48vw] xl:max-w-[35vw]">
								<p className="text-xs">{feature.description}</p>
								<p className="text-xxs">Description.</p>
							</div>
						</div>
					</div>

					<img
						src={feature.image}
						alt="feature image"
						className="absolute inset-0 -z-10 h-full w-full object-cover brightness-50"
						loading="lazy"
					/>
				</div>
			))}
		</section>
	);
};

export default Features;
```

### `components/ui/cielia-replication/gallery.tsx`

```tsx
"use client";

import React, { MouseEvent, useEffect, useRef } from "react";

import Image from "next/image";

import SectionHeader from "./section-header";

const tiles = [
	{
		image: "/itjustworks.jpg",
		styles: {
			backgroundColor: "#D5D5D5 ",
			top: "22%",
			left: "28%",
			aspectRatio: 16 / 11,
			width: "15%",
		},
	},

	{
		image: "/itjustworks.jpg",
		styles: {
			backgroundColor: "#D5D5D5 ",
			top: "19%",
			left: "50%",
			width: "8%",
			aspectRatio: 9 / 11,
		},
	},

	{
		image: "/itjustworks.jpg",
		styles: {
			backgroundColor: "#EDEDED",
			top: "50%",
			left: "24%",
			width: "12%",
			aspectRatio: 4 / 3,
		},
	},
	{
		image: "/itjustworks.jpg",
		styles: {
			backgroundColor: "#E5E5E5 ",
			top: "71%",
			left: "26%",
			width: "12%",
			aspectRatio: 4 / 3,
		},
	},

	{
		image: "/itjustworks.jpg",
		styles: {
			backgroundColor: "#E5E5E5 ",
			top: "63%",
			left: "46%",
			width: "15%",
			aspectRatio: 4 / 3,
		},
	},

	{
		image: "/itjustworks.jpg",
		styles: {
			backgroundColor: "#EDEDED",
			top: "36%",
			left: "64%",
			width: "12%",
			aspectRatio: 4 / 6,
		},
	},

	{
		image: "/itjustworks.jpg",
		styles: {
			backgroundColor: "#F0F0F0",
			top: "71%",
			left: "73%",
			width: "6%",
			aspectRatio: 4 / 6,
		},
	},
	{
		image: "/itjustworks.jpg",
		styles: {
			backgroundColor: "#EDEDED",
			top: "54%",
			left: "82%",
			width: "10%",
			aspectRatio: 16 / 14,
		},
	},
	{
		image: "/itjustworks.jpg",
		styles: {
			backgroundColor: "#E9E9E9",
			top: "9%",
			left: "74%",
			width: "8%",
			aspectRatio: 9 / 10,
		},
	},
	{
		image: "/itjustworks.jpg",
		styles: {
			backgroundColor: "#E5E5E5",
			top: "12%",
			left: "15%",
			width: "6%",
			aspectRatio: 9 / 12,
		},
	},
	{
		image: "/itjustworks.jpg",
		styles: {
			backgroundColor: "#E1E1E1",
			top: "40%",
			left: "11%",
			width: "7%",
			aspectRatio: 10 / 16,
		},
	},

	{
		image: "/itjustworks.jpg",
		styles: {
			backgroundColor: "#DDDDDD",
			top: "69%",
			left: "5%",
			width: "15%",
			aspectRatio: 20 / 16,
		},
	},
	{
		image: "/itjustworks.jpg",
		styles: {
			backgroundColor: "#D5D5D5",
			top: "10%",
			left: "4%",
			width: "10%",
			aspectRatio: 16 / 23,
		},
	},
	{
		image: "/itjustworks.jpg",
		styles: {
			backgroundColor: "#D9D9D9",
			top: "30%",
			left: "80%",
			width: "17%",
			aspectRatio: 16 / 9,
		},
	},
];

const Gallery = () => {
	const $backdrop = useRef<HTMLDivElement>(null);
	const vw = useRef(0);
	const vh = useRef(0);

	const handleOnMouseMove = (e: MouseEvent) => {
		const mouseX = e.clientX;
		const mouseY = e.clientY;

		const percentageX = ((mouseX / vw.current - 0.5) * -100) / 4;
		const percentageY = ((mouseY / vh.current - 0.5) * -100) / 4;

		$backdrop.current?.animate(
			{
				transform: `translateX(${percentageX}%) translateY(${percentageY}%)`,
			},
			{ fill: "forwards", duration: 4000, easing: "ease" }
		);
	};

	const updateViewDimension = () => {
		vw.current = window.innerWidth;
		vh.current = window.innerHeight;
	};
	useEffect(() => {
		vw.current = window.innerWidth;
		vh.current = window.innerHeight;

		window.addEventListener("resize", updateViewDimension);

		return () => {
			window.removeEventListener("resize", updateViewDimension);
		};
	}, []);

	return (
		<section>
			<SectionHeader>Gallery</SectionHeader>
			<div className="relative grid h-screen place-items-center overflow-hidden bg-background">
				<div className="relative z-10 inline-block text-center text-foreground">
					<h1 className="text-foreground fs-38-56">Gallery</h1>
				</div>
				<div
					className="absolute -bottom-[20vh] -left-[20vw] -right-[20vw] -top-[20vh]"
					ref={$backdrop}
				>
					<div
						className="relative h-full w-full"
						onMouseMove={handleOnMouseMove}
					>
						{tiles.map((tile, index) => {
							return (
								<div
									key={index + "gallery-item"}
									style={{ ...tile.styles }}
									className="absolute overflow-hidden rounded-2xl transition-transform duration-700 ease-out hover:scale-105"
								>
									<div className="relative h-full w-full opacity-0 transition-opacity duration-700 ease-out hover:opacity-100">
										<img
											src={tile.image}
											className="h-full w-full object-cover"
											alt="Tile images"
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Gallery;
```

### `components/ui/cielia-replication/gsap-provider.tsx`

```tsx
"use client";

import { useEffect, useState } from "react";

import Tempus from "tempus";
import gsap from "gsap";

import { ScrollTriggerConfig } from "./scroll-trigger-context";

export function GsapProvider({ scrollTrigger = true }) {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		gsap.defaults({ ease: "none" });

		// merge rafs
		gsap.ticker.lagSmoothing(0);
		gsap.ticker.remove(gsap.updateRoot);
		Tempus?.add((time: number) => {
			gsap.updateRoot(time / 1000);
		}, 0);

		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return scrollTrigger && <ScrollTriggerConfig />;
}
```

### `components/ui/cielia-replication/improvements.tsx`

```tsx
"use client";

import React, { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import SectionHeader from "./section-header";

const galleryItems = [
	["/itjustworks.jpg", "/itjustworks.jpg", "/itjustworks.jpg"],
	["/itjustworks.jpg", "/itjustworks.jpg", "/itjustworks.jpg"],
	["/itjustworks.jpg", "/itjustworks.jpg", "/itjustworks.jpg"],
];

const Improvements = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const galleryRef = useRef<HTMLDivElement>(null);
	useGSAP(
		() => {
			const GridSecAnim = gsap.timeline({
				scrollTrigger: {
					// scroller: ".scroll-container",
					trigger: ".gallery-wrapper",
					start: "top 100%",
					end: "top 0%",
					scrub: true,
				},
			});
			GridSecAnim.fromTo(
				".gallery-col:nth-of-type(1)",
				{
					transform: "translateY(-10vh)",
				},
				{
					transform: "translateY(0vh)",
				},
				"<"
			);
			GridSecAnim.fromTo(
				".gallery-col:nth-of-type(2)",
				{
					transform: "translateY(10vh)",
				},
				{
					transform: "translateY(0vh)",
				},
				"<"
			);
			GridSecAnim.fromTo(
				".gallery-col:nth-of-type(3)",
				{
					transform: "translateY(-10vh)",
				},
				{
					transform: "translateY(0vh)",
				},
				"<"
			);

			const gridSecPinAnim = gsap.timeline({
				scrollTrigger: {
					// scroller: ".scroll-container",
					trigger: ".gallery-wrapper",
					start: "top 0%",
					end: "+=200%",
					scrub: true,
					pin: true,
				},
			});

			gridSecPinAnim.fromTo(
				".gallery-col",
				{
					width: "31.97vw",
					height: "150vh",
					filter: "brightness(1)",
				},
				{
					width: "100vw",
					height: "300vh",
					filter: "brightness(0.7)",
				},
				"<"
			);

			gridSecPinAnim.fromTo(
				[".title-wrap", ".desc-wrap"],
				{
					opacity: 0,
				},
				{
					opacity: 1,
				},
				"<"
			);
			gridSecPinAnim.fromTo(
				".title-wrap h2 span",
				{
					clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
				},
				{
					clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
				}
			);
		},
		{ scope: sectionRef }
	);
	return (
		<section className="overflow-hidden" ref={sectionRef}>
			<SectionHeader>Improvements</SectionHeader>
			<div className="gallery-wrapper relative h-screen overflow-hidden">
				<div
					className="gallery absolute left-1/2 top-1/2 flex h-[150vh] w-fit -translate-x-1/2 -translate-y-1/2 scale-110 items-center justify-between gap-8"
					ref={galleryRef}
				>
					{galleryItems.map((cols, index) => (
						<div
							key={index + "improvements"}
							className="gallery-col flex h-full w-[33vw] flex-col gap-8"
						>
							{cols.map((img, colIndex) => (
								<div
									key={colIndex}
									className="gallery-row grid h-[33%] w-full place-items-center overflow-hidden bg-background text-foreground"
								>
									<img
										src={img}
										alt="improve images"
										className="h-full w-full object-cover"
									/>
								</div>
							))}
						</div>
					))}
				</div>

				<div className="title-wrap absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-foreground fs-25-43">
					<h2 className="w-max text-center">
						<span>
							Reevaluating past housing facilities and storage features.
						</span>
						<br />
						<br />
						<span>
							Small improvements can bring great satisfaction to your
							daily life.
						</span>
					</h2>
				</div>

				<div className="desc-wrap absolute bottom-10 right-[3vw] w-[31vw] border-t border-white pt-2.5 text-right text-foreground">
					これまで
				</div>
			</div>
		</section>
	);
};

export default Improvements;
```

### `components/ui/cielia-replication/introduction.tsx`

```tsx
"use client";

import React, { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import LottieScrollTrigger from "./lottie-scroll-trigger";
import SectionHeader from "./section-header";

gsap.registerPlugin(ScrollTrigger);

const Introduction = () => {
	const sectionRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			// Layout animation
			LottieScrollTrigger({
				target: "#lottie-container",
				path: "/lottie.json",
			});

			const layoutTimeline = gsap.timeline({
				scrollTrigger: {
					// scroller: ".scroll-container",
					trigger: "#lottie-container",
					start: "top 60%",
					end: "top -40%",
					scrub: 0.6,
				},
			});
			layoutTimeline.to(
				".mask-right",
				{
					scaleX: 0,
					transformOrigin: "right",
				},
				"<"
			);
			layoutTimeline.to(
				".mask-top",
				{
					scaleY: 0,
					transformOrigin: "top",
				},
				"<"
			);
			layoutTimeline.fromTo(
				".title",
				{
					xPercent: 30,
					y: "10vh",
				},
				{
					y: 0,
					xPercent: 0,
				},
				"<"
			);
			layoutTimeline.fromTo(
				".content",
				{
					transform: "translate(30%,10vh)",
				},
				{
					transform: "translate(0%,0%)",
				},
				"<"
			);
			layoutTimeline.fromTo(
				"#lottie-container",
				{
					transform: "translateY(20vh)",
				},
				{
					transform: "translateY(0vh)",
				},
				"<"
			);

			// Image animation
			const contentImages = gsap.utils.toArray(
				".content-image"
			) as HTMLDivElement[];

			contentImages?.forEach((contentImage) => {
				const overlay = contentImage.querySelector(".overlay");
				const imageWrapper = contentImage.querySelector(".image");
				const image = contentImage.querySelector(".image img");

				const overlayTimeline = gsap.timeline({
					scrollTrigger: {
						// scroller: ".scroll-container",
						trigger: contentImage,
						start: "top 100%",
						end: "top 80%",
						toggleActions: "play play reverse none",
					},
					defaults: {
						duration: 0.6,
					},
				});

				overlayTimeline.fromTo(
					overlay,
					{
						clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
					},
					{
						clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
					}
				);
				overlayTimeline.fromTo(
					imageWrapper,
					{
						clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
					},
					{
						clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
					}
				);

				const imageTimeline = gsap.timeline({
					scrollTrigger: {
						// scroller: ".scroll-container",
						trigger: contentImage,
						start: "top 100%",
						end: "bottom 0%",
						scrub: 0.6,
					},
				});

				gsap.set(image, { scale: 1.1 });
				imageTimeline.fromTo(
					image,
					{
						yPercent: -5,
					},
					{
						yPercent: 5,
					}
				);
			});
		},
		{ scope: sectionRef }
	);

	return (
		<section id="introduction" className="overflow-hidden" ref={sectionRef}>
			<SectionHeader>Introduction</SectionHeader>
			<div className="relative bg-background pb-64 pt-[calc(70vh+120px)]">
				<div className="mask-top absolute left-0 top-0 h-[60vh] w-full bg-background will-change-transform"></div>
				<div
					className="absolute left-0 top-0 w-full will-change-transform"
					id="lottie-container"
				></div>
				<div className="mask-right absolute right-0 top-0 z-10 h-full w-[70vw] bg-background will-change-transform"></div>
				<div className="container space-y-52 leading-normal text-foreground">
					<h2 className="title fs-25-43">
						Live the way you are
						<br />
						Enjoy the joy of being yourself.
					</h2>
					<div className="content ml-auto flex w-[66vw] justify-between">
						<p>
							If you're unsure, choose the fun option’—a great saying
							<br />
							But when it comes to living spaces, it's a different matter
							<br />
							Even when chosen intuitively, people change.
							<br />
							And they will continue to change.
						</p>

						<div className="content-image relative aspect-square w-[23vw] overflow-hidden">
							<div className="overlay absolute h-full w-full bg-background"></div>
							<div className="image relative h-full w-full">
								<img
									src="/itjustworks.jpg"
									className="h-full w-full object-cover"
									alt=""
								/>
							</div>
						</div>
					</div>

					<div className="flex gap-x-[18vw]">
						<div className="content-image relative aspect-square w-[46vw] overflow-hidden">
							<div className="overlay absolute h-full w-full bg-background"></div>
							<div className="image relative h-full w-full">
								<img
									src="/itjustworks.jpg"
									className="h-full w-full object-cover"
									alt=""
								/>
							</div>
						</div>
						<p>
							So, when thinking about your home,
							<br />
							I hope you'll pause for just a moment,
							<br />
							and take a long-term view, looking far into the future.
							<br />
							Thinking about the future may feel a little overwhelming,
							<br />
							<br />
							but when you think of it as being for your future,
							<br />
							you’ll find your heart mysteriously uplifted.
						</p>
					</div>

					<div className="ml-auto flex w-[85vw] justify-between">
						<p>
							In the ordinary moments of everyday life,
							<br />
							you suddenly feel a sense of being yourself.
							<br />
							into each aspect of your home.
							<br />
							<br />
							So, where shall we begin together?
							<br />
							First, let us hear your story.
							<br />
						</p>

						<div className="content-image relative aspect-square w-[35vw] overflow-hidden">
							<div className="overlay absolute h-full w-full bg-background"></div>
							<div className="image relative h-full w-full">
								<img
									src="/itjustworks.jpg"
									className="h-full w-full object-cover"
									alt=""
								/>
							</div>
						</div>
					</div>

					<div className="flex items-start gap-x-[12vw]">
						<div className="content-image relative aspect-square w-[35vw] overflow-hidden">
							<div className="overlay absolute h-full w-full bg-background"></div>
							<div className="image relative h-full w-full">
								<img
									src="/itjustworks.jpg"
									className="h-full w-full object-cover"
									alt=""
								/>
							</div>
						</div>
						<div className="content-image relative mt-52 aspect-square w-[26vw] overflow-hidden">
							<div className="overlay absolute h-full w-full bg-background"></div>
							<div className="image relative h-full w-full">
								<img
									src="/itjustworks.jpg"
									className="h-full w-full object-cover"
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Introduction;
```

### `components/ui/cielia-replication/lottie-scroll-trigger.tsx`

```tsx
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import lottie, { AnimationConfigWithPath, AnimationItem } from "lottie-web";

gsap.registerPlugin(ScrollTrigger);

interface PlayheadType {
	frame: number;
}

type SpeedOptions = {
	readonly slow: string;
	readonly medium: string;
	readonly fast: string;
};

type RendererSettings = {
	preserveAspectRatio: string;
	[key: string]: unknown;
};

interface LottieScrollTriggerVars {
	target: string | Element | Element[];
	path: string;
	speed?: keyof SpeedOptions;
	renderer?: "svg";
	rendererSettings?: RendererSettings;
	[key: string]: unknown;
}

interface ScrollTriggerConfig {
	trigger: Element;
	pin: boolean;
	start: string;
	end: string;
	scrub: number;
	[key: string]: unknown;
}

interface GSAPContext {
	add: (fn: () => void) => void;
}

function LottieScrollTrigger(vars: LottieScrollTriggerVars): AnimationItem {
	const playhead: PlayheadType = { frame: 0 };
	const target = gsap.utils.toArray(vars.target)[0] as Element;

	const speeds: SpeedOptions = {
		slow: "+=2000",
		medium: "+=1000",
		fast: "+=500",
	} as const;

	const st: ScrollTriggerConfig = {
		trigger: target,
		pin: false,
		start: "top 60%",
		end: "top -40%",
		scrub: 0.6,
	};

	const ctx = (gsap.context && gsap.context()) as GSAPContext | undefined;

	const animationConfig: AnimationConfigWithPath = {
		container: target,
		renderer: vars.renderer || "svg",
		loop: false,
		autoplay: false,
		path: vars.path,
		rendererSettings: vars.rendererSettings || {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	const animation: AnimationItem = lottie.loadAnimation(animationConfig);

	// Add ScrollTrigger properties from vars
	for (const p in vars) {
		if (Object.prototype.hasOwnProperty.call(vars, p)) {
			st[p] = vars[p];
		}
	}

	animation.addEventListener("DOMLoaded", function (): void {
		const createTween = function (): () => void {
			(
				animation as AnimationItem & { frameTween?: gsap.core.Tween }
			).frameTween = gsap.to(playhead, {
				frame: animation.totalFrames - 1,
				ease: "none",
				onUpdate: () =>
					animation.goToAndStop(Math.round(playhead.frame), true),
				scrollTrigger: st,
			});

			return () => {
				if (typeof animation.destroy === "function") {
					animation.destroy();
				}
			};
		};

		if (ctx?.add) {
			ctx.add(createTween);
		} else {
			createTween();
		}

		ScrollTrigger.sort();
		ScrollTrigger.refresh();
	});

	return animation;
}

export default LottieScrollTrigger;
```

### `components/ui/cielia-replication/scroll-trigger-context.tsx`

```tsx
"use client";

import { useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

export function ScrollTriggerConfig() {
	const lenis = useLenis(ScrollTrigger.update);

	useEffect(() => {
		ScrollTrigger.clearScrollMemory("manual");

		return () => {
			ScrollTrigger.clearScrollMemory("manual");
		};
	}, []);

	useEffect(() => ScrollTrigger.refresh(), [lenis]);

	return null;
}
```

### `components/ui/cielia-replication/section-header.tsx`

```tsx
import React, { PropsWithChildren } from "react";

const SectionHeader = ({ children }: PropsWithChildren) => {
	return <div className="container py-10 fs-40-85">{children}</div>;
};

export default SectionHeader;
```

### `components/ui/cielia-replication/services.tsx`

```tsx
"use client";

import React, { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import SectionHeader from "./section-header";

const features = [
	{
		title: "EQUIPMENT",
		subtitle: "Home Features and Storage Solutions",
		description:
			"Tailored living spaces with thoughtfully designed home features and storage options to seamlessly suit every lifestyle.",
		img: "/itjustworks.jpg",
	},
	{
		title: "PLAN DESIGN",
		subtitle: "Floor Plan Design",
		description:
			"Creating spaces that feel like home, with floor plans meticulously crafted to enhance comfort, including considerations for furniture placement and functional flow.",
		img: "/itjustworks.jpg",
	},
	{
		title: "PRIVATE GARDEN",
		subtitle: "Exclusive Garden Design",
		description:
			"Expanding your lifestyle with private garden spaces, perfect for sunny days as an additional living area where you can bring your ideal outdoor experiences to life.",
		img: "/itjustworks.jpg",
	},
];

const Services = () => {
	const sectionRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const services = gsap.utils.toArray(".service") as HTMLDivElement[];
			services.forEach((service) => {
				const img = service.querySelector(".bg-img") as HTMLImageElement;
				gsap.to(img, {
					yPercent: 50,
					ease: "none",
					scrollTrigger: {
						// scroller: ".scroll-container",
						trigger: service,
						start: "top 0%",
						end: "bottom -50%",
						scrub: true,
						// markers: true,
					},
				});
			});
		},
		{ scope: sectionRef }
	);
	return (
		<section ref={sectionRef}>
			<SectionHeader>Services</SectionHeader>
			<div>
				{features.map(({ title, description, subtitle, img }, index) => {
					const isFirstAndLast = !index || index === features.length - 1;
					return (
						<div
							key={index + "services-items"}
							className="service relative h-screen w-full text-foreground will-change-[contain] contain-paint"
						>
							<div
								className="absolute w-full"
								style={{
									// The height of middle items should cover the previous and next item
									height: isFirstAndLast ? `200vh` : "300vh",
									top: index ? `-100vh` : "0",
								}}
							>
								<div className="sticky top-0 isolate h-screen w-full">
									<div className="container flex h-full justify-between gap-x-[150px] py-[20vh]">
										<div className="flex flex-668 flex-col justify-between">
											<div className="flex justify-between border-t border-t-white pt-2.5">
												<div>
													<span className="fs-25-43">
														0{index + 1}
													</span>
													/0
													{features.length}
												</div>
												<p className="text-xs">
													Number of products.
												</p>
											</div>
											<div>
												<h3 className="mb-3 uppercase fs-38-56">
													{title}
												</h3>
												<p className="fs-17-20">{subtitle}</p>
											</div>

											<p className="text-2xl">{description}</p>
										</div>
										<div className="flex-768 bg-background">
											<img
												src={img}
												alt={title}
												loading="lazy"
												className="h-full w-full object-cover"
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="bg-img absolute inset-0 top-auto -z-10 brightness-50 grayscale will-change-transform">
								<img
									src={img}
									alt={title}
									loading="lazy"
									className="h-full w-full object-cover"
								/>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default Services;
```
