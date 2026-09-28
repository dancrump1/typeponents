import React from "react";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const FuzzyOverlay = ({ className }: { className?: string }) => {
	return (
		<motion.div
			initial={{ transform: "translateX(-10%) translateY(-10%)" }}
			animate={{
				transform: "translateX(10%) translateY(10%)",
			}}
			transition={{
				repeat: Infinity,
				duration: 0.2,
				ease: "linear",
				repeatType: "mirror",
			}}
			// You can download these PNGs here:
			// https://www.hover.dev/black-noise.png
			// https://www.hover.dev/noise.png
			style={{
				backgroundImage: 'url("/dist/local/black-noise.png")',
				// backgroundImage: 'url("local/noise.png")',
			}}
			className={cn(
				"pointer-events-none absolute -inset-full opacity-0",
				className
			)}
		/>
	);
};

export default FuzzyOverlay;
