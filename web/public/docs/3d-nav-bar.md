# 3D Nav Bar

Desktop nav bar whose top-level items open a floating panel of links beside a large preview image.

**Interaction.** Hovering a nav item opens its panel, which travels across to the next item rather than reappearing; hovering a link inside swaps the preview image shown next to it.

- Categories: Navigation
- Tags: spring, hover
- Import: `@/components/ui/3d-nav-bar`
- Inspiration: Aceternity UI (adaptation) — https://ui.aceternity.com/components/navbar-menu

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/3d-nav-bar.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Registry dependencies

- `3d-card`
- `https://components.drivedev.net/r/3d-card.json`
- `https://components.drivedev.net/r/mobile-nav-basic.json`
- `mobile-nav-basic`
- `mode-toggle`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `routes` *(required)* | `any[]` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import NavBar from "./component";

export default function Usage() {
	return (
		<div className="relative w-full flex items-center justify-center">
			<NavBar className="top-2" />
			<p className="text-secondary dark:text-secondary">
				The Navbar will show on top of the page
			</p>
		</div>
	);
}
```

## Source

### `components/ui/3d-nav-bar.tsx`

```tsx
"use client";

import React, { useState } from "react";

import Link from "next/link";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { motion } from "motion/react";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import MobileNav from "@/components/ui/mobile-nav-basic";

// import { debounce } from "@/registry/utilities/debounce";

// https://ui.aceternity.com/components/navbar-menu

const transition = {
	type: "spring",
	mass: 0.5,
	damping: 11.5,
	stiffness: 100,
	restDelta: 0.001,
	restSpeed: 0.001,
};

export const MenuItem = ({
	setActive,
	active,
	item,
	children,
	to,
	uuid,
}: {
	setActive: (item: string) => void;
	active: string | null;
	item: string;
	children?: React.ReactNode;
	to?: string;
	uuid?: string;
}) => {
	return (
		<div
			onMouseEnter={() => setActive(item)}
			className="relative z-50 px-2 py-6"
			key={uuid || null}
		>
			<motion.p
				transition={{ duration: 0.3 }}
				className="cursor-default text-foreground hover:opacity-[0.9] dark:text-foreground"
			>
				{item}
			</motion.p>
			{active !== null && (
				<motion.div
					initial={{ opacity: 0, scale: 0.85, y: 10, borderRadius: "6px" }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					transition={transition}
					className=""
				>
					{active === item && (
						<div className="absolute left-1/2 transform -translate-x-1/2 pt-4">
							<motion.div
								transition={transition}
								layoutId="active" // layoutId ensures smooth animation
								className="bg-background dark:bg-background backdrop-blur-xs rounded-md overflow-hidden border border-black/20 dark:border-white/20 shadow-xl"
							>
								<motion.div
									layout // layout ensures smooth animation
									className="w-max h-full p-4"
								>
									{children}
								</motion.div>
							</motion.div>
						</div>
					)}
				</motion.div>
			)}
		</div>
	);
};

export const Menu = ({
	setActive,
	children,
}: {
	setActive: (item: string | null) => void;
	children: React.ReactNode;
}) => {
	return (
		<div className="relative w-full border border-transparent dark:bg-background dark:border-white/20 bg-background shadow-input flex justify-center">
			<div
				onMouseLeave={() => setActive(null)} // resets the state
				className="flex justify-center items-center px-1 lg:w-full my-4"
			>
				{children}
			</div>
		</div>
	);
};

export const ThreeDProductItem = ({
	title,
	description,
	href,
	src,
	...rest
}: {
	title: string;
	description: string;
	href: string;
	src: string;
}) => {
	return (
		<CardContainer containerClassName="flex space-x-2 p-4" {...rest}>
			<CardBody className="h-24 w-24">
				<CardItem translateZ={400}>
					<img
						src={src}
						width={70}
						height={35}
						alt={title}
						className="shrink-0 rounded-md shadow-2xl object-cover"
					/>
				</CardItem>
				<CardItem>
					<h4 className="text-xl font-bold mb-1 text-foreground dark:text-foreground">
						{title}
					</h4>
					<p className="text-foreground text-sm max-w-40 dark:text-foreground">
						{description}
					</p>
				</CardItem>
			</CardBody>
		</CardContainer>
	);
};

export const ProductItem = ({
	title,
	description,
	href,
	src,
	...rest
}: {
	title: string;
	description: string;
	href: string;
	src: string;
}) => {
	return (
		<div className="flex space-x-2" {...rest}>
			<img
				src={src}
				width={70}
				height={35}
				alt={title}
				className="shrink-0 rounded-md shadow-2xl object-cover"
			/>
			<div>
				<h4 className="text-xl font-bold mb-1 text-foreground dark:text-foreground">
					{title}
				</h4>
				<p className="text-foreground text-sm max-w-40 dark:text-foreground">
					{description}
				</p>
			</div>
		</div>
	);
};

export const HoveredLink = ({ children, ...rest }: any) => {
	return (
		<Link
			{...rest}
			prefetch={false}
			className="text-foreground dark:text-foreground hover:text-foreground "
		>
			{children}
		</Link>
	);
};

const NavBar = ({ routes }: { routes: any[] }) => {
	const [selected, setSelected] = useState(null);
	const [hovered, setHovered] = useState(null);

	const checkDescendants = (route: any) => {
		return route.descendants.map((routeDescendant: any) => {
			if (
				!!routeDescendant.descendants &&
				!!routeDescendant.descendants.length
			) {
				return (
					<div key={routeDescendant.slug}>
						<p>
							{routeDescendant.title}
							<span className={""}>&gt;</span>
						</p>
						{routeDescendant.descendants.map(checkDescendants)}
					</div>
				);
			}

			// Only render routes directly below the header route
			return route.level + 1 === routeDescendant.level ? (
				<HoveredLink
					href={`/${routeDescendant.uri}`}
					key={routeDescendant.slug}
					onMouseEnter={() => setHovered(routeDescendant)}
				>
					{routeDescendant.title}
				</HoveredLink>
			) : null;
		});
	};

	return (
		<div className="dark:text-foreground relative z-50">
			<MobileNav />
			<header className="hidden md:block">
				<Menu setActive={setSelected}>
					{routes
						?.filter(
							(route) => route.level === 1 || route.typeHandle === "home"
						)
						?.map((route) => {
							return !!route.children.length ||
								route.typeHandle === "newsListing" ? (
								<MenuItem
									to={route.slug}
									item={route.title}
									setActive={setSelected}
									active={selected}
									uuid={route.slug}
								>
									<div className="flex">
										{hovered?.headerImage?.[0] ? (
											<img src={hovered?.headerImage[0].url} />
										) : (
											<div
												role="status"
												className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
											>
												<div className="flex items-center justify-center w-full h-48 bg-background rounded sm:w-96 dark:bg-background">
													<svg
														className="w-10 h-10 text-foreground dark:text-foreground"
														aria-hidden="true"
														xmlns="http://www.w3.org/2000/svg"
														fill="currentColor"
														viewBox="0 0 20 18"
													>
														<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
													</svg>
												</div>
											</div>
										)}
										<div className="text-sm grid grid-cols-3 md:grid-cols-4 gap-5 p-4">
											{route.typeHandle === "newsListing"
												? routes
														.filter(
															(route) =>
																route.typeHandle === "news"
														)
														.map((item) => (
															<HoveredLink
																href={`/${item.uri}`}
																key={item.slug}
																onMouseEnter={() =>
																	setHovered(item)
																}
															>
																{item.title}
															</HoveredLink>
														))
												: route.children.map((item) => (
														<HoveredLink
															href={`/${item.uri}`}
															key={item.slug}
															onMouseEnter={() =>
																setHovered(item)
															}
														>
															{item.title}
														</HoveredLink>
													))}{" "}
										</div>
									</div>
								</MenuItem>
							) : (
								<Link
									prefetch={false}
									href={
										route.typeHandle === "home"
											? "/"
											: `/${route.uri}`
									}
									key={route.slug}
									onMouseEnter={() => {
										setHovered(null);
										setSelected(null);
									}}
									className="mx-2"
								>
									{route.title}
								</Link>
							);
						})}
					<Link
						prefetch={false}
						href={"https://www.admin.example.drivedev.net/access"}
						key={"admin"}
						onMouseEnter={() => {
							setHovered(null);
							setSelected(null);
						}}
						className="mx-2"
					>
						Admin
					</Link>
					{/* <Notice /> */}
					<div
						onMouseEnter={() => {
							setHovered(null);
							setSelected(null);
						}}
					>
						<ModeToggle />
					</div>
				</Menu>
			</header>
		</div>
	);
};

export default NavBar;
```

## Attribution

Source: Aceternity UI · Original: https://ui.aceternity.com/components/navbar-menu

Adapted from the original. Credit the original author when you ship this.
