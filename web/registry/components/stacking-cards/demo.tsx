"use client";

import { useState } from "react";

import Image from "next/image";

import StackingCards, {
	StackingCardItem,
} from "./component";
import { cn } from "@/lib/utils";

const cards = [
	{
		bgColor: "bg-background",
		title: "The Guiding Light",
		description:
			"Lighthouses have stood as beacons of hope for centuries, guiding sailors safely through treacherous waters. Their glowing light and towering presence serve as a reminder of humanity’s connection to the sea.",
		image: "/itjustworks.jpg",
	},
	{
		bgColor: "bg-background",
		title: "Life Beneath the Waves",
		description:
			"From shimmering schools of fish to solitary hunters, the ocean is home to an incredible variety of marine life. Each species plays a vital role in maintaining the balance of underwater ecosystems.",
		image: "/itjustworks.jpg",
	},
	{
		bgColor: "bg-background",
		title: "Alone on the Open Sea",
		description:
			"Drifting across the endless horizon, traveling alone on the sea is a test of courage and resilience. With nothing but the waves and the sky, solitude becomes both a challenge and a source of deep reflection.",
		image: "/itjustworks.jpg",
	},
	{
		bgColor: "bg-background",
		title: "The Art of Sailing",
		description:
			"Harnessing the power of the wind, sailing is both a skill and an adventure. Whether racing across the waves or leisurely cruising, it’s a timeless way to explore the vast blue expanse.",
		image: "/itjustworks.jpg",
	},
	{
		bgColor: "bg-background",
		title: "The Era of Whaling",
		description:
			"Once a thriving industry, whale hunting shaped economies and cultures across the world. Today, efforts to protect these majestic creatures highlight the shift toward conservation and respect for marine life.",
		image: "/itjustworks.jpg",
	},
];

export default function StackingCardsDemo() {
	const [container, setContainer] = useState<HTMLElement | null>(null);

	return (
		<div
			className="h-[620px] bg-background overflow-auto text-secondary"
			ref={(node) => setContainer(node)}
		>
			<StackingCards
				totalCards={cards.length}
				scrollOptons={{ container: { current: container } }}
			>
				<div className="relative font-calendas h-[620px] w-full z-10 text-2xl md:text-7xl font-bold uppercase flex justify-center items-center text-secondary whitespace-pre">
					Scroll down ↓
				</div>
				{cards.map(({ bgColor, description, image, title }, index) => {
					return (
						<StackingCardItem
							key={index + "stacking-cards"}
							index={index}
							className="h-[620px]"
						>
							<div
								className={cn(
									bgColor,
									"h-[80%] sm:h-[70%] flex-col sm:flex-row aspect-video px-8 py-10 flex w-11/12 rounded-3xl mx-auto relative"
								)}
							>
								<div className="flex-1 flex flex-col justify-center">
									<h3 className="font-bold text-2xl mb-5">{title}</h3>
									<p>{description}</p>
								</div>

								<div className="w-full sm:w-1/2 rounded-xl aspect-video relative overflow-hidden">
									<Image
										src={image}
										alt={title}
										width={100}
										height={100}
										className="object-cover"
									/>
								</div>
							</div>
						</StackingCardItem>
					);
				})}

				<div className="w-full h-80 relative overflow-hidden">
					<h2 className="absolute bottom-0 left-0 translate-y-1/3 sm:text-[192px] text-[80px] text-secondary font-calendas">
						fancy
					</h2>
				</div>
			</StackingCards>
		</div>
	);
}
