# Stripes Preloader

- Categories: Loaders
- Tags: scroll-driven, responsive
- Import: `@/components/ui/stripes-preloader`
- Inspiration: React Bits (adaptation) — https://reactbits.dev/components/stripes-preloader

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/stripes-preloader.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `tileClassName` | `string` | — | — |
| `minTileWidth` | `number` | `32` | — |
| `animationDuration` | `number` | `0.5` | — |
| `animationDelay` | `number` | `1` | — |
| `stagger` | `number` | `0.05` | — |
| `rerun` | `boolean` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import VerticalTiles from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<VerticalTiles rerun>
				<span>Some content</span>
			</VerticalTiles>{" "}
		</div>
	);
}
```

## Source

### `components/ui/stripes-preloader.tsx`

```tsx
import React, { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { motion, useInView } from "motion/react";

// Credit:
// https://reactbits.dev/components/stripes-preloader

interface Tile {
	id: number;
	width: number;
	order: number;
}

interface VerticalTilesProps {
	tileClassName?: string;
	minTileWidth?: number;
	animationDuration?: number;
	animationDelay?: number;
	stagger?: number;
	children?: React.ReactNode;
	rerun?: boolean;
}

export default function VerticalTiles({
	tileClassName,
	minTileWidth = 32,
	animationDuration = 0.5,
	animationDelay = 1,
	stagger = 0.05,
	children,
	rerun,
}: VerticalTilesProps) {
	const [tiles, setTiles] = useState<Tile[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(containerRef, {
		once: rerun || false,
		amount: 0.3,
	});

	const calculateTiles = useCallback(() => {
		if (containerRef.current) {
			const { offsetWidth: width, offsetHeight: _ } = containerRef.current;
			const tileCount = Math.max(3, Math.floor(width / minTileWidth));
			const tileWidth = width / tileCount + 1;

			const newTiles = Array.from({ length: tileCount }, (_, index) => ({
				id: index,
				width: tileWidth,
				order: Math.abs(index - Math.floor((tileCount - 1) / 2)),
			}));

			setTiles(newTiles);
		}
	}, [minTileWidth]);

	useEffect(() => {
		calculateTiles();
		const resizeObserver = new ResizeObserver(calculateTiles);
		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}
		return () => resizeObserver.disconnect();
	}, [calculateTiles]);

	return (
		<div ref={containerRef} className="relative overflow-hidden">
			{children}

			<div className="absolute inset-0 flex">
				{tiles.map((tile) => (
					<motion.div
						key={tile.id}
						className={cn("bg-background", tileClassName)}
						style={{
							width: tile.width,
							position: "absolute",
							left: `${(tile.id * 100) / tiles.length}%`,
							top: 0,
							height: "100%",
						}}
						initial={{ y: 0 }}
						animate={isInView || rerun ? { y: "100%" } : { y: 0 }}
						transition={{
							duration: animationDuration,
							delay: animationDelay + tile.order * stagger,
							ease: [0.45, 0, 0.55, 1],
						}}
					/>
				))}
			</div>
		</div>
	);
}
```

## Attribution

Source: React Bits · Original: https://reactbits.dev/components/stripes-preloader

Adapted from the original. Credit the original author when you ship this.
