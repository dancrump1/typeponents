# Link Preview

- Categories: Navigation
- Tags: spring, hover, cursor-tracking
- Import: `@/components/ui/link-preview`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/link-preview

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/link-preview.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `@radix-ui/react-hover-card`
- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `url` *(required)* | `string` | — | — |
| `isStatic` *(required)* | `boolean` | — | — |
| `className` | `string` | — | — |
| `width` | `number` | `200` | — |
| `height` | `number` | `125` | — |
| `quality` | `number` | `50` | — |
| `layout` | `string` | `"fixed"` | — |
| `imageSrc` | `string` | `""` | — |

## Usage

```tsx
"use client";

import React from "react";

import { LinkPreview } from "./component";

export default function LinkPreviewDemo() {
	return (
		<div className="flex justify-center items-center h-160 flex-col px-4">
			<span className="text-secondary dark:text-secondary text-xl md:text-3xl max-w-3xl mx-auto mb-10">
				<LinkPreview
					url="https://tailwindcss.com"
					imageSrc="/itjustworks.jpg"
					className="font-bold"
				>
					Tailwind CSS
				</LinkPreview>{" "}
				and{" "}
				<LinkPreview
					url="https://framer.com/motion"
					imageSrc="/itjustworks.jpg"
					className="font-bold"
				>
					Framer Motion
				</LinkPreview>{" "}
				are a great way to build modern websites.
			</span>
			<span className="text-secondary dark:text-secondary text-xl md:text-3xl max-w-3xl mx-auto">
				Visit{" "}
				<LinkPreview
					url="https://ui.aceternity.com"
					imageSrc="/itjustworks.jpg"
					className="font-bold bg-clip-text text-transparent bg-linear-to-br from-purple-500 to-pink-500"
				>
					Aceternity UI
				</LinkPreview>{" "}
				for amazing Tailwind and Framer Motion components.
			</span>
		</div>
	);
}
```

## Source

### `components/ui/link-preview.tsx`

```tsx
"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import {
	AnimatePresence,
	motion,
	useMotionValue,
	useSpring,
} from "motion/react";

// https://ui.aceternity.com/components/link-preview

type LinkPreviewProps = {
	children: React.ReactNode;
	url: string;
	className?: string;
	width?: number;
	height?: number;
	quality?: number;
	layout?: string;
} & (
	| { isStatic: true; imageSrc: string }
	| { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
	children,
	url,
	className,
	width = 200,
	height = 125,
	quality = 50,
	layout = "fixed",
	imageSrc = "",
}: LinkPreviewProps) => {
	const [isOpen, setOpen] = React.useState(false);

	const [isMounted, setIsMounted] = React.useState(false);

	React.useEffect(() => {
		setIsMounted(true);
	}, []);

	const springConfig = { stiffness: 100, damping: 15 };
	const x = useMotionValue(0);

	const translateX = useSpring(x, springConfig);

	const handleMouseMove = (event: any) => {
		const targetRect = event.target.getBoundingClientRect();
		const eventOffsetX = event.clientX - targetRect.left;
		const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2; // Reduce the effect to make it subtle
		x.set(offsetFromCenter);
	};

	return (
		<>
			{isMounted ? (
				<div className="hidden">
					<Image
						src={imageSrc || ""}
						width={width}
						height={height}
						quality={quality}
						layout={layout}
						priority={true}
						alt="hidden image"
					/>
				</div>
			) : null}

			<HoverCardPrimitive.Root
				openDelay={50}
				closeDelay={100}
				onOpenChange={(open) => {
					setOpen(open);
				}}
			>
				<HoverCardPrimitive.Trigger
					onMouseMove={handleMouseMove}
					className={cn("text-foreground dark:text-foreground", className)}
					href={url}
				>
					{children}
				</HoverCardPrimitive.Trigger>

				<HoverCardPrimitive.Content
					className="origin-(--radix-hover-card-content-transform-origin)"
					side="top"
					align="center"
					sideOffset={10}
				>
					<AnimatePresence>
						{isOpen && (
							<motion.div
								initial={{ opacity: 0, y: 20, scale: 0.6 }}
								animate={{
									opacity: 1,
									y: 0,
									scale: 1,
									transition: {
										type: "spring",
										stiffness: 260,
										damping: 20,
									},
								}}
								exit={{ opacity: 0, y: 20, scale: 0.6 }}
								className="shadow-xl rounded-xl"
								style={{
									x: translateX,
								}}
							>
								<Link
									href={url}
									className="block p-1 bg-background border-2 border-transparent shadow-sm rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
									style={{ fontSize: 0 }}
								>
									<Image
										src={imageSrc || ""}
										width={width}
										height={height}
										quality={quality}
										layout={layout}
										priority={true}
										className="rounded-lg"
										alt="preview image"
									/>
								</Link>
							</motion.div>
						)}
					</AnimatePresence>
				</HoverCardPrimitive.Content>
			</HoverCardPrimitive.Root>
		</>
	);
};
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/link-preview

Adapted from the original. Credit the original author when you ship this.
