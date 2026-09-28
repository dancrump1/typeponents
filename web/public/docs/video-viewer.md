# Video Viewer

- Categories: Videos
- Import: `@/components/ui/video-viewer`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/video-viewer.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Usage

```tsx
"use client";

import React from "react";

import { VideoContainer } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-screen flex items-center justify-center relative overflow-hidden bg-background">
			<VideoContainer />
		</div>
	);
}
```

## Source

### `components/ui/video-viewer.tsx`

```tsx
import React, { useState } from "react";

function extractString(str) {
	// Find the last occurrence of '/'
	const lastSlashIndex = str.lastIndexOf("/");

	// Find the first occurrence of '?' after the last '/'
	const questionMarkIndex = str.indexOf("?", lastSlashIndex);

	// Extract the part after the last '/' and before the first '?'
	if (questionMarkIndex !== -1) {
		return str.substring(lastSlashIndex + 1, questionMarkIndex);
	} else {
		// If there's no '?' in the string, return the part after the last '/'
		return str.substring(lastSlashIndex + 1);
	}
}

const videos = [
	{
		title: "vid 1",
		thumbnail: "./thumbnail.png",
		videoTitle: "welcome to vid 1",
		description: "vid 1 is about some stuff",
		url: "https://www.youtube.com/embed/v4H2fTgHGuc?si=f4L6CB7VHhGr841A",
	},
	{
		title: "vid 2",
		thumbnail: "./thumbnail2.png",
		videoTitle: "welcome to vid 2",
		description: "vid 1 is about some stuff",
		url: "https://www.youtube.com/embed/OUM6XmhViN4?si=AuMbxeyCEVTdRidJ",
	},
];

export function VideoContainer() {
	const [selectedVideo, setSelectedVideo] = useState(videos[0]);

	return (
		<div className="grid grid-cols-1 gap-6 h-[600px] md:grid-cols-[1fr_300px] mx-6">
			<div className="bg-background rounded-lg w-full overflow-hidden relative  min-h-[25vh]">
				<span className="w-full h-full object-cover aspect-video rounded-md bg-muted" />

				<iframe
					src={
						selectedVideo.url +
						`playlist=${extractString(
							selectedVideo.url
						)}&controls=1&enablejsapi=0&iv_load_policy=3`
					}
					width={1920}
					height={1080}
					title={selectedVideo.title}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
					className="h-full w-full"
				/>
			</div>
			<div className="bg-background dark:bg-background rounded-lg md:block">
				<div className="p-4 border-b border-gray-200 dark:border-gray-700">
					<h2 className="text-lg font-heading font-semibold">
						Related Videos
					</h2>
				</div>
				<div className="overflow-auto max-h-[600px]">
					<div className="grid gap-4 p-4">
						{videos
							.filter((item) => {
								return item.videoTitle !== selectedVideo.videoTitle;
							})
							.map((embed, i) => {
								return (
									<div
										className="grid grid-cols-[80px_1fr] gap-4 items-center cursor-pointer"
										onClick={() => setSelectedVideo(embed)}
										key={embed.title}
									>
										<img
											alt="Thumbnail"
											className="rounded-md object-cover aspect-square"
											height="80"
											src={embed.thumbnail}
											width="80"
										/>
										<div>
											<h3 className="font-medium line-clamp-2 font-copy text-lg">
												{embed.videoTitle}
											</h3>
											<p className="text-foreground dark:text-foreground line-clamp-2">
												{embed.description}
											</p>
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
}
```
