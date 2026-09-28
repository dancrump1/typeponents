"use client";

import UnderlineToBackground from "./component";
import { motion } from "motion/react";

export default function UnderlineToBackgroundDemo() {
	const fadeInVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { duration: 0.5, staggerChildren: 0.1 },
		},
	};

	const wordVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	};

	const words = "Weekly goodies delivered straight to your inbox —".split(" ");

	return (
		<div className="w-dvw h-dvh flex flex-col items-center justify-center bg-background">
			<motion.h2
				className="text-secondary text-xl p-12 md:p-24"
				initial="hidden"
				animate="visible"
				variants={fadeInVariants}
			>
				{words.map((word, index) => (
					<motion.span
						key={index + "underline-to-background"}
						variants={wordVariants}
						className="inline-block mr-1"
					>
						{word}
					</motion.span>
				))}
				<motion.span variants={wordVariants} className="inline-block">
					<UnderlineToBackground
						label="subscribe"
						targetTextColor="#f0f0f0"
						className="cursor-pointer"
					/>
				</motion.span>
			</motion.h2>
		</div>
	);
}
