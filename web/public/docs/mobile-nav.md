# Mobile Nav

- Categories: Navigation
- Import: `@/components/ui/mobile-nav`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/mobile-nav.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `@radix-ui/react-accordion`

## Usage

```tsx
"use client";

import {
	NavAccordion,
	NavAccordionContent,
	NavAccordionItem,
	NavAccordionTrigger,
} from "./component";

export default function Usage() {
	return (
		<div className="relative w-full max-w-md p-8">
			<NavAccordion type="single" collapsible className="w-full">
				<NavAccordionItem value="home">
					<NavAccordionTrigger>Home</NavAccordionTrigger>
					<NavAccordionContent>
						<p className="text-sm text-muted-foreground">
							Mobile navigation accordion primitives.
						</p>
					</NavAccordionContent>
				</NavAccordionItem>
				<NavAccordionItem value="about">
					<NavAccordionTrigger>About</NavAccordionTrigger>
					<NavAccordionContent>
						<p className="text-sm text-muted-foreground">
							Use these building blocks for responsive nav menus.
						</p>
					</NavAccordionContent>
				</NavAccordionItem>
			</NavAccordion>
		</div>
	);
}
```

## Source

### `components/ui/mobile-nav.tsx`

```tsx
import React, { useRef } from "react";

import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

const NavAccordion = AccordionPrimitive.Root;

const NavAccordionItem = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item
		ref={ref}
		className={cn(
			"border-b border-background last:border-none py-4 grid",
			className
		)}
		{...props}
	/>
));
NavAccordionItem.displayName = "AccordionItem";

const NavAccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Header className="flex justify-self-center">
		<AccordionPrimitive.Trigger
			ref={ref}
			className={cn(
				"flex flex-1 items-center justify-between font-medium transition-all",
				className
			)}
			{...props}
		>
			{children}
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
));
NavAccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const NavAccordionContent = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Content
		ref={ref}
		className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
		{...props}
	>
		<div className={cn("pb-4 pt-0", className)}>{children}</div>
	</AccordionPrimitive.Content>
));

NavAccordionContent.displayName = AccordionPrimitive.Content.displayName;

export {
	NavAccordion,
	NavAccordionContent,
	NavAccordionItem,
	NavAccordionTrigger,
};
```
