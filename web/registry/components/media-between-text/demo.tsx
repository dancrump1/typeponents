import React, { useRef, useState } from "react";

import MediaBetweenText, {
	MediaBetweenTextRef,
} from "./component";
import { useWindowSize } from "@/hooks/use-window-size";

import { Button } from "@/components/ui/button";

// Credit:
// https://www.fancycomponents.dev/docs/components/blocks/media-between-text

export const elements = [
	{
		src: "/itjustworks.jpg",

		left: "Tim",
		right: "Rodenböker",
		url: "https://www.instagram.com/tim_rodenbroeker/",
	},
	{
		src: "/itjustworks.jpg",

		left: "Simon ",
		right: "Alexander-Adams",
		url: "https://www.instagram.com/polyhop/",
	},
	{
		src: "/itjustworks.jpg",

		left: "Andreion",
		right: "de Castro",
		url: "https://www.instagram.com/andreiongd/",
	},
	{
		src: "/itjustworks.jpg",

		left: "Lorraine",
		right: "Li",
		url: "https://www.instagram.com/lorrr.l/",
	},
];

export default function MediaBetweenTextScrollDemo() {
	const ref = React.useRef<HTMLDivElement>(null);
	const { width } = useWindowSize();

	const isMobile = width < 1024;

	const ref2 = useRef<MediaBetweenTextRef>(null);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<section>
			<h3>Media between text</h3>

			<div
				className="w-full h-dvh items-center justify-center bg-background overflow-auto"
				ref={ref}
			>
				<div className="h-full relative w-full flex">
					<h3 className="text-5xl sm:text-8xl tracking-wide absolute sm:bottom-12 sm:left-12 bottom-4 left-4 w-64">
						today's inspo
					</h3>
					<p className="bottom-4 right-4 sm:right-12 sm:bottom-12 absolute ">
						Scroll down ↓
					</p>
				</div>

				<div className="h-full w-full flex flex-col space-y-12 mt-24 justify-center items-center text-6xl px-6">
					{elements.map((element, index) => (
						<a href={element.url} target="_blank" rel="noreferrer">
							<MediaBetweenText
								key={index + "media-between-text"}
								firstText={element.left}
								secondText={element.right}
								mediaUrl={element.src}
								mediaType="video"
								triggerType="inView"
								useInViewOptionsProp={{
									once: false,
									amount: 1,
									root: ref,
									margin: "-5% 0px -0% 0px",
								}}
								containerRef={ref}
								mediaContainerClassName="w-full h-[40px] sm:h-[80px] overflow-hidden mx-1 sm:mx-3 mt-1 sm:mt-4"
								className="cursor-pointer text-lg sm:text-4xl font-light flex flex-row items-center justify-center"
								animationVariants={{
									initial: { width: 0 },
									animate: {
										width: isMobile ? "40px" : "100px",
										transition: {
											duration: 1,
											type: "spring",
											bounce: 0,
											delay: 0.1,
										},
									},
								}}
							/>
						</a>
					))}
				</div>
			</div>

			<div className="relative w-full h-dvh flex flex-col items-center justify-center bg-background">
				<Button
					onClick={() => {
						setIsOpen(!isOpen);
						if (!isOpen) {
							ref2.current?.animate();
						} else {
							ref2.current?.reset();
						}
					}}
					size={"sm"}
					variant={"outline"}
					className="absolute top-4 left-4 h-8"
				>
					{isOpen ? "Close" : "Open"}
				</Button>

				<MediaBetweenText
					firstText="Artificial "
					secondText="Intelligence"
					mediaUrl={
						"https://cdn.cosmos.so/47c0223f-c704-4d5a-8b47-c48262ebe301?format=jpeg"
					}
					mediaType="image"
					triggerType="ref"
					ref={ref2}
					mediaContainerClassName="w-full h-[60px] sm:h-[100px] overflow-hidden pt-1"
					className="cursor-pointer text-3xl sm:text-7xl font-calendas flex flex-col font-light items-center justify-center"
					leftTextClassName=""
					rightTextClassName="italic"
					animationVariants={{
						initial: {
							width: isMobile ? "160px" : "280px",
							height: 0,
							transition: {
								duration: 0.7,
								ease: [0.944, 0.008, 0.147, 1.002],
							},
						},
						animate: {
							width: isMobile ? "200px" : "330px",
							height: isMobile ? "200px" : "300px",
							transition: {
								duration: 0.7,
								ease: [0.944, 0.008, 0.147, 1.002],
							},
						},
					}}
				/>
			</div>
		</section>
	);
}
