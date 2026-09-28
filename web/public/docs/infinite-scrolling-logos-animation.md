# Infinite Scrolling Logos Animation

- Categories: Carousels
- Import: `@/components/ui/infinite-scrolling-logos-animation`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/infinite-scrolling-logos-animation.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`

## Usage

```tsx
"use client";

import InfiniteScrollingLogosAnimation from "./component";

const assets = [
	{ src: "/itjustworks.jpg", alt: "Logo 1" },
	{ src: "/itjustworks.jpg", alt: "Logo 2" },
	{ src: "/itjustworks.jpg", alt: "Logo 3" },
];

export default function Usage() {
	return (
		<div className="w-full py-8">
			<InfiniteScrollingLogosAnimation assets={assets} />
		</div>
	);
}
```

## Source

### `components/ui/infinite-scrolling-logos-animation.tsx`

```tsx
import React from "react";

import Image from "next/image";

import { motion } from "framer-motion";

const CompanyLogoData: Array<{ src: any; alt: string }> = [
	{ src: "/itjustworks.jpg", alt: "Acme Logo" },
	{ src: "/itjustworks.jpg", alt: "Quantum Logo" },
	{ src: "/itjustworks.jpg", alt: "Echo Logo" },
	{ src: "/itjustworks.jpg", alt: "Celestial Logo" },
	{ src: "/itjustworks.jpg", alt: "Pulse Logo" },
	{ src: "/itjustworks.jpg", alt: "Apex Logo" },
];

const InfiniteScrollingLogosAnimation = ({ assets }) => {
	return (
		<div className="flex py-8 relative overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-10 before:bg-linear-to-r before:from-background before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-10 after:bg-linear-to-l after:from-background after:to-transparent after:content-['']">
			<motion.div
				transition={{
					duration: 240,
					ease: "linear",
					repeat: Infinity,
				}}
				initial={{ translateX: 0 }}
				animate={{ translateX: "-50%" }}
				className="flex flex-none gap-16 pr-16"
			>
				{[...new Array(5)].fill(0).map((_, index) => (
					<React.Fragment key={index + "infinite-scroll-logo"}>
						{assets.map(({ url, alt, height, width, title }) => (
							<Image
								key={alt || title}
								src={url}
								alt={alt || title || "company we worked with"}
								height={120}
								width={240}
								className="h-16 w-auto flex-none"
							/>
						))}
					</React.Fragment>
				))}
			</motion.div>
		</div>
	);
};

export default InfiniteScrollingLogosAnimation;
```
