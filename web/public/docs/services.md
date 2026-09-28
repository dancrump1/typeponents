# Services

- Categories: Grids & Layouts
- Import: `@/components/ui/services`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/services.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Usage

```tsx
"use client";

import React from "react";

import { FeaturesSectionDemo } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<FeaturesSectionDemo />
		</div>
	);
}
```

## Source

### `components/ui/services.tsx`

```tsx
import React from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";

export function FeaturesSectionDemo() {
	const features = [
		{
			title: "Vestibular Rehabilitation",
			description: "Treat balance and dizziness issues",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={24}
					height={24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
					className="icon icon-tabler icons-tabler-outline icon-tabler-mood-smile"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
					<path d="M9 10l.01 0" />
					<path d="M15 10l.01 0" />
					<path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
				</svg>
			),
		},
		{
			title: "Bike Fitting",
			description:
				"Evaluate your body mechanics, riding history, and goals to determine the best position for your bike. ",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={24}
					height={24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
					className="icon icon-tabler icons-tabler-outline icon-tabler-bike"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M5 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
					<path d="M19 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
					<path d="M12 19l0 -4l-3 -3l5 -4l2 3l3 0" />
					<path d="M17 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
				</svg>
			),
		},
		{
			title: "Physical Therapy",
			description:
				"If you donot like EveryAI, we will convince you to like us.",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={24}
					height={24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
					className="icon icon-tabler icons-tabler-outline icon-tabler-stretching-2"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M11 4a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
					<path d="M6.5 21l3.5 -5" />
					<path d="M5 11l7 -2" />
					<path d="M16 21l-4 -7v-5l7 -4" />
				</svg>
			),
		},
		{
			title: "Schedule today",
			description: "Personalized care for real people",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={24}
					height={24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
					className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-month"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
					<path d="M16 3v4" />
					<path d="M8 3v4" />
					<path d="M4 11h16" />
					<path d="M7 14h.013" />
					<path d="M10.01 14h.005" />
					<path d="M13.01 14h.005" />
					<path d="M16.015 14h.005" />
					<path d="M13.015 17h.005" />
					<path d="M7.01 17h.005" />
					<path d="M10.01 17h.005" />
				</svg>
			),
		},
	];
	return (
		<div className="cont-page grid grid-cols-1 md:grid-cols-2 relative z-10 py-24 max-w-7xl mx-auto">
			{features.map((feature, index) => (
				<Feature key={feature.title} {...feature} index={index} />
			))}
		</div>
	);
}

export const Feature = ({
	title,
	description,
	icon,
	index,
}: {
	title: string;
	description: string;
	icon: any;
	index: number;
}) => {
	return (
		<div
			className={cn(
				"flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
				(index === 0 || index === 2) &&
					"lg:border-l dark:border-neutral-800"
			)}
		>
			{index < 4 && (
				<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-t from-background dark:from-background to-transparent pointer-events-none" />
			)}
			{index >= 4 && (
				<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-linear-to-b from-background dark:from-background to-transparent pointer-events-none" />
			)}
			<div className="mb-4 relative z-10 px-10 text-foreground dark:text-foreground">
				<Image
					src={icon.url || "/itjustworks.jpg"}
					alt={icon.title}
					height={48}
					width={48}
				/>
			</div>
			<div className="text-lg font-bold mb-2 relative z-10 px-10">
				<div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-background dark:bg-background group-hover/feature:bg-background transition-[height,background-color] duration-200 origin-center" />
				<span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-foreground dark:text-foreground">
					{title}
				</span>
			</div>
			<span className="text-sm text-foreground dark:text-foreground lg:max-w-[75%] relative z-10 px-10">
				{description}
			</span>
		</div>
	);
};
```
