# Feature

- Categories: Grids & Layouts
- Tags: scroll-driven, hover, autoplay
- Import: `@/components/ui/feature`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/feature.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Registry dependencies

- `accordion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `data` *(required)* | `CardDataProps` | — | — |
| `collapseDelay` | `number` | `5000` | — |
| `ltr` | `boolean` | `false` | — |
| `linePosition` | `"left" | "right"` | `"left"` | — |

## Usage

```tsx
"use client";

import Feature from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<Feature />
		</div>
	);
}
```

## Source

### `components/ui/feature.tsx`

```tsx
import { useEffect, useRef, useState } from "react";

import Link from "next/link";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useInView } from "motion/react";

type CardDataProps = {
	blogEntries: {
		id: number;
		title: string;
		short?: string;
		image?: { url }[];
		video?: string;
		post?: string;
		uri: string;
	}[];
};

type FeatureProps = {
	collapseDelay?: number;
	ltr?: boolean;
	linePosition?: "left" | "right";
	data: CardDataProps;
};

const Feature = ({
	collapseDelay = 5000,
	ltr = false,
	linePosition = "left",
	data,
}: FeatureProps) => {
	const [currentIndex, setCurrentIndex] = useState<number>(-1);

	const carouselRef = useRef<HTMLUListElement>(null);
	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: true,
		amount: 0.5,
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			if (isInView) {
				setCurrentIndex(0);
			} else {
				setCurrentIndex(-1);
			}
		}, 100);

		return () => clearTimeout(timer);
	}, [isInView]);

	const scrollToIndex = (index: number) => {
		if (carouselRef.current) {
			const card = carouselRef.current.querySelectorAll(".card")[index];
			if (card) {
				const cardRect = card.getBoundingClientRect();
				const carouselRect = carouselRef.current.getBoundingClientRect();
				const offset =
					cardRect.left -
					carouselRect.left -
					(carouselRect.width - cardRect.width) / 2;

				carouselRef.current.scrollTo({
					left: carouselRef.current.scrollLeft + offset - 5,
					behavior: "smooth",
				});
			}
		}
	};

	// interval for changing images
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex !== undefined
					? (prevIndex + 1) % data.blogEntries.length
					: 0
			);
		}, collapseDelay);

		return () => clearInterval(timer);
	}, [currentIndex]);

	useEffect(() => {
		const handleAutoScroll = () => {
			const nextIndex =
				(currentIndex !== undefined ? currentIndex + 1 : 0) %
				data.blogEntries.length;
			scrollToIndex(nextIndex);
		};

		const autoScrollTimer = setInterval(handleAutoScroll, collapseDelay);

		return () => clearInterval(autoScrollTimer);
	}, [currentIndex]);

	useEffect(() => {
		const carousel = carouselRef.current;
		if (carousel) {
			const handleScroll = () => {
				const scrollLeft = carousel.scrollLeft;
				const cardWidth = carousel.querySelector(".card")?.clientWidth || 0;
				const newIndex = Math.min(
					Math.floor(scrollLeft / cardWidth),
					data.blogEntries.length - 1
				);
				setCurrentIndex(newIndex);
			};

			carousel.addEventListener("scroll", handleScroll);
			return () => carousel.removeEventListener("scroll", handleScroll);
		}
	}, []);

	return (
		<section ref={ref} id="features" className="md:h-screen">
			<div className="py-14 h-full flex">
				<div className="container flex w-full flex-col items-center justify-center p-4 mx-auto h-full">
					<div className="mx-auto max-w-5xl text-center">
						<h4 className="text-xl font-bold tracking-tight text-foreground dark:text-foreground">
							My Ideas
						</h4>
						<h2 className="text-4xl font-bold tracking-tight text-foreground dark:text-foreground sm:text-6xl">
							Ideas that are mine
						</h2>
						<Link
							href="/thoughts"
							className="group relative inline-flex h-12 items-center justify-center rounded-md bg-background px-6 font-medium text-foreground mt-6"
						>
							<span>Check out the whole catelog</span>
							<div className="relative ml-1 h-5 w-5 overflow-hidden">
								<div className="absolute transition-transform duration-200 group-hover:-translate-y-5 group-hover:translate-x-4">
									<svg
										width="15"
										height="15"
										viewBox="0 0 15 15"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
									>
										<path
											d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
											fill="currentColor"
											fillRule="evenodd"
											clipRule="evenodd"
										></path>
									</svg>
									<svg
										width="15"
										height="15"
										viewBox="0 0 15 15"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 -translate-x-4"
									>
										<path
											d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
											fill="currentColor"
											fillRule="evenodd"
											clipRule="evenodd"
										></path>
									</svg>
								</div>
							</div>
						</Link>
					</div>
					<div className="mx-auto my-12 grid h-full grid-cols-5 sm:max-w-5xl gap-x-10 md:w-full md:overflow-hidden">
						{/* Tablet/Desktop view start */}
						<div
							className={`col-span-2 hidden md:flex ${
								ltr ? "md:order-2 md:justify-end" : "justify-start"
							}`}
						>
							<Accordion
								className="w-[300px] md:w-full"
								type="single"
								defaultValue={`item-${currentIndex}`}
								value={`item-${currentIndex}`}
								onValueChange={(value) =>
									setCurrentIndex(Number(value.split("-")[1]))
								}
							>
								{data.blogEntries.map((item, index: number) => (
									<AccordionItem
										key={item.id}
										className="relative mb-8 last:mb-0"
										value={`item-${index}`}
									>
										<div
											className={`absolute bottom-0 top-0 h-full w-0.5 overflow-hidden rounded-lg bg-background/50 dark:bg-background/30 ${
												linePosition === "right"
													? "left-auto right-0"
													: "left-0 right-auto"
											}`}
										>
											<div
												className={`absolute left-0 top-0 w-full ${
													currentIndex === index ? "h-full" : "h-0"
												} origin-top bg-background transition-all ease-linear dark:bg-background`}
												style={{
													transitionDuration:
														currentIndex === index
															? `${collapseDelay}ms`
															: "0s",
												}}
											></div>
										</div>
										<AccordionTrigger className="text-xl font-bold text-left">
											{item.title}
										</AccordionTrigger>
										<AccordionContent>
											<p>{item.short}</p>

											<Link
												href={`/${item?.uri}`}
												className="group relative inline-flex h-6 overflow-hidden rounded-md pr-6 font-medium text-foreground mt-2"
											>
												Read This
												<div className="w-0 translate-x-full pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
													<svg
														width="15"
														height="15"
														viewBox="0 0 15 15"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5"
													>
														<path
															d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
															fill="currentColor"
															fillRule="evenodd"
															clipRule="evenodd"
														></path>
													</svg>
												</div>
											</Link>
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
						{/* Tablet/Dekstop view end */}

						{/* Images Start */}
						<div
							className={`min-h-[343px] col-span-5 h-full w-auto md:col-span-3 md:overflow-hidden ${
								ltr && "md:order-1"
							}`}
						>
							{!!data.blogEntries[currentIndex]?.image?.length ? (
								<motion.img
									key={currentIndex}
									src={data.blogEntries[currentIndex].image[0].url}
									alt="feature"
									initial={{ opacity: 0, scale: 0.98 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.98 }}
									transition={{ duration: 0.25, ease: "easeOut" }}
									className="aspect-auto h-full w-full rounded-xl border border-neutral-300/50 object-cover p-1"
								/>
							) : data.blogEntries[currentIndex]?.video ? (
								<video
									preload="auto"
									src={data.blogEntries[currentIndex].video}
									className="aspect-auto h-full w-full rounded-lg object-cover"
									autoPlay
									loop
									muted
								/>
							) : (
								<div className="aspect-auto w-full aspect-square rounded-xl border border-neutral-300/50 bg-background p-1"></div>
							)}
						</div>
						{/* Images end */}

						{/* Mobile view start */}
						<ul
							ref={carouselRef}
							className="col-span-5 flex h-full snap-x flex-nowrap overflow-x-auto py-10 [-ms-overflow-style:none] md:[-webkit-mask-image:linear-gradient(90deg,transparent,black_20%,white_80%,transparent)] md:mask-[linear-gradient(90deg,transparent,black_20%,white_80%,transparent)] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden snap-mandatory"
							style={{
								padding: "50px calc(50%)",
							}}
						>
							{data.blogEntries.map((item, index) => (
								<div
									key={item.id}
									className="card relative mr-8 grid h-full max-w-60 md:max-w-80 shrink-0 items-start justify-center py-4 last:mr-0"
									onClick={() => setCurrentIndex(index)}
									style={{
										scrollSnapAlign: "center",
									}}
								>
									<div className="absolute bottom-0 left-0 right-auto top-0 h-0.5 w-full overflow-hidden rounded-lg bg-background/50 dark:bg-background/30">
										<div
											className={`absolute left-0 top-0 h-full ${
												currentIndex === index ? "w-full" : "w-0"
											} origin-top bg-background transition-all ease-linear dark:bg-background`}
											style={{
												transitionDuration:
													currentIndex === index
														? `${collapseDelay}ms`
														: "0s",
											}}
										></div>
									</div>
									<h2 className="text-xl font-bold">{item.title}</h2>
									<p className="mx-0 max-w-sm text-balance text-sm">
										{item.short}
									</p>
									<Link
										href={`/${item?.uri}`}
										className="group relative inline-flex h-6 overflow-hidden rounded-md pr-6 font-medium text-foreground mt-2"
									>
										Read This
										<div className="w-0 translate-x-full pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
											<svg
												width="15"
												height="15"
												viewBox="0 0 15 15"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5"
											>
												<path
													d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
													fill="currentColor"
													fillRule="evenodd"
													clipRule="evenodd"
												></path>
											</svg>
										</div>
									</Link>
								</div>
							))}
						</ul>
						{/* Mobile view end */}
					</div>
				</div>
			</div>
		</section>
	);
};

export function FeatureSection({ data }) {
	return <Feature collapseDelay={5000} linePosition="left" data={data} />;
}

export default Feature;
```
