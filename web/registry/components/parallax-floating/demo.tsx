"use client";

import React from "react";

import Link from "next/link";

import Floating, {
	FloatingElement,
} from "./component";
import TextRotate from "@/registry/components/text-rotate/component";
import { LayoutGroup, motion } from "motion/react";

const exampleImages = [
	{
		url: "/itjustworks.jpg",
		author: "Branislav Rodman",
		title: "A Black and White Photo of a Woman Brushing Her Teeth",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-painting-of-a-palm-leaf-on-a-multicolored-background-AaNPwrSNOFE",
		title: "Neon Palm",
		author: "Tim Mossholder",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-blurry-photo-of-a-crowd-of-people-UgbxzloNGsc",
		author: "ANDRII SOLOK",
		title: "A blurry photo of a crowd of people",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/rippling-crystal-blue-water-9-OCsKoyQlk",
		author: "Wesley Tingey",
		title: "Rippling Crystal Blue Water",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/de/fotos/mann-im-schwarzen-hemd-unter-blauem-himmel-m8RDNiuEXro",
		author: "Serhii Tyaglovsky",
		title: "Mann im schwarzen Hemd unter blauem Himmel",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-woman-with-a-flower-crown-on-her-head-0S3muIttbsY",
		author: "Vladimir Yelizarov",
		title: "A women with a flower crown on her head",
	},
	{
		url: "/itjustworks.jpg",
		title: "A blurry photo of white flowers in a field",
		author: "Eugene Golovesov",
		link: "https://unsplash.com/photos/a-blurry-photo-of-white-flowers-in-a-field-6qbx0lzGPyc",
	},
	{
		url: "/itjustworks.jpg",
		author: "Mathilde Langevin",
		link: "https://unsplash.com/photos/a-table-topped-with-two-wine-glasses-and-plates-Ig0gRAHspV0",
		title: "A table topped with two wine glasses and plates",
	},
];

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<section className="w-full h-screen overflow-hidden md:overflow-visible flex flex-col items-center justify-center relative">
				<Floating sensitivity={-0.5} className="h-full">
					<FloatingElement
						depth={0.5}
						className="top-[15%] left-[2%] md:top-[25%] md:left-[5%]"
					>
						<motion.img
							src={exampleImages[0].url}
							alt={exampleImages[0].title}
							className="w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-3 shadow-2xl rounded-xl"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
						/>
					</FloatingElement>

					<FloatingElement
						depth={1}
						className="top-[0%] left-[8%] md:top-[6%] md:left-[11%]"
					>
						<motion.img
							src={exampleImages[1].url}
							alt={exampleImages[1].title}
							className="w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-12 shadow-2xl rounded-xl"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.7 }}
						/>
					</FloatingElement>

					<FloatingElement
						depth={4}
						className="top-[90%] left-[6%] md:top-[80%] md:left-[8%]"
					>
						<motion.img
							src={exampleImages[2].url}
							alt={exampleImages[2].title}
							className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 object-cover -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.9 }}
						/>
					</FloatingElement>

					<FloatingElement
						depth={2}
						className="top-[0%] left-[87%] md:top-[2%] md:left-[83%]"
					>
						<motion.img
							src={exampleImages[3].url}
							alt={exampleImages[3].title}
							className="w-40 h-36 sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-56 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-6 rounded-xl"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1.1 }}
						/>
					</FloatingElement>

					<FloatingElement
						depth={1}
						className="top-[78%] left-[83%] md:top-[68%] md:left-[83%]"
					>
						<motion.img
							src={exampleImages[4].url}
							alt={exampleImages[4].title}
							className="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-19 rounded-xl"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1.3 }}
						/>
					</FloatingElement>
				</Floating>

				<div className="flex flex-col justify-center items-center w-[250px] sm:w-[300px] md:w-[500px] lg:w-[700px] z-50 pointer-events-auto">
					<motion.h1
						className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight font-calendas tracking-tight space-y-1 md:space-y-4"
						animate={{ opacity: 1, y: 0 }}
						initial={{ opacity: 0, y: 20 }}
						transition={{
							duration: 0.2,
							ease: "easeOut",
							delay: 0.3,
						}}
					>
						<span>Make your </span>
						<LayoutGroup>
							<motion.span layout className="flex whitespace-pre">
								<motion.span
									layout
									className="flex whitespace-pre"
									transition={{
										type: "spring",
										damping: 30,
										stiffness: 400,
									}}
								>
									website{" "}
								</motion.span>
								<TextRotate
									texts={[
										"fancy",
										"fun",
										"lovely ♥",
										"weird",
										"🪩 funky",
										"💃🕺",
										"sexy",
										"🕶️ cool",
										"go 🚀",
										"🔥🔥🔥",
										"over-animated?",
										"pop ✨",
										"rock 🤘",
									]}
									mainClassName="overflow-hidden pr-3 text-primary py-0 pb-2 md:pb-4 rounded-xl"
									staggerDuration={0.03}
									staggerFrom="last"
									rotationInterval={3000}
									transition={{
										type: "spring",
										damping: 30,
										stiffness: 400,
									}}
								/>
							</motion.span>
						</LayoutGroup>
					</motion.h1>
					<motion.p
						className="text-sm sm:text-lg md:text-xl lg:text-2xl text-center font-overusedGrotesk pt-4 sm:pt-8 md:pt-10 lg:pt-12"
						animate={{ opacity: 1, y: 0 }}
						initial={{ opacity: 0, y: 20 }}
						transition={{
							duration: 0.2,
							ease: "easeOut",
							delay: 0.5,
						}}
					>
						with a growing library of ready-to-use react components &
						microinteractions. free & open source.
					</motion.p>

					<div className="flex flex-row justify-center space-x-4 items-center mt-10 sm:mt-16 md:mt-20 lg:mt-20 text-xs">
						<motion.button
							className="sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight text-secondary bg-foreground px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-2xl font-calendas"
							animate={{ opacity: 1, y: 0 }}
							initial={{ opacity: 0, y: 20 }}
							transition={{
								duration: 0.2,
								ease: "easeOut",
								delay: 0.7,
								scale: { duration: 0.2 },
							}}
							whileHover={{
								scale: 1.05,
								transition: {
									type: "spring",
									damping: 30,
									stiffness: 400,
								},
							}}
						>
							<Link href="/docs/introduction">
								Check docs <span className="font-serif ml-1">→</span>
							</Link>
						</motion.button>
						<motion.button
							className="sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight text-secondary bg-background px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-2xl font-calendas"
							animate={{ opacity: 1, y: 0 }}
							initial={{ opacity: 0, y: 20 }}
							transition={{
								duration: 0.2,
								ease: "easeOut",
								delay: 0.7,
								scale: { duration: 0.2 },
							}}
							whileHover={{
								scale: 1.05,
								transition: {
									type: "spring",
									damping: 30,
									stiffness: 400,
								},
							}}
						>
							<Link href="https://github.com/danielpetho/fancy">
								★ on GitHub
							</Link>
						</motion.button>
					</div>
				</div>
			</section>{" "}
		</div>
	);
}
