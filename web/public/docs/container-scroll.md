# Container Scroll

Heading above a large device-style frame, tipped back in 3D, holding a grid of profile cards.

**Interaction.** As you scroll past the section the frame rotates up from tipped-back toward flat and grows to fill the space, while the heading and the cards inside drift upward, as if the screen were standing up to face you.

- Categories: 3D & Canvas
- Tags: scroll-driven, hover
- Import: `@/components/ui/container-scroll`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/container-scroll-animation

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/container-scroll.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `users` *(required)* | `{ name: string; designation: string; image: string; badge…` | — | — |
| `titleComponent` *(required)* | `React.ReactNode` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import { ContainerScroll } from "./component";

export default function Usage() {
	return (
		<div className="flex flex-col overflow-hidden">
			<ContainerScroll
				titleComponent={
					<>
						<h1 className="text-4xl font-semibold text-secondary dark:text-secondary">
							Unleash the power of <br />
							<span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
								Scroll Animations
							</span>
						</h1>
					</>
				}
			>
				<img
					src={`/itjustworks.jpg`}
					alt="hero"
					height={720}
					width={1400}
					className="mx-auto rounded-2xl object-cover h-full object-top-left"
					draggable={false}
				/>
			</ContainerScroll>
		</div>
	);
}
```

## Source

### `components/ui/container-scroll.tsx`

```tsx
"use client";

import React, { useRef } from "react";

import { motion, useScroll, useTransform } from "motion/react";

// https://ui.aceternity.com/components/container-scroll-animation

export const ContainerScroll = ({
	users,
	titleComponent,
}: {
	users: {
		name: string;
		designation: string;
		image: string;
		badge?: string;
	}[];
	titleComponent: string | React.ReactNode;
}) => {
	const containerRef = useRef<any>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
	});
	const [isMobile, setIsMobile] = React.useState(false);

	React.useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => {
			window.removeEventListener("resize", checkMobile);
		};
	}, []);

	const scaleDimensions = () => {
		return isMobile ? [0.7, 0.9] : [1.05, 1];
	};

	const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
	const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
	const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

	return (
		<div
			className="h-240 md:h-320 flex items-center justify-center relative p-2 md:p-20"
			ref={containerRef}
		>
			<div
				className="py-10 md:py-40 w-full relative"
				style={{
					perspective: "1000px",
				}}
			>
				<Header translate={translate} titleComponent={titleComponent} />
				<Card
					rotate={rotate}
					translate={translate}
					scale={scale}
					users={users}
				/>
			</div>
		</div>
	);
};

export const Header = ({ translate, titleComponent }: any) => {
	return (
		<motion.div
			style={{
				translateY: translate,
			}}
			className="div max-w-5xl mx-auto text-center"
		>
			{titleComponent}
		</motion.div>
	);
};

export const Card = ({
	rotate,
	scale,
	translate,
	users = [
		{
			badge: "something",
			image: "itjustworks.jpg",
			name: "oogity boogity",
			designation: "designated drinker",
		},
	],
}: {
	rotate: any;
	scale: any;
	translate: any;
	users: {
		name: string;
		designation: string;
		image: string;
		badge?: string;
	}[];
}) => {
	return (
		<motion.div
			style={{
				rotateX: rotate, // rotate in X-axis
				scale,
				boxShadow:
					"0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
			}}
			className="max-w-5xl -mt-12 mx-auto h-120 md:h-160 w-full border-4 border-[#6C6C6C] p-6 bg-background rounded-[30px] shadow-2xl"
		>
			<div className="bg-background h-full w-full rounded-2xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-hidden p-4">
				{users.map((user, idx: number) => (
					<motion.div
						key={`user-${idx}`}
						className="bg-background rounded-md cursor-pointer relative"
						style={{ translateY: translate }}
						whileHover={{
							boxShadow:
								"0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
						}}
					>
						<div className="absolute top-2 right-2 rounded-full text-xs font-bold bg-background px-2 py-1">
							{user.badge}
						</div>
						<img
							src={user.image}
							className="rounded-tr-md rounded-tl-md text-sm "
							alt="thumbnail"
						/>
						<div className="p-4">
							<h1 className="font-semibold text-sm ">{user.name}</h1>
							<h2 className=" text-foreground text-xs ">
								{user.designation}
							</h2>
						</div>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/container-scroll-animation

Adapted from the original. Credit the original author when you ship this.
