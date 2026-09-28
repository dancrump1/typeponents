# Color Change Cards

Grid of photo tiles that sit desaturated behind a heading, a caption and a corner arrow.

**Interaction.** Hovering a tile brings its photo back to full colour and zooms it in, swings the corner arrow up to a diagonal, and rolls the heading letters upward one after another to a matching copy underneath.

- Categories: Cards
- Tags: hover
- Import: `@/components/ui/color-change-cards`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/color-change-cards.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`
- `react-icons`

## Usage

```tsx
"use client";

import React from "react";

import ColorChangeCards from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<ColorChangeCards />{" "}
		</div>
	);
}
```

## Source

### `components/ui/color-change-cards.tsx`

```tsx
import { motion } from "motion/react";
import { FiArrowRight } from "react-icons/fi";

const ColorChangeCards = () => {
	return (
		<section className="p-4 md:p-8 bg-slate-100">
			<div className="cont-page">
				<h2 className="pb-7">Services</h2>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 w-full">
					<Card
						heading="Plan"
						description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, exercitationem."
						imgSrc="https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
					/>
					<Card
						heading="Play"
						description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, exercitationem."
						imgSrc="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
					/>
					<Card
						heading="Connect"
						description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, exercitationem."
						imgSrc="https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
					/>
					<Card
						heading="Support"
						description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, exercitationem."
						imgSrc="https://images.unsplash.com/photo-1576328077645-2dd68934d2b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80"
					/>
				</div>
			</div>
		</section>
	);
};

const Card = ({
	heading,
	description,
	imgSrc,
}: {
	heading: string;
	description: string;
	imgSrc: string;
}) => {
	return (
		<motion.div
			transition={{
				staggerChildren: 0.035,
			}}
			whileHover="hover"
			className="w-full h-64 bg-slate-300 overflow-hidden cursor-pointer group relative"
		>
			<div
				className="absolute inset-0 saturate-100 md:saturate-0 md:group-hover:saturate-100 group-hover:scale-110 transition-[transform,filter] duration-500"
				style={{
					backgroundImage: `url(${imgSrc})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			/>
			<div className="p-4 relative z-20 h-full text-slate-300 group-hover:text-foreground transition-colors duration-500 flex flex-col justify-between">
				<FiArrowRight className="text-3xl group-hover:-rotate-45 transition-transform duration-500 ml-auto" />
				<div>
					<h4>
						{heading.split("").map((l, i) => (
							<ShiftLetter letter={l} key={i + "color-change-card"} />
						))}
					</h4>
					<p>{description}</p>
				</div>
			</div>
		</motion.div>
	);
};

const ShiftLetter = ({ letter }: { letter: string }) => {
	return (
		<div className="inline-block overflow-hidden h-[36px] font-semibold text-3xl">
			<motion.span
				className="flex flex-col min-w-[4px]"
				style={{
					y: "0%",
				}}
				variants={{
					hover: {
						y: "-50%",
					},
				}}
				transition={{
					duration: 0.5,
				}}
			>
				<span>{letter}</span>
				<span>{letter}</span>
			</motion.span>
		</div>
	);
};

export default ColorChangeCards;
```
