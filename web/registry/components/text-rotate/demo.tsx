"use client";

import { useEffect, useRef } from "react";

import TextRotate, { TextRotateRef } from "./component";
import { LayoutGroup, motion, useInView } from "motion/react";

function Item({
	index,
	image,
	link,
	onInView,
}: {
	index: number;
	image: string;
	link: string;
	onInView: (inView: boolean) => void;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, {
		margin: "-45% 0px -45% 0px",
	});

	useEffect(() => {
		onInView(isInView);
	}, [isInView, onInView]);

	return (
		<section
			ref={ref}
			key={index + 1}
			className="h-full w-1/2 flex justify-center items-center snap-center"
		>
			<div className="w-16 h-16 sm:w-36 sm:h-36 md:w-40 md:h-40">
				<a href={link} target="_blank" rel="noreferrer">
					<img
						src={image}
						alt={`Example ${index + 2}`}
						className="w-full h-full object-cover"
					/>
				</a>
			</div>
		</section>
	);
}

export default function TextRotateUsage() {
	const textRotateRef = useRef<TextRotateRef>(null);

	const handleInView = (index: number, inView: boolean) => {
		console.log(index, inView);
		if (inView && textRotateRef.current) {
			textRotateRef.current.jumpTo(index);
		}
	};

	return (
		<div className="w-dvw h-dvh text-2xl sm:text-3xl md:text-5xl flex flex-row items-center justify-center font-overused-grotesk bg-background dark:text-muted text-foreground font-light overflow-hidden p-12 sm:p-20 md:p-24">
			<LayoutGroup>
				<motion.div className="flex whitespace-pre" layout>
					<motion.span
						className="pt-0.5 sm:pt-1 md:pt-2"
						layout
						transition={{ type: "spring", damping: 30, stiffness: 400 }}
					>
						Make it{" "}
					</motion.span>
					<TextRotate
						texts={[
							"work!",
							"fancy ✽",
							"right",
							"fast",
							"fun",
							"rock",
							"🕶️🕶️🕶️",
						]}
						mainClassName="text-secondary px-2 sm:px-2 md:px-3 bg-background overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
						staggerFrom={"last"}
						initial={{ y: "100%" }}
						animate={{ y: 0 }}
						exit={{ y: "-120%" }}
						staggerDuration={0.025}
						splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
						transition={{ type: "spring", damping: 30, stiffness: 400 }}
						rotationInterval={2000}
					/>
					<TextRotate
						texts={[
							"The problem isn't how to make the world more technological. It's about how to make the world more humane again.",
							"When you use other people's software you live in somebody else's dream.",
						]}
						mainClassName=" md:leading-10 flex whitespace-pre text-lg sm:text-xl md:text-5xl max-w-xl text-center"
						staggerFrom={"random"}
						animatePresenceMode="wait"
						splitBy="characters"
						initial={[{ filter: "blur(20px)", opacity: 0 }]}
						animate={[{ filter: "blur(0px)", opacity: 1 }]}
						exit={[{ filter: "blur(20px)", opacity: 0 }]}
						loop
						staggerDuration={0.01}
						splitLevelClassName=""
						elementLevelClassName="md:py-[4px]"
						transition={{
							ease: [0.909, 0.151, 0.153, 0.86],
							duration: 1,
						}}
						rotationInterval={4000}
					/>
				</motion.div>
			</LayoutGroup>
			{/* <div className="w-dvw h-dvh overflow-auto absolute snap-y snap-mandatory">
				<div className="sticky inset-0 h-full w-full flex items-center justify-end bg-background dark:text-muted text-foreground">
					<div className="w-2/3">
						<TextRotate
							ref={textRotateRef}
							texts={[
								["/itjustworks.jpg", "/itjustworks.jpg"].map(
									(image) => "dan"
								),
							]}
							mainClassName="text-sm sm:text-3xl md:text-4xl w-full justify-center flex pt-2"
							splitLevelClassName="overflow-hidden pb-2"
							staggerFrom={"first"}
							animatePresenceMode="wait"
							loop={false}
							auto={false}
							staggerDuration={0.005}
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -50 }}
							transition={{ type: "spring", duration: 0.6, bounce: 0 }}
						/>
					</div>
				</div>
				<div className="absolute inset-0">
					{["/itjustworks.jpg", "/itjustworks.jpg"]
						.slice(1)
						.map((image, index) => (
							<Item
								key={index}
								index={index}
								image={image.url}
								link={image.link}
								onInView={(inView) => handleInView(index, inView)}
							/>
						))}
				</div>
			</div> */}
		</div>
	);
}
