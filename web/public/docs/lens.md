# Lens

- Categories: 3D & Canvas
- Tags: hover, cursor-tracking
- Import: `@/components/ui/lens`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/lens.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `zoomFactor` | `number` | `2` | — |
| `lensSize` | `number` | `370` | — |
| `position` | `{ x: number; y: number; }` | `{ x: 200, y: 150 }` | — |
| `isStatic` | `boolean` | `false` | — |
| `isFocusing` | `(() => void)` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import Image from "next/image";

import { Lens } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<Lens>
				<Image
					src={"/itjustworks.jpg"}
					alt={"it just woks"}
					width={100}
					height={100}
					className="object-cover max-h-[80vh] w-auto mx-auto border-8 border-background"
				/>
			</Lens>{" "}
		</div>
	);
}
```

## Source

### `components/ui/lens.tsx`

```tsx
"use client";

import React, { useRef, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

interface LensProps {
	children: React.ReactNode;
	zoomFactor?: number;
	lensSize?: number;
	position?: {
		x: number;
		y: number;
	};
	isStatic?: boolean;
	isFocusing?: () => void;
	// hovering?: boolean;
	// setHovering?: (hovering: boolean) => void;
}

export const Lens: React.FC<LensProps> = ({
	children,
	zoomFactor = 2,
	lensSize = 370,
	isStatic = false,
	position = { x: 200, y: 150 },
	// hovering,
	// setHovering,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const [hovering, setHovering] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 100, y: 100 });

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		setMousePosition({ x, y });
	};

	return (
		<div
			ref={containerRef}
			className="relative overflow-hidden rounded-lg z-20"
			onMouseEnter={() => {
				setHovering(true);
			}}
			onMouseLeave={() => setHovering(false)}
			onMouseMove={handleMouseMove}
		>
			{children}

			{isStatic ? (
				<div>
					<motion.div
						initial={{ opacity: 0, scale: 0.58 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
						className="absolute inset-0 overflow-hidden"
						style={{
							maskImage: `radial-gradient(circle ${lensSize / 2}px at ${
								position.x
							}px ${position.y}px, black 100%, transparent 100%)`,
							WebkitMaskImage: `radial-gradient(circle ${
								lensSize / 2
							}px at ${position.x}px ${
								position.y
							}px, black 100%, transparent 100%)`,
							transformOrigin: `${position.x}px ${position.y}px`,
						}}
					>
						<div
							className="absolute inset-0"
							style={{
								transform: `scale(${zoomFactor})`,
								transformOrigin: `${position.x}px ${position.y}px`,
							}}
						>
							{children}
						</div>
					</motion.div>
				</div>
			) : (
				<AnimatePresence>
					{hovering && (
						<div>
							<motion.div
								initial={{ opacity: 0, scale: 0.58 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.3, ease: "easeOut" }}
								className="absolute inset-0 overflow-hidden"
								style={{
									maskImage: `radial-gradient(circle ${
										lensSize / 2
									}px at ${mousePosition.x}px ${
										mousePosition.y
									}px, black 100%, transparent 100%)`,
									WebkitMaskImage: `radial-gradient(circle ${
										lensSize / 2
									}px at ${mousePosition.x}px ${
										mousePosition.y
									}px, black 100%, transparent 100%)`,
									transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
									zIndex: 50,
								}}
							>
								<div
									className="absolute inset-0"
									style={{
										transform: `scale(${zoomFactor})`,
										transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
									}}
								>
									{children}
								</div>
							</motion.div>
						</div>
					)}
				</AnimatePresence>
			)}
		</div>
	);
};
```
