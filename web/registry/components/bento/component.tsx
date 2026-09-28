import React, { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import "lazysizes";

import Link from "next/link";

import FuzzyOverlay from "@/registry/components/fuzzy-overlay/component";

// https://ui.aceternity.com/components/bento-grid

export const BentoGrid = ({
	className,
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				"grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
				className
			)}
		>
			{children}
		</div>
	);
};

export const BentoGridItem = ({
	className,
	title,
	description,
	header,
	srcset,
	icon,
	href,
}: {
	className?: string;
	title?: string | React.ReactNode;
	description?: string | React.ReactNode;
	header?: React.ReactNode;
	srcset?: string;
	icon?: React.ReactNode;
}) => {
	return (
		<Link
			className={cn(
				"row-span-1 rounded-xl max-h-[85vh] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-background dark:border-white/20 bg-background border border-transparent justify-between flex flex-col space-y-4",
				className
			)}
			href={href || ""}
		>
			<img
				src={"/itjustworks.jpg"}
				srcSet={srcset}
				className="lazyload h-full w-full object-cover"
				alt="image with artdirection"
			/>

			<div className="group-hover/bento:translate-x-2 transition duration-200">
				{icon}
				<div className="font-sans font-bold text-foreground dark:text-foreground mb-2 mt-2">
					{title}
				</div>
				<div className="font-sans font-normal text-foreground text-xs dark:text-foreground">
					{description}
				</div>
			</div>
		</Link>
	);
};

const BentoGridFullBackground = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn("grid w-full grid-cols-3 gap-4", className)}>
			{children}
		</div>
	);
};

const BentoCard = ({
	name,
	className,
	background,
	Icon,
	description,
	href,
	cta,
	overlay = false,
	uuid,
	hoverDarken = true,
}: {
	name?: string;
	className: string;
	background: ReactNode;
	Icon: any;
	description: string;
	href: string;
	cta: string;
	overlay?: boolean;
	uuid?: string;
	hoverDarken?: boolean;
}) => (
	<div
		key={name || uuid}
		className={cn(
			"group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
			// light styles
			"bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
			// dark styles
			"transform-gpu dark:bg-slate-950 dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
			className
		)}
	>
		<div className="h-full">{background}</div>
		{overlay && (
			<FuzzyOverlay className="hidden group-hover:block group-hover:opacity-30" />
		)}

		{(name || description) && (
			<div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-transform duration-300 group-hover:-translate-y-10">
				{name && (
					<h3 className="text-xl font-semibold text-foreground dark:text-foreground drop-shadow-[0_1px_2px_rgb(0,0,0,0.8)]">
						{name}
					</h3>
				)}
				{description && (
					<p className="max-w-lg text-foreground drop-shadow-[0_1px_2px_rgb(0,0,0,0.5)]">
						{description}
					</p>
				)}
			</div>
		)}

		{href && (
			<div
				className={cn(
					"pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-y-0 group-hover:opacity-100"
				)}
			>
				<Button
					variant="ghost"
					asChild
					size="sm"
					className="pointer-events-auto group/svg"
				>
					<a href={href}>
						{cta}
						<svg
							width="36"
							height="12"
							viewBox="0 0 36 12"
							fill="none"
							className=" ml-3"
						>
							<path
								d="M0.75 6H11.25 M6 0.75L11.25 6L6 11.25"
								stroke="teal"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="opacity-0 group-hover/svg:opacity-100"
								style={{ transition: "opacity 1000ms ease 50ms" }}
							></path>
							<path
								d="M15 10L19.5 5.5L15 1"
								stroke="teal"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="opacity-0 group-hover/svg:opacity-100"
								style={{ transition: "opacity 1000ms ease 125ms" }}
							></path>
							<path
								d="M23 10L27.5 5.5L23 1"
								stroke="teal"
								strokeOpacity="0.66"
								strokeLinecap="round"
								strokeLinejoin="round"
								className=" opacity-0 group-hover/svg:opacity-100"
								style={{ transition: "opacity 1000ms ease 250ms" }}
							></path>
							<path
								d="M31 10L35.5 5.5L31 1"
								stroke="teal"
								strokeOpacity="0.35"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="opacity-0 group-hover/svg:opacity-100"
								style={{ transition: "opacity 1000ms ease 375ms" }}
							></path>
						</svg>
					</a>
				</Button>
			</div>
		)}
		{hoverDarken && (
			<div className="pointer-events-none absolute inset-0 transform-gpu transition-[background-color] duration-300 group-hover:bg-background/3 dark:group-hover:bg-background/10" />
		)}
	</div>
);

export { BentoCard, BentoGridFullBackground };
