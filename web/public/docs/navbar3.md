# Navbar3

Minimal navigation bar pinned to the top of the page, with a logo, one text link, and a light/dark mode toggle.

**Interaction.** Hovering the nav button tints its label pink; clicking the toggle switches the page between light and dark. The bar stays fixed in place as you scroll.

- Categories: Navigation
- Tags: hover
- Import: `@/components/ui/navbar3`
- Inspiration: Hover.dev (adaptation) — https://www.hover.dev/components/heros

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/navbar3.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Registry dependencies

- `mode-toggle`

## Usage

```tsx
"use client";

import { NavBar3 } from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<NavBar3 />
		</div>
	);
}
```

## Source

### `components/ui/navbar3.tsx`

```tsx
import { ModeToggle } from "@/components/ui/mode-toggle";

// https://www.hover.dev/components/heros
export const NavBar3 = () => {
	return (
		<nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-foreground">
			<div className="text-foreground dark:text-foreground">logo</div>
			<section className="flex gap-2">
				<button
					// onClick={() => {
					//   document.getElementById("launch-schedule")?.scrollIntoView({
					//     behavior: "smooth",
					//   });
					// }}
					className="flex items-center gap-1 text-xs hover:text-pink-900 dark:hover:text-pink-300 text-foreground dark:text-foreground"
				>
					Nav Button
				</button>
				<ModeToggle />
			</section>
		</nav>
	);
};
```

## Attribution

Source: Hover.dev · Original: https://www.hover.dev/components/heros

Adapted from the original. Credit the original author when you ship this.
