# Text Along Path

- Categories: Text, Text Animations
- Tags: scroll-driven
- Import: `@/components/ui/text-along-path`
- Inspiration: Fancy Components (adaptation) — https://www.fancycomponents.dev/docs/components/text/text-along-path

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/text-along-path.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `path` *(required)* | `string` | — | — |
| `text` *(required)* | `string` | — | — |
| `pathId` | `string` | — | — |
| `pathClassName` | `string` | — | — |
| `preserveAspectRatio` | `PreserveAspectRatio` | `"xMidYMid meet"` | — |
| `showPath` | `boolean` | `false` | — |
| `width` | `string | number` | `"100%"` | — |
| `height` | `string | number` | `"100%"` | — |
| `viewBox` | `string` | `"0 0 100 100"` | — |
| `svgClassName` | `string` | — | — |
| `textClassName` | `string` | — | — |
| `textAnchor` | `"start" | "middle" | "end"` | `"start"` | — |
| `animationType` | `"auto" | "scroll"` | `"auto"` | — |
| `duration` | `number` | `4` | — |
| `repeatCount` | `number | "indefinite"` | `"indefinite"` | — |
| `easingFunction` | `{ calcMode?: string; keyTimes?: string; keySplines?: stri…` | `{}` | — |
| `scrollContainer` | `RefObject<HTMLElement>` | — | — |
| `scrollOffset` | `any` | `["start end", "end end"]` | — |
| `scrollTransformValues` | `[number, number]` | `[0, 100]` | — |

## Usage

```tsx
"use client";

import AnimatedPathText from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<AnimatedPathText />
		</div>
	);
}
```

## Source

### `components/ui/text-along-path.tsx`

```tsx
import { RefObject, useEffect, useRef } from "react";

import { useScroll, useTransform } from "motion/react";

// Credit:
// https://www.fancycomponents.dev/docs/components/text/text-along-path

type PreserveAspectRatioAlign =
	| "none"
	| "xMinYMin"
	| "xMidYMin"
	| "xMaxYMin"
	| "xMinYMid"
	| "xMidYMid"
	| "xMaxYMid"
	| "xMinYMax"
	| "xMidYMax"
	| "xMaxYMax";

type PreserveAspectRatioMeetOrSlice = "meet" | "slice";

type PreserveAspectRatio =
	| PreserveAspectRatioAlign
	| `${Exclude<
			PreserveAspectRatioAlign,
			"none"
	  >} ${PreserveAspectRatioMeetOrSlice}`;

interface AnimatedPathTextProps {
	// Path properties
	path: string;
	pathId?: string;
	pathClassName?: string;
	preserveAspectRatio?: PreserveAspectRatio;
	showPath?: boolean;

	// SVG properties
	width?: string | number;
	height?: string | number;
	viewBox?: string;
	svgClassName?: string;

	// Text properties
	text: string;
	textClassName?: string;
	textAnchor?: "start" | "middle" | "end";

	// Animation properties
	animationType?: "auto" | "scroll";

	// Animation properties if animationType is auto
	duration?: number;
	repeatCount?: number | "indefinite";
	easingFunction?: {
		calcMode?: string;
		keyTimes?: string;
		keySplines?: string;
	};

	// Scroll animation properties if animationType is scroll
	scrollContainer?: RefObject<HTMLElement>;
	scrollOffset?: any["offset"];
	scrollTransformValues?: [number, number];
}

const AnimatedPathText = ({
	// Path defaults
	path,
	pathId,
	pathClassName,
	preserveAspectRatio = "xMidYMid meet",
	showPath = false,

	// SVG defaults
	width = "100%",
	height = "100%",
	viewBox = "0 0 100 100",
	svgClassName,

	// Text defaults
	text,
	textClassName,
	textAnchor = "start",

	// Animation type
	animationType = "auto",

	// Animation defaults
	duration = 4,
	repeatCount = "indefinite",

	easingFunction = {},

	// Scroll animation defaults
	scrollContainer,
	scrollOffset = ["start end", "end end"],
	scrollTransformValues = [0, 100],
}: AnimatedPathTextProps) => {
	const container = useRef<HTMLDivElement>(null);
	const textPathRefs = useRef<SVGTextPathElement[]>([]);

	// naive id for the path. you should rather use yours :)
	const id =
		pathId || `animated-path-${Math.random().toString(36).substring(7)}`;

	const { scrollYProgress } = useScroll({
		container: scrollContainer || container,
		offset: scrollOffset,
	});

	const t = useTransform(scrollYProgress, [0, 1], scrollTransformValues);

	useEffect(() => {
		// Re-initialize scroll handler when container ref changes
		const handleChange = (e: number) => {
			textPathRefs.current.forEach((textPath) => {
				if (textPath) {
					textPath.setAttribute("startOffset", `${t.get()}%`);
				}
			});
		};

		scrollYProgress.on("change", handleChange);

		return () => {
			scrollYProgress.clearListeners();
		};
	}, [scrollYProgress, t]);

	const animationProps =
		animationType === "auto"
			? {
					from: "0%",
					to: "100%",
					begin: "0s",
					dur: `${duration}s`,
					repeatCount: repeatCount,
					...(easingFunction && easingFunction),
				}
			: null;

	return (
		<svg
			className={svgClassName}
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox={viewBox}
			preserveAspectRatio={preserveAspectRatio}
		>
			<path
				id={id}
				className={pathClassName}
				d={path}
				stroke={showPath ? "currentColor" : "none"}
				fill="none"
			/>

			{/* First text element */}
			<text textAnchor={textAnchor} fill="currentColor">
				<textPath
					className={textClassName}
					href={`#${id}`}
					startOffset={"0%"}
					ref={(ref) => {
						if (ref) textPathRefs.current[0] = ref;
					}}
				>
					{animationType === "auto" && (
						<animate attributeName="startOffset" {...animationProps} />
					)}
					{text}
				</textPath>
			</text>

			{/* Second text element (offset to hide the jump) */}
			{animationType === "auto" && (
				<text textAnchor={textAnchor} fill="currentColor">
					<textPath
						className={textClassName}
						href={`#${id}`}
						startOffset={"-100%"}
						ref={(ref) => {
							if (ref) textPathRefs.current[1] = ref;
						}}
					>
						{animationType === "auto" && (
							<animate
								attributeName="startOffset"
								{...animationProps}
								from="-100%"
								to="0%"
							/>
						)}
						{text}
					</textPath>
				</text>
			)}
		</svg>
	);
};

export default AnimatedPathText;
```

## Attribution

Source: Fancy Components · Original: https://www.fancycomponents.dev/docs/components/text/text-along-path

Adapted from the original. Credit the original author when you ship this.
