# Vertical Cut Reveal

- Categories: Text Animations
- Tags: spring
- Import: `@/components/ui/vertical-cut-reveal`
- Inspiration: Fancy Components (adaptation) — https://www.fancycomponents.dev/docs/components/text/vertical-cut-reveal

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/vertical-cut-reveal.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Usage

```tsx
"use client";

import VerticalCutReveal from "./component";

export default function Usage() {
	return (
		<div className="w-dvw h-dvh xs:text-2xl bg-background text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl flex flex-col items-start justify-center font-overused-grotesk p-10 md:p-16 lg:p-24 text-secondary tracking-wide uppercase">
			<VerticalCutReveal
				splitBy="characters"
				staggerDuration={0.025}
				staggerFrom="first"
				transition={{
					type: "spring",
					stiffness: 200,
					damping: 21,
				}}
			>
				{`HI 👋, FRIEND!`}
			</VerticalCutReveal>
			<VerticalCutReveal
				splitBy="characters"
				staggerDuration={0.025}
				staggerFrom="last"
				reverse={true}
				transition={{
					type: "spring",
					stiffness: 200,
					damping: 21,
					delay: 0.5,
				}}
			>
				{`🌤️ IT IS NICE ⇗ TO`}
			</VerticalCutReveal>
			<VerticalCutReveal
				splitBy="characters"
				staggerDuration={0.025}
				staggerFrom="center"
				transition={{
					type: "spring",
					stiffness: 200,
					damping: 21,
					delay: 1.1,
				}}
			>
				{`MEET 😊 YOU.`}
			</VerticalCutReveal>
		</div>
	);
}
```

## Source

### `components/ui/vertical-cut-reveal.tsx`

```tsx
"use client";

import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from "react";

import { cn } from "@/lib/utils";
import { DynamicAnimationOptions, motion } from "motion/react";

// Credit:
// https://www.fancycomponents.dev/docs/components/text/vertical-cut-reveal

interface TextProps {
	children: React.ReactNode;
	reverse?: boolean;
	transition?: DynamicAnimationOptions;
	splitBy?: "words" | "characters" | "lines" | string;
	staggerDuration?: number;
	staggerFrom?: "first" | "last" | "center" | "random" | number;
	containerClassName?: string;
	wordLevelClassName?: string;
	elementLevelClassName?: string;
	onClick?: () => void;
	onStart?: () => void;
	onComplete?: () => void;
	autoStart?: boolean; // Whether to start the animation automatically
}

// Ref interface to allow external control of the animation
export interface VerticalCutRevealRef {
	startAnimation: () => void;
	reset: () => void;
}

interface WordObject {
	characters: string[];
	needsSpace: boolean;
}

const VerticalCutReveal = forwardRef<VerticalCutRevealRef, TextProps>(
	(
		{
			children,
			reverse = false,
			transition = {
				type: "spring",
				stiffness: 190,
				damping: 22,
			},
			splitBy = "words",
			staggerDuration = 0.2,
			staggerFrom = "first",
			containerClassName,
			wordLevelClassName,
			elementLevelClassName,
			onClick,
			onStart,
			onComplete,
			autoStart = true,
			...props
		},
		ref
	) => {
		const containerRef = useRef<HTMLSpanElement>(null);
		const text =
			typeof children === "string" ? children : children?.toString() || "";
		const [isAnimating, setIsAnimating] = useState(false);

		// handy function to split text into characters with support for unicode and emojis
		const splitIntoCharacters = (text: string): string[] => {
			if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
				const segmenter = new Intl.Segmenter("en", {
					granularity: "grapheme",
				});
				return Array.from(
					segmenter.segment(text),
					({ segment }) => segment
				);
			}
			// Fallback for browsers that don't support Intl.Segmenter
			return Array.from(text);
		};

		// Split text based on splitBy parameter
		const elements = useMemo(() => {
			const words = text.split(" ");
			if (splitBy === "characters") {
				return words.map((word, i) => ({
					characters: splitIntoCharacters(word),
					needsSpace: i !== words.length - 1,
				}));
			}
			return splitBy === "words"
				? text.split(" ")
				: splitBy === "lines"
					? text.split("\n")
					: text.split(splitBy);
		}, [text, splitBy]);

		// Calculate stagger delays based on staggerFrom
		const getStaggerDelay = useCallback(
			(index: number) => {
				const total =
					splitBy === "characters"
						? elements.reduce(
								(acc, word) =>
									acc +
									(typeof word === "string"
										? 1
										: word.characters.length +
											(word.needsSpace ? 1 : 0)),
								0
							)
						: elements.length;
				if (staggerFrom === "first") return index * staggerDuration;
				if (staggerFrom === "last")
					return (total - 1 - index) * staggerDuration;
				if (staggerFrom === "center") {
					const center = Math.floor(total / 2);
					return Math.abs(center - index) * staggerDuration;
				}
				if (staggerFrom === "random") {
					const randomIndex = Math.floor(Math.random() * total);
					return Math.abs(randomIndex - index) * staggerDuration;
				}
				return Math.abs(staggerFrom - index) * staggerDuration;
			},
			[elements.length, staggerFrom, staggerDuration]
		);

		const startAnimation = useCallback(() => {
			setIsAnimating(true);
			onStart?.();
		}, [onStart]);

		// Expose the startAnimation function via ref
		useImperativeHandle(ref, () => ({
			startAnimation,
			reset: () => setIsAnimating(false),
		}));

		// Auto start animation
		useEffect(() => {
			if (autoStart) {
				startAnimation();
			}
		}, [autoStart]);

		const variants = {
			hidden: { y: reverse ? "-100%" : "100%" },
			visible: (i: number) => ({
				y: 0,
				transition: {
					...transition,
					delay: ((transition?.delay as number) || 0) + getStaggerDelay(i),
				},
			}),
		};

		return (
			<span
				className={cn(
					containerClassName,
					"flex flex-wrap whitespace-pre-wrap",
					splitBy === "lines" && "flex-col"
				)}
				onClick={onClick}
				ref={containerRef}
				{...props}
			>
				<span className="sr-only">{text}</span>

				{(splitBy === "characters"
					? (elements as WordObject[])
					: (elements as string[]).map((el, i) => ({
							characters: [el],
							needsSpace: i !== elements.length - 1,
						}))
				).map((wordObj, wordIndex, array) => {
					const previousCharsCount = array
						.slice(0, wordIndex)
						.reduce((sum, word) => sum + word.characters.length, 0);

					return (
						<span
							key={wordIndex}
							aria-hidden="true"
							className={cn(
								"inline-flex overflow-hidden",
								wordLevelClassName
							)}
						>
							{wordObj.characters.map((char, charIndex) => (
								<span
									className={cn(
										elementLevelClassName,
										"whitespace-pre-wrap relative"
									)}
									key={charIndex}
								>
									<motion.span
										custom={previousCharsCount + charIndex}
										initial="hidden"
										animate={isAnimating ? "visible" : "hidden"}
										variants={variants}
										onAnimationComplete={
											wordIndex === elements.length - 1 &&
											charIndex === wordObj.characters.length - 1
												? onComplete
												: undefined
										}
										className="inline-block"
									>
										{char}
									</motion.span>
								</span>
							))}
							{wordObj.needsSpace && <span> </span>}
						</span>
					);
				})}
			</span>
		);
	}
);

VerticalCutReveal.displayName = "VerticalCutReveal";
export default VerticalCutReveal;
```

## Attribution

Source: Fancy Components · Original: https://www.fancycomponents.dev/docs/components/text/vertical-cut-reveal

Adapted from the original. Credit the original author when you ship this.
