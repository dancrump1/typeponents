"use client";

import React from "react";

import { AuroraBackground } from "./component";
import { motion } from "motion/react";

export default function Usage() {
	return (
		<AuroraBackground>
			<motion.div
				initial={{ opacity: 0.0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.3,
					duration: 0.8,
					ease: "easeInOut",
				}}
				className="relative flex flex-col gap-4 items-center justify-center px-4"
			>
				<div className="text-3xl md:text-7xl font-bold dark:text-secondary text-center">
					Background lights are cool you know.
				</div>
				<div className="font-extralight text-base md:text-4xl dark:text-secondary py-4">
					And this, is chemical burn.
				</div>
				<button className="bg-background dark:bg-background rounded-full w-fit text-secondary dark:text-secondary px-4 py-2">
					Debug now
				</button>
			</motion.div>
		</AuroraBackground>
	);
}
