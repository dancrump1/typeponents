# Opposite Scroll

Two-column scroll section pairing stacked text panels on one side with a full-height image column on the other.

**Interaction.** As you scroll, the text panels move up the page normally while the image column beside them travels the opposite way through a fixed frame, so each paragraph arrives alongside its own photo.

- Categories: Special Effects & FX
- Tags: scroll-driven
- Import: `@/components/ui/opposite-scroll`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/opposite-scroll.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`
- `react-icons`

## Usage

```tsx
"use client";

import OppoScroll from "./component";

export default function Usage() {
	return (
		<div className="relative h-full w-full overflow-auto bg-background">
			<OppoScroll containerRef={undefined} />
		</div>
	);
}
```

## Source

### `components/ui/opposite-scroll.tsx`

```tsx
import { useEffect, useRef, useState } from "react";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

// Credit:
// www.hover.dev/components/other#opposite-scroll-content

const OppoScroll = ({ containerRef }) => {
	const targetRef = useRef<HTMLDivElement | null>(null);
	const [componentContainerRef, setComponentContainerRef] = useState(null);

	useEffect(() => {
		setComponentContainerRef(containerRef);
	}, [containerRef]);

	const { scrollYProgress } = useScroll({
		target: targetRef,
		// container: componentContainerRef || null,
	});

	if (!!componentContainerRef && componentContainerRef?.current === undefined)
		return null;

	return (
		<section ref={targetRef} className="flex bg-background text-foreground">
			<Content content={items} />
			<Images content={items} scrollYProgress={scrollYProgress} />
		</section>
	);
};

const Content = ({ content }: { content: typeof items }) => {
	return (
		<div className="w-full">
			{content.map(({ id, title, description }, idx) => (
				<div
					key={title + id}
					className={`p-8 h-screen flex flex-col justify-between ${
						idx % 2 ? "bg-background text-foreground" : "bg-background text-foreground"
					}`}
				>
					<h3 className="text-3xl font-medium">{title}</h3>
					<p className="font-light w-full max-w-md">{description}</p>
				</div>
			))}
		</div>
	);
};

const Images = ({
	content,
	scrollYProgress,
}: {
	content: typeof items;
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
				{[...content]?.reverse().map(({ img, id, title }) => (
					<img
						key={id + "opposite-scroll"}
						alt={title}
						className="h-screen w-full object-cover"
						src={img}
					/>
				))}
			</motion.div>
		</div>
	);
};

export default OppoScroll;

const items = [
	{
		id: 1,
		title: "Black Nike w white check",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
		img: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=830&q=80",
	},
	{
		id: 2,
		title: "Bunch of black and white shoes",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
		img: "https://images.unsplash.com/photo-1600054904350-1d493ae5f922?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=930&q=80",
	},
	{
		id: 3,
		title: "White shoes in the rain",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
		img: "https://images.unsplash.com/photo-1465479423260-c4afc24172c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80",
	},
	{
		id: 4,
		title: "White shoes with black heel",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
		img: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1662&q=80",
	},
];
```
