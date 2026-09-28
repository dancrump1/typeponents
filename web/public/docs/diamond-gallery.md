# Diamond Gallery

- Categories: Media Galleries
- Tags: hover
- Import: `@/components/ui/diamond-gallery`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/diamond-gallery.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `images` *(required)* | `ImageItem[]` | — | — |

## Usage

```tsx
import DiamondGallery from "./component";

export default function Usage() {
	return (
		<div className="w-96 h-96 mx-auto aspect-square">
			<DiamondGallery
				images={[
					{
						image: "/itjustworks.jpg",
						isLink: true,
						href: "https://drivebrandstudio.com",
						target: "_blank",
						rel: "noopener noreferrer",
					},
					{
						image: "/itjustworks.jpg",
						isLink: true,
						href: "https://drivebrandstudio.com",
					},
					{
						image: "/itjustworks.jpg",
						isLink: true,
						href: "https://drivebrandstudio.com",
					},
					{
						image: "/itjustworks.jpg",
						isLink: true,
						href: "https://drivebrandstudio.com",
					},
				]}
			/>
		</div>
	);
}
```

## Source

### `components/ui/diamond-gallery.tsx`

```tsx
"use client";

import { useState } from "react";

import Image from "next/image";

interface ImageItem {
	image: string;
	isLink?: boolean;
	href?: string;
	target?: string;
	rel?: string;
}

interface DiamondGalleryProps {
	images: ImageItem[];
}

const DiamondGallery = ({ images }: DiamondGalleryProps) => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const positions = [
		"top-0 left-1/2 transform -translate-x-1/2 -translate-y-[5%]",
		"left-0 top-1/2 transform -translate-y-1/2 -translate-x-[5%]",
		"right-0 top-1/2 transform -translate-y-1/2 translate-x-[5%]",
		"bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[5%]",
	];

	return (
		<div className="relative aspect-square h-full">
			{images.slice(0, 4).map((img: ImageItem, idx: number) => {
				const imageElement = (
					<Image
						src={img.image}
						height={100}
						width={100}
						alt={`Diamond Image ${idx + 1}`}
						className="size-full object-cover -rotate-45 scale-150"
						onMouseEnter={() => setHoveredIndex(idx)}
						onMouseLeave={() => setHoveredIndex(null)}
					/>
				);

				return (
					<div
						className={`absolute w-1/2 h-1/2 rotate-45 rounded-lg transition-[transform,z-index] duration-500 overflow-hidden 
              ${positions[idx]}
              ${hoveredIndex === idx ? "scale-100 z-1" : "scale-75 z-0"}
              ${
						hoveredIndex !== null && hoveredIndex !== idx
							? "filter blur-xs grayscale"
							: ""
					}`}
						key={idx}
					>
						{img.isLink ? (
							<a
								href={img.href}
								target={img.target}
								rel={img.rel}
								className="block size-full"
							>
								{imageElement}
							</a>
						) : (
							imageElement
						)}
					</div>
				);
			})}
		</div>
	);
};

export default DiamondGallery;
```
