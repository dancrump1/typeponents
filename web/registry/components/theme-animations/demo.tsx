"use client";

import { ThemeToggleButton } from "@/registry/components/theme-changer/component";

export default function Usage() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3 p-8">
			<ThemeToggleButton showLabel variant="circle" start="center" />
			<ThemeToggleButton showLabel variant="circle-blur" start="top-left" />
			<ThemeToggleButton showLabel variant="polygon" start="bottom-right" />
		</div>
	);
}
