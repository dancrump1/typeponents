# Resize Navbar

- Categories: Navigation
- Tags: scroll-driven, hover, theme-aware
- Import: `@/components/ui/resize-navbar`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/resize-navbar.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`
- `next-themes`
- `react-icons`

## Registry dependencies

- `button`
- `following-eyes`
- `https://components.drivedev.net/r/following-eyes.json`
- `https://components.drivedev.net/r/theme-animations.json`
- `theme-animations`

## Usage

```tsx
"use client";

import ResizeNavBar from "./component";

const navItems = [
	{ link: "#home", title: "Home" },
	{ link: "#about", title: "About" },
	{ link: "#contact", title: "Contact" },
];

export default function Usage() {
	return (
		<div className="min-h-[300px] w-full">
			<ResizeNavBar navItems={navItems} />
		</div>
	);
}
```

## Source

### `components/ui/resize-navbar.tsx`

```tsx
"use client";

import React, { ReactNode, useCallback, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useHover } from "@/lib/hover-context";
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useTheme } from "next-themes";
import { IoIosClose, IoIosMenu } from "react-icons/io";

import { MouseFollowingEyes } from "@/components/ui/following-eyes";
import { createAnimation } from "@/components/ui/theme-animations";

type Props = {
	navItems: {
		link: string;
		title: string;
		target?: "_blank";
	}[];
};

const DesktopNavbar = ({ navItems }: Props) => {
	const { scrollY } = useScroll();

	const [showFloatingNav, setShowFloatingNav] = useState(false);

	useMotionValueEvent(scrollY, "change", (value) => {
		if (value > 100) {
			setShowFloatingNav(true);
		} else {
			setShowFloatingNav(false);
		}
	});

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
		const animation = createAnimation(
			"gif",
			"top-left",
			"https://media.giphy.com/media/KBbr4hHl9DSahKvInO/giphy.gif?cid=790b76112m5eeeydoe7et0cr3j3ekb1erunxozyshuhxx2vl&ep=v1_stickers_search&rid=giphy.gif&ct=s"
		);

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

	const { setHovered, setHovering } = useHover();

	return (
		<div className="w-screen">
			<motion.div
				className={cn(
					"flex relative justify-between px-4 py-3 rounded-md  transition duration-200 bg-transparent mx-auto",
					!showFloatingNav ? "w-screen h-screen" : "w-fit h-fit"
				)}
				animate={{
					width: showFloatingNav ? "80%" : "100vw",
					height: showFloatingNav ? "0%" : "100vh",
					background: showFloatingNav
						? "var(--neutral-900)"
						: "transparent",
				}}
				transition={{
					duration: 0.4,
				}}
				layout
			>
				{navItems.map((item, i) => (
					<motion.div
						className={cn(
							"",
							!showFloatingNav &&
								i === 0 &&
								"top-6 inset-x-0 place-items-center",
							!showFloatingNav &&
								i === 1 &&
								"right-6 inset-y-0 content-center",
							!showFloatingNav &&
								i === 2 &&
								"bottom-6 inset-x-0 place-items-center",
							!showFloatingNav &&
								i === 3 &&
								"left-6 inset-y-0 content-center"
						)}
						animate={{
							position: showFloatingNav ? "relative" : "absolute",
						}}
						transition={{ duration: 0.5 }}
						onMouseEnter={() => {
							setHovered(item.title);
							setHovering(true);
						}}
						onMouseLeave={() => setHovering(false)}
					>
						<NavBarItem
							href={item.link}
							key={item.title}
							target={item.target}
							toggleTheme={toggleTheme}
						>
							{item.title}
						</NavBarItem>
					</motion.div>
				))}
			</motion.div>
			<div className="absolute top-1 left-4 w-fit h-fit block z-500 pointer-events-auto">
				<MouseFollowingEyes />
			</div>
		</div>
	);
};

const navItems = [
	{
		title: "About Us",
		link: "/drive25/about",
	},
	{
		title: "WATCH REEL",
		link: "/drive25/work",
	},

	{
		title: "CONTACT",
		link: "/drive25/about",
	},
	{
		title: "OUR TEAM",
		link: "/drive25/about",
	},
];

function ResizeNavBar() {
	return (
		<motion.nav
			initial={{
				y: -80,
			}}
			animate={{
				y: 0,
			}}
			transition={{
				ease: [0.6, 0.05, 0.1, 0.9],
				duration: 0.8,
			}}
			className="fixed lg:inset-0 z-500 pointer-events-none"
		>
			<div className="hidden lg:block">
				<DesktopNavbar navItems={navItems} />
			</div>
			<div className="flex w-full lg:hidden ">
				<MobileNavbar navItems={navItems} />
			</div>
		</motion.nav>
	);
}

const MobileNavbar = ({ navItems }: any) => {
	const [open, setOpen] = useState(false);

	const { scrollY } = useScroll();

	const [showBackground, setShowBackground] = useState(false);

	useMotionValueEvent(scrollY, "change", (value) => {
		if (value > 100) {
			setShowBackground(true);
		} else {
			setShowBackground(false);
		}
	});

	return (
		<div
			className={cn(
				"flex justify-between bg-transparent items-center w-full rounded-md px-2.5 py-1.5 transition duration-200",
				showBackground &&
					" bg-background  shadow-[0px_-2px_0px_0px_var(--neutral-800),0px_2px_0px_0px_var(--neutral-800)]"
			)}
		>
			{/* <Logo /> */}
			<IoIosMenu
				className="text-foreground h-6 w-6"
				onClick={() => setOpen(!open)}
			/>
			{open && (
				<div className="fixed inset-0 bg-background z-50 flex flex-col items-start justify-start space-y-10  pt-5  text-xl text-foreground  transition duration-200 hover:text-foreground">
					<div className="flex items-center justify-between w-full px-5">
						{/* <Logo /> */}
						<div className="flex items-center space-x-2">
							<IoIosClose
								className="h-8 w-8 text-foreground"
								onClick={() => setOpen(!open)}
							/>
						</div>
					</div>
					<div className="flex flex-col items-start justify-start gap-[14px] px-8">
						{navItems.map((navItem: any, idx: number) => (
							<>
								{navItem.children && navItem.children.length > 0 ? (
									<>
										{navItem.children.map(
											(childNavItem: any, idx: number) => (
												<Link
													key={`link=${idx}`}
													href={childNavItem.link}
													onClick={() => setOpen(false)}
													className="relative max-w-60 text-left text-2xl"
												>
													<span className="block text-foreground">
														{childNavItem.title}
													</span>
												</Link>
											)
										)}
									</>
								) : (
									<Link
										key={`link=${idx}`}
										href={navItem.link}
										onClick={() => setOpen(false)}
										className="relative"
									>
										<span className="block text-[26px] text-foreground">
											{navItem.title}
										</span>
									</Link>
								)}
							</>
						))}
					</div>
					<div className="flex flex-row w-full items-start gap-2.5  px-8 py-4 ">
						<Button>Book a demo</Button>
						<Button
							variant="simple"
							as={Link}
							href="/register"
							onClick={() => {
								setOpen(false);
							}}
						>
							Register
						</Button>
						{/* <ModeToggle /> */}
					</div>
				</div>
			)}
		</div>
	);
};

type NavBarItemProps = {
	href: string;
	children: ReactNode;
	active?: boolean;
	className?: string;
	target?: "_blank";
};

export function NavBarItem({
	children,
	href,
	active,
	target,
	className,
	toggleTheme,
}: NavBarItemProps) {
	const pathname = usePathname();

	return (
		<Link
			href={href}
			onClick={toggleTheme}
			className={cn(
				"border-y-2 border-y-red-500 w-fit",
				"flex items-center pointer-events-auto h-fit w-fit justify-center  text-sm leading-[110%] px-4 py-2 text-foreground  hover:bg-background hover:text-foreground/80 dark:text-foreground hover:shadow-[0px_1px_0px_0px_#FFFFFF20_inset] transition duration-200",
				(active || pathname?.includes(href)) &&
					"bg-transparent dark:text-foreground",
				className
			)}
			target={target}
		>
			{children}
		</Link>
	);
}

export default ResizeNavBar;
```

### `lib/hover-context.tsx`

```tsx
"use client";

import { createContext, useContext, useState } from "react";

type HoverContextType = {
	hovered: string | null;
	setHovered: (id: string | null) => void;
	hovering: boolean;
	setHovering: (value: boolean) => void;
};

const HoverContext = createContext<HoverContextType | undefined>(undefined);

export function HoverProvider({ children }: { children: React.ReactNode }) {
	const [hovered, setHovered] = useState<string | null>("about");
	const [hovering, setHovering] = useState<boolean>(false);

	return (
		<HoverContext.Provider
			value={{ hovered, setHovered, hovering, setHovering }}
		>
			{children}
		</HoverContext.Provider>
	);
}

export function useHover() {
	const ctx = useContext(HoverContext);
	if (!ctx) throw new Error("useHover must be used within HoverProvider");
	return ctx;
}
```
