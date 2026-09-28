# Following Headers

- Categories: Navigation
- Tags: scroll-driven, hover
- Import: `@/components/ui/following-headers`
- Inspiration: cuicui.day (adaptation) — https://cuicui.day/application-ui/table-of-contents

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/following-headers.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `lucide-react`
- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `idOfParentContainer` *(required)* | `string` | — | — |
| `props` | `HTMLProps<HTMLDivElement>` | — | — |
| `className` | `string` | — | — |

## Usage

```tsx
import TableOfContent from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full flex-col gap-8 md:flex-row">
			<TableOfContent
				className="w-full rounded-lg p-2 md:w-72"
				idOfParentContainer="parent-content"
			/>
			<div className="w-full">
				<p className="mb-2 text-secondary text-xs">
					Scroll the section below
				</p>
				<div
					className="h-96 w-full space-y-20 overflow-scroll rounded-xl bg-background/10 p-8"
					id="parent-content"
				>
					<h1>Table of content preview</h1>
					<LoremIpsum />
					<h2>Here is the first h2</h2>
					<LoremIpsum />
					<h3>Here is the first h3</h3>
					<LoremIpsum />
					<h3>Here is the second h3</h3>
					<LoremIpsum />
					<h2>Here is the second h2</h2>
					<LoremIpsum />
					<h3>Here is the third h3</h3>
					<LoremIpsum />
					<h3>Here is the fourth h3</h3>
					<LoremIpsum />
					<h2>Here is the third h2</h2>
					<LoremIpsum />
					<h3>Here is the fifth h3</h3>
					<LoremIpsum />
					<h3>Here is the sixth h3</h3>
					<LoremIpsum />
				</div>
			</div>
		</div>
	);
}

const LoremIpsum = () => {
	return (
		<p>
			Commodo labore ullamco excepteur. Labore sunt dolore velit et
			consectetur proident minim minim occaecat. Id sit adipisicing aliqua
			proident nisi mollit aute. Duis in dolore incididunt ea. Quis quis in
			do quis laboris veniam ex irure consectetur incididunt in. Est ipsum in
			nostrud anim ut exercitation. Deserunt in consequat Lorem. Id magna
			culpa anim anim quis tempor reprehenderit enim ex fugiat veniam aliqua.
			Commodo proident laboris aute qui. Fugiat non ullamco nulla sunt
			officia eu cupidatat sit id qui id. Aliquip anim elit eu occaecat id
			pariatur irure labore cupidatat aliqua aliquip sunt commodo incididunt
			officia. Id ea elit labore sunt Lorem culpa exercitation. Deserunt
			pariatur enim in. Aliquip fugiat irure labore in consequat ex consequat
			et esse cupidatat aute in esse.
		</p>
	);
};
```

## Source

### `components/ui/following-headers.tsx`

```tsx
"use client";

import { useEffect, useRef, useState, type HTMLProps } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// Credit:
// https://cuicui.day/application-ui/table-of-contents

type Heading = {
	id: string;
	text: string;
	level: number;
	index: number;
};

const TableOfContent = ({
	className,
	idOfParentContainer,
	...props
}: {
	readonly props?: HTMLProps<HTMLDivElement>;
	readonly className?: string;
	readonly idOfParentContainer: string;
}) => {
	const [headings, setHeadings] = useState<Heading[]>([]);
	const [activeIds, setActiveIds] = useState<string[]>([]);
	const [activeTableOfContentIds, setActiveTableOfContentIds] = useState<
		string[]
	>([]);
	const [firstActiveHeading2, setFirstActiveHeading2] = useState<
		string | null
	>(null);
	const [lastActiveHeading2, setLastActiveHeading2] = useState<string | null>(
		null
	);
	const [bottomCoordinate, setBottomCoordinate] = useState<number>(0);
	const [topCoordinate, setTopCoordinate] = useState<number>(0);
	const refTableOfContentList = useRef<HTMLOListElement>(null);
	useEffect(() => {
		if (activeTableOfContentIds.length > 0) {
			setFirstActiveHeading2(activeTableOfContentIds[0]);
			setLastActiveHeading2(
				activeTableOfContentIds[activeTableOfContentIds.length - 1]
			);
		} else {
			setFirstActiveHeading2(null);
			setLastActiveHeading2(null);
		}
	}, [activeTableOfContentIds]);

	useEffect(() => {
		// Get coordinates of the bottom of the last active heading and the top of the first active heading
		const lastChildId =
			activeTableOfContentIds[activeTableOfContentIds.length - 1];
		const firstChildId = activeTableOfContentIds[0];
		const lastChild = document.getElementById(
			`${lastChildId}-table-of-content-item`
		);
		const firstChild = document.getElementById(
			`${firstChildId}-table-of-content-item`
		);

		if (lastChild && firstChild) {
			const lastChildRect = lastChild.getBoundingClientRect();
			const firstChildRect = firstChild.getBoundingClientRect();

			// Calculate relative coordinates from the ol element
			if (!refTableOfContentList.current) {
				return;
			}
			setBottomCoordinate(
				lastChildRect.bottom -
					refTableOfContentList.current.getBoundingClientRect().top
			);
			setTopCoordinate(
				firstChildRect.top -
					refTableOfContentList.current.getBoundingClientRect().top
			);
		}
	}, [activeTableOfContentIds]);

	useEffect(() => {
		if (!headings) {
			return;
		}
		if (activeIds.length > 0) {
			const previousHeading = getPreviousHeading(activeIds[0], headings);
			if (previousHeading) {
				const activeIdsWithPreviousHeading = [
					previousHeading,
					...activeIds,
				];
				setActiveTableOfContentIds(activeIdsWithPreviousHeading);
			} else {
				setActiveTableOfContentIds(activeIds);
			}
		} else {
			// Keep the previous active ids if there are no active ids but without the first one
			setActiveTableOfContentIds((prevIds) => {
				if (prevIds.length > 0) {
					return prevIds.slice(1);
				}
				return [];
			});
		}
	}, [activeIds, headings]);

	useEffect(() => {
		if (typeof document === "undefined") {
			return;
		}

		const content = document.getElementById(idOfParentContainer);
		if (!content) {
			return;
		}

		const headingElements = Array.from(
			content.querySelectorAll("h1, h2, h3, h4, h5, h6")
		);

		const newHeadings: Heading[] = headingElements.map((elem, index) => {
			let id = elem.id;
			if (!id) {
				id =
					elem.textContent
						?.toLowerCase()
						.replace(/\s+/g, "-")
						.replace(/[!@#$%^&*(),.?":{}|<>]/g, "") ?? "";
				elem.id = id;
			}
			const level = Number.parseInt(elem.tagName.substring(1), 10);
			return { id, text: elem.textContent ?? "", level, index };
		});

		setHeadings(newHeadings);

		const handleIntersection: IntersectionObserverCallback = (entries) => {
			const updateActiveIds = (
				prevIds: string[],
				entries: IntersectionObserverEntry[]
			) => {
				const updatedIds = [...prevIds];
				for (const entry of entries) {
					const index = updatedIds.indexOf(entry.target.id);

					if (entry.isIntersecting) {
						if (index === -1) {
							updatedIds.push(entry.target.id);
							updatedIds.sort(
								(a, b) =>
									headingElements.findIndex((el) => el.id === a) -
									headingElements.findIndex((el) => el.id === b)
							);
						}
					} else if (index !== -1) {
						updatedIds.splice(index, 1);
					}
				}

				return updatedIds;
			};

			setActiveIds((prevIds) => updateActiveIds(prevIds, entries));
		};

		const observerOptions: IntersectionObserverInit = {
			root: null,
			rootMargin: "-10px",
			// threshold: [0.5, 1],
			threshold: [1],
		};

		const observer = new IntersectionObserver(
			handleIntersection,
			observerOptions
		);

		for (const elem of headingElements) {
			observer.observe(elem);
		}

		return () => {
			observer.disconnect();
		};
	}, [idOfParentContainer]);

	function getPreviousHeading(id: string, headings: Heading[]) {
		const index = headings.findIndex((heading) => heading.id === id);
		if (index === 0) {
			return null;
		}
		return headings[index - 1]?.id;
	}

	if (headings.length === 0) {
		return <div>loading</div>;
	}

	return (
		<nav className={cn("bg-background dark:bg-background", className)} {...props}>
			<ol className="relative overflow-hidden " ref={refTableOfContentList}>
				{headings.map((heading, _index) => {
					return (
						<li
							className="group relative px-1 text-foreground hover:text-foreground dark:hover:text-foreground"
							id={`${heading.id}-table-of-content-item`}
							key={heading.id}
						>
							<div
								aria-hidden="true"
								className="pointer-events-none absolute top-px left-0 z-20 h-full select-none bg-background dark:bg-background"
								style={{
									width: `${(heading.level - 1) * 8 - 1}px`,
								}}
							/>
							<div
								aria-hidden="true"
								className="pointer-events-none absolute z-20 h-full w-full select-none bg-background dark:bg-background"
								style={{
									left: `${(heading.level - 1) * 8}px`,
								}}
							/>
							<Link
								className={cn(
									"relative z-30 block transform-gpu py-1.5 pr-5 pl-2 text-sm leading-4 tracking-tight transition-translated hover:translate-x-0.5",
									// Before element : positionning
									"before:absolute before:top-0.5 before:right-0 before:bottom-0.5 before:left-0 ",
									// Before element : animation
									"before:scale-x-75 before:scale-y-50 before:transform-gpu before:rounded-lg before:bg-background/10 before:opacity-0 before:transition-[transform,opacity] before:duration-300 group-hover:before:scale-100 group-hover:before:opacity-100",
									(heading.level === 1 || heading.level === 2) &&
										"font-semibold",
									heading.level === 3 && "font-normal"
								)}
								href={`#${heading.id}`}
								style={{
									marginLeft: `${(heading.level - 1) * 8}px`,
								}}
							>
								{heading.text}
							</Link>
							<ChevronRight className="-translate-y-1/2 absolute top-1/2 right-1 ml-1 size-4 translate-x-1 transform-gpu opacity-0 transition-[transform,opacity] group-hover:translate-x-0 group-hover:opacity-100" />
						</li>
					);
				})}
				<AnimatePresence>
					{firstActiveHeading2 && lastActiveHeading2 && (
						<motion.div
							animate={{ opacity: 1, y: 0 }}
							className="pointer-events-none absolute z-10 w-full select-none bg-blue-500"
							exit={{ opacity: 0, y: -100 }}
							initial={{ opacity: 0, y: -100 }}
							layout={true}
							layoutId="active-bar"
							style={{
								top: topCoordinate,
								bottom: `calc(100% - ${bottomCoordinate}px)`,
							}}
							transition={{ duration: 0.3, ease: "easeOut" }}
						/>
					)}
				</AnimatePresence>
			</ol>
		</nav>
	);
};

export default TableOfContent;
```

## Attribution

Source: cuicui.day · Original: https://cuicui.day/application-ui/table-of-contents

Adapted from the original. Credit the original author when you ship this.
