# Sliding Numbers

- Categories: Special Effects & FX
- Tags: spring
- Import: `@/components/ui/sliding-numbers`
- Inspiration: Motion Primitives (adaptation) — https://motion-primitives.com/docs/sliding-number

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/sliding-numbers.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`
- `react-use-measure`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `value` *(required)* | `number` | — | — |
| `padStart` | `boolean` | `false` | — |
| `decimalSeparator` | `string` | `"."` | — |

## Usage

```tsx
"use client";

import { useEffect, useState } from "react";

import { SlidingNumber } from "./component";

function Clock() {
	const [hours, setHours] = useState(new Date().getHours());
	const [minutes, setMinutes] = useState(new Date().getMinutes());
	const [seconds, setSeconds] = useState(new Date().getSeconds());

	useEffect(() => {
		const interval = setInterval(() => {
			setHours(new Date().getHours());
			setMinutes(new Date().getMinutes());
			setSeconds(new Date().getSeconds());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex items-center gap-0.5 font-mono">
			<SlidingNumber value={hours} padStart={true} />
			<span className="text-secondary">:</span>
			<SlidingNumber value={minutes} padStart={true} />
			<span className="text-secondary">:</span>
			<SlidingNumber value={seconds} padStart={true} />
		</div>
	);
}

function SlidingNumberWithSlider() {
	const [value, setValue] = useState(100);

	return (
		<div className="flex flex-col items-start gap-0">
			<div className="inline-flex items-center gap-1 font-mono leading-none">
				$<SlidingNumber value={value} />
			</div>
			<input
				type="range"
				value={value}
				min={500}
				max={100000}
				step={50}
				onChange={(e) => setValue(+e.target.value)}
				className="mt-2 accent-indigo-950"
			/>
		</div>
	);
}

export default function SlidingNumbersUsage() {
	return (
		<div>
			<Clock />
			<SlidingNumberWithSlider />
		</div>
	);
}
```

## Source

### `components/ui/sliding-numbers.tsx`

```tsx
"use client";

import { useEffect, useId } from "react";

import {
	motion,
	MotionValue,
	motionValue,
	useSpring,
	useTransform,
} from "motion/react";
import useMeasure from "react-use-measure";

// Credit:
// https://motion-primitives.com/docs/sliding-number

const TRANSITION = {
	type: "spring",
	stiffness: 280,
	damping: 18,
	mass: 0.3,
};

function Digit({ value, place }: { value: number; place: number }) {
	const valueRoundedToPlace = Math.floor(value / place) % 10;
	const initial = motionValue(valueRoundedToPlace);
	const animatedValue = useSpring(initial, TRANSITION);

	useEffect(() => {
		animatedValue.set(valueRoundedToPlace);
	}, [animatedValue, valueRoundedToPlace]);

	return (
		<div className="relative inline-block w-[1ch] overflow-x-visible overflow-y-clip leading-none tabular-nums">
			<div className="invisible">0</div>
			{Array.from({ length: 10 }, (_, i) => (
				<Number key={i + "sliding-numbers"} mv={animatedValue} number={i} />
			))}
		</div>
	);
}

function Number({ mv, number }: { mv: MotionValue<number>; number: number }) {
	const uniqueId = useId();
	const [ref, bounds] = useMeasure();

	const y = useTransform(mv, (latest) => {
		if (!bounds.height) return 0;
		const placeValue = latest % 10;
		const offset = (10 + number - placeValue) % 10;
		let memo = offset * bounds.height;

		if (offset > 5) {
			memo -= 10 * bounds.height;
		}

		return memo;
	});

	// don't render the animated number until we know the height
	if (!bounds.height) {
		return (
			<span ref={ref} className="invisible absolute">
				{number}
			</span>
		);
	}

	return (
		<motion.span
			style={{ y }}
			layoutId={`${uniqueId}-${number}`}
			className="absolute inset-0 flex items-center justify-center"
			transition={TRANSITION}
			ref={ref}
		>
			{number}
		</motion.span>
	);
}

type SlidingNumberProps = {
	value: number;
	padStart?: boolean;
	decimalSeparator?: string;
};

export function SlidingNumber({
	value,
	padStart = false,
	decimalSeparator = ".",
}: SlidingNumberProps) {
	const absValue = Math.abs(value);
	const [integerPart, decimalPart] = absValue.toString().split(".");
	const integerValue = parseInt(integerPart, 10);
	const paddedInteger =
		padStart && integerValue < 10 ? `0${integerPart}` : integerPart;
	const integerDigits = paddedInteger.split("");
	const integerPlaces = integerDigits.map((_, i) =>
		Math.pow(10, integerDigits.length - i - 1)
	);

	return (
		<div className="flex items-center">
			{value < 0 && "-"}
			{integerDigits.map((_, index) => (
				<Digit
					key={`pos-${integerPlaces[index]}`}
					value={integerValue}
					place={integerPlaces[index]}
				/>
			))}
			{decimalPart && (
				<>
					<span>{decimalSeparator}</span>
					{decimalPart.split("").map((_, index) => (
						<Digit
							key={`decimal-${index}`}
							value={parseInt(decimalPart, 10)}
							place={Math.pow(10, decimalPart.length - index - 1)}
						/>
					))}
				</>
			)}
		</div>
	);
}
```

## Attribution

Source: Motion Primitives · Original: https://motion-primitives.com/docs/sliding-number

Adapted from the original. Credit the original author when you ship this.
