# Flower Menu

- Categories: Navigation
- Tags: hover
- Import: `@/components/ui/flower-menu`
- Inspiration: animata.design (adaptation) — https://animata.design/docs/list/flower-menu

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/flower-menu.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `menuItems` *(required)* | `MenuItem[]` | — | — |
| `iconColor` | `string` | `"white"` | — |
| `backgroundColor` | `string` | `"rgba(255, 255, 255, 0.2)"` | — |
| `animationDuration` | `number` | `500` | — |
| `togglerSize` | `number` | `40` | — |

## Usage

```tsx
"use client";

import React from "react";

import FlowerMenu from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="w-full flex place-content-center">
				<FlowerMenu
					backgroundColor="black"
					menuItems={[
						{
							icon: () => (
								<svg
									width="100%"
									height="100%"
									viewBox="0 0 380 380"
									fill="black"
									xmlns="http://www.w3.org/2000/svg"
									preserveAspectRatio="none"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M0 0H380V380H81L121 340H320C331.046 340 340 331.046 340 320V60C340 48.9541 331.046 40 320 40H60C48.9543 40 40 48.9541 40 60V320C40 331.046 48.9543 340 60 340H81V380H0V0Z"
										fill="black"
									/>
								</svg>
							),
							href: "https://drivebrandstudio.com",
						},
						{
							icon: () => (
								<svg
									width="100%"
									height="100%"
									viewBox="0 0 380 380"
									fill="black"
									xmlns="http://www.w3.org/2000/svg"
									preserveAspectRatio="none"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M0 0H380V380H81L121 340H320C331.046 340 340 331.046 340 320V60C340 48.9541 331.046 40 320 40H60C48.9543 40 40 48.9541 40 60V320C40 331.046 48.9543 340 60 340H81V380H0V0Z"
										fill="black"
									/>
								</svg>
							),
							href: "https://drivebrandstudio.com",
						},
						{
							icon: () => (
								<svg
									width="100%"
									height="100%"
									viewBox="0 0 380 380"
									fill="black"
									xmlns="http://www.w3.org/2000/svg"
									preserveAspectRatio="none"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M0 0H380V380H81L121 340H320C331.046 340 340 331.046 340 320V60C340 48.9541 331.046 40 320 40H60C48.9543 40 40 48.9541 40 60V320C40 331.046 48.9543 340 60 340H81V380H0V0Z"
										fill="black"
									/>
								</svg>
							),
							href: "https://drivebrandstudio.com",
						},
						{
							icon: () => (
								<svg
									width="100%"
									height="100%"
									viewBox="0 0 380 380"
									fill="black"
									xmlns="http://www.w3.org/2000/svg"
									preserveAspectRatio="none"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M0 0H380V380H81L121 340H320C331.046 340 340 331.046 340 320V60C340 48.9541 331.046 40 320 40H60C48.9543 40 40 48.9541 40 60V320C40 331.046 48.9543 340 60 340H81V380H0V0Z"
										fill="black"
									/>
								</svg>
							),
							href: "https://drivebrandstudio.com",
						},
						{
							icon: () => (
								<svg
									width="100%"
									height="100%"
									viewBox="0 0 380 380"
									fill="black"
									xmlns="http://www.w3.org/2000/svg"
									preserveAspectRatio="none"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M0 0H380V380H81L121 340H320C331.046 340 340 331.046 340 320V60C340 48.9541 331.046 40 320 40H60C48.9543 40 40 48.9541 40 60V320C40 331.046 48.9543 340 60 340H81V380H0V0Z"
										fill="black"
									/>
								</svg>
							),
							href: "https://drivebrandstudio.com",
						},
						{
							icon: () => (
								<svg
									width="100%"
									height="100%"
									viewBox="0 0 380 380"
									fill="black"
									xmlns="http://www.w3.org/2000/svg"
									preserveAspectRatio="none"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M0 0H380V380H81L121 340H320C331.046 340 340 331.046 340 320V60C340 48.9541 331.046 40 320 40H60C48.9543 40 40 48.9541 40 60V320C40 331.046 48.9543 340 60 340H81V380H0V0Z"
										fill="black"
									/>
								</svg>
							),
							href: "https://drivebrandstudio.com",
						},
					]}
				/>
			</div>{" "}
		</div>
	);
}
```

## Source

### `components/ui/flower-menu.tsx`

```tsx
import { useState } from "react";

import Link from "next/link";

// Credit:
// https://animata.design/docs/list/flower-menu

type MenuItem = {
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	href: string;
};

type FlowerMenuProps = {
	menuItems: MenuItem[];
	iconColor?: string;
	backgroundColor?: string;
	animationDuration?: number;
	togglerSize?: number;
};

const MenuToggler = ({
	isOpen,
	onChange,
	backgroundColor,
	iconColor,
	animationDuration,
	togglerSize,
	iconSize,
}: {
	isOpen: boolean;
	onChange: () => void;
	backgroundColor: string;
	iconColor: string;
	animationDuration: number;
	togglerSize: number;
	iconSize: number;
}) => {
	const lineHeight = iconSize * 0.1;
	const lineWidth = iconSize * 0.8;
	const lineSpacing = iconSize * 0.25;

	return (
		<>
			<input
				id="menu-toggler"
				type="checkbox"
				checked={isOpen}
				onChange={onChange}
				className="absolute inset-0 z-10 m-auto cursor-pointer opacity-0"
				style={{ width: togglerSize, height: togglerSize }}
			/>
			<label
				htmlFor="menu-toggler"
				className="absolute inset-0 z-20 m-auto flex cursor-pointer items-center justify-center rounded-full transition-[background-color,color,width,height]"
				style={{
					backgroundColor,
					color: iconColor,
					transitionDuration: `${animationDuration}ms`,
					width: togglerSize,
					height: togglerSize,
				}}
			>
				<span
					className="relative flex flex-col items-center justify-center"
					style={{ width: iconSize, height: iconSize }}
				>
					{[0, 1, 2].map((i) => (
						<span
							key={i + "flower-span"}
							className={`absolute bg-current transition-[opacity,tranform] ${
								isOpen && i === 0
									? "opacity-0"
									: isOpen
										? `${i === 1 ? "rotate-45" : "-rotate-45"}`
										: ""
							}`}
							style={{
								transitionDuration: `${animationDuration}ms`,
								width: lineWidth,
								height: lineHeight,
								top: isOpen
									? `calc(50% - ${lineHeight / 2}px)`
									: `calc(50% + ${(i - 1) * lineSpacing}px - ${
											lineHeight / 2
										}px)`,
							}}
						/>
					))}
				</span>
			</label>
		</>
	);
};

const MenuItem = ({
	item,
	index,
	isOpen,
	iconColor,
	backgroundColor,
	animationDuration,
	itemCount,
	itemSize,
	iconSize,
}: {
	item: MenuItem;
	index: number;
	isOpen: boolean;
	iconColor: string;
	backgroundColor: string;
	animationDuration: number;
	itemCount: number;
	itemSize: number;
	iconSize: number;
}) => {
	const Icon = item.icon;
	return (
		<li
			className={`absolute inset-0 m-auto transition-[opacity,width,height,transform] ${
				isOpen ? "opacity-100" : "opacity-0"
			}`}
			style={{
				width: itemSize,
				height: itemSize,
				transform: isOpen
					? `rotate(${(360 / itemCount) * index}deg) translateX(-${
							itemSize + 30
						}px)`
					: "none",
				transitionDuration: `${animationDuration}ms`,
			}}
		>
			<Link
				href={item.href}
				target="_blank"
				rel="noopener noreferrer"
				className={`flex h-full w-full items-center justify-center rounded-full opacity-60 transition-[transform,opacity,color,background-color] duration-100 ${
					isOpen ? "pointer-events-auto" : "pointer-events-none"
				} group hover:scale-125 hover:opacity-100`}
				style={{
					backgroundColor,
					color: iconColor,
					transform: `rotate(-${(360 / itemCount) * index}deg)`,
					transitionDuration: `${animationDuration}ms`,
				}}
			>
				<Icon
					className="transition-transform duration-200 group-hover:scale-125"
					style={{ width: iconSize, height: iconSize }}
				/>
			</Link>
		</li>
	);
};

export default function FlowerMenu({
	menuItems,
	iconColor = "white",
	backgroundColor = "rgba(255, 255, 255, 0.2)",
	animationDuration = 500,
	togglerSize = 40,
}: FlowerMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const itemCount = menuItems.length;
	const itemSize = togglerSize * 2;
	const iconSize = Math.max(24, Math.floor(togglerSize * 0.6));

	return (
		<nav
			className="relative min-h-64"
			style={{ width: togglerSize * 3, height: togglerSize * 3 }}
		>
			<MenuToggler
				isOpen={isOpen}
				onChange={() => setIsOpen(!isOpen)}
				backgroundColor={backgroundColor}
				iconColor={iconColor}
				animationDuration={animationDuration}
				togglerSize={togglerSize}
				iconSize={iconSize}
			/>
			<ul className="absolute inset-0 m-0 h-full w-full list-none p-0">
				{menuItems.map((item, index) => (
					<MenuItem
						key={index + "flower-item"}
						item={item}
						index={index}
						isOpen={isOpen}
						iconColor={iconColor}
						backgroundColor={backgroundColor}
						animationDuration={animationDuration}
						itemCount={itemCount}
						itemSize={itemSize}
						iconSize={iconSize}
					/>
				))}
			</ul>
		</nav>
	);
}
```

## Attribution

Source: animata.design · Original: https://animata.design/docs/list/flower-menu

Adapted from the original. Credit the original author when you ship this.
