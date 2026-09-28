"use client";

import React from "react";

import Image from "next/image";

import {
	ProgressCarousel,
	SliderBtn,
	SliderBtnGroup,
	SliderContent,
	SliderWrapper,
} from "./component";

export default function Usage() {
	const items = [
		{
			img: "/itjustworks.jpg",
			title: "Bridge",
			desc: "A breathtaking view of a city illuminated by countless lights, showcasing the vibrant and bustling nightlife.",
			sliderName: "bridge",
		},
		{
			img: "/itjustworks.jpg",
			title: "Mountains View",
			desc: "A serene lake reflecting the surrounding mountains and trees, creating a mirror-like surface.",
			sliderName: "mountains",
		},
		{
			img: "/itjustworks.jpg",
			title: "Autumn",
			desc: "A picturesque path winding through a dense forest adorned with vibrant autumn foliage.",
			sliderName: "autumn",
		},
		{
			img: "/itjustworks.jpg",
			title: "Foggy",
			sliderName: "foggy",
			desc: "A stunning foggy view over the foresh, with the sun casting a golden glow across the forest. ",
		},
	];
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<ProgressCarousel vertical={false} activeSlider="bridge">
				<SliderContent>
					{items.map((item, index) => (
						<SliderWrapper value={item?.sliderName + "wrapper"}>
							<Image
								className="rounded-xl 2xl:h-[500px] h-[350px] object-cover"
								src={item.img}
								width={1900}
								height={1080}
								alt={item.desc}
							/>
						</SliderWrapper>
					))}
				</SliderContent>

				<SliderBtnGroup className="absolute bottom-0 h-fit dark:text-secondary text-secondary dark:bg-background/40 bg-background/40  backdrop-blur-md overflow-hidden grid grid-cols-2 md:grid-cols-4  rounded-md">
					{items.map((item, index) => (
						<SliderBtn
							value={item?.sliderName}
							className="text-left  p-3 border-r"
							progressBarClass="dark:bg-background bg-background h-full"
						>
							<span className="relative px-4 rounded-full w-fit dark:bg-background dark:text-secondary text-secondary bg-background mb-2">
								{item.title}
							</span>
							<span className="text-sm font-medium  line-clamp-2">
								{item.desc}
							</span>
						</SliderBtn>
					))}
				</SliderBtnGroup>
			</ProgressCarousel>{" "}
		</div>
	);
}
