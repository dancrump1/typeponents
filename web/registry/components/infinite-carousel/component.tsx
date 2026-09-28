"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

// Credit:
// https://www.pldkhoa.dev/playground/infinite-carousel

interface LogoRowProps {
	logos: (typeof items)[number][number][];
	index: number;
	activeIndex: number;
}

const items = [
	[
		"https://ik.imagekit.io/khoaphan/playground/Infinite%20Carousel/Airbnb.svg?updatedAt=1740896261205",
		"https://ik.imagekit.io/khoaphan/playground/Infinite%20Carousel/Lemon%20Squeezy%20-%20Long.svg?updatedAt=1740898819817",
		"https://ik.imagekit.io/khoaphan/playground/Infinite%20Carousel/Instagram%20-%20Long.svg?updatedAt=1740896256882",
		"https://ik.imagekit.io/khoaphan/playground/Infinite%20Carousel/Slack.svg?updatedAt=1740896256826",
	],
	[
		"https://ik.imagekit.io/khoaphan/playground/Infinite%20Carousel/Netflix.svg?updatedAt=1740896256859",
		"https://ik.imagekit.io/khoaphan/playground/Infinite%20Carousel/Framer.svg?updatedAt=1740896256791",
		"https://ik.imagekit.io/khoaphan/playground/Infinite%20Carousel/LinkedIn%20-%20Long.svg?updatedAt=1740898819402",
		"https://ik.imagekit.io/khoaphan/playground/Infinite%20Carousel/medium.svg?updatedAt=1740896256752",
	],
	[
		"https://ik.imagekit.io/khoaphan/playground/Infinite%20Carousel/facebook.svg?updatedAt=1740896256947",
		"https://ik.imagekit.io/khoaphan/playground/Infinite%20Carousel/Tesla.svg?updatedAt=1740896256927",
		"https://ik.imagekit.io/khoaphan/playground/Infinite%20Carousel/Mailchimp.svg?updatedAt=1740896256732",
		"https://ik.imagekit.io/khoaphan/playground/Infinite%20Carousel/Microsoft.svg?updatedAt=1740896256652",
	],
];

export default function InfiniteCarousel() {
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
		const intervalId = setInterval(() => setActiveIndex(nextIndex), 3000);

		return () => clearInterval(intervalId);
	}, [activeIndex]);

	return (
		<article className="relative grid min-h-80 place-items-center rounded-xl border border-white/10 bg-background/5 p-3 md:aspect-[2] md:min-h-0">
			<div className="relative h-40 w-full">
				{items.map((logos, index) => (
					<LogoRow
						key={index + "infinite-carousel"}
						activeIndex={activeIndex}
						logos={logos}
						index={index}
					/>
				))}
			</div>
		</article>
	);
}

const LogoRow = ({ logos, index, activeIndex }: LogoRowProps) => {
	const isActive = index === activeIndex;

	return (
		<AnimatePresence>
			{isActive && (
				<div className="absolute left-0 top-0 grid h-full w-full md:gap-x-6 md:px-8 grid-cols-4 gap-3 px-5">
					{logos.map((logo, logoIndex) => (
						<motion.div
							key={logoIndex}
							initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
							animate={{
								y: 0,
								opacity: 1,
								filter: "blur(0px)",
							}}
							exit={{ y: -40, opacity: 0, filter: "blur(10px)" }}
							transition={{
								duration: 1.5,
								type: "spring",
								delay: logoIndex * 0.15,
							}}
						>
							<img
								src={logo}
								loading="lazy"
								className="h-full w-full object-contain"
							/>
						</motion.div>
					))}
				</div>
			)}
		</AnimatePresence>
	);
};
