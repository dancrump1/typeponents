# Horizontal Scroll Gallery

- Categories: Navigation
- Tags: scroll-driven, hover
- Import: `@/components/ui/horizontal-scroll-gallery`
- Inspiration: edilozi.pro (adaptation) — https://www.edilozi.pro/docs/components/horizontal-scroll

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/horizontal-scroll-gallery.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Usage

```tsx
"use client";

import React from "react";

import { HorizontalScrollCarousel } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="bg-background">
				<div className="flex h-48 items-center justify-center">
					<span className="font-semibold uppercase text-secondary">
						Scroll down
					</span>
				</div>
				<HorizontalScrollCarousel />
				<div className="flex h-48 items-center justify-center">
					<span className="font-semibold uppercase text-secondary">
						Scroll up
					</span>
				</div>
			</div>{" "}
		</div>
	);
}
```

## Source

### `components/ui/horizontal-scroll-gallery.tsx`

```tsx
import { useEffect, useRef, useState } from "react";

//optional hook for smooth scrolling
// import useLenis from "@/hooks/useLenis";
import { motion, useScroll, useTransform } from "motion/react";

// Credit:
// https://www.edilozi.pro/docs/components/horizontal-scroll
const Example = ({ containerRef }) => {
	return (
		<div className="bg-background">
			<div className="flex h-48 items-center justify-center">
				<span className="font-semibold uppercase text-foreground">
					Scroll down
				</span>
			</div>
			<HorizontalScrollCarousel containerRef={containerRef} />
			<div className="flex h-48 items-center justify-center">
				<span className="font-semibold uppercase text-foreground">
					Scroll up
				</span>
			</div>
		</div>
	);
};

export const HorizontalScrollCarousel = ({ containerRef }) => {
	const targetRef = useRef<HTMLDivElement | null>(null);
	const [componentContainerRef, setComponentContainerRef] = useState(null);

	const { scrollYProgress } = useScroll({
		target: targetRef,
		// container: componentContainerRef,
	});

	const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

	// useLenis();

	useEffect(() => {
		setComponentContainerRef(containerRef);
	}, [containerRef]);

	if (!!componentContainerRef && componentContainerRef?.current === undefined)
		return null;

	return (
		<section ref={targetRef} className="relative h-[300vh] bg-background">
			<div className="sticky top-0 flex h-screen items-center overflow-hidden">
				<motion.div style={{ x }} className="flex gap-4">
					{cards.map((card) => {
						return <Card card={card} key={card.id} />;
					})}
				</motion.div>
			</div>
		</section>
	);
};

const Card = ({ card }: { card: CardType }) => {
	return (
		<div
			key={card.id}
			className="group relative h-[450px] w-[450px] overflow-hidden bg-background"
		>
			<div
				style={{
					backgroundImage: `url(${card.url})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
				className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
			></div>
			<div className="absolute inset-0 z-10 grid place-content-center">
				<p className="bg-linear-to-br from-background/20 to-background/0 p-8 text-6xl font-black uppercase text-foreground backdrop-blur-lg">
					{card.title}
				</p>
			</div>
		</div>
	);
};

export default Example;

type CardType = {
	url: string;
	title: string;
	id: number;
};

const cards: CardType[] = [
	{
		url: "/itjustworks.jpg",
		title: "Title 1",
		id: 1,
	},
	{
		url: "/itjustworks.jpg",
		title: "Title 2",
		id: 2,
	},
	{
		url: "/itjustworks.jpg",
		title: "Title 3",
		id: 3,
	},
	{
		url: "/itjustworks.jpg",
		title: "Title 4",
		id: 4,
	},
	{
		url: "/itjustworks.jpg",
		title: "Title 5",
		id: 5,
	},
	{
		url: "/itjustworks.jpg",
		title: "Title 6",
		id: 6,
	},
	{
		url: "/itjustworks.jpg",
		title: "Title 7",
		id: 7,
	},
];
```

## Attribution

Source: edilozi.pro · Original: https://www.edilozi.pro/docs/components/horizontal-scroll

Adapted from the original. Credit the original author when you ship this.
