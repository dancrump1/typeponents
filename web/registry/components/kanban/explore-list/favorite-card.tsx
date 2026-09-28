import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { FastAverageColor } from "fast-average-color";
import parse from "html-react-parser";
import { motion } from "motion/react";

import CardTags from "./card-tags";
import { closestColor } from "./explore-card";
import { localStorageKey } from "../component";
import { SelectModel } from "./list-dropdown";

const ListCard = ({
	card,
	shouldRender = true,
	isHovered,
	position,
	laneHeight,
	fill = false,
	laneOptions,
	moveCard,
	...props
}) => {
	// Pull browser's Local Storage state into useState variable
	const [componentStorageData, setComponentStorageData] = useState("[]");

	// Store average image color to apply to card text
	const [imgColor, setImgColor] = useState("");

	// Open more details
	const [openCard, setOpenCard] = useState(false);

	const [hoverState, setHoverState] = useState(fill || isHovered || false);

	const cardData = card?.title ? card : props;

	const fac = new FastAverageColor();

	const [open, setOpen] = useState(false);

	// On mount:
	// 1) pull list of selected cards
	// 2) set color of text to average color of image
	useEffect(() => {
		setHoverState(isHovered || fill);
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

	useEffect(() => {
		setHoverState(isHovered || fill);
	}, [isHovered, fill]);

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
		...(cardData?.eventCategories || []),
		...(cardData?.kidsCategories || []),
		...(cardData?.tourCategories || []),
		...(cardData?.summerCategories || []),
		...(cardData?.winterCategories || []),
		...(cardData?.miscellaneousCategories || []),
	];

	const variants = {
		hover: { translateY: "0", height: "100%" },
		stack: {
			translateY: `calc(-95px * ${position - 1})`,
			height: position === 1 ? "100%" : "100px",
		},
	};

	const removeCard = (cardData, e) => {
		deleteFromLocalStorageAndComponentStorage(e, cardData.title);
		props.onDelete(cardData.id);
	};

	return (
		<motion.div
			layout
			key={cardData.id}
			onClick={() => setOpenCard(!openCard)}
			// onMouseLeave={() => setOpenCard(false)}
			style={
				isHovered || position === 1
					? {
							zIndex: Math.round(10 / position),
						}
					: {
							zIndex: Math.round(10 / position),
						}
			}
			initial={"hover"}
			variants={variants}
			transition={{ ease: "linear", duration: 0.25 }}
			animate={isHovered ? "hover" : "stack"}
			exit={{ scale: 0, opacity: 0 }}
			className={cn(
				"group border relative overflow-hidden rounded-lg max-h-[500px] shadow-xl w-full md:w-[300px]"
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
					width={cardData.images?.length ? cardData.images[0]?.width : 300}
					alt="test1"
					crossOrigin="anonymous"
					className={cn(
						`peer h-full w-full object-cover pb-[110px] md:pb-[170px] object-center ${cardData.title
							.toLowerCase()
							.replaceAll(" ", "-")} `
					)}
				/>
			)}

			<div className="visible md:invisible absolute z-100 top-0 ">
				<SelectModel
					laneOptions={laneOptions}
					moveCard={(value) => moveCard(value, cardData)}
				/>
			</div>

			<span className="hidden md:block card-dragger group-hover:visible invisible absolute top-0 right-0 left-0 bg-background text-foreground justify-items-center text-center content-center cursor-grab active:cursor-grabbing">
				<svg
					width="24"
					height="14"
					viewBox="0 0 24 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 10.1665C11.3096 10.1665 10.75 10.7261 10.75 11.4165C10.75 12.1069 11.3096 12.6665 12 12.6665C12.6904 12.6665 13.25 12.1069 13.25 11.4165C13.25 10.7261 12.6904 10.1665 12 10.1665Z"
						fill="#E8E7DD"
					/>
					<path
						d="M3.25 10.1665C2.55964 10.1665 2 10.7261 2 11.4165C2 12.1069 2.55964 12.6665 3.25 12.6665C3.94036 12.6665 4.5 12.1069 4.5 11.4165C4.5 10.7261 3.94036 10.1665 3.25 10.1665Z"
						fill="#E8E7DD"
					/>
					<path
						d="M20.75 10.1665C20.0596 10.1665 19.5 10.7261 19.5 11.4165C19.5 12.1069 20.0596 12.6665 20.75 12.6665C21.4404 12.6665 22 12.1069 22 11.4165C22 10.7261 21.4404 10.1665 20.75 10.1665Z"
						fill="#E8E7DD"
					/>
					<path
						d="M12 10.1665C11.3096 10.1665 10.75 10.7261 10.75 11.4165C10.75 12.1069 11.3096 12.6665 12 12.6665C12.6904 12.6665 13.25 12.1069 13.25 11.4165C13.25 10.7261 12.6904 10.1665 12 10.1665Z"
						stroke="#E8E7DD"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M3.25 10.1665C2.55964 10.1665 2 10.7261 2 11.4165C2 12.1069 2.55964 12.6665 3.25 12.6665C3.94036 12.6665 4.5 12.1069 4.5 11.4165C4.5 10.7261 3.94036 10.1665 3.25 10.1665Z"
						stroke="#E8E7DD"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M20.75 10.1665C20.0596 10.1665 19.5 10.7261 19.5 11.4165C19.5 12.1069 20.0596 12.6665 20.75 12.6665C21.4404 12.6665 22 12.1069 22 11.4165C22 10.7261 21.4404 10.1665 20.75 10.1665Z"
						stroke="#E8E7DD"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M12 1.8335C11.3096 1.8335 10.75 2.39314 10.75 3.0835C10.75 3.77385 11.3096 4.3335 12 4.3335C12.6904 4.3335 13.25 3.77385 13.25 3.0835C13.25 2.39314 12.6904 1.8335 12 1.8335Z"
						fill="#E8E7DD"
					/>
					<path
						d="M3.25 1.83349C2.55964 1.83349 2 2.39314 2 3.08349C2 3.77385 2.55964 4.33349 3.25 4.33349C3.94036 4.33349 4.5 3.77385 4.5 3.08349C4.5 2.39314 3.94036 1.83349 3.25 1.83349Z"
						fill="#E8E7DD"
					/>
					<path
						d="M20.75 1.8335C20.0596 1.8335 19.5 2.39314 19.5 3.0835C19.5 3.77385 20.0596 4.3335 20.75 4.3335C21.4404 4.3335 22 3.77385 22 3.0835C22 2.39314 21.4404 1.8335 20.75 1.8335Z"
						fill="#E8E7DD"
					/>
					<path
						d="M12 1.8335C11.3096 1.8335 10.75 2.39314 10.75 3.0835C10.75 3.77385 11.3096 4.3335 12 4.3335C12.6904 4.3335 13.25 3.77385 13.25 3.0835C13.25 2.39314 12.6904 1.8335 12 1.8335Z"
						stroke="#E8E7DD"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M3.25 1.83349C2.55964 1.83349 2 2.39314 2 3.08349C2 3.77385 2.55964 4.33349 3.25 4.33349C3.94036 4.33349 4.5 3.77385 4.5 3.08349C4.5 2.39314 3.94036 1.83349 3.25 1.83349Z"
						stroke="#E8E7DD"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M20.75 1.8335C20.0596 1.8335 19.5 2.39314 19.5 3.0835C19.5 3.77385 20.0596 4.3335 20.75 4.3335C21.4404 4.3335 22 3.77385 22 3.0835C22 2.39314 21.4404 1.8335 20.75 1.8335Z"
						stroke="#E8E7DD"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
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
				<div className="flex flex-col">
					<h2
						style={{ color: imgColor }}
						className="font-spectral px-5 my-0 text-2xl"
					>
						{cardData.title}
					</h2>
					<h3 className="text-[14px] px-5 font-spectral font-medium">
						{cardData.subhead}
					</h3>
				</div>
				<span
					className={cn(
						"block opacity-0 text-foreground  px-5 mt-6 pb-11 text-xs",
						openCard && "opacity-100 duration-500"
					)}
				>
					{parse(cardData?.copy || "")}
				</span>
			</div>
			<div className="absolute bottom-0 py-2 left-2 flex justify-between items-center w-[90%] bg-background">
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
						removeCard(cardData, e);
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
			</div>
		</motion.div>
	);
};

export default ListCard;
