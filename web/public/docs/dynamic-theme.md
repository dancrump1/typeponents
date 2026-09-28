# Dynamic Theme

Sticky top navigation that recolours itself to stay legible over alternating light and dark page sections.

**Interaction.** As you scroll from one section to the next, every nav link fades between dark and light text to suit the background behind it, and the link for the section you are in brightens to full strength. Clicking a link scrolls smoothly to that section.

- Categories: Special Effects & FX
- Tags: scroll-driven
- Import: `@/components/ui/dynamic-theme`
- Inspiration: edil-ozi.pro (adaptation) — https://www.edil-ozi.pro/docs/components/dynamic-theme

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/dynamic-theme.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `@gsap/react`
- `gsap`

## Usage

```tsx
"use client";

import React from "react";

import DynamicTheme from "./component";

export default function Usage() {
	return (
		<div className="relative w-full flex items-center justify-center">
			<DynamicTheme />
		</div>
	);
}
```

## Source

### `components/ui/dynamic-theme.tsx`

```tsx
import { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// optional hook for smooth scrolling
// import useLenis from '@/hooks/useLenis';

// Credit:
// https://www.edil-ozi.pro/docs/components/dynamic-theme

gsap.registerPlugin(ScrollTrigger);

export const NAV_LINKS = [
	{ id: "home", linkIdx: 0, isDarkBg: false, start: "", end: "" },
	{ id: "services", linkIdx: 1, isDarkBg: true, start: "", end: "" },
	{ id: "works", linkIdx: 2, isDarkBg: false, start: "", end: "" },
	{ id: "about", linkIdx: 3, isDarkBg: true, start: "", end: "" },
	{ id: "contact", linkIdx: 4, isDarkBg: false, start: "", end: "" },
];

const DynamicTheme = ({ containerRef }) => {
	const navRef = useRef<HTMLDivElement | null>(null);
	const mainRef = useRef<HTMLElement | null>(null);

	// for smooth scrolling when link were pressed
	const smoothScroll = (id: string) => {
		const el = document.getElementById(id);
		el?.scrollIntoView({ behavior: "smooth" });
	};

	useGSAP(
		() => {
			console.log(mainRef?.current);

			if (!mainRef?.current) return;

			const navItems = mainRef?.current?.querySelectorAll(".nav_link");

			const setActiveLink = (linkIdx: number, isDark: boolean) => {
				navItems.forEach((item, i) => {
					if (i === linkIdx) {
						gsap.to(item, {
							color: isDark ? "#fff" : "#000",
							fontWeight: 500,
							duration: 0.08,
						});
					} else {
						gsap.to(item, {
							color: isDark ? "#fff5" : "#0007",
							fontWeight: 400,
							duration: 0.08,
						});
					}
				});
			};

			// Create ScrollTrigger for each section
			NAV_LINKS.forEach(({ id, linkIdx, isDarkBg, start, end }) => {
				ScrollTrigger.create({
					// scroller: ".scroll-container",
					trigger: "#" + id + "link-for-changing-theme",
					start: start || "top top",
					end: end || "bottom top",
					onEnter: () => setActiveLink(linkIdx, isDarkBg),
					onEnterBack: () => setActiveLink(linkIdx, isDarkBg),
				});
			});

			// Function to update active link style

			// Cleanup
			return () => {
				ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			};
		},
		{ scope: mainRef.current!, dependencies: [] }
	);

	//Optional for smooth scrolling
	//   useLenis()

	return (
		<section className="w-full relative bg-background" ref={mainRef}>
			<span className="absolute top-0 left-0 text-foreground w-full h-12 flex items-center mx-auto text-center z-10100">
				<p className="w-[70%] mx-auto text-balance text-sm font-medium tracking-wide opacity-60">
					This is demo area , please remove the additional styles from NAV
					element.
				</p>
			</span>
			<nav
				ref={navRef}
				className="flex h-16  items-center text-sm lg:text-lg top-0 w-full z-1000 shadow-xs sticky"
			>
				<ul className="flex flex-1 justify-end items-center h-full text-foreground space-x-4 px-6">
					{NAV_LINKS.map(({ id }) => (
						<li
							className="nav_link capitalize cursor-pointer transition inline-block"
							aria-label="link-button"
							role="button"
							tabIndex={0}
							onClick={() => smoothScroll(id)}
							key={id + "link-for-changing-theme"}
						>
							<p>{id}</p>
						</li>
					))}
				</ul>
			</nav>

			<section
				id="homelink-for-changing-theme"
				className="w-full h-[480px] flex flex-col items-center justify-center text-4xl uppercase text-opacity-80 bg-slate-100 text-foreground"
			>
				home section <br />
				<span className="text-xs font-bold tracking-wider opacity-40 mt-2 lowercase">
					(scroll down to see effect)
				</span>
			</section>

			<section
				id="serviceslink-for-changing-theme"
				className="w-full h-[480px] flex items-center justify-center text-4xl uppercase text-opacity-80 text-slate-bg-slate-100 bg-slate-950"
			>
				services section
			</section>

			<section
				id="workslink-for-changing-theme"
				className="w-full h-[480px] flex items-center justify-center text-4xl uppercase text-opacity-80 bg-slate-100 text-foreground"
			>
				works section
			</section>

			<section
				id="aboutlink-for-changing-theme"
				className="w-full h-[480px] flex items-center justify-center text-4xl uppercase text-opacity-80 text-slate-bg-slate-100 bg-slate-950"
			>
				about section
			</section>

			<section
				id="contactlink-for-changing-theme"
				className="w-full h-[480px] flex items-center justify-center text-4xl uppercase text-opacity-80 bg-slate-100 text-foreground"
			>
				contact section
			</section>
		</section>
	);
};

export default DynamicTheme;
```

## Attribution

Source: edil-ozi.pro · Original: https://www.edil-ozi.pro/docs/components/dynamic-theme

Adapted from the original. Credit the original author when you ship this.
