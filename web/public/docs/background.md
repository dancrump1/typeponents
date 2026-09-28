# Background

Full-screen hero image with a tint overlay, loaded at whichever size suits the viewport.

**Interaction.** Static layout — the image is picked to match the screen width on load and does not respond to input.

- Categories: Backgrounds
- Import: `@/components/ui/background`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/background.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Usage

```tsx
"use client";

import Background from "./component";

export default function Usage() {
	return (
		<div className="relative h-[400px] w-full overflow-hidden rounded-xl">
			<Background
				image={{ url: "https://picsum.photos/1200/800" }}
				position="center"
			/>
		</div>
	);
}
```

## Source

### `components/ui/background.tsx`

```tsx
import React from "react";

const Background = ({ image, position = "center" }) => {
	return (
		<>
			<picture className="bkg">
				<source
					media="(max-width: 450px)"
					srcSet={image.url}
					width={450}
					height={750}
					style={{ objectFit: "cover" }}
				/>
				<source
					media="(max-width: 750px)"
					srcSet={image.url}
					width={750}
					height={750}
					style={{ objectFit: "cover" }}
				/>
				<source
					media="(max-width: 1050px)"
					srcSet={image.url}
					width={1300}
					height={1300}
					style={{ objectFit: "cover" }}
				/>
				<source
					media="(max-width: 1400px)"
					srcSet={image.url}
					width={1400}
					height={1200}
					style={{ objectFit: "cover" }}
				/>
				<source
					media="(max-width: 2000px)"
					srcSet={image.url}
					width={2000}
					height={1250}
					style={{ objectFit: "cover" }}
				/>
				<source
					media="(max-width: 2500px)"
					srcSet={image.url}
					width={2500}
					height={1400}
					style={{ objectFit: "cover" }}
				/>
				<img
					src={image.url}
					width={5000}
					height={2800}
					style={{ objectFit: "cover" }}
					alt={image.title}
					className={`h-screen w-screen object-cover object-${position}`}
				/>
			</picture>
			<div className="overlay"></div>
		</>
	);
};

export default Background;
```
