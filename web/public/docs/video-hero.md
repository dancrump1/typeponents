# Video Hero

- Categories: Videos
- Import: `@/components/ui/video-hero`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/video-hero.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Usage

```tsx
"use client";

import React from "react";

import VideoHero from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<VideoHero />
		</div>
	);
}
```

## Source

### `components/ui/video-hero.tsx`

```tsx
"use client";

import React from "react";

const VideoHero = () => {
	return (
		<section
			className="aspect-square md:aspect-video relative md:rounded-lg
			flex flex-col items-center 
			justify-center text-center md:mt-[.5em] md:mx-[7%] mb-[3em]
			text-foreground overflow-hidden"
		>
			<div className="video-docker absolute inset-0 -mx-[40%]">
				<iframe
					className="w-full h-full"
					src="https://www.youtube.com/embed/jJN3amHlaKQ?feature=oembed&loop=1&playsinline=1&autoplay=1&mute=1&controls=0&enablejsapi=0&iv_load_policy=3"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				></iframe>
			</div>
			<div className="video-content space-y-2 z-10">
				<h1 className="font-light text-6xl">full Hero Video</h1>
				<h3 className="font-light text-3xl">with TailwindCSS</h3>
			</div>
		</section>
	);
};

export default VideoHero;
```
