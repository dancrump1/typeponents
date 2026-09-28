# Progress Carousel

Image carousel with captioned tab buttons across the bottom, each filling with a progress bar while its slide is showing.

**Interaction.** Slides advance on their own as the active tab's bar fills; clicking another tab rushes the current bar to the end, then cross-fades to that slide and restarts the timer.

- Categories: Carousels
- Tags: autoplay
- Import: `@/components/ui/progress-carousel`
- Inspiration: UI Layouts (adaptation) — https://www.ui-layouts.com/components/progressive-carousel

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/progress-carousel.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Usage

```tsx
"use client";

import React from "react";

import Image from "next/image";

import {
	ProgressCarousel,
	SliderBtn,
	SliderBtnGroup,
	SliderContent,
	SliderWrapper,
} from "./component";

export default function Usage() {
	const items = [
		{
			img: "/itjustworks.jpg",
			title: "Bridge",
			desc: "A breathtaking view of a city illuminated by countless lights, showcasing the vibrant and bustling nightlife.",
			sliderName: "bridge",
		},
		{
			img: "/itjustworks.jpg",
			title: "Mountains View",
			desc: "A serene lake reflecting the surrounding mountains and trees, creating a mirror-like surface.",
			sliderName: "mountains",
		},
		{
			img: "/itjustworks.jpg",
			title: "Autumn",
			desc: "A picturesque path winding through a dense forest adorned with vibrant autumn foliage.",
			sliderName: "autumn",
		},
		{
			img: "/itjustworks.jpg",
			title: "Foggy",
			sliderName: "foggy",
			desc: "A stunning foggy view over the foresh, with the sun casting a golden glow across the forest. ",
		},
	];
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<ProgressCarousel vertical={false} activeSlider="bridge">
				<SliderContent>
					{items.map((item, index) => (
						<SliderWrapper value={item?.sliderName + "wrapper"}>
							<Image
								className="rounded-xl 2xl:h-[500px] h-[350px] object-cover"
								src={item.img}
								width={1900}
								height={1080}
								alt={item.desc}
							/>
						</SliderWrapper>
					))}
				</SliderContent>

				<SliderBtnGroup className="absolute bottom-0 h-fit dark:text-secondary text-secondary dark:bg-background/40 bg-background/40  backdrop-blur-md overflow-hidden grid grid-cols-2 md:grid-cols-4  rounded-md">
					{items.map((item, index) => (
						<SliderBtn
							value={item?.sliderName}
							className="text-left  p-3 border-r"
							progressBarClass="dark:bg-background bg-background h-full"
						>
							<span className="relative px-4 rounded-full w-fit dark:bg-background dark:text-secondary text-secondary bg-background mb-2">
								{item.title}
							</span>
							<span className="text-sm font-medium  line-clamp-2">
								{item.desc}
							</span>
						</SliderBtn>
					))}
				</SliderBtnGroup>
			</ProgressCarousel>{" "}
		</div>
	);
}
```

## Source

### `components/ui/progress-carousel.tsx`

```tsx
import React, {
	createContext,
	FC,
	ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

// Credit:
// https://www.ui-layouts.com/components/progressive-carousel

// Define the type for the context value
interface ProgressCarouselContextType {
	active: string;
	progress: number;
	handleButtonClick: (value: string) => void;
	vertical: boolean;
}

// Define the type for the component props
interface ProgressCarouselProps {
	children: ReactNode;
	duration?: number;
	fastDuration?: number;
	vertical?: boolean;
	activeSlider: string;
	className?: string;
}

interface SliderContentProps {
	children: ReactNode;
	className?: string;
}

interface SliderWrapperProps {
	children: ReactNode;
	value: string;
	className?: string;
}

interface ProgressBarProps {
	children: ReactNode;
	className?: string;
}

interface SliderBtnProps {
	children: ReactNode;
	value: string;
	className?: string;
	progressBarClass?: string;
}

// Create the context with an undefined initial value
const ProgressCarouselContext = createContext<
	ProgressCarouselContextType | undefined
>(undefined);

export const useProgressCarouselContext = (): ProgressCarouselContextType => {
	const context = useContext(ProgressCarouselContext);
	if (!context) {
		throw new Error(
			"useProgressCarouselContext must be used within a ProgressCarousel"
		);
	}
	return context;
};

export const ProgressCarousel: FC<ProgressCarouselProps> = ({
	children,
	duration = 5000,
	fastDuration = 400,
	vertical = false,
	activeSlider,
	className,
}) => {
	const [active, setActive] = useState<string>(activeSlider);
	const [progress, setProgress] = useState<number>(0);
	const [isFastForward, setIsFastForward] = useState<boolean>(false);
	const frame = useRef<number>(0);
	const firstFrameTime = useRef<number>(performance.now());
	const targetValue = useRef<string | null>(null);
	const [sliderValues, setSliderValues] = useState<string[]>([]);

	useEffect(() => {
		const getChildren = React.Children.toArray(children).find(
			(child) => (child as React.ReactElement).type === SliderContent
		) as React.ReactElement | undefined;

		if (getChildren) {
			const values = React.Children.toArray(getChildren.props.children).map(
				(child) => (child as React.ReactElement).props.value as string
			);
			setSliderValues(values);
		}
	}, [children]);

	useEffect(() => {
		if (sliderValues.length > 0) {
			firstFrameTime.current = performance.now();
			frame.current = requestAnimationFrame(animate);
		}
		return () => {
			cancelAnimationFrame(frame.current);
		};
	}, [sliderValues, active, isFastForward]);

	const animate = (now: number) => {
		const currentDuration = isFastForward ? fastDuration : duration;
		const elapsedTime = now - firstFrameTime.current;
		const timeFraction = elapsedTime / currentDuration;

		if (timeFraction <= 1) {
			setProgress(
				isFastForward
					? progress + (100 - progress) * timeFraction
					: timeFraction * 100
			);
			frame.current = requestAnimationFrame(animate);
		} else {
			if (isFastForward) {
				setIsFastForward(false);
				if (targetValue.current !== null) {
					setActive(targetValue.current);
					targetValue.current = null;
				}
			} else {
				// Move to the next slide
				const currentIndex = sliderValues.indexOf(active);
				const nextIndex = (currentIndex + 1) % sliderValues.length;
				setActive(sliderValues[nextIndex]);
			}
			setProgress(0);
			firstFrameTime.current = performance.now();
		}
	};

	const handleButtonClick = (value: string) => {
		if (value !== active) {
			const elapsedTime = performance.now() - firstFrameTime.current;
			const currentProgress = (elapsedTime / duration) * 100;
			setProgress(currentProgress);
			targetValue.current = value;
			setIsFastForward(true);
			firstFrameTime.current = performance.now();
		}
	};

	return (
		<ProgressCarouselContext.Provider
			value={{ active, progress, handleButtonClick, vertical }}
		>
			<div className={cn("relative", className)}>{children}</div>
		</ProgressCarouselContext.Provider>
	);
};

export const SliderContent: FC<SliderContentProps> = ({
	children,
	className,
}) => {
	return <div className={cn("", className)}>{children}</div>;
};

export const SliderWrapper: FC<SliderWrapperProps> = ({
	children,
	value,
	className,
}) => {
	const { active } = useProgressCarouselContext();

	return (
		<AnimatePresence mode="popLayout">
			{active === value && (
				<motion.div
					key={value}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={cn("", className)}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export const SliderBtnGroup: FC<ProgressBarProps> = ({
	children,
	className,
}) => {
	return <div className={cn("", className)}>{children}</div>;
};

export const SliderBtn: FC<SliderBtnProps> = ({
	children,
	value,
	className,
	progressBarClass,
}) => {
	const { active, progress, handleButtonClick, vertical } =
		useProgressCarouselContext();

	return (
		<button
			className={cn(
				`relative ${active === value ? "opacity-100" : "opacity-50"}`,
				className
			)}
			onClick={() => handleButtonClick(value)}
			key={value}
		>
			{children}
			<div
				className="absolute inset-0 overflow-hidden -z-10 max-h-full max-w-full "
				role="progressbar"
				aria-valuenow={active === value ? progress : 0}
			>
				<span
					className={cn("absolute left-0 ", progressBarClass)}
					style={{
						[vertical ? "height" : "width"]:
							active === value ? `${progress}%` : "0%",
					}}
				/>
			</div>
		</button>
	);
};
```

## Attribution

Source: UI Layouts · Original: https://www.ui-layouts.com/components/progressive-carousel

Adapted from the original. Credit the original author when you ship this.
