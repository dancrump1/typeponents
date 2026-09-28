# Social Links

- Categories: Buttons
- Tags: hover
- Import: `@/components/ui/social-links`
- Inspiration: 21st.dev (adaptation) — https://21st.dev/serafimcloud/social-links/default

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/social-links.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `socials` *(required)* | `Social[]` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import { SocialLinks } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<SocialLinks
				socials={[
					{
						name: "Instagram",
						image: "/itjustworks.jpg",
					},
					{
						name: "LinkedIn",
						image: "/itjustworks.jpg",
					},
					{
						name: "Spotify",
						image: "/itjustworks.jpg",
					},
					{
						name: "TikTok",
						image: "/itjustworks.jpg",
					},
				]}
			/>
		</div>
	);
}
```

## Source

### `components/ui/social-links.tsx`

```tsx
"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

// Credit:
// https://21st.dev/serafimcloud/social-links/default

interface Social {
	name: string;
	image: string;
}

interface SocialLinksProps extends React.HTMLAttributes<HTMLDivElement> {
	socials: Social[];
}

export function SocialLinks({
	socials,
	className,
	...props
}: SocialLinksProps) {
	const [hoveredSocial, setHoveredSocial] = React.useState<string | null>(
		null
	);
	const [rotation, setRotation] = React.useState<number>(0);
	const [clicked, setClicked] = React.useState<boolean>(false);

	const animation = {
		scale: clicked ? [1, 1.3, 1] : 1,
		transition: { duration: 0.3 },
	};

	React.useEffect(() => {
		const handleClick = () => {
			setClicked(true);
			setTimeout(() => {
				setClicked(false);
			}, 200);
		};
		window.addEventListener("click", handleClick);
		return () => window.removeEventListener("click", handleClick);
	}, [clicked]);

	return (
		<div
			className={cn("flex items-center justify-center gap-0", className)}
			{...props}
		>
			{socials.map((social, index) => (
				<div
					className={cn(
						"relative cursor-pointer px-5 py-2 transition-opacity duration-200",
						hoveredSocial && hoveredSocial !== social.name
							? "opacity-50"
							: "opacity-100"
					)}
					key={index + "social-links"}
					onMouseEnter={() => {
						setHoveredSocial(social.name);
						setRotation(Math.random() * 20 - 10);
					}}
					onMouseLeave={() => setHoveredSocial(null)}
					onClick={() => {
						setClicked(true);
					}}
				>
					<span className="block text-lg font-medium">{social.name}</span>
					<AnimatePresence>
						{hoveredSocial === social.name && (
							<motion.div
								className="absolute bottom-0 left-0 right-0 flex h-full w-full items-center justify-center"
								animate={animation}
							>
								<motion.img
									key={social.name}
									src={social.image}
									alt={social.name}
									className="size-16"
									initial={{
										y: -40,
										rotate: rotation,
										opacity: 0,
										filter: "blur(2px)",
									}}
									animate={{ y: -50, opacity: 1, filter: "blur(0px)" }}
									exit={{ y: -40, opacity: 0, filter: "blur(2px)" }}
									transition={{ duration: 0.2 }}
								/>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			))}
		</div>
	);
}
```

## Attribution

Source: 21st.dev · Original: https://21st.dev/serafimcloud/social-links/default

Adapted from the original. Credit the original author when you ship this.
