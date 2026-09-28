# Icons

- Categories: Utilities
- Tags: internal
- Import: `@/components/ui/icons/component`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/icons.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`
- `fuse.js`
- `motion`
- `nuqs`

## Registry dependencies

- `card`
- `input`

## Usage

```tsx
"use client";

import IconsList from "./component";

export default function Usage() {
	return (
		<div className="relative w-full p-8">
			<IconsList />
		</div>
	);
}
```

## Source

### `components/ui/icons/a-arrow-down.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface AArrowDownIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AArrowDownIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const letterVariants: Variants = {
	normal: { opacity: 1, scale: 1 },
	animate: {
		opacity: [0, 1],
		scale: [0.8, 1],
		transition: { duration: 0.3 },
	},
};

const arrowVariants: Variants = {
	normal: { opacity: 1, y: 0 },
	animate: {
		opacity: [0, 1],
		y: [-10, 0],
		transition: { duration: 0.3, delay: 0.2 },
	},
};

const AArrowDownIcon = forwardRef<AArrowDownIconHandle, AArrowDownIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					{/* Letra A */}
					<motion.path
						d="M3.5 13h6"
						animate={controls}
						variants={letterVariants}
					/>
					<motion.path
						d="m2 16 4.5-9 4.5 9"
						animate={controls}
						variants={letterVariants}
					/>
					{/* Seta */}
					<motion.path
						d="M18 7v9"
						animate={controls}
						variants={arrowVariants}
					/>
					<motion.path
						d="m14 12 4 4 4-4"
						animate={controls}
						variants={arrowVariants}
					/>
				</svg>
			</div>
		);
	}
);

AArrowDownIcon.displayName = "AArrowDownIcon";

export { AArrowDownIcon };
```

### `components/ui/icons/a-arrow-up.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface AArrowUpIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AArrowUpIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const letterVariants: Variants = {
	normal: { opacity: 1, scale: 1 },
	animate: {
		opacity: [0, 1],
		scale: [0.8, 1],
		transition: { duration: 0.3 },
	},
};

const arrowVariants: Variants = {
	normal: { opacity: 1, y: 0 },
	animate: {
		opacity: [0, 1],
		y: [10, 0], // Changed from [-10, 0] to animate upward
		transition: { duration: 0.3, delay: 0.2 },
	},
};

const AArrowUpIcon = forwardRef<AArrowUpIconHandle, AArrowUpIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					{/* Letter A - unchanged */}
					<motion.path
						d="M3.5 13h6"
						animate={controls}
						variants={letterVariants}
					/>
					<motion.path
						d="m2 16 4.5-9 4.5 9"
						animate={controls}
						variants={letterVariants}
					/>
					{/* Arrow pointing up - modified */}
					<motion.path
						d="M18 16V7" // Vertical line from bottom to top
						animate={controls}
						variants={arrowVariants}
					/>
					<motion.path
						d="m14 11 4-4 4 4" // Arrowhead pointing up
						animate={controls}
						variants={arrowVariants}
					/>
				</svg>
			</div>
		);
	}
);

AArrowUpIcon.displayName = "AArrowUpIcon";

export { AArrowUpIcon };
```

### `components/ui/icons/activity.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ActivityIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ActivityIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: "linear",
			opacity: { duration: 0.1 },
		},
	},
};

const ActivityIcon = forwardRef<ActivityIconHandle, ActivityIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						variants={variants}
						animate={controls}
						initial="normal"
						d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
					/>
				</svg>
			</div>
		);
	}
);

ActivityIcon.displayName = "ActivityIcon";

export { ActivityIcon };
```

### `components/ui/icons/air-vent.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface AirVentIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AirVentIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const windVariants: Variants = {
	normal: (custom: number) => ({
		pathLength: 1,
		opacity: 1,
		pathOffset: 0,
		transition: {
			duration: 0.3,
			ease: "easeInOut",
			delay: custom,
		},
	}),
	animate: (custom: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.5,
			ease: "easeInOut",
			delay: custom,
		},
	}),
};

const AirVentIcon = forwardRef<AirVentIconHandle, AirVentIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
					<path d="M6 8h12" />
					<motion.path
						d="M18.3 17.7a2.5 2.5 0 0 1-3.16 3.83 2.53 2.53 0 0 1-1.14-2V12"
						variants={windVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M6.6 15.6A2 2 0 1 0 10 17v-5"
						variants={windVariants}
						initial="normal"
						animate={controls}
						custom={0.2}
					/>
				</svg>
			</div>
		);
	}
);

AirVentIcon.displayName = "AirVentIcon";

export { AirVentIcon };
```

### `components/ui/icons/airplane.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface AirplaneIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AirplaneIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const SPEED_LINES = [
	{ x1: 5, y1: 15, x2: 1, y2: 19, delay: 0.1 },
	{ x1: 7, y1: 17, x2: 3, y2: 21, delay: 0.2 },
	{ x1: 9, y1: 19, x2: 5, y2: 23, delay: 0.3 },
];

const AirplaneIcon = forwardRef<AirplaneIconHandle, AirplaneIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						animate={controls}
						transition={{
							duration: 0.5,
							times: [0, 0.6, 1],
							type: "spring",
							stiffness: 200,
							damping: 10,
						}}
						variants={{
							normal: { x: 0, y: 0, scale: 1 },
							animate: {
								x: [0, 5, 3],
								y: [0, -5, -3],
								scale: 0.8,
							},
						}}
						d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
					/>
					{SPEED_LINES.map((line, index) => (
						<motion.line
							key={index + "airplane"}
							x1={line.x1}
							y1={line.y1}
							x2={line.x2}
							y2={line.y2}
							stroke="currentColor"
							strokeWidth="1"
							initial={{ opacity: 0, pathLength: 1, pathSpacing: 1 }}
							variants={{
								normal: {
									pathOffset: [0, 1],
									translateX: -3,
									translateY: 3,
									opacity: 0,
									transition: {
										duration: 0.3,
										times: [0, 0.6, 1],
										type: "spring",
										stiffness: 200,
										damping: 10,
									},
								},
								animate: {
									pathOffset: [1, 2],
									translateX: [0, 0],
									translateY: [0, 0],
									opacity: 1,
								},
							}}
							transition={{ duration: 0.15, delay: line.delay }}
							animate={controls}
						/>
					))}
				</svg>
			</div>
		);
	}
);

AirplaneIcon.displayName = "AirplaneIcon";

export { AirplaneIcon };
```

### `components/ui/icons/alarm-clock.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface AlarmClockIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AlarmClockIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		y: 0,
		x: 0,
		transition: {
			duration: 0.2,
			type: "spring",
			stiffness: 200,
			damping: 25,
		},
	},
	animate: {
		y: -1.5,
		x: [-1, 1, -1, 1, -1, 0],
		transition: {
			y: {
				duration: 0.2,
				type: "spring",
				stiffness: 200,
				damping: 25,
			},
			x: {
				duration: 0.3,
				repeat: Infinity,
				ease: "linear",
			},
		},
	},
};

const secondaryPathVariants: Variants = {
	normal: {
		y: 0,
		x: 0,
		transition: {
			duration: 0.2,
			type: "spring",
			stiffness: 200,
			damping: 25,
		},
	},
	animate: {
		y: -2.5,
		x: [-2, 2, -2, 2, -2, 0],
		transition: {
			y: {
				duration: 0.2,
				type: "spring",
				stiffness: 200,
				damping: 25,
			},
			x: {
				duration: 0.3,
				repeat: Infinity,
				ease: "linear",
			},
		},
	},
};

const AlarmClockIcon = forwardRef<AlarmClockIconHandle, AlarmClockIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					style={{ overflow: "visible" }}
				>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={controls}
						d="M18 20.5L19.5 22"
					/>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={controls}
						d="M6 20.5L4.5 22"
					/>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={controls}
						d="M21 13C21 17.968 16.968 22 12 22C7.032 22 3 17.968 3 13C3 8.032 7.032 4 12 4C16.968 4 21 8.032 21 13Z"
					/>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={controls}
						d="M15.339 15.862L12.549 14.197C12.063 13.909 11.667 13.216 11.667 12.649V8.95898"
					/>
					<motion.path
						variants={secondaryPathVariants}
						initial="normal"
						animate={controls}
						d="M18 2L21.747 5.31064"
					/>
					<motion.path
						variants={secondaryPathVariants}
						initial="normal"
						animate={controls}
						d="M6 2L2.25304 5.31064"
					/>
				</svg>
			</div>
		);
	}
);

AlarmClockIcon.displayName = "AlarmClockIcon";

export { AlarmClockIcon };
```

### `components/ui/icons/align-center.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface AlignCenterIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AlignCenterIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const AlignCenterIcon = forwardRef<AlignCenterIconHandle, AlignCenterIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M17 12H7"
						variants={{
							normal: { translateX: 0 },
							animate: {
								translateX: [0, 3, -3, 2, -2, 0],
								transition: {
									ease: "linear",
									translateX: {
										duration: 1,
									},
								},
							},
						}}
						animate={controls}
					/>
					<path d="M19 18H5" />
					<path d="M21 6H3" />
				</svg>
			</div>
		);
	}
);

AlignCenterIcon.displayName = "AlignCenterIcon";

export { AlignCenterIcon };
```

### `components/ui/icons/align-horizontal.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface AlignHorizontalIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AlignHorizontalIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	type: "spring",
	stiffness: 160,
	damping: 17,
	mass: 1,
};

const AlignHorizontalIcon = forwardRef<
	AlignHorizontalIconHandle,
	AlignHorizontalIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.rect
					variants={{
						normal: { scaleX: 1 },
						animate: { scaleX: 0.85 },
					}}
					animate={controls}
					transition={defaultTransition}
					width="6"
					height="10"
					x="9"
					y="7"
					rx="2"
				/>
				<motion.path
					d="M4 22V2"
					variants={{
						normal: { translateX: 0, scaleY: 1 },
						animate: {
							translateX: 2,
							scaleY: 0.9,
						},
					}}
					animate={controls}
					transition={defaultTransition}
				/>
				<motion.path
					d="M20 22V2"
					variants={{
						normal: { translateX: 0, scaleY: 1 },
						animate: {
							translateX: -2,
							scaleY: 0.9,
						},
					}}
					animate={controls}
					transition={defaultTransition}
				/>
			</svg>
		</div>
	);
});

AlignHorizontalIcon.displayName = "AlignHorizontalIcon";

export { AlignHorizontalIcon };
```

### `components/ui/icons/align-vertical.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface AlignVerticalIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AlignVerticalIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	type: "spring",
	stiffness: 160,
	damping: 17,
	mass: 1,
};

const AlignVerticalIcon = forwardRef<
	AlignVerticalIconHandle,
	AlignVerticalIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.rect
					variants={{
						normal: { scaleY: 1 },
						animate: { scaleY: 0.8 },
					}}
					animate={controls}
					width="10"
					height="6"
					x="7"
					y="9"
					rx="2"
					transition={defaultTransition}
				/>
				<motion.path
					variants={{
						normal: { translateY: 0, scaleX: 1 },
						animate: {
							translateY: -2,
							scaleX: 0.9,
						},
					}}
					animate={controls}
					transition={defaultTransition}
					d="M22 20H2"
				/>
				<motion.path
					variants={{
						normal: { translateY: 0, scaleX: 1 },
						animate: {
							translateY: 2,
							scaleX: 0.9,
						},
					}}
					animate={controls}
					transition={defaultTransition}
					d="M22 4H2"
				/>
			</svg>
		</div>
	);
});

AlignVerticalIcon.displayName = "AlignVerticalIcon";

export { AlignVerticalIcon };
```

### `components/ui/icons/angry.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface AngryIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AngryIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const EYEBROW_ROTATION = 20;
const DURATION = 0.6;

const pathVariantsFace: Variants = {
	normal: { scale: 1, rotate: 0 },
	animate: {
		scale: [1, 1.2, 1.2, 1.2, 1],
		rotate: [0, -3, 3, -1, 1, 0],
		transition: {
			duration: DURATION,
			times: [0, 0.2, 0.4, 0.6, 1],
			ease: "easeInOut",
		},
	},
};

const pathVariantsLeftEyebrow: Variants = {
	normal: { rotate: 0 },
	animate: {
		rotate: [0, EYEBROW_ROTATION, 0],
		transition: {
			duration: DURATION + 0.2,
		},
	},
};

const pathVariantsRightEyebrow: Variants = {
	normal: { rotate: 0 },
	animate: {
		rotate: [0, -EYEBROW_ROTATION, 0],
		transition: {
			duration: DURATION + 0.2,
		},
	},
};

const pathVariantsEye: Variants = {
	normal: { scale: 1 },
	animate: {
		scale: [1, 1.2, 1],
		transition: {
			duration: DURATION,
		},
	},
};

const pathVariantsMouth: Variants = {
	normal: { translateY: 0 },
	animate: {
		translateY: [0, -0.5, 0],
		transition: {
			duration: DURATION,
		},
	},
};

const AngryIcon = forwardRef<AngryIconHandle, AngryIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					animate={controls}
					variants={pathVariantsFace}
				>
					<circle cx="12" cy="12" r="10" />
					<motion.path
						variants={pathVariantsMouth}
						animate={controls}
						d="M16 16s-1.5-2-4-2-4 2-4 2"
					/>
					<motion.path
						variants={pathVariantsLeftEyebrow}
						animate={controls}
						d="M7.5 8 10 9"
					/>
					<motion.path
						variants={pathVariantsRightEyebrow}
						animate={controls}
						d="m14 9 2.5-1"
					/>
					<motion.path
						variants={pathVariantsEye}
						animate={controls}
						d="M9 10h.01"
					/>
					<motion.path
						variants={pathVariantsEye}
						animate={controls}
						d="M15 10h.01"
					/>
				</motion.svg>
			</div>
		);
	}
);

AngryIcon.displayName = "AngryIcon";

export { AngryIcon };
```

### `components/ui/icons/annoyed.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface AnnoyedIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AnnoyedIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const AnnoyedIcon = forwardRef<AnnoyedIconHandle, AnnoyedIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("animate");
				onMouseEnter?.(e);
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("normal");
				onMouseLeave?.(e);
			},
			[controls, onMouseLeave]
		);

		const faceVariants: Variants = {
			normal: {
				scale: 1,
				transition: { duration: 0.2, ease: "easeOut" },
			},
			animate: {
				scale: 1.05,
				transition: {
					duration: 0.3,
					ease: "easeOut",
				},
			},
		};

		const mouthVariants: Variants = {
			normal: {
				scaleX: 1,
				y: 0,
				transition: { duration: 0.2, ease: "easeOut" },
			},
			animate: {
				scaleX: 0.8,
				y: 1,
				transition: {
					duration: 0.3,
					ease: "easeOut",
				},
			},
		};

		const leftEyebrowVariants: Variants = {
			normal: {
				rotate: 0,
				y: 0,
				x: 0,
				transition: { duration: 0.2, ease: "easeOut" },
			},
			animate: {
				rotate: 15,
				y: -1,
				x: -0.5,
				transition: {
					duration: 0.25,
					ease: "easeOut",
				},
			},
		};

		const rightEyebrowVariants: Variants = {
			normal: {
				rotate: 0,
				y: 0,
				x: 0,
				transition: { duration: 0.2, ease: "easeOut" },
			},
			animate: {
				rotate: 15,
				y: -1,
				x: 0.5,
				transition: {
					duration: 0.25,
					ease: "easeOut",
					delay: 0.05,
				},
			},
		};

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					animate={controls}
					initial="normal"
					variants={faceVariants}
				>
					<circle cx="12" cy="12" r="10" />
					<motion.path
						d="M8 15h8"
						variants={mouthVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M8 9h2"
						variants={leftEyebrowVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						d="M14 9h2"
						variants={rightEyebrowVariants}
						animate={controls}
						initial="normal"
					/>
				</motion.svg>
			</div>
		);
	}
);

AnnoyedIcon.displayName = "AnnoyedIcon";

export { AnnoyedIcon };
```

### `components/ui/icons/archive.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ArchiveIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ArchiveIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const rectVariants: Variants = {
	normal: {
		translateY: 0,
		transition: {
			duration: 0.2,
			type: "spring",
			stiffness: 200,
			damping: 25,
		},
	},
	animate: {
		translateY: -1.5,
		transition: {
			duration: 0.2,
			type: "spring",
			stiffness: 200,
			damping: 25,
		},
	},
};

const pathVariants: Variants = {
	normal: { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" },
	animate: { d: "M4 11v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V11" },
};

const secondaryPathVariants: Variants = {
	normal: { d: "M10 12h4" },
	animate: { d: "M10 15h4" },
};

const ArchiveIcon = forwardRef<ArchiveIconHandle, ArchiveIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.rect
						width="20"
						height="5"
						x="2"
						y="3"
						rx="1"
						initial="normal"
						animate={controls}
						variants={rectVariants}
					/>
					<motion.path
						d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"
						variants={pathVariants}
						animate={controls}
					/>
					<motion.path
						d="M10 12h4"
						variants={secondaryPathVariants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ArchiveIcon.displayName = "ArchiveIcon";

export { ArchiveIcon };
```

### `components/ui/icons/arrow-big-down-dash.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ArrowBigDownDashIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ArrowBigDownDashIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const dashVariants: Variants = {
	normal: { translateY: 0 },
	animate: {
		translateY: [0, 1, 0],
		transition: {
			duration: 0.4,
		},
	},
};

const arrowVariants: Variants = {
	normal: { translateY: 0 },
	animate: {
		translateY: [0, 3, 0],
		transition: {
			duration: 0.4,
		},
	},
};

const ArrowBigDownDashIcon = forwardRef<
	ArrowBigDownDashIconHandle,
	ArrowBigDownDashIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				"cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center",
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					d="M15 5H9"
					variants={dashVariants}
					animate={controls}
				/>
				<motion.path
					d="M15 9v3h4l-7 7-7-7h4V9z"
					variants={arrowVariants}
					animate={controls}
				/>
			</svg>
		</div>
	);
});

ArrowBigDownDashIcon.displayName = "ArrowBigDownDashIcon";

export { ArrowBigDownDashIcon };
```

### `components/ui/icons/arrow-big-down.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ArrowBigDownIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ArrowBigDownIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { d: "M15 6v6h4l-7 7-7-7h4V6h6z", translateY: 0 },
	animate: {
		d: "M15 6v6h4l-7 7-7-7h4V6h6z",
		translateY: [0, +3, 0],
		transition: {
			duration: 0.4,
		},
	},
};

const ArrowBigDownIcon = forwardRef<
	ArrowBigDownIconHandle,
	ArrowBigDownIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				"cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center",
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					d="M15 6v6h4l-7 7-7-7h4V6h6z"
					variants={pathVariants}
					animate={controls}
				/>
			</svg>
		</div>
	);
});

ArrowBigDownIcon.displayName = "ArrowBigDownIcon";

export { ArrowBigDownIcon };
```

### `components/ui/icons/arrow-big-left-dash.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ArrowBigLeftDashIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ArrowBigLeftDashIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const dashVariants: Variants = {
	normal: { translateX: 0 },
	animate: {
		translateX: [0, -1, 0],
		transition: {
			duration: 0.4,
		},
	},
};

const arrowVariants: Variants = {
	normal: { translateX: 0 },
	animate: {
		translateX: [0, -3, 0],
		transition: {
			duration: 0.4,
		},
	},
};

const ArrowBigLeftDashIcon = forwardRef<
	ArrowBigLeftDashIconHandle,
	ArrowBigLeftDashIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				"cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center",
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					d="M19 15V9"
					variants={dashVariants}
					animate={controls}
				/>
				<motion.path
					d="M15 15h-3v4l-7-7 7-7v4h3v6z"
					variants={arrowVariants}
					animate={controls}
				/>
			</svg>
		</div>
	);
});

ArrowBigLeftDashIcon.displayName = "ArrowBigLeftDashIcon";

export { ArrowBigLeftDashIcon };
```

### `components/ui/icons/arrow-big-left.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ArrowBigLeftIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ArrowBigLeftIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { d: "M18 15h-6v4l-7-7 7-7v4h6v6z", translateX: 0 },
	animate: {
		d: "M18 15h-6v4l-7-7 7-7v4h6v6z",
		translateX: [0, -3, 0],
		transition: {
			duration: 0.4,
		},
	},
};

const ArrowBigLeftIcon = forwardRef<
	ArrowBigLeftIconHandle,
	ArrowBigLeftIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				"cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center",
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					d="M18 15h-6v4l-7-7 7-7v4h6v6z"
					variants={pathVariants}
					animate={controls}
				/>
			</svg>
		</div>
	);
});

ArrowBigLeftIcon.displayName = "ArrowBigLeftIcon";

export { ArrowBigLeftIcon };
```

### `components/ui/icons/arrow-big-right-dash.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ArrowBigRightDashIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ArrowBigRightDashIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const dashVariants: Variants = {
	normal: { translateX: 0 },
	animate: {
		translateX: [0, 1, 0],
		transition: {
			duration: 0.4,
		},
	},
};

const arrowVariants: Variants = {
	normal: { translateX: 0 },
	animate: {
		translateX: [0, 3, 0],
		transition: {
			duration: 0.4,
		},
	},
};

const ArrowBigRightDashIcon = forwardRef<
	ArrowBigRightDashIconHandle,
	ArrowBigRightDashIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				"cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center",
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					d="M5 9v6"
					variants={dashVariants}
					animate={controls}
				/>
				<motion.path
					d="M9 9h3V5l7 7-7 7v-4H9V9z"
					variants={arrowVariants}
					animate={controls}
				/>
			</svg>
		</div>
	);
});

ArrowBigRightDashIcon.displayName = "ArrowBigRightDashIcon";

export { ArrowBigRightDashIcon };
```

### `components/ui/icons/arrow-big-right.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ArrowBigRightIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ArrowBigRightIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { d: "M6 9h6V5l7 7-7 7v-4H6V9z", translateX: 0 },
	animate: {
		d: "M6 9h6V5l7 7-7 7v-4H6V9z",
		translateX: [0, 3, 0],
		transition: {
			duration: 0.4,
		},
	},
};

const ArrowBigRightIcon = forwardRef<
	ArrowBigRightIconHandle,
	ArrowBigRightIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				"cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center",
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					d="M6 9h6V5l7 7-7 7v-4H6V9z"
					variants={pathVariants}
					animate={controls}
				/>
			</svg>
		</div>
	);
});

ArrowBigRightIcon.displayName = "ArrowBigRightIcon";

export { ArrowBigRightIcon };
```

### `components/ui/icons/arrow-big-up-dash.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ArrowBigUpDashIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ArrowBigUpDashIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const dashVariants: Variants = {
	normal: { translateY: 0 },
	animate: {
		translateY: [0, -1, 0],
		transition: {
			duration: 0.4,
		},
	},
};

const arrowVariants: Variants = {
	normal: { translateY: 0 },
	animate: {
		translateY: [0, -3, 0],
		transition: {
			duration: 0.4,
		},
	},
};

const ArrowBigUpDashIcon = forwardRef<
	ArrowBigUpDashIconHandle,
	ArrowBigUpDashIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				"cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center",
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					d="M9 19h6"
					variants={dashVariants}
					animate={controls}
				/>
				<motion.path
					d="M9 15v-3H5l7-7 7 7h-4v3H9z"
					variants={arrowVariants}
					animate={controls}
				/>
			</svg>
		</div>
	);
});

ArrowBigUpDashIcon.displayName = "ArrowBigUpDashIcon";

export { ArrowBigUpDashIcon };
```

### `components/ui/icons/arrow-big-up.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ArrowBigUpIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ArrowBigUpIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { d: "M9 18v-6H5l7-7 7 7h-4v6H9z", translateY: 0 },
	animate: {
		d: "M9 18v-6H5l7-7 7 7h-4v6H9z",
		translateY: [0, -3, 0],
		transition: {
			duration: 0.4,
		},
	},
};

const ArrowBigUpIcon = forwardRef<ArrowBigUpIconHandle, ArrowBigUpIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					"cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center",
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M9 18v-6H5l7-7 7 7h-4v6H9z"
						variants={pathVariants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ArrowBigUpIcon.displayName = "ArrowBigUpIcon";

export { ArrowBigUpIcon };
```

### `components/ui/icons/arrow-down-0-1.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ArrowDown01IconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ArrowDown01IconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const swapTransition: Transition = {
	type: "spring",
	stiffness: 240,
	damping: 24,
};

const swapVariants: Variants = {
	normal: {
		translateY: 0,
	},
	animate: (custom: number) => ({
		translateY: custom * 10,
	}),
};

const ArrowDown01con = forwardRef<ArrowDown01IconHandle, ArrowDown01IconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="m3 16 4 4 4-4" />
					<path d="M7 20V4" />
					<motion.rect
						x="15"
						y="4"
						width="4"
						height="6"
						ry="2"
						variants={swapVariants}
						initial="normal"
						animate={controls}
						custom={1}
						transition={swapTransition}
					/>
					<motion.g
						variants={swapVariants}
						initial="normal"
						animate={controls}
						custom={-1}
						transition={swapTransition}
					>
						<path d="M17 20v-6h-2" />
						<path d="M15 20h4" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

ArrowDown01con.displayName = "ArrowDown01con";

export { ArrowDown01con };
```

### `components/ui/icons/arrow-down-1-0.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ArrowDown10IconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ArrowDown10IconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const swapTransition: Transition = {
	type: "spring",
	stiffness: 240,
	damping: 24,
};

const swapVariants: Variants = {
	normal: {
		translateY: 0,
	},
	animate: (custom: number) => ({
		translateY: custom * 10,
	}),
};

const ArrowDown10Icon = forwardRef<ArrowDown10IconHandle, ArrowDown10IconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="m3 16 4 4 4-4" />
					<path d="M7 20V4" />
					<motion.g
						variants={swapVariants}
						initial="normal"
						animate={controls}
						custom={1}
						transition={swapTransition}
					>
						<path d="M17 10V4h-2" />
						<path d="M15 10h4" />
					</motion.g>
					<motion.rect
						x="15"
						y="14"
						width="4"
						height="6"
						ry="2"
						variants={swapVariants}
						initial="normal"
						animate={controls}
						custom={-1}
						transition={swapTransition}
					/>
				</svg>
			</div>
		);
	}
);

ArrowDown10Icon.displayName = "ArrowDown10Icon";

export { ArrowDown10Icon };
```

### `components/ui/icons/arrow-down-a-z.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ArrowDownAZIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ArrowDownAZIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const swapTransition: Transition = {
	type: "spring",
	stiffness: 240,
	damping: 24,
};

const swapVariants: Variants = {
	normal: {
		translateY: 0,
	},
	animate: (custom: number) => ({
		translateY: custom * 10,
	}),
};

const ArrowDownAZIcon = forwardRef<ArrowDownAZIconHandle, ArrowDownAZIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="m3 16 4 4 4-4" />
					<path d="M7 20V4" />
					<motion.g
						variants={swapVariants}
						initial="normal"
						animate={controls}
						custom={1}
						transition={swapTransition}
					>
						<path d="M20 8h-5" />
						<path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10" />
					</motion.g>
					<motion.path
						d="M15 14h5l-5 6h5"
						variants={swapVariants}
						initial="normal"
						animate={controls}
						custom={-1}
						transition={swapTransition}
					/>
				</svg>
			</div>
		);
	}
);

ArrowDownAZIcon.displayName = "ArrowDownAZIcon";

export { ArrowDownAZIcon };
```

### `components/ui/icons/arrow-down-z-a.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ArrowDownZAIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ArrowDownZAIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const swapTransition: Transition = {
	type: "spring",
	stiffness: 240,
	damping: 24,
};

const swapVariants: Variants = {
	normal: {
		translateY: 0,
	},
	animate: (custom: number) => ({
		translateY: custom * 10,
	}),
};

const ArrowDownZAIcon = forwardRef<ArrowDownZAIconHandle, ArrowDownZAIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="m3 16 4 4 4-4" />
					<path d="M7 20V4" />
					<motion.path
						d="M15 4h5l-5 6h5"
						variants={swapVariants}
						initial="normal"
						animate={controls}
						custom={1}
						transition={swapTransition}
					/>
					<motion.g
						variants={swapVariants}
						initial="normal"
						animate={controls}
						custom={-1}
						transition={swapTransition}
					>
						<path d="M20 18h-5" />
						<path d="M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

ArrowDownZAIcon.displayName = "ArrowDownZAIcon";

export { ArrowDownZAIcon };
```

### `components/ui/icons/arrow-down.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ArrowDownIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ArrowDownIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { d: "m19 12-7 7-7-7", translateY: 0 },
	animate: {
		d: "m19 12-7 7-7-7",
		translateY: [0, -3, 0],
		transition: {
			duration: 0.4,
		},
	},
};

const secondPathVariants: Variants = {
	normal: { d: "M12 5v14" },
	animate: {
		d: ["M12 5v14", "M12 5v9", "M12 5v14"],
		transition: {
			duration: 0.4,
		},
	},
};

const ArrowDownIcon = forwardRef<ArrowDownIconHandle, ArrowDownIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="m19 12-7 7-7-7"
						variants={pathVariants}
						animate={controls}
					/>
					<motion.path
						d="M12 5v14"
						variants={secondPathVariants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ArrowDownIcon.displayName = "ArrowDownIcon";

export { ArrowDownIcon };
```

### `components/ui/icons/arrow-left.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ArrowLeftIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ArrowLeftIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { d: "m12 19-7-7 7-7", translateX: 0 },
	animate: {
		d: "m12 19-7-7 7-7",
		translateX: [0, 3, 0],
		transition: {
			duration: 0.4,
		},
	},
};

const secondPathVariants: Variants = {
	normal: { d: "M19 12H5" },
	animate: {
		d: ["M19 12H5", "M19 12H10", "M19 12H5"],
		transition: {
			duration: 0.4,
		},
	},
};

const ArrowLeftIcon = forwardRef<ArrowLeftIconHandle, ArrowLeftIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="m12 19-7-7 7-7"
						variants={pathVariants}
						animate={controls}
					/>
					<motion.path
						d="M19 12H5"
						variants={secondPathVariants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ArrowLeftIcon.displayName = "ArrowLeftIcon";

export { ArrowLeftIcon };
```

### `components/ui/icons/arrow-right.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ArrowRightIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ArrowRightIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { d: "M5 12h14" },
	animate: {
		d: ["M5 12h14", "M5 12h9", "M5 12h14"],
		transition: {
			duration: 0.4,
		},
	},
};

const secondaryPathVariants: Variants = {
	normal: { d: "m12 5 7 7-7 7", translateX: 0 },
	animate: {
		d: "m12 5 7 7-7 7",
		translateX: [0, -3, 0],
		transition: {
			duration: 0.4,
		},
	},
};

const ArrowRightIcon = forwardRef<ArrowRightIconHandle, ArrowRightIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M5 12h14"
						variants={pathVariants}
						animate={controls}
					/>
					<motion.path
						d="m12 5 7 7-7 7"
						variants={secondaryPathVariants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ArrowRightIcon.displayName = "ArrowRightIcon";

export { ArrowRightIcon };
```

### `components/ui/icons/arrow-up.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ArrowUpIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ArrowUpIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { d: "m5 12 7-7 7 7", translateY: 0 },
	animate: {
		d: "m5 12 7-7 7 7",
		translateY: [0, 3, 0],
		transition: {
			duration: 0.4,
		},
	},
};

const secondPathVariants: Variants = {
	normal: { d: "M12 19V5" },
	animate: {
		d: ["M12 19V5", "M12 19V10", "M12 19V5"],
		transition: {
			duration: 0.4,
		},
	},
};

const ArrowUpIcon = forwardRef<ArrowUpIconHandle, ArrowUpIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="m5 12 7-7 7 7"
						variants={pathVariants}
						animate={controls}
					/>
					<motion.path
						d="M12 19V5"
						variants={secondPathVariants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ArrowUpIcon.displayName = "ArrowUpIcon";

export { ArrowUpIcon };
```

### `components/ui/icons/at-sign.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface AtSignIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AtSignIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const circleVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.3,
			opacity: { duration: 0.1 },
		},
	},
};

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		transition: {
			delay: 0.3,
			duration: 0.3,
			opacity: { duration: 0.1, delay: 0.3 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			delay: 0.3,
			duration: 0.3,
			opacity: { duration: 0.1, delay: 0.3 },
		},
	},
};

const AtSignIcon = forwardRef<AtSignIconHandle, AtSignIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.circle
						variants={circleVariants}
						animate={controls}
						cx="12"
						cy="12"
						r="4"
					/>
					<motion.path
						variants={pathVariants}
						animate={controls}
						d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"
					/>
				</svg>
			</div>
		);
	}
);

AtSignIcon.displayName = "AtSignIcon";

export { AtSignIcon };
```

### `components/ui/icons/attach-file.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface AttachFileIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AttachFileIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			delay: 0.1,
			duration: 0.4,
			opacity: { duration: 0.1, delay: 0.1 },
		},
	},
};

const AttachFileIcon = forwardRef<AttachFileIconHandle, AttachFileIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={controls}
						d="M6 7.90909V16C6 19.3137 8.68629 22 12 22V22C15.3137 22 18 19.3137 18 16V6C18 3.79086 16.2091 2 14 2V2C11.7909 2 10 3.79086 10 6V15.1818C10 16.2864 10.8954 17.1818 12 17.1818V17.1818C13.1046 17.1818 14 16.2864 14 15.1818V8"
					/>
				</svg>
			</div>
		);
	}
);

AttachFileIcon.displayName = "AttachFileIcon";

export { AttachFileIcon };
```

### `components/ui/icons/audio-lines.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface AudioLinesIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface AudioLinesIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const AudioLinesIcon = forwardRef<AudioLinesIconHandle, AudioLinesIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M2 10v3" />
					<motion.path
						variants={{
							normal: { d: "M6 6v11" },
							animate: {
								d: ["M6 6v11", "M6 10v3", "M6 6v11"],
								transition: {
									duration: 1.5,
									repeat: Infinity,
								},
							},
						}}
						d="M6 6v11"
						animate={controls}
					/>
					<motion.path
						variants={{
							normal: { d: "M10 3v18" },
							animate: {
								d: ["M10 3v18", "M10 9v5", "M10 3v18"],
								transition: {
									duration: 1,
									repeat: Infinity,
								},
							},
						}}
						d="M10 3v18"
						animate={controls}
					/>
					<motion.path
						variants={{
							normal: { d: "M14 8v7" },
							animate: {
								d: ["M14 8v7", "M14 6v11", "M14 8v7"],
								transition: {
									duration: 0.8,
									repeat: Infinity,
								},
							},
						}}
						d="M14 8v7"
						animate={controls}
					/>
					<motion.path
						variants={{
							normal: { d: "M18 5v13" },
							animate: {
								d: ["M18 5v13", "M18 7v9", "M18 5v13"],
								transition: {
									duration: 1.5,
									repeat: Infinity,
								},
							},
						}}
						d="M18 5v13"
						animate={controls}
					/>
					<path d="M22 10v3" />
				</svg>
			</div>
		);
	}
);

AudioLinesIcon.displayName = "AudioLinesIcon";

export { AudioLinesIcon };
```

### `components/ui/icons/badge-alert.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface BadgeAlertIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BadgeAlertIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const iconVariants: Variants = {
	normal: { scale: 1, rotate: 0 },
	animate: {
		scale: [1, 1.1, 1.1, 1.1, 1],
		rotate: [0, -3, 3, -2, 2, 0],
		transition: {
			duration: 0.5,
			times: [0, 0.2, 0.4, 0.6, 1],
			ease: "easeInOut",
		},
	},
};
const BadgeAlertIcon = forwardRef<BadgeAlertIconHandle, BadgeAlertIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					animate={controls}
					variants={iconVariants}
				>
					<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
					<line x1="12" x2="12" y1="8" y2="12" />
					<line x1="12" x2="12.01" y1="16" y2="16" />
				</motion.svg>
			</div>
		);
	}
);

BadgeAlertIcon.displayName = "BadgeAlertIcon";

export { BadgeAlertIcon };
```

### `components/ui/icons/badge-percent.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface BadgePercentIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BadgePercentIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		rotate: 0,
		transition: {
			type: "spring",
			stiffness: 60,
			damping: 10,
			duration: 0.5,
		},
	},
	animate: {
		rotate: 180,
		transition: {
			delay: 0.1,
			type: "spring",
			stiffness: 80,
			damping: 13,
		},
	},
};

const BadgePercentIcon = forwardRef<
	BadgePercentIconHandle,
	BadgePercentIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					variants={pathVariants}
					animate={controls}
					d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
				/>
				<path d="m15 9-6 6" />
				<path d="M9 9h.01" />
				<path d="M15 15h.01" />
			</svg>
		</div>
	);
});

BadgePercentIcon.displayName = "BadgePercentIcon";

export { BadgePercentIcon };
```

### `components/ui/icons/ban.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface BanIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BanIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const circleVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		transition: {
			duration: 0.3,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
};

const lineVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		transition: {
			duration: 0.3,
			opacity: { duration: 0.1 },
		},
	},
	slash: () => ({
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	}),
};

const BanIcon = forwardRef<BanIconHandle, BanIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => {
					controls.start("animate");
					controls.start("slash", { delay: 0.5 });
				},
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
					controls.start("slash", { delay: 0.5 });
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.circle
						cx="12"
						cy="12"
						r="10"
						variants={circleVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="m4.9 4.9 14.2 14.2"
						variants={lineVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

BanIcon.displayName = "BanIcon";

export { BanIcon };
```

### `components/ui/icons/banana.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface BananaIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BananaIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const Transition: Transition = {
	duration: 0.3,
	delay: 0.1,
	opacity: { delay: 0.15 },
};

const Variants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: (custom: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			delay: custom * 0.1,
		},
	}),
};

const BananaIcon = forwardRef<BananaIconHandle, BananaIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						transition={Transition}
						variants={Variants}
						animate={controls}
						custom={2}
						d="M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5"
					/>
					<motion.path
						transition={Transition}
						variants={Variants}
						animate={controls}
						custom={0}
						d="M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z"
					/>
				</svg>
			</div>
		);
	}
);

BananaIcon.displayName = "BananaIcon";

export { BananaIcon };
```

### `components/ui/icons/battery-full.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation, type Variants } from "motion/react";

export interface BatteryFullIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BatteryFullIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const lineVariants: Variants = {
	initial: { opacity: 1 },
	fadeOut: {
		opacity: 0,
		transition: {
			duration: 0.4,
			ease: "easeInOut",
		},
	},
	fadeIn: (i: number) => ({
		opacity: 1,
		transition: {
			duration: 0.6,
			delay: i * 0.4,
			ease: "easeInOut",
		},
	}),
};

const BatteryFullIcon = forwardRef<BatteryFullIconHandle, BatteryFullIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: async () => {
					await controls.start("fadeOut");
					controls.start("fadeIn");
				},
				stopAnimation: () => controls.start("initial"),
			};
		});

		const handleMouseEnter = useCallback(
			async (e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					await controls.start("fadeOut");
					controls.start("fadeIn");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("initial");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<rect width="16" height="10" x="2" y="7" rx="2" ry="2" />
					<line x1="22" x2="22" y1="11" y2="13" />
					<motion.line
						x1="6"
						x2="6"
						y1="11"
						y2="13"
						variants={lineVariants}
						initial="initial"
						animate={controls}
						custom={0}
					/>
					<motion.line
						x1="10"
						x2="10"
						y1="11"
						y2="13"
						variants={lineVariants}
						initial="initial"
						animate={controls}
						custom={1}
					/>
					<motion.line
						x1="14"
						x2="14"
						y1="11"
						y2="13"
						variants={lineVariants}
						initial="initial"
						animate={controls}
						custom={2}
					/>
				</motion.svg>
			</div>
		);
	}
);

BatteryFullIcon.displayName = "BatteryFullIcon";

export { BatteryFullIcon };
```

### `components/ui/icons/bell.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface BellIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BellIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const svgVariants: Variants = {
	normal: { rotate: 0 },
	animate: { rotate: [0, -10, 10, -10, 0] },
};

const BellIcon = forwardRef<BellIconHandle, BellIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={svgVariants}
					animate={controls}
					transition={{
						duration: 0.5,
						ease: "easeInOut",
					}}
				>
					<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
					<path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
				</motion.svg>
			</div>
		);
	}
);

BellIcon.displayName = "BellIcon";

export { BellIcon };
```

### `components/ui/icons/blocks.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface BlocksIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BlocksIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: { translateX: 0, translateY: 0 },
	animate: { translateX: -4, translateY: 4 },
};

const BlocksIcon = forwardRef<BlocksIconHandle, BlocksIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
					<motion.path
						d="M14 3h7v7h-7z"
						variants={variants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

BlocksIcon.displayName = "BlocksIcon";

export { BlocksIcon };
```

### `components/ui/icons/bluetooth-connected.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface BluetoothConnectedIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BluetoothConnectedIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: {
		opacity: [0, 1, 0.5, 1],
		transition: {
			duration: 0.3,
			delay: 0.2,
		},
	},
};

const BluetoothConnectedIcon = forwardRef<
	BluetoothConnectedIconHandle,
	BluetoothConnectedIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					variants={pathVariants}
					animate={controls}
					d="m7 7 10 10-5 5V2l5 5L7 17"
				/>
				<motion.line
					variants={{
						normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
						animate: {
							pathLength: [0, 1],
							opacity: [0, 1],
							pathOffset: [1, 0],
							transition: {
								duration: 0.4,
							},
						},
					}}
					animate={controls}
					x1="18"
					x2="21"
					y1="12"
					y2="12"
				/>
				<motion.line
					variants={{
						normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
						animate: {
							pathLength: [0, 1],
							opacity: [0, 1],
							pathOffset: [-1, 0],
							transition: {
								duration: 0.2,
							},
						},
					}}
					animate={controls}
					x1="3"
					x2="6"
					y1="12"
					y2="12"
				/>
			</svg>
		</div>
	);
});

BluetoothConnectedIcon.displayName = "BluetoothConnectedIcon";

export { BluetoothConnectedIcon };
```

### `components/ui/icons/bluetooth-off.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface BluetoothOffIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BluetoothOffIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		pathOffset: [1, 0],
	},
};

const offlineVariants: Variants = {
	normal: { pathLength: 1, opacity: 1 },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
	},
};

const BluetoothOffIcon = forwardRef<
	BluetoothOffIconHandle,
	BluetoothOffIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					variants={pathVariants}
					animate={controls}
					transition={{
						duration: 0.3,
					}}
					d="m17 17-5 5V12l-5 5"
				/>
				<motion.path
					variants={offlineVariants}
					animate={controls}
					transition={{
						duration: 0.2,
						delay: 0.3,
					}}
					d="m2 2 20 20"
				/>
				<motion.path
					variants={pathVariants}
					animate={controls}
					transition={{
						duration: 0.3,
					}}
					d="M14.5 9.5 17 7l-5-5v4.5"
				/>
			</svg>
		</div>
	);
});

BluetoothOffIcon.displayName = "BluetoothOffIcon";

export { BluetoothOffIcon };
```

### `components/ui/icons/bluetooth-searching.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface BluetoothSearchingIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BluetoothSearchingIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		scale: 1,
		transition: {
			repeat: 0,
		},
	},
	animate: {
		scale: [0, 1, 0.8],
	},
};

const secondVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: {
		opacity: [1, 0.8, 1],
		transition: { repeat: Infinity },
	},
};

const BluetoothSearchingIcon = forwardRef<
	BluetoothSearchingIconHandle,
	BluetoothSearchingIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					variants={secondVariants}
					animate={controls}
					d="m7 7 10 10-5 5V2l5 5L7 17"
				/>
				<motion.path
					variants={pathVariants}
					animate={controls}
					transition={{
						duration: 0.6,
						delay: 0.2,
						repeat: Infinity,
					}}
					d="M20.83 14.83a4 4 0 0 0 0-5.66"
				/>
				<motion.path
					variants={pathVariants}
					animate={controls}
					transition={{
						duration: 0.6,
						repeat: Infinity,
					}}
					d="M18 12h.01"
				/>
			</svg>
		</div>
	);
});

BluetoothSearchingIcon.displayName = "BluetoothSearchingIcon";

export { BluetoothSearchingIcon };
```

### `components/ui/icons/bold.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface BoldIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BoldIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		pathOffset: [1, 0],
	},
};

const BoldIcon = forwardRef<BoldIconHandle, BoldIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						variants={pathVariants}
						transition={{ duration: 0.6 }}
						animate={controls}
						d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"
					/>
				</svg>
			</div>
		);
	}
);

BoldIcon.displayName = "BoldIcon";

export { BoldIcon };
```

### `components/ui/icons/bone.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface BoneIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BoneIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: { rotate: 0 },
	animate: {
		rotate: [0, -8, 8, -6, 0],
		transition: {
			ease: "circIn",
			rotate: {
				duration: 0.5,
			},
		},
	},
};

const BoneIcon = forwardRef<BoneIconHandle, BoneIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						variants={variants}
						animate={controls}
						d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"
					/>
				</svg>
			</div>
		);
	}
);

BoneIcon.displayName = "BoneIcon";

export { BoneIcon };
```

### `components/ui/icons/book-text.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface BookTextIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BookTextIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const BookTextIcon = forwardRef<BookTextIconHandle, BookTextIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					animate={controls}
					variants={{
						animate: {
							scale: [1, 1.04, 1],
							rotate: [0, -8, 8, -8, 0],
							y: [0, -2, 0],
							transition: {
								duration: 0.6,
								ease: "easeInOut",
								times: [0, 0.2, 0.5, 0.8, 1],
							},
						},
						normal: {
							scale: 1,
							rotate: 0,
							y: 0,
						},
					}}
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
					<path d="M8 11h8" />
					<path d="M8 7h6" />
				</motion.svg>
			</div>
		);
	}
);

BookTextIcon.displayName = "BookTextIcon";

export { BookTextIcon };
```

### `components/ui/icons/boxes.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface BoxesIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface BoxesIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const BoxesIcon = forwardRef<BoxesIconHandle, BoxesIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					style={{ overflow: "visible" }}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z m4.03 3.58 -4.74 -2.85 m4.74 2.85 5-3 m-5 3v5.17"
						variants={{
							normal: { translateX: 0, translateY: 0 },
							animate: { translateX: -1.5, translateY: 1.5 },
						}}
						animate={controls}
					/>
					<motion.path
						d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z m5 3-5-3 m5 3 4.74-2.85 M17 16.5v5.17"
						variants={{
							normal: { translateX: 0, translateY: 0 },
							animate: { translateX: 1.5, translateY: 1.5 },
						}}
						animate={controls}
					/>
					<motion.path
						d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z M12 8 7.26 5.15 m4.74 2.85 4.74-2.85 M12 13.5V8"
						variants={{
							normal: { translateX: 0, translateY: 0 },
							animate: { translateX: 0, translateY: -1.5 },
						}}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

BoxesIcon.displayName = "BoxesIcon";

export { BoxesIcon };
```

### `components/ui/icons/calendar-check-2.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";

export interface CalendarCheck2IconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CalendarCheck2IconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const checkVariants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
		transition: {
			duration: 0.3,
		},
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			pathLength: { duration: 0.4, ease: "easeInOut" },
			opacity: { duration: 0.4, ease: "easeInOut" },
		},
	},
};

const CalendarCheck2Icon = forwardRef<
	CalendarCheck2IconHandle,
	CalendarCheck2IconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M8 2v4" />
				<path d="M16 2v4" />
				<path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
				<path d="M3 10h18" />
				<motion.path
					animate={controls}
					initial="normal"
					variants={checkVariants}
					d="m16 20 2 2 4-4"
					style={{ transformOrigin: "center" }}
				/>
			</svg>
		</div>
	);
});

CalendarCheck2Icon.displayName = "CalendarCheck2Icon";

export { CalendarCheck2Icon };
```

### `components/ui/icons/calendar-check.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";

export interface CalendarCheckIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CalendarCheckIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const checkVariants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
		transition: {
			duration: 0.3,
		},
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			pathLength: { duration: 0.4, ease: "easeInOut" },
			opacity: { duration: 0.4, ease: "easeInOut" },
		},
	},
};

const CalendarCheckIcon = forwardRef<
	CalendarCheckIconHandle,
	CalendarCheckIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M8 2v4" />
				<path d="M16 2v4" />
				<rect width="18" height="18" x="3" y="4" rx="2" />
				<path d="M3 10h18" />
				<motion.path
					animate={controls}
					initial="normal"
					variants={checkVariants}
					d="m9 16 2 2 4-4"
					style={{ transformOrigin: "center" }}
				/>
			</svg>
		</div>
	);
});

CalendarCheckIcon.displayName = "CalendarCheckIcon";

export { CalendarCheckIcon };
```

### `components/ui/icons/calendar-cog.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CalendarCogIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CalendarCogIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const gVariants: Variants = {
	normal: { rotate: 0 },
	animate: { rotate: 180 },
};

const CalendarCogIcon = forwardRef<CalendarCogIconHandle, CalendarCogIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
					<path d="M16 2v4" />
					<path d="M3 10h18" />
					<path d="M8 2v4" />
					<motion.g
						transition={{ type: "spring", stiffness: 50, damping: 10 }}
						variants={gVariants}
						animate={controls}
					>
						<path d="m15.2 16.9-.9-.4" />
						<path d="m15.2 19.1-.9.4" />
						<path d="m16.9 15.2-.4-.9" />
						<path d="m16.9 20.8-.4.9" />
						<path d="m19.5 14.3-.4.9" />
						<path d="m19.5 21.7-.4-.9" />
						<path d="m21.7 16.5-.9.4" />
						<path d="m21.7 19.5-.9-.4" />
						<circle cx="18" cy="18" r="3" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

CalendarCogIcon.displayName = "CalendarCogIcon";

export { CalendarCogIcon };
```

### `components/ui/icons/calendar-days.tsx`

```tsx
"use client";

import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";

export interface CalendarDaysIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CalendarDaysIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const DOTS = [
	{ cx: 8, cy: 14 },
	{ cx: 12, cy: 14 },
	{ cx: 16, cy: 14 },
	{ cx: 8, cy: 18 },
	{ cx: 12, cy: 18 },
	{ cx: 16, cy: 18 },
];

const variants: Variants = {
	normal: {
		opacity: 1,
		transition: {
			duration: 0.2,
		},
	},
	animate: (i: number) => ({
		opacity: [1, 0.3, 1],
		transition: {
			delay: i * 0.1,
			duration: 0.4,
			times: [0, 0.5, 1],
		},
	}),
};

const CalendarDaysIcon = forwardRef<
	CalendarDaysIconHandle,
	CalendarDaysIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				"cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center",
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M8 2v4" />
				<path d="M16 2v4" />
				<rect width="18" height="18" x="3" y="4" rx="2" />
				<path d="M3 10h18" />
				<AnimatePresence>
					{DOTS.map((dot, index) => (
						<motion.circle
							key={`${dot.cx}-${dot.cy}`}
							cx={dot.cx}
							cy={dot.cy}
							r="1"
							fill="currentColor"
							stroke="none"
							initial="normal"
							variants={variants}
							animate={controls}
							custom={index}
						/>
					))}
				</AnimatePresence>
			</svg>
		</div>
	);
});

CalendarDaysIcon.displayName = "CalendarDaysIcon";

export { CalendarDaysIcon };
```

### `components/ui/icons/cart.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CartIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CartIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const cartVariants: Variants = {
	normal: { scale: 1 },
	animate: {
		scale: 1.1,
		y: [0, -5, 0],
		transition: {
			duration: 0.3,
			ease: "easeInOut",
			y: { repeat: 1, delay: 0.1, duration: 0.4 },
		},
	},
};

const CartIcon = forwardRef<CartIconHandle, CartIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={cartVariants}
					animate={controls}
					transition={{ duration: 0.2 }}
				>
					<path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" />
				</motion.svg>
			</div>
		);
	}
);

CartIcon.displayName = "CartIcon";

export { CartIcon };
```

### `components/ui/icons/cast.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CastIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CastIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: { opacity: 1 },
	animate: (custom: number) => ({
		opacity: [0, 1],
		transition: {
			delay: custom,
			duration: 0.5,
		},
	}),
};

const CastIcon = forwardRef<CastIconHandle, CastIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
					<motion.path
						variants={variants}
						animate={controls}
						custom={0.2}
						d="M2 12a9 9 0 0 1 8 8"
					/>
					<motion.path
						variants={variants}
						animate={controls}
						custom={0.1}
						d="M2 16a5 5 0 0 1 4 4"
					/>
					<motion.line
						variants={variants}
						custom={0}
						animate={controls}
						x1="2"
						x2="2.01"
						y1="20"
						y2="20"
					/>
				</svg>
			</div>
		);
	}
);

CastIcon.displayName = "CastIcon";

export { CastIcon };
```

### `components/ui/icons/cctv.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CctvIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CctvIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const dotVariants: Variants = {
	normal: { opacity: 1 },
	animate: {
		opacity: [1, 0, 1],
		transition: {
			duration: 1,
			repeat: Infinity,
		},
	},
};

const cctvVariants: Variants = {
	normal: { rotate: 0 },
	animate: {
		rotate: [0, -15, 10, 0],
		originX: "9px",
		originY: "15px",
		transition: {
			duration: 2,
			ease: "easeInOut",
		},
	},
};

const CctvIcon = forwardRef<CctvIconHandle, CctvIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.g variants={cctvVariants} animate={controls}>
						<path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97" />
						<path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z" />
						<motion.path
							d="M7 9h.01"
							variants={dotVariants}
							animate={controls}
						/>
					</motion.g>
					<path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15" />
					<path d="M2 21v-4" />
				</svg>
			</div>
		);
	}
);

CctvIcon.displayName = "CctvIcon";

export { CctvIcon };
```

### `components/ui/icons/chart-bar-decreasing.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation, type Variants } from "motion/react";

export interface ChartBarDecreasingIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChartBarDecreasingIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const lineVariants: Variants = {
	visible: { pathLength: 1, opacity: 1 },
	hidden: { pathLength: 0, opacity: 0 },
};

const ChartBarDecreasingIcon = forwardRef<
	ChartBarDecreasingIconHandle,
	ChartBarDecreasingIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: async () => {
				await controls.start((i) => ({
					pathLength: 0,
					opacity: 0,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
				await controls.start((i) => ({
					pathLength: 1,
					opacity: 1,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
			},
			stopAnimation: () => controls.start("visible"),
		};
	});

	const handleMouseEnter = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				await controls.start((i) => ({
					pathLength: 0,
					opacity: 0,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
				await controls.start((i) => ({
					pathLength: 1,
					opacity: 1,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("visible");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M3 3v16a2 2 0 0 0 2 2h16" />
				<motion.path
					variants={lineVariants}
					initial="visible"
					animate={controls}
					custom={1}
					d="M7 11h8"
				/>
				<motion.path
					variants={lineVariants}
					initial="visible"
					animate={controls}
					custom={2}
					d="M7 16h3"
				/>
				<motion.path
					variants={lineVariants}
					initial="visible"
					animate={controls}
					custom={0}
					d="M7 6h12"
				/>
			</svg>
		</div>
	);
});

ChartBarDecreasingIcon.displayName = "ChartBarDecreasingIcon";

export { ChartBarDecreasingIcon };
```

### `components/ui/icons/chart-bar-increasing.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation, type Variants } from "motion/react";

export interface ChartBarIncreasingIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChartBarIncreasingIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const lineVariants: Variants = {
	visible: { pathLength: 1, opacity: 1 },
	hidden: { pathLength: 0, opacity: 0 },
};

const ChartBarIncreasingIcon = forwardRef<
	ChartBarIncreasingIconHandle,
	ChartBarIncreasingIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: async () => {
				await controls.start((i) => ({
					pathLength: 0,
					opacity: 0,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
				await controls.start((i) => ({
					pathLength: 1,
					opacity: 1,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
			},
			stopAnimation: () => controls.start("visible"),
		};
	});

	const handleMouseEnter = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				await controls.start((i) => ({
					pathLength: 0,
					opacity: 0,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
				await controls.start((i) => ({
					pathLength: 1,
					opacity: 1,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("visible");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M3 3v16a2 2 0 0 0 2 2h16" />
				<motion.path
					variants={lineVariants}
					initial="visible"
					animate={controls}
					custom={1}
					d="M7 11h8"
				/>
				<motion.path
					variants={lineVariants}
					initial="visible"
					animate={controls}
					custom={2}
					d="M7 16h12"
				/>
				<motion.path
					variants={lineVariants}
					initial="visible"
					animate={controls}
					custom={0}
					d="M7 6h3"
				/>
			</svg>
		</div>
	);
});

ChartBarIncreasingIcon.displayName = "ChartBarIncreasingIcon";

export { ChartBarIncreasingIcon };
```

### `components/ui/icons/chart-column-decreasing.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation, type Variants } from "motion/react";

export interface ChartColumnDecreasingIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChartColumnDecreasingIconProps
	extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const lineVariants: Variants = {
	visible: { pathLength: 1, opacity: 1 },
	hidden: { pathLength: 0, opacity: 0 },
};

const ChartColumnDecreasingIcon = forwardRef<
	ChartColumnDecreasingIconHandle,
	ChartColumnDecreasingIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: async () => {
				await controls.start((i) => ({
					pathLength: 0,
					opacity: 0,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
				await controls.start((i) => ({
					pathLength: 1,
					opacity: 1,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
			},
			stopAnimation: () => controls.start("visible"),
		};
	});

	const handleMouseEnter = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				await controls.start((i) => ({
					pathLength: 0,
					opacity: 0,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
				await controls.start((i) => ({
					pathLength: 1,
					opacity: 1,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("visible");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					variants={lineVariants}
					initial="visible"
					animate={controls}
					custom={1}
					d="M13 17V9"
				/>
				<motion.path
					variants={lineVariants}
					initial="visible"
					animate={controls}
					custom={2}
					d="M18 17v-3"
				/>
				<path d="M3 3v16a2 2 0 0 0 2 2h16" />
				<motion.path
					variants={lineVariants}
					initial="visible"
					animate={controls}
					custom={0}
					d="M8 17V5"
				/>
			</svg>
		</div>
	);
});

ChartColumnDecreasingIcon.displayName = "ChartColumnDecreasingIcon";

export { ChartColumnDecreasingIcon };
```

### `components/ui/icons/chart-column-increasing.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation, type Variants } from "motion/react";

export interface ChartColumnIncreasingIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChartColumnIncreasingIconProps
	extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const lineVariants: Variants = {
	visible: { pathLength: 1, opacity: 1 },
	hidden: { pathLength: 0, opacity: 0 },
};

const ChartColumnIncreasingIcon = forwardRef<
	ChartColumnIncreasingIconHandle,
	ChartColumnIncreasingIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: async () => {
				await controls.start((i) => ({
					pathLength: 0,
					opacity: 0,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
				await controls.start((i) => ({
					pathLength: 1,
					opacity: 1,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
			},
			stopAnimation: () => controls.start("visible"),
		};
	});

	const handleMouseEnter = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				await controls.start((i) => ({
					pathLength: 0,
					opacity: 0,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
				await controls.start((i) => ({
					pathLength: 1,
					opacity: 1,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("visible");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					variants={lineVariants}
					initial="visible"
					animate={controls}
					custom={1}
					d="M13 17V9"
				/>
				<motion.path
					variants={lineVariants}
					initial="visible"
					animate={controls}
					custom={2}
					d="M18 17V5"
				/>
				<path d="M3 3v16a2 2 0 0 0 2 2h16" />
				<motion.path
					variants={lineVariants}
					initial="visible"
					animate={controls}
					custom={0}
					d="M8 17v-3"
				/>
			</svg>
		</div>
	);
});

ChartColumnIncreasingIcon.displayName = "ChartColumnIncreasingIcon";

export { ChartColumnIncreasingIcon };
```

### `components/ui/icons/chart-line.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ChartLineIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChartLineIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			delay: 0.15,
			duration: 0.3,
			opacity: { delay: 0.1 },
		},
	},
};

const ChartLineIcon = forwardRef<ChartLineIconHandle, ChartLineIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M3 3v16a2 2 0 0 0 2 2h16" />
					<motion.path
						d="m7 13 3-3 4 4 5-5"
						variants={variants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ChartLineIcon.displayName = "ChartLineIcon";

export { ChartLineIcon };
```

### `components/ui/icons/chart-no-axes-column-decreasing.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation, type Variants } from "motion/react";

export interface ChartNoAxesColumnDecreasingIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChartNoAxesColumnDecreasingIconProps
	extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const lineVariants: Variants = {
	visible: { pathLength: 1, opacity: 1 },
	hidden: { pathLength: 0, opacity: 0 },
};

const ChartNoAxesColumnDecreasingIcon = forwardRef<
	ChartNoAxesColumnDecreasingIconHandle,
	ChartNoAxesColumnDecreasingIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: async () => {
				await controls.start((i) => ({
					pathLength: 0,
					opacity: 0,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
				await controls.start((i) => ({
					pathLength: 1,
					opacity: 1,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
			},
			stopAnimation: () => controls.start("visible"),
		};
	});

	const handleMouseEnter = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				await controls.start((i) => ({
					pathLength: 0,
					opacity: 0,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
				await controls.start((i) => ({
					pathLength: 1,
					opacity: 1,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("visible");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					variants={lineVariants}
					initial="visible"
					animate={controls}
					custom={0}
					d="M6 20V4"
				/>
				<motion.path
					variants={lineVariants}
					initial="visible"
					animate={controls}
					custom={1}
					d="M12 20V10"
				/>
				<motion.path
					variants={lineVariants}
					initial="visible"
					animate={controls}
					custom={2}
					d="M18 20v-4"
				/>
			</svg>
		</div>
	);
});

ChartNoAxesColumnDecreasingIcon.displayName = "ChartNoAxesColumnDecreasingIcon";

export { ChartNoAxesColumnDecreasingIcon };
```

### `components/ui/icons/chart-no-axes-column-increasing.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation, type Variants } from "motion/react";

export interface ChartNoAxesColumnIncreasingIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChartNoAxesColumnIncreasingIconProps
	extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const lineVariants: Variants = {
	visible: { pathLength: 1, opacity: 1 },
	hidden: { pathLength: 0, opacity: 0 },
};

const ChartNoAxesColumnIncreasingIcon = forwardRef<
	ChartNoAxesColumnIncreasingIconHandle,
	ChartNoAxesColumnIncreasingIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: async () => {
				await controls.start((i) => ({
					pathLength: 0,
					opacity: 0,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
				await controls.start((i) => ({
					pathLength: 1,
					opacity: 1,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
			},
			stopAnimation: () => controls.start("visible"),
		};
	});

	const handleMouseEnter = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				await controls.start((i) => ({
					pathLength: 0,
					opacity: 0,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
				await controls.start((i) => ({
					pathLength: 1,
					opacity: 1,
					transition: { delay: i * 0.1, duration: 0.3 },
				}));
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("visible");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					variants={lineVariants}
					initial="visible"
					animate={controls}
					custom={0}
					d="M6 20v-4"
				/>
				<motion.path
					variants={lineVariants}
					initial="visible"
					animate={controls}
					custom={1}
					d="M12 20v-10"
				/>
				<motion.path
					variants={lineVariants}
					initial="visible"
					animate={controls}
					custom={2}
					d="M18 20v-16"
				/>
			</svg>
		</div>
	);
});

ChartNoAxesColumnIncreasingIcon.displayName = "ChartNoAxesColumnIncreasingIcon";

export { ChartNoAxesColumnIncreasingIcon };
```

### `components/ui/icons/chart-pie.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ChartPieIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChartPieIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { translateX: 0, translateY: 0 },
	animate: { translateX: 1.1, translateY: -1.1 },
};

const ChartPieIcon = forwardRef<ChartPieIconHandle, ChartPieIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"
						transition={{
							type: "spring",
							stiffness: 250,
							damping: 15,
							bounce: 0.6,
						}}
						variants={pathVariants}
						animate={controls}
					/>
					<path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
				</svg>
			</div>
		);
	}
);

ChartPieIcon.displayName = "ChartPieIcon";

export { ChartPieIcon };
```

### `components/ui/icons/chart-scatter.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation, type Variants } from "motion/react";

export interface ChartScatterIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChartScatterIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const dotVariants: Variants = {
	visible: (i: number) => ({
		opacity: 1,
		transition: {
			delay: i * 0.15,
			duration: 0.3,
		},
	}),
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.2,
		},
	},
	default: { opacity: 1 },
};

const ChartScatterIcon = forwardRef<
	ChartScatterIconHandle,
	ChartScatterIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: async () => {
				await controls.start("hidden");
				await controls.start("visible");
			},
			stopAnimation: async () => controls.start("default"),
		};
	});

	const handleMouseEnter = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				await controls.start("hidden");
				await controls.start("visible");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				await controls.start("default");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				initial="default"
				animate={controls}
			>
				<motion.circle
					cx="7.5"
					cy="7.5"
					r=".5"
					variants={dotVariants}
					custom={0}
					fill="currentColor"
				/>
				<motion.circle
					cx="18.5"
					cy="5.5"
					r=".5"
					variants={dotVariants}
					custom={1}
					fill="currentColor"
				/>
				<motion.circle
					cx="11.5"
					cy="11.5"
					r=".5"
					variants={dotVariants}
					custom={2}
					fill="currentColor"
				/>
				<motion.circle
					cx="7.5"
					cy="16.5"
					r=".5"
					variants={dotVariants}
					custom={3}
					fill="currentColor"
				/>
				<motion.circle
					cx="17.5"
					cy="14.5"
					r=".5"
					variants={dotVariants}
					custom={4}
					fill="currentColor"
				/>
				<path d="M3 3v16a2 2 0 0 0 2 2h16" strokeWidth="2" />
			</motion.svg>
		</div>
	);
});

ChartScatterIcon.displayName = "ChartScatterIcon";

export { ChartScatterIcon };
```

### `components/ui/icons/chart-spline.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ChartSplineIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChartSplineIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			delay: 0.15,
			duration: 0.3,
			opacity: { delay: 0.1 },
		},
	},
};

const ChartSplineIcon = forwardRef<ChartSplineIconHandle, ChartSplineIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M3 3v16a2 2 0 0 0 2 2h16" />
					<motion.path
						d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7"
						variants={variants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ChartSplineIcon.displayName = "ChartSplineIcon";

export { ChartSplineIcon };
```

### `components/ui/icons/check-check.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CheckCheckIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CheckCheckIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		scale: 1,
		transition: {
			duration: 0.3,
			opacity: { duration: 0.1 },
		},
	},
	animate: (custom: number) => ({
		opacity: [0, 1],
		pathLength: [0, 1],
		scale: [0.5, 1],
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
			delay: 0.1 * custom,
		},
	}),
};

const CheckCheckIcon = forwardRef<CheckCheckIconHandle, CheckCheckIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={controls}
						d="M2 12 7 17L18 6"
						custom={0}
					/>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={controls}
						d="M13 16L14.5 17.5L22 10"
						custom={1}
					/>
				</svg>
			</div>
		);
	}
);

CheckCheckIcon.displayName = "CheckCheckIcon";

export { CheckCheckIcon };
```

### `components/ui/icons/check.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CheckIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CheckIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		scale: 1,
		transition: {
			duration: 0.3,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		scale: [0.5, 1],
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
};

const CheckIcon = forwardRef<CheckIconHandle, CheckIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={controls}
						d="M4 12 9 17L20 6"
					/>
				</svg>
			</div>
		);
	}
);

CheckIcon.displayName = "CheckIcon";

export { CheckIcon };
```

### `components/ui/icons/chevron-down.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ChevronDownIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChevronDownIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	times: [0, 0.4, 1],
	duration: 0.5,
};

const ChevronDownIcon = forwardRef<ChevronDownIconHandle, ChevronDownIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						variants={{
							normal: { y: 0 },
							animate: { y: [0, 2, 0] },
						}}
						transition={defaultTransition}
						animate={controls}
						d="m6 9 6 6 6-6"
					/>
				</svg>
			</div>
		);
	}
);

ChevronDownIcon.displayName = "ChevronDownIcon";

export { ChevronDownIcon };
```

### `components/ui/icons/chevron-left.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ChevronLeftIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChevronLeftIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	times: [0, 0.4, 1],
	duration: 0.5,
};

const ChevronLeftIcon = forwardRef<ChevronLeftIconHandle, ChevronLeftIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						variants={{
							normal: { x: 0 },
							animate: { x: [0, -2, 0] },
						}}
						transition={defaultTransition}
						animate={controls}
						d="m15 18-6-6 6-6"
					/>
				</svg>
			</div>
		);
	}
);

ChevronLeftIcon.displayName = "ChevronLeftIcon";

export { ChevronLeftIcon };
```

### `components/ui/icons/chevron-right.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ChevronRightIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChevronRightIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	times: [0, 0.4, 1],
	duration: 0.5,
};

const ChevronRightIcon = forwardRef<
	ChevronRightIconHandle,
	ChevronRightIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					variants={{
						normal: { x: 0 },
						animate: { x: [0, 2, 0] },
					}}
					transition={defaultTransition}
					animate={controls}
					d="m9 18 6-6-6-6"
				/>
			</svg>
		</div>
	);
});

ChevronRightIcon.displayName = "ChevronRightIcon";

export { ChevronRightIcon };
```

### `components/ui/icons/chevron-up.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ChevronUpIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChevronUpIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	times: [0, 0.4, 1],
	duration: 0.5,
};

const ChevronUpIcon = forwardRef<ChevronUpIconHandle, ChevronUpIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						variants={{
							normal: { y: 0 },
							animate: { y: [0, -2, 0] },
						}}
						transition={defaultTransition}
						animate={controls}
						d="m18 15-6-6-6 6"
					/>
				</svg>
			</div>
		);
	}
);

ChevronUpIcon.displayName = "ChevronUpIcon";

export { ChevronUpIcon };
```

### `components/ui/icons/chevrons-down-up.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ChevronsDownUpIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChevronsDownUpIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	type: "spring",
	stiffness: 250,
	damping: 25,
};

const ChevronsDownUpIcon = forwardRef<
	ChevronsDownUpIconHandle,
	ChevronsDownUpIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					variants={{
						normal: { translateY: "0%" },
						animate: { translateY: "-2px" },
					}}
					transition={defaultTransition}
					animate={controls}
					initial="normal"
					d="m7 20 5-5 5 5"
				/>
				<motion.path
					variants={{
						normal: { translateY: "0%" },
						animate: { translateY: "2px" },
					}}
					transition={defaultTransition}
					animate={controls}
					initial="normal"
					d="m7 4 5 5 5-5"
				/>
			</svg>
		</div>
	);
});

ChevronsDownUpIcon.displayName = "ChevronsDownUpIcon";

export { ChevronsDownUpIcon };
```

### `components/ui/icons/chevrons-left-right.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ChevronsLeftRightIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChevronsLeftRightIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	type: "spring",
	stiffness: 250,
	damping: 25,
};

const ChevronsLeftRightIcon = forwardRef<
	ChevronsLeftRightIconHandle,
	ChevronsLeftRightIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					variants={{
						normal: { translateX: "0%" },
						animate: { translateX: "-2px" },
					}}
					transition={defaultTransition}
					animate={controls}
					initial="normal"
					d="m9 7-5 5 5 5"
				/>
				<motion.path
					variants={{
						normal: { translateX: "0%" },
						animate: { translateX: "2px" },
					}}
					transition={defaultTransition}
					animate={controls}
					initial="normal"
					d="m15 7 5 5-5 5"
				/>
			</svg>
		</div>
	);
});

ChevronsLeftRightIcon.displayName = "ChevronsLeftRightIcon";

export { ChevronsLeftRightIcon };
```

### `components/ui/icons/chevrons-right-left.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ChevronsRightLeftIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChevronsRightLeftIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	type: "spring",
	stiffness: 250,
	damping: 25,
};

const ChevronsRightLeftIcon = forwardRef<
	ChevronsRightLeftIconHandle,
	ChevronsRightLeftIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					variants={{
						normal: { translateX: "0%" },
						animate: { translateX: "-2px" },
					}}
					transition={defaultTransition}
					animate={controls}
					initial="normal"
					d="m20 17-5-5 5-5"
				/>
				<motion.path
					variants={{
						normal: { translateX: "0%" },
						animate: { translateX: "2px" },
					}}
					transition={defaultTransition}
					animate={controls}
					initial="normal"
					d="m4 17 5-5-5-5"
				/>
			</svg>
		</div>
	);
});

ChevronsRightLeftIcon.displayName = "ChevronsRightLeftIcon";

export { ChevronsRightLeftIcon };
```

### `components/ui/icons/chevrons-up-down.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ChevronsUpDownIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChevronsUpDownIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	type: "spring",
	stiffness: 250,
	damping: 25,
};

const ChevronsUpDownIcon = forwardRef<
	ChevronsUpDownIconHandle,
	ChevronsUpDownIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					variants={{
						normal: { translateY: "0%" },
						animate: { translateY: "2px" },
					}}
					transition={defaultTransition}
					animate={controls}
					initial="normal"
					d="m7 15 5 5 5-5"
				/>
				<motion.path
					variants={{
						normal: { translateY: "0%" },
						animate: { translateY: "-2px" },
					}}
					transition={defaultTransition}
					animate={controls}
					initial="normal"
					d="m7 9 5-5 5 5"
				/>
			</svg>
		</div>
	);
});

ChevronsUpDownIcon.displayName = "ChevronsUpDownIcon";

export { ChevronsUpDownIcon };
```

### `components/ui/icons/chrome.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ChromeIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ChromeIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const transition: Transition = {
	duration: 0.3,
	opacity: { delay: 0.15 },
};

const variants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: (custom: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			...transition,
			delay: 0.1 * custom,
		},
	}),
};

const ChromeIcon = forwardRef<ChromeIconHandle, ChromeIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<motion.circle
						cx="12"
						cy="12"
						r="4"
						variants={variants}
						animate={controls}
						custom={0}
					/>
					<motion.line
						x1="21.17"
						x2="12"
						y1="8"
						y2="8"
						variants={variants}
						animate={controls}
						custom={3}
					/>
					<motion.line
						x1="3.95"
						x2="8.54"
						y1="6.06"
						y2="14"
						variants={variants}
						animate={controls}
						custom={3}
					/>
					<motion.line
						x1="10.88"
						x2="15.46"
						y1="21.94"
						y2="14"
						variants={variants}
						animate={controls}
						custom={3}
					/>
				</svg>
			</div>
		);
	}
);

ChromeIcon.displayName = "ChromeIcon";

export { ChromeIcon };
```

### `components/ui/icons/circle-check.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CircleCheckIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CircleCheckIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		transition: {
			duration: 0.3,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
};

const CircleCheckIcon = forwardRef<CircleCheckIconHandle, CircleCheckIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={controls}
						d="m9 12 2 2 4-4"
					/>
				</svg>
			</div>
		);
	}
);

CircleCheckIcon.displayName = "CircleCheckIcon";

export { CircleCheckIcon };
```

### `components/ui/icons/circle-chevron-down.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CircleChevronDownIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CircleChevronDownIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	times: [0, 0.4, 1],
	duration: 0.5,
};

const CircleChevronDownIcon = forwardRef<
	CircleChevronDownIconHandle,
	CircleChevronDownIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="12" r="10" />
				<motion.path
					variants={{
						normal: { y: 0 },
						animate: {
							y: [0, 2, 0],
						},
					}}
					transition={defaultTransition}
					animate={controls}
					d="m16 10-4 4-4-4"
				/>
			</svg>
		</div>
	);
});

CircleChevronDownIcon.displayName = "CircleChevronDownIcon";

export { CircleChevronDownIcon };
```

### `components/ui/icons/circle-chevron-left.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CircleChevronLeftIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CircleChevronLeftIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	times: [0, 0.4, 1],
	duration: 0.5,
};

const CircleChevronLeftIcon = forwardRef<
	CircleChevronLeftIconHandle,
	CircleChevronLeftIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="12" r="10" />
				<motion.path
					variants={{
						normal: { x: 0 },
						animate: { x: [0, -2, 0] },
					}}
					transition={defaultTransition}
					animate={controls}
					d="m14 16-4-4 4-4"
				/>
			</svg>
		</div>
	);
});

CircleChevronLeftIcon.displayName = "CircleChevronLeftIcon";

export { CircleChevronLeftIcon };
```

### `components/ui/icons/circle-chevron-right.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CircleChevronRightIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CircleChevronRightIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	times: [0, 0.4, 1],
	duration: 0.5,
};

const CircleChevronRightIcon = forwardRef<
	CircleChevronRightIconHandle,
	CircleChevronRightIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="12" r="10" />
				<motion.path
					variants={{
						normal: { x: 0 },
						animate: { x: [0, 2, 0] },
					}}
					transition={defaultTransition}
					animate={controls}
					d="m10 8 4 4-4 4"
				/>
			</svg>
		</div>
	);
});

CircleChevronRightIcon.displayName = "CircleChevronRightIcon";

export { CircleChevronRightIcon };
```

### `components/ui/icons/circle-chevron-up.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CircleChevronUpIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CircleChevronUpIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	times: [0, 0.4, 1],
	duration: 0.5,
};

const CircleChevronUpIcon = forwardRef<
	CircleChevronUpIconHandle,
	CircleChevronUpIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="12" r="10" />
				<motion.path
					variants={{
						normal: { y: 0 },
						animate: {
							y: [0, -2, 0],
						},
					}}
					transition={defaultTransition}
					animate={controls}
					d="m8 14 4-4 4 4"
				/>
			</svg>
		</div>
	);
});

CircleChevronUpIcon.displayName = "CircleChevronUpIcon";

export { CircleChevronUpIcon };
```

### `components/ui/icons/circle-dashed.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CircleDashedIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CircleDashedIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { opacity: 1 },
	animate: (i: number) => ({
		opacity: [0, 1],
		transition: { delay: i * 0.1, duration: 0.3 },
	}),
};

const CircleDashedIcon = forwardRef<
	CircleDashedIconHandle,
	CircleDashedIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				{[
					"M10.1 2.182a10 10 0 0 1 3.8 0",
					"M13.9 21.818a10 10 0 0 1-3.8 0",
					"M17.609 3.721a10 10 0 0 1 2.69 2.7",
					"M2.182 13.9a10 10 0 0 1 0-3.8",
					"M20.279 17.609a10 10 0 0 1-2.7 2.69",
					"M21.818 10.1a10 10 0 0 1 0 3.8",
					"M3.721 6.391a10 10 0 0 1 2.7-2.69",
					"M6.391 20.279a10 10 0 0 1-2.69-2.7",
				].map((d, index) => (
					<motion.path
						key={d}
						d={d}
						animate={controls}
						variants={pathVariants}
						custom={index + 1}
					/>
				))}
			</svg>
		</div>
	);
});

CircleDashedIcon.displayName = "CircleDashedIcon";

export { CircleDashedIcon };
```

### `components/ui/icons/circle-dollar-sign.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CircleDollarSignIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CircleDollarSignIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const dollarMainVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			duration: 0.6,
			opacity: { duration: 0.1 },
		},
	},
};

const dollarSecondaryVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			delay: 0.3,
			duration: 0.3,
			opacity: { duration: 0.1, delay: 0.3 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			delay: 0.5,
			duration: 0.4,
			opacity: { duration: 0.1, delay: 0.5 },
		},
	},
};

const CircleDollarSignIcon = forwardRef<
	CircleDollarSignIconHandle,
	CircleDollarSignIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="12" r="10" />
				<motion.path
					d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"
					initial="normal"
					animate={controls}
					variants={dollarMainVariants}
				/>
				<motion.path
					d="M12 18V6"
					initial="normal"
					animate={controls}
					variants={dollarSecondaryVariants}
				/>
			</svg>
		</div>
	);
});

CircleDollarSignIcon.displayName = "CircleDollarSignIcon";

export { CircleDollarSignIcon };
```

### `components/ui/icons/circle-help.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CircleHelpIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CircleHelpIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: { rotate: 0 },
	animate: { rotate: [0, -10, 10, -10, 0] },
};

const CircleHelpIcon = forwardRef<CircleHelpIconHandle, CircleHelpIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<motion.g
						variants={variants}
						transition={{
							duration: 0.5,
							ease: "easeInOut",
						}}
						animate={controls}
					>
						<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
						<path d="M12 17h.01" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

CircleHelpIcon.displayName = "CircleHelpIcon";

export { CircleHelpIcon };
```

### `components/ui/icons/clap.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ClapIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ClapIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: {
		rotate: 0,
		originX: "4px",
		originY: "20px",
	},
	animate: {
		rotate: [-10, -10, 0],
		transition: {
			duration: 0.8,
			times: [0, 0.5, 1],
			ease: "easeInOut",
		},
	},
};

const clapVariants: Variants = {
	normal: {
		rotate: 0,
		originX: "3px",
		originY: "11px",
	},
	animate: {
		rotate: [0, -10, 16, 0],
		transition: {
			duration: 0.4,
			times: [0, 0.3, 0.6, 1],
			ease: "easeInOut",
		},
	},
};

const ClapIcon = forwardRef<ClapIconHandle, ClapIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					style={{ overflow: "visible" }}
				>
					<motion.g animate={controls} variants={variants}>
						<motion.g animate={controls} variants={clapVariants}>
							<path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
							<path d="m6.2 5.3 3.1 3.9" />
							<path d="m12.4 3.4 3.1 4" />
						</motion.g>
						<path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

ClapIcon.displayName = "ClapIcon";

export { ClapIcon };
```

### `components/ui/icons/clipboard-check.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";

export interface ClipboardCheckIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ClipboardCheckIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const checkVariants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 0,
		transition: {
			duration: 0.3,
		},
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			pathLength: { duration: 0.4, ease: "easeInOut" },
			opacity: { duration: 0.4, ease: "easeInOut" },
		},
	},
};

const ClipboardCheckIcon = forwardRef<
	ClipboardCheckIconHandle,
	ClipboardCheckIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="text-foreground hover:text-foreground transition-colors duration-200"
			>
				<rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
				<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
				<motion.path
					animate={controls}
					initial="normal"
					variants={checkVariants}
					d="m9 14 2 2 4-4"
					style={{ transformOrigin: "center" }}
				/>
			</svg>
		</div>
	);
});

ClipboardCheckIcon.displayName = "ClipboardCheckIcon";

export { ClipboardCheckIcon };
```

### `components/ui/icons/clock.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ClockIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ClockIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const handTransition: Transition = {
	duration: 0.6,
	ease: [0.4, 0, 0.2, 1],
};

const handVariants: Variants = {
	normal: {
		rotate: 0,
		originX: "50%",
		originY: "50%",
	},
	animate: {
		rotate: 360,
	},
};

const minuteHandTransition: Transition = {
	duration: 0.5,
	ease: "easeInOut",
};

const minuteHandVariants: Variants = {
	normal: {
		rotate: 0,
		originX: "50%",
		originY: "50%",
	},
	animate: {
		rotate: 45,
	},
};

const ClockIcon = forwardRef<ClockIconHandle, ClockIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<motion.line
						x1="12"
						y1="12"
						x2="12"
						y2="6"
						variants={handVariants}
						animate={controls}
						initial="normal"
						transition={handTransition}
					/>
					<motion.line
						x1="12"
						y1="12"
						x2="16"
						y2="12"
						variants={minuteHandVariants}
						animate={controls}
						initial="normal"
						transition={minuteHandTransition}
					/>
				</svg>
			</div>
		);
	}
);

ClockIcon.displayName = "ClockIcon";

export { ClockIcon };
```

### `components/ui/icons/cloud-rain-wind.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CloudRainWindIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CloudRainWindIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const windVariants: Variants = {
	animate: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const windChildVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: {
		opacity: [1, 0.2, 1],
		transition: {
			duration: 1,
			repeat: Infinity,
			ease: "easeInOut",
		},
	},
};

const CloudRainWindIcon = forwardRef<
	CloudRainWindIconHandle,
	CloudRainWindIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 24, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				{/* Cloud - static */}
				<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
				{/* Wind lines - opacity animation */}
				<motion.g
					variants={windVariants}
					animate={controls}
					initial="normal"
				>
					<motion.path variants={windChildVariants} d="m9.2 22 3-7" />
					<motion.path variants={windChildVariants} d="m9 13-3 7" />
					<motion.path variants={windChildVariants} d="m17 13-3 7" />
				</motion.g>
			</svg>
		</div>
	);
});

CloudRainWindIcon.displayName = "CloudRainWindIcon";

export { CloudRainWindIcon };
```

### `components/ui/icons/cloud-rain.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CloudRainIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CloudRainIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const rainVariants: Variants = {
	animate: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const rainChildVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: {
		opacity: [1, 0.2, 1],
		transition: {
			duration: 1,
			repeat: Infinity,
			ease: "easeInOut",
		},
	},
};

const CloudRainIcon = forwardRef<CloudRainIconHandle, CloudRainIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 24, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					{/* Cloud - static */}
					<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
					{/* Rain lines - opacity animation */}
					<motion.g
						variants={rainVariants}
						animate={controls}
						initial="normal"
					>
						<motion.path variants={rainChildVariants} d="M16 14v6" />
						<motion.path variants={rainChildVariants} d="M8 14v6" />
						<motion.path variants={rainChildVariants} d="M12 16v6" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

CloudRainIcon.displayName = "CloudRainIcon";

export { CloudRainIcon };
```

### `components/ui/icons/cloud-sun.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CloudSunIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CloudSunIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const cloudVariants: Variants = {
	normal: {
		x: 0,
		y: 0,
	},
	animate: {
		x: [-1, 1, -1, 1, 0],
		y: [-1, 1, -1, 1, 0],
		transition: {
			duration: 1,
			ease: "easeInOut",
		},
	},
};

const sunVariants: Variants = {
	normal: { opacity: 1 },
	animate: (i: number) => ({
		opacity: [0, 1],
		transition: { delay: i * 0.1, duration: 0.3 },
	}),
};

const CloudSunIcon = forwardRef<CloudSunIconHandle, CloudSunIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const cloudControls = useAnimation();
		const sunControls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => {
					cloudControls.start("animate");
					sunControls.start("animate");
				},
				stopAnimation: () => {
					cloudControls.start("normal");
					sunControls.start("normal");
				},
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					cloudControls.start("animate");
					sunControls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[cloudControls, sunControls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					cloudControls.start("normal");
					sunControls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[cloudControls, sunControls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					style={{ overflow: "visible" }}
				>
					<motion.g
						variants={cloudVariants}
						animate={cloudControls}
						initial="normal"
					>
						<path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
					</motion.g>
					{[
						"M12 2v2",
						"m4.93 4.93 1.41 1.41",
						"M20 12h2",
						"m19.07 4.93-1.41 1.41",
						"M15.947 12.65a4 4 0 0 0-5.925-4.128",
					].map((d, index) => (
						<motion.path
							key={d}
							d={d}
							animate={sunControls}
							variants={sunVariants}
							custom={index + 1}
							initial="normal"
						/>
					))}
				</svg>
			</div>
		);
	}
);

CloudSunIcon.displayName = "CloudSunIcon";

export { CloudSunIcon };
```

### `components/ui/icons/coffee.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CoffeeIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CoffeeIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		y: 0,
		opacity: 1,
	},
	animate: (custom: number) => ({
		y: -3,
		opacity: [0, 1, 0],
		transition: {
			repeat: Infinity,
			duration: 1.5,
			ease: "easeInOut",
			delay: 0.2 * custom,
		},
	}),
};

const CoffeeIcon = forwardRef<CoffeeIconHandle, CoffeeIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					style={{ overflow: "visible" }}
				>
					<motion.path
						d="M10 2v2"
						animate={controls}
						variants={pathVariants}
						custom={0.2}
					/>
					<motion.path
						d="M14 2v2"
						animate={controls}
						variants={pathVariants}
						custom={0.4}
					/>
					<motion.path
						d="M6 2v2"
						animate={controls}
						variants={pathVariants}
						custom={0}
					/>
					<path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
				</svg>
			</div>
		);
	}
);

CoffeeIcon.displayName = "CoffeeIcon";

export { CoffeeIcon };
```

### `components/ui/icons/cog.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface CogIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CogIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const CogIcon = forwardRef<CogIconHandle, CogIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					transition={{ type: "spring", stiffness: 50, damping: 10 }}
					variants={{
						normal: {
							rotate: 0,
						},
						animate: {
							rotate: 180,
						},
					}}
					animate={controls}
				>
					<path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
					<path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
					<path d="M12 2v2" />
					<path d="M12 22v-2" />
					<path d="m17 20.66-1-1.73" />
					<path d="M11 10.27 7 3.34" />
					<path d="m20.66 17-1.73-1" />
					<path d="m3.34 7 1.73 1" />
					<path d="M14 12h8" />
					<path d="M2 12h2" />
					<path d="m20.66 7-1.73 1" />
					<path d="m3.34 17 1.73-1" />
					<path d="m17 3.34-1 1.73" />
					<path d="m11 13.73-4 6.93" />
				</motion.svg>
			</div>
		);
	}
);

CogIcon.displayName = "CogIcon";

export { CogIcon };
```

### `components/ui/icons/compass.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface CompassIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CompassIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const CompassIcon = forwardRef<CompassIconHandle, CompassIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<motion.polygon
						points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
						variants={{
							normal: {
								rotate: 0,
							},
							animate: {
								rotate: 360,
							},
						}}
						transition={{
							type: "spring",
							stiffness: 120,
							damping: 15,
						}}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

CompassIcon.displayName = "CompassIcon";

export { CompassIcon };
```

### `components/ui/icons/component.tsx`

```tsx
"use client";

import { useMemo, useRef } from "react";

import { Input } from "@/components/ui/input";
import { ICON_LIST } from "./index";
import Fuse from "fuse.js";
import { parseAsString, useQueryState } from "nuqs";

import { Card, CardTitle } from "@/components/ui/card";

const useSearch = (items: Icon[]) => {
	const [query] = useQueryState("q");

	const fuse = useMemo(
		() =>
			new Fuse(items, {
				keys: [
					{ name: "name", weight: 3 },
					{ name: "keywords", weight: 2 },
				],
				threshold: 0.3,
				ignoreLocation: true,
				findAllMatches: true,
				isCaseSensitive: false,
				minMatchCharLength: 2,
			}),
		[items]
	);

	const results = useMemo(() => {
		if (!query) return items;
		return fuse.search(query).map((result) => result.item);
	}, [fuse, query, items]);

	return { results };
};

type Icon = {
	name: string;
	content: string;
	keywords: string[];
};

export type { Icon };

type CountProps = {
	count: number;
};

const ListSearch = ({ count }: CountProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [search, setSearch] = useQueryState(
		"q",
		parseAsString.withDefault("")
	);

	const debouncedSetSearch = (value: string) => setSearch(value);

	return (
		<div className="relative">
			<Input
				ref={inputRef}
				placeholder={`Search ${count} icons...`}
				defaultValue={search ?? ""}
				onChange={(e) => debouncedSetSearch(e.target.value)}
			/>
			<kbd className="pointer-events-none absolute right-2 top-1/2 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 -translate-y-1/2">
				<span className="text-xs">⌘</span>K
			</kbd>
		</div>
	);
};

export { ListSearch };

type Props = {
	icons: Icon[];
};

const IconsList = () => {
	const icons = ICON_LIST.map((icon) => ({ ...icon, content: icon.icon }));
	const { results } = useSearch(icons);

	return (
		<div className="flex flex-col sm:mb-20 mb-10 mt-8 gap-6">
			<ListSearch count={icons?.length} />
			{results.length === 0 && <div>nothing here</div>}
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-[repeat(auto-fill,minmax(165px,1fr))] gap-3">
				{results.map((icon) => {
					const IconComponent = ICON_LIST.find(
						({ name }) => name === icon.name
					)!.icon;

					return (
						<Card key={icon.name}>
							<IconComponent />
							<CardTitle>{icon.name}</CardTitle>
						</Card>
					);
				})}
			</div>
		</div>
	);
};

export default IconsList;
```

### `components/ui/icons/connect.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ConnectIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ConnectIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const plugVariants: Variants = {
	normal: {
		x: 0,
		y: 0,
	},
	animate: {
		x: -3,
		y: 3,
	},
};

const socketVariants: Variants = {
	normal: {
		x: 0,
		y: 0,
	},
	animate: {
		x: 3,
		y: -3,
	},
};

const pathVariants = {
	normal: (custom: { x: number; y: number }) => ({
		d: `M${custom.x} ${custom.y} l2.5 -2.5`,
	}),
	animate: (custom: { x: number; y: number }) => ({
		d: `M${custom.x + 2.93} ${custom.y - 2.93} l0.10 -0.10`,
	}),
};

const ConnectIcon = forwardRef<ConnectIconHandle, ConnectIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M19 5l3 -3"
						variants={{
							normal: {
								d: "M19 5l3 -3",
							},
							animate: {
								d: "M17 7l5 -5",
							},
						}}
						animate={controls}
						transition={{ type: "spring", stiffness: 500, damping: 30 }}
					/>
					<motion.path
						d="m2 22 3-3"
						variants={{
							normal: {
								d: "m2 22 3-3",
							},
							animate: {
								d: "m2 22 6-6",
							},
						}}
						animate={controls}
						transition={{ type: "spring", stiffness: 500, damping: 30 }}
					/>
					<motion.path
						d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"
						variants={socketVariants}
						animate={controls}
						transition={{ type: "spring", stiffness: 500, damping: 30 }}
					/>
					<motion.path
						variants={pathVariants}
						custom={{ x: 7.5, y: 13.5 }}
						initial="normal"
						animate={controls}
						transition={{ type: "spring", stiffness: 500, damping: 30 }}
					/>
					<motion.path
						variants={pathVariants}
						custom={{ x: 10.5, y: 16.5 }}
						initial="normal"
						animate={controls}
						transition={{ type: "spring", stiffness: 500, damping: 30 }}
					/>
					<motion.path
						d="m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z"
						variants={plugVariants}
						animate={controls}
						transition={{ type: "spring", stiffness: 500, damping: 30 }}
					/>
				</svg>
			</div>
		);
	}
);

ConnectIcon.displayName = "ConnectIcon";

export { ConnectIcon };
```

### `components/ui/icons/copy.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CopyIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CopyIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	type: "spring",
	stiffness: 160,
	damping: 17,
	mass: 1,
};

const CopyIcon = forwardRef<CopyIconHandle, CopyIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.rect
						width="14"
						height="14"
						x="8"
						y="8"
						rx="2"
						ry="2"
						variants={{
							normal: { translateY: 0, translateX: 0 },
							animate: { translateY: -3, translateX: -3 },
						}}
						animate={controls}
						transition={defaultTransition}
					/>
					<motion.path
						d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
						variants={{
							normal: { x: 0, y: 0 },
							animate: { x: 3, y: 3 },
						}}
						transition={defaultTransition}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

CopyIcon.displayName = "CopyIcon";

export { CopyIcon };
```

### `components/ui/icons/cpu.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CpuIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CpuIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const transition: Transition = {
	duration: 0.5,
	ease: "easeInOut",
	repeat: 1,
};

const yVariants: Variants = {
	normal: {
		scale: 1,
		rotate: 0,
		opacity: 1,
	},
	animate: {
		scaleY: [1, 1.5, 1],
		opacity: [1, 0.8, 1],
	},
};
const xVariants: Variants = {
	normal: {
		scale: 1,
		rotate: 0,
		opacity: 1,
	},
	animate: {
		scaleX: [1, 1.5, 1],
		opacity: [1, 0.8, 1],
	},
};

const CpuIcon = forwardRef<CpuIconHandle, CpuIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<rect width="16" height="16" x="4" y="4" rx="2" />
					<rect width="6" height="6" x="9" rx="1" y="9" />
					<motion.path
						d="M15 2v2"
						variants={yVariants}
						transition={transition}
						animate={controls}
					/>
					<motion.path
						d="M15 20v2"
						variants={yVariants}
						transition={transition}
						animate={controls}
					/>
					<motion.path
						d="M2 15h2"
						variants={xVariants}
						transition={transition}
						animate={controls}
					/>
					<motion.path
						d="M2 9h2"
						variants={xVariants}
						transition={transition}
						animate={controls}
					/>
					<motion.path
						d="M20 15h2"
						variants={xVariants}
						transition={transition}
						animate={controls}
					/>
					<motion.path
						d="M20 9h2"
						variants={xVariants}
						transition={transition}
						animate={controls}
					/>
					<motion.path
						d="M9 2v2"
						variants={yVariants}
						transition={transition}
						animate={controls}
					/>
					<motion.path
						d="M9 20v2"
						variants={yVariants}
						transition={transition}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

CpuIcon.displayName = "CpuIcon";

export { CpuIcon };
```

### `components/ui/icons/cursor-click.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CursorClickIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CursorClickIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const cursorVariants: Variants = {
	initial: { x: 0, y: 0 },
	hover: {
		x: [0, 0, -3, 0],
		y: [0, -4, 0, 0],
		transition: {
			duration: 1,
			bounce: 0.3,
		},
	},
};

const lineVariants: Variants = {
	initial: { opacity: 1, x: 0, y: 0 },
	spread: (custom: { x: number; y: number }) => ({
		opacity: [0, 1, 0, 0, 0, 0, 1],
		x: [0, custom.x, 0, 0],
		y: [0, custom.y, 0, 0],
		transition: {
			type: "spring",
			stiffness: 70,
			damping: 10,
			mass: 0.4,
		},
	}),
};

const CursorClickIcon = forwardRef<CursorClickIconHandle, CursorClickIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const clickControls = useAnimation();
		const cursorControls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => {
					cursorControls.start("hover");
					clickControls.start("spread", { delay: 1.3 });
				},
				stopAnimation: () => {
					cursorControls.start("initial");
					clickControls.start("initial");
				},
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					cursorControls.start("hover");
					clickControls.start("spread", { delay: 1.3 });
				} else {
					onMouseEnter?.(e);
				}
			},
			[clickControls, cursorControls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					cursorControls.start("initial");
					clickControls.start("initial");
				} else {
					onMouseLeave?.(e);
				}
			},
			[cursorControls, clickControls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"
						variants={cursorVariants}
						animate={cursorControls}
					/>
					<motion.path
						d="M14 4.1 12 6"
						variants={lineVariants}
						animate={clickControls}
						custom={{ x: 1, y: -1 }}
					/>
					<motion.path
						d="m5.1 8-2.9-.8"
						variants={lineVariants}
						animate={clickControls}
						custom={{ x: -1, y: 0 }}
					/>
					<motion.path
						d="m6 12-1.9 2"
						variants={lineVariants}
						animate={clickControls}
						custom={{ x: -1, y: 1 }}
					/>
					<motion.path
						d="M7.2 2.2 8 5.1"
						variants={lineVariants}
						animate={clickControls}
						custom={{ x: 0, y: -1 }}
					/>
				</svg>
			</div>
		);
	}
);

CursorClickIcon.displayName = "CursorClickIcon";

export { CursorClickIcon };
```

### `components/ui/icons/delete.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface DeleteIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface DeleteIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const lidVariants: Variants = {
	normal: { y: 0 },
	animate: { y: -1.1 },
};

const springTransition = {
	type: "spring",
	stiffness: 500,
	damping: 30,
};

const DeleteIcon = forwardRef<DeleteIconHandle, DeleteIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.g
						variants={lidVariants}
						animate={controls}
						transition={springTransition}
					>
						<path d="M3 6h18" />
						<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
					</motion.g>
					<motion.path
						d="M19 8v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V8"
						variants={{
							normal: { d: "M19 8v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V8" },
							animate: { d: "M19 9v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V9" },
						}}
						animate={controls}
						transition={springTransition}
					/>
					<motion.line
						x1="10"
						x2="10"
						y1="11"
						y2="17"
						variants={{
							normal: { y1: 11, y2: 17 },
							animate: { y1: 11.5, y2: 17.5 },
						}}
						animate={controls}
						transition={springTransition}
					/>
					<motion.line
						x1="14"
						x2="14"
						y1="11"
						y2="17"
						variants={{
							normal: { y1: 11, y2: 17 },
							animate: { y1: 11.5, y2: 17.5 },
						}}
						animate={controls}
						transition={springTransition}
					/>
				</svg>
			</div>
		);
	}
);

DeleteIcon.displayName = "DeleteIcon";

export { DeleteIcon };
```

### `components/ui/icons/discord.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface DiscordIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface DiscordIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: {
		translateX: 0,
		opacity: 1,
		transition: {
			duration: 0.2,
		},
	},
	animate: {
		translateX: [0, -2, 2, -2, 2, 0],
		opacity: 1,
		transition: {
			duration: 0.4,
			times: [0, 0.2, 0.4, 0.6, 0.8, 1],
			ease: "easeInOut",
		},
	},
};

const DiscordIcon = forwardRef<DiscordIconHandle, DiscordIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 44 44"
					fill="none"
					stroke="currentColor"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
					style={{ overflow: "visible" }}
				>
					<motion.path
						variants={variants}
						animate={controls}
						initial="normal"
						d="M17.54,34.22A47.42,47.42,0,0,1,14.68,38C7.3,37.79,4.5,33,4.5,33A44.83,44.83,0,0,1,9.31,13.48,16.47,16.47,0,0,1,18.69,10l1,2.31"
					/>
					<motion.path
						variants={variants}
						animate={controls}
						initial="normal"
						d="M17.85,22.67a3.48,3.48,0,0,0-3.37,3.9,3.38,3.38,0,0,0,3.31,3.22,3.53,3.53,0,0,0,3.43-3.9A3.45,3.45,0,0,0,17.85,22.67Z"
					/>
					<motion.path
						variants={variants}
						animate={controls}
						initial="normal"
						d="M12.2,14.37a28.19,28.19,0,0,1,8.16-2.18A23.26,23.26,0,0,1,24,12a23.26,23.26,0,0,1,3.64.21,28.19,28.19,0,0,1,8.16,2.18m-7.47-2.09l1-2.31a16.47,16.47,0,0,1,9.38,3.51A44.83,44.83,0,0,1,43.5,33S40.7,37.79,33.32,38a47.42,47.42,0,0,1-2.86-3.81"
					/>
					<motion.path
						variants={variants}
						animate={controls}
						initial="normal"
						d="M36.92,31.29a29.63,29.63,0,0,1-8.64,3.49,21.25,21.25,0,0,1-4.28.4h0a21.25,21.25,0,0,1-4.28-.4,29.63,29.63,0,0,1-8.64-3.49"
					/>
					<motion.path
						variants={variants}
						animate={controls}
						initial="normal"
						d="M30.15,22.67a3.48,3.48,0,0,1,3.37,3.9,3.38,3.38,0,0,1-3.31,3.22,3.53,3.53,0,0,1-3.43-3.9A3.45,3.45,0,0,1,30.15,22.67Z"
					/>
				</svg>
			</div>
		);
	}
);

DiscordIcon.displayName = "DiscordIcon";

export { DiscordIcon };
```

### `components/ui/icons/download.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface DownloadIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface DownloadIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const arrowVariants: Variants = {
	normal: { y: 0 },
	animate: {
		y: 2,
		transition: {
			type: "spring",
			stiffness: 200,
			damping: 10,
			mass: 1,
		},
	},
};

const DownloadIcon = forwardRef<DownloadIconHandle, DownloadIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
					<motion.g variants={arrowVariants} animate={controls}>
						<polyline points="7 10 12 15 17 10" />
						<line x1="12" x2="12" y1="15" y2="3" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

DownloadIcon.displayName = "DownloadIcon";

export { DownloadIcon };
```

### `components/ui/icons/downvote.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface DownvoteIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface DownvoteIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const DownvoteIcon = forwardRef<DownvoteIconHandle, DownvoteIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={{
						normal: {
							translateX: "0px",
							translateY: "0px",
							rotate: "0deg",
						},
						animate: {
							translateX: "-1px",
							translateY: "2px",
							rotate: "-12deg",
						},
					}}
					animate={controls}
					transition={{ type: "spring", stiffness: 250, damping: 25 }}
				>
					<path d="M17 14V2" />
					<path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
				</motion.svg>
			</div>
		);
	}
);

DownvoteIcon.displayName = "DownvoteIcon";

export { DownvoteIcon };
```

### `components/ui/icons/dribbble.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";

export interface DribbbleIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface DribbbleIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const circleVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: "linear",
			opacity: { duration: 0.1 },
		},
	},
};

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: "linear",
			opacity: { duration: 0.1 },
		},
	},
};

const DribbbleIcon = forwardRef<DribbbleIconHandle, DribbbleIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const circleControls = useAnimation();
		const path1Controls = useAnimation();
		const path2Controls = useAnimation();
		const path3Controls = useAnimation();

		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => {
					circleControls.start("animate");
					path1Controls.start("animate");
					path2Controls.start("animate");
					path3Controls.start("animate");
				},
				stopAnimation: () => {
					circleControls.start("normal");
					path1Controls.start("normal");
					path2Controls.start("normal");
					path3Controls.start("normal");
				},
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					circleControls.start("animate");
					path1Controls.start("animate");
					path2Controls.start("animate");
					path3Controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[
				circleControls,
				onMouseEnter,
				path1Controls,
				path2Controls,
				path3Controls,
			]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					circleControls.start("normal");
					path1Controls.start("normal");
					path2Controls.start("normal");
					path3Controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[
				circleControls,
				path1Controls,
				path2Controls,
				path3Controls,
				onMouseLeave,
			]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.circle
						variants={circleVariants}
						initial="normal"
						animate={circleControls}
						cx="12"
						cy="12"
						r="10"
					/>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={path1Controls}
						d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"
					/>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={path2Controls}
						d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"
					/>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={path3Controls}
						d="M8.56 2.75c4.37 6 6 9.42 8 17.72"
					/>
				</svg>
			</div>
		);
	}
);

DribbbleIcon.displayName = "DribbbleIcon";

export { DribbbleIcon };
```

### `components/ui/icons/drum.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface DrumIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface DrumIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: {
		rotate: 0,
	},
	animate: (custom: number) => ({
		rotate: custom === 1 ? [-10, 10, 0] : [10, -10, 0],
		transition: {
			delay: 0.1 * custom,
			repeat: Infinity,
			repeatType: "reverse",
			duration: 0.5,
		},
	}),
};

const DrumIcon = forwardRef<DrumIconHandle, DrumIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="m2 2 8 8"
						variants={variants}
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="m22 2-8 8"
						variants={variants}
						animate={controls}
						custom={2}
					/>
					<ellipse cx="12" cy="9" rx="10" ry="5" />
					<path d="M7 13.4v7.9" />
					<path d="M12 14v8" />
					<path d="M17 13.4v7.9" />
					<path d="M2 9v8a10 5 0 0 0 20 0V9" />
				</svg>
			</div>
		);
	}
);

DrumIcon.displayName = "DrumIcon";

export { DrumIcon };
```

### `components/ui/icons/earth.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface EarthIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface EarthIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const circleTransition: Transition = {
	duration: 0.3,
	delay: 0.1,
	opacity: { delay: 0.15 },
};

const circleVariants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
	},
};

const EarthIcon = forwardRef<EarthIconHandle, EarthIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						animate={controls}
						d="M21.54 15H17a2 2 0 0 0-2 2v4.54"
						transition={{
							duration: 0.7,
							delay: 0.5,
							opacity: { delay: 0.5 },
						}}
						variants={{
							normal: {
								pathLength: 1,
								opacity: 1,
								pathOffset: 0,
							},
							animate: {
								pathLength: [0, 1],
								opacity: [0, 1],
								pathOffset: [1, 0],
							},
						}}
					/>
					<motion.path
						animate={controls}
						d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"
						transition={{
							duration: 0.7,
							delay: 0.5,
							opacity: { delay: 0.5 },
						}}
						variants={{
							normal: {
								pathLength: 1,
								opacity: 1,
								pathOffset: 0,
							},
							animate: {
								pathLength: [0, 1],
								opacity: [0, 1],
								pathOffset: [1, 0],
							},
						}}
					/>
					<motion.path
						animate={controls}
						d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"
						transition={{
							duration: 0.7,
							delay: 0.5,
							opacity: { delay: 0.5 },
						}}
						variants={{
							normal: {
								pathLength: 1,
								opacity: 1,
								pathOffset: 0,
							},
							animate: {
								pathLength: [0, 1],
								opacity: [0, 1],
								pathOffset: [1, 0],
							},
						}}
					/>
					<motion.circle
						cx="12"
						cy="12"
						r="10"
						transition={circleTransition}
						variants={circleVariants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

EarthIcon.displayName = "EarthIcon";

export { EarthIcon };
```

### `components/ui/icons/expand.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ExpandIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ExpandIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	type: "spring",
	stiffness: 250,
	damping: 25,
};

const ExpandIcon = forwardRef<ExpandIconHandle, ExpandIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"
						transition={defaultTransition}
						variants={{
							normal: { translateX: "0%", translateY: "0%" },
							animate: { translateX: "2px", translateY: "2px" },
						}}
						animate={controls}
					/>
					<motion.path
						d="M3 16.2V21m0 0h4.8M3 21l6-6"
						transition={defaultTransition}
						variants={{
							normal: { translateX: "0%", translateY: "0%" },
							animate: { translateX: "-2px", translateY: "2px" },
						}}
						animate={controls}
					/>
					<motion.path
						d="M21 7.8V3m0 0h-4.8M21 3l-6 6"
						transition={defaultTransition}
						variants={{
							normal: { translateX: "0%", translateY: "0%" },
							animate: { translateX: "2px", translateY: "-2px" },
						}}
						animate={controls}
					/>
					<motion.path
						d="M3 7.8V3m0 0h4.8M3 3l6 6"
						transition={defaultTransition}
						variants={{
							normal: { translateX: "0%", translateY: "0%" },
							animate: { translateX: "-2px", translateY: "-2px" },
						}}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

ExpandIcon.displayName = "ExpandIcon";

export { ExpandIcon };
```

### `components/ui/icons/eye-off.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface EyeOffIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface EyeOffIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
	animate: {
		pathLength: [0, 2],
		opacity: [0, 1],
		pathOffset: [0, 2],
		transition: { duration: 0.6 },
	},
};

const EyeOffIcon = forwardRef<EyeOffIconHandle, EyeOffIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
					<path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
					<path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
					<motion.path
						variants={pathVariants}
						d="m2 2 20 20"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

EyeOffIcon.displayName = "EyeOffIcon";

export { EyeOffIcon };
```

### `components/ui/icons/facebook.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface FacebookIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface FacebookIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const facebookVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: "linear",
			opacity: { duration: 0.1 },
		},
	},
};

const FacebookIcon = forwardRef<FacebookIconHandle, FacebookIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						variants={facebookVariants}
						animate={controls}
						initial="normal"
						d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
					/>
				</svg>
			</div>
		);
	}
);

FacebookIcon.displayName = "FacebookIcon";

export { FacebookIcon };
```

### `components/ui/icons/figma.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface FigmaIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface FigmaIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			delay: 0.3,
			duration: 0.5,
			opacity: { delay: 0.25 },
		},
	},
};

const FigmaIcon = forwardRef<FigmaIconHandle, FigmaIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.g
						style={{ transformOrigin: "50% 50%" }}
						variants={{
							normal: {
								rotateY: 0,
								transition: {
									duration: 0.5,
									ease: "linear",
								},
							},
							animate: {
								rotateY: 360,
								transition: {
									duration: 0.8,
									ease: "linear",
								},
							},
						}}
						animate={controls}
					>
						<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
						<path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
					</motion.g>
					<motion.path
						d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"
						variants={variants}
						animate={controls}
					/>
					<motion.path
						d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"
						variants={variants}
						animate={controls}
					/>
					<motion.path
						d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"
						variants={variants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

FigmaIcon.displayName = "FigmaIcon";

export { FigmaIcon };
```

### `components/ui/icons/file-chart-line.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface FileChartLineIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface FileChartLineIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			delay: 0.15,
			duration: 0.3,
			opacity: { delay: 0.1 },
		},
	},
};

const FileChartLineIcon = forwardRef<
	FileChartLineIconHandle,
	FileChartLineIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
				<path d="M14 2v4a2 2 0 0 0 2 2h4" />
				<motion.path
					d="m8 17 2.5-2.5 2 2L16 13"
					variants={variants}
					animate={controls}
				/>
			</svg>
		</div>
	);
});

FileChartLineIcon.displayName = "FileChartLineIcon";

export { FileChartLineIcon };
```

### `components/ui/icons/file-check-2.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";

export interface FileCheck2IconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface FileCheck2IconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const checkVariants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
		transition: {
			duration: 0.3,
		},
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			pathLength: { duration: 0.4, ease: "easeInOut" },
			opacity: { duration: 0.4, ease: "easeInOut" },
		},
	},
};

const FileCheck2Icon = forwardRef<FileCheck2IconHandle, FileCheck2IconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M14 2v4a2 2 0 0 0 2 2h4" />
					<path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
					<motion.path
						animate={controls}
						initial="normal"
						variants={checkVariants}
						d="m3 15 2 2 4-4"
						style={{ transformOrigin: "center" }}
					/>
				</svg>
			</div>
		);
	}
);

FileCheck2Icon.displayName = "FileCheck2Icon";

export { FileCheck2Icon };
```

### `components/ui/icons/file-check.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";

export interface FileCheckIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface FileCheckIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const checkVariants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
		transition: {
			duration: 0.3,
		},
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			pathLength: { duration: 0.4, ease: "easeInOut" },
			opacity: { duration: 0.4, ease: "easeInOut" },
		},
	},
};

const FileCheckIcon = forwardRef<FileCheckIconHandle, FileCheckIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
					<path d="M14 2v4a2 2 0 0 0 2 2h4" />
					<motion.path
						animate={controls}
						initial="normal"
						variants={checkVariants}
						d="m9 15 2 2 4-4"
						style={{ transformOrigin: "center" }}
					/>
				</svg>
			</div>
		);
	}
);

FileCheckIcon.displayName = "FileCheckIcon";

export { FileCheckIcon };
```

### `components/ui/icons/file-cog.tsx`

```tsx
'use client';

import type { Variants } from 'framer-motion';
import { motion, useAnimation } from 'framer-motion';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

export interface FileCogIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

const gVariants: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: 180 },
};

const FileCogIcon = forwardRef<
  FileCogIconHandle,
  HTMLAttributes<HTMLDivElement>
>(({ onMouseEnter, onMouseLeave, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;
    return {
      startAnimation: () => controls.start('animate'),
      stopAnimation: () => controls.start('normal'),
    };
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        controls.start('animate');
      } else {
        onMouseEnter?.(e);
      }
    },
    [controls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        controls.start('normal');
      } else {
        onMouseLeave?.(e);
      }
    },
    [controls, onMouseLeave]
  );

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M4.677 21.5a2 2 0 0 0 1.313.5H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v2.5" />
        <motion.g
          transition={{ type: 'spring', stiffness: 50, damping: 10 }}
          variants={gVariants}
          animate={controls}
        >
          <path d="m3.2 12.9-.9-.4" />
          <path d="m3.2 15.1-.9.4" />
          <path d="m4.9 11.2-.4-.9" />
          <path d="m4.9 16.8-.4.9" />
          <path d="m7.5 10.3-.4.9" />
          <path d="m7.5 17.7-.4-.9" />
          <path d="m9.7 12.5-.9.4" />
          <path d="m9.7 15.5-.9-.4" />
          <circle cx="6" cy="14" r="3" />
        </motion.g>
      </svg>
    </div>
  );
});

FileCogIcon.displayName = 'FileCogIcon';

export { FileCogIcon };
```

### `components/ui/icons/file-pen-line.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface FilePenLineIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface FilePenLineIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const penVariants: Variants = {
	normal: {
		rotate: 0,
		x: 0,
		y: 0,
	},
	animate: {
		rotate: [-0.3, 0.2, -0.4],
		x: [0, -0.5, 1, 0],
		y: [0, 1, -0.5, 0],
		transition: {
			duration: 0.5,
			repeat: 1,
			ease: "easeInOut",
		},
	},
};

const FilePenLineIcon = forwardRef<FilePenLineIconHandle, FilePenLineIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
					<motion.path
						d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
						initial="normal"
						animate={controls}
						variants={penVariants}
					/>
					<motion.path
						d="M8 18h1"
						variants={{
							normal: { d: "M8 18h1" },
							animate: { d: "M8 18h5" },
						}}
						animate={controls}
						transition={{ duration: 0.5 }}
					/>
				</svg>
			</div>
		);
	}
);

FilePenLineIcon.displayName = "FilePenLineIcon";

export { FilePenLineIcon };
```

### `components/ui/icons/file-stack.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface FileStackIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface FileStackIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const FileStackIcon = forwardRef<FileStackIconHandle, FileStackIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M21 7h-3a2 2 0 0 1-2-2V2"
						variants={{
							normal: { translateX: 0, translateY: 0 },
							animate: { translateX: -4, translateY: 4 },
						}}
						animate={controls}
					/>
					<motion.path
						d="M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17Z"
						variants={{
							normal: { translateX: 0, translateY: 0 },
							animate: { translateX: -4, translateY: 4 },
						}}
						animate={controls}
					/>
					<path d="M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15" />
					<motion.path
						d="M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11"
						variants={{
							normal: { translateX: 0, translateY: 0 },
							animate: { translateX: 4, translateY: -4 },
						}}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

FileStackIcon.displayName = "FileStackIcon";

export { FileStackIcon };
```

### `components/ui/icons/file-text.tsx`

```tsx
"use client";

import React, {
	forwardRef,
	useCallback,
	useImperativeHandle,
	useRef,
} from "react";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface FileTextIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface FileTextIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const FileText = forwardRef<FileTextIconHandle, FileTextIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					initial="normal"
					animate={controls}
					variants={{
						normal: { scale: 1 },
						animate: {
							scale: 1.05,
							transition: {
								duration: 0.3,
								ease: "easeOut",
							},
						},
					}}
				>
					<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
					<path d="M14 2v4a2 2 0 0 0 2 2h4" />

					<motion.path
						d="M10 9H8"
						stroke="currentColor"
						strokeWidth="2"
						variants={{
							normal: {
								pathLength: 1,
								x1: 8,
								x2: 10,
							},
							animate: {
								pathLength: [1, 0, 1],
								x1: [8, 10, 8],
								x2: [10, 10, 10],
								transition: {
									duration: 0.7,
									delay: 0.3,
								},
							},
						}}
					/>
					<motion.path
						d="M16 13H8"
						stroke="currentColor"
						strokeWidth="2"
						variants={{
							normal: {
								pathLength: 1,
								x1: 8,
								x2: 16,
							},
							animate: {
								pathLength: [1, 0, 1],
								x1: [8, 16, 8],
								x2: [16, 16, 16],
								transition: {
									duration: 0.7,
									delay: 0.5,
								},
							},
						}}
					/>
					<motion.path
						d="M16 17H8"
						stroke="currentColor"
						strokeWidth="2"
						variants={{
							normal: {
								pathLength: 1,
								x1: 8,
								x2: 16,
							},
							animate: {
								pathLength: [1, 0, 1],
								x1: [8, 16, 8],
								x2: [16, 16, 16],
								transition: {
									duration: 0.7,
									delay: 0.7,
								},
							},
						}}
					/>
				</motion.svg>
			</div>
		);
	}
);

FileText.displayName = "FileTextIcon";

export { FileText as FileTextIcon };
```

### `components/ui/icons/fingerprint.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface FingerprintIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface FingerprintIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1 },
	animate: {
		opacity: [0, 0, 1, 1, 1],
		pathLength: [0.1, 0.3, 0.5, 0.7, 0.9, 1],
		transition: {
			opacity: { duration: 0.5 },
			pathLength: {
				duration: 2,
			},
		},
	},
};

const FingerprintIcon = forwardRef<FingerprintIconHandle, FingerprintIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path
						d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"
						strokeOpacity={0.4}
						strokeWidth="2"
						fill="none"
					/>
					<motion.path
						d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"
						variants={pathVariants}
						animate={controls}
					/>

					<path
						d="M14 13.12c0 2.38 0 6.38-1 8.88"
						strokeOpacity={0.4}
						strokeWidth="2"
						fill="none"
					/>
					<motion.path
						d="M14 13.12c0 2.38 0 6.38-1 8.88"
						variants={pathVariants}
						animate={controls}
					/>

					<path
						d="M17.29 21.02c.12-.6.43-2.3.5-3.02"
						strokeOpacity={0.4}
						strokeWidth="2"
						fill="none"
					/>
					<motion.path
						d="M17.29 21.02c.12-.6.43-2.3.5-3.02"
						variants={pathVariants}
						animate={controls}
					/>

					<path
						d="M2 12a10 10 0 0 1 18-6"
						strokeOpacity={0.4}
						strokeWidth="2"
						fill="none"
					/>
					<motion.path
						d="M2 12a10 10 0 0 1 18-6"
						variants={pathVariants}
						animate={controls}
					/>

					<path
						d="M2 16h.01"
						strokeOpacity={0.4}
						strokeWidth="2"
						fill="none"
					/>
					<motion.path
						d="M2 16h.01"
						variants={pathVariants}
						animate={controls}
					/>

					<path
						d="M21.8 16c.2-2 .131-5.354 0-6"
						strokeOpacity={0.4}
						strokeWidth="2"
						fill="none"
					/>
					<motion.path
						d="M21.8 16c.2-2 .131-5.354 0-6"
						variants={pathVariants}
						animate={controls}
					/>

					<path
						d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"
						strokeOpacity={0.4}
						strokeWidth="2"
						fill="none"
					/>
					<motion.path
						d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"
						variants={pathVariants}
						animate={controls}
					/>

					<path
						d="M8.65 22c.21-.66.45-1.32.57-2"
						strokeOpacity={0.4}
						strokeWidth="2"
						fill="none"
					/>
					<motion.path
						d="M8.65 22c.21-.66.45-1.32.57-2"
						variants={pathVariants}
						animate={controls}
					/>

					<path
						d="M9 6.8a6 6 0 0 1 9 5.2v2"
						strokeOpacity={0.4}
						strokeWidth="2"
						fill="none"
					/>
					<motion.path
						d="M9 6.8a6 6 0 0 1 9 5.2v2"
						variants={pathVariants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

FingerprintIcon.displayName = "FingerprintIcon";

export { FingerprintIcon };
```

### `components/ui/icons/fish-symbol.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface FishSymbolIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface FishSymbolIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			delay: 0.15,
			opacity: { delay: 0.1 },
		},
	},
};

const FishSymbolIcon = forwardRef<FishSymbolIconHandle, FishSymbolIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M2 16s9-15 20-4C11 23 2 8 2 8"
						variants={variants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

FishSymbolIcon.displayName = "FishSymbolIcon";

export { FishSymbolIcon };
```

### `components/ui/icons/flame.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface FlameIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface FlameIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
		pathOffset: 0,
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			delay: 0.1,
			duration: 0.4,
			opacity: { duration: 0.1, delay: 0.1 },
		},
	},
};

const FlameIcon = forwardRef<FlameIconHandle, FlameIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={controls}
						fill="none"
						d="M8.9 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
					/>
				</svg>
			</div>
		);
	}
);

FlameIcon.displayName = "FlameIcon";

export { FlameIcon };
```

### `components/ui/icons/flask.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface FlaskIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface FlaskIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const FlaskIcon = forwardRef<FlaskIconHandle, FlaskIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					fill="currentColor"
					viewBox="0 0 512 512"
					strokeWidth="5.632"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.g
						variants={{
							normal: { rotate: 0, translateY: 0 },
							animate: {
								translateY: -12,
								rotate: [0, 5, -5, 3, -3, 0],
								transition: {
									ease: "linear",
									rotate: { duration: 0.8 },
								},
							},
						}}
						animate={controls}
					>
						<circle cx="151.273" cy="407.273" r="11.636" />
						<circle cx="244.364" cy="372.364" r="11.636" />
						<circle cx="290.909" cy="418.909" r="11.636" />
						<circle cx="221.091" cy="453.818" r="11.636" />
						<circle cx="372.364" cy="430.545" r="11.636" />
					</motion.g>
					<motion.path
						d="M456.145,436.364l-79.127-124.509c0-2.327-2.327-4.655-3.491-5.818l-34.909-55.855c-8.146-13.964-12.8-29.091-12.8-44.218 V67.491c13.964-4.655,23.273-17.455,23.273-32.582C349.091,15.127,333.964,0,314.182,0H197.818 c-19.782,0-34.909,15.127-34.909,34.909c0,19.782,15.127,34.909,34.909,34.909h69.818c6.982,0,11.636-4.655,11.636-11.636 s-4.655-11.636-11.636-11.636h-69.818c-6.982,0-11.636-4.655-11.636-11.636c0-6.982,4.655-11.636,11.636-11.636h116.364 c6.982,0,11.636,4.655,11.636,11.636c0,6.982-4.655,11.636-11.636,11.636s-11.636,4.655-11.636,11.636v147.782 c0,19.782,5.818,39.564,16.291,55.855l19.782,31.418c-30.255-5.818-64-2.327-88.436,10.473 c-23.273,11.636-60.509,13.964-87.273,4.655l30.255-46.545c10.473-16.291,16.291-36.073,16.291-55.855V104.727 c0-6.982-4.655-11.636-11.636-11.636s-11.636,4.655-11.636,11.636v101.236c0,15.127-4.655,30.255-12.8,43.055l-34.909,55.855 c-1.164,1.164-2.327,2.327-3.491,3.491c0,1.164,0,1.164-1.164,2.327L55.855,436.364c-5.818,9.309-9.309,19.782-9.309,31.418v9.309 c0,19.782,15.127,34.909,34.909,34.909h349.091c19.782,0,34.909-15.127,34.909-34.909v-9.309 C465.455,456.145,461.964,445.673,456.145,436.364z M443.345,477.091h-1.164c0,6.982-4.655,11.636-11.636,11.636H81.455 c-6.982,0-11.636-4.655-11.636-11.636v-9.309c0-6.982,2.327-12.8,5.818-18.618l75.636-119.855 c15.127,5.818,32.582,8.145,50.036,8.145c22.109,0,43.055-4.655,60.509-12.8c25.6-12.8,68.655-13.964,96.582-1.164l79.127,125.673 c3.491,5.818,5.818,11.636,5.818,18.618V477.091z"
						variants={{
							normal: { rotate: 0, scale: 1 },
							animate: {
								scale: 0.9,
								rotate: [0, 6, -6, 3, -3, 0],
								transition: {
									duration: 0.8,
									scale: {
										duration: 0.3,
										type: "spring",
										bounce: 0.4,
										stiffness: 150,
										damping: 10,
									},
								},
							},
						}}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

FlaskIcon.displayName = "FlaskIcon";

export { FlaskIcon };
```

### `components/ui/icons/frame.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface FrameIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface FrameIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	type: "spring",
	stiffness: 160,
	damping: 17,
	mass: 1,
};

const FrameIcon = forwardRef<FrameIconHandle, FrameIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.line
						variants={{
							animate: { translateY: -4 },
							normal: {
								translateX: 0,
								rotate: 0,
								translateY: 0,
							},
						}}
						animate={controls}
						transition={defaultTransition}
						x1={22}
						x2={2}
						y1={6}
						y2={6}
					/>
					<motion.line
						variants={{
							animate: { translateY: 4 },
							normal: {
								translateX: 0,
								rotate: 0,
								translateY: 0,
							},
						}}
						animate={controls}
						transition={defaultTransition}
						x1={22}
						x2={2}
						y1={18}
						y2={18}
					/>
					<motion.line
						variants={{
							animate: { translateX: -4 },
							normal: {
								translateX: 0,
								rotate: 0,
								translateY: 0,
							},
						}}
						animate={controls}
						transition={defaultTransition}
						x1={6}
						x2={6}
						y1={2}
						y2={22}
					/>
					<motion.line
						variants={{
							animate: { translateX: 4 },
							normal: {
								translateX: 0,
								rotate: 0,
								translateY: 0,
							},
						}}
						animate={controls}
						transition={defaultTransition}
						x1={18}
						x2={18}
						y1={2}
						y2={22}
					/>
				</svg>
			</div>
		);
	}
);

FrameIcon.displayName = "FrameIcon";

export { FrameIcon };
```

### `components/ui/icons/frown.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface FrownIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface FrownIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const FrownIcon = forwardRef<FrownIconHandle, FrownIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("animate");
				onMouseEnter?.(e);
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("normal");
				onMouseLeave?.(e);
			},
			[controls, onMouseLeave]
		);

		const faceVariants: Variants = {
			normal: {
				scale: 1,
				rotate: 0,
				transition: { duration: 0.3, ease: "easeOut" },
			},
			animate: {
				scale: [1, 1.15, 1.05, 1.08],
				rotate: [0, -2, 2, 0],
				transition: {
					duration: 0.8,
					times: [0, 0.3, 0.6, 1],
					ease: "easeInOut",
				},
			},
		};

		const mouthVariants: Variants = {
			normal: {
				d: "M16 16s-1.5-2-4-2-4 2-4 2",
				pathLength: 1,
				transition: { duration: 0.3, ease: "easeOut" },
			},
			animate: {
				d: "M16 17s-1.5-2.5-4-2.5-4 2.5-4 2.5",
				pathLength: [0.3, 1, 1],
				transition: {
					d: { duration: 0.5, ease: "easeOut" },
					pathLength: {
						duration: 0.5,
						times: [0, 0.5, 1],
						ease: "easeInOut",
					},
					delay: 0.1,
				},
			},
		};

		const leftEyeVariants: Variants = {
			normal: {
				scale: 1,
				y: 0,
				transition: { duration: 0.3, ease: "easeOut" },
			},
			animate: {
				scale: [1, 1.3, 0.9, 1.1],
				y: [0, -0.5, 0.3, 0],
				transition: {
					duration: 0.6,
					times: [0, 0.3, 0.6, 1],
					ease: "easeInOut",
				},
			},
		};

		const rightEyeVariants: Variants = {
			normal: {
				scale: 1,
				y: 0,
				transition: { duration: 0.3, ease: "easeOut" },
			},
			animate: {
				scale: [1, 0.9, 1.3, 1.1],
				y: [0, -0.5, 0.3, 0],
				transition: {
					duration: 0.6,
					times: [0, 0.3, 0.6, 1],
					ease: "easeInOut",
				},
			},
		};

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					animate={controls}
					initial="normal"
					variants={faceVariants}
				>
					<circle cx="12" cy="12" r="10" />
					<motion.path
						variants={mouthVariants}
						animate={controls}
						initial="normal"
						d="M16 16s-1.5-2-4-2-4 2-4 2"
					/>
					<motion.line
						x1="9"
						x2="9.01"
						y1="9"
						y2="9"
						variants={leftEyeVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.line
						x1="15"
						x2="15.01"
						y1="9"
						y2="9"
						variants={rightEyeVariants}
						animate={controls}
						initial="normal"
					/>
				</motion.svg>
			</div>
		);
	}
);

FrownIcon.displayName = "FrownIcon";

export { FrownIcon };
```

### `components/ui/icons/gallery-horizontal-end.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface GalleryHorizontalEndIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface GalleryHorizontalEndIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		translateX: 0,
		opacity: 1,
		transition: {
			type: "tween",
			stiffness: 200,
			damping: 13,
		},
	},
	animate: (i: number) => ({
		translateX: [2 * i, 0],
		opacity: [0, 1],
		transition: {
			delay: 0.25 * (2 - i),
			type: "tween",
			stiffness: 200,
			damping: 13,
		},
	}),
};

const GalleryHorizontalEndIcon = forwardRef<
	GalleryHorizontalEndIconHandle,
	GalleryHorizontalEndIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					d="M6 5v14"
					variants={pathVariants}
					animate={controls}
					custom={2}
				/>
				<motion.path
					d="M2 7v10"
					variants={pathVariants}
					animate={controls}
					custom={1}
				/>
				<rect width="12" height="18" x="10" y="3" rx="2" />
			</svg>
		</div>
	);
});

GalleryHorizontalEndIcon.displayName = "GalleryHorizontalEndIcon";

export { GalleryHorizontalEndIcon };
```

### `components/ui/icons/gallery-thumbnails.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface GalleryThumbnailsIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface GalleryThumbnailsIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { opacity: 1 },
	animate: (i: number) => ({
		opacity: [0, 1],
		transition: { delay: i * 0.15, duration: 0.2 },
	}),
};

const GalleryThumbnailsIcon = forwardRef<
	GalleryThumbnailsIconHandle,
	GalleryThumbnailsIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect width="18" height="14" x="3" y="3" rx="2" />
				{["M4 21h1", "M9 21h1", "M14 21h1", "M19 21h1"].map((d, index) => (
					<motion.path
						key={d}
						d={d}
						animate={controls}
						variants={pathVariants}
						custom={index + 1}
					/>
				))}
			</svg>
		</div>
	);
});

GalleryThumbnailsIcon.displayName = "GalleryThumbnailsIcon";

export { GalleryThumbnailsIcon };
```

### `components/ui/icons/gallery-vertical-end.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface GalleryVerticalEndIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface GalleryVerticalEndIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		translateY: 0,
		opacity: 1,
		transition: {
			type: "tween",
			stiffness: 200,
			damping: 13,
		},
	},
	animate: (i: number) => ({
		translateY: [2 * i, 0],
		opacity: [0, 1],
		transition: {
			delay: 0.25 * (2 - i),
			type: "tween",
			stiffness: 200,
			damping: 13,
		},
	}),
};

const GalleryVerticalEndIcon = forwardRef<
	GalleryVerticalEndIconHandle,
	GalleryVerticalEndIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					d="M7 2h10"
					variants={pathVariants}
					animate={controls}
					custom={1}
				/>
				<motion.path
					d="M5 6h14"
					variants={pathVariants}
					animate={controls}
					custom={2}
				/>
				<rect width="18" height="12" x="3" y="10" rx="2" />
			</svg>
		</div>
	);
});

GalleryVerticalEndIcon.displayName = "GalleryVerticalEndIcon";

export { GalleryVerticalEndIcon };
```

### `components/ui/icons/gauge.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface GaugeIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface GaugeIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	type: "spring",
	stiffness: 160,
	damping: 17,
	mass: 1,
};

const GaugeIcon = forwardRef<GaugeIconHandle, GaugeIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="m12 14 4-4"
						variants={{
							animate: { translateX: 0.5, translateY: 3, rotate: 72 },
							normal: {
								translateX: 0,
								rotate: 0,
								translateY: 0,
							},
						}}
						animate={controls}
						transition={defaultTransition}
					/>
					<path d="M3.34 19a10 10 0 1 1 17.32 0" />
				</svg>
			</div>
		);
	}
);

GaugeIcon.displayName = "GaugeIcon";

export { GaugeIcon };
```

### `components/ui/icons/git-commit-horizontal.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface GitCommitHorizontalIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface GitCommitHorizontalIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: (custom: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			delay: 0.15 * custom,
			opacity: { delay: 0.1 * custom },
		},
	}),
};

const GitCommitHorizontalIcon = forwardRef<
	GitCommitHorizontalIconHandle,
	GitCommitHorizontalIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.circle
					cx="12"
					cy="12"
					r="3"
					variants={variants}
					animate={controls}
					custom={1}
				/>
				<motion.line
					x1="3"
					x2="9"
					y1="12"
					y2="12"
					variants={variants}
					animate={controls}
					custom={0}
				/>
				<motion.line
					x1="15"
					x2="21"
					y1="12"
					y2="12"
					variants={variants}
					animate={controls}
					custom={2}
				/>
			</svg>
		</div>
	);
});

GitCommitHorizontalIcon.displayName = "GitCommitHorizontalIcon";

export { GitCommitHorizontalIcon };
```

### `components/ui/icons/git-commit-vertical.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface GitCommitVerticalIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface GitCommitVerticalIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: (custom: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			delay: 0.15 * custom,
			opacity: { delay: 0.1 * custom },
		},
	}),
};

const GitCommitVerticalIcon = forwardRef<
	GitCommitVerticalIconHandle,
	GitCommitVerticalIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path
					d="M12 3v6"
					variants={variants}
					animate={controls}
					custom={0}
				/>
				<motion.circle
					cx="12"
					cy="12"
					r="3"
					variants={variants}
					animate={controls}
					custom={1}
				/>
				<motion.path
					d="M12 15v6"
					variants={variants}
					animate={controls}
					custom={2}
				/>
			</svg>
		</div>
	);
});

GitCommitVerticalIcon.displayName = "GitCommitVerticalIcon";

export { GitCommitVerticalIcon };
```

### `components/ui/icons/git-pull-request.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface GitPullRequestIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface GitPullRequestIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const DURATION = 0.3;

const calculateDelay = (i: number) => {
	if (i === 0) return 0.1;

	return i * DURATION + 0.1;
};

const GitPullRequestIcon = forwardRef<
	GitPullRequestIconHandle,
	GitPullRequestIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.circle
					cx="18"
					cy="18"
					r="3"
					transition={{
						duration: DURATION,
						delay: calculateDelay(0),
						opacity: { delay: calculateDelay(0) },
					}}
					variants={{
						normal: {
							pathLength: 1,
							opacity: 1,
							transition: { delay: 0 },
						},
						animate: {
							pathLength: [0, 1],
							opacity: [0, 1],
						},
					}}
					animate={controls}
				/>
				<motion.circle
					cx="6"
					cy="6"
					r="3"
					transition={{
						duration: DURATION,
						delay: calculateDelay(2),
						opacity: { delay: calculateDelay(2) },
					}}
					variants={{
						normal: {
							pathLength: 1,
							opacity: 1,
							transition: { delay: 0 },
						},
						animate: {
							pathLength: [0, 1],
							opacity: [0, 1],
						},
					}}
					animate={controls}
				/>
				<motion.path
					d="M13 6h3a2 2 0 0 1 2 2v7"
					transition={{
						duration: DURATION,
						delay: calculateDelay(1),
						opacity: { delay: calculateDelay(1) },
					}}
					variants={{
						normal: {
							pathLength: 1,
							pathOffset: 0,
							opacity: 1,
							transition: { delay: 0 },
						},
						animate: {
							pathLength: [0, 1],
							opacity: [0, 1],
							pathOffset: [1, 0],
						},
					}}
					animate={controls}
				/>
				<motion.line
					x1="6"
					x2="6"
					y1="9"
					y2="21"
					transition={{
						duration: DURATION,
						delay: calculateDelay(3),
						opacity: { delay: calculateDelay(3) },
					}}
					variants={{
						normal: {
							opacity: 1,
							pathLength: 1,
							transition: { delay: 0 },
						},
						animate: {
							opacity: [0, 1],
							pathLength: [0, 1],
						},
					}}
					animate={controls}
				/>
			</svg>
		</div>
	);
});

GitPullRequestIcon.displayName = "GitPullRequestIcon";

export { GitPullRequestIcon };
```

### `components/ui/icons/github.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface GithubIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface GithubIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const bodyVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		scale: 1,
		transition: {
			duration: 0.3,
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		scale: [0.9, 1],
		transition: {
			duration: 0.4,
		},
	},
};

const tailVariants: Variants = {
	normal: {
		pathLength: 1,
		rotate: 0,
		transition: {
			duration: 0.3,
		},
	},
	draw: {
		pathLength: [0, 1],
		rotate: 0,
		transition: {
			duration: 0.5,
		},
	},
	wag: {
		pathLength: 1,
		rotate: [0, -15, 15, -10, 10, -5, 5],
		transition: {
			duration: 2.5,
			ease: "easeInOut",
			repeat: Infinity,
		},
	},
};

const GithubIcon = forwardRef<GithubIconHandle, GithubIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const bodyControls = useAnimation();
		const tailControls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: async () => {
					bodyControls.start("animate");
					await tailControls.start("draw");
					tailControls.start("wag");
				},
				stopAnimation: () => {
					bodyControls.start("normal");
					tailControls.start("normal");
				},
			};
		});

		const handleMouseEnter = useCallback(
			async (e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					bodyControls.start("animate");
					await tailControls.start("draw");
					tailControls.start("wag");
				} else {
					onMouseEnter?.(e);
				}
			},
			[bodyControls, onMouseEnter, tailControls]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					bodyControls.start("normal");
					tailControls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[bodyControls, tailControls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						variants={bodyVariants}
						initial="normal"
						animate={bodyControls}
						d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
					/>
					<motion.path
						variants={tailVariants}
						initial="normal"
						animate={tailControls}
						d="M9 18c-4.51 2-5-2-7-2"
					/>
				</svg>
			</div>
		);
	}
);

GithubIcon.displayName = "GithubIcon";

export { GithubIcon };
```

### `components/ui/icons/grip.tsx`

```tsx
"use client";

import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useAnimation } from "motion/react";

export interface GripIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface GripIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const CIRCLES = [
	{ cx: 19, cy: 5 }, // Top right
	{ cx: 12, cy: 5 }, // Top middle
	{ cx: 19, cy: 12 }, // Middle right
	{ cx: 5, cy: 5 }, // Top left
	{ cx: 12, cy: 12 }, // Center
	{ cx: 19, cy: 19 }, // Bottom right
	{ cx: 5, cy: 12 }, // Middle left
	{ cx: 12, cy: 19 }, // Bottom middle
	{ cx: 5, cy: 19 }, // Bottom left
];

const GripIcon = forwardRef<GripIconHandle, GripIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const [isHovered, setIsHovered] = useState(false);
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: async () => setIsHovered(true),
				stopAnimation: () => setIsHovered(false),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					setIsHovered(true);
				} else {
					onMouseEnter?.(e);
				}
			},
			[onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					setIsHovered(false);
				} else {
					onMouseLeave?.(e);
				}
			},
			[onMouseLeave]
		);

		useEffect(() => {
			const animateCircles = async () => {
				if (isHovered) {
					await controls.start((i) => ({
						opacity: 0.3,
						transition: {
							delay: i * 0.1,
							duration: 0.2,
						},
					}));
					await controls.start((i) => ({
						opacity: 1,
						transition: {
							delay: i * 0.1,
							duration: 0.2,
						},
					}));
				}
			};

			animateCircles();
		}, [isHovered, controls]);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<AnimatePresence>
						{CIRCLES.map((circle, index) => (
							<motion.circle
								key={`${circle.cx}-${circle.cy}`}
								cx={circle.cx}
								cy={circle.cy}
								r="1"
								initial="initial"
								variants={{
									initial: {
										opacity: 1,
									},
								}}
								animate={controls}
								exit="initial"
								custom={index}
							/>
						))}
					</AnimatePresence>
				</svg>
			</div>
		);
	}
);

GripIcon.displayName = "GripIcon";

export { GripIcon };
```

### `components/ui/icons/hand-coins.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface HandCoinsIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface HandCoinsIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const circleVariants: Variants = {
	normal: {
		translateY: 0,
		opacity: 1,
		transition: {
			opacity: { duration: 0.2 },
			type: "spring",
			stiffness: 150,
			damping: 15,
			bounce: 0.8,
		},
	},
	animate: {
		opacity: [0, 1],
		translateY: [-20, 0],
		transition: {
			opacity: { duration: 0.2 },
			type: "spring",
			stiffness: 150,
			damping: 15,
			bounce: 0.8,
		},
	},
};

const secondCircleVariants: Variants = {
	normal: {
		translateY: 0,
		opacity: 1,
		transition: {
			opacity: { duration: 0.2 },
			delay: 0.15,
			type: "spring",
			stiffness: 150,
			damping: 15,
			bounce: 0.8,
		},
	},
	animate: {
		opacity: [0, 1],
		translateY: [-20, 0],
		transition: {
			opacity: { duration: 0.2 },
			delay: 0.15,
			type: "spring",
			stiffness: 150,
			damping: 15,
			bounce: 0.8,
		},
	},
};

const HandCoinsIcon = forwardRef<HandCoinsIconHandle, HandCoinsIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
					<path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
					<path d="m2 16 6 6" />
					<motion.circle
						cx="16"
						cy="9"
						r="2.9"
						animate={controls}
						variants={circleVariants}
					/>
					<motion.circle
						cx="6"
						cy="5"
						r="3"
						animate={controls}
						variants={secondCircleVariants}
					/>
				</svg>
			</div>
		);
	}
);

HandCoinsIcon.displayName = "HandCoinsIcon";

export { HandCoinsIcon };
```

### `components/ui/icons/hand-heart.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface HandHeartIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface HandHeartIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}
const heartVariants: Variants = {
	normal: {
		translateY: 0,
		scale: 1,
		transition: {
			delay: 0.1,
			scale: { duration: 0.2 },
			type: "spring",
			stiffness: 200,
			damping: 25,
		},
	},
	animate: {
		translateY: [0, -2],
		scale: [1, 1.1],
		transition: {
			delay: 0.1,
			scale: { duration: 0.2 },
			type: "spring",
			stiffness: 200,
			damping: 25,
		},
	},
};

const HandHeartIcon = forwardRef<HandHeartIconHandle, HandHeartIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					style={{ overflow: "visible" }}
					strokeLinejoin="round"
				>
					<path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
					<path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
					<path d="m2 15 6 6" />
					<motion.path
						animate={controls}
						variants={heartVariants}
						d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z"
					/>
				</svg>
			</div>
		);
	}
);

HandHeartIcon.displayName = "HandHeartIcon";

export { HandHeartIcon };
```

### `components/ui/icons/heart.tsx`

```tsx
"use client";

import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface HeartIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface HeartIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
}

const HeartIcon = forwardRef<HeartIconHandle, HeartIconProps>(
    ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
        const controls = useAnimation();
        const isControlledRef = useRef(false);

        useImperativeHandle(ref, () => {
            isControlledRef.current = true;

            return {
                startAnimation: () => controls.start("animate"),
                stopAnimation: () => controls.start("normal"),
            };
        });

        const handleMouseEnter = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (isControlledRef.current) {
                    onMouseEnter?.(e);
                } else {
                    controls.start("animate");
                }
            },
            [controls, onMouseEnter]
        );

        const handleMouseLeave = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (isControlledRef.current) {
                    onMouseLeave?.(e);
                } else {
                    controls.start("normal");
                }
            },
            [controls, onMouseLeave]
        );

        return (
            <div
                className={cn(className)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...props}
            >
                <motion.svg
                    animate={controls}
                    fill="none"
                    height={size}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    transition={{
                        duration: 0.45,
                        repeat: 2,
                    }}
                    variants={{
                        normal: { scale: 1 },
                        animate: { scale: [1, 1.08, 1] },
                    }}
                    viewBox="0 0 24 24"
                    width={size}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </motion.svg>
            </div>
        );
    }
);

HeartIcon.displayName = "HeartIcon";

export { HeartIcon };
```

### `components/ui/icons/history.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface HistoryIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface HistoryIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const arrowTransition: Transition = {
	type: "spring",
	stiffness: 250,
	damping: 25,
};

const arrowVariants: Variants = {
	normal: {
		rotate: "0deg",
	},
	animate: {
		rotate: "-50deg",
	},
};

const handTransition: Transition = {
	duration: 0.6,
	ease: [0.4, 0, 0.2, 1],
};

const handVariants: Variants = {
	normal: {
		rotate: 0,
		originX: "50%",
		originY: "50%",
	},
	animate: {
		rotate: -360,
	},
};

const minuteHandTransition: Transition = {
	duration: 0.5,
	ease: "easeInOut",
};

const minuteHandVariants: Variants = {
	normal: {
		rotate: 0,
		originX: "50%",
		originY: "50%",
	},
	animate: {
		rotate: -45,
	},
};

const HistoryIcon = forwardRef<HistoryIconHandle, HistoryIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					"cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center",
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.g
						transition={arrowTransition}
						variants={arrowVariants}
						animate={controls}
					>
						<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
						<path d="M3 3v5h5" />
					</motion.g>
					<motion.line
						x1="12"
						y1="12"
						x2="12"
						y2="7"
						variants={handVariants}
						animate={controls}
						initial="normal"
						transition={handTransition}
					/>
					<motion.line
						x1="12"
						y1="12"
						x2="16"
						y2="14"
						variants={minuteHandVariants}
						animate={controls}
						initial="normal"
						transition={minuteHandTransition}
					/>
				</svg>
			</div>
		);
	}
);

HistoryIcon.displayName = "HistoryIcon";

export { HistoryIcon };
```

### `components/ui/icons/home.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface HomeIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface HomeIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	duration: 0.6,
	opacity: { duration: 0.2 },
};

const pathVariants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
	},
};

const HomeIcon = forwardRef<HomeIconHandle, HomeIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
					<motion.path
						d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"
						variants={pathVariants}
						transition={defaultTransition}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

HomeIcon.displayName = "HomeIcon";

export { HomeIcon };
```

### `components/ui/icons/id-card.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface IdCardIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface IdCardIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const Variants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: (custom: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 0.3,
			delay: custom * 0.1,
		},
	}),
};

const IdCardIcon = forwardRef<IdCardIconHandle, IdCardIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M16 10h2"
						variants={Variants}
						animate={controls}
						custom={2}
					/>
					<motion.path
						d="M16 14h2"
						variants={Variants}
						animate={controls}
						custom={2}
					/>
					<motion.path
						d="M6.17 15a3 3 0 0 1 5.66 0"
						variants={Variants}
						animate={controls}
						custom={0}
					/>
					<motion.circle
						cx="9"
						cy="11"
						r="2"
						variants={Variants}
						animate={controls}
						custom={1}
					/>
					<rect x="2" y="5" width="20" height="14" rx="2" />
				</svg>
			</div>
		);
	}
);

IdCardIcon.displayName = "IdCardIcon";

export { IdCardIcon };
```

### `components/ui/icons/index.ts`

```tsx
import { AlarmClockIcon } from './alarm-clock';
import { AlignCenterIcon } from './align-center';
import { AlignHorizontalIcon } from './align-horizontal';
import { AlignVerticalIcon } from './align-vertical';
import { AngryIcon } from './angry';
import { ArchiveIcon } from './archive';
import { ArrowLeftIcon } from './arrow-left';
import { ArrowRightIcon } from './arrow-right';
import { AtSignIcon } from './at-sign';
import { AttachFileIcon } from './attach-file';
import { BadgePercentIcon } from './badge-percent';
import { BellIcon } from './bell';
import { BoldIcon } from './bold';
import { BoneIcon } from './bone';
import { CalendarCogIcon } from './calendar-cog';
import { ChartPieIcon } from './chart-pie';
import { ChartScatterIcon } from './chart-scatter';
import { CircleCheckIcon } from './circle-check';
import { CircleDollarSignIcon } from './circle-dollar-sign';
import { ClockIcon } from './clock';
import { CopyIcon } from './copy';
import { CursorClickIcon } from './cursor-click';
import { DeleteIcon } from './delete';
import { DownloadIcon } from './download';
import { DownvoteIcon } from './downvote';
import { SquarePenIcon } from './square-pen';
import { ExpandIcon } from './expand';
import { FilePenLineIcon } from './file-pen-line';
import { FileStackIcon } from './file-stack';
import { FingerprintIcon } from './fingerprint';
import { FrameIcon } from './frame';
import { GaugeIcon } from './gauge';
import { GitPullRequestIcon } from './git-pull-request';
import { GithubIcon } from './github';
import { GripIcon } from './grip';
import { HandCoinsIcon } from './hand-coins';
import { HomeIcon } from './home';
import { HeartIcon } from './heart';
import { ItalicIcon } from './italic';
import { LanguagesIcon } from './languages';
import { LayersIcon } from './layers';
import { LinkIcon } from './link';
import { MenuIcon } from './menu';
import { PartyPopperIcon } from './party-popper';
import { PenToolIcon } from './pen-tool';
import { RefreshCCWIcon } from './refresh-ccw';
import { RouteIcon } from './route';
import { ScanTextIcon } from './scan-text';
import { SettingsIcon } from './settings';
import { SettingsGearIcon } from './settings-gear';
import { SunIcon } from './sun';
import { UnderlineIcon } from './underline';
import { UndoIcon } from './undo';
import { ConnectIcon } from './connect';
import { UpvoteIcon } from './upvote';
import { UsersIcon } from './users';
import { VolumeIcon } from './volume';
import { CartIcon } from './cart';
import { StethoscopeIcon } from './stethoscope';
import { EarthIcon } from './earth';
import { WorkflowIcon } from './workflow';
import { LogoutIcon } from './logout';
import { CircleHelpIcon } from './circle-help';
import { UserIcon } from './user';
import { AudioLinesIcon } from './audio-lines';
import { FlameIcon } from './flame';
import { EyeOffIcon } from './eye-off';
import { SquareStackIcon } from './square-stack';
import { BadgeAlertIcon } from './badge-alert';
import { MessageCircleIcon } from './message-circle';
import { MessageCircleMoreIcon } from './message-circle-more';
import { SearchIcon } from './search';
import { ShieldCheckIcon } from './shield-check';
import { TimerIcon } from './timer';
import { BluetoothSearchingIcon } from './bluetooth-searching';
import { BluetoothConnectedIcon } from './bluetooth-connected';
import { BluetoothOffIcon } from './bluetooth-off';
import { FlaskIcon } from './flask';
import { SyringeIcon } from './syringe';
import { AArrowDownIcon } from './a-arrow-down';
import { CompassIcon } from './compass';
import { TrendingDownIcon } from './trending-down';
import { TrendingUpIcon } from './trending-up';
import { TrendingUpDownIcon } from './trending-up-down';
import { PlayIcon } from './play';
import { PauseIcon } from './pause';
import { ChevronsUpDownIcon } from './chevrons-up-down';
import { ChevronsDownUpIcon } from './chevrons-down-up';
import { ChevronsLeftRightIcon } from './chevrons-left-right';
import { ChevronsRightLeftIcon } from './chevrons-right-left';
import { CircleChevronDownIcon } from './circle-chevron-down';
import { CircleChevronLeftIcon } from './circle-chevron-left';
import { CircleChevronRightIcon } from './circle-chevron-right';
import { CircleChevronUpIcon } from './circle-chevron-up';
import { CircleDashedIcon } from './circle-dashed';
import { CheckIcon } from './check';
import { CheckCheckIcon } from './check-check';
import { IdCardIcon } from './id-card';
import { LoaderPinwheelIcon } from './loader-pinwheel';
import { RockingChairIcon } from './rocking-chair';
import { ChartColumnDecreasingIcon } from './chart-column-decreasing';
import { ChartColumnIncreasingIcon } from './chart-column-increasing';
import { ChartBarDecreasingIcon } from './chart-bar-decreasing';
import { ChartBarIncreasingIcon } from './chart-bar-increasing';
import { BananaIcon } from './banana';
import { BanIcon } from './ban';
import { WifiIcon } from './wifi';
import { ChromeIcon } from './chrome';
import { FigmaIcon } from './figma';
import { FishSymbolIcon } from './fish-symbol';
import { GitCommitVerticalIcon } from './git-commit-vertical';
import { GitCommitHorizontalIcon } from './git-commit-horizontal';
import { WaypointsIcon } from './waypoints';
import { ShipIcon } from './ship';
import { RollerCoasterIcon } from './roller-coaster';
import { AirplaneIcon } from './airplane';
import { DrumIcon } from './drum';
import { TrainTrackIcon } from './train-track';
import { SparklesIcon } from './sparkles';
import { WebhookIcon } from './webhook';
import { RabbitIcon } from './rabbit';
import { CogIcon } from './cog';
import { CpuIcon } from './cpu';
import { RocketIcon } from './rocket';
import { ActivityIcon } from './activity';
import { MapPinIcon } from './map-pin';
import { MapPinCheckInsideIcon } from './map-pin-check-inside';
import { MapPinMinusInsideIcon } from './map-pin-minus-inside';
import { MapPinPlusInsideIcon } from './map-pin-plus-inside';
import { MapPinOffIcon } from './map-pin-off';
import { MapPinCheckIcon } from './map-pin-check';
import { MapPinHouseIcon } from './map-pin-house';
import { MapPinMinusIcon } from './map-pin-minus';
import { MapPinPlusIcon } from './map-pin-plus';
import { MapPinXInsideIcon } from './map-pin-x-inside';
import { BatteryFullIcon } from './battery-full';
import { TerminalIcon } from './terminal';
import { KeyboardIcon } from './keyboard';
import { ClapIcon } from './clap';
import { LayoutPanelTopIcon } from './layout-panel-top';
import { BookTextIcon } from './book-text';
import { ShowerHeadIcon } from './shower-head';
import { TelescopeIcon } from './telescope';
import { WindIcon } from './wind';
import { CctvIcon } from './cctv';
import { CoffeeIcon } from './coffee';
import { ArrowDownZAIcon } from './arrow-down-z-a';
import { ArrowDownAZIcon } from './arrow-down-a-z';
import { ArrowDown01con } from './arrow-down-0-1';
import { ArrowDown10Icon } from './arrow-down-1-0';
import { ClipboardCheckIcon } from './clipboard-check';
import { FacebookIcon } from './facebook';
import { LinkedinIcon } from './linkedin';
import { TwitterIcon } from './twitter';
import { YoutubeIcon } from './youtube';
import { InstagramIcon } from './instagram';
import { TwitchIcon } from './twitch';
import { DribbbleIcon } from './dribbble';
import { DiscordIcon } from './discord';
import { XIcon } from './x';
import { MoonIcon } from './moon';
import { VibrateIcon } from './vibrate';
import { SmartphoneChargingIcon } from './smartphone-charging';
import { CastIcon } from './cast';
import { UploadIcon } from './upload';
import { CloudSunIcon } from './cloud-sun';
import { SunsetIcon } from './sunset';
import { SunDimIcon } from './sun-dim';
import { SunMediumIcon } from './sun-medium';
import { SunMoonIcon } from './sun-moon';
import { MessageSquareIcon } from './message-square';
import { MessageSquareMoreIcon } from './message-square-more';
import { MessageCircleDashedIcon } from './message-circle-dashed';
import { MessageSquareDashedIcon } from './message-square-dashed';
import { AArrowUpIcon } from './a-arrow-up';
import { FileCogIcon } from './file-cog';
import { CalendarDaysIcon } from './calendar-days';
import { ArrowBigDownDashIcon } from './arrow-big-down-dash';
import { ArrowBigLeftDashIcon } from './arrow-big-left-dash';
import { ArrowBigRightDashIcon } from './arrow-big-right-dash';
import { ArrowBigUpDashIcon } from './arrow-big-up-dash';
import { ArrowDownIcon } from './arrow-down';
import { ArrowUpIcon } from './arrow-up';
import { ArrowBigDownIcon } from './arrow-big-down';
import { ArrowBigLeftIcon } from './arrow-big-left';
import { ArrowBigRightIcon } from './arrow-big-right';
import { ArrowBigUpIcon } from './arrow-big-up';
import { KeyIcon } from './key';
import { KeyCircleIcon } from './key-circle';
import { KeySquareIcon } from './key-square';
import { ChartLineIcon } from './chart-line';
import { ChartSplineIcon } from './chart-spline';
import { FileChartLineIcon } from './file-chart-line';
import { ChartNoAxesColumnIncreasingIcon } from './chart-no-axes-column-increasing';
import { ChartNoAxesColumnDecreasingIcon } from './chart-no-axes-column-decreasing';
import { RadioIcon } from './radio';
import { RadioTowerIcon } from './radio-tower';
import { AirVentIcon } from './air-vent';
import { TornadoIcon } from './tornado';
import { WindArrowDownIcon } from './wind-arrow-down';
import { CloudRainIcon } from './cloud-rain';
import { CloudRainWindIcon } from './cloud-rain-wind';
import { WavesIcon } from './waves';
import { WavesLadderIcon } from './waves-ladder';
import { SquareArrowDownIcon } from './square-arrow-down';
import { SquareArrowLeftIcon } from './square-arrow-left';
import { SquareArrowUpIcon } from './square-arrow-up';
import { SquareArrowRightIcon } from './square-arrow-right';
import { BlocksIcon } from './blocks';
import { CalendarCheckIcon } from './calendar-check';
import { CalendarCheck2Icon } from './calendar-check-2';
import { FileCheckIcon } from './file-check';
import { FileCheck2Icon } from './file-check-2';
import { MailCheckIcon } from './mail-check';
import { MonitorCheckIcon } from './monitor-check';
import { LaptopMinimalCheckIcon } from './laptop-minimal-check';
import { ChevronDownIcon } from './chevron-down';
import { ChevronUpIcon } from './chevron-up';
import { ChevronLeftIcon } from './chevron-left';
import { ChevronRightIcon } from './chevron-right';
import { SquareChevronDownIcon } from './square-chevron-down';
import { SquareChevronUpIcon } from './square-chevron-up';
import { SquareChevronRightIcon } from './square-chevron-right';
import { SquareChevronLeftIcon } from './square-chevron-left';
import { GalleryHorizontalEndIcon } from './gallery-horizontal-end';
import { GalleryVerticalEndIcon } from './gallery-vertical-end';
import { HandHeartIcon } from './hand-heart';
import { SquareActivityIcon } from './square-activity';
import { RotateCWIcon } from './rotate-cw';
import { RotateCCWIcon } from './rotate-ccw';
import { GalleryThumbnailsIcon } from './gallery-thumbnails';
import { UserCheckIcon } from './user-check';
import { UserRoundCheckIcon } from './user-round-check';
import { BoxesIcon } from './boxes';
import { RefreshCWIcon } from './refresh-cw';
import { RefreshCCWDotIcon } from './refresh-ccw-dot';
import { RefreshCWOffIcon } from './refresh-cw-off';
import { RedoIcon } from './redo';
import { UndoDotIcon } from './undo-dot';
import { RedoDotIcon } from './redo-dot';
import { ScanFaceIcon } from './scan-face';
import { FrownIcon } from './frown';
import { SmilePlusIcon } from './smile-plus';
import { SmileIcon } from './smile';
import { LaughIcon } from './laugh';
import { AnnoyedIcon } from './annoyed';
import { MehIcon } from './meh';
import { HistoryIcon } from './history';
import { FileTextIcon } from './file-text';
import { UserRoundPlusIcon } from './user-round-plus';
import { PanelLeftOpenIcon } from './panel-left-open';
import { PanelLeftCloseIcon } from './panel-left-close';
import { PanelRightOpenIcon } from './panel-right-open';

// Credit:
// https://github.com/pqoqubbw/icons

type IconListItem = {
  name: string;
  icon: React.ElementType;
  keywords: string[];
};

const ICON_LIST: IconListItem[] = [
  {
    name: 'smartphone-charging',
    icon: SmartphoneChargingIcon,
    keywords: ['phone', 'cellphone', 'device', 'power', 'screen'],
  },
  {
    name: 'history',
    icon: HistoryIcon,
    keywords: ['history', 'back', 'previous', 'arrow'],
  },
  { name: 'square-activity', icon: SquareActivityIcon, keywords: ['activity'] },
  {
    name: 'square-arrow-down',
    icon: SquareArrowDownIcon,
    keywords: ['arrow', 'down', 'a'],
  },
  {
    name: 'square-arrow-left',
    icon: SquareArrowLeftIcon,
    keywords: ['arrow', 'left', 'a'],
  },
  {
    name: 'square-arrow-right',
    icon: SquareArrowRightIcon,
    keywords: ['arrow', 'right', 'a'],
  },
  {
    name: 'square-arrow-up',
    icon: SquareArrowUpIcon,
    keywords: ['arrow', 'up', 'a'],
  },
  {
    name: 'scan-face',
    icon: ScanFaceIcon,
    keywords: ['scan', 'face', 'emotion'],
  },
  {
    name: 'frown',
    icon: FrownIcon,
    keywords: ['frown', 'emotion', 'face', 'sad'],
  },
  {
    name: 'smile-plus',
    icon: SmilePlusIcon,
    keywords: ['smile', 'plus', 'emotion', 'face'],
  },
  { name: 'smile', icon: SmileIcon, keywords: ['smile', 'emotion', 'face'] },
  { name: 'laugh', icon: LaughIcon, keywords: ['laugh', 'emotion', 'face'] },
  {
    name: 'annoyed',
    icon: AnnoyedIcon,
    keywords: ['annoyed', 'emotion', 'face'],
  },
  { name: 'meh', icon: MehIcon, keywords: ['meh', 'emotion', 'face'] },
  {
    name: 'key',
    icon: KeyIcon,
    keywords: ['key', 'authentication', 'security', 'access', 'password'],
  },
  {
    name: 'key-square',
    icon: KeySquareIcon,
    keywords: ['key', 'authentication', 'security', 'access', 'password'],
  },
  {
    name: 'key-circle',
    icon: KeyCircleIcon,
    keywords: ['key', 'authentication', 'security', 'access', 'password'],
  },
  {
    name: 'rotate-cw',
    icon: RotateCWIcon,
    keywords: [
      'rotate',
      'clockwise',
      'turn',
      'degrees',
      'degrees',
      'clockwise',
      'counterclockwise',
    ],
  },
  {
    name: 'rotate-ccw',
    icon: RotateCCWIcon,
    keywords: [
      'rotate',
      'counterclockwise',
      'turn',
      'degrees',
      'degrees',
      'clockwise',
      'counterclockwise',
    ],
  },
  {
    name: 'refresh-cw-off',
    icon: RefreshCWOffIcon,
    keywords: ['refresh', 'rotate', 'reload', 'rerun', 'circular', 'cycle'],
  },
  {
    name: 'refresh-cw',
    icon: RefreshCWIcon,
    keywords: ['refresh', 'rotate', 'reload', 'rerun', 'circular', 'cycle'],
  },
  {
    name: 'refresh-ccw-dot',
    icon: RefreshCCWDotIcon,
    keywords: ['refresh', 'rotate', 'reload', 'rerun', 'circular', 'cycle'],
  },
  {
    name: 'redo',
    icon: RedoIcon,
    keywords: ['redo', 'repeat', 'undo', 'back', 'previous', 'arrow'],
  },
  {
    name: 'undo-dot',
    icon: UndoDotIcon,
    keywords: ['undo', 'repeat', 'back', 'previous', 'arrow'],
  },
  {
    name: 'redo-dot',
    icon: RedoDotIcon,
    keywords: ['redo', 'repeat', 'undo', 'back', 'previous', 'arrow'],
  },
  {
    name: 'arrow-big-down',
    icon: ArrowBigDownIcon,
    keywords: ['arrow', 'down', 'big', 'below', 'south', 'bottom'],
  },
  {
    name: 'arrow-big-left',
    icon: ArrowBigLeftIcon,
    keywords: ['arrow', 'left', 'big', 'west', 'previous', '<-'],
  },
  {
    name: 'arrow-big-right',
    icon: ArrowBigRightIcon,
    keywords: ['arrow', 'right', 'big', 'east', 'next', '->'],
  },
  {
    name: 'arrow-big-up',
    icon: ArrowBigUpIcon,
    keywords: ['arrow', 'up', 'big', 'north', 'top'],
  },
  {
    name: 'a-arrow-up',
    icon: AArrowUpIcon,
    keywords: ['arrow', 'up', 'a'],
  },
  {
    name: 'chart-spline',
    icon: ChartSplineIcon,
    keywords: [
      'chart',
      'spline',
      'graph',
      'statistics',
      'analytics',
      'diagram',
      'presentation',
      'analytics',
    ],
  },
  {
    name: 'arrow-up',
    icon: ArrowUpIcon,
    keywords: ['up', 'above', 'direction', 'north', 'top'],
  },
  {
    name: 'arrow-down',
    icon: ArrowDownIcon,
    keywords: ['down', 'below', 'direction', 'south', 'bottom'],
  },
  {
    name: 'vibrate',
    icon: VibrateIcon,
    keywords: [
      'smartphone',
      'notification',
      'rumble',
      'haptic feedback',
      'screen',
    ],
  },
  {
    name: 'waves-ladder',
    icon: WavesLadderIcon,
    keywords: ['waves', 'ladder', 'water', 'ocean', 'sea'],
  },
  {
    name: 'waves',
    icon: WavesIcon,
    keywords: ['waves', 'water', 'ocean', 'sea', 'wave', 'sea wave'],
  },
  {
    name: 'wind-arrow-down',
    icon: WindArrowDownIcon,
    keywords: ['wind', 'arrow', 'down', 'wind arrow down'],
  },
  {
    name: 'air-vent',
    icon: AirVentIcon,
    keywords: ['air', 'vent', 'fan', 'air conditioning', 'wind', 'cooling'],
  },
  {
    name: 'tornado',
    icon: TornadoIcon,
    keywords: ['tornado', 'wind', 'weather', 'spin', 'twister', 'whirlwind'],
  },
  {
    name: 'cloud-rain',
    icon: CloudRainIcon,
    keywords: ['cloud', 'rain', 'weather', 'cloud rain'],
  },
  {
    name: 'cloud-rain-wind',
    icon: CloudRainWindIcon,
    keywords: ['cloud', 'rain', 'wind', 'weather', 'cloud rain wind'],
  },
  {
    name: 'arrow-big-down-dash',
    icon: ArrowBigDownDashIcon,
    keywords: ['arrow', 'down', 'big', 'below', 'south', 'bottom', 'dash'],
  },
  {
    name: 'arrow-big-left-dash',
    icon: ArrowBigLeftDashIcon,
    keywords: ['arrow', 'left', 'big', 'below', 'west', 'dash'],
  },
  {
    name: 'arrow-big-right-dash',
    icon: ArrowBigRightDashIcon,
    keywords: ['arrow', 'right', 'big', 'below', 'east', 'dash'],
  },
  {
    name: 'arrow-big-up-dash',
    icon: ArrowBigUpDashIcon,
    keywords: ['arrow', 'up', 'big', 'above', 'north', 'dash'],
  },
  {
    name: 'moon',
    icon: MoonIcon,
    keywords: ['night', 'dark', 'moon'],
  },
  {
    name: 'facebook',
    icon: FacebookIcon,
    keywords: ['social', 'network', 'facebook'],
  },
  {
    name: 'twitter',
    icon: TwitterIcon,
    keywords: ['social', 'network', 'twitter', 'X'],
  },
  {
    name: 'linkedin',
    icon: LinkedinIcon,
    keywords: ['social', 'network', 'linkedin'],
  },
  {
    name: 'youtube',
    icon: YoutubeIcon,
    keywords: ['social', 'network', 'youtube'],
  },
  {
    name: 'instagram',
    icon: InstagramIcon,
    keywords: ['social', 'network', 'instagram'],
  },
  {
    name: 'twitch',
    icon: TwitchIcon,
    keywords: ['social', 'network', 'twitch'],
  },
  {
    name: 'dribbble',
    icon: DribbbleIcon,
    keywords: ['social', 'network', 'dribbble'],
  },
  {
    name: 'discord',
    icon: DiscordIcon,
    keywords: ['social', 'network', 'discord'],
  },
  {
    name: 'search',
    icon: SearchIcon,
    keywords: ['find', 'scan', 'magnifier', 'magnifying glass'],
  },
  {
    name: 'cloud-sun',
    icon: CloudSunIcon,
    keywords: ['weather', 'sun', 'cloud', 'light', 'bright'],
  },
  {
    name: 'sunset',
    icon: SunsetIcon,
    keywords: ['sun', 'sunset', 'weather', 'bright', 'dawn', 'evening'],
  },
  {
    name: 'sun-dim',
    icon: SunDimIcon,
    keywords: ['sun', 'dim', 'weather', 'light', 'day'],
  },
  {
    name: 'sun-medium',
    icon: SunMediumIcon,
    keywords: ['sun', 'medium', 'weather', 'light', 'day'],
  },
  {
    name: 'sun-moon',
    icon: SunMoonIcon,
    keywords: ['sun', 'moon', 'day', 'night', 'evening'],
  },
  {
    name: 'cart',
    icon: CartIcon,
    keywords: [
      'trolley',
      'cart',
      'basket',
      'e-commerce',
      'store',
      'purchase',
      'products',
      'items',
      'ingredients',
    ],
  },
  {
    name: 'stethoscope',
    icon: StethoscopeIcon,
    keywords: ['phonendoscope', 'medical', 'heart', 'lungs', 'sound'],
  },
  {
    name: 'circle-check',
    icon: CircleCheckIcon,
    keywords: ['done', 'todo', 'tick', 'complete', 'task'],
  },
  {
    name: 'earth',
    icon: EarthIcon,
    keywords: ['world', 'browser', 'language', 'translate', 'globe'],
  },
  {
    name: 'workflow',
    icon: WorkflowIcon,
    keywords: [
      'action',
      'continuous integration',
      'ci',
      'automation',
      'devops',
      'network',
      'node',
      'connection',
    ],
  },
  {
    name: 'logout',
    icon: LogoutIcon,
    keywords: ['sign out', 'arrow', 'exit', 'auth'],
  },
  {
    name: 'circle-help',
    icon: CircleHelpIcon,
    keywords: ['question mark'],
  },
  {
    name: 'user',
    icon: UserIcon,
    keywords: ['person', 'account', 'contact'],
  },
  {
    name: 'flame',
    icon: FlameIcon,
    keywords: ['fire', 'flame', 'hot'],
  },
  {
    name: 'audio-lines',
    icon: AudioLinesIcon,
    keywords: [
      'graphic equaliser',
      'sound',
      'noise',
      'listen',
      'hearing',
      'hertz',
      'frequency',
      'wavelength',
      'vibrate',
      'sine',
      'synthesizer',
      'synthesiser',
      'levels',
      'track',
      'music',
      'playback',
      'radio',
      'broadcast',
      'airwaves',
      'voice',
      'vocals',
      'singer',
      'song',
    ],
  },
  {
    name: 'eye-off',
    icon: EyeOffIcon,
    keywords: [
      'view',
      'watch',
      'see',
      'hide',
      'conceal',
      'mask',
      'hidden',
      'visibility',
      'vision',
    ],
  },
  {
    name: 'square-stack',
    icon: SquareStackIcon,
    keywords: [
      'versions',
      'clone',
      'copy',
      'duplicate',
      'multiple',
      'revisions',
      'version control',
      'backup',
      'history',
    ],
  },
  {
    name: 'badge-alert',
    icon: BadgeAlertIcon,
    keywords: [
      'check',
      'verified',
      'unverified',
      'security',
      'safety',
      'issue',
    ],
  },
  {
    name: 'message-circle',
    icon: MessageCircleIcon,
    keywords: [
      'comment',
      'chat',
      'conversation',
      'dialog',
      'feedback',
      'speech bubble',
    ],
  },
  {
    name: 'message-circle-more',
    icon: MessageCircleMoreIcon,
    keywords: [
      'comment',
      'chat',
      'conversation',
      'dialog',
      'feedback',
      'speech bubble',
      'typing',
      'writing',
      'responding',
      'ellipsis',
      'etc',
    ],
  },
  {
    name: 'message-square',
    icon: MessageSquareIcon,
    keywords: [
      'comment',
      'chat',
      'conversation',
      'dialog',
      'feedback',
      'speech bubble',
      'message',
    ],
  },
  {
    name: 'message-square-more',
    icon: MessageSquareMoreIcon,
    keywords: [
      'comment',
      'chat',
      'conversation',
      'dialog',
      'feedback',
      'speech bubble',
      'typing',
      'writing',
      'message',
      'responding',
      'ellipsis',
      'etc',
    ],
  },
  {
    name: 'message-circle-dashed',
    icon: MessageCircleDashedIcon,
    keywords: [
      'comment',
      'chat',
      'conversation',
      'dialog',
      'feedback',
      'speech bubble',
      'typing',
      'writing',
      'message',
      'responding',
      'ellipsis',
      'etc',
    ],
  },
  {
    name: 'message-square-dashed',
    icon: MessageSquareDashedIcon,
    keywords: [
      'comment',
      'chat',
      'conversation',
      'dialog',
      'feedback',
      'speech bubble',
      'typing',
      'writing',
      'message',
      'responding',
      'ellipsis',
      'etc',
    ],
  },
  {
    name: 'clipboard-check',
    icon: ClipboardCheckIcon,
    keywords: ['clipboard', 'check', 'clipboard-check', 'clipboard-checkmark'],
  },
  {
    name: 'home',
    icon: HomeIcon,
    keywords: ['home', 'living', 'building', 'residence', 'architecture'],
  },
  {
    name: 'arrow-left',
    icon: ArrowLeftIcon,
    keywords: ['previous', 'back', 'direction', 'west', '<-'],
  },
  {
    name: 'arrow-right',
    icon: ArrowRightIcon,
    keywords: ['forward', 'next', 'direction', 'east', '->'],
  },
  {
    name: 'expand',
    icon: ExpandIcon,
    keywords: ['scale', 'fullscreen'],
  },
  {
    name: 'route',
    icon: RouteIcon,
    keywords: ['path', 'journey', 'planner', 'points', 'stops', 'stations'],
  },
  {
    name: 'airplane',
    icon: AirplaneIcon,
    keywords: [
      'flight',
      'path',
      'journey',
      'planner',
      'points',
      'stops',
      'stations',
    ],
  },
  {
    name: 'refresh-ccw',
    icon: RefreshCCWIcon,
    keywords: [
      'arrows',
      'rotate',
      'reload',
      'rerun',
      'synchronise',
      'synchronize',
      'circular',
      'cycle',
    ],
  },
  { name: 'undo', icon: UndoIcon, keywords: ['redo', 'rerun', 'history'] },
  {
    name: 'download',
    icon: DownloadIcon,
    keywords: ['import', 'export', 'save'],
  },
  {
    name: 'square-pen',
    icon: SquarePenIcon,
    keywords: [
      'pencil',
      'change',
      'create',
      'draw',
      'sketch',
      'draft',
      'writer',
      'writing',
      'biro',
      'ink',
      'marker',
      'felt tip',
      'stationery',
      'artist',
    ],
  },
  {
    name: 'delete',
    icon: DeleteIcon,
    keywords: ['garbage', 'delete', 'remove', 'bin'],
  },
  {
    name: 'settings',
    icon: SettingsIcon,
    keywords: ['settings', 'filters', 'controls'],
  },
  {
    name: 'settings-gear',
    icon: SettingsGearIcon,
    keywords: ['cog', 'edit', 'gear', 'preferences'],
  },
  {
    name: 'calendar-cog',
    icon: CalendarCogIcon,
    keywords: [
      'date',
      'day',
      'month',
      'year',
      'events',
      'settings',
      'gear',
      'cog',
    ],
  },
  {
    name: 'cursor-click',
    icon: CursorClickIcon,
    keywords: ['click', 'select'],
  },
  {
    name: 'menu',
    icon: MenuIcon,
    keywords: ['bars', 'navigation', 'hamburger', 'options'],
  },
  {
    name: 'clock',
    icon: ClockIcon,
    keywords: ['time', 'watch', 'alarm'],
  },
  {
    name: 'file-stack',
    icon: FileStackIcon,
    keywords: [
      'versions',
      'multiple',
      'copy',
      'documents',
      'revisions',
      'version control',
      'history',
    ],
  },
  {
    name: 'file-pen-line',
    icon: FilePenLineIcon,
    keywords: ['edit'],
  },
  {
    name: 'archive',
    icon: ArchiveIcon,
    keywords: ['index', 'backup', 'box', 'storage', 'records'],
  },
  {
    name: 'copy',
    icon: CopyIcon,
    keywords: ['clone', 'duplicate', 'multiple'],
  },
  {
    name: 'attach-file',
    icon: AttachFileIcon,
    keywords: ['attachment', 'file'],
  },
  { name: 'alarm-clock', icon: AlarmClockIcon, keywords: ['morning'] },
  { name: 'bold', icon: BoldIcon, keywords: ['text', 'strong', 'format'] },
  {
    name: 'italic',
    icon: ItalicIcon,
    keywords: ['oblique', 'text', 'format'],
  },
  {
    name: 'underline',
    icon: UnderlineIcon,
    keywords: ['text', 'format'],
  },
  {
    name: 'scan-text',
    icon: ScanTextIcon,
    keywords: ['recognition', 'read', 'translate', 'copy', 'lines'],
  },
  {
    name: 'languages',
    icon: LanguagesIcon,
    keywords: ['translate'],
  },
  {
    name: 'at-sign',
    icon: AtSignIcon,
    keywords: ['mention', 'at', 'email', 'message', '@'],
  },
  {
    name: 'bell',
    icon: BellIcon,
    keywords: ['alarm', 'notification', 'sound', 'reminder'],
  },
  {
    name: 'users',
    icon: UsersIcon,
    keywords: ['group', 'people'],
  },
  {
    name: 'upvote',
    icon: UpvoteIcon,
    keywords: ['like', 'good', 'emotion'],
  },
  {
    name: 'downvote',
    icon: DownvoteIcon,
    keywords: ['dislike', 'bad', 'emotion'],
  },
  {
    name: 'circle-dollar-sign',
    icon: CircleDollarSignIcon,
    keywords: ['monetization', 'marketing', 'currency', 'money', 'payment'],
  },
  {
    name: 'hand-coins',
    icon: HandCoinsIcon,
    keywords: [
      'savings',
      'banking',
      'money',
      'finance',
      'offers',
      'mortgage',
      'payment',
      'received',
      'wage',
      'payroll',
      'allowance',
      'pocket money',
      'handout',
      'pennies',
    ],
  },
  {
    name: 'badge-percent',
    icon: BadgePercentIcon,
    keywords: [
      'verified',
      'unverified',
      'sale',
      'discount',
      'offer',
      'marketing',
      'sticker',
      'price tag',
    ],
  },
  {
    name: 'chart-pie',
    icon: ChartPieIcon,
    keywords: ['statistics', 'analytics', 'diagram', 'presentation'],
  },
  {
    name: 'chart-scatter',
    icon: ChartScatterIcon,
    keywords: ['chart', 'analytics', 'scatter'],
  },
  {
    name: 'gauge',
    icon: GaugeIcon,
    keywords: [
      'dashboard',
      'dial',
      'meter',
      'speed',
      'pressure',
      'measure',
      'level',
    ],
  },
  {
    name: 'pen-tool',
    icon: PenToolIcon,
    keywords: ['vector', 'drawing', 'path'],
  },
  {
    name: 'fingerprint',
    icon: FingerprintIcon,
    keywords: ['2fa', 'authentication', 'biometric', 'identity', 'security'],
  },
  {
    name: 'link',
    icon: LinkIcon,
    keywords: ['chain', 'url'],
  },
  {
    name: 'layers',
    icon: LayersIcon,
    keywords: [
      'stack',
      'pile',
      'pages',
      'sheets',
      'paperwork',
      'copies',
      'copy',
    ],
  },
  {
    name: 'grip',
    icon: GripIcon,
    keywords: ['grab', 'dots', 'handle', 'move', 'drag'],
  },
  {
    name: 'git-pull-request',
    icon: GitPullRequestIcon,
    keywords: ['code', 'version control', 'open'],
  },
  {
    name: 'github',
    icon: GithubIcon,
    keywords: ['logo', 'version control', 'repository', 'source code', 'git'],
  },
  {
    name: 'connect',
    icon: ConnectIcon,
    keywords: [
      'electricity',
      'energy',
      'electronics',
      'socket',
      'outlet',
      'disconnect',
    ],
  },
  {
    name: 'volume',
    icon: VolumeIcon,
    keywords: ['music', 'sound', 'mute', 'speaker'],
  },
  {
    name: 'sun',
    icon: SunIcon,
    keywords: ['brightness', 'weather', 'light', 'summer'],
  },
  {
    name: 'party-popper',
    icon: PartyPopperIcon,
    keywords: [
      'emoji',
      'congratulations',
      'celebration',
      'party',
      'tada',
      '🎉',
      '🎊',
      'excitement',
      'exciting',
      'excites',
      'confetti',
    ],
  },
  {
    name: 'frame',
    icon: FrameIcon,
    keywords: ['logo', 'design', 'tool'],
  },
  {
    name: 'bone',
    icon: BoneIcon,
    keywords: ['health', 'skeleton', 'skull', 'death', 'pets', 'dog'],
  },
  {
    name: 'align-center',
    icon: AlignCenterIcon,
    keywords: ['text', 'alignment', 'center'],
  },
  {
    name: 'align-vertical',
    icon: AlignVerticalIcon,
    keywords: ['center', 'items', 'flex', 'justify', 'distribute', 'between'],
  },
  {
    name: 'align-horizontal',
    icon: AlignHorizontalIcon,
    keywords: ['center', 'items', 'flex', 'justify', 'distribute', 'between'],
  },
  {
    name: 'compass',
    icon: CompassIcon,
    keywords: [
      'direction',
      'navigation',
      'north',
      'south',
      'east',
      'west',
      'compass',
    ],
  },
  {
    name: 'shield-check',
    icon: ShieldCheckIcon,
    keywords: ['security', 'verified', 'safe', 'protection', 'secure'],
  },
  {
    name: 'trending-down',
    icon: TrendingDownIcon,
    keywords: ['down', 'trend', 'graph', 'downward', 'decrease', 'statistics'],
  },
  {
    name: 'trending-up',
    icon: TrendingUpIcon,
    keywords: ['up', 'trend', 'graph', 'upward', 'increase', 'statistics'],
  },
  {
    name: 'trending-up-down',
    icon: TrendingUpDownIcon,
    keywords: [
      'up',
      'trend',
      'graph',
      'upward',
      'increase',
      'statistics',
      'down',
      'trend',
      'graph',
      'downward',
      'decrease',
    ],
  },
  {
    name: 'timer',
    icon: TimerIcon,
    keywords: ['time', 'watch', 'alarm', 'stopwatch', 'stopwatch'],
  },
  {
    name: 'bluetooth-searching',
    icon: BluetoothSearchingIcon,
    keywords: ['tool', 'connection', 'network'],
  },
  {
    name: 'bluetooth-connected',
    icon: BluetoothConnectedIcon,
    keywords: ['tool', 'connection', 'network'],
  },
  {
    name: 'bluetooth-off',
    icon: BluetoothOffIcon,
    keywords: ['tool', 'connection', 'network'],
  },
  {
    name: 'flask',
    icon: FlaskIcon,
    keywords: [
      'beaker',
      'erlenmeyer',
      'lab',
      'chemistry',
      'experiment',
      'test',
    ],
  },
  {
    name: 'syringe',
    icon: SyringeIcon,
    keywords: [
      'medicine',
      'medical',
      'needle',
      'pump',
      'plunger',
      'nozzle',
      'blood',
    ],
  },
  {
    name: 'play',
    icon: PlayIcon,
    keywords: ['video', 'play', 'start'],
  },
  {
    name: 'pause',
    icon: PauseIcon,
    keywords: ['video', 'pause', 'stop'],
  },
  {
    name: 'chart-column-decreasing',
    icon: ChartColumnDecreasingIcon,
    keywords: ['chart', 'column', 'decreasing'],
  },
  {
    name: 'chart-column-increasing',
    icon: ChartColumnIncreasingIcon,
    keywords: ['chart', 'column', 'increasing'],
  },
  {
    name: 'chart-bar-decreasing',
    icon: ChartBarDecreasingIcon,
    keywords: ['chart', 'bar', 'decreasing'],
  },
  {
    name: 'chart-bar-increasing',
    icon: ChartBarIncreasingIcon,
    keywords: ['chart', 'bar', 'increasing'],
  },
  {
    name: 'chevron-down',
    icon: ChevronDownIcon,
    keywords: ['chevron', 'down', 'expand', 'unfold', 'vertical'],
  },
  {
    name: 'chevron-up',
    icon: ChevronUpIcon,
    keywords: ['chevron', 'up', 'collapse', 'fold', 'vertical'],
  },
  {
    name: 'chevron-left',
    icon: ChevronLeftIcon,
    keywords: ['chevron', 'left', 'previous', 'back', 'direction'],
  },
  {
    name: 'chevron-right',
    icon: ChevronRightIcon,
    keywords: ['chevron', 'right', 'next', 'forward', 'direction'],
  },
  {
    name: 'chevrons-up-down',
    icon: ChevronsUpDownIcon,
    keywords: ['expand', 'unfold', 'vertical', 'chevron'],
  },
  {
    name: 'chevrons-down-up',
    icon: ChevronsDownUpIcon,
    keywords: ['collapse', 'fold', 'vertical', 'chevron'],
  },
  {
    name: 'chevrons-left-right',
    icon: ChevronsLeftRightIcon,
    keywords: ['expand', 'unfold', 'horizontal', 'chevron'],
  },
  {
    name: 'chevrons-right-left',
    icon: ChevronsRightLeftIcon,
    keywords: ['collapse', 'fold', 'horizontal', 'chevron'],
  },
  {
    name: 'circle-chevron-down',
    icon: CircleChevronDownIcon,
    keywords: ['back', 'menu', 'chevron'],
  },
  {
    name: 'circle-chevron-left',
    icon: CircleChevronLeftIcon,
    keywords: [
      'back',
      'previous',
      'less than',
      'fewer',
      'menu',
      '<',
      'chevron',
    ],
  },
  {
    name: 'circle-chevron-right',
    icon: CircleChevronRightIcon,
    keywords: [
      'next',
      'forward',
      'more than',
      'greater',
      'menu',
      '>',
      'chevron',
    ],
  },
  {
    name: 'square-chevron-down',
    icon: SquareChevronDownIcon,
    keywords: ['chevron', 'down', 'expand'],
  },
  {
    name: 'square-chevron-up',
    icon: SquareChevronUpIcon,
    keywords: ['chevron', 'up', 'collapse'],
  },
  {
    name: 'square-chevron-right',
    icon: SquareChevronRightIcon,
    keywords: ['chevron', 'right', 'next'],
  },
  {
    name: 'square-chevron-left',
    icon: SquareChevronLeftIcon,
    keywords: ['chevron', 'left', 'previous'],
  },
  {
    name: 'a-arrow-down',
    icon: AArrowDownIcon,
    keywords: ['arrow', 'down', 'a'],
  },
  {
    name: 'circle-dashed',
    icon: CircleDashedIcon,
    keywords: ['dashed', 'circle', 'dashed circle'],
  },
  {
    name: 'circle-chevron-up',
    icon: CircleChevronUpIcon,
    keywords: ['caret', 'ahead', 'forward', 'menu', 'chevron'],
  },
  {
    name: 'check',
    icon: CheckIcon,
    keywords: ['done', 'todo', 'tick', 'complete', 'task'],
  },
  {
    name: 'check-check',
    icon: CheckCheckIcon,
    keywords: [
      'done',
      'received',
      'double',
      'todo',
      'tick',
      'complete',
      'task',
    ],
  },
  {
    name: 'id-card',
    icon: IdCardIcon,
    keywords: [
      'identification',
      'personal',
      'details',
      'profile',
      'card',
      'badge',
      'identity',
      'authentication',
      'secure',
    ],
  },
  {
    name: 'loader-pinwheel',
    icon: LoaderPinwheelIcon,
    keywords: [
      'loading',
      'wait',
      'busy',
      'progress',
      'throbber',
      'spinner',
      'spinning',
      'beach ball',
      'frozen',
      'freeze',
    ],
  },
  {
    name: 'rocking-chair',
    icon: RockingChairIcon,
    keywords: ['furniture', 'seat', 'rock', 'relax', 'sit', 'chair'],
  },
  {
    name: 'banana',
    icon: BananaIcon,
    keywords: ['fruit', 'food', 'yellow', 'tropical'],
  },
  {
    name: 'wifi',
    icon: WifiIcon,
    keywords: ['internet', 'electronic', 'connection', 'data'],
  },
  {
    name: 'chrome',
    icon: ChromeIcon,
    keywords: ['browser', 'google', 'internet', 'web', 'logo'],
  },
  {
    name: 'figma',
    icon: FigmaIcon,
    keywords: ['design', 'tool', 'logo'],
  },
  {
    name: 'fish-symbol',
    icon: FishSymbolIcon,
    keywords: [
      'fish',
      'seafood',
      'ocean',
      'marine',
      'dish',
      'restaurant',
      'course',
      'meal',
      'seafood',
      'pet',
      'sea',
      'marine',
    ],
  },
  {
    name: 'git-commit-vertical',
    icon: GitCommitVerticalIcon,
    keywords: [
      'code',
      'open',
      'version control ',
      'waypoint',
      'stop',
      'station',
    ],
  },
  {
    name: 'git-commit-horizontal',
    icon: GitCommitHorizontalIcon,
    keywords: [
      'code',
      'open',
      'version control ',
      'waypoint',
      'stop',
      'station',
    ],
  },
  {
    name: 'waypoints',
    icon: WaypointsIcon,
    keywords: [
      'indirection',
      'vpn',
      'virtual private network',
      'proxy',
      'connections',
      'bounce',
      'reroute',
      'path',
      'journey',
      'planner',
      'stops',
      'stations',
      'shared',
      'spread',
      'vira',
    ],
  },
  {
    name: 'ship',
    icon: ShipIcon,
    keywords: [
      'boat',
      'vessel',
      'sea',
      'ocean',
      'water',
      'transport',
      'knots',
      'nautical mile',
      'maritime',
      'sailing',
      'yacht',
      'cruise',
      'ocean liner',
      'tanker',
      'vessel',
      'navy',
      'trip',
    ],
  },
  {
    name: 'roller-coaster',
    icon: RollerCoasterIcon,
    keywords: [
      'ride',
      'fun',
      'amusement',
      'park',
      'thrill',
      'excitement',
      'attraction',
      'entertainment',
      'amusement park',
      'theme park',
      'funfair',
    ],
  },
  {
    name: 'drum',
    icon: DrumIcon,
    keywords: ['music', 'instrument', 'percussion', 'beat', 'rhythm', 'sound'],
  },
  {
    name: 'train-track',
    icon: TrainTrackIcon,
    keywords: ['railway', 'track', 'train', 'transport', 'travel', 'line'],
  },
  {
    name: 'webhook',
    icon: WebhookIcon,
    keywords: [
      'api',
      'integration',
      'web',
      'hook',
      'connect',
      'link',
      'push api',
      'callback',
    ],
  },
  {
    name: 'rabbit',
    icon: RabbitIcon,
    keywords: [
      'bunny',
      'hare',
      'animal',
      'mammal',
      'ears',
      'fluffy',
      'rodent',
      'pet',
      'pest',
      'bunny',
      'hare',
      'fast',
      'speed',
      'hop',
    ],
  },
  {
    name: 'cog',
    icon: CogIcon,
    keywords: [
      'gear',
      'settings',
      'preferences',
      'controls',
      'computing',
      'settings',
      'cog',
      'edit',
    ],
  },
  {
    name: 'cpu',
    icon: CpuIcon,
    keywords: [
      'processor',
      'chip',
      'computer',
      'hardware',
      'central processing unit',
      'computing',
      'cores',
      'technology',
      'circuit',
      'memory',
      'ram',
      'specs',
      'gigahertz',
      'ghz',
    ],
  },
  {
    name: 'sparkles',
    icon: SparklesIcon,
    keywords: ['sparkles', 'sparkle', 'star', 'stars', 'shine', 'shining'],
  },
  {
    name: 'rocket',
    icon: RocketIcon,
    keywords: ['launch', 'space', 'boost', 'release', 'version'],
  },
  {
    name: 'activity',
    icon: ActivityIcon,
    keywords: [
      'pulse',
      'action',
      'motion/react',
      'movement',
      'exercise',
      'fitness',
      'healthcare',
      'heart rate monitor',
      'vital signs',
      'vitals',
      'emergency room',
      'er',
      'intensive care',
      'hospital',
      'defibrillator',
      'earthquake',
      'siesmic',
      'magnitude',
      'richter scale',
      'aftershock',
      'tremor',
      'shockwave',
      'audio',
      'waveform',
      'synthesizer',
      'synthesiser',
      'music',
    ],
  },
  {
    name: 'ban',
    icon: BanIcon,
    keywords: ['ban', 'stop', 'prevent', 'no'],
  },
  {
    name: 'map-pin',
    icon: MapPinIcon,
    keywords: ['map', 'pin', 'marker', 'location', 'address'],
  },
  {
    name: 'map-pin-check-inside',
    icon: MapPinCheckInsideIcon,
    keywords: [
      'map',
      'pin',
      'marker',
      'location',
      'address',
      'waypoint',
      'done',
      'tick',
      'complete',
      'task',
      'added',
    ],
  },
  {
    name: 'map-pin-minus-inside',
    icon: MapPinMinusInsideIcon,
    keywords: [
      'map',
      'pin',
      'marker',
      'location',
      'address',
      'waypoint',
      'delete',
      'remove',
      'erase',
    ],
  },
  {
    name: 'map-pin-plus-inside',
    icon: MapPinPlusInsideIcon,
    keywords: [
      'map',
      'pin',
      'marker',
      'location',
      'address',
      'waypoint',
      'add',
      'create',
      'new',
    ],
  },
  {
    name: 'map-pin-off',
    icon: MapPinOffIcon,
    keywords: [
      'map',
      'pin',
      'marker',
      'location',
      'address',
      'waypoint',
      'off',
      'remove',
      'non available',
      'invalid',
    ],
  },
  {
    name: 'map-pin-check',
    icon: MapPinCheckIcon,
    keywords: [
      'map',
      'pin',
      'marker',
      'location',
      'address',
      'waypoint',
      'done',
      'tick',
      'complete',
      'task',
      'added',
    ],
  },
  {
    name: 'map-pin-house',
    icon: MapPinHouseIcon,
    keywords: [
      'map',
      'pin',
      'marker',
      'location',
      'address',
      'waypoint',
      'home',
      'living',
      'place',
      'landmark',
    ],
  },
  {
    name: 'map-pin-minus',
    icon: MapPinMinusIcon,
    keywords: [
      'map',
      'pin',
      'marker',
      'location',
      'address',
      'waypoint',
      'delete',
      'remove',
      'erase',
    ],
  },
  {
    name: 'map-pin-plus',
    icon: MapPinPlusIcon,
    keywords: [
      'map',
      'pin',
      'marker',
      'location',
      'address',
      'waypoint',
      'add',
      'create',
      'new',
    ],
  },
  {
    name: 'map-pin-x-inside',
    icon: MapPinXInsideIcon,
    keywords: [
      'map',
      'pin',
      'marker',
      'location',
      'address',
      'waypoint',
      'delete',
      'remove',
      'erase',
    ],
  },
  {
    name: 'battery-full',
    icon: BatteryFullIcon,
    keywords: ['battery', 'power', 'energy', 'full', 'charge'],
  },
  {
    name: 'terminal',
    icon: TerminalIcon,
    keywords: ['terminal', 'console', 'command line', 'shell', 'prompt'],
  },
  {
    name: 'keyboard',
    icon: KeyboardIcon,
    keywords: ['keyboard', 'input', 'text', 'type', 'input method'],
  },
  {
    name: 'clap',
    icon: ClapIcon,
    keywords: [
      'clap',
      'movie',
      'film',
      'video',
      'camera',
      'cinema',
      'cut',
      'action',
      'television',
      'tv',
      'show',
      'entertainment',
    ],
  },
  {
    name: 'layout-panel-top',
    icon: LayoutPanelTopIcon,
    keywords: [
      'window',
      'webpage',
      'block',
      'section',
      'grid',
      'template',
      'structure',
    ],
  },
  {
    name: 'book-text',
    icon: BookTextIcon,
    keywords: [
      'reading',
      'booklet',
      'magazine',
      'leaflet',
      'pamphlet',
      'tome',
      'library',
    ],
  },
  {
    name: 'shower-head',
    icon: ShowerHeadIcon,
    keywords: ['shower', 'bath', 'bathroom', 'amenities', 'services'],
  },
  {
    name: 'telescope',
    icon: TelescopeIcon,
    keywords: [
      'telescope',
      'astronomy',
      'space',
      'discovery',
      'exploration',
      'explore',
      'vision',
      'perspective',
      'focus',
      'stargazing',
      'observe',
      'view',
    ],
  },
  {
    name: 'wind',
    icon: WindIcon,
    keywords: ['wind', 'weather', 'air', 'blow'],
  },
  {
    name: 'angry',
    icon: AngryIcon,
    keywords: ['mad', 'upset', 'angry', 'furious', 'emotion', 'face'],
  },
  {
    name: 'cctv',
    icon: CctvIcon,
    keywords: [
      'cctv',
      'camera',
      'surveillance',
      'recording',
      'film',
      'videotape',
      'crime',
      'watching',
    ],
  },
  {
    name: 'coffee',
    icon: CoffeeIcon,
    keywords: [
      'coffee',
      'drink',
      'cup',
      'mug',
      'tea',
      'cafe',
      'hot',
      'beverage',
    ],
  },
  {
    name: 'arrow-down-a-z',
    icon: ArrowDownAZIcon,
    keywords: [
      'filter',
      'sort',
      'ascending',
      'descending',
      'increasing',
      'decreasing',
      'rising',
      'falling',
      'alphabetical',
    ],
  },
  {
    name: 'arrow-down-z-a',
    icon: ArrowDownZAIcon,
    keywords: [
      'filter',
      'sort',
      'ascending',
      'descending',
      'increasing',
      'decreasing',
      'rising',
      'falling',
      'alphabetical',
    ],
  },
  {
    name: 'arrow-down-0-1',
    icon: ArrowDown01con,
    keywords: [
      'filter',
      'sort',
      'ascending',
      'descending',
      'increasing',
      'decreasing',
      'rising',
      'falling',
      'numerical',
    ],
  },
  {
    name: 'arrow-down-1-0',
    icon: ArrowDown10Icon,
    keywords: [
      'filter',
      'sort',
      'ascending',
      'descending',
      'increasing',
      'decreasing',
      'rising',
      'falling',
      'numerical',
    ],
  },
  {
    name: 'x',
    icon: XIcon,
    keywords: ['x', 'close', 'delete', 'remove', 'cancel', 'exit', 'stop'],
  },
  {
    name: 'cast',
    icon: CastIcon,
    keywords: ['cast', 'screen', 'chromecast', 'airplay'],
  },
  {
    name: 'upload',
    icon: UploadIcon,
    keywords: ['upload', 'send', 'share'],
  },
  {
    name: 'file-cog',
    icon: FileCogIcon,
    keywords: ['file', 'cog', 'settings', 'preferences', 'controls'],
  },
  {
    name: 'calendar-days',
    icon: CalendarDaysIcon,
    keywords: ['calendar', 'days', 'days of the week', 'week', 'month'],
  },
  {
    name: 'chart-line',
    icon: ChartLineIcon,
    keywords: ['chart', 'line', 'increasing', 'linechart', 'chartline'],
  },
  {
    name: 'file-chart-line',
    icon: FileChartLineIcon,
    keywords: [
      'file',
      'chart',
      'line',
      'increasing',
      'filechartline',
      'filechartline',
    ],
  },
  {
    name: 'chart-no-axes-column-increasing',
    icon: ChartNoAxesColumnIncreasingIcon,
    keywords: ['chart', 'column', 'increasing', 'chartnoaxes'],
  },
  {
    name: 'chart-no-axes-column-decreasing',
    icon: ChartNoAxesColumnDecreasingIcon,
    keywords: ['chart', 'column', 'decreasing', 'chartnoaxes'],
  },
  {
    name: 'radio',
    icon: RadioIcon,
    keywords: [
      'radio',
      'signal',
      'broadcast',
      'wireless',
      'frequency',
      'connectivity',
      'live',
    ],
  },
  {
    name: 'radio-tower',
    icon: RadioTowerIcon,
    keywords: [
      'radio',
      'tower',
      'radio tower',
      'signal',
      'broadcast',
      'wireless',
      'frequency',
      'connectivity',
      'live',
    ],
  },
  {
    name: 'blocks',
    icon: BlocksIcon,
    keywords: [
      'block',
      'blocks',
      'addon',
      'plugin',
      'integration',
      'extension',
      'package',
      'build',
      'stack',
      'toys',
      'kids',
      'children',
      'learning',
    ],
  },
  {
    name: 'calendar-check',
    icon: CalendarCheckIcon,
    keywords: [
      'calendar',
      'check',
      'checkmark',
      'tick',
      'done',
      'confirm',
      'complete',
    ],
  },
  {
    name: 'calendar-check-2',
    icon: CalendarCheck2Icon,
    keywords: [
      'calendar',
      'check',
      'checkmark',
      'tick',
      'done',
      'confirm',
      'complete',
    ],
  },
  {
    name: 'file-check',
    icon: FileCheckIcon,
    keywords: [
      'file',
      'check',
      'checkmark',
      'tick',
      'done',
      'document',
      'confirm',
      'complete',
    ],
  },
  {
    name: 'file-check-2',
    icon: FileCheck2Icon,
    keywords: [
      'file',
      'check',
      'checkmark',
      'tick',
      'done',
      'document',
      'confirm',
      'complete',
    ],
  },
  {
    name: 'mail-check',
    icon: MailCheckIcon,
    keywords: [
      'mail',
      'check',
      'checkmark',
      'tick',
      'done',
      'email',
      'confirm',
      'complete',
      'delivered',
      'message',
      'sent',
    ],
  },
  {
    name: 'monitor-check',
    icon: MonitorCheckIcon,
    keywords: [
      'monitor',
      'check',
      'checkmark',
      'tick',
      'done',
      'confirm',
      'complete',
      'tv',
      'screen',
      'display',
      'desktop',
      'running',
      'active',
      'virtual machine',
      'vm',
    ],
  },
  {
    name: 'laptop-minimal-check',
    icon: LaptopMinimalCheckIcon,
    keywords: [
      'laptop',
      'check',
      'checkmark',
      'tick',
      'done',
      'confirm',
      'complete',
      'computer',
      'laptop',
      'running',
      'active',
      'virtual machine',
      'vm',
    ],
  },
  {
    name: 'gallery-horizontal-end',
    icon: GalleryHorizontalEndIcon,
    keywords: [
      'gallery',
      'horizontal',
      'end',
      'last',
      'carousel',
      'pictures',
      'images',
      'scroll',
      'swipe',
      'album',
      'portfolio',
      'history',
      'versions',
      'backup',
      'time machine',
    ],
  },
  {
    name: 'gallery-vertical-end',
    icon: GalleryVerticalEndIcon,
    keywords: [
      'carousel',
      'pictures',
      'images',
      'scroll',
      'swipe',
      'album',
      'portfolio',
      'history',
      'versions',
      'backup',
      'time machine',
    ],
  },
  {
    name: 'hand-heart',
    icon: HandHeartIcon,
    keywords: [
      'hand',
      'heart',
      'love',
      'affection',
      'hug',
      'cuddle',
      'emotion',
    ],
  },
  {
    name: 'gallery-thumbnails',
    icon: GalleryThumbnailsIcon,
    keywords: [
      'gallery',
      'thumbnails',
      'images',
      'carousel',
      'pictures',
      'album',
      'portfolio',
      'preview',
    ],
  },
  {
    name: 'user-check',
    icon: UserCheckIcon,
    keywords: [
      'user',
      'check',
      'checkmark',
      'tick',
      'done',
      'confirm',
      'complete',
    ],
  },
  {
    name: 'user-round-check',
    icon: UserRoundCheckIcon,
    keywords: [
      'user',
      'check',
      'checkmark',
      'tick',
      'done',
      'confirm',
      'complete',
    ],
  },
  {
    name: 'boxes',
    icon: BoxesIcon,
    keywords: ['boxes', 'box', 'container', 'package', 'shipping'],
  },
  {
    name: 'file-text',
    icon: FileTextIcon,
    keywords: ['file', 'text', 'document', 'document', 'document'],
  },
  {
    name: 'user-round-plus',
    icon: UserRoundPlusIcon,
    keywords: [
      'user',
      'plus',
      'add',
      'create',
      'new'
    ],
  },
  {
    name: 'panel-left-open',
    icon: PanelLeftOpenIcon,
    keywords: [
      'panel',
      'left',
      'open',
      'menu',
      'navigation'
    ],
  },
  {
    name: 'panel-left-close',
    icon: PanelLeftCloseIcon,
    keywords: [
      'panel',
      'left',
      'close',
      'menu',
      'navigation'
    ],
  },
  {
    name: 'panel-right-open',
    icon: PanelRightOpenIcon,
    keywords: [
      'panel',
      'right',
      'open',
      'menu',
      'navigation'
    ],
  },
];

export { ICON_LIST };
```

### `components/ui/icons/instagram.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";

export interface InstagramIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface InstagramIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const rectVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: "linear",
			opacity: { duration: 0.1 },
		},
	},
};

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: "linear",
			opacity: { duration: 0.1 },
		},
	},
};

const lineVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: "linear",
			opacity: { duration: 0.1 },
		},
	},
};

const InstagramIcon = forwardRef<InstagramIconHandle, InstagramIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const rectControls = useAnimation();
		const pathControls = useAnimation();
		const lineControls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => {
					rectControls.start("animate");
					pathControls.start("animate");
					lineControls.start("animate");
				},
				stopAnimation: () => {
					rectControls.start("normal");
					pathControls.start("normal");
					lineControls.start("normal");
				},
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					rectControls.start("animate");
					pathControls.start("animate");
					lineControls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[lineControls, onMouseEnter, pathControls, rectControls]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					rectControls.start("normal");
					pathControls.start("normal");
					lineControls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[rectControls, pathControls, lineControls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.rect
						variants={rectVariants}
						initial="normal"
						animate={rectControls}
						x="2"
						y="2"
						width="20"
						height="20"
						rx="5"
						ry="5"
					/>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={pathControls}
						d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
					/>
					<motion.line
						variants={lineVariants}
						initial="normal"
						animate={lineControls}
						x1="17.5"
						y1="6.5"
						x2="17.51"
						y2="6.5"
					/>
				</svg>
			</div>
		);
	}
);

InstagramIcon.displayName = "InstagramIcon";

export { InstagramIcon };
```

### `components/ui/icons/italic.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ItalicIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ItalicIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const lineVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		pathOffset: [1, 0],
	},
};

const ItalicIcon = forwardRef<ItalicIconHandle, ItalicIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.line
						transition={{ duration: 0.2 }}
						variants={lineVariants}
						animate={controls}
						x1="19"
						x2="10"
						y1="4"
						y2="4"
					/>
					<motion.line
						transition={{ duration: 0.2 }}
						variants={lineVariants}
						animate={controls}
						x1="14"
						x2="5"
						y1="20"
						y2="20"
					/>
					<motion.line
						transition={{
							delay: 0.1,
							duration: 0.4,
						}}
						variants={{
							normal: { pathLength: 1, pathOffset: 0 },
							animate: {
								pathLength: [0, 1],
								pathOffset: [1, 0],
							},
						}}
						animate={controls}
						x1="15"
						x2="9"
						y1="4"
						y2="20"
					/>
				</svg>
			</div>
		);
	}
);

ItalicIcon.displayName = "ItalicIcon";

export { ItalicIcon };
```

### `components/ui/icons/key-circle.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface KeyIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface KeyIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const KeyCircleIcon = forwardRef<KeyIconHandle, KeyIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={{
						normal: { y: 0, rotate: 0 },
						animate: {
							y: [0, -3, 0, -2, 0],
							rotate: [0, 3, -3, 0],
						},
					}}
					transition={{
						duration: 0.9,
						bounce: 0.5,
					}}
					animate={controls}
				>
					<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
					<circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
				</motion.svg>
			</div>
		);
	}
);

KeyCircleIcon.displayName = "KeyCircleIcon";

export { KeyCircleIcon };
```

### `components/ui/icons/key-square.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface KeyIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface KeyIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const KeySquareIcon = forwardRef<KeyIconHandle, KeyIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={{
						normal: { rotate: 0, scale: 1 },
						animate: {
							rotate: [0, 15, -15, 0],
							scale: [1, 1.05, 1, 1],
						},
					}}
					transition={{
						duration: 0.6,
						bounce: 0.4,
					}}
					animate={controls}
				>
					<path d="M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z" />
					<path d="m14 7 3 3" />
					<path d="m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814" />
				</motion.svg>
			</div>
		);
	}
);

KeySquareIcon.displayName = "KeySquareIcon";

export { KeySquareIcon };
```

### `components/ui/icons/key.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface KeyIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface KeyIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const KeyIcon = forwardRef<KeyIconHandle, KeyIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					animate={controls}
					initial="normal"
					variants={{
						normal: {
							rotate: 0,
							transition: {
								type: "spring",
								stiffness: 120,
								damping: 14,
								duration: 0.8,
							},
						},
						animate: {
							rotate: [-3, -33, -25, -28],
							transition: {
								duration: 0.6,
								times: [0, 0.6, 0.8, 1],
								ease: "easeInOut",
							},
						},
					}}
					style={{ originX: 0.3, originY: 0.7 }}
				>
					<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
					<path d="m21 2-9.6 9.6" />
					<circle cx="7.5" cy="15.5" r="5.5" />
				</motion.svg>
			</div>
		);
	}
);

KeyIcon.displayName = "KeyIcon";

export { KeyIcon };
```

### `components/ui/icons/keyboard.tsx`

```tsx
"use client";

import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useAnimation } from "motion/react";

export interface KeyboardIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface KeyboardIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const KEYBOARD_PATHS = [
	{ id: "key1", d: "M10 8h.01" },
	{ id: "key2", d: "M12 12h.01" },
	{ id: "key3", d: "M14 8h.01" },
	{ id: "key4", d: "M16 12h.01" },
	{ id: "key5", d: "M18 8h.01" },
	{ id: "key6", d: "M6 8h.01" },
	{ id: "key7", d: "M7 16h10" },
	{ id: "key8", d: "M8 12h.01" },
];

const KeyboardIcon = forwardRef<KeyboardIconHandle, KeyboardIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const [isHovered, setIsHovered] = useState(false);
		const controls = useAnimation();

		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => setIsHovered(true),
				stopAnimation: () => setIsHovered(false),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					setIsHovered(true);
				} else {
					onMouseEnter?.(e);
				}
			},
			[onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					setIsHovered(false);
				} else {
					onMouseLeave?.(e);
				}
			},
			[onMouseLeave]
		);

		useEffect(() => {
			const animateKeys = async () => {
				if (isHovered) {
					await controls.start((i) => ({
						opacity: [1, 0.2, 1],
						transition: {
							duration: 1.5,
							times: [0, 0.5, 1],
							delay: i * 0.2 * Math.random(),
							repeat: 1,
							repeatType: "reverse",
						},
					}));
				} else {
					controls.stop();
					controls.set({ opacity: 1 });
				}
			};

			animateKeys();
		}, [isHovered, controls]);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<rect width="20" height="16" x="2" y="4" rx="2" />
					<AnimatePresence>
						{KEYBOARD_PATHS.map((path, index) => (
							<motion.path
								key={path.id}
								d={path.d}
								initial={{ opacity: 1 }}
								animate={controls}
								custom={index}
							/>
						))}
					</AnimatePresence>
				</svg>
			</div>
		);
	}
);

KeyboardIcon.displayName = "KeyboardIcon";

export { KeyboardIcon };
```

### `components/ui/icons/languages.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface LanguagesIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface LanguagesIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { opacity: 1, pathLength: 1, pathOffset: 0 },
	animate: (custom: number) => ({
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			opacity: { duration: 0.01, delay: custom * 0.1 },
			pathLength: {
				type: "spring",
				duration: 0.5,
				bounce: 0,
				delay: custom * 0.1,
			},
		},
	}),
};

const svgVariants: Variants = {
	normal: { opacity: 1 },
	animate: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

const LanguagesIcon = forwardRef<LanguagesIconHandle, LanguagesIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const svgControls = useAnimation();
		const pathControls = useAnimation();

		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => {
					svgControls.start("animate");
					pathControls.start("animate");
				},
				stopAnimation: () => {
					svgControls.start("normal");
					pathControls.start("normal");
				},
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					svgControls.start("animate");
					pathControls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[onMouseEnter, pathControls, svgControls]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					svgControls.start("normal");
					pathControls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[svgControls, pathControls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={svgVariants}
					animate={svgControls}
				>
					<motion.path
						d="m5 8 6 6"
						variants={pathVariants}
						custom={3}
						animate={pathControls}
					/>
					<motion.path
						d="m4 14 6-6 3-3"
						variants={pathVariants}
						custom={2}
						animate={pathControls}
					/>
					<motion.path
						d="M2 5h12"
						variants={pathVariants}
						custom={1}
						animate={pathControls}
					/>
					<motion.path
						d="M7 2h1"
						variants={pathVariants}
						custom={0}
						animate={pathControls}
					/>
					<motion.path
						d="m22 22-5-10-5 10"
						variants={pathVariants}
						custom={3}
						animate={pathControls}
					/>
					<motion.path
						d="M14 18h6"
						variants={pathVariants}
						custom={3}
						animate={pathControls}
					/>
				</motion.svg>
			</div>
		);
	}
);

LanguagesIcon.displayName = "LanguagesIcon";

export { LanguagesIcon };
```

### `components/ui/icons/laptop-minimal-check.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";

export interface LaptopMinimalCheckIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface LaptopMinimalCheckIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const checkVariants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
		transition: {
			duration: 0.3,
		},
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			pathLength: { duration: 0.4, ease: "easeInOut" },
			opacity: { duration: 0.4, ease: "easeInOut" },
		},
	},
};

const LaptopMinimalCheckIcon = forwardRef<
	LaptopMinimalCheckIconHandle,
	LaptopMinimalCheckIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M2 20h20" />
				<rect x="3" y="4" width="18" height="12" rx="2" />
				<motion.path
					animate={controls}
					initial="normal"
					variants={checkVariants}
					d="m9 10 2 2 4-4"
					style={{ transformOrigin: "center" }}
				/>
			</svg>
		</div>
	);
});

LaptopMinimalCheckIcon.displayName = "LaptopMinimalCheckIcon";

export { LaptopMinimalCheckIcon };
```

### `components/ui/icons/laugh.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface LaughIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface LaughIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const LaughIcon = forwardRef<LaughIconHandle, LaughIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("animate");
				onMouseEnter?.(e);
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("normal");
				onMouseLeave?.(e);
			},
			[controls, onMouseLeave]
		);

		const faceVariants: Variants = {
			normal: {
				scale: 1,
				rotate: 0,
				strokeWidth: 2,
				transition: { duration: 0.3, ease: "easeOut" },
			},
			animate: {
				scale: [1, 1.15, 1, 1.1, 1.05],
				rotate: [0, 3, -2, 3, 0],
				strokeWidth: [2, 2.5, 2.5, 2.5, 2],
				transition: {
					duration: 1.2,
					times: [0, 0.2, 0.4, 0.6, 1],
					ease: "easeInOut",
					repeat: 0,
					repeatType: "reverse",
				},
			},
		};

		const mouthVariants: Variants = {
			normal: {
				d: "M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z",
				pathLength: 1,
				strokeWidth: 2,
				transition: { duration: 0.3, ease: "easeOut" },
			},
			animate: {
				d: "M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z",
				pathLength: [0.7, 1, 1],
				strokeWidth: 2.5,
				scaleY: [1, 1.2, 1.1],
				y: [0, 0.5, 0.3],
				transition: {
					duration: 0.6,
					times: [0, 0.5, 1],
					ease: "easeInOut",
				},
			},
		};

		const eyeVariants: Variants = {
			normal: {
				scale: 1,
				opacity: 1,
				transition: { duration: 0.3, ease: "easeOut" },
			},
			animate: {
				scale: [1, 1.3, 1, 1.7],
				opacity: [1, 1, 1, 1],
				transition: {
					duration: 0.6,
					times: [0, 0.3, 0.6, 1],
					ease: "easeInOut",
				},
			},
		};

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					animate={controls}
					initial="normal"
					variants={faceVariants}
				>
					<circle cx="12" cy="12" r="10" />
					<motion.path
						variants={mouthVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.line
						x1="9"
						x2="9.01"
						y1="9"
						y2="9"
						variants={eyeVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.line
						x1="15"
						x2="15.01"
						y1="9"
						y2="9"
						variants={eyeVariants}
						animate={controls}
						initial="normal"
					/>
				</motion.svg>
			</div>
		);
	}
);

LaughIcon.displayName = "LaughIcon";

export { LaughIcon };
```

### `components/ui/icons/layers.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface LayersIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface LayersIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	type: "spring",
	stiffness: 100,
	damping: 14,
	mass: 1,
};

const LayersIcon = forwardRef<LayersIconHandle, LayersIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: async () => {
					await controls.start("firstState");
					await controls.start("secondState");
				},
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			async (e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					await controls.start("firstState");
					await controls.start("secondState");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
					<motion.path
						d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"
						variants={{
							normal: { y: 0 },
							firstState: { y: -9 },
							secondState: { y: 0 },
						}}
						animate={controls}
						transition={defaultTransition}
					/>
					<motion.path
						d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"
						variants={{
							normal: { y: 0 },
							firstState: { y: -5 },
							secondState: { y: 0 },
						}}
						animate={controls}
						transition={defaultTransition}
					/>
				</svg>
			</div>
		);
	}
);

LayersIcon.displayName = "LayersIcon";

export { LayersIcon };
```

### `components/ui/icons/layout-panel-top.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface LayoutPanelTopIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface LayoutPanelTopIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const LayoutPanelTopIcon = forwardRef<
	LayoutPanelTopIconHandle,
	LayoutPanelTopIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.rect
					width="18"
					height="7"
					x="3"
					y="3"
					rx="1"
					initial="normal"
					animate={controls}
					variants={{
						normal: { opacity: 1, translateY: 0 },
						animate: {
							opacity: [0, 1],
							translateY: [-5, 0],
							transition: {
								opacity: { duration: 0.5, times: [0.2, 1] },
								duration: 0.5,
							},
						},
					}}
				/>
				<motion.rect
					width="7"
					height="7"
					x="3"
					y="14"
					rx="1"
					initial="normal"
					animate={controls}
					variants={{
						normal: { opacity: 1, translateX: 0 },
						animate: {
							opacity: [0, 1],
							translateX: [-10, 0],
							transition: {
								opacity: { duration: 0.7, times: [0.5, 1] },
								translateX: { delay: 0.3 },
								duration: 0.5,
							},
						},
					}}
				/>
				<motion.rect
					width="7"
					height="7"
					x="14"
					y="14"
					rx="1"
					initial="normal"
					animate={controls}
					variants={{
						normal: { opacity: 1, translateX: 0 },
						animate: {
							opacity: [0, 1],
							translateX: [10, 0],
							transition: {
								opacity: { duration: 0.8, times: [0.5, 1] },
								translateX: { delay: 0.4 },
								duration: 0.5,
							},
						},
					}}
				/>
			</svg>
		</div>
	);
});

LayoutPanelTopIcon.displayName = "LayoutPanelTopIcon";

export { LayoutPanelTopIcon };
```

### `components/ui/icons/link.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface LinkIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface LinkIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	initial: { pathLength: 1, pathOffset: 0, rotate: 0 },
	animate: {
		pathLength: [1, 0.97, 1, 0.97, 1],
		pathOffset: [0, 0.05, 0, 0.05, 0],
		rotate: [0, -5, 0],
		transition: {
			rotate: {
				duration: 0.5,
			},
			duration: 1,
			times: [0, 0.2, 0.4, 0.6, 1],
			ease: "easeInOut",
		},
	},
};

const LinkIcon = forwardRef<LinkIconHandle, LinkIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
						variants={pathVariants}
						animate={controls}
					/>
					<motion.path
						d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
						variants={pathVariants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

LinkIcon.displayName = "LinkIcon";

export { LinkIcon };
```

### `components/ui/icons/linkedin.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";

export interface LinkedinIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface LinkedinIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: "linear",
			opacity: { duration: 0.1 },
		},
	},
};

const rectVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: "linear",
			opacity: { duration: 0.1 },
		},
	},
};

const circleVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: "linear",
			opacity: { duration: 0.1 },
		},
	},
};

const LinkedinIcon = forwardRef<LinkedinIconHandle, LinkedinIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const pathControls = useAnimation();
		const rectControls = useAnimation();
		const circleControls = useAnimation();

		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => {
					pathControls.start("animate");
					rectControls.start("animate");
					circleControls.start("animate");
				},
				stopAnimation: () => {
					pathControls.start("normal");
					rectControls.start("normal");
					circleControls.start("normal");
				},
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					pathControls.start("animate");
					rectControls.start("animate");
					circleControls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[circleControls, onMouseEnter, pathControls, rectControls]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					pathControls.start("normal");
					rectControls.start("normal");
					circleControls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[pathControls, rectControls, circleControls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					viewBox="0 0 24 24"
				>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={pathControls}
						d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
					/>
					<motion.rect
						variants={rectVariants}
						initial="normal"
						animate={rectControls}
						x="2"
						y="9"
						width="4"
						height="12"
					/>
					<motion.circle
						variants={circleVariants}
						initial="normal"
						animate={circleControls}
						cx="4"
						cy="4"
						r="2"
					/>
				</svg>
			</div>
		);
	}
);

LinkedinIcon.displayName = "LinkedinIcon";

export { LinkedinIcon };
```

### `components/ui/icons/loader-pinwheel.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface LoaderPinwheelIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface LoaderPinwheelIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const gVariants: Variants = {
	normal: { rotate: 0 }, // if you want to start from a different angle, change this value or remove it entirely
	animate: {
		rotate: 360,
		transition: {
			repeat: Infinity,
			duration: 1,
			ease: "linear",
		},
	},
};

const defaultTransition: Transition = {
	type: "spring",
	stiffness: 50,
	damping: 10,
};

const LoaderPinwheelIcon = forwardRef<
	LoaderPinwheelIconHandle,
	LoaderPinwheelIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.g
					transition={defaultTransition}
					variants={gVariants}
					animate={controls}
				>
					<path d="M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0" />
					<path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" />
					<path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" />
				</motion.g>
				<circle cx="12" cy="12" r="10" />
			</svg>
		</div>
	);
});

LoaderPinwheelIcon.displayName = "LoaderPinwheelIcon";

export { LoaderPinwheelIcon };
```

### `components/ui/icons/logout.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface LogoutIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface LogoutIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	animate: {
		x: 2,
		translateX: [0, -3, 0],
		transition: {
			duration: 0.4,
		},
	},
};

const LogoutIcon = forwardRef<LogoutIconHandle, LogoutIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
					<motion.polyline
						points="16 17 21 12 16 7"
						variants={pathVariants}
						animate={controls}
					/>
					<motion.line
						x1="21"
						x2="9"
						y1="12"
						y2="12"
						variants={pathVariants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

LogoutIcon.displayName = "LogoutIcon";

export { LogoutIcon };
```

### `components/ui/icons/mail-check.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";

export interface MailCheckIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MailCheckIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const checkVariants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
		transition: {
			duration: 0.3,
		},
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			pathLength: { duration: 0.4, ease: "easeInOut" },
			opacity: { duration: 0.4, ease: "easeInOut" },
		},
	},
};

const MailCheckIcon = forwardRef<MailCheckIconHandle, MailCheckIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
					<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
					<motion.path
						animate={controls}
						initial="normal"
						variants={checkVariants}
						d="m16 19 2 2 4-4"
						style={{ transformOrigin: "center" }}
					/>
				</svg>
			</div>
		);
	}
);

MailCheckIcon.displayName = "MailCheckIcon";

export { MailCheckIcon };
```

### `components/ui/icons/map-pin-check-inside.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface MapPinCheckInsideIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MapPinCheckInsideIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const svgVariants: Variants = {
	normal: {
		y: 0,
	},
	animate: {
		y: [0, -5, -3],
		transition: {
			duration: 0.5,
			times: [0, 0.6, 1],
			type: "spring",
			stiffness: 200,
			damping: 10,
		},
	},
};

const checkVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			delay: 0.3,
			duration: 0.3,
			opacity: { duration: 0.1, delay: 0.3 },
		},
	},
};

const MapPinCheckInsideIcon = forwardRef<
	MapPinCheckInsideIconHandle,
	MapPinCheckInsideIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				variants={svgVariants}
				initial="normal"
				animate={controls}
			>
				<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
				<motion.path
					d="m9 10 2 2 4-4"
					variants={checkVariants}
					initial="normal"
					animate={controls}
				/>
			</motion.svg>
		</div>
	);
});

MapPinCheckInsideIcon.displayName = "MapPinCheckInsideIcon";

export { MapPinCheckInsideIcon };
```

### `components/ui/icons/map-pin-check.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface MapPinCheckIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MapPinCheckIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const svgVariants: Variants = {
	normal: {
		y: 0,
	},
	animate: {
		y: [0, -5, -3],
		transition: {
			duration: 0.5,
			times: [0, 0.6, 1],
			type: "spring",
			stiffness: 200,
			damping: 10,
		},
	},
};

const checkVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			delay: 0.3,
			duration: 0.3,
			opacity: { duration: 0.1, delay: 0.3 },
		},
	},
};

const MapPinCheckIcon = forwardRef<MapPinCheckIconHandle, MapPinCheckIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={svgVariants}
					initial="normal"
					animate={controls}
				>
					<path d="M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728" />
					<circle cx="12" cy="10" r="3" />
					<motion.path
						d="m16 18 2 2 4-4"
						variants={checkVariants}
						initial="normal"
						animate={controls}
					/>
				</motion.svg>
			</div>
		);
	}
);

MapPinCheckIcon.displayName = "MapPinCheckIcon";

export { MapPinCheckIcon };
```

### `components/ui/icons/map-pin-house.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface MapPinHouseIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MapPinHouseIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const svgVariants: Variants = {
	normal: {
		y: 0,
	},
	animate: {
		y: [0, -5, -3],
		transition: {
			duration: 0.5,
			times: [0, 0.6, 1],
			type: "spring",
			stiffness: 200,
			damping: 10,
		},
	},
};

const houseVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			delay: 0.3,
			duration: 0.3,
			opacity: { duration: 0.1, delay: 0.3 },
		},
	},
};

const MapPinHouseIcon = forwardRef<MapPinHouseIconHandle, MapPinHouseIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={svgVariants}
					initial="normal"
					animate={controls}
				>
					<path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2" />
					<circle cx="10" cy="10" r="3" />
					<motion.path
						d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z M18 22v-3"
						variants={houseVariants}
						initial="normal"
						animate={controls}
					/>
				</motion.svg>
			</div>
		);
	}
);

MapPinHouseIcon.displayName = "MapPinHouseIcon";

export { MapPinHouseIcon };
```

### `components/ui/icons/map-pin-minus-inside.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface MapPinMinusInsideIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MapPinMinusInsideIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const svgVariants: Variants = {
	normal: {
		y: 0,
	},
	animate: {
		y: [0, -5, -3],
		transition: {
			duration: 0.5,
			times: [0, 0.6, 1],
			type: "spring",
			stiffness: 200,
			damping: 10,
		},
	},
};

const minusVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			delay: 0.3,
			duration: 0.3,
			opacity: { duration: 0.1, delay: 0.3 },
		},
	},
};

const MapPinMinusInsideIcon = forwardRef<
	MapPinMinusInsideIconHandle,
	MapPinMinusInsideIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				variants={svgVariants}
				initial="normal"
				animate={controls}
			>
				<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
				<motion.path
					d="M9 10h6"
					variants={minusVariants}
					initial="normal"
					animate={controls}
				/>
			</motion.svg>
		</div>
	);
});

MapPinMinusInsideIcon.displayName = "MapPinMinusInsideIcon";

export { MapPinMinusInsideIcon };
```

### `components/ui/icons/map-pin-minus.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface MapPinMinusIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MapPinMinusIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const svgVariants: Variants = {
	normal: {
		y: 0,
	},
	animate: {
		y: [0, -5, -3],
		transition: {
			duration: 0.5,
			times: [0, 0.6, 1],
			type: "spring",
			stiffness: 200,
			damping: 10,
		},
	},
};

const minusVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			delay: 0.3,
			duration: 0.3,
			opacity: { duration: 0.1, delay: 0.3 },
		},
	},
};

const MapPinMinusIcon = forwardRef<MapPinMinusIconHandle, MapPinMinusIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={svgVariants}
					initial="normal"
					animate={controls}
				>
					<path d="M18.977 14C19.6 12.701 20 11.343 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738" />
					<circle cx="12" cy="10" r="3" />
					<motion.path
						d="M16 18h6"
						variants={minusVariants}
						initial="normal"
						animate={controls}
					/>
				</motion.svg>
			</div>
		);
	}
);

MapPinMinusIcon.displayName = "MapPinMinusIcon";

export { MapPinMinusIcon };
```

### `components/ui/icons/map-pin-off.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface MapPinOffIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MapPinOffIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const svgVariants: Variants = {
	normal: {
		y: 0,
	},
	animate: {
		y: [0, -5, -3],
		transition: {
			duration: 0.5,
			times: [0, 0.6, 1],
			type: "spring",
			stiffness: 200,
			damping: 10,
		},
	},
};

const barVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			delay: 0.3,
			duration: 0.3,
			opacity: { duration: 0.1, delay: 0.3 },
		},
	},
};

const MapPinOffIcon = forwardRef<MapPinOffIconHandle, MapPinOffIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={svgVariants}
					initial="normal"
					animate={controls}
				>
					<path d="M12.75 7.09a3 3 0 0 1 2.16 2.16" />
					<path d="M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568" />
					<motion.path
						d="m2 2 20 20"
						variants={barVariants}
						initial="normal"
						animate={controls}
					/>
					<path d="M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533" />
					<path d="M9.13 9.13a3 3 0 0 0 3.74 3.74" />
				</motion.svg>
			</div>
		);
	}
);

MapPinOffIcon.displayName = "MapPinOffIcon";

export { MapPinOffIcon };
```

### `components/ui/icons/map-pin-plus-inside.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface MapPinPlusInsideIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MapPinPlusInsideIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const svgVariants: Variants = {
	normal: {
		y: 0,
	},
	animate: {
		y: [0, -5, -3],
		transition: {
			duration: 0.5,
			times: [0, 0.6, 1],
			type: "spring",
			stiffness: 200,
			damping: 10,
		},
	},
};

const verticalBarVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			delay: 0.3,
			duration: 0.2,
			opacity: { duration: 0.1, delay: 0.3 },
		},
	},
};

const horizontalBarVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			delay: 0.6,
			duration: 0.2,
			opacity: { duration: 0.1, delay: 0.6 },
		},
	},
};

const MapPinPlusInsideIcon = forwardRef<
	MapPinPlusInsideIconHandle,
	MapPinPlusInsideIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				variants={svgVariants}
				initial="normal"
				animate={controls}
			>
				<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
				<motion.path
					d="M12 7v6"
					variants={horizontalBarVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M9 10h6"
					variants={verticalBarVariants}
					initial="normal"
					animate={controls}
				/>
			</motion.svg>
		</div>
	);
});

MapPinPlusInsideIcon.displayName = "MapPinPlusInsideIcon";

export { MapPinPlusInsideIcon };
```

### `components/ui/icons/map-pin-plus.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface MapPinPlusIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MapPinPlusIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const svgVariants: Variants = {
	normal: {
		y: 0,
	},
	animate: {
		y: [0, -5, -3],
		transition: {
			duration: 0.5,
			times: [0, 0.6, 1],
			type: "spring",
			stiffness: 200,
			damping: 10,
		},
	},
};

const verticalBarVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			delay: 0.3,
			duration: 0.2,
			opacity: { duration: 0.1, delay: 0.3 },
		},
	},
};

const horizontalBarVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			delay: 0.6,
			duration: 0.2,
			opacity: { duration: 0.1, delay: 0.6 },
		},
	},
};

const MapPinPlusIcon = forwardRef<MapPinPlusIconHandle, MapPinPlusIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={svgVariants}
					initial="normal"
					animate={controls}
				>
					<path d="M19.914 11.105A7.298 7.298 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738" />
					<circle cx="12" cy="10" r="3" />
					<motion.path
						d="M16 18h6"
						variants={horizontalBarVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.path
						d="M19 15v6"
						variants={verticalBarVariants}
						initial="normal"
						animate={controls}
					/>
				</motion.svg>
			</div>
		);
	}
);

MapPinPlusIcon.displayName = "MapPinPlusIcon";

export { MapPinPlusIcon };
```

### `components/ui/icons/map-pin-x-inside.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface MapPinXInsideIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MapPinXInsideIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const svgVariants: Variants = {
	normal: {
		y: 0,
	},
	animate: {
		y: [0, -5, -3],
		transition: {
			duration: 0.5,
			times: [0, 0.6, 1],
			type: "spring",
			stiffness: 200,
			damping: 10,
		},
	},
};

const firstBarVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			delay: 0.3,
			duration: 0.2,
			opacity: { duration: 0.1, delay: 0.3 },
		},
	},
};

const secondBarVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			delay: 0.6,
			duration: 0.2,
			opacity: { duration: 0.1, delay: 0.6 },
		},
	},
};

const MapPinXInsideIcon = forwardRef<
	MapPinXInsideIconHandle,
	MapPinXInsideIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				variants={svgVariants}
				initial="normal"
				animate={controls}
			>
				<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
				<motion.path
					d="m14.5 7.5-5 5"
					variants={firstBarVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="m9.5 7.5 5 5"
					variants={secondBarVariants}
					initial="normal"
					animate={controls}
				/>
			</motion.svg>
		</div>
	);
});

MapPinXInsideIcon.displayName = "MapPinXInsideIcon";

export { MapPinXInsideIcon };
```

### `components/ui/icons/map-pin.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface MapPinIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MapPinIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const svgVariants: Variants = {
	normal: {
		y: 0,
	},
	animate: {
		y: [0, -5, -3],
		transition: {
			duration: 0.5,
			times: [0, 0.6, 1],
			type: "spring",
			stiffness: 200,
			damping: 10,
		},
	},
};

const circleVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [0.5, 0],
		transition: {
			delay: 0.3,
			duration: 0.5,
			opacity: { duration: 0.1, delay: 0.3 },
		},
	},
};

const MapPinIcon = forwardRef<MapPinIconHandle, MapPinIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={svgVariants}
					initial="normal"
					animate={controls}
				>
					<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
					<motion.circle
						cx="12"
						cy="10"
						r="3"
						variants={circleVariants}
						initial="normal"
						animate={controls}
					/>
				</motion.svg>
			</div>
		);
	}
);

MapPinIcon.displayName = "MapPinIcon";

export { MapPinIcon };
```

### `components/ui/icons/meh.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface MehIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MehIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const MehIcon = forwardRef<MehIconHandle, MehIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("animate");
				onMouseEnter?.(e);
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("normal");
				onMouseLeave?.(e);
			},
			[controls, onMouseLeave]
		);

		const faceVariants: Variants = {
			normal: {
				scale: 1,
				rotate: 0,
				transition: { duration: 0.3, ease: "easeOut" },
			},
			animate: {
				scale: [1, 1.05, 0.98, 1.02],
				rotate: [0, 1, -1, 0],
				transition: {
					duration: 0.7,
					times: [0, 0.4, 0.7, 1],
					ease: "easeInOut",
				},
			},
		};

		const mouthVariants: Variants = {
			normal: {
				scaleX: 1,
				y: 0,
				transition: { duration: 0.3, ease: "easeOut" },
			},
			animate: {
				scaleX: [1, 1.2, 0.9, 1.1],
				y: [0, 0.5, -0.5, 0],
				transition: {
					duration: 0.6,
					times: [0, 0.3, 0.6, 1],
					ease: "easeInOut",
					delay: 0.1,
				},
			},
		};

		const leftEyeVariants: Variants = {
			normal: {
				scale: 1,
				x: 0,
				transition: { duration: 0.3, ease: "easeOut" },
			},
			animate: {
				scale: [1, 1.3, 1, 1.2],
				x: [0, -0.3, 0.3, 0],
				transition: {
					duration: 0.5,
					times: [0, 0.3, 0.6, 1],
					ease: "easeInOut",
				},
			},
		};

		const rightEyeVariants: Variants = {
			normal: {
				scale: 1,
				x: 0,
				transition: { duration: 0.3, ease: "easeOut" },
			},
			animate: {
				scale: [1, 1.3, 1, 1.2],
				x: [0, 0.3, -0.3, 0],
				transition: {
					duration: 0.5,
					times: [0, 0.3, 0.6, 1],
					ease: "easeInOut",
				},
			},
		};

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					animate={controls}
					initial="normal"
					variants={faceVariants}
				>
					<circle cx="12" cy="12" r="10" />
					<motion.line
						variants={mouthVariants}
						animate={controls}
						initial="normal"
						x1="8"
						x2="16"
						y1="15"
						y2="15"
					/>
					<motion.line
						x1="9"
						x2="9.01"
						y1="9"
						y2="9"
						variants={leftEyeVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.line
						x1="15"
						x2="15.01"
						y1="9"
						y2="9"
						variants={rightEyeVariants}
						animate={controls}
						initial="normal"
					/>
				</motion.svg>
			</div>
		);
	}
);

MehIcon.displayName = "MehIcon";

export { MehIcon };
```

### `components/ui/icons/menu.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface MenuIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MenuIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const lineVariants: Variants = {
	normal: {
		rotate: 0,
		y: 0,
		opacity: 1,
	},
	animate: (custom: number) => ({
		rotate: custom === 1 ? 45 : custom === 3 ? -45 : 0,
		y: custom === 1 ? 6 : custom === 3 ? -6 : 0,
		opacity: custom === 2 ? 0 : 1,
		transition: {
			type: "spring",
			stiffness: 260,
			damping: 20,
		},
	}),
};

const MenuIcon = forwardRef<MenuIconHandle, MenuIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.line
						x1="4"
						y1="6"
						x2="20"
						y2="6"
						variants={lineVariants}
						animate={controls}
						custom={1}
					/>
					<motion.line
						x1="4"
						y1="12"
						x2="20"
						y2="12"
						variants={lineVariants}
						animate={controls}
						custom={2}
					/>
					<motion.line
						x1="4"
						y1="18"
						x2="20"
						y2="18"
						variants={lineVariants}
						animate={controls}
						custom={3}
					/>
				</svg>
			</div>
		);
	}
);

MenuIcon.displayName = "MenuIcon";

export { MenuIcon };
```

### `components/ui/icons/message-circle-dashed.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface MessageCircleDashedIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MessageCircleDashedIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { opacity: 1 },
	animate: (i: number) => ({
		opacity: [0, 1],
		transition: { delay: i * 0.1, duration: 0.3 },
	}),
};

const MessageCircleDashedIcon = forwardRef<
	MessageCircleDashedIconHandle,
	MessageCircleDashedIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				{[
					"M13.5 3.1c-.5 0-1-.1-1.5-.1s-1 .1-1.5.1",
					"M19.3 6.8a10.45 10.45 0 0 0-2.1-2.1",
					"M20.9 13.5c.1-.5.1-1 .1-1.5s-.1-1-.1-1.5",
					"M17.2 19.3a10.45 10.45 0 0 0 2.1-2.1",
					"M10.5 20.9c.5.1 1 .1 1.5.1s1-.1 1.5-.1",
					"M3.5 17.5 2 22l4.5-1.5",
					"M3.1 10.5c0 .5-.1 1-.1 1.5s.1 1 .1 1.5",
					"M6.8 4.7a10.45 10.45 0 0 0-2.1 2.1",
				].map((d, index) => (
					<motion.path
						key={d}
						d={d}
						animate={controls}
						variants={pathVariants}
						custom={index + 1}
					/>
				))}
			</svg>
		</div>
	);
});

MessageCircleDashedIcon.displayName = "MessageCircleDashedIcon";

export { MessageCircleDashedIcon };
```

### `components/ui/icons/message-circle-more.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface MessageCircleMoreIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MessageCircleMoreIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const dotVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: (custom: number) => ({
		opacity: [1, 0, 0, 1, 1, 0, 0, 1],
		transition: {
			opacity: {
				times: [
					0,
					0.1,
					0.1 + custom * 0.1,
					0.1 + custom * 0.1 + 0.1,
					0.5,
					0.6,
					0.6 + custom * 0.1,
					0.6 + custom * 0.1 + 0.1,
				],
				duration: 1.5,
			},
		},
	}),
};

const MessageCircleMoreIcon = forwardRef<
	MessageCircleMoreIconHandle,
	MessageCircleMoreIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
				<motion.path
					d="M8 12h.01"
					variants={dotVariants}
					animate={controls}
					custom={0}
				/>
				<motion.path
					d="M12 12h.01"
					variants={dotVariants}
					animate={controls}
					custom={1}
				/>
				<motion.path
					d="M16 12h.01"
					variants={dotVariants}
					animate={controls}
					custom={2}
				/>
			</svg>
		</div>
	);
});

MessageCircleMoreIcon.displayName = "MessageCircleMoreIcon";

export { MessageCircleMoreIcon };
```

### `components/ui/icons/message-circle.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface MessageCircleIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MessageCircleIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const iconVariants: Variants = {
	normal: {
		scale: 1,
		rotate: 0,
	},
	animate: {
		scale: 1.05,
		rotate: [0, -7, 7, 0],
		transition: {
			rotate: {
				duration: 0.5,
				ease: "easeInOut",
			},
			scale: {
				type: "spring",
				stiffness: 400,
				damping: 10,
			},
		},
	},
};

const MessageCircleIcon = forwardRef<
	MessageCircleIconHandle,
	MessageCircleIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				variants={iconVariants}
				animate={controls}
			>
				<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
			</motion.svg>
		</div>
	);
});

MessageCircleIcon.displayName = "MessageCircleIcon";

export { MessageCircleIcon };
```

### `components/ui/icons/message-square-dashed.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface MessageSquareDashedIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MessageSquareDashedIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { opacity: 1 },
	animate: (i: number) => ({
		opacity: [0, 1],
		transition: { delay: i * 0.1, duration: 0.3 },
	}),
};

const MessageSquareDashedIcon = forwardRef<
	MessageSquareDashedIconHandle,
	MessageSquareDashedIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				{[
					"M14 3h1",
					"M14 17h1",
					"M10 17H7l-4 4v-7",
					"M9 3h1",
					"M19 3a2 2 0 0 1 2 2",
					"M3 9v1",
					"M21 9v1",
					"M21 14v1a2 2 0 0 1-2 2",
					"M5 3a2 2 0 0 0-2 2",
				].map((d, index) => (
					<motion.path
						key={d}
						d={d}
						animate={controls}
						variants={pathVariants}
						custom={index + 1}
					/>
				))}
			</svg>
		</div>
	);
});

MessageSquareDashedIcon.displayName = "MessageSquareDashedIcon";

export { MessageSquareDashedIcon };
```

### `components/ui/icons/message-square-more.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface MessageSquareMoreIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MessageSquareMoreIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const dotVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: (custom: number) => ({
		opacity: [1, 0, 0, 1, 1, 0, 0, 1],
		transition: {
			opacity: {
				times: [
					0,
					0.1,
					0.1 + custom * 0.1,
					0.1 + custom * 0.1 + 0.1,
					0.5,
					0.6,
					0.6 + custom * 0.1,
					0.6 + custom * 0.1 + 0.1,
				],
				duration: 1.5,
			},
		},
	}),
};

const MessageSquareMoreIcon = forwardRef<
	MessageSquareMoreIconHandle,
	MessageSquareMoreIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
				<motion.path
					d="M8 10h.01"
					variants={dotVariants}
					animate={controls}
					custom={0}
				/>
				<motion.path
					d="M12 10h.01"
					variants={dotVariants}
					animate={controls}
					custom={1}
				/>
				<motion.path
					d="M16 10h.01"
					variants={dotVariants}
					animate={controls}
					custom={2}
				/>
			</svg>
		</div>
	);
});

MessageSquareMoreIcon.displayName = "MessageSquareMoreIcon";

export { MessageSquareMoreIcon };
```

### `components/ui/icons/message-square.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface MessageSquareIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MessageSquareIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const iconVariants: Variants = {
	normal: {
		scale: 1,
		rotate: 0,
	},
	animate: {
		scale: 1.05,
		rotate: [0, -7, 7, 0],
		transition: {
			rotate: {
				duration: 0.5,
				ease: "easeInOut",
			},
			scale: {
				type: "spring",
				stiffness: 400,
				damping: 10,
			},
		},
	},
};

const MessageSquareIcon = forwardRef<
	MessageSquareIconHandle,
	MessageSquareIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				variants={iconVariants}
				animate={controls}
			>
				<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
			</motion.svg>
		</div>
	);
});

MessageSquareIcon.displayName = "MessageSquareIcon";

export { MessageSquareIcon };
```

### `components/ui/icons/monitor-check.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";

export interface MonitorCheckIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MonitorCheckIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const checkVariants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
		transition: {
			duration: 0.3,
		},
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			pathLength: { duration: 0.4, ease: "easeInOut" },
			opacity: { duration: 0.4, ease: "easeInOut" },
		},
	},
};

const MonitorCheckIcon = forwardRef<
	MonitorCheckIconHandle,
	MonitorCheckIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect width="20" height="14" x="2" y="3" rx="2" />
				<path d="M12 17v4" />
				<path d="M8 21h8" />
				<motion.path
					animate={controls}
					initial="normal"
					variants={checkVariants}
					d="m9 10 2 2 4-4"
					style={{ transformOrigin: "center" }}
				/>
			</svg>
		</div>
	);
});

MonitorCheckIcon.displayName = "MonitorCheckIcon";

export { MonitorCheckIcon };
```

### `components/ui/icons/moon.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface MoonIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface MoonIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const svgVariants: Variants = {
	normal: {
		rotate: 0,
	},
	animate: {
		rotate: [0, -10, 10, -5, 5, 0],
	},
};

const svgTransition: Transition = {
	duration: 1.2,
	ease: "easeInOut",
};

const MoonIcon = forwardRef<MoonIconHandle, MoonIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={svgVariants}
					animate={controls}
					transition={svgTransition}
				>
					<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
				</motion.svg>
			</div>
		);
	}
);

MoonIcon.displayName = "MoonIcon";

export { MoonIcon };
```

### `components/ui/icons/panel-left-close.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface PanelLeftCloseIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface PanelLeftCloseIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	times: [0, 0.4, 1],
	duration: 0.5,
};

const pathVariants: Variants = {
	normal: { x: 0 },
	animate: { x: [0, -1.5, 0] },
};

const PanelLeftCloseIcon = forwardRef<
	PanelLeftCloseIconHandle,
	PanelLeftCloseIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect width="18" height="18" x="3" y="3" rx="2" />
				<path d="M9 3v18" />
				<motion.path
					transition={defaultTransition}
					variants={pathVariants}
					animate={controls}
					d="m16 15-3-3 3-3"
				/>
			</svg>
		</div>
	);
});

PanelLeftCloseIcon.displayName = "PanelLeftCloseIcon";

export { PanelLeftCloseIcon };
```

### `components/ui/icons/panel-left-open.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface PanelLeftOpenIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface PanelLeftOpenIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	times: [0, 0.4, 1],
	duration: 0.5,
};

const pathVariants: Variants = {
	normal: { x: 0 },
	animate: { x: [0, 1.5, 0] },
};

const PanelLeftOpenIcon = forwardRef<
	PanelLeftOpenIconHandle,
	PanelLeftOpenIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect width="18" height="18" x="3" y="3" rx="2" />
				<path d="M9 3v18" />
				<motion.path
					transition={defaultTransition}
					variants={pathVariants}
					animate={controls}
					d="m14 9 3 3-3 3"
				/>
			</svg>
		</div>
	);
});

PanelLeftOpenIcon.displayName = "PanelLeftOpenIcon";

export { PanelLeftOpenIcon };
```

### `components/ui/icons/panel-right-open.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface PanelRightOpenIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface PanelRightOpenIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	times: [0, 0.4, 1],
	duration: 0.5,
};

const pathVariants: Variants = {
	normal: { x: 0 },
	animate: { x: [0, -1.5, 0] },
};

const PanelRightOpenIcon = forwardRef<
	PanelRightOpenIconHandle,
	PanelRightOpenIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect width="18" height="18" x="3" y="3" rx="2" />
				<path d="M15 3v18" />
				<motion.path
					transition={defaultTransition}
					variants={pathVariants}
					animate={controls}
					d="m10 15-3-3 3-3"
				/>
			</svg>
		</div>
	);
});

PanelRightOpenIcon.displayName = "PanelRightOpenIcon";

export { PanelRightOpenIcon };
```

### `components/ui/icons/party-popper.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface PartyPopperIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface PartyPopperIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const linesVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		scale: 1,
		translateX: 0,
		translateY: 0,
	},
	animate: {
		opacity: [0, 1],
		scale: [0.3, 0.8, 1, 1.1, 1],
		pathLength: [0, 0.5, 1],
		translateX: [-5, 0],
		translateY: [5, 0],
		transition: {
			type: "spring",
			damping: 35,
			duration: 0.7,
			stiffness: 240,
			velocity: 0.3,
		},
	},
};

const dotsVariants: Variants = {
	normal: { opacity: 1, scale: 1, translateX: 0, translateY: 0 },
	animate: {
		opacity: [0, 1],
		translateX: [-5, 0],
		translateY: [5, 0],
		scale: [0.5, 0.8, 1, 1.1, 1],
		transition: {
			type: "spring",
			damping: 35,
			duration: 0.7,
			stiffness: 240,
		},
	},
};

const popperVariants: Variants = {
	normal: { translateX: 0, translateY: 0 },
	animate: {
		translateX: [-1.5, 0],
		translateY: [1.5, 0],
		transition: {
			type: "spring",
			damping: 35,
			stiffness: 200,
			velocity: 0.3,
			mass: 4,
		},
	},
};

const PartyPopperIcon = forwardRef<PartyPopperIconHandle, PartyPopperIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M5.8 11.3 2 22l10.7-3.79"
						variants={popperVariants}
						animate={controls}
					/>
					<motion.path
						d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"
						variants={popperVariants}
						animate={controls}
					/>
					<motion.path
						d="M4 3h.01"
						variants={dotsVariants}
						animate={controls}
					/>
					<motion.path
						d="M22 8h.01"
						variants={dotsVariants}
						animate={controls}
					/>
					<motion.path
						d="M15 2h.01"
						variants={dotsVariants}
						animate={controls}
					/>
					<motion.path
						d="M22 20h.01"
						variants={dotsVariants}
						animate={controls}
					/>
					<motion.path
						d="m14 10 1.21-1.06c0.16-0.84 0.9-1.44 1.76-1.44h0.38c0.88 0 1.55-0.77 1.45-1.63a2.9 2.9 0 0 1 1.96-3.12L22 2"
						variants={linesVariants}
						animate={controls}
					/>
					<motion.path
						d="M17 15h0.77c0.71 0 1.32-0.52 1.43-1.22c0.16-0.91 1.12-1.45 1.98-1.11L22 13"
						variants={linesVariants}
						animate={controls}
					/>
					<motion.path
						d="M9 7V6.23c0-0.71 0.52-1.33 1.22-1.43c0.91-0.16 1.45-1.12 1.11-1.98L11 2"
						variants={linesVariants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

PartyPopperIcon.displayName = "PartyPopperIcon";

export { PartyPopperIcon };
```

### `components/ui/icons/pause.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface PauseIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface PauseIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const baseRectVariants: Variants = {
	normal: {
		y: 0,
	},
};

const baseRectTransition = {
	transition: {
		times: [0, 0.2, 0.5, 1],
		duration: 0.5,
		stiffness: 260,
		damping: 20,
	},
};

const leftRectVariants: Variants = {
	...baseRectVariants,
	animate: {
		y: [0, 2, 0, 0],
		...baseRectTransition,
	},
};

const rightRectVariants: Variants = {
	...baseRectVariants,
	animate: {
		y: [0, 0, 2, 0],
		...baseRectTransition,
	},
};

const PauseIcon = forwardRef<PauseIconHandle, PauseIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.rect
						x="6"
						y="4"
						width="4"
						height="16"
						rx="1"
						variants={leftRectVariants}
						animate={controls}
					/>
					<motion.rect
						x="14"
						y="4"
						width="4"
						height="16"
						rx="1"
						variants={rightRectVariants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

PauseIcon.displayName = "PauseIcon";

export { PauseIcon };
```

### `components/ui/icons/pen-tool.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface PenToolIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface PenToolIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const svgVariants: Variants = {
	normal: { rotate: 0, translateX: 0, translateY: 0 },
	animate: {
		rotate: [0, 0, 8, -3, 8, 0],
		translateY: [0, 2, 0, -1, 0],
	},
};

const pathVariants: Variants = {
	normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
	animate: {
		pathLength: [0, 0, 1],
		opacity: [0, 1],
		pathOffset: [0, 1, 0],
	},
};

const PenToolIcon = forwardRef<PenToolIconHandle, PenToolIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={svgVariants}
					transition={{
						duration: 1,
					}}
					animate={controls}
				>
					<path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
					<path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" />
					<motion.path
						variants={pathVariants}
						animate={controls}
						transition={{
							duration: 0.8,
						}}
						d="m2.3 2.3 7.286 7.286"
					/>
					<circle cx="11" cy="11" r="2" />
				</motion.svg>
			</div>
		);
	}
);

PenToolIcon.displayName = "PenToolIcon";

export { PenToolIcon };
```

### `components/ui/icons/play.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface PlayIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface PlayIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		x: 0,
		rotate: 0,
	},
	animate: {
		x: [0, -1, 2, 0],
		rotate: [0, -10, 0, 0],
		transition: {
			duration: 0.5,
			times: [0, 0.2, 0.5, 1],
			stiffness: 260,
			damping: 20,
		},
	},
};

const PlayIcon = forwardRef<PlayIconHandle, PlayIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.polygon
						points="6 3 20 12 6 21 6 3"
						variants={pathVariants}
						animate={controls}
					/>
				</motion.svg>
			</div>
		);
	}
);

PlayIcon.displayName = "PlayIcon";

export { PlayIcon };
```

### `components/ui/icons/rabbit.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface RabbitIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface RabbitIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const transition: Transition = {
	duration: 0.6,
	ease: [0.42, 0, 0.58, 1],
};

const speedVariants: Variants = {
	normal: {
		rotate: 0,
		x: 0,
		y: 0,
	},
	animate: {
		rotate: [0, 5, -5, 3, -3, 0],
		x: [0, 3, -3, 2, -2, 0],
		y: [0, 1.5, -1.5, 1, -1, 0],
		transition,
	},
};

const RabbitIcon = forwardRef<RabbitIconHandle, RabbitIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={speedVariants}
					animate={controls}
				>
					<path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3" />
					<path d="M13 16a3 3 0 0 1 2.24 5" />
					<path d="M18 12h.01" />
					<path d="M20 8.54V4a2 2 0 1 0-4 0v3" />
					<path d="M7.612 12.524a3 3 0 1 0-1.6 4.3" />
				</motion.svg>
			</div>
		);
	}
);

RabbitIcon.displayName = "RabbitIcon";

export { RabbitIcon };
```

### `components/ui/icons/radio-tower.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface RadioTowerIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface RadioTowerIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: {
		opacity: 1,
		transition: {
			duration: 0.4,
		},
	},
	fadeOut: {
		opacity: 0,
		transition: { duration: 0.3 },
	},
	fadeIn: (i: number) => ({
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 20,
			delay: i * 0.1,
		},
	}),
};

const RadioTowerIcon = forwardRef<RadioTowerIconHandle, RadioTowerIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: async () => {
					await controls.start("fadeOut");
					controls.start("fadeIn");
				},
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			async (e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					await controls.start("fadeOut");
					controls.start("fadeIn");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					"cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center",
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9"
						initial={{ opacity: 1 }}
						variants={variants}
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M7.8 4.7a6.14 6.14 0 0 0-.8 7.5"
						initial={{ opacity: 1 }}
						variants={variants}
						animate={controls}
						custom={0}
					/>
					<circle cx="12" cy="9" r="2" />
					<motion.path
						d="M16.2 4.8c2 2 2.26 5.11.8 7.47"
						initial={{ opacity: 1 }}
						variants={variants}
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M19.1 1.9a9.96 9.96 0 0 1 0 14.1"
						initial={{ opacity: 1 }}
						variants={variants}
						animate={controls}
						custom={1}
					/>
					<path d="M9.5 18h5" />
					<path d="m8 22 4-11 4 11" />
				</svg>
			</div>
		);
	}
);

RadioTowerIcon.displayName = "RadioTowerIcon";

export { RadioTowerIcon };
```

### `components/ui/icons/radio.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface RadioIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface RadioIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: {
		opacity: 1,
		transition: {
			duration: 0.4,
		},
	},
	fadeOut: {
		opacity: 0,
		transition: { duration: 0.3 },
	},
	fadeIn: (i: number) => ({
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 20,
			delay: i * 0.1,
		},
	}),
};

const RadioIcon = forwardRef<RadioIconHandle, RadioIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: async () => {
					await controls.start("fadeOut");
					controls.start("fadeIn");
				},
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			async (e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					await controls.start("fadeOut");
					controls.start("fadeIn");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					"cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center",
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"
						initial={{ opacity: 1 }}
						variants={variants}
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"
						initial={{ opacity: 1 }}
						variants={variants}
						animate={controls}
						custom={0}
					/>
					<circle cx="12" cy="12" r="2" />
					<motion.path
						d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"
						initial={{ opacity: 1 }}
						variants={variants}
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M19.1 4.9C23 8.8 23 15.1 19.1 19"
						initial={{ opacity: 1 }}
						variants={variants}
						animate={controls}
						custom={1}
					/>
				</svg>
			</div>
		);
	}
);

RadioIcon.displayName = "RadioIcon";

export { RadioIcon };
```

### `components/ui/icons/redo-dot.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { cubicBezier, motion, useAnimation } from "motion/react";

export interface RedoDotIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface RedoDotIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const customEasing = cubicBezier(0.25, 0.1, 0.25, 1);

const RedoDotIcon = forwardRef<RedoDotIconHandle, RedoDotIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						transition={{ duration: 0.6, ease: customEasing }}
						variants={{
							normal: { translateX: 0, translateY: 0, rotate: 0 },
							animate: {
								translateX: [0, -2.1, 0],
								translateY: [0, -1.4, 0],
								rotate: [0, -12, 0],
							},
						}}
						animate={controls}
						d="M21 7v6h-6"
					/>
					<motion.path
						transition={{ duration: 0.6, ease: customEasing }}
						variants={{
							normal: { pathLength: 1 },
							animate: { pathLength: [1, 0.8, 1] },
						}}
						animate={controls}
						d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"
					/>
					<motion.circle
						transition={{ duration: 0.6, ease: customEasing }}
						variants={{
							normal: { scale: 1 },
							animate: { scale: [1, 1.2, 1] },
						}}
						animate={controls}
						cx="12"
						cy="17"
						r="1"
					/>
				</svg>
			</div>
		);
	}
);

RedoDotIcon.displayName = "RedoDotIcon";

export { RedoDotIcon };
```

### `components/ui/icons/redo.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { cubicBezier, motion, useAnimation } from "motion/react";

export interface RedoIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface RedoIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const customEasing = cubicBezier(0.25, 0.1, 0.25, 1);

const RedoIcon = forwardRef<RedoIconHandle, RedoIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						transition={{ duration: 0.6, ease: customEasing }}
						variants={{
							normal: { translateX: 0, translateY: 0, rotate: 0 },
							animate: {
								translateX: [0, -2.1, 0],
								translateY: [0, -1.4, 0],
								rotate: [0, -12, 0],
							},
						}}
						animate={controls}
						d="M21 7v6h-6"
					/>
					<motion.path
						transition={{ duration: 0.6, ease: customEasing }}
						variants={{
							normal: { pathLength: 1 },
							animate: { pathLength: [1, 0.8, 1] },
						}}
						animate={controls}
						d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"
					/>
				</svg>
			</div>
		);
	}
);

RedoIcon.displayName = "RedoIcon";

export { RedoIcon };
```

### `components/ui/icons/refresh-ccw-dot.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface RefreshCCWDotIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface RefreshCCWDotIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const RefreshCCWDotIcon = forwardRef<
	RefreshCCWDotIconHandle,
	RefreshCCWDotIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) controls.start("animate");
			else onMouseEnter?.(e);
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) controls.start("normal");
			else onMouseLeave?.(e);
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				"cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center",
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.g
					transition={{ type: "spring", stiffness: 250, damping: 25 }}
					variants={{
						normal: { rotate: "0deg" },
						animate: { rotate: "-50deg" },
					}}
					animate={controls}
				>
					<path d="M3 2v6h6" />
					<path d="M21 12A9 9 0 0 0 6 5.3L3 8" />
					<path d="M21 22v-6h-6" />
					<path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" />
				</motion.g>
				<circle cx="12" cy="12" r="1" />
			</svg>
		</div>
	);
});

RefreshCCWDotIcon.displayName = "RefreshCCWDotIcon";

export { RefreshCCWDotIcon };
```

### `components/ui/icons/refresh-ccw.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface RefreshCCWIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface RefreshCCWIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const RefreshCCWIcon = forwardRef<RefreshCCWIconHandle, RefreshCCWIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("animate");
				else onMouseEnter?.(e);
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("normal");
				else onMouseLeave?.(e);
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					"cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center",
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.g
						transition={{ type: "spring", stiffness: 250, damping: 25 }}
						variants={{
							normal: { rotate: "0deg" },
							animate: { rotate: "-50deg" },
						}}
						animate={controls}
					>
						<path d="M3 2v6h6" />
						<path d="M21 12A9 9 0 0 0 6 5.3L3 8" />
						<path d="M21 22v-6h-6" />
						<path d="M3 12a9 9 0 0 0 15 6.7l3-2.7" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

RefreshCCWIcon.displayName = "RefreshCCWIcon";

export { RefreshCCWIcon };
```

### `components/ui/icons/refresh-cw-off.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface RefreshCWOffIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface RefreshCWOffIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const RefreshCWOffIcon = forwardRef<
	RefreshCWOffIconHandle,
	RefreshCWOffIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) controls.start("animate");
			else onMouseEnter?.(e);
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) controls.start("normal");
			else onMouseLeave?.(e);
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				"cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center",
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				transition={{ type: "spring", stiffness: 500, damping: 20 }}
				variants={{
					normal: { x: 0 },
					animate: {
						x: [-3, 3, -3, 3, 0],
						transition: { duration: 0.4 },
					},
				}}
				animate={controls}
			>
				<path d="M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47" />
				<path d="M8 16H3v5" />
				<path d="M3 12C3 9.51 4 7.26 5.64 5.64" />
				<path d="m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64" />
				<path d="M21 12c0 1-.16 1.97-.47 2.87" />
				<path d="M21 3v5h-5" />
				<path d="M22 22 2 2" />
			</motion.svg>
		</div>
	);
});

RefreshCWOffIcon.displayName = "RefreshCWOffIcon";

export { RefreshCWOffIcon };
```

### `components/ui/icons/refresh-cw.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface RefreshCCWIconWIcon {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface RefreshCCWIcoWIcon extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const RefreshCWIcon = forwardRef<RefreshCCWIconWIcon, RefreshCCWIcoWIcon>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("animate");
				else onMouseEnter?.(e);
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("normal");
				else onMouseLeave?.(e);
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					"cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center",
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					transition={{ type: "spring", stiffness: 250, damping: 25 }}
					variants={{
						normal: { rotate: "0deg" },
						animate: { rotate: "50deg" },
					}}
					animate={controls}
				>
					<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
					<path d="M21 3v5h-5" />
					<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
					<path d="M8 16H3v5" />
				</motion.svg>
			</div>
		);
	}
);

RefreshCWIcon.displayName = "RefreshCWIcon";

export { RefreshCWIcon };
```

### `components/ui/icons/rocket.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface RocketIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface RocketIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: {
		x: 0,
		y: 0,
	},
	animate: {
		x: [0, 0, -3, 2, -2, 1, -1, 0],
		y: [0, -3, 0, -2, -3, -1, -2, 0],
		transition: {
			duration: 6,
			ease: "easeInOut",
			repeat: Infinity,
			repeatType: "reverse",
			times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
		},
	},
};

const fireVariants: Variants = {
	normal: {
		d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
	},
	animate: {
		d: [
			"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
			"M4.5 16.5c-1.5 1.26-3 5.5-3 5.5s4.74-1 6-2.5c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
			"M4.5 16.5c-1.5 1.26-2.2 4.8-2.2 4.8s3.94-0.3 5.2-1.8c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
			"M4.5 16.5c-1.5 1.26-2.8 5.2-2.8 5.2s4.54-0.7 5.8-2.2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
			"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
		],
		transition: {
			duration: 2,
			ease: [0.4, 0, 0.2, 1],
			repeat: Infinity,
			times: [0, 0.2, 0.5, 0.8, 1],
		},
	},
};

const RocketIcon = forwardRef<RocketIconHandle, RocketIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={variants}
					animate={controls}
				>
					<motion.path
						d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
						variants={fireVariants}
						animate={controls}
					/>
					<path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
					<path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
					<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
				</motion.svg>
			</div>
		);
	}
);

RocketIcon.displayName = "RocketIcon";

export { RocketIcon };
```

### `components/ui/icons/rocking-chair.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import type { Transition, Variants } from "motion/react";

export interface RockingChairIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface RockingChairIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	type: "spring",
	stiffness: 100,
	damping: 12,
	mass: 0.4,
};

const rockingVariants: Variants = {
	normal: { rotate: 0 },
	animate: {
		rotate: [-5, 5, -5],
		transition: {
			repeat: Infinity,
			repeatType: "mirror" as const,
			duration: 1.2,
			ease: "easeInOut",
		},
	},
};

const RockingChairIcon = forwardRef<
	RockingChairIconHandle,
	RockingChairIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				variants={rockingVariants}
				animate={controls}
				style={{ originX: "10%", originY: "90%" }}
			>
				<motion.polyline
					points="3.5 2 6.5 12.5 18 12.5"
					animate={controls}
					transition={defaultTransition}
				/>
				<motion.line
					x1="9.5"
					x2="5.5"
					y1="12.5"
					y2="20"
					animate={controls}
					transition={defaultTransition}
				/>
				<motion.line
					x1="15"
					x2="18.5"
					y1="12.5"
					y2="20"
					animate={controls}
					transition={defaultTransition}
				/>
				<motion.path
					d="M2.75 18a13 13 0 0 0 18.5 0"
					animate={controls}
					transition={defaultTransition}
				/>
			</motion.svg>
		</div>
	);
});

RockingChairIcon.displayName = "RockingChairIcon";

export { RockingChairIcon };
```

### `components/ui/icons/roller-coaster.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface RollerCoasterIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface RollerCoasterIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: (custom: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			delay: 0.1 * custom,
			opacity: { delay: 0.1 * custom },
		},
	}),
};

const RollerCoasterIcon = forwardRef<
	RollerCoasterIconHandle,
	RollerCoasterIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.path d="M6 19V5" variants={variants} animate={controls} />
				<motion.path
					d="M10 19V6.8"
					variants={variants}
					animate={controls}
				/>
				<motion.path
					d="M14 19v-7.8"
					variants={variants}
					animate={controls}
				/>
				<motion.path d="M18 5v4" variants={variants} animate={controls} />
				<motion.path d="M18 19v-6" variants={variants} animate={controls} />
				<motion.path d="M22 19V9" variants={variants} animate={controls} />
				<motion.path
					d="M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65"
					variants={variants}
					animate={controls}
					custom={2}
				/>
			</svg>
		</div>
	);
});

RollerCoasterIcon.displayName = "RollerCoasterIcon";

export { RollerCoasterIcon };
```

### `components/ui/icons/rotate-ccw.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface RotateCCWIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface RotateCCWIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const RotateCCWIcon = forwardRef<RotateCCWIconHandle, RotateCCWIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("animate");
				else onMouseEnter?.(e);
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("normal");
				else onMouseLeave?.(e);
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					"cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center",
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					transition={{ type: "spring", stiffness: 250, damping: 25 }}
					variants={{
						normal: { rotate: "0deg" },
						animate: { rotate: "-50deg" },
					}}
					animate={controls}
				>
					<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
					<path d="M3 3v5h5" />
				</motion.svg>
			</div>
		);
	}
);

RotateCCWIcon.displayName = "RotateCCWIcon";

export { RotateCCWIcon };
```

### `components/ui/icons/rotate-cw.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface RotateCWIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface RotateCWIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const RotateCWIcon = forwardRef<RotateCWIconHandle, RotateCWIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("animate");
				else onMouseEnter?.(e);
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("normal");
				else onMouseLeave?.(e);
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					"cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center",
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					transition={{ type: "spring", stiffness: 250, damping: 25 }}
					variants={{
						normal: { rotate: "0deg" },
						animate: { rotate: "50deg" },
					}}
					animate={controls}
				>
					<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
					<path d="M21 3v5h-5" />
				</motion.svg>
			</div>
		);
	}
);

RotateCWIcon.displayName = "RotateCWIcon";

export { RotateCWIcon };
```

### `components/ui/icons/route.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface RouteIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface RouteIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const circleTransition: Transition = {
	duration: 0.3,
	delay: 0.1,
	opacity: { delay: 0.15 },
};

const circleVariants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
	},
};

const RouteIcon = forwardRef<RouteIconHandle, RouteIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.circle
						cx="6"
						cy="19"
						r="3"
						transition={circleTransition}
						variants={circleVariants}
						animate={controls}
					/>
					<motion.path
						d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"
						transition={{
							duration: 0.7,
							delay: 0.5,
							opacity: { delay: 0.5 },
						}}
						variants={{
							normal: {
								pathLength: 1,
								opacity: 1,
								pathOffset: 0,
							},
							animate: {
								pathLength: [0, 1],
								opacity: [0, 1],
								pathOffset: [1, 0],
							},
						}}
						animate={controls}
					/>
					<motion.circle
						cx="18"
						cy="5"
						r="3"
						transition={circleTransition}
						variants={circleVariants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

RouteIcon.displayName = "RouteIcon";

export { RouteIcon };
```

### `components/ui/icons/scan-face.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ScanFaceIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ScanFaceIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const ScanFaceIcon = forwardRef<ScanFaceIconHandle, ScanFaceIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: async () => {
					await controls.start("hidden");
					await controls.start("visible");
				},
				stopAnimation: () => controls.start("visible"),
			};
		});

		const handleMouseEnter = useCallback(
			async (e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					await controls.start("hidden");
					await controls.start("visible");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("visible");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		const faceVariants: Variants = {
			visible: { scale: 1 },
			hidden: {
				scale: 0.9,
				transition: { type: "spring", stiffness: 200, damping: 20 },
			},
		};

		const cornerVariants: Variants = {
			visible: { scale: 1, rotate: 0, opacity: 1 },
			hidden: {
				scale: 1.2,
				rotate: 45,
				opacity: 0,
				transition: { type: "spring", stiffness: 200, damping: 20 },
			},
		};

		const mouthVariants: Variants = {
			visible: { scale: 1, opacity: 1 },
			hidden: {
				scale: 0.8,
				opacity: 0,
				transition: { duration: 0.3, delay: 0.1 },
			},
		};

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					animate={controls}
					variants={faceVariants}
				>
					<motion.path
						variants={cornerVariants}
						animate={controls}
						initial="visible"
						d="M3 7V5a2 2 0 0 1 2-2h2"
					/>
					<motion.path
						variants={cornerVariants}
						animate={controls}
						initial="visible"
						d="M17 3h2a2 2 0 0 1 2 2v2"
					/>
					<motion.path
						variants={cornerVariants}
						animate={controls}
						initial="visible"
						d="M21 17v2a2 2 0 0 1-2 2h-2"
					/>
					<motion.path
						variants={cornerVariants}
						animate={controls}
						initial="visible"
						d="M7 21H5a2 2 0 0 1-2-2v-2"
					/>
					<motion.path
						variants={mouthVariants}
						animate={controls}
						initial="visible"
						d="M8 14s1.5 2 4 2 4-2 4-2"
					/>
					<line x1="9" x2="9.01" y1="9" y2="9" />
					<line x1="15" x2="15.01" y1="9" y2="9" />
				</motion.svg>
			</div>
		);
	}
);

ScanFaceIcon.displayName = "ScanFaceIcon";

export { ScanFaceIcon };
```

### `components/ui/icons/scan-text.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ScanTextIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ScanTextIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const frameVariants: Variants = {
	visible: { opacity: 1 },
	hidden: { opacity: 1 },
};

const lineVariants: Variants = {
	visible: { pathLength: 1, opacity: 1 },
	hidden: { pathLength: 0, opacity: 0 },
};

const ScanTextIcon = forwardRef<ScanTextIconHandle, ScanTextIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: async () => {
					await controls.start((i) => ({
						pathLength: 0,
						opacity: 0,
						transition: { delay: i * 0.1, duration: 0.3 },
					}));
					await controls.start((i) => ({
						pathLength: 1,
						opacity: 1,
						transition: { delay: i * 0.1, duration: 0.3 },
					}));
				},
				stopAnimation: () => controls.start("visible"),
			};
		});

		const handleMouseEnter = useCallback(
			async (e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					await controls.start((i) => ({
						pathLength: 0,
						opacity: 0,
						transition: { delay: i * 0.1, duration: 0.3 },
					}));
					await controls.start((i) => ({
						pathLength: 1,
						opacity: 1,
						transition: { delay: i * 0.1, duration: 0.3 },
					}));
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("visible");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						variants={frameVariants}
						d="M3 7V5a2 2 0 0 1 2-2h2"
					/>
					<motion.path
						variants={frameVariants}
						d="M17 3h2a2 2 0 0 1 2 2v2"
					/>
					<motion.path
						variants={frameVariants}
						d="M21 17v2a2 2 0 0 1-2 2h-2"
					/>
					<motion.path
						variants={frameVariants}
						d="M7 21H5a2 2 0 0 1-2-2v-2"
					/>
					<motion.path
						variants={lineVariants}
						initial="visible"
						animate={controls}
						custom={0}
						d="M7 8h8"
					/>
					<motion.path
						variants={lineVariants}
						initial="visible"
						animate={controls}
						custom={1}
						d="M7 12h10"
					/>
					<motion.path
						variants={lineVariants}
						initial="visible"
						animate={controls}
						custom={2}
						d="M7 16h6"
					/>
				</svg>
			</div>
		);
	}
);

ScanTextIcon.displayName = "ScanTextIcon";

export { ScanTextIcon };
```

### `components/ui/icons/search.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface SearchIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SearchIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const SearchIcon = forwardRef<SearchIconHandle, SearchIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={{
						normal: { x: 0, y: 0 },
						animate: {
							x: [0, 0, -3, 0],
							y: [0, -4, 0, 0],
						},
					}}
					transition={{
						duration: 1,
						bounce: 0.3,
					}}
					animate={controls}
				>
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.3-4.3" />
				</motion.svg>
			</div>
		);
	}
);

SearchIcon.displayName = "SearchIcon";

export { SearchIcon };
```

### `components/ui/icons/settings-gear.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface SettingsGearIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SettingsGearIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const SettingsGearIcon = forwardRef<
	SettingsGearIconHandle,
	SettingsGearIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				transition={{ type: "spring", stiffness: 50, damping: 10 }}
				variants={{
					normal: {
						rotate: 0,
					},
					animate: {
						rotate: 180,
					},
				}}
				animate={controls}
			>
				<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
				<circle cx="12" cy="12" r="3" />
			</motion.svg>
		</div>
	);
});

SettingsGearIcon.displayName = "SettingsGearIcon";

export { SettingsGearIcon };
```

### `components/ui/icons/settings.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface SettingsIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SettingsIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	type: "spring",
	stiffness: 100,
	damping: 12,
	mass: 0.4,
};

const SettingsIcon = forwardRef<SettingsIconHandle, SettingsIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.line
						x1="21"
						x2="14"
						y1="4"
						y2="4"
						initial={false}
						variants={{
							normal: {
								x2: 14,
							},
							animate: {
								x2: 10,
							},
						}}
						animate={controls}
						transition={defaultTransition}
					/>
					<motion.line
						x1="10"
						x2="3"
						y1="4"
						y2="4"
						variants={{
							normal: {
								x1: 10,
							},
							animate: {
								x1: 5,
							},
						}}
						animate={controls}
						transition={defaultTransition}
					/>

					<motion.line
						x1="21"
						x2="12"
						y1="12"
						y2="12"
						variants={{
							normal: {
								x2: 12,
							},
							animate: {
								x2: 18,
							},
						}}
						animate={controls}
						transition={defaultTransition}
					/>

					<motion.line
						x1="8"
						x2="3"
						y1="12"
						y2="12"
						variants={{
							normal: {
								x1: 8,
							},
							animate: {
								x1: 13,
							},
						}}
						animate={controls}
						transition={defaultTransition}
					/>

					<motion.line
						x1="3"
						x2="12"
						y1="20"
						y2="20"
						variants={{
							normal: {
								x2: 12,
							},
							animate: {
								x2: 4,
							},
						}}
						animate={controls}
						transition={defaultTransition}
					/>

					<motion.line
						x1="16"
						x2="21"
						y1="20"
						y2="20"
						variants={{
							normal: {
								x1: 16,
							},
							animate: {
								x1: 8,
							},
						}}
						animate={controls}
						transition={defaultTransition}
					/>

					<motion.line
						x1="14"
						x2="14"
						y1="2"
						y2="6"
						variants={{
							normal: {
								x1: 14,
								x2: 14,
							},
							animate: {
								x1: 9,
								x2: 9,
							},
						}}
						animate={controls}
						transition={defaultTransition}
					/>

					<motion.line
						x1="8"
						x2="8"
						y1="10"
						y2="14"
						variants={{
							normal: {
								x1: 8,
								x2: 8,
							},
							animate: {
								x1: 14,
								x2: 14,
							},
						}}
						animate={controls}
						transition={defaultTransition}
					/>

					<motion.line
						x1="16"
						x2="16"
						y1="18"
						y2="22"
						variants={{
							normal: {
								x1: 16,
								x2: 16,
							},
							animate: {
								x1: 8,
								x2: 8,
							},
						}}
						animate={controls}
						transition={defaultTransition}
					/>
				</svg>
			</div>
		);
	}
);

SettingsIcon.displayName = "SettingsIcon";

export { SettingsIcon };
```

### `components/ui/icons/shield-check.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ShieldCheckIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ShieldCheckIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		scale: 1,
		transition: {
			duration: 0.3,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		scale: [0.5, 1],
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
};

const ShieldCheckIcon = forwardRef<ShieldCheckIconHandle, ShieldCheckIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={controls}
						d="m9 12 2 2 4-4"
					/>
				</svg>
			</div>
		);
	}
);

ShieldCheckIcon.displayName = "ShieldCheckIcon";

export { ShieldCheckIcon };
```

### `components/ui/icons/ship.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ShipIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ShipIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			delay: 0.15,
			opacity: { delay: 0.1 },
		},
	},
};

const gVariants: Variants = {
	normal: { rotate: 0 },
	animate: {
		rotate: [-3, 3, -3],
		transition: {
			repeat: Infinity,
			repeatType: "mirror" as const,
			duration: 1.2,
			ease: "easeInOut",
		},
	},
};

const ShipIcon = forwardRef<ShipIconHandle, ShipIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
						variants={pathVariants}
						animate={controls}
						custom={2}
					/>
					<motion.g variants={gVariants} animate={controls}>
						<path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
						<path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
						<path d="M12 10v4" />
						<path d="M12 2v3" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

ShipIcon.displayName = "ShipIcon";

export { ShipIcon };
```

### `components/ui/icons/shower-head.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ShowerHeadIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ShowerHeadIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const dropVariants: Variants = {
	animate: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const dropChildVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: {
		opacity: [1, 0.2, 1],
		transition: {
			duration: 1,
			repeat: Infinity,
			ease: "easeInOut",
		},
	},
};

const dropPath = [
	{ id: "drop1", d: "M14 17v.01" },
	{ id: "drop2", d: "M10 16v.01" },
	{ id: "drop3", d: "M13 13v.01" },
	{ id: "drop4", d: "M16 10v.01" },
	{ id: "drop5", d: "M11 20v.01" },
	{ id: "drop6", d: "M17 14v.01" },
	{ id: "drop7", d: "M20 11v.01" },
];

const ShowerHeadIcon = forwardRef<ShowerHeadIconHandle, ShowerHeadIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="m4 4 2.5 2.5" />
					<path d="M13.5 6.5a4.95 4.95 0 0 0-7 7" />
					<path d="M15 5 5 15" />
					<motion.g
						variants={dropVariants}
						animate={controls}
						initial="normal"
					>
						{dropPath.map((path) => (
							<motion.path
								variants={dropChildVariants}
								key={path.id}
								d={path.d}
							/>
						))}
					</motion.g>
				</svg>
			</div>
		);
	}
);

ShowerHeadIcon.displayName = "ShowerHeadIcon";

export { ShowerHeadIcon };
```

### `components/ui/icons/smartphone-charging.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface SmartphoneChargingIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SmartphoneChargingIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const SmartphoneChargingIcon = forwardRef<
	SmartphoneChargingIconHandle,
	SmartphoneChargingIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
				<motion.path
					d="M12.667 8 10 12h4l-2.667 4"
					variants={{
						normal: { opacity: 1 },
						animate: {
							opacity: [1, 0.4, 1],
							transition: {
								duration: 1,
								repeat: Infinity,
								ease: "easeInOut",
							},
						},
					}}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

SmartphoneChargingIcon.displayName = "SmartphoneChargingIcon";

export { SmartphoneChargingIcon };
```

### `components/ui/icons/smile-plus.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface SmilePlusIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SmilePlusIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const SmilePlusIcon = forwardRef<SmilePlusIconHandle, SmilePlusIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("animate");
				else onMouseEnter?.(e);
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("normal");
				else onMouseLeave?.(e);
			},
			[controls, onMouseLeave]
		);

		const faceVariants: Variants = {
			normal: { scale: 1 },
			animate: {
				scale: 1.1,
				transition: { type: "spring", stiffness: 200, damping: 20 },
			},
		};

		const plusVariants: Variants = {
			normal: { rotate: 0, scale: 1 },
			animate: {
				rotate: 90,
				scale: 1.2,
				transition: {
					type: "spring",
					stiffness: 200,
					damping: 20,
					delay: 0.1,
				},
			},
		};

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					animate={controls}
					variants={faceVariants}
				>
					<path d="M22 11v1a10 10 0 1 1-9-10" />
					<path d="M8 14s1.5 2 4 2 4-2 4-2" />
					<line x1="9" x2="9.01" y1="9" y2="9" />
					<line x1="15" x2="15.01" y1="9" y2="9" />
					<motion.path
						variants={plusVariants}
						animate={controls}
						d="M16 5h6"
					/>
					<motion.path
						variants={plusVariants}
						animate={controls}
						d="M19 2v6"
					/>
				</motion.svg>
			</div>
		);
	}
);

SmilePlusIcon.displayName = "SmilePlusIcon";

export { SmilePlusIcon };
```

### `components/ui/icons/smile.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface SmileIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SmileIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const SmileIcon = forwardRef<SmileIconHandle, SmileIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("animate");
				onMouseEnter?.(e);
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("normal");
				onMouseLeave?.(e);
			},
			[controls, onMouseLeave]
		);

		const faceVariants: Variants = {
			normal: {
				scale: 1,
				rotate: 0,
				strokeWidth: 2,
				transition: { duration: 0.3, ease: "easeOut" },
			},
			animate: {
				scale: [1, 1.15, 1.05, 1.1],
				rotate: [0, -3, 3, 0],
				strokeWidth: [2, 2.5, 2.5, 2.5],
				transition: {
					duration: 0.8,
					times: [0, 0.3, 0.6, 1],
					ease: "easeInOut",
				},
			},
		};

		const mouthVariants: Variants = {
			normal: {
				d: "M8 14s1.5 2 4 2 4-2 4-2",
				pathLength: 1,
				pathOffset: 0,
				strokeWidth: 2,
				transition: { duration: 0.3, ease: "easeOut" },
			},
			animate: {
				d: "M7 13.5s2.5 3.5 5 3.5 5-3.5 5-3.5",
				pathLength: [0.3, 1, 1],
				pathOffset: [0, 0, 0],
				strokeWidth: 2.5,
				transition: {
					d: { duration: 0.4, ease: "easeOut" },
					pathLength: {
						duration: 0.5,
						times: [0, 0.5, 1],
						ease: "easeInOut",
					},
					delay: 0.1,
				},
			},
		};

		const eyeVariants: Variants = {
			normal: {
				scale: 1,
				opacity: 1,
				transition: { duration: 0.3, ease: "easeOut" },
			},
			animate: {
				scale: [1, 1.5, 0.8, 1.2],
				opacity: [1, 1, 1, 1],
				transition: {
					duration: 0.5,
					times: [0, 0.3, 0.6, 1],
					ease: "easeInOut",
				},
			},
		};

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					animate={controls}
					initial="normal"
					variants={faceVariants}
				>
					<motion.circle cx="12" cy="12" r="10" />
					<motion.path
						variants={mouthVariants}
						animate={controls}
						initial="normal"
						d="M8 14s1.5 2 4 2 4-2 4-2"
					/>
					<motion.line
						x1="9"
						x2="9.01"
						y1="9"
						y2="9"
						variants={eyeVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.line
						x1="15"
						x2="15.01"
						y1="9"
						y2="9"
						variants={eyeVariants}
						animate={controls}
						initial="normal"
					/>
				</motion.svg>
			</div>
		);
	}
);

SmileIcon.displayName = "SmileIcon";

export { SmileIcon };
```

### `components/ui/icons/sparkles.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface SparklesIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SparklesIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const sparkleVariants: Variants = {
	initial: {
		y: 0,
		fill: "none",
	},
	hover: {
		y: [0, -1, 0, 0],
		fill: "currentColor",
		transition: {
			duration: 1,
			bounce: 0.3,
		},
	},
};

const starVariants: Variants = {
	initial: {
		opacity: 1,
		x: 0,
		y: 0,
	},
	blink: () => ({
		opacity: [0, 1, 0, 0, 0, 0, 1],
		transition: {
			duration: 2,
			type: "spring",
			stiffness: 70,
			damping: 10,
			mass: 0.4,
		},
	}),
};

const SparklesIcon = forwardRef<SparklesIconHandle, SparklesIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const starControls = useAnimation();
		const sparkleControls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => {
					sparkleControls.start("hover");
					starControls.start("blink", { delay: 1 });
				},
				stopAnimation: () => {
					sparkleControls.start("initial");
					starControls.start("initial");
				},
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					sparkleControls.start("hover");
					starControls.start("blink", { delay: 1 });
				} else {
					onMouseEnter?.(e);
				}
			},
			[onMouseEnter, sparkleControls, starControls]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					sparkleControls.start("initial");
					starControls.start("initial");
				} else {
					onMouseLeave?.(e);
				}
			},
			[sparkleControls, starControls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
						variants={sparkleVariants}
						animate={sparkleControls}
					/>
					<motion.path
						d="M20 3v4"
						variants={starVariants}
						animate={starControls}
					/>
					<motion.path
						d="M22 5h-4"
						variants={starVariants}
						animate={starControls}
					/>
					<motion.path
						d="M4 17v2"
						variants={starVariants}
						animate={starControls}
					/>
					<motion.path
						d="M5 18H3"
						variants={starVariants}
						animate={starControls}
					/>
				</svg>
			</div>
		);
	}
);

SparklesIcon.displayName = "SparklesIcon";

export { SparklesIcon };
```

### `components/ui/icons/square-activity.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface ActivityIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface ActivityIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: "linear",
			opacity: { duration: 0.1 },
		},
	},
};

const squareVariants: Variants = {
	normal: {
		transition: {
			duration: 0.4,
		},
	},
	animate: {
		transition: {
			duration: 0.6,
			ease: "easeInOut",
		},
	},
};

const SquareActivityIcon = forwardRef<ActivityIconHandle, ActivityIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.rect
						width="18"
						height="18"
						x="3"
						y="3"
						rx="2"
						variants={squareVariants}
						animate={controls}
						initial="normal"
					/>
					<motion.path
						variants={pathVariants}
						animate={controls}
						initial="normal"
						d="M17 12h-2l-2 5-2-10-2 5H7"
					/>
				</svg>
			</div>
		);
	}
);

SquareActivityIcon.displayName = "SquareActivityIcon";

export { SquareActivityIcon };
```

### `components/ui/icons/square-arrow-down.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface SquareArrowDownIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SquareArrowDownIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const squareVariants: Variants = {
	normal: { transition: { duration: 0.4 } },
	animate: { transition: { duration: 0.6, ease: "easeInOut" } },
};

const pathVariants: Variants = {
	normal: { d: "m8 12 4 4 4-4", translateY: 0, opacity: 1 },
	animate: {
		d: "m8 12 4 4 4-4",
		translateY: [0, -3, 0],
		transition: { duration: 0.4 },
	},
};

const secondPathVariants: Variants = {
	normal: { d: "M12 8v8", opacity: 1 },
	animate: {
		d: ["M12 8v8", "M12 8v5", "M12 8v8"],
		transition: { duration: 0.4 },
	},
};

const SquareArrowDownIcon = forwardRef<
	SquareArrowDownIconHandle,
	SquareArrowDownIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) controls.start("animate");
			else onMouseEnter?.(e);
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) controls.start("normal");
			else onMouseLeave?.(e);
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.rect
					width="18"
					height="18"
					x="3"
					y="3"
					rx="2"
					variants={squareVariants}
					animate={controls}
					initial="normal"
				/>
				<motion.path
					variants={pathVariants}
					animate={controls}
					initial="normal"
					d="m8 12 4 4 4-4"
				/>
				<motion.path
					variants={secondPathVariants}
					animate={controls}
					initial="normal"
					d="M12 8v8"
				/>
			</svg>
		</div>
	);
});

SquareArrowDownIcon.displayName = "SquareArrowDownIcon";

export { SquareArrowDownIcon };
```

### `components/ui/icons/square-arrow-left.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface SquareArrowLeftIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SquareArrowLeftIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const squareVariants: Variants = {
	normal: { transition: { duration: 0.4 } },
	animate: { transition: { duration: 0.6, ease: "easeInOut" } },
};

const pathVariants: Variants = {
	normal: { d: "m12 8-4 4 4 4", translateX: 0, opacity: 1 },
	animate: {
		d: "m12 8-4 4 4 4",
		translateX: [0, 3, 0],
		transition: { duration: 0.4 },
	},
};

const secondPathVariants: Variants = {
	normal: { d: "M16 12H8", opacity: 1 },
	animate: {
		d: ["M16 12H8", "M16 12H13", "M16 12H8"],
		transition: { duration: 0.4 },
	},
};

const SquareArrowLeftIcon = forwardRef<
	SquareArrowLeftIconHandle,
	SquareArrowLeftIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) controls.start("animate");
			else onMouseEnter?.(e);
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) controls.start("normal");
			else onMouseLeave?.(e);
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.rect
					width="18"
					height="18"
					x="3"
					y="3"
					rx="2"
					variants={squareVariants}
					animate={controls}
					initial="normal"
				/>
				<motion.path
					variants={pathVariants}
					animate={controls}
					initial="normal"
					d="m12 8-4 4 4 4"
				/>
				<motion.path
					variants={secondPathVariants}
					animate={controls}
					initial="normal"
					d="M16 12H8"
				/>
			</svg>
		</div>
	);
});

SquareArrowLeftIcon.displayName = "SquareArrowLeftIcon";

export { SquareArrowLeftIcon };
```

### `components/ui/icons/square-arrow-right.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface SquareArrowRightIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SquareArrowRightIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const squareVariants: Variants = {
	normal: { transition: { duration: 0.4 } },
	animate: { transition: { duration: 0.6, ease: "easeInOut" } },
};

const pathVariants: Variants = {
	normal: { d: "M8 12h8", opacity: 1 },
	animate: {
		d: ["M8 12h8", "M8 12h5", "M8 12h8"],
		transition: { duration: 0.4 },
	},
};

const secondPathVariants: Variants = {
	normal: { d: "m12 8 4 4-4 4", translateX: 0, opacity: 1 },
	animate: {
		d: "m12 8 4 4-4 4",
		translateX: [0, -3, 0],
		transition: { duration: 0.4 },
	},
};

const SquareArrowRightIcon = forwardRef<
	SquareArrowRightIconHandle,
	SquareArrowRightIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) controls.start("animate");
			else onMouseEnter?.(e);
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) controls.start("normal");
			else onMouseLeave?.(e);
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.rect
					width="18"
					height="18"
					x="3"
					y="3"
					rx="2"
					variants={squareVariants}
					animate={controls}
					initial="normal"
				/>
				<motion.path
					variants={pathVariants}
					animate={controls}
					initial="normal"
					d="M8 12h8"
				/>
				<motion.path
					variants={secondPathVariants}
					animate={controls}
					initial="normal"
					d="m12 8 4 4-4 4"
				/>
			</svg>
		</div>
	);
});

SquareArrowRightIcon.displayName = "SquareArrowRightIcon";

export { SquareArrowRightIcon };
```

### `components/ui/icons/square-arrow-up.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface SquareArrowUpIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SquareArrowUpIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const squareVariants: Variants = {
	normal: { transition: { duration: 0.4 } },
	animate: { transition: { duration: 0.6, ease: "easeInOut" } },
};

const pathVariants: Variants = {
	normal: { d: "m16 12-4-4-4 4", translateY: 0, opacity: 1 },
	animate: {
		d: "m16 12-4-4-4 4",
		translateY: [0, 3, 0],
		transition: { duration: 0.4 },
	},
};

const secondPathVariants: Variants = {
	normal: { d: "M12 16V8", opacity: 1 },
	animate: {
		d: ["M12 16V8", "M12 16V13", "M12 16V8"],
		transition: { duration: 0.4 },
	},
};

const SquareArrowUpIcon = forwardRef<
	SquareArrowUpIconHandle,
	SquareArrowUpIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) controls.start("animate");
			else onMouseEnter?.(e);
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) controls.start("normal");
			else onMouseLeave?.(e);
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.rect
					width="18"
					height="18"
					x="3"
					y="3"
					rx="2"
					variants={squareVariants}
					animate={controls}
					initial="normal"
				/>
				<motion.path
					variants={pathVariants}
					animate={controls}
					initial="normal"
					d="m16 12-4-4-4 4"
				/>
				<motion.path
					variants={secondPathVariants}
					animate={controls}
					initial="normal"
					d="M12 16V8"
				/>
			</svg>
		</div>
	);
});

SquareArrowUpIcon.displayName = "SquareArrowUpIcon";

export { SquareArrowUpIcon };
```

### `components/ui/icons/square-chevron-down.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface SquareChevronDownIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SquareChevronDownIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	times: [0, 0.4, 1],
	duration: 0.5,
};

const SquareChevronDownIcon = forwardRef<
	SquareChevronDownIconHandle,
	SquareChevronDownIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect width="18" height="18" x="3" y="3" rx="2" />
				<motion.path
					variants={{
						normal: { y: 0 },
						animate: { y: [0, 2, 0] },
					}}
					transition={defaultTransition}
					animate={controls}
					d="m16 10-4 4-4-4"
				/>
			</svg>
		</div>
	);
});

SquareChevronDownIcon.displayName = "SquareChevronDownIcon";

export { SquareChevronDownIcon };
```

### `components/ui/icons/square-chevron-left.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface SquareChevronLeftIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SquareChevronLeftIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	times: [0, 0.4, 1],
	duration: 0.5,
};

const SquareChevronLeftIcon = forwardRef<
	SquareChevronLeftIconHandle,
	SquareChevronLeftIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect width="18" height="18" x="3" y="3" rx="2" />
				<motion.path
					variants={{
						normal: { x: 0 },
						animate: { x: [0, -2, 0] },
					}}
					transition={defaultTransition}
					animate={controls}
					d="m14 16-4-4 4-4"
				/>
			</svg>
		</div>
	);
});

SquareChevronLeftIcon.displayName = "SquareChevronLeftIcon";

export { SquareChevronLeftIcon };
```

### `components/ui/icons/square-chevron-right.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface SquareChevronRightIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SquareChevronRightIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	times: [0, 0.4, 1],
	duration: 0.5,
};

const SquareChevronRightIcon = forwardRef<
	SquareChevronRightIconHandle,
	SquareChevronRightIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect width="18" height="18" x="3" y="3" rx="2" />
				<motion.path
					variants={{
						normal: { x: 0 },
						animate: { x: [0, 2, 0] },
					}}
					transition={defaultTransition}
					animate={controls}
					d="m10 8 4 4-4 4"
				/>
			</svg>
		</div>
	);
});

SquareChevronRightIcon.displayName = "SquareChevronRightIcon";

export { SquareChevronRightIcon };
```

### `components/ui/icons/square-chevron-up.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface SquareChevronUpIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SquareChevronUpIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const defaultTransition: Transition = {
	times: [0, 0.4, 1],
	duration: 0.5,
};

const SquareChevronUpIcon = forwardRef<
	SquareChevronUpIconHandle,
	SquareChevronUpIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<rect width="18" height="18" x="3" y="3" rx="2" />
				<motion.path
					variants={{
						normal: { y: 0 },
						animate: { y: [0, -2, 0] },
					}}
					transition={defaultTransition}
					animate={controls}
					d="m8 14 4-4 4 4"
				/>
			</svg>
		</div>
	);
});

SquareChevronUpIcon.displayName = "SquareChevronUpIcon";

export { SquareChevronUpIcon };
```

### `components/ui/icons/square-pen.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface SquarePenIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SquarePenIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const penVariants: Variants = {
	normal: {
		rotate: 0,
		x: 0,
		y: 0,
	},
	animate: {
		rotate: [-0.5, 0.5, -0.5],
		x: [0, -1, 1.5, 0],
		y: [0, 1.5, -1, 0],
	},
};

const SquarePenIcon = forwardRef<SquarePenIconHandle, SquarePenIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					style={{ overflow: "visible" }}
				>
					<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
					<motion.path
						d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
						variants={penVariants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

SquarePenIcon.displayName = "SquarePenIcon";

export { SquarePenIcon };
```

### `components/ui/icons/square-stack.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface SquareStackIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SquareStackIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const rectVariants: Variants = {
	normal: { scale: 1 },
	animate: {
		scale: [1, 0.8, 1],
		transition: { duration: 0.4 },
	},
};

const pathVariants: Variants = {
	normal: { scale: 1 },
	animate: {
		scale: [1, 0.9, 1],
	},
};

const SquareStackIcon = forwardRef<SquareStackIconHandle, SquareStackIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						variants={pathVariants}
						animate={controls}
						transition={{
							delay: 0.3,
							duration: 0.4,
						}}
						d="M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"
					/>
					<motion.path
						d="M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"
						variants={pathVariants}
						animate={controls}
						transition={{
							delay: 0.2,
							duration: 0.2,
						}}
					/>
					<motion.rect
						variants={rectVariants}
						width="8"
						height="8"
						x="14"
						y="14"
						rx="2"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

SquareStackIcon.displayName = "SquareStackIcon";

export { SquareStackIcon };
```

### `components/ui/icons/stethoscope.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface StethoscopeIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface StethoscopeIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const DURATION = 0.25;

const calculateDelay = (i: number) => {
	return i === 0 ? 0.1 : i * DURATION + 0.1;
};

const StethoscopeIcon = forwardRef<StethoscopeIconHandle, StethoscopeIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M11 2v2"
						animate={controls}
						transition={{
							duration: DURATION,
							delay: calculateDelay(2),
							opacity: { delay: calculateDelay(2) },
						}}
						variants={{
							normal: {
								pathLength: 1,
								pathOffset: 0,
								opacity: 1,
								transition: { delay: 0 },
							},
							animate: {
								pathOffset: [1, 0],
								pathLength: [0, 1],
								opacity: [0, 1],
							},
						}}
					/>
					<motion.path
						d="M5 2v2"
						animate={controls}
						transition={{
							duration: DURATION,
							delay: calculateDelay(2),
							opacity: { delay: calculateDelay(2) },
						}}
						variants={{
							normal: {
								pathLength: 1,
								pathOffset: 0,
								opacity: 1,
								transition: { delay: 0 },
							},
							animate: {
								pathOffset: [1, 0],
								pathLength: [0, 1],
								opacity: [0, 1],
							},
						}}
					/>
					<motion.path
						d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"
						animate={controls}
						transition={{
							duration: DURATION,
							delay: calculateDelay(2),
							opacity: { delay: calculateDelay(2) },
						}}
						variants={{
							normal: {
								pathLength: 1,
								pathOffset: 0,
								opacity: 1,
								transition: { delay: 0 },
							},
							animate: {
								pathLength: [0, 1],
								pathOffset: [1, 0],
								opacity: [0, 1],
							},
						}}
					/>
					<motion.path
						d="M8 15a6 6 0 0 0 12 0v-3"
						animate={controls}
						transition={{
							duration: DURATION,
							delay: calculateDelay(1),
							opacity: { delay: calculateDelay(1) },
						}}
						variants={{
							normal: {
								pathLength: 1,
								pathOffset: 0,
								opacity: 1,
								transition: { delay: 0 },
							},
							animate: {
								pathOffset: [1, 0],
								pathLength: [0, 1],
								opacity: [0, 1],
							},
						}}
					/>
					<motion.circle
						cx="20"
						cy="10"
						r="2"
						animate={controls}
						transition={{
							duration: DURATION,
							delay: calculateDelay(0),
							opacity: { delay: calculateDelay(0) },
						}}
						variants={{
							normal: {
								pathLength: 1,
								opacity: 1,
								transition: { delay: 0 },
							},
							animate: {
								pathLength: [0, 1],
								opacity: [0, 1],
							},
						}}
					/>
				</svg>
			</div>
		);
	}
);

StethoscopeIcon.displayName = "StethoscopeIcon";

export { StethoscopeIcon };
```

### `components/ui/icons/sun-dim.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface SunDimIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SunDimIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { opacity: 1 },
	animate: (i: number) => ({
		opacity: [0, 1],
		transition: { delay: i * 0.1, duration: 0.3 },
	}),
};

const SunDimIcon = forwardRef<SunDimIconHandle, SunDimIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="12" r="4" />
					{[
						"M12 4h.01",
						"M20 12h.01",
						"M12 20h.01",
						"M4 12h.01",
						"M17.657 6.343h.01",
						"M17.657 17.657h.01",
						"M6.343 17.657h.01",
						"M6.343 6.343h.01",
					].map((d, index) => (
						<motion.path
							key={d}
							d={d}
							animate={controls}
							variants={pathVariants}
							custom={index + 1}
						/>
					))}
				</svg>
			</div>
		);
	}
);

SunDimIcon.displayName = "SunDimIcon";

export { SunDimIcon };
```

### `components/ui/icons/sun-medium.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface SunMediumIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SunMediumIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { opacity: 1 },
	animate: (i: number) => ({
		opacity: [0, 1],
		transition: { delay: i * 0.1, duration: 0.3 },
	}),
};

const SunMediumIcon = forwardRef<SunMediumIconHandle, SunMediumIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="12" r="4" />
					{[
						"M12 3v1",
						"M12 20v1",
						"M3 12h1",
						"M20 12h1",
						"m18.364 5.636-.707.707",
						"m6.343 17.657-.707.707",
						"m5.636 5.636.707.707",
						"m17.657 17.657.707.707",
					].map((d, index) => (
						<motion.path
							key={d}
							d={d}
							animate={controls}
							variants={pathVariants}
							custom={index + 1}
						/>
					))}
				</svg>
			</div>
		);
	}
);

SunMediumIcon.displayName = "SunMediumIcon";

export { SunMediumIcon };
```

### `components/ui/icons/sun-moon.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface SunMoonIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SunMoonIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const sunVariants: Variants = {
	normal: {
		rotate: 0,
	},
	animate: {
		rotate: [0, -5, 5, -2, 2, 0],
		transition: {
			duration: 1.5,
			ease: "easeInOut",
		},
	},
};

const moonVariants: Variants = {
	normal: { opacity: 1 },
	animate: (i: number) => ({
		opacity: [0, 1],
		transition: { delay: i * 0.1, duration: 0.3 },
	}),
};

const SunMoonIcon = forwardRef<SunMoonIconHandle, SunMoonIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const sunControls = useAnimation();
		const moonControls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => {
					sunControls.start("animate");
					moonControls.start("animate");
				},
				stopAnimation: () => {
					sunControls.start("normal");
					moonControls.start("normal");
				},
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					sunControls.start("animate");
					moonControls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[sunControls, moonControls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					sunControls.start("normal");
					moonControls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[sunControls, moonControls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.g
						variants={sunVariants}
						animate={sunControls}
						initial="normal"
					>
						<path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
					</motion.g>
					{[
						"M12 2v2",
						"M12 20v2",
						"m4.9 4.9 1.4 1.4",
						"m17.7 17.7 1.4 1.4",
						"M2 12h2",
						"M20 12h2",
						"m6.3 17.7-1.4 1.4",
						"m19.1 4.9-1.4 1.4",
					].map((d, index) => (
						<motion.path
							key={d}
							d={d}
							animate={moonControls}
							variants={moonVariants}
							custom={index + 1}
							initial="normal"
						/>
					))}
				</svg>
			</div>
		);
	}
);

SunMoonIcon.displayName = "SunMoonIcon";

export { SunMoonIcon };
```

### `components/ui/icons/sun.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface SunIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SunIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: { opacity: 1 },
	animate: (i: number) => ({
		opacity: [0, 1],
		transition: { delay: i * 0.1, duration: 0.3 },
	}),
};

const SunIcon = forwardRef<SunIconHandle, SunIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="12" cy="12" r="4" />
					{[
						"M12 2v2",
						"m19.07 4.93-1.41 1.41",
						"M20 12h2",
						"m17.66 17.66 1.41 1.41",
						"M12 20v2",
						"m6.34 17.66-1.41 1.41",
						"M2 12h2",
						"m4.93 4.93 1.41 1.41",
					].map((d, index) => (
						<motion.path
							key={d}
							d={d}
							animate={controls}
							variants={pathVariants}
							custom={index + 1}
						/>
					))}
				</svg>
			</div>
		);
	}
);

SunIcon.displayName = "SunIcon";

export { SunIcon };
```

### `components/ui/icons/sunset.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface SunsetIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SunsetIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const arrowVariants: Variants = {
	normal: {
		y: 0,
	},
	animate: {
		y: [0, 1, 0],
	},
};
const raysVariants: Variants = {
	normal: { opacity: 1 },
	animate: (i: number) => ({
		opacity: [0, 1],
		transition: { delay: i * 0.1, duration: 0.3 },
	}),
};

const SunsetIcon = forwardRef<SunsetIconHandle, SunsetIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const arrowControls = useAnimation();
		const raysControls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => {
					arrowControls.start("animate");
					raysControls.start("animate");
				},
				stopAnimation: () => {
					arrowControls.start("normal");
					raysControls.start("normal");
				},
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					arrowControls.start("animate");
					raysControls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[arrowControls, raysControls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					arrowControls.start("normal");
					raysControls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[arrowControls, raysControls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.g
						animate={arrowControls}
						initial="normal"
						variants={arrowVariants}
					>
						<path d="M12 10V2" />
						<path d="m16 6-4 4-4-4" />
					</motion.g>

					{[
						"m4.93 10.93 1.41 1.41",
						"M2 18h2",
						"M20 18h2",
						"m19.07 10.93-1.41 1.41",
						"M22 22H2",
						,
					].map((d, index) => (
						<motion.path
							key={d}
							d={d}
							animate={raysControls}
							variants={raysVariants}
							custom={index + 1}
							initial="normal"
						/>
					))}
					<path d="M16 18a4 4 0 0 0-8 0" />
				</svg>
			</div>
		);
	}
);

SunsetIcon.displayName = "SunsetIcon";

export { SunsetIcon };
```

### `components/ui/icons/syringe.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface SyringeIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface SyringeIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const SyringeIcon = forwardRef<SyringeIconHandle, SyringeIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 512 512"
					fill="currentColor"
					stroke="currentColor"
					strokeWidth="5.632"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={{
						normal: {
							translateX: 0,
							translateY: 0,
							rotate: "0deg",
						},
						animate: {
							translateX: -3,
							translateY: 3,
							rotate: "1deg",
						},
					}}
					animate={controls}
					transition={{ type: "spring", stiffness: 250, damping: 25 }}
					className="icon"
				>
					<path d="M450.327,224.582l-46.545-46.545c-4.655-4.655-11.636-4.655-16.291,0s-4.655,11.636,0,16.291l15.127,15.127L205.964,406.109c-4.655,4.655-11.636,4.655-16.291,0l-18.618-18.618c-4.655-4.655-11.636-4.655-16.291,0l-18.618,18.618c-4.655,4.655-11.636,4.655-16.291,0l-13.964-13.964c-2.327-2.327-3.491-4.655-3.491-8.145s1.164-5.818,3.491-8.145l18.618-18.618c4.655-4.655,4.655-11.636,0-16.291l-18.618-18.618c-2.327-2.327-3.491-4.655-3.491-8.145c0-3.491,1.164-5.818,3.491-8.146l169.891-169.891c4.655-4.655,4.655-11.636,0-16.291s-11.636-4.655-16.291,0L89.6,289.745c-6.982,6.982-10.473,15.127-10.473,24.436S82.618,332.8,89.6,338.618l10.473,10.473L89.6,359.564c-6.982,6.982-10.473,15.127-10.473,24.436c0,8.145,3.491,16.291,9.309,23.273L3.491,492.218c-4.655,4.655-4.655,11.636,0,16.291C5.818,510.836,8.145,512,11.636,512s5.818-1.164,8.145-3.491l84.945-84.945c13.964,11.636,34.909,11.636,47.709-1.164l10.473-10.473l10.473,10.473c6.982,6.982,16.291,10.473,24.436,10.473c9.309,0,17.455-3.491,24.436-10.473l196.655-196.655l15.127,15.127c2.327,2.327,5.818,3.491,8.145,3.491s5.818-1.164,8.145-3.491C454.982,236.218,454.982,229.236,450.327,224.582z"></path>
					<path d="M508.509,119.855L392.145,3.491c-4.655-4.655-11.636-4.655-16.291,0s-4.655,11.636,0,16.291l39.564,39.564c2.327,2.327,3.491,6.982,3.491,10.473s-1.164,8.145-4.655,10.473l-53.527,54.691l-73.309-73.309c-4.655-4.655-11.636-4.655-16.291,0s-4.655,11.636,0,16.291l73.309,73.309L244.364,251.345L217.6,224.582c-4.655-4.655-11.636-4.655-16.291,0s-4.655,11.636,0,16.291l69.818,69.818c2.327,2.327,5.818,3.491,8.145,3.491s5.818-1.164,8.145-3.491c4.655-4.655,4.655-11.636,0-16.291l-26.764-26.764L431.709,97.745c6.982-5.818,15.127-5.818,22.109,0l38.4,38.4c2.327,2.327,5.818,3.491,8.145,3.491s5.818-1.164,8.145-3.491C513.164,131.491,513.164,124.509,508.509,119.855z"></path>
				</motion.svg>
			</div>
		);
	}
);

SyringeIcon.displayName = "SyringeIcon";

export { SyringeIcon };
```

### `components/ui/icons/telescope.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface TelescopeIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface TelescopeIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const scopeVariants: Variants = {
	normal: {
		rotate: 0,
		transition: {
			duration: 0.6,
			ease: "easeInOut",
		},
	},
	animate: {
		rotate: -15,
		transition: {
			duration: 0.8,
			ease: "easeInOut",
		},
	},
};

const TelescopeIcon = forwardRef<TelescopeIconHandle, TelescopeIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.g
						variants={scopeVariants}
						animate={controls}
						style={{ transformOrigin: "12px 13px" }}
					>
						<path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
						<path d="m13.56 11.747 4.332-.924" />
						<path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
						<path d="m13.56 11.747 4.332-.924" />
						<path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" />
						<path d="m6.158 8.633 1.114 4.456" />
					</motion.g>
					<path d="m16 21-3.105-6.21" />
					<path d="m8 21 3.105-6.21" />
					<circle cx="12" cy="13" r="2" />
				</svg>
			</div>
		);
	}
);

TelescopeIcon.displayName = "TelescopeIcon";

export { TelescopeIcon };
```

### `components/ui/icons/terminal.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface TerminalIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface TerminalIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const lineVariants: Variants = {
	normal: { opacity: 1 },
	animate: {
		opacity: [1, 0, 1],
		transition: {
			duration: 0.8,
			repeat: Infinity,
			ease: "linear",
		},
	},
};

const TerminalIcon = forwardRef<TerminalIconHandle, TerminalIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<polyline points="4 17 10 11 4 5" />
					<motion.line
						x1="12"
						x2="20"
						y1="19"
						y2="19"
						variants={lineVariants}
						animate={controls}
						initial="normal"
					/>
				</svg>
			</div>
		);
	}
);

TerminalIcon.displayName = "TerminalIcon";

export { TerminalIcon };
```

### `components/ui/icons/timer.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface TimerIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface TimerIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const handVariants: Variants = {
	normal: {
		rotate: 0,
		originX: "12px",
		originY: "14px",
		transition: {
			duration: 0.6,
			ease: [0.4, 0, 0.2, 1],
		},
	},
	animate: {
		rotate: 300,
		transition: {
			delay: 0.1,
			duration: 0.6,
			ease: [0.4, 0, 0.2, 1],
		},
	},
};

const buttonVariants: Variants = {
	normal: {
		scale: 1,
		y: 0,
	},
	animate: {
		scale: [0.9, 1],
		y: [0, 1, 0],
		transition: {
			duration: 0.3,
			ease: [0.4, 0, 0.2, 1],
		},
	},
};

const TimerIcon = forwardRef<TimerIconHandle, TimerIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.line
						x1="10"
						x2="14"
						y1="2"
						y2="2"
						animate={controls}
						variants={buttonVariants}
					/>
					<motion.line
						x1="12"
						x2="15"
						y1="14"
						y2="11"
						initial="normal"
						animate={controls}
						variants={handVariants}
					/>
					<circle cx="12" cy="14" r="8" />
				</svg>
			</div>
		);
	}
);

TimerIcon.displayName = "TimerIcon";

export { TimerIcon };
```

### `components/ui/icons/tornado.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface TornadoIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface TornadoIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
	animate: (custom: number) => ({
		x: [0, custom * 1, 0],
		opacity: 1,
		transition: {
			x: {
				duration: 0.6,
				repeat: 0.7,
				repeatType: "reverse",
				ease: "easeInOut",
				delay: custom * 0.1,
			},
		},
	}),
};

const TornadoIcon = forwardRef<TornadoIconHandle, TornadoIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M21 4H3"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="M18 8H6"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={2}
					/>
					<motion.path
						d="M19 12H9"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={3}
					/>
					<motion.path
						d="M16 16h-6"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={4}
					/>
					<motion.path
						d="M11 20H9"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={5}
					/>
				</svg>
			</div>
		);
	}
);

TornadoIcon.displayName = "TornadoIcon";

export { TornadoIcon };
```

### `components/ui/icons/train-track.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface TrainTrackIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface TrainTrackIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const transition: Transition = {
	duration: 0.3,
	opacity: { delay: 0.15 },
};

const variants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: (custom: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			...transition,
			delay: 0.1 * custom,
		},
	}),
};

const TrainTrackIcon = forwardRef<TrainTrackIconHandle, TrainTrackIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M2 17 17 2" />
					<motion.path
						d="m2 14 8 8"
						variants={variants}
						animate={controls}
						custom={4}
					/>
					<motion.path
						d="m5 11 8 8"
						variants={variants}
						animate={controls}
						custom={3}
					/>
					<motion.path
						d="m8 8 8 8"
						variants={variants}
						animate={controls}
						custom={2}
					/>
					<motion.path
						d="m11 5 8 8"
						variants={variants}
						animate={controls}
						custom={1}
					/>
					<motion.path
						d="m14 2 8 8"
						variants={variants}
						animate={controls}
						custom={0}
					/>
					<path d="M7 22 22 7" />
				</svg>
			</div>
		);
	}
);

TrainTrackIcon.displayName = "TrainTrackIcon";

export { TrainTrackIcon };
```

### `components/ui/icons/trending-down.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface TrendingDownIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface TrendingDownIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const svgVariants: Variants = {
	animate: {
		x: 0,
		y: 0,
		translateX: [0, 2, 0],
		translateY: [0, 2, 0],
		transition: {
			duration: 0.5,
		},
	},
};

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
};

const arrowVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		transition: {
			delay: 0.3,
			duration: 0.3,
			opacity: { duration: 0.1, delay: 0.3 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [0.5, 0],
		transition: {
			delay: 0.3,
			duration: 0.3,
			opacity: { duration: 0.1, delay: 0.3 },
		},
	},
};

const TrendingDownIcon = forwardRef<
	TrendingDownIconHandle,
	TrendingDownIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				variants={svgVariants}
				initial="normal"
				animate={controls}
			>
				<motion.polyline
					points="22 17 13.5 8.5 8.5 13.5 2 7"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.polyline
					points="16 17 22 17 22 11"
					variants={arrowVariants}
					initial="normal"
					animate={controls}
				/>
			</motion.svg>
		</div>
	);
});

TrendingDownIcon.displayName = "TrendingDownIcon";

export { TrendingDownIcon };
```

### `components/ui/icons/trending-up-down.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface TrendingUpDownIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface TrendingUpDownIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const svgVariants: Variants = {
	animate: {
		x: 0,
		y: 0,
		translateX: [0, 2, 0],
		transition: {
			duration: 0.5,
		},
	},
};

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
};

const arrowVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		transition: {
			delay: 0.3,
			duration: 0.3,
			opacity: { duration: 0.1, delay: 0.3 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [0.5, 0],
		transition: {
			delay: 0.3,
			duration: 0.3,
			opacity: { duration: 0.1, delay: 0.3 },
		},
	},
};

const TrendingUpDownIcon = forwardRef<
	TrendingUpDownIconHandle,
	TrendingUpDownIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				variants={svgVariants}
				initial="normal"
				animate={controls}
			>
				<motion.path
					d="M21 21 14.828 14.828"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M21 16v5h-5"
					variants={arrowVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="m21 3-9 9-4-4-6 6"
					variants={pathVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M21 8V3h-5"
					variants={arrowVariants}
					initial="normal"
					animate={controls}
				/>
			</motion.svg>
		</div>
	);
});

TrendingUpDownIcon.displayName = "TrendingUpDownIcon";

export { TrendingUpDownIcon };
```

### `components/ui/icons/trending-up.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface TrendingUpIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface TrendingUpIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const svgVariants: Variants = {
	animate: {
		x: 0,
		y: 0,
		translateX: [0, 2, 0],
		translateY: [0, -2, 0],
		transition: {
			duration: 0.5,
		},
	},
};

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
};

const arrowVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		transition: {
			delay: 0.3,
			duration: 0.3,
			opacity: { duration: 0.1, delay: 0.3 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [0.5, 0],
		transition: {
			delay: 0.3,
			duration: 0.3,
			opacity: { duration: 0.1, delay: 0.3 },
		},
	},
};

const TrendingUpIcon = forwardRef<TrendingUpIconHandle, TrendingUpIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={svgVariants}
					initial="normal"
					animate={controls}
				>
					<motion.polyline
						points="22 7 13.5 15.5 8.5 10.5 2 17"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
					<motion.polyline
						points="16 7 22 7 22 13"
						variants={arrowVariants}
						initial="normal"
						animate={controls}
					/>
				</motion.svg>
			</div>
		);
	}
);

TrendingUpIcon.displayName = "TrendingUpIcon";

export { TrendingUpIcon };
```

### `components/ui/icons/twitch.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";

export interface TwitchIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface TwitchIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: "linear",
			opacity: { duration: 0.1 },
		},
	},
};

const lineVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: "linear",
			opacity: { duration: 0.1 },
		},
	},
};

const TwitchIcon = forwardRef<TwitchIconHandle, TwitchIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const pathControls = useAnimation();
		const line1Controls = useAnimation();
		const line2Controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => {
					pathControls.start("animate");
					line1Controls.start("animate");
					line2Controls.start("animate");
				},
				stopAnimation: () => {
					pathControls.start("normal");
					line1Controls.start("normal");
					line2Controls.start("normal");
				},
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					pathControls.start("animate");
					line1Controls.start("animate");
					line2Controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[line1Controls, line2Controls, onMouseEnter, pathControls]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					pathControls.start("normal");
					line1Controls.start("normal");
					line2Controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[pathControls, line1Controls, line2Controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={pathControls}
						d="M21 2H3v16h5v4l4-4h5l4-4V2z"
					/>
					<motion.path
						variants={lineVariants}
						initial="normal"
						animate={line1Controls}
						d="M11 11V7"
					/>
					<motion.path
						variants={lineVariants}
						initial="normal"
						animate={line2Controls}
						d="M16 11V7"
					/>
				</svg>
			</div>
		);
	}
);

TwitchIcon.displayName = "TwitchIcon";

export { TwitchIcon };
```

### `components/ui/icons/twitter.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";

export interface TwitterIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface TwitterIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: "linear",
			opacity: { duration: 0.1 },
		},
	},
};

const TwitterIcon = forwardRef<TwitterIconHandle, TwitterIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
						variants={pathVariants}
						initial="normal"
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

TwitterIcon.displayName = "TwitterIcon";

export { TwitterIcon };
```

### `components/ui/icons/underline.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface UnderlineIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface UnderlineIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		pathOffset: [1, 0],
	},
};

const UnderlineIcon = forwardRef<UnderlineIconHandle, UnderlineIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						transition={{ duration: 0.3 }}
						variants={variants}
						animate={controls}
						d="M6 4v6a6 6 0 0 0 12 0V4"
					/>
					<motion.line
						x1="4"
						x2="20"
						y1="20"
						y2="20"
						variants={variants}
						transition={{
							delay: 0.2,
							duration: 0.4,
						}}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

UnderlineIcon.displayName = "UnderlineIcon";

export { UnderlineIcon };
```

### `components/ui/icons/undo-dot.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { cubicBezier, motion, useAnimation } from "motion/react";

export interface UndoDotIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface UndoDotIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const customEasing = cubicBezier(0.25, 0.1, 0.25, 1);

const UndoDotIcon = forwardRef<UndoDotIconHandle, UndoDotIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						transition={{ duration: 0.6, ease: customEasing }}
						variants={{
							normal: { translateX: 0, translateY: 0, rotate: 0 },
							animate: {
								translateX: [0, 2.1, 0],
								translateY: [0, -1.4, 0],
								rotate: [0, 12, 0],
							},
						}}
						animate={controls}
						d="M3 7v6h6"
					/>
					<motion.path
						transition={{ duration: 0.6, ease: customEasing }}
						variants={{
							normal: { pathLength: 1 },
							animate: { pathLength: [1, 0.8, 1] },
						}}
						animate={controls}
						d="M21 17a9 9 0 0 0-15-6.7L3 13"
					/>
					<motion.circle
						transition={{ duration: 0.6, ease: customEasing }}
						variants={{
							normal: { scale: 1 },
							animate: { scale: [1, 1.2, 1] },
						}}
						animate={controls}
						cx="12"
						cy="17"
						r="1"
					/>
				</svg>
			</div>
		);
	}
);

UndoDotIcon.displayName = "UndoDotIcon";

export { UndoDotIcon };
```

### `components/ui/icons/undo.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { cubicBezier, motion, useAnimation } from "motion/react";

export interface UndoIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface UndoIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const customEasing = cubicBezier(0.25, 0.1, 0.25, 1);

const UndoIcon = forwardRef<UndoIconHandle, UndoIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						transition={{
							duration: 0.6,
							ease: customEasing,
						}}
						variants={{
							normal: { translateX: 0, translateY: 0, rotate: 0 },
							animate: {
								translateX: [0, 2.1, 0],
								translateY: [0, -1.4, 0],
								rotate: [0, 12, 0],
							},
						}}
						animate={controls}
						d="M3 7v6h6"
					/>
					<motion.path
						transition={{
							duration: 0.6,
							ease: customEasing,
						}}
						variants={{
							normal: { pathLength: 1 },
							animate: { pathLength: [1, 0.8, 1] },
						}}
						animate={controls}
						d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"
					/>
				</svg>
			</div>
		);
	}
);

UndoIcon.displayName = "UndoIcon";

export { UndoIcon };
```

### `components/ui/icons/upload.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface UploadIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface UploadIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const arrowVariants: Variants = {
	normal: { y: 0 },
	animate: {
		y: -2,
		transition: {
			type: "spring",
			stiffness: 200,
			damping: 10,
			mass: 1,
		},
	},
};

const UploadIcon = forwardRef<UploadIconHandle, UploadIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
					<motion.g variants={arrowVariants} animate={controls}>
						<polyline points="17 8 12 3 7 8" />
						<line x1="12" x2="12" y1="3" y2="15" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

UploadIcon.displayName = "UploadIcon";

export { UploadIcon };
```

### `components/ui/icons/upvote.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface UpvoteIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface UpvoteIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const UpvoteIcon = forwardRef<UpvoteIconHandle, UpvoteIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<motion.svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					variants={{
						normal: {
							translateX: "0px",
							translateY: "0px",
							rotate: "0deg",
						},
						animate: {
							translateX: "-1px",
							translateY: "-2px",
							rotate: "-12deg",
						},
					}}
					animate={controls}
					transition={{ type: "spring", stiffness: 250, damping: 25 }}
				>
					<path d="M7 10v12" />
					<path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
				</motion.svg>
			</div>
		);
	}
);

UpvoteIcon.displayName = "UpvoteIcon";

export { UpvoteIcon };
```

### `components/ui/icons/user-check.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";

export interface UserCheckIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface UserCheckIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const checkVariants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
		transition: {
			duration: 0.3,
		},
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			pathLength: { duration: 0.4, ease: "easeInOut" },
			opacity: { duration: 0.4, ease: "easeInOut" },
		},
	},
};

const UserCheckIcon = forwardRef<UserCheckIconHandle, UserCheckIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
					<circle cx="9" cy="7" r="4" />
					<motion.path
						animate={controls}
						initial="normal"
						variants={checkVariants}
						d="M16 11L18 13L22 9"
						style={{ transformOrigin: "center" }}
					/>
				</svg>
			</div>
		);
	}
);

UserCheckIcon.displayName = "UserCheckIcon";

export { UserCheckIcon };
```

### `components/ui/icons/user-round-check.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";

export interface UserRoundCheckIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface UserRoundCheckIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const checkVariants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
		transition: {
			duration: 0.3,
		},
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			pathLength: { duration: 0.4, ease: "easeInOut" },
			opacity: { duration: 0.4, ease: "easeInOut" },
		},
	},
};

const UserRoundCheckIcon = forwardRef<
	UserRoundCheckIconHandle,
	UserRoundCheckIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M2 21a8 8 0 0 1 13.292-6" />
				<circle cx="10" cy="8" r="5" />
				<motion.path
					animate={controls}
					initial="normal"
					variants={checkVariants}
					d="m16 19 2 2 4-4"
					style={{ transformOrigin: "center" }}
				/>
			</svg>
		</div>
	);
});

UserRoundCheckIcon.displayName = "UserRoundCheckIcon";

export { UserRoundCheckIcon };
```

### `components/ui/icons/user-round-plus.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface UserRoundPlusIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface UserRoundPlusIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const verticalBarVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			delay: 0.3,
			duration: 0.2,
			opacity: { duration: 0.1, delay: 0.3 },
		},
	},
};

const horizontalBarVariants: Variants = {
	normal: {
		opacity: 1,
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		transition: {
			delay: 0.6,
			duration: 0.2,
			opacity: { duration: 0.1, delay: 0.6 },
		},
	},
};

const UserRoundPlusIcon = forwardRef<
	UserRoundPlusIconHandle,
	UserRoundPlusIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;

		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<motion.svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				initial="normal"
			>
				<path d="M2 21a8 8 0 0 1 13.292-6" />
				<circle cx="10" cy="8" r="5" />
				<motion.path
					d="M19 16v6"
					variants={verticalBarVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="M22 19h-6"
					variants={horizontalBarVariants}
					initial="normal"
					animate={controls}
				/>
			</motion.svg>
		</div>
	);
});

UserRoundPlusIcon.displayName = "UserRoundPlusIcon";

export { UserRoundPlusIcon };
```

### `components/ui/icons/user.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface UserIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface UserIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariant: Variants = {
	normal: { pathLength: 1, opacity: 1, pathOffset: 0 },
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		pathOffset: [1, 0],
	},
};

const circleVariant: Variants = {
	normal: {
		pathLength: 1,
		pathOffset: 0,
		scale: 1,
	},
	animate: {
		pathLength: [0, 1],
		pathOffset: [1, 0],
		scale: [0.5, 1],
	},
};

const UserIcon = forwardRef<UserIconHandle, UserIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.circle
						cx="12"
						cy="8"
						r="5"
						animate={controls}
						variants={circleVariant}
					/>

					<motion.path
						d="M20 21a8 8 0 0 0-16 0"
						variants={pathVariant}
						transition={{
							delay: 0.2,
							duration: 0.4,
						}}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

UserIcon.displayName = "UserIcon";

export { UserIcon };
```

### `components/ui/icons/users.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface UsersIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface UsersIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		translateX: 0,
		transition: {
			type: "spring",
			stiffness: 200,
			damping: 13,
		},
	},
	animate: {
		translateX: [-6, 0],
		transition: {
			delay: 0.1,
			type: "spring",
			stiffness: 200,
			damping: 13,
		},
	},
};

const UsersIcon = forwardRef<UsersIconHandle, UsersIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
					<circle cx="9" cy="7" r="4" />
					<motion.path
						d="M22 21v-2a4 4 0 0 0-3-3.87"
						variants={pathVariants}
						animate={controls}
					/>
					<motion.path
						d="M16 3.13a4 4 0 0 1 0 7.75"
						variants={pathVariants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

UsersIcon.displayName = "UsersIcon";

export { UsersIcon };
```

### `components/ui/icons/vibrate.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface VibrateIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface VibrateIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const rectVariants: Variants = {
	normal: {
		rotate: 0,
	},
	animate: {
		rotate: [0, -5, 5, -5, 5, 0],
		transition: {
			duration: 0.4,
			times: [0, 0.2, 0.4, 0.6, 0.8, 1],
		},
	},
};

const VibrateIcon = forwardRef<VibrateIconHandle, VibrateIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="m2 8 2 2-2 2 2 2-2 2" />
					<path d="m22 8-2 2 2 2-2 2 2 2" />
					<motion.rect
						width="8"
						height="14"
						x="8"
						y="5"
						rx="1"
						variants={rectVariants}
						animate={controls}
						style={{ transformOrigin: "center" }}
					/>
				</svg>
			</div>
		);
	}
);

VibrateIcon.displayName = "VibrateIcon";

export { VibrateIcon };
```

### `components/ui/icons/volume.tsx`

```tsx
"use client";

import {
	forwardRef,
	Fragment,
	useCallback,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

export interface VolumeIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface VolumeIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const VolumeIcon = forwardRef<VolumeIconHandle, VolumeIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const [isHovered, setIsHovered] = useState(false);
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => setIsHovered(true),
				stopAnimation: () => setIsHovered(false),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					setIsHovered(true);
				} else {
					onMouseEnter?.(e);
				}
			},
			[onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					setIsHovered(false);
				} else {
					onMouseLeave?.(e);
				}
			},
			[onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
					<AnimatePresence mode="wait" initial={false}>
						{isHovered ? (
							<Fragment>
								<motion.path
									d="M16 9a5 5 0 0 1 0 6"
									animate={{ opacity: 1, transition: { delay: 0.1 } }}
									initial={{ opacity: 0 }}
								/>
								<motion.path
									d="M19.364 18.364a9 9 0 0 0 0-12.728"
									animate={{ opacity: 1, transition: { delay: 0.2 } }}
									initial={{ opacity: 0 }}
								/>
							</Fragment>
						) : (
							<Fragment>
								<motion.line
									x1="22"
									x2="16"
									y1="9"
									y2="15"
									animate={{
										pathLength: [0, 1],
										opacity: [0, 1],
										transition: { delay: 0.1 },
									}}
									initial={{ pathLength: 1, opacity: 1 }}
								/>
								<motion.line
									x1="16"
									x2="22"
									y1="9"
									y2="15"
									animate={{
										pathLength: [0, 1],
										opacity: [0, 1],
										transition: { delay: 0.2 },
									}}
									initial={{ pathLength: 1, opacity: 1 }}
								/>
							</Fragment>
						)}
					</AnimatePresence>
				</svg>
			</div>
		);
	}
);

VolumeIcon.displayName = "VolumeIcon";

export { VolumeIcon };
```

### `components/ui/icons/waves-ladder.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface WavesLadderIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface WavesLadderIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const WavesLadderIcon = forwardRef<WavesLadderIconHandle, WavesLadderIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("animate");
				onMouseEnter?.(e);
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) controls.start("normal");
				onMouseLeave?.(e);
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
					<motion.g
						initial={{ y: 0, opacity: 1 }}
						variants={{
							normal: { y: 0, opacity: 1 },
							animate: {
								y: [13, 0],
								opacity: [0, 0, 1],
								transition: {
									duration: 1,
									times: [0, 0.5, 1],
									repeat: 0,
								},
							},
						}}
						animate={controls}
					>
						<path d="M19 5a2 2 0 0 0-2 2v11" />
						<path d="M7 13h10" />
						<path d="M7 9h10" />
						<path d="M9 5a2 2 0 0 0-2 2v11" />
					</motion.g>
				</svg>
			</div>
		);
	}
);

WavesLadderIcon.displayName = "WavesLadderIcon";
export { WavesLadderIcon };
```

### `components/ui/icons/waves.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface WavesIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface WavesIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const WavesIcon = forwardRef<WavesIconHandle, WavesIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;
			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				}
				onMouseEnter?.(e);
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				}
				onMouseLeave?.(e);
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					"cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center",
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2c2.5 0 2.5-2 5-2c1.3 0 1.9.5 2.5 1"
						initial={{ pathLength: 1 }}
						variants={{
							normal: { pathLength: 1 },
							animate: {
								pathLength: [0, 1],
								transition: { duration: 0.4, ease: "linear" },
							},
						}}
						animate={controls}
					/>
					<motion.path
						d="M2 12c.6.5 1.2 1 2.5 1c2.5 0 2.5-2 5-2c2.6 0 2.4 2 5 2c2.5 0 2.5-2 5-2c1.3 0 1.9.5 2.5 1"
						initial={{ pathLength: 1 }}
						variants={{
							normal: { pathLength: 1 },
							animate: {
								pathLength: [0, 1],
								transition: { duration: 0.4, ease: "linear" },
							},
						}}
						animate={controls}
					/>
					<motion.path
						d="M2 18c.6.5 1.2 1 2.5 1c2.5 0 2.5-2 5-2c2.6 0 2.4 2 5 2c2.5 0 2.5-2 5-2c1.3 0 1.9.5 2.5 1"
						initial={{ pathLength: 1 }}
						variants={{
							normal: { pathLength: 1 },
							animate: {
								pathLength: [0, 1],
								transition: { duration: 0.4, ease: "linear" },
							},
						}}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

WavesIcon.displayName = "WavesIcon";
export { WavesIcon };
```

### `components/ui/icons/waypoints.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface WaypointsIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface WaypointsIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const variants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: (custom: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			delay: 0.15 * custom,
			opacity: { delay: 0.1 * custom },
		},
	}),
};

const WaypointsIcon = forwardRef<WaypointsIconHandle, WaypointsIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.circle
						cx="12"
						cy="4.5"
						r="2.5"
						variants={variants}
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="m10.2 6.3-3.9 3.9"
						variants={variants}
						animate={controls}
						custom={1}
					/>
					<motion.circle
						cx="4.5"
						cy="12"
						r="2.5"
						variants={variants}
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M7 12h10"
						variants={variants}
						animate={controls}
						custom={2}
					/>
					<motion.circle
						cx="19.5"
						cy="12"
						r="2.5"
						variants={variants}
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="m13.8 17.7 3.9-3.9"
						variants={variants}
						animate={controls}
						custom={3}
					/>
					<motion.circle
						cx="12"
						cy="19.5"
						r="2.5"
						variants={variants}
						animate={controls}
						custom={0}
					/>
				</svg>
			</div>
		);
	}
);

WaypointsIcon.displayName = "WaypointsIcon";

export { WaypointsIcon };
```

### `components/ui/icons/webhook.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface WebhookIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface WebhookIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const transition: Transition = {
	duration: 0.3,
	opacity: { delay: 0.15 },
};

const variants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: {
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			...transition,
			delay: 0.1,
		},
	},
};

const WebhookIcon = forwardRef<WebhookIconHandle, WebhookIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2"
						variants={variants}
						animate={controls}
					/>
					<motion.path
						d="m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06"
						variants={variants}
						animate={controls}
					/>
					<motion.path
						d="m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8"
						variants={variants}
						animate={controls}
					/>
				</svg>
			</div>
		);
	}
);

WebhookIcon.displayName = "WebhookIcon";

export { WebhookIcon };
```

### `components/ui/icons/wifi.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";

export interface WifiIconHandle {
	startAnimation: () => void;
}

interface WifiIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const WIFI_LEVELS = [
	{ d: "M12 20h.01", initialOpacity: 1, delay: 0 },
	{ d: "M8.5 16.429a5 5 0 0 1 7 0", initialOpacity: 1, delay: 0.1 },
	{ d: "M5 12.859a10 10 0 0 1 14 0", initialOpacity: 1, delay: 0.2 },
	{ d: "M2 8.82a15 15 0 0 1 20 0", initialOpacity: 1, delay: 0.3 },
];

const WifiIcon = forwardRef<WifiIconHandle, WifiIconProps>(
	({ onMouseEnter, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();

		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: async () => {
					await controls.start("fadeOut");
					controls.start("fadeIn");
				},
			};
		});

		const handleMouseEnter = useCallback(
			async (e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					await controls.start("fadeOut");
					controls.start("fadeIn");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					{WIFI_LEVELS.map((level, index) => (
						<motion.path
							key={index + "wifi"}
							d={level.d}
							initial={{ opacity: level.initialOpacity }}
							animate={controls}
							variants={{
								fadeOut: {
									opacity: index === 0 ? 1 : 0,
									transition: { duration: 0.2 },
								},
								fadeIn: {
									opacity: 1,
									transition: {
										type: "spring",
										stiffness: 300,
										damping: 20,
										delay: level.delay,
									},
								},
							}}
						/>
					))}
				</svg>
			</div>
		);
	}
);

WifiIcon.displayName = "WifiIcon";

export { WifiIcon };
```

### `components/ui/icons/wind-arrow-down.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface WindArrowDownIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface WindArrowDownIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const windVariants: Variants = {
	normal: (custom: number) => ({
		pathLength: 1,
		opacity: 1,
		pathOffset: 0,
		transition: {
			duration: 0.3,
			ease: "easeInOut",
			delay: custom,
		},
	}),
	animate: (custom: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.5,
			ease: "easeInOut",
			delay: custom,
		},
	}),
};

const arrowVariants: Variants = {
	normal: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: "easeInOut",
		},
	},
	animate: {
		y: [-10, 0],
		opacity: [0, 1],
		transition: {
			duration: 0.5,
			ease: "easeInOut",
			delay: 0.35,
		},
	},
};

const WindArrowDownIcon = forwardRef<
	WindArrowDownIconHandle,
	WindArrowDownIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
	const controls = useAnimation();
	const isControlledRef = useRef(false);

	useImperativeHandle(ref, () => {
		isControlledRef.current = true;
		return {
			startAnimation: () => controls.start("animate"),
			stopAnimation: () => controls.start("normal"),
		};
	});

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("animate");
			} else {
				onMouseEnter?.(e);
			}
		},
		[controls, onMouseEnter]
	);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!isControlledRef.current) {
				controls.start("normal");
			} else {
				onMouseLeave?.(e);
			}
		},
		[controls, onMouseLeave]
	);

	return (
		<div
			className={cn(
				`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
				className
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				{/* Wind paths */}
				<motion.path
					d="M12.8 21.6A2 2 0 1 0 14 18H2"
					variants={windVariants}
					initial="normal"
					animate={controls}
					custom={0.2}
				/>
				<motion.path
					d="M17.5 10a2.5 2.5 0 1 1 2 4H2"
					variants={windVariants}
					initial="normal"
					animate={controls}
					custom={0.4}
				/>
				<motion.path
					d="M10 2v8"
					variants={arrowVariants}
					initial="normal"
					animate={controls}
				/>
				<motion.path
					d="m6 6 4 4 4-4"
					variants={arrowVariants}
					initial="normal"
					animate={controls}
				/>
			</svg>
		</div>
	);
});

WindArrowDownIcon.displayName = "WindArrowDownIcon";

export { WindArrowDownIcon };
```

### `components/ui/icons/wind.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface WindIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface WindIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: (custom: number) => ({
		pathLength: 1,
		opacity: 1,
		pathOffset: 0,
		transition: {
			duration: 0.3,
			ease: "easeInOut",
			delay: custom,
		},
	}),
	animate: (custom: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.5,
			ease: "easeInOut",
			delay: custom,
		},
	}),
};

const WindIcon = forwardRef<WindIconHandle, WindIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						d="M12.8 19.6A2 2 0 1 0 14 16H2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0.2}
					/>
					<motion.path
						d="M17.5 8a2.5 2.5 0 1 1 2 4H2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M9.8 4.4A2 2 0 1 1 11 8H2"
						variants={pathVariants}
						initial="normal"
						animate={controls}
						custom={0.4}
					/>
				</svg>
			</div>
		);
	}
);

WindIcon.displayName = "WindIcon";

export { WindIcon };
```

### `components/ui/icons/workflow.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Transition, Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface WorkflowIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface WorkflowIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const transition: Transition = {
	duration: 0.3,
	opacity: { delay: 0.15 },
};

const variants: Variants = {
	normal: {
		pathLength: 1,
		opacity: 1,
	},
	animate: (custom: number) => ({
		pathLength: [0, 1],
		opacity: [0, 1],
		transition: {
			...transition,
			delay: 0.1 * custom,
		},
	}),
};

const WorkflowIcon = forwardRef<WorkflowIconHandle, WorkflowIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.rect
						width="8"
						height="8"
						x="3"
						y="3"
						rx="2"
						variants={variants}
						animate={controls}
						custom={0}
					/>
					<motion.path
						d="M7 11v4a2 2 0 0 0 2 2h4"
						variants={variants}
						animate={controls}
						custom={3}
					/>
					<motion.rect
						width="8"
						height="8"
						x="13"
						y="13"
						rx="2"
						variants={variants}
						animate={controls}
						custom={0}
					/>
				</svg>
			</div>
		);
	}
);

WorkflowIcon.displayName = "WorkflowIcon";

export { WorkflowIcon };
```

### `components/ui/icons/x.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface XIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface XIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
	},
};

const XIcon = forwardRef<XIconHandle, XIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[controls, onMouseEnter]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					controls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[controls, onMouseLeave]
		);
		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						variants={pathVariants}
						animate={controls}
						d="M18 6 6 18"
					/>
					<motion.path
						transition={{ delay: 0.2 }}
						variants={pathVariants}
						animate={controls}
						d="m6 6 12 12"
					/>
				</svg>
			</div>
		);
	}
);

XIcon.displayName = "XIcon";

export { XIcon };
```

### `components/ui/icons/youtube.tsx`

```tsx
"use client";

import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";
import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";

export interface YoutubeIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface YoutubeIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: "linear",
			opacity: { duration: 0.1 },
		},
	},
};

const triangleVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
		pathOffset: 0,
		transition: {
			duration: 0.4,
			opacity: { duration: 0.1 },
		},
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
		pathOffset: [1, 0],
		transition: {
			duration: 0.6,
			ease: "linear",
			opacity: { duration: 0.1 },
		},
	},
};

const YoutubeIcon = forwardRef<YoutubeIconHandle, YoutubeIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const pathControls = useAnimation();
		const triangleControls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => {
					pathControls.start("animate");
					triangleControls.start("animate");
				},
				stopAnimation: () => {
					pathControls.start("normal");
					triangleControls.start("normal");
				},
			};
		});

		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					pathControls.start("animate");
					triangleControls.start("animate");
				} else {
					onMouseEnter?.(e);
				}
			},
			[onMouseEnter, pathControls, triangleControls]
		);

		const handleMouseLeave = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				if (!isControlledRef.current) {
					pathControls.start("normal");
					triangleControls.start("normal");
				} else {
					onMouseLeave?.(e);
				}
			},
			[pathControls, triangleControls, onMouseLeave]
		);

		return (
			<div
				className={cn(
					`cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
					className
				)}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						variants={pathVariants}
						initial="normal"
						animate={pathControls}
						d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"
					/>
					<motion.path
						variants={triangleVariants}
						initial="normal"
						animate={triangleControls}
						d="M10 15l5-3-5-3z"
					/>
				</svg>
			</div>
		);
	}
);

YoutubeIcon.displayName = "YoutubeIcon";

export { YoutubeIcon };
```
