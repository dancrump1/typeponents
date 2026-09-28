# Theme Changer

- Categories: Utilities
- Tags: internal, hover, theme-aware
- Import: `@/components/ui/theme-changer`
- Inspiration: skiper-ui.com (adaptation) — https://skiper-ui.com/docs/components/theme-toggle-animations

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/theme-changer.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `lucide-react`
- `next-themes`

## Registry dependencies

- `button`
- `https://components.drivedev.net/r/theme-animations.json`
- `theme-animations`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `AnimationVariant` | `"circle-blur"` | — |
| `start` | `AnimationStart` | `"top-left"` | — |
| `showLabel` | `boolean` | `false` | — |
| `url` | `string` | `""` | — |

## Usage

```tsx
import React from "react";

import { ThemeToggleButton } from "./component";

const ThemeToggleAnimationsDemo = () => {
	return (
		<div className="h-screen w-full flex items-center justify-center ">
			<ThemeToggleButton
				showLabel
				variant="gif"
				url="https://media.giphy.com/media/KBbr4hHl9DSahKvInO/giphy.gif?cid=790b76112m5eeeydoe7et0cr3j3ekb1erunxozyshuhxx2vl&ep=v1_stickers_search&rid=giphy.gif&ct=s"
			/>
			<ThemeToggleButton
				showLabel
				variant="gif"
				url="https://media.giphy.com/media/5PncuvcXbBuIZcSiQo/giphy.gif?cid=ecf05e47j7vdjtytp3fu84rslaivdun4zvfhej6wlvl6qqsz&ep=v1_stickers_search&rid=giphy.gif&ct=s"
			/>
			<ThemeToggleButton
				showLabel
				variant="gif"
				url="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3JwcXdzcHd5MW92NWprZXVpcTBtNXM5cG9obWh0N3I4NzFpaDE3byZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/WgsVx6C4N8tjy/giphy.gif"
			/>
			<ThemeToggleButton
				showLabel
				variant="gif"
				url="https://media.giphy.com/media/ArfrRmFCzYXsC6etQX/giphy.gif?cid=ecf05e47kn81xmnuc9vd5g6p5xyjt14zzd3dzwso6iwgpvy3&ep=v1_stickers_search&rid=giphy.gif&ct=s"
			/>

			<ThemeToggleButton showLabel />
			<ThemeToggleButton showLabel variant="circle-blur" start="top-right" />
			<ThemeToggleButton
				showLabel
				variant="circle-blur"
				start="bottom-left"
			/>
			<ThemeToggleButton
				showLabel
				variant="circle-blur"
				start="bottom-right"
			/>

			<ThemeToggleButton showLabel variant="circle" start="top-left" />
			<ThemeToggleButton showLabel variant="circle" start="top-right" />
			<ThemeToggleButton showLabel variant="circle" start="bottom-left" />
			<ThemeToggleButton showLabel variant="circle" start="bottom-right" />

			<ThemeToggleButton showLabel variant="circle" start="center" />
			<ThemeToggleButton
				variant="gif"
				url="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWI1ZmNvMGZyemhpN3VsdWp4azYzcWUxcXIzNGF0enp0eW1ybjF0ZyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/Fa6uUw8jgJHFVS6x1t/giphy.gif"
			/>
		</div>
	);
};

export default ThemeToggleAnimationsDemo;
```

## Source

### `components/ui/theme-changer.tsx`

```tsx
"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import {
	AnimationStart,
	AnimationVariant,
	createAnimation,
} from "@/components/ui/theme-animations";

// Credit:
// https://skiper-ui.com/docs/components/theme-toggle-animations

// CSS to Add to global

/*
.page-transition {
  opacity: 0;
  transition: opacity 0.7s ease;
}

.page-transition.active {
  opacity: 1;
}

@supports (view-transition-name: none) {
  .page-transition {
    transition: none;
  }

  ::view-transition-group(root) {
    animation-duration: 0.7s;
    animation-timing-function: linear(
      0 0%, 0.2342 12.49%, 0.4374 24.99%,
      0.6093 37.49%, 0.6835 43.74%,
      0.7499 49.99%, 0.8086 56.25%,
      0.8593 62.5%, 0.9023 68.75%, 0.9375 75%,
      0.9648 81.25%, 0.9844 87.5%,
      0.9961 93.75%, 1 100%
    );
  }

  ::view-transition-new(root) {
    mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="0" cy="0" r="18" fill="white" filter="url(%23blur)"/></svg>') top left / 0 no-repeat;
    mask-origin: content-box;
    animation: scale 1s;
    transform-origin: top left;
  }

  ::view-transition-old(root),
  .dark::view-transition-old(root) {
    animation: scale 1s;
    transform-origin: top left;
    z-index: -1;
  }

  @keyframes scale {
    to {
      mask-size: 350vmax;
    }
  }
}
*/

interface ThemeToggleAnimationProps {
	variant?: AnimationVariant;
	start?: AnimationStart;
	showLabel?: boolean;
	url?: string;
}

export function ThemeToggleButton({
	variant = "circle-blur",
	start = "top-left",
	showLabel = false,
	url = "",
}: ThemeToggleAnimationProps) {
	const { theme, setTheme } = useTheme();

	const styleId = "theme-transition-styles";

	const updateStyles = React.useCallback((css: string, name: string) => {
		if (typeof window === "undefined") return;

		let styleElement = document.getElementById(styleId) as HTMLStyleElement;

		if (!styleElement) {
			styleElement = document.createElement("style");
			styleElement.id = styleId;
			document.head.appendChild(styleElement);
		}

		styleElement.textContent = css;
	}, []);

	const toggleTheme = React.useCallback(() => {
		const animation = createAnimation(variant, start, url);

		updateStyles(animation.css, animation.name);

		if (typeof window === "undefined") return;

		const switchTheme = () => {
			setTheme(theme === "light" ? "dark" : "light");
		};

		if (!document.startViewTransition) {
			switchTheme();
			return;
		}

		document.startViewTransition(switchTheme);
	}, [theme, setTheme]);

	return (
		<Button
			onClick={toggleTheme}
			variant="ghost"
			size="icon"
			className="w-9 p-0 h-9 relative group"
			name="Theme Toggle Button"
		>
			<SunIcon className="size-[1.2rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
			<MoonIcon className="absolute size-[1.2rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Theme Toggle </span>
			{showLabel && (
				<>
					<span className="hidden group-hover:block border rounded-full px-2 absolute -top-10">
						variant = {variant}
					</span>
					<span className="hidden group-hover:block border rounded-full px-2 absolute -bottom-10">
						start = {start}
					</span>
				</>
			)}
		</Button>
	);
}
```

## Attribution

Source: skiper-ui.com · Original: https://skiper-ui.com/docs/components/theme-toggle-animations

Adapted from the original. Credit the original author when you ship this.
