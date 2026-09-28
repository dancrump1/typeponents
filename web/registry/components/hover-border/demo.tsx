"use client";

import React from "react";

import { HoverBorderGradient } from "./component";

export default function HoverBorderGradientDemo() {
	return (
		<div className="m-40 flex justify-center text-center">
			<HoverBorderGradient
				containerClassName="rounded-full"
				as="button"
				className="dark:bg-background bg-background text-secondary dark:text-secondary flex items-center space-x-2"
			>
				<span>Aceternity UI</span>
			</HoverBorderGradient>
		</div>
	);
}
