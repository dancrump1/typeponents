# Tabs

- Categories: Navigation
- Tags: spring, hover
- Import: `@/components/ui/tabs`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/tabs

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/tabs.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `tabs` *(required)* | `Tab[]` | — | — |
| `containerClassName` | `string` | — | — |
| `activeTabClassName` | `string` | — | — |
| `tabClassName` | `string` | — | — |
| `contentClassName` | `string` | — | — |

## Usage

```tsx
"use client";

import Image from "next/image";

import { Tabs } from "./component";

const DummyContent = () => {
	return (
		<Image
			src="/itjustworks.jpg"
			alt="dummy image"
			width={100}
			height={100}
			className="object-cover object-top-left h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
		/>
	);
};

export const tabs = [
	{
		title: "Product",
		value: "product",
		content: (
			<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-secondary bg-linear-to-br from-purple-700 to-violet-900">
				<p>Product Tab</p>
				<DummyContent />
			</div>
		),
	},
	{
		title: "Services",
		value: "services",
		content: (
			<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-secondary bg-linear-to-br from-purple-700 to-violet-900">
				<p>Services tab</p>
				<DummyContent />
			</div>
		),
	},
	{
		title: "Playground",
		value: "playground",
		content: (
			<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-secondary bg-linear-to-br from-purple-700 to-violet-900">
				<p>Playground tab</p>
				<DummyContent />
			</div>
		),
	},
	{
		title: "Content",
		value: "content",
		content: (
			<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-secondary bg-linear-to-br from-purple-700 to-violet-900">
				<p>Content tab</p>
				<DummyContent />
			</div>
		),
	},
	{
		title: "Random",
		value: "random",
		content: (
			<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-secondary bg-linear-to-br from-purple-700 to-violet-900">
				<p>Random tab</p>
				<DummyContent />
			</div>
		),
	},
];

function TabsDemo() {
	return (
		<div className="h-80 md:h-160 perspective-[1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
			<Tabs tabs={tabs} />
		</div>
	);
}

export default TabsDemo;
```

## Source

### `components/ui/tabs.tsx`

```tsx
"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

// https://ui.aceternity.com/components/tabs

type Tab = {
	title: string;
	value: string;
	content?: string | React.ReactNode | any;
};

export const Tabs = ({
	tabs: propTabs,
	containerClassName,
	activeTabClassName,
	tabClassName,
	contentClassName,
}: {
	tabs: Tab[];
	containerClassName?: string;
	activeTabClassName?: string;
	tabClassName?: string;
	contentClassName?: string;
}) => {
	const [active, setActive] = useState<Tab>(propTabs[0]);
	const [tabs, setTabs] = useState<Tab[]>(propTabs);

	const moveSelectedTabToTop = (idx: number) => {
		const newTabs = [...propTabs];
		const selectedTab = newTabs.splice(idx, 1);
		newTabs.unshift(selectedTab[0]);
		setTabs(newTabs);
		setActive(newTabs[0]);
	};

	const [hovering, setHovering] = useState(false);

	return (
		<>
			<div
				className={cn(
					"flex flex-row items-center justify-start perspective-[1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
					containerClassName
				)}
			>
				{propTabs.map((tab, idx) => (
					<button
						key={tab.title}
						onClick={() => {
							moveSelectedTabToTop(idx);
						}}
						onMouseEnter={() => setHovering(true)}
						onMouseLeave={() => setHovering(false)}
						className={cn(
							"relative px-4 py-2 rounded-full",
							tabClassName
						)}
						style={{
							transformStyle: "preserve-3d",
						}}
					>
						{active.value === tab.value && (
							<motion.div
								layoutId="clickedbutton"
								transition={{
									type: "spring",
									bounce: 0.3,
									duration: 0.6,
								}}
								className={cn(
									"absolute inset-0 bg-background dark:bg-background rounded-full ",
									activeTabClassName
								)}
							/>
						)}

						<span className="relative block text-foreground dark:text-foreground">
							{tab.title}
						</span>
					</button>
				))}
			</div>
			<FadeInDiv
				tabs={tabs}
				active={active}
				key={active.value}
				hovering={hovering}
				className={cn("mt-32", contentClassName)}
			/>
		</>
	);
};

export const FadeInDiv = ({
	className,
	tabs,
	hovering,
}: {
	className?: string;
	key?: string;
	tabs: Tab[];
	active: Tab;
	hovering?: boolean;
}) => {
	const isActive = (tab: Tab) => {
		return tab.value === tabs[0].value;
	};
	return (
		<div className="relative w-full h-full">
			{tabs.map((tab, idx) => (
				<motion.div
					key={tab.value}
					layoutId={tab.value}
					style={{
						scale: 1 - idx * 0.1,
						top: hovering ? idx * -50 : 0,
						zIndex: -idx,
						opacity: idx < 3 ? 1 - idx * 0.1 : 0,
					}}
					animate={{
						y: isActive(tab) ? [0, 40, 0] : 0,
					}}
					className={cn("w-full h-full absolute top-0 left-0", className)}
				>
					{tab.content}
				</motion.div>
			))}
		</div>
	);
};
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/tabs

Adapted from the original. Credit the original author when you ship this.
