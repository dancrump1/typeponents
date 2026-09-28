"use client";

import React from "react";

import { LinkPreview } from "./component";

export default function LinkPreviewDemo() {
	return (
		<div className="flex justify-center items-center h-160 flex-col px-4">
			<span className="text-secondary dark:text-secondary text-xl md:text-3xl max-w-3xl mx-auto mb-10">
				<LinkPreview
					url="https://tailwindcss.com"
					imageSrc="/itjustworks.jpg"
					className="font-bold"
				>
					Tailwind CSS
				</LinkPreview>{" "}
				and{" "}
				<LinkPreview
					url="https://framer.com/motion"
					imageSrc="/itjustworks.jpg"
					className="font-bold"
				>
					Framer Motion
				</LinkPreview>{" "}
				are a great way to build modern websites.
			</span>
			<span className="text-secondary dark:text-secondary text-xl md:text-3xl max-w-3xl mx-auto">
				Visit{" "}
				<LinkPreview
					url="https://ui.aceternity.com"
					imageSrc="/itjustworks.jpg"
					className="font-bold bg-clip-text text-transparent bg-linear-to-br from-purple-500 to-pink-500"
				>
					Aceternity UI
				</LinkPreview>{" "}
				for amazing Tailwind and Framer Motion components.
			</span>
		</div>
	);
}
