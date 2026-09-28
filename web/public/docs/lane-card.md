# Lane Card

- Categories: Cards
- Tags: hover
- Import: `@/components/ui/lane-card`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/lane-card.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Usage

```tsx
"use client";

import Lane, { ListCard } from "./component";

const cards = [
	{ id: "1", title: "Explore", image: "https://picsum.photos/300/400?1" },
	{ id: "2", title: "Discover", image: "https://picsum.photos/300/400?2" },
];

export default function Usage() {
	return (
		<div className="p-8">
			<Lane>
				{cards.map((card) => (
					<ListCard key={card.id} card={card} />
				))}
			</Lane>
		</div>
	);
}
```

## Source

### `components/ui/lane-card.tsx`

```tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const Lane = ({ children, ...props }) => {
	const [isHovered, setIsHovered] = useState(false);

	const [timeoutRef, setTimeoutRef] = useState();

	const [columns, setColumnEl] = useState();

	const childRef = useRef(null);

	useEffect(() => {
		setColumnEl(document.getElementsByClassName("scroll-column"));
	}, []);

	const childrenWithPassedHoverStatus = children?.map((child, i) => {
		return {
			...child,
			props: {
				...child.props,
				isHovered,
				position: i + 1,
				childRef: i == 0 ? childRef : null,
			},
		};
	});

	return (
		<div
			onMouseEnter={({ target }) => {
				setTimeoutRef(setTimeout(() => setIsHovered(true), 200));
			}}
			onMouseLeave={({ target }) => {
				[...columns].forEach((column) => (column.scrollTop = 0));

				if (timeoutRef) {
					clearTimeout(timeoutRef);
					setTimeoutRef(null);
				}

				setTimeout(() => {
					setIsHovered(false);
				}, 200);
			}}
			style={{
				height:
					100 * (children.length - 1) +
						childRef?.current?.getBoundingClientRect().height || 0,
			}}
			className={cn(
				"scroll-column w-fit gap-3 overflow-y-auto h-full min-w-[250px] overflow-x-hidden self-start transition-all flex-col justify-content-between mx-2 px-3 py-2 scroll-smooth relative flex bg-background",
				isHovered ? "overflow-y-auto" : "overflow-y-hidden"
			)}
			{...props}
		>
			{!!children.length && childrenWithPassedHoverStatus}
		</div>
	);
};

export const ListCard = ({ card, isHovered, position, childRef, ...props }) => {
	// Open more details
	const [openCard, setOpenCard] = useState(false);

	const [hoverState, setHoverState] = useState(isHovered || false);

	const cardData = card?.title ? card : props;

	// On mount:
	// 1) pull list of selected cards
	// 2) set color of text to average color of image
	useEffect(() => {
		setHoverState(isHovered);
	}, []);

	useEffect(() => {
		setHoverState(isHovered);
	}, [isHovered]);

	const variants = {
		hover: { translateY: "0", height: "100%" },
		stack: {
			translateY: `calc(-95px * ${position - 1})`,
			height: position === 1 ? "100%" : "100px",
		},
	};

	return (
		<motion.div
			key={cardData.title}
			onClick={() => setOpenCard(!openCard)}
			// onMouseLeave={() => setOpenCard(false)}
			style={
				isHovered || position === 1
					? {
							zIndex: Math.round(10 / position),
						}
					: {
							zIndex: Math.round(10 / position),
						}
			}
			initial={"stack"}
			ref={childRef}
			variants={variants}
			transition={{ ease: "linear", duration: 0.25 }}
			animate={isHovered ? "hover" : "stack"}
			className={cn(
				"group border relative overflow-hidden rounded-lg max-h-[80vh] shadow-xl h-full bg-transparent w-full"
			)}
			{...props}
		>
			{(cardData.images?.length || cardData.img?.src) && (
				<Image
					src={
						cardData.images?.length
							? cardData.images[0].url
							: cardData.img?.src
					}
					height={
						cardData.images?.length ? cardData.images[0].height : 200
					}
					width={cardData.images?.length ? cardData.images[0]?.width : 300}
					alt="test1"
					crossOrigin="anonymous"
					className={cn(
						`peer h-full w-full object-cover pb-[75px] object-center ${cardData.title} bg-background`
					)}
				/>
			)}

			<span className="group-hover:visible invisible absolute inset-0 bg-background/30 text-foreground text-center content-center">
				Click to reveal more
			</span>

			<div
				className={cn(
					"bg-background w-full absolute h-[75px] top-[calc(100%-75px)] bottom-0 transition-all duration-500",
					openCard && "h-full top-0 bottom-0"
				)}
			>
				<div className="flex">
					<h2 className="font-spectral px-5">{cardData.title}</h2>
				</div>
				<span
					className={cn(
						"block opacity-0 text-foreground font-spectral px-5 mt-6",
						openCard && "opacity-100 duration-100"
					)}
				>
					Look at this card!
				</span>
			</div>
		</motion.div>
	);
};

export default Lane;
```
