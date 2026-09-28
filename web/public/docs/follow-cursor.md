# Follow Cursor

- Categories: Cursor & Pointer Effects
- Tags: spring, cursor-tracking
- Import: `@/components/ui/follow-cursor`
- Inspiration: Spark UI (adaptation) — https://www.sparkui.site/components/mouse-follower

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/follow-cursor.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Usage

```tsx
"use client";

import React, { useEffect, useState } from "react";

import MouseFollower from "./component";

export default function Usage() {
	const [mouseFollowerContainer, setMouseFollowerContainer] = useState();

	useEffect(() => {
		if (window !== undefined) {
			setMouseFollowerContainer(document.getElementById("mouseFollower"));
		}
	}, []);

	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="w-full h-[33vh] relative" id="mouseFollower">
				<MouseFollower container={mouseFollowerContainer} />
			</div>
		</div>
	);
}
```

## Source

### `components/ui/follow-cursor.tsx`

```tsx
"use client";

import { useEffect, useRef } from "react";

import { motion, useMotionValue, useSpring } from "motion/react";

// Credit:
// https://www.sparkui.site/components/mouse-follower

export default function MouseFollower({ container }) {
	const cursor = useRef(null);
	const cursorSize = 15;

	const mouse = {
		x: useMotionValue(0),
		y: useMotionValue(0),
	};

	// Smooth out the mouse values
	const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
	const smoothMouse = {
		x: useSpring(mouse.x, smoothOptions),
		y: useSpring(mouse.y, smoothOptions),
	};

	const manageMouseMove = (e) => {
		const { clientX, clientY } = e;

		// Move custom cursor to follow the mouse
		mouse.x.set(clientX - cursorSize / 2);
		mouse.y.set(clientY - cursorSize / 2);
	};

	useEffect(() => {
		container
			? container.addEventListener("mousemove", manageMouseMove)
			: window.addEventListener("mousemove", manageMouseMove);

		return () => {
			container
				? container.removeEventListener("mousemove", manageMouseMove)
				: window.removeEventListener("mousemove", manageMouseMove);
		};
	}, [container]);

	return (
		<motion.div
			style={{
				left: smoothMouse.x,
				top: smoothMouse.y,
				pointerEvents: "none",
				width: cursorSize,
				height: cursorSize,
			}}
			className={`h-4 w-4 fixed rounded-full bg-background`}
			ref={cursor}
		/>
	);
}
```

## Attribution

Source: Spark UI · Original: https://www.sparkui.site/components/mouse-follower

Adapted from the original. Credit the original author when you ship this.
