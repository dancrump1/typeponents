# Image Zoom

- Categories: Images
- Tags: scroll-driven
- Import: `@/components/ui/image-zoom`
- Inspiration: ui.noxhd.com (adaptation) — https://ui.noxhd.com/components/image-zoom/

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/image-zoom.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `gsap`

## Usage

```tsx
"use client";

import React from "react";

import ImageZoom from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div>
				<ImageZoom
					outsideImage={"/oie_transparent.png"}
					insideImage={"/itjustworks.jpg"}
				/>
			</div>{" "}
		</div>
	);
}
```

## Source

### `components/ui/image-zoom.tsx`

```tsx
"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Credit:
// https://ui.noxhd.com/components/image-zoom/

gsap.registerPlugin(ScrollTrigger);

const ImageZoom = ({ outsideImage, insideImage }) => {
	const containerRef = useRef(null);
	const wrapperRef = useRef(null);
	const imageRef = useRef(null);
	const heroRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;
		const wrapper = wrapperRef.current;
		const image = imageRef.current;
		const hero = heroRef.current;

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: wrapper,
				start: "top top",
				end: "+=150%",
				scrub: 1,
				pin: true,
				anticipatePin: 1,
				// scroller: ".scroll-container",
			},
		});

		tl.to(
			image,
			{
				scale: 2,
				y: "20%",
				transformOrigin: "center center",
				ease: "power1.inOut",
			},
			0
		).to(
			hero,
			{
				scale: 1.2,
				transformOrigin: "center center",
				ease: "power1.inOut",
			},
			0
		);

		return () => {
			tl.kill();
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="h-[100vw] md:h-screen overflow-y-auto overflow-x-hidden previews aspect-square md:aspect-auto"
		>
			<div ref={wrapperRef} className="relative w-full h-full z-10">
				<div className="relative w-full h-full overflow-hidden">
					<section
						ref={heroRef}
						className="w-full h-full bg-center bg-no-repeat bg-cover"
						style={{ backgroundImage: `${insideImage}` }}
					></section>
				</div>
				<div className="absolute top-0 left-0 right-0 w-full h-full z-20 overflow-hidden">
					<img
						ref={imageRef}
						src={outsideImage}
						alt="Parallax Image"
						className="w-full h-full object-cover object-center"
					/>
				</div>
			</div>
		</div>
	);
};

export default ImageZoom;
```

## Attribution

Source: ui.noxhd.com · Original: https://ui.noxhd.com/components/image-zoom/

Adapted from the original. Credit the original author when you ship this.
