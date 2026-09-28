"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import {
	AnimationStart,
	AnimationVariant,
	createAnimation,
} from "@/registry/components/theme-animations/component";

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
