# Glass Nav

Frosted glass navigation bar with a centred logo, link pills and a collapsible mobile menu.

**Interaction.** Moving the pointer across the bar hides the real cursor and replaces it with a round indigo badge that follows it. Links and buttons frost over and grow a little on hover, and the menu icon slides the mobile links open.

- Categories: Navigation
- Tags: hover
- Import: `@/components/ui/glass-nav`
- Inspiration: Hover.dev (adaptation) — https://www.hover.dev/components/navigation

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/glass-nav.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`
- `react-icons`
- `react-use-measure`

## Usage

```tsx
import GlassNavigation from "./component";

export default function Usage() {
	return (
		<section
			className="relative h-[150vh] w-full overflow-hidden bg-background"
			style={{
				backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23171717'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
			}}
		>
			<GlassNavigation />

			<span className="absolute -top-[600px] left-[50%] h-[800px] w-4/5 max-w-3xl -translate-x-[50%] rounded bg-background" />
		</section>
	);
}
```

## Source

### `components/ui/glass-nav.tsx`

```tsx
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { AnimationScope, motion, useAnimate } from "motion/react";
import { FiArrowUpRight, FiMenu } from "react-icons/fi";
import useMeasure from "react-use-measure";

// Credit:
// https://www.hover.dev/components/navigation

const GlassNavigation = ({ demo = false }) => {
	const [hovered, setHovered] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	const [scope, animate] = useAnimate();
	const navRef = useRef<HTMLDivElement | null>(null);

	const handleMouseMove = ({ offsetX, offsetY, target }: MouseEvent) => {
		// @ts-ignore
		const isNavElement = [...target.classList].includes("glass-nav");

		if (isNavElement) {
			setHovered(true);

			const top = offsetY + "px";
			const left = offsetX + "px";

			animate(scope.current, { top, left }, { duration: 0 });
		} else {
			setHovered(false);
		}
	};

	useEffect(() => {
		navRef.current?.addEventListener("mousemove", handleMouseMove);

		return () =>
			navRef.current?.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<nav
			ref={navRef}
			onMouseLeave={() => setHovered(false)}
			style={{
				cursor: hovered ? "none" : "auto",
			}}
			className={cn(
				"glass-nav fixed left-0 right-0 top-0 z-10 mx-auto max-w-6xl overflow-hidden border border-white/10 bg-linear-to-br from-background/20 to-background/5 backdrop-blur-sm md:left-6 md:right-6 md:top-6 md:rounded-2xl",
				{ absolute: demo }
			)}
		>
			<div className="glass-nav flex items-center justify-between px-5 py-5">
				<Cursor hovered={hovered} scope={scope} />

				<Links />

				<Logo />

				<Buttons setMenuOpen={setMenuOpen} />
			</div>

			<MobileMenu menuOpen={menuOpen} />
		</nav>
	);
};

const Cursor = ({
	hovered,
	scope,
}: {
	hovered: boolean;
	scope: AnimationScope<any>;
}) => {
	return (
		<motion.span
			initial={false}
			animate={{
				opacity: hovered ? 1 : 0,
				transform: `scale(${
					hovered ? 1 : 0
				}) translateX(-50%) translateY(-50%)`,
			}}
			transition={{ duration: 0.15 }}
			ref={scope}
			className="pointer-events-none absolute z-0 grid h-[50px] w-[50px] origin-top-left place-content-center rounded-full bg-linear-to-br from-indigo-600 from-40% to-indigo-400 text-2xl"
		>
			<FiArrowUpRight className="text-foreground" />
		</motion.span>
	);
};

const Logo = () => (
	<span className="pointer-events-none relative left-0 top-[50%] z-10 text-4xl font-black text-foreground mix-blend-overlay md:absolute md:left-[50%] md:-translate-x-[50%] md:-translate-y-[50%]">
		logo.
	</span>
);

const Links = () => (
	<div className="hidden items-center gap-2 md:flex">
		<GlassLink text="Products" />
		<GlassLink text="History" />
		<GlassLink text="Contact" />
	</div>
);

const GlassLink = ({ text }: { text: string }) => {
	return (
		<a
			href="#"
			className="group relative scale-100 overflow-hidden rounded-lg px-4 py-2 transition-transform hover:scale-105 active:scale-95"
		>
			<span className="relative z-10 text-foreground/90 transition-colors group-hover:text-foreground">
				{text}
			</span>
			<span className="absolute inset-0 z-0 bg-linear-to-br from-background/20 to-background/5 opacity-0 transition-opacity group-hover:opacity-100" />
		</a>
	);
};

const TextLink = ({ text }: { text: string }) => {
	return (
		<a href="#" className="text-foreground/90 transition-colors hover:text-foreground">
			{text}
		</a>
	);
};

const Buttons = ({
	setMenuOpen,
}: {
	setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => (
	<div className="flex items-center gap-4">
		<div className="hidden md:block">
			<SignInButton />
		</div>

		<button className="relative scale-100 overflow-hidden rounded-lg bg-linear-to-br from-indigo-600 from-40% to-indigo-400 px-4 py-2 font-medium text-foreground transition-transform hover:scale-105 active:scale-95">
			Try free
		</button>

		<button
			onClick={() => setMenuOpen((pv) => !pv)}
			className="ml-2 block scale-100 text-3xl text-foreground/90 transition-[transform,color] hover:scale-105 hover:text-foreground active:scale-95 md:hidden"
		>
			<FiMenu />
		</button>
	</div>
);

const SignInButton = () => {
	return (
		<button className="group relative scale-100 overflow-hidden rounded-lg px-4 py-2 transition-transform hover:scale-105 active:scale-95">
			<span className="relative z-10 text-foreground/90 transition-colors group-hover:text-foreground">
				Sign in
			</span>
			<span className="absolute inset-0 z-0 bg-linear-to-br from-background/20 to-background/5 opacity-0 transition-opacity group-hover:opacity-100" />
		</button>
	);
};

const MobileMenu = ({ menuOpen }: { menuOpen: boolean }) => {
	const [ref, { height }] = useMeasure();
	return (
		<motion.div
			initial={false}
			animate={{
				height: menuOpen ? height : "0px",
			}}
			className="block overflow-hidden md:hidden"
		>
			<div ref={ref} className="flex items-center justify-between px-4 pb-4">
				<div className="flex items-center gap-4">
					<TextLink text="Products" />
					<TextLink text="History" />
					<TextLink text="Contact" />
				</div>
				<SignInButton />
			</div>
		</motion.div>
	);
};

export default GlassNavigation;
```

## Attribution

Source: Hover.dev · Original: https://www.hover.dev/components/navigation

Adapted from the original. Credit the original author when you ship this.
