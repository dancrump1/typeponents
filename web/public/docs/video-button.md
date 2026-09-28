# Video Button

- Categories: Buttons
- Tags: hover, autoplay
- Import: `@/components/ui/video-button`
- Inspiration: Eclair UI (adaptation) — https://eclairui.gopx.dev/components/buttons/video-button

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/video-button.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `videoSrc` *(required)* | `string` | — | — |
| `className` | `string` | — | — |

## Usage

```tsx
"use client";

import VideoButton from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<VideoButton />
		</div>
	);
}
```

## Source

### `components/ui/video-button.tsx`

```tsx
"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

// Credit
// https://eclairui.gopx.dev/components/buttons/video-button

interface VideoButtonProps {
	children: React.ReactNode;
	videoSrc: string;
	className?: string;
}

const VideoButton = ({ children, videoSrc, className }: VideoButtonProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isPressed, setIsPressed] = useState(false);

	return (
		<button
			className={cn(
				"relative inline-flex items-center justify-center rounded-2xl text-sm font-medium transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background text-foreground hover:bg-background dark:bg-background dark:text-foreground dark:hover:bg-background h-10 px-8 py-8 overflow-hidden shadow-lg hover:shadow-xl dark:shadow-white/20 dark:hover:shadow-white/30",
				isPressed && "scale-95",
				className
			)}
			onMouseEnter={() => {
				setIsHovered(true);
			}}
			onMouseLeave={() => setIsHovered(false)}
			onMouseDown={() => setIsPressed(true)}
			onMouseUp={() => setIsPressed(false)}
			onTouchStart={() => setIsPressed(true)}
			onTouchEnd={() => setIsPressed(false)}
		>
			<span className="relative z-10">{children}</span>
			<div
				className={`absolute inset-0 transition-opacity duration-300 ${
					isHovered ? "opacity-50" : "opacity-0"
				}`}
			>
				<video
					className="object-cover w-full h-full"
					src={videoSrc}
					loop
					muted
					// playsInline
					// autoPlay
					onMouseEnter={(e) => e.target.play()}
					onMouseLeave={(e) => e.target.pause()}
				/>
			</div>
		</button>
	);
};

export default VideoButton;
```

## Attribution

Source: Eclair UI · Original: https://eclairui.gopx.dev/components/buttons/video-button

Adapted from the original. Credit the original author when you ship this.
