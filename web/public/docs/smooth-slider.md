# Smooth Slider

- Categories: Carousels
- Tags: hover
- Import: `@/components/ui/smooth-slider`
- Inspiration: aetherui.in (adaptation) — https://aetherui.in/docs/smooth-slider#installation

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/smooth-slider.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `lucide-react`

## Usage

```tsx
"use client";

import React from "react";



import { AnimatedCard, AnimatedSlider, CardContent, DefaultView, OnHover } from "./component";
import { Bookmark } from "lucide-react";





export const animeData = [
	{
		id: "1",
		title: "Solo Leveling",
		image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000",
		year: "2024",
		seasons: "1 season",
		platform: "Crunchyroll",
	},
	{
		id: "2",
		title: "Ishura",
		image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?q=80&w=1000",
		year: "2024",
		seasons: "1 season",
		platform: "Crunchyroll",
	},
	{
		id: "3",
		title: "The Apothecary Diaries",
		image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=1000",
		year: "2023",
		seasons: "2 seasons",
		platform: "Crunchyroll",
	},
	{
		id: "4",
		title: "Zenshu",
		image: "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=1000",
		year: "2023",
		seasons: "1 season",
		platform: "Netflix",
	},
	{
		id: "5",
		title: "Sakamoto Days",
		image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000",
		year: "2024",
		seasons: "1 season",
		platform: "Crunchyroll",
	},
	{
		id: "6",
		title: "Dr. Stone",
		image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1000",
		year: "2019",
		seasons: "3 seasons",
		platform: "Crunchyroll",
	},
	{
		id: "7",
		title: "Unnamed Memory",
		image: "https://images.unsplash.com/photo-1705831156575-a5294d295a31?q=80&w=1000",
		year: "2024",
		seasons: "1 season",
		platform: "Crunchyroll",
	},
	{
		id: "8",
		title: "I Got Married to the Male Lead",
		image: "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?q=80&w=1000",
		year: "2024",
		seasons: "1 season",
		platform: "Crunchyroll",
	},
];


export default function Usage() {
	return (
		<div className="relative w-full flex items-center justify-center">
			<div className="w-full p-4">
				<AnimatedSlider title="Popular Anime">
					{animeData.map((anime) => (
						<AnimatedCard key={anime.id}>
							<CardContent>
								<img
									src={anime.image}
									alt={anime.title}
									className="h-full w-full object-cover"
									style={{ transition: "all 0.4s ease" }}
								/>
								<div className="absolute top-2 right-2 z-10">
									<button className="text-secondary transition-colors hover:text-secondary">
										<Bookmark className="h-5 w-5" />
									</button>
								</div>
								<OnHover fadeInDuration="0.5s">
									<div className="space-y-1">
										<h3 className="text-xl font-bold text-secondary">
											{anime.title}
										</h3>
										<p className="text-sm text-secondary">
											{anime.year} · {anime.seasons} ·{" "}
											{anime.platform}
										</p>
										<button className="mt-3 flex items-center gap-1 rounded bg-background/20 px-3 py-1 text-sm text-secondary backdrop-blur-xs transition-colors hover:bg-background/30">
											Watch options
										</button>
									</div>
								</OnHover>
								<DefaultView>{anime.title}</DefaultView>
							</CardContent>
						</AnimatedCard>
					))}
				</AnimatedSlider>
			</div>
		</div>
	);
}
```

## Source

### `components/ui/smooth-slider.tsx`

```tsx
"use client";

import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Credit:
// https://aetherui.in/docs/smooth-slider#installation

type AnimatedCardContextType = {
	isHovered: boolean;
	setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
};

const AnimatedCardContext = createContext<AnimatedCardContextType | null>(null);

export const useAnimatedCard = () => {
	const context = useContext(AnimatedCardContext);
	if (!context) {
		throw new Error(
			"useAnimatedCard must be used within a AnimatedCard Profvider"
		);
	}

	return context;
};

type AnimatedSliderProps = {
	title?: string;
	children: React.ReactNode;
	className?: string;
	gap?: number;
	scrollAmount?: number;
} & React.ComponentProps<"div">;

function AnimatedSlider({
	gap = 16,
	scrollAmount = 300,
	...props
}: AnimatedSliderProps) {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [showLeftArrow, setShowLeftArrow] = useState(false);
	const [showRightArrow, setShowRightArrow] = useState(true);

	const checkArrows = () => {
		if (!sliderRef.current) return;

		const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
		setShowLeftArrow(scrollLeft > 0);
		setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // when there is enough space to scroll to the right
		console.log("scrolLeft", scrollLeft > 0);
		console.log("scrollWidth", scrollLeft < scrollWidth - clientWidth - 10);
	};

	useEffect(() => {
		const slider = sliderRef.current;
		if (!slider) return;

		slider.addEventListener("scroll", checkArrows);
		window.addEventListener("resize", checkArrows);

		checkArrows();

		return () => {
			slider.removeEventListener("scroll", checkArrows);
			window.removeEventListener("resize", checkArrows);
		};
	}, []);

	const scrollHandler = (direction: "left" | "right") => {
		if (!sliderRef.current) return;

		const currentScroll = sliderRef.current.scrollLeft;
		// left: 500-300 (move 300 units to left), right: 500+300 (move 300 units to right)
		const newScrollLeft =
			direction === "left"
				? currentScroll - scrollAmount
				: currentScroll + scrollAmount;

		sliderRef.current.scrollTo({
			left: newScrollLeft,
			behavior: "smooth",
		});
	};

	return (
		<div className={cn("w-full", props.className)} {...props}>
			{props.title && (
				<h2 className="text-primary mb-4 text-2xl font-bold">
					{props.title}
				</h2>
			)}

			<div className="group relative">
				<div
					ref={sliderRef}
					className="scrollbar-hide flex overflow-x-auto pb-4"
					style={{
						scrollbarWidth: "none",
						msOverflowStyle: "none",
						gap: `${gap}px`,
					}}
				>
					{props.children}
				</div>

				{showLeftArrow && (
					<button
						onClick={() => scrollHandler("left")}
						className="absolute top-1/2 left-0 z-10 -translate-x-2 -translate-y-1/2 scale-0 rounded-full bg-background/50 p-2 text-foreground transition-transform group-hover:translate-x-2 group-hover:scale-100"
						aria-label="Scroll left"
					>
						<ChevronLeft className="h-6 w-6" />
					</button>
				)}

				{showRightArrow && (
					<button
						onClick={() => scrollHandler("right")}
						className="absolute top-1/2 right-0 z-10 translate-x-2 -translate-y-1/2 scale-0 rounded-full bg-background/50 p-2 text-foreground transition-transform group-hover:-translate-x-2 group-hover:scale-100"
						aria-label="Scroll right"
					>
						<ChevronRight className="h-6 w-6" />
					</button>
				)}
			</div>
		</div>
	);
}

AnimatedSlider.displayName = "AnimatedSlider";

type AnimatedCardProps = {
	className?: string;
	children: React.ReactNode;
	defaultWidth?: string;
	expandedWidth?: string;
	height?: string;
	transitionDuration?: string;
	transitionEasing?:
		| "linear"
		| "ease"
		| "ease-in"
		| "ease-out"
		| "ease-in-out"
		| `cubic-bezier(${number}, ${number}, ${number}, ${number})`;
} & React.ComponentProps<"div">;

function AnimatedCard({
	children,
	className,
	defaultWidth = "180px",
	expandedWidth = "320px",
	height = "270px",
	transitionDuration = "0.4s",
	transitionEasing = "ease",
	...props
}: AnimatedCardProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<AnimatedCardContext.Provider value={{ isHovered, setIsHovered }}>
			<div
				className={cn("relative shrink-0 cursor-pointer", className)}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				style={{
					width: isHovered ? expandedWidth : defaultWidth,
					height,
					transition: `width ${transitionDuration} ${transitionEasing}`,
				}}
				{...props}
			>
				{children}
			</div>
		</AnimatedCardContext.Provider>
	);
}

AnimatedCard.displayName = "AnimatedCard";

type CardContentProps = {
	className?: string;
	children: React.ReactNode;
	defaultAspectRatio?: string;
	expandedAspectRatio?: string;
} & React.ComponentProps<"div">;

function CardContent({
	className,
	children,
	defaultAspectRatio = "aspect-2/3",
	expandedAspectRatio = "aspect-video",
	...props
}: CardContentProps) {
	const { isHovered } = useAnimatedCard();

	return (
		<div
			className={cn(
				"relative h-full w-full overflow-hidden rounded-lg transition-[aspect-ratio] duration-[400] ease-in",
				isHovered ? expandedAspectRatio : defaultAspectRatio,
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}

CardContent.displayName = "CardContent";

type OnHoverProps = {
	className?: string;
	children: React.ReactNode;
	fadeInDuration?: string;
} & React.ComponentProps<"div">;

function OnHover({
	className,
	children,
	fadeInDuration = "0.3s",
	...props
}: OnHoverProps) {
	const { isHovered } = useAnimatedCard();

	return (
		<div
			className={cn(
				"absolute inset-0 flex flex-col justify-end bg-linear-to-t from-background/90 via-background/60 to-transparent p-4 transition-[transform,opacity] duration-300 ease-in-out",
				isHovered
					? "translate-y-0 opacity-100"
					: "translate-y-full opacity-0",
				className
			)}
			style={{
				animation: `fadeIn ${fadeInDuration} ease-in-out`,
			}}
			{...props}
		>
			{children}
		</div>
	);
}

OnHover.displayName = "OnHover";

type DefaultViewProps = {
	className?: string;
	children: React.ReactNode;
} & React.ComponentProps<"div">;

function DefaultView({ className, children, ...props }: DefaultViewProps) {
	const { isHovered } = useAnimatedCard();

	return (
		<div
			className={cn(
				"fade-in-20 absolute right-0 bottom-0 left-0 truncate p-2 text-sm font-medium text-foreground transition-[transform,opacity] duration-200 ease-in-out",
				!isHovered
					? "translate-y-0 opacity-100"
					: "translate-y-full opacity-0",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}

DefaultView.displayName = "DefaultView";

export { AnimatedSlider, AnimatedCard, CardContent, OnHover, DefaultView };
```

## Attribution

Source: aetherui.in · Original: https://aetherui.in/docs/smooth-slider#installation

Adapted from the original. Credit the original author when you ship this.
