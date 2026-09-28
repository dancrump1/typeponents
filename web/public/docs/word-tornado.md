# Word Tornado

- Categories: Text Animations
- Tags: autoplay, responsive
- Import: `@/components/ui/word-tornado`
- Inspiration: Star UI (adaptation) — https://starui.link/docs/components/word-galaxy

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/word-tornado.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Usage

```tsx
"use client";

import React from "react";

import WordTornadoDemo from "./component";

export default function WordTornadoUsage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<WordTornadoDemo />
		</div>
	);
}
```

## Source

### `components/ui/word-tornado.tsx`

```tsx
import type React from "react";
import { useEffect, useRef } from "react";

// Credit:
// https://starui.link/docs/components/word-galaxy

const str =
	'Tailwind CSS is an open-source CSS framework. Unlike other frameworks, like Bootstrap, it does not provide a series of predefined classes for elements such as buttons or tables. Instead, it creates a list of "utility" CSS classes that can be used to style each element by mixing and matching.';

const words = str.split(" ");

export default function WordTornadoDemo() {
	return (
		<div className="p-5">
			<WordTornado>
				{words.map((word, index) => (
					<span
						key={index + "tornato"}
						className="inline-block ease-spring duration-500"
					>
						{word}
						{index < words.length && "\u00A0"}
					</span>
				))}
			</WordTornado>

			<div className="text-center text-3xl mt-10">Hover ↑</div>
		</div>
	);
}

export function WordTornado({
	distanceScale,
	maxMovement,
	...props
}: {
	distanceScale?: number;
	maxMovement?: number;
} & React.ComponentPropsWithoutRef<"div">) {
	const container = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		let instance: WordTornadoFactory;
		if (container.current) {
			instance = new WordTornadoFactory(
				container.current,
				distanceScale,
				maxMovement
			);
		}
		return () => instance.destroy();
	}, []);

	return <div ref={container} {...props} />;
}

type Position = { x: number; y: number };

export class WordTornadoFactory {
	private container: HTMLElement;
	private elements: HTMLElement[] = [];
	private elementsPosition: Position[] = [];
	private pointerPosition: Position | null = null;
	private resizeObserver?: ResizeObserver;
	private rafId?: ReturnType<typeof requestAnimationFrame>;
	private distanceScale = 200;
	private maxMovement = 100;

	constructor(
		container: HTMLElement | string,
		distanceScale = 200,
		maxMovement = 100
	) {
		if (!container) throw new Error("container is required");
		if (typeof container === "string") {
			const target = document.querySelector(container);
			if (!(target instanceof HTMLElement))
				throw new Error("container is not HTMLElement");
			this.container = target;
		} else {
			this.container = container;
		}
		this.distanceScale = distanceScale ?? 200;
		this.maxMovement = maxMovement ?? 100;
		this.container.style.touchAction = "none";
		this.getElements();
		this.addListeners();
		this.rafId = requestAnimationFrame(this.animate);
	}

	private getElements = () => {
		this.elements = Array.from(this.container.children).filter(
			(item) => item instanceof HTMLElement
		);
	};

	private updateElementsPosition = () => {
		const containerRect = this.container.getBoundingClientRect();
		this.elementsPosition = this.elements.map((element) => {
			const { x, y, width, height } = element.getBoundingClientRect();
			return {
				x: x - containerRect.x + width * 0.5,
				y: y - containerRect.y + height * 0.5,
			};
		});
	};

	private observeContainer = () => {
		this.resizeObserver =
			this.resizeObserver || new ResizeObserver(this.updateElementsPosition);
		this.resizeObserver.observe(this.container);
	};

	private updatePointerPosition = (event: PointerEvent) => {
		this.pointerPosition = this.pointerPosition || { x: 0, y: 0 };
		const { x, y } = this.container.getBoundingClientRect();
		this.pointerPosition.x = event.x - x;
		this.pointerPosition.y = event.y - y;
	};

	private resetPointerPosition = () => {
		this.pointerPosition = null;
	};

	private addListeners = () => {
		this.observeContainer();
		this.container.addEventListener(
			"pointermove",
			this.updatePointerPosition
		);
		this.container.addEventListener(
			"pointerleave",
			this.resetPointerPosition
		);
	};

	private removeListeners = () => {
		this.resizeObserver?.disconnect();
		this.container.removeEventListener(
			"pointermove",
			this.updatePointerPosition
		);
		this.container.removeEventListener(
			"pointerleave",
			this.resetPointerPosition
		);
		this.rafId && cancelAnimationFrame(this.rafId);
	};

	private animate = () => {
		if (!this.pointerPosition) {
			for (let i = 0; i < this.elements.length; i++) {
				this.elements[i].style.transform = "";
			}
		} else {
			for (let i = 0; i < this.elements.length; i++) {
				const { x, y } = this.elementsPosition[i];
				const { x: px, y: py } = this.pointerPosition;
				const dx = px - x;
				const dy = py - y;
				const distance = Math.sqrt(dx ** 2 + dy ** 2);
				const scale = Math.max(0, 1 - distance / this.distanceScale);

				const moveX = (-dx / distance) * scale * this.maxMovement;
				const moveY = (-dy / distance) * scale * this.maxMovement;

				this.elements[i].style.transform =
					`translate(${moveX}px, ${moveY}px)`;
			}
		}

		this.rafId = requestAnimationFrame(this.animate);
	};

	destroy = () => this.removeListeners();
}
```

## Attribution

Source: Star UI · Original: https://starui.link/docs/components/word-galaxy

Adapted from the original. Credit the original author when you ship this.
