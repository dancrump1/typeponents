# Video Player

- Categories: Videos
- Import: `@/components/ui/video-player`
- Inspiration: tailwindflex.com (adaptation) — https://tailwindflex.com/@samuel33/hero-with-video-background

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/video-player.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `video.js`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `firstLine` *(required)* | `string` | — | — |
| `secondLine` *(required)* | `string` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import VideoPlayer from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<VideoPlayer />
		</div>
	);
}
```

## Source

### `components/ui/video-player.tsx`

```tsx
import React, { useEffect } from "react";

import videojs from "video.js";

// https://tailwindflex.com/@samuel33/hero-with-video-background

const VideoPlayer = ({
	firstLine,
	secondLine,
}: {
	firstLine: string;
	secondLine: string;
}) => {
	useEffect(() => {
		!!document.getElementById("home-video") && videojs("#home-video");
	}, []);

	return (
		<>
			<video
				id="home-video"
				className="home-video video-js vjs-big-play-centered object-cover object-top-left rounded-lg inset-0 h-full w-full"
				controls="controls"
				preload="auto"
				poster="public/BuildSomethingMeaningful.png"
				data-setup="{}"
			>
				<source src="/public/DriveReel_compressed.mp4" type="video/mp4" />
				<source src="/public/DriveReel_compressed.webm" type="video/webm" />
				<p className="vjs-no-js">
					To view this video please enable JavaScript, and consider
					upgrading to a web browser that
					<a
						href="https://videojs.com/html5-video-support/"
						target="_blank"
					>
						supports HTML5 video
					</a>
				</p>
			</video>
			<span className="line first">{firstLine}</span>
			<span className="line second">{secondLine}</span>
		</>
	);
};

export default VideoPlayer;
```

## Attribution

Source: tailwindflex.com · Original: https://tailwindflex.com/@samuel33/hero-with-video-background

Adapted from the original. Credit the original author when you ship this.
