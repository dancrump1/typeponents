# Fold Hover Button

- Categories: Buttons
- Tags: spring, hover
- Import: `@/components/ui/fold-hover-button`
- Inspiration: Eclair UI (adaptation) — https://eclairui.gopx.dev/components/buttons/folder-hover-button

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/fold-hover-button.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `folderName` *(required)* | `string` | — | — |
| `images` *(required)* | `string[]` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import FolderHoverButton from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="flex justify-center items-center flex-col gap-6 w-full h-full">
				<FolderHoverButton
					folderName="🗽 New York, USA"
					images={[
						"/itjustworks.jpg",
						"/itjustworks.jpg",
						"/itjustworks.jpg",
						"/itjustworks.jpg",
					]}
				/>
			</div>{" "}
		</div>
	);
}
```

## Source

### `components/ui/fold-hover-button.tsx`

```tsx
import React, { useState } from "react";

import Image from "next/image";

import { motion, useAnimation } from "motion/react";

// Credit:
// https://eclairui.gopx.dev/components/buttons/folder-hover-button

interface FolderHoverButtonProps {
	folderName: string;
	images: string[];
}

function FolderHoverButton({ folderName, images }: FolderHoverButtonProps) {
	const [isHovered, setIsHovered] = useState(false);
	const controls = useAnimation();

	const handleHoverStart = () => {
		setIsHovered(true);
		controls.start("open");
	};

	const handleHoverEnd = () => {
		setIsHovered(false);
		controls.start("closed");
	};

	const maxRotation = 45;
	const rotationStep = maxRotation / (images?.length + 1);

	const folderVariants = {
		closed: {
			rotateX: 0,
			y: 0,
			z: 40,
			zIndex: 1,
		},
		open: {
			rotateX: -maxRotation,
			z: 40,
			zIndex: 3,
		},
	};

	const imageVariants = (index: number) => ({
		closed: { rotateX: 0, y: 0, z: 0, opacity: 1 },
		open: {
			rotateX: -maxRotation + (index + 1) * rotationStep,
			z: 30 - index * 5,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 20,
				delay: index * 0.1,
			},
		},
	});

	return (
		<div
			className="relative w-4/5 h-32 cursor-pointer"
			style={{ perspective: "1000px" }}
			onMouseEnter={handleHoverStart}
			onMouseLeave={handleHoverEnd}
			role="button"
			tabIndex={0}
			aria-label={`Open ${folderName} folder`}
		>
			<div
				className="absolute inset-0 flex items-end justify-center"
				style={{ transformStyle: "preserve-3d" }}
			>
				{images?.map((image, index) => (
					<motion.div
						key={index + "fold-button"}
						className="absolute inset-0 origin-bottom"
						initial="closed"
						animate={controls}
						variants={imageVariants(index)}
						style={{
							transformStyle: "preserve-3d",
							zIndex: images?.length - index + (isHovered ? 2 : 1),
						}}
					>
						<Image
							src={image}
							alt={`Image ${index + 1} in ${folderName} folder`}
							layout="fill"
							objectFit="cover"
							className="rounded-lg"
						/>
					</motion.div>
				))}
				<motion.div
					className="absolute inset-0 bg-background border-2 border-white/5 rounded-lg origin-bottom"
					initial="closed"
					animate={controls}
					variants={folderVariants}
					transition={{ type: "spring", stiffness: 300, damping: 20 }}
					style={{
						transformStyle: "preserve-3d",
						zIndex: images?.length + 1,
					}}
				>
					<div className="absolute inset-0 flex items-center justify-center">
						<span className="text-2xl font-caveat text-foreground">
							{folderName}
						</span>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

export default FolderHoverButton;
```

## Attribution

Source: Eclair UI · Original: https://eclairui.gopx.dev/components/buttons/folder-hover-button

Adapted from the original. Credit the original author when you ship this.
