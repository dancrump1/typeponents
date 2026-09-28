import { useState } from "react";

import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";

// Credit:
// https://www.fancycomponents.dev/docs/components/filter/gooey-svg-filter

const TAB_CONTENT = [
	{
		title: "2024",
		files: [
			"learning-to-meditate.md",
			"spring-garden-plans.md",
			"travel-wishlist.md",
			"new-coding-projects.md",
		],
	},
	{
		title: "2023",
		files: [
			"year-in-review.md",
			"marathon-training-log.md",
			"recipe-collection.md",
			"book-reflections.md",
		],
	},
	{
		title: "2022",
		files: [
			"moving-to-a-new-city.md",
			"starting-a-blog.md",
			"photography-basics.md",
			"first-coding-project.md",
		],
	},
	{
		title: "2021",
		files: [
			"goals-and-aspirations.md",
			"daily-gratitude.md",
			"learning-to-cook.md",
			"remote-work-journal.md",
		],
	},
];

export function GooeyDemo() {
	const [activeTab, setActiveTab] = useState(0);
	const [isGooeyEnabled, setIsGooeyEnabled] = useState(true);

	return (
		<div className="relative w-full h-full flex justify-center p-8 font-calendas md:text-base text-xs sm:text-sm bg-background dark:bg-background">
			<GooeyFilter id="gooey-filter" strength={15} />

			<Button
				variant="outline"
				onClick={() => setIsGooeyEnabled(!isGooeyEnabled)}
				className="absolute top-4 left-4 font-overusedGrotesk"
			>
				{isGooeyEnabled ? "Disable filter" : "Enable filter"}
			</Button>

			<div className="w-11/12 md:w-4/5 relative mt-24">
				<div
					className="absolute inset-0"
					style={{
						filter: isGooeyEnabled ? "url(#gooey-filter)" : "none",
					}}
				>
					<div className="flex w-full ">
						{TAB_CONTENT.map((_, index) => (
							<div
								key={index + "gooey-tabs"}
								className="relative flex-1 h-8 md:h-12"
							>
								{activeTab === index && (
									<motion.div
										layoutId="active-tab"
										className="absolute inset-0 bg-background"
										transition={{
											type: "spring",
											bounce: 0.0,
											duration: 0.4,
										}}
									/>
								)}
							</div>
						))}
					</div>
					{/* Content panel */}
					<div className="w-full h-[200px] sm:h-[250px] md:h-[300px] bg-background overflow-hidden text-muted-foreground">
						<AnimatePresence mode="popLayout">
							<motion.div
								key={activeTab}
								initial={{
									opacity: 0,
									y: 50,
									filter: "blur(10px)",
								}}
								animate={{
									opacity: 1,
									y: 0,
									filter: "blur(0px)",
								}}
								exit={{
									opacity: 0,
									y: -50,
									filter: "blur(10px)",
								}}
								transition={{
									duration: 0.2,
									ease: "easeOut",
								}}
								className="p-8 md:p-12"
							>
								<div className="space-y-2 mt-4 sm:mt-8 md:mt-8">
									<ul className="">
										{TAB_CONTENT[activeTab].files.map(
											(file, index) => (
												<li
													key={file}
													className="border-b border-muted-foreground/50 pt-2 pb-1 text-foreground"
												>
													{file}
												</li>
											)
										)}
									</ul>
								</div>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>

				{/* Interactive text overlay, no filter */}
				<div className="relative flex w-full ">
					{TAB_CONTENT.map((tab, index) => (
						<button
							key={index + "gooey-content"}
							onClick={() => setActiveTab(index)}
							className="flex-1 h-8 md:h-12"
						>
							<span
								className={`
                w-full h-full flex items-center justify-center
                ${activeTab === index ? "text-foreground" : "text-muted-foreground"}
              `}
							>
								{tab.title}
							</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

const GooeyFilter = ({
	id = "goo-filter",
	strength = 10,
}: {
	id?: string;
	strength?: number;
}) => {
	return (
		<svg className="hidden absolute">
			<defs>
				<filter id={id}>
					<feGaussianBlur
						in="SourceGraphic"
						stdDeviation={strength}
						result="blur"
					/>
					<feColorMatrix
						in="blur"
						type="matrix"
						values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
						result="goo"
					/>
					<feComposite in="SourceGraphic" in2="goo" operator="atop" />
				</filter>
			</defs>
		</svg>
	);
};

export default GooeyFilter;
