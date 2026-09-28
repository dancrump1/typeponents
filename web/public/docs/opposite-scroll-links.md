# Opposite Scroll Links

Split index of full-height image links, with the left and right columns scrolling past each other in opposite directions.

**Interaction.** Scrolling drives the left column one way and the right column the other, so the two halves slide past each other. Hovering an image washes it over and fades the project title in on top; clicking opens that project.

- Categories: Navigation
- Tags: scroll-driven, hover
- Import: `@/components/ui/opposite-scroll-links`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/opposite-scroll-links.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Usage

```tsx
"use client";

import React from "react";

import OppositeScroll from "./component";

const data = [
	{ image: "/itjustworks.jpg", id: 1, title: "entry 1", uri: "/" },
	{ image: "/itjustworks.jpg", id: 2, title: "entry 2", uri: "/" },
	{ image: "/itjustworks.jpg", id: 3, title: "entry 3", uri: "/" },
	{ image: "/itjustworks.jpg", id: 4, title: "entry 4", uri: "/" },
	{ image: "/itjustworks.jpg", id: 5, title: "entry 5", uri: "/" },
	{ image: "/itjustworks.jpg", id: 6, title: "entry 6", uri: "/" },
];
export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<OppositeScroll works={data} />
		</div>
	);
}
```

## Source

### `components/ui/opposite-scroll-links.tsx`

```tsx
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";

// Inspiration:
// www.hover.dev/components/other#opposite-scroll-content

const OppositeScroll = ({ works, className, containerRef, ...props }) => {
	const targetRef = useRef<HTMLDivElement | null>(null);
	const [componentContainerRef, setComponentContainerRef] = useState(null);

	useEffect(() => {
		setComponentContainerRef(containerRef);
	}, [containerRef]);

	const { scrollYProgress } = useScroll({
		target: targetRef,
		// container: componentContainerRef || null,
	});

	const leftWorks = works?.slice(0, works.length / 2);
	const rightWorks = works?.slice(works.length / 2, works.length);
	if (!!componentContainerRef && componentContainerRef?.current === undefined)
		return null;

	return (
		<section className={cn("flex", className)} ref={targetRef} {...props}>
			<LeftContent content={leftWorks} />
			<RightContent content={rightWorks} scrollYProgress={scrollYProgress} />
		</section>
	);
};

const LeftContent = ({ content }: { content: any }) => {
	return (
		<div className="w-full">
			{content?.map(({ id, title, image, uri }, idx) => (
				<Link
					href={`/work/${uri}`}
					key={title + "opposite" + id}
					className={`p-8 h-screen relative flex flex-col justify-between group`}
				>
					<div className="invisible group-hover:visible group-hover:bg-background/40 absolute inset-0 text-center content-center text-4xl">
						{title}
					</div>
					<Image
						height={1200}
						width={1200}
						key={title + "oppo-link-img"}
						alt={title}
						className="h-screen w-full object-cover"
						src={image[0].url || "/itjustworks.jpg"}
					/>
				</Link>
			))}
		</div>
	);
};

const RightContent = ({
	content,
	scrollYProgress,
}: {
	content: any;
	scrollYProgress: MotionValue<number>;
}) => {
	const top = useTransform(
		scrollYProgress,
		[0, 1],
		[`-${(content?.length - 1) * 100}vh`, "0vh"]
	);

	return (
		<div className="h-screen overflow-hidden sticky top-0 w-24 md:w-full">
			<motion.div style={{ top }} className="absolute left-0 right-0">
				{[...content || []]?.reverse().map(({ image, id, title, uri }) => (
					<Link
						href={`/work/${uri}`}
						key={title + "opposite" + id}
						className={`p-8 h-screen relative flex flex-col justify-between group`}
					>
						<div className="invisible group-hover:visible group-hover:bg-background/40 absolute inset-0 text-center content-center text-4xl">
							{title}
						</div>
						<Image
							height={1200}
							width={1200}
							key={id + "oppo-img"}
							alt={title}
							className="h-screen w-full object-cover"
							src={image.src || "/itjustworks.jpg"}
						/>
					</Link>
				))}
			</motion.div>
		</div>
	);
};

export default OppositeScroll;
```
