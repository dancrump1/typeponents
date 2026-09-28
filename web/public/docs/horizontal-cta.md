# Horizontal CTA

- Categories: Buttons
- Import: `@/components/ui/horizontal-cta`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/horizontal-cta.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Usage

```tsx
"use client";

import React from "react";

import CardCTA from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<CardCTA />
		</div>
	);
}
```

## Source

### `components/ui/horizontal-cta.tsx`

```tsx
import React from "react";

export default function CardCTA() {
	return (
		<>
			{/*<!-- Component: Horizontal card--> */}
			<div className="flex flex-col overflow-hidden bg-background rounded shadow-md text-slate-500 shadow-slate-200 sm:flex-row">
				{/*  <!-- Image --> */}
				<figure className="flex-1">
					<img
						src="https://picsum.photos/id/118/800/600"
						alt="card image"
						className="object-cover min-h-full aspect-auto"
					/>
				</figure>
				{/*  <!-- Body--> */}
				<div className="flex-1 p-6 sm:mx-6 sm:px-0">
					<header className="flex gap-4 mb-4">
						<a
							href="#"
							className="relative inline-flex items-center justify-center w-12 h-12 text-foreground rounded-full"
						>
							<img
								src="https://i.pravatar.cc/48?img=24"
								alt="user name"
								title="user name"
								width="48"
								height="48"
								className="max-w-full rounded-full"
							/>
						</a>
						<div>
							<h3 className="text-xl font-medium text-slate-700">
								A day in the sun
							</h3>
							<p className="text-sm text-slate-400">
								{" "}
								By Sue, jun 3 2023
							</p>
						</div>
					</header>
					<p>
						After a walk through history, there is nothing left to do but
						admire the hypnotizing landscapes that exist in every
						direction. From vast deserts to rainbow mountains, and
						everything in between.
					</p>
				</div>
			</div>
			{/*<!-- End Horizontal card--> */}
		</>
	);
}
```
