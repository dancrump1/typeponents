"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import LottieScrollTrigger from "./lottie-scroll-trigger";

gsap.registerPlugin(ScrollTrigger);

export default function Usage() {
	const containerRef = useRef<HTMLDivElement>(null);
	const lottieContainerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (lottieContainerRef.current) {
				// Initialize LottieScrollTrigger
				// Replace the path with your own Lottie JSON file URL or local path
				LottieScrollTrigger({
					target: lottieContainerRef.current,
					path: "https://assets5.lottiefiles.com/packages/lf20_jcikwtux.json", // Example: animated loading icon
					speed: "medium", // Options: "slow", "medium", "fast"
					renderer: "svg",
				});
			}
		},
		{ scope: containerRef }
	);

	return (
		<div ref={containerRef} className="relative w-full">
			{/* Spacer to allow scrolling */}
			<div className="h-screen flex items-center justify-center bg-linear-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
				<div className="text-center space-y-4">
					<h2 className="text-3xl font-bold">Scroll down to see the animation</h2>
					<p className="text-neutral-600 dark:text-neutral-400">
						The Lottie animation will play as you scroll
					</p>
				</div>
			</div>

			{/* Lottie container */}
			<div className="relative w-full h-[80vh] flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
				<div
					ref={lottieContainerRef}
					id="lottie-container"
					className="w-full max-w-2xl h-full"
				/>
			</div>

			{/* Bottom spacer */}
			<div className="h-screen flex items-center justify-center bg-linear-to-b from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900">
				<div className="text-center space-y-4">
					<h2 className="text-3xl font-bold">Keep scrolling</h2>
					<p className="text-neutral-600 dark:text-neutral-400">
						The animation is controlled by scroll position
					</p>
				</div>
			</div>
		</div>
	);
}
