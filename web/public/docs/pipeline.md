# Pipeline

- Categories: Utilities
- Tags: spring, hover
- Import: `@/components/ui/pipeline`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/pipeline.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Usage

```tsx
"use client";

import { DemoPipelineView } from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<DemoPipelineView />
		</div>
	);
}
```

## Source

### `components/ui/pipeline.tsx`

```tsx
"use client";

import { useState } from "react";

import { motion } from "motion/react";

const YEARS = Array.from({ length: 2024 - 1993 + 1 }, (_, i) => 2024 - i);

export function DemoPipelineView() {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [selected, setSelected] = useState<number | null>(null);

	const handleMouseEnter = (index: number) => {
		setHoveredIndex(index);
	};

	const handleMouseLeave = () => {
		setHoveredIndex(null);
	};

	const calculateScale = (index: number) => {
		if (hoveredIndex === null) return 0.4;
		const distance = Math.abs(index - hoveredIndex);
		return Math.max(1 - distance * 0.2, 0.4);
	};

	return (
		<div className="flex flex-col">
			{YEARS.map((year, i) => {
				const isSelected = selected === i;

				return (
					<button
						key={year}
						className="relative inline-flex items-end justify-center py-1"
						onMouseEnter={() => handleMouseEnter(i)}
						onMouseLeave={handleMouseLeave}
						onClick={() => setSelected(i)}
						onTouchStart={() => handleMouseEnter(i)}
						onTouchEnd={handleMouseLeave}
					>
						<motion.div
							key={i + "pipeline"}
							className={`h-1 w-10 rounded-[4px] ${
								selected === i ? "bg-yellow-400" : "bg-primary"
							}`}
							animate={{
								scale: calculateScale(i),
							}}
							initial={{ scale: 0.4 }}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 20,
							}}
						/>
						{hoveredIndex === i ? (
							<motion.span
								className={`absolute -top-0.5 left-12 text-[11px] ${
									isSelected ? "text-yellow-400" : "text-primary"
								}`}
								initial={{
									opacity: 0,
									filter: "blur(4px)",
									scale: 0.4,
								}}
								animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
								transition={{ duration: 0.15, delay: 0.1 }}
							>
								{year}
							</motion.span>
						) : null}
					</button>
				);
			})}
		</div>
	);
}
```
