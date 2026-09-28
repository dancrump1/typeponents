"use client";

import React, { useState } from "react";

import Image from "next/image";

import { fake_workspotlight } from "./home";
import {
	AnimatePresence,
	motion,
	MotionProps,
	Transition,
	Variant,
} from "framer-motion";
import parse from "html-react-parser";

import { cn } from "@/lib/utils";

export function TabsTransitionPanel({
	data = { workSpotlight: fake_workspotlight },
}) {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<section className="pb-24 bg-background mt-[50vh]">
			<span className="my-12 block text-center">
				<h2>Like your brand's personal chauffeur</h2>
				<h3>Leave the driving to us</h3>
			</span>
			<div className="mb-4 flex space-x-2 overflow-x-auto">
				{data.workSpotlight.map(({ title, firstName }, index) => (
					<button
						key={index}
						onMouseEnter={() => setActiveIndex(index)}
						className={`rounded-md px-3 py-1 text-sm font-medium ${activeIndex === index
								? "bg-background text-foreground dark:bg-background dark:text-foreground"
								: "bg-background text-foreground dark:bg-background dark:text-foreground"
							}`}
					>
						{firstName}
					</button>
				))}
			</div>
			<div className="overflow-hidden border-t border-zinc-200 dark:border-zinc-700">
				<TransitionPanel
					activeIndex={activeIndex}
					data={data.workSpotlight}
				/>
			</div>
		</section>
	);
}

type TransitionPanelProps = {
	children: React.ReactNode[];
	className?: string;
	transition?: Transition;
	activeIndex: number;
	variants?: { enter: Variant; center: Variant; exit: Variant };
} & MotionProps;

export function TransitionPanel({
	children,
	className,
	transition,
	variants,
	activeIndex,
	data,
	...motionProps
}: TransitionPanelProps) {
	return (
		<div className={cn("relative", className)}>
			<AnimatePresence
				initial={false}
				mode="popLayout"
				custom={motionProps.custom}
			>
				{data.map(
					({ title, firstName, description, image }, index) =>
						index == activeIndex && (
							<motion.div
								key={title}
								className="cont-page"
								initial="enter"
								animate="center"
								exit="exit"
								transition={{ duration: 0.2, ease: "easeInOut" }}
								variants={{
									enter: {
										opacity: 0,
										y: -50,
										filter: "blur(4px)",
									},
									center: { opacity: 1, y: 0, filter: "blur(0px)" },
									exit: { opacity: 0, y: 50, filter: "blur(4px)" },
								}}
							>
								<h3 className="mb-2 font-medium text-foreground">
									{title}
								</h3>
								<span className="text-foreground">
									{parse(description || "")}
								</span>
								<Image
									src={image[0]?.url}
									height={200}
									width={400}
									alt={image[0]?.title || "Work by Drive Brand Studio"}
								/>
							</motion.div>
						)
				)}{" "}
			</AnimatePresence>
		</div>
	);
}
