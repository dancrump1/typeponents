# Expanding Tabs

- Categories: Navigation
- Tags: spring, hover
- Import: `@/components/ui/expanding-tabs`
- Inspiration: geist.vercel.app (adaptation) — https://geist.vercel.app/docs/framer-motion/navigation/expandable-tabs

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/expanding-tabs.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `lucide-react`
- `motion`
- `usehooks-ts`

## Usage

```tsx
"use client";

import React from "react";

import ExpandableTabs from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<ExpandableTabs />
		</div>
	);
}
```

## Source

### `components/ui/expanding-tabs.tsx`

```tsx
"use client";

import React, { useRef, useState } from "react";

import { Bell, HelpCircle, Home, Settings, Shield } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useOnClickOutside } from "usehooks-ts";

// Credit:
// https://geist.vercel.app/docs/framer-motion/navigation/expandable-tabs

export default function ExpandableTabs() {
	const [selected, setSelected] = useState<number | null>(null);
	const outsideClickRef = useRef(null);

	useOnClickOutside(outsideClickRef, () => setSelected(null));

	const tabs = [
		{ title: "Dashboard", icon: <Home size={20} /> },
		{ title: "Notifications", icon: <Bell size={20} /> },
		{ type: "separator" },
		{ title: "Settings", icon: <Settings size={20} /> },
		{ title: "Support", icon: <HelpCircle size={20} /> },
		{ title: "Security", icon: <Shield size={20} /> },
	];

	const buttonVariants = {
		initial: {
			gap: 0,
			paddingLeft: ".5rem",
			paddingRight: ".5rem",
		},
		animate: (isSelected: boolean) => ({
			gap: isSelected ? ".5rem" : 0,
			paddingLeft: isSelected ? "1rem" : ".5rem",
			paddingRight: isSelected ? "1rem" : ".5rem",
		}),
	};

	const spanVariants = {
		initial: { width: 0, opacity: 0 },
		animate: { width: "auto", opacity: 1 },
		exit: { width: 0, opacity: 0 },
	};

	const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

	const Separator = () => (
		<div
			className="mx-1 h-[24px] w-[1.2px] bg-background"
			aria-hidden="true"
		/>
	);

	return (
		<div className="mx-auto flex items-center justify-center">
			<div
				ref={outsideClickRef}
				className="mb-8 flex flex-wrap items-center gap-2 rounded-2xl border border-neutral-800 bg-background p-1 shadow-[0_6px_24px_rgba(34,42,53,0.12),0_0_0_1px_rgba(34,42,53,0.05),0_4px_8px_rgba(34,42,53,0.08),0_1px_1px_rgba(34,42,53,0.10)]"
			>
				{tabs.map((tab, index) => {
					if (tab.type === "separator") {
						return <Separator key={`separator-${index}`} />;
					}
					return (
						<motion.button
							key={tab.title}
							variants={buttonVariants}
							initial={false}
							animate="animate"
							custom={selected === index}
							onClick={() => setSelected(index)}
							transition={transition}
							className={`${
								selected === index
									? "bg-background text-opacity-100 [&]:text-foreground"
									: "hover:bg-background"
							} relative flex items-center rounded-xl px-4 py-2 text-sm font-medium text-foreground transition-colors duration-300`}
						>
							{tab.icon}
							<AnimatePresence initial={false}>
								{selected === index && (
									<motion.span
										variants={spanVariants}
										initial="initial"
										animate="animate"
										exit="exit"
										transition={transition}
										className="overflow-hidden"
									>
										{tab.title}
									</motion.span>
								)}
							</AnimatePresence>
						</motion.button>
					);
				})}
			</div>
		</div>
	);
}
```

## Attribution

Source: geist.vercel.app · Original: https://geist.vercel.app/docs/framer-motion/navigation/expandable-tabs

Adapted from the original. Credit the original author when you ship this.
