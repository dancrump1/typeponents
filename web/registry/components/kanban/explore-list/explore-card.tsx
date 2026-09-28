import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { FastAverageColor } from "fast-average-color";
import parse from "html-react-parser";
import { motion } from "motion/react";

import CardTags from "./card-tags";
import { localStorageKey } from "../component";

export function hexToRgb(hex) {
	// Remove '#' if present
	if (hex.charAt(0) === "#") {
		hex = hex.slice(1);
	}

	// Parse the hex into RGB values
	let r = parseInt(hex.slice(0, 2), 16);
	let g = parseInt(hex.slice(2, 4), 16);
	let b = parseInt(hex.slice(4, 6), 16);

	return { r, g, b };
}

export function colorDistance(color1, color2) {
	// Calculate the Euclidean distance between two RGB colors
	let rDiff = color1.r - color2.r;
	let gDiff = color1.g - color2.g;
	let bDiff = color1.b - color2.b;

	return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}

export function closestColor(inputHex) {
	const randomColors = [
		"#FF5733",
		"#33FF57",
		"#3357FF",
		"#F9A825",
		"#FF00FF",
		"#00FFFF",
		"#FF6347",
		"#BFFF00",
		"#D2691E",
		"#9400D3",
	];

	const inputRgb = hexToRgb(inputHex);
	let closest = randomColors[0];
	let minDistance = Infinity;

	// Loop through each color and find the closest match
	randomColors.forEach((colorHex) => {
		const colorRgb = hexToRgb(colorHex);
		const distance = colorDistance(inputRgb, colorRgb);
		if (distance < minDistance) {
			minDistance = distance;
			closest = colorHex;
		}
	});

	return closest;
}

const ExploreCard = ({
	card,
	shouldRender = true,
	isHovered,
	position,
	laneHeight,
	...props
}) => {
	// Pull browser's Local Storage state into useState variable
	const [componentStorageData, setComponentStorageData] = useState("[]");

	// Store average image color to apply to card text
	const [imgColor, setImgColor] = useState("");

	// Open more details
	const [openCard, setOpenCard] = useState(false);

	const cardData = card?.title ? card : props;

	const fac = new FastAverageColor();
	const [open, setOpen] = useState(false);

	// On mount:
	// 1) pull list of selected cards
	// 2) set color of text to average color of image
	useEffect(() => {
		// Fetch existing selected cards and store in component state
		setComponentStorageData(localStorage.getItem(localStorageKey) || "[]");

		// Smitha asked about making the title text match the average color of an image
		!!document.querySelector(
			`.${cardData.title.toLowerCase().replaceAll(" ", "-")}`
		) &&
			fac
				.getColorAsync(
					document.querySelector(
						`.${cardData.title.toLowerCase().replaceAll(" ", "-")}`
					)
				)
				.then((color) => setImgColor(closestColor(color.hex)));
	}, []);

	const saveToLocalStorageAndUpdateComponentStorage = (e, title) => {
		e.preventDefault();
		const existingData = JSON.parse(localStorage.getItem(localStorageKey));

		// Either add to existing data or, if no existing data, create first data entry
		const dataToSet = existingData?.length
			? [
					...existingData,
					{
						title,
						laneId: props.laneId?.toLowerCase().replace(/\s/g, ""),
						laneTitle: props?.laneTitle,
					},
				]
			: [
					{
						title,
						laneId: props.laneId?.toLowerCase().replace(/\s/g, ""),
						laneTitle: props?.laneTitle,
					},
				];

		// Store new item in browser's Local Storage
		localStorage.setItem(localStorageKey, JSON.stringify(dataToSet));

		// Store new item in useState variable
		setComponentStorageData(JSON.stringify(dataToSet));
	};

	const deleteFromLocalStorageAndComponentStorage = (e, title) => {
		e.preventDefault();
		// Get current data from browser's Local Storage
		const existingData = JSON.parse(localStorage.getItem(localStorageKey));

		// Get a new list with selected card removed
		const listWithCardRemoved = existingData.filter(
			(number) => number.title !== title
		);

		// Overwrite browser's Local Storage with new list
		localStorage.setItem(
			localStorageKey,
			JSON.stringify(listWithCardRemoved)
		);

		// Overwrite useState variable with new list
		setComponentStorageData(JSON.stringify(listWithCardRemoved));
	};

	const cardFilters = [
		...cardData?.eventCategories,
		...cardData?.kidsCategories,
		...cardData?.tourCategories,
		...cardData?.summerCategories,
		...cardData?.winterCategories,
		...cardData?.miscellaneousCategories,
	];

	return (
		shouldRender && (
			<motion.div
				layout
				transition={{
					type: "spring",
					bounce: 0.1,
					mass: 1,
					damping: 25,
					stiffness: 300,
				}}
				exit={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				initial={{ opacity: 1 }}
				key={cardData.title.toLowerCase().replaceAll(" ", "-")}
				onClick={() => setOpenCard(!openCard)}
				className={cn(
					"group border relative overflow-hidden rounded-lg max-h-[500px] shadow-xl font-manrope max-w-[300px]"
				)}
			>
				{(cardData.images?.length || cardData.img?.src) && (
					<Image
						src={
							cardData.images?.length
								? cardData.images[0].url
								: cardData.img?.src
						}
						height={
							cardData.images?.length ? cardData.images[0].height : 200
						}
						width={
							cardData.images?.length ? cardData.images[0]?.width : 300
						}
						alt="test1"
						crossOrigin="anonymous"
						className={cn(
							`peer h-full w-full object-cover pb-[110px] md:pb-[170px] object-center ${cardData.title
								.toLowerCase()
								.replaceAll(" ", "-")} `
						)}
					/>
				)}

				<span className="group-hover:visible invisible absolute inset-0 bg-background/30 text-foreground text-center content-center">
					Click to reveal more
				</span>

				<div
					className={cn(
						"bg-background w-full absolute bottom-0 transition-[height,top] duration-500",
						{
							"h-full! top-0! bottom-0!": openCard,
							"h-[110px] md:h-[170px] top-[calc(100%-110px)] md:top-[calc(100%-170px)]":
								!open,
							"h-[110px] md:h-[200px] top-[calc(100%-110px)] md:top-[calc(100%-200px)]":
								open,
						}
					)}
				>
					<h2 style={{ color: imgColor }} className=" px-5 my-0 text-2xl">
						{cardData.title}
					</h2>
					<h3 className="text-[14px] px-5 font-spectral font-medium">
						{cardData.subhead}
					</h3>
					<span
						className={cn(
							"block opacity-0 text-foreground  px-5 mt-6 pb-11 text-xs",
							openCard && "opacity-100 duration-500"
						)}
					>
						{parse(cardData?.copy || "")}
					</span>
				</div>
				<span className="absolute bottom-0 py-2 left-2 flex justify-between items-center w-[90%] bg-background">
					<CardTags tags={cardFilters} setOpen={setOpen} open={open} />
					<button
						className="text-foreground shrink-0 h-8 w-8 overflow-hidden mt-auto"
						onClick={(e) => {
							e.stopPropagation();
							JSON.parse(componentStorageData).find(
								(number) => number.title === cardData.title
							)
								? deleteFromLocalStorageAndComponentStorage(
										e,
										cardData.title
									)
								: saveToLocalStorageAndUpdateComponentStorage(
										e,
										cardData.title
									);
						}}
					>
						<svg
							width="27"
							height="24"
							viewBox="0 0 27 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className={cn(
								"hover/card:stroke-white",
								JSON.parse(componentStorageData).find(
									(number) => number.title === cardData.title
								) && "fill-[#9B5B40] h-full w-full"
							)}
						>
							<path
								d="M23.3804 4.0482C22.8219 3.48944 22.1588 3.04619 21.4289 2.74377C20.6991 2.44136 19.9168 2.28571 19.1268 2.28571C18.3367 2.28571 17.5545 2.44136 16.8246 2.74377C16.0948 3.04619 15.4316 3.48944 14.8731 4.0482L13.714 5.20729L12.555 4.0482C11.4268 2.92007 9.89674 2.28629 8.30132 2.28629C6.7059 2.28629 5.17582 2.92007 4.04768 4.0482C2.91955 5.17634 2.28577 6.70642 2.28577 8.30184C2.28577 9.89727 2.91955 11.4273 4.04768 12.5555L13.714 22.2218L23.3804 12.5555C23.9392 11.997 24.3824 11.3339 24.6848 10.604C24.9873 9.87415 25.1429 9.09187 25.1429 8.30184C25.1429 7.51182 24.9873 6.72953 24.6848 5.99968C24.3824 5.26983 23.9392 4.60671 23.3804 4.0482Z"
								stroke="#9B5B40"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</span>
			</motion.div>
		)
	);
};

export default ExploreCard;
