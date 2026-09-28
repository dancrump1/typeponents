"use client";

import React, { useCallback, useState } from "react";

import { CardContent } from "@/registry/components/cards/component";
import ColorPicker from "@/registry/components/color-picker/component";
import { Sidebar, SidebarBody } from "@/registry/components/sidebar/component";
import { cn } from "@/lib/utils";
import { Poline, positionFunctions } from "poline";

import { Button } from "./ui/button";

const defaultColorScheme = {
	background: "0 0% 100%",
	foreground: "240 10% 3.9%",
	card: "0 0% 100%",
	"card-foreground": "240 10% 3.9%",
	popover: "0 0% 100%",
	"popover-foreground": "240 10% 3.9%",
	primary: "240 5.9% 10%",
	"primary-foreground": "0 0% 98%",
	secondary: "240 4.8% 95.9%",
	"secondary-foreground": "240 5.9% 10%",
	muted: "240 4.8% 95.9%",
	"muted-foreground": "240 3.8% 46.1%",
	accent: "240 4.8% 95.9%",
	"accent-foreground": "240 5.9% 10%",
	destructive: "0 84.2% 60.2%",
	"destructive-foreground": "0 0% 98%",
	border: "240 5.9% 90%",
	input: "240 5.9% 90%",
	ring: "240 10% 3.9%",
	"chart-1": "12 76% 61%",
	"chart-2": "173 58% 39%",
	"chart-3": "197 37% 24%",
	"chart-4": "43 74% 66%",
	"chart-5": "27 87% 67%",
	radius: "0.5rem",
	"sidebar-background": "0 0% 98%",
	"sidebar-foreground": "240 5.3% 26.1%",
	"sidebar-primary": "240 5.9% 10%",
	"sidebar-primary-foreground": "0 0% 98%",
	"sidebar-accent": "240 4.8% 95.9%",
	"sidebar-accent-foreground": "240 5.9% 10%",
	"sidebar-border": "220 13% 91%",
	"sidebar-ring": "217.2 91.2% 59.8%",
};

type ColorScheme = typeof defaultColorScheme;

export default function ColorSelector({
	children,
}: {
	children: React.ReactNode;
}) {
	const [lockedColor, setLockedColor] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);
	const [colorScheme, setColorScheme] = useState<ColorScheme>(defaultColorScheme);

	const generateHarmoniousColors = useCallback(() => {
		let anchorColors: [number, number, number][] = [];

		if (lockedColor) {
			const [h, s, l] = colorScheme[lockedColor as keyof ColorScheme]
				.split(" ")
				.map(parseFloat);
			anchorColors.push([h, s / 100, l / 100]);
		}

		while (anchorColors.length < 3) {
			anchorColors.push([Math.random() * 360, 0.7, 0.5]);
		}

		const poline = new Poline({
			numPoints: 20,
			anchorColors,
			positionFunctionX: positionFunctions.sinusoidalPosition,
			positionFunctionY: positionFunctions.quadraticPosition,
			positionFunctionZ: positionFunctions.linearPosition,
		});

		const newColorScheme = { ...colorScheme };
		const colors = poline.colorsCSS;

		Object.keys(newColorScheme).forEach((key, index) => {
			if (key !== lockedColor) {
				const color = colors[index % colors.length];
				const [h, s, l] = color.match(/\d+(\.\d+)?/g)?.map(Number) || [
					0, 0, 0,
				];

				let adjustedLightness = l;
				if (key.includes("foreground")) {
					adjustedLightness = Math.min(l - 30, 20);
				} else if (key === "background") {
					adjustedLightness = Math.max(l + 30, 90);
				} else if (key === "border" || key === "input") {
					adjustedLightness = Math.min(Math.max(l, 70), 90);
				}

				newColorScheme[key] = `${h.toFixed(1)} ${s.toFixed(
					1
				)}% ${adjustedLightness.toFixed(1)}%`;
			}
		});

		setColorScheme(newColorScheme);
	}, [colorScheme, lockedColor]);

	const resetColors = useCallback(() => {
		setColorScheme(defaultColorScheme);
		setLockedColor(null);
	}, []);

	const copyColorScheme = useCallback(() => {
		const cssVariables = Object.entries(colorScheme)
			.map(([key, value]) => `--${key}: ${value};`)
			.join("\n    ");

		const fullCss = `@layer base {
	  :root {
		${cssVariables}
	  }
	}`;

		navigator.clipboard.writeText(fullCss);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}, [colorScheme]);

	const getContrastColor = useCallback((color: string) => {
		const [, , lightness] = color.split(" ").map(parseFloat);
		return lightness > 50 ? "0 0% 0%" : "0 0% 100%";
	}, []);

	const toggleLock = useCallback((key: string) => {
		setLockedColor((prev) => (prev === key ? null : key));
	}, []);

	const [open, setOpen] = useState(false);

	return (
		<div
			className={cn(
				"mx-auto flex w-screen flex-col",
				"h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
			)}
		>
			<Sidebar open={open} setOpen={setOpen}>
				<SidebarBody>
					<h2>Color Selector</h2>
					<div className="h-fit w-full flex items-center justify-center relative bg-black">
						<div className="w-full max-w-4xl mx-auto ">
							<CardContent className="p-6 space-y-6">
								<div className="grid md:grid-cols-1 gap-6">
									<div className="space-y-4">
										<div className="flex flex-col md:flex-row gap-4 md:justify-between">
											<Button
												variant="outline"
												onClick={generateHarmoniousColors}
												className="text-sm"
											>
												Generate Harmonious Colors
											</Button>
											<Button
												variant="outline"
												onClick={resetColors}
												className="text-sm"
											>
												Reset Colors
											</Button>
										</div>
										<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
											{Object.entries(colorScheme).map(([key, value]) => (
												<div key={key} className="relative">
													<div className="flex items-center justify-between">
														<label className="text-sm font-medium text-muted-foreground mb-2 block">
															{key}
														</label>
														<Button
															variant="ghost"
															size="icon"
															className="ml-2 text-black"
															onClick={() => toggleLock(key)}
														>
															{lockedColor === key
																? "unlocked"
																: "locked"}
														</Button>
													</div>
													<div className="flex items-center">
														<ColorPicker
															color={`hsl(${value})`}
															onChange={(newColor) => {
																const [h, s, l] = newColor
																	.match(/\d+(\.\d+)?/g)
																	?.map(Number) || [0, 0, 0];
																setColorScheme((prev) => ({
																	...prev,
																	[key]: `${h?.toFixed(1)} ${s?.toFixed(
																		1
																	)}% ${l?.toFixed(1)}%`,
																}));
															}}
														/>
													</div>
												</div>
											))}
										</div>
									</div>

									<Button onClick={copyColorScheme} className="w-full">
										Copy Full Color Scheme
									</Button>
								</div>
							</CardContent>
						</div>{" "}
					</div>
				</SidebarBody>
			</Sidebar>

			<div
				style={{
					backgroundColor: `hsl(${colorScheme.background})`,
					color: `hsl(${colorScheme.foreground})`,
					borderColor: `hsl(${colorScheme.border})`,
					borderWidth: 0,
					borderStyle: "solid",
					"--background": colorScheme.background,
					"--foreground": colorScheme.foreground,
					"--card": colorScheme.card,
					"--card-foreground": colorScheme["card-foreground"],
					"--popover": colorScheme.popover,
					"--popover-foreground": colorScheme["popover-foreground"],
					"--primary": colorScheme.primary,
					"--primary-foreground": colorScheme["primary-foreground"],
					"--secondary": colorScheme.secondary,
					"--secondary-foreground": colorScheme["secondary-foreground"],
					"--muted": colorScheme.muted,
					"--muted-foreground": colorScheme["muted-foreground"],
					"--accent": colorScheme.accent,
					"--accent-foreground": colorScheme["accent-foreground"],
					"--destructive": colorScheme.destructive,
					"--destructive-foreground":
						colorScheme["destructive-foreground"],
					"--border": colorScheme.border,
					"--input": colorScheme.input,
					"--ring": colorScheme.ring,
					"--radius": colorScheme.radius,
					"--sidebar-background": colorScheme["sidebar-background"],
					"--sidebar-foreground": colorScheme["sidebar-foreground"],
					"--sidebar-primary": colorScheme["sidebar-primary"],
					"--sidebar-primary-foreground":
						colorScheme["sidebar-primary-foreground"],
					"--sidebar-accent": colorScheme["sidebar-accent"],
					"--sidebar-accent-foreground":
						colorScheme["sidebar-accent-foreground"],
					"--sidebar-border": colorScheme["sidebar-border"],
					"--sidebar-ring": colorScheme["sidebar-ring"],
				}}
			>
				{children}
			</div>
		</div>
	);
}
