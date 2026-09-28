"use client";

import {
	HeroHighlight,
	Highlight,
} from "./component";
import { motion } from "motion/react";

export default function HeroHighlightDemo() {
	return (
		<HeroHighlight>
			<motion.h1
				initial={{
					opacity: 0,
					y: 20,
				}}
				animate={{
					opacity: 1,
					y: [20, -5, 0],
				}}
				transition={{
					duration: 0.5,
					ease: [0.4, 0.0, 0.2, 1],
				}}
				className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-secondary dark:text-secondary max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
			>
				With insomnia, nothing&apos;s real. Everything is far away.
				Everything is a{" "}
				<Highlight className="text-secondary dark:text-secondary">
					copy, of a copy, of a copy.
				</Highlight>
			</motion.h1>
		</HeroHighlight>
	);
}
