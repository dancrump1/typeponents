# Stripe Accordion

- Categories: Accordions
- Tags: drag, scroll-driven, hover, keyboard
- Import: `@/components/ui/stripe-accordion`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/stripe-accordion.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Usage

```tsx
"use client";

import React from "react";

import StripeAccordion, {
	UnsplashGrid,
} from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<StripeAccordion />
			<UnsplashGrid />
		</div>
	);
}
```

## Source

### `components/ui/stripe-accordion.tsx`

```tsx
// @ts-nocheck
"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import {
	AnimatePresence,
	AnimateSharedLayout,
	motion,
	useInView,
} from "motion/react";

const items = [
	{
		id: "456",
		url: "/itjustworks.jpg",
		title: "item 1",
	},
	{
		id: "789",
		url: "/itjustworks.jpg",
		title: "item 2",
	},
];

function Gallery({ items, setIndex, setOpen, index }) {
	return (
		<div className="rounded-md w-fit mx-auto md:gap-2 gap-1 flex pb-20 pt-10 ">
			{items.slice(0, 11).map((item, i) => {
				return (
					<>
						<motion.img
							whileTap={{ scale: 0.95 }}
							className={`rounded-2xl ${
								index === i
									? "w-[250px] "
									: "xl:w-[50px] md:w-[30px] sm:w-[20px] w-[14px]"
							} h-[200px] shrink-0  object-cover transition-[width] ease-in-out duration-300`}
							key={item + "stripe-accordion"}
							onMouseEnter={() => {
								setIndex(i);
							}}
							onMouseLeave={() => {
								setIndex(i);
							}}
							onClick={() => {
								setIndex(i);
								setOpen(true);
							}}
							src={item?.url}
							layoutId={item.id}
						/>
					</>
				);
			})}
		</div>
	);
}

export default function StripeAccordion() {
	const [index, setIndex] = useState(5);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (open) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setOpen(false);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [open]);
	return (
		<div className="relative">
			<Gallery
				items={items}
				index={index}
				setIndex={setIndex}
				setOpen={setOpen}
			/>
			<AnimatePresence>
				{open !== false && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						key="overlay"
						className="dark:bg-background/40 bg-background/40 backdrop-blur-xs fixed inset-0 z-50 top-0 left-0 bottom-0 right-0 w-full h-full grid place-content-center"
						onClick={() => {
							setOpen(false);
						}}
					>
						<div onClick={(e) => e.stopPropagation()}>
							<motion.div
								layoutId={items[index].id}
								className="w-[400px] h-[400px] rounded-2xl cursor-default"
							>
								<Image
									src={items[index].url}
									width={400}
									height={400}
									alt="single-image"
									className="rounded-2xl h-full w-full object-cover"
								/>
								<article className="dark:bg-base-dark bg-background rounded-md p-2 mt-2 border ">
									<motion.h1
										initial={{ scaleY: 0.2 }}
										animate={{ scaleY: 1 }}
										exit={{ scaleY: 0.2 }}
										transition={{ duration: 0.2, delay: 0.2 }}
										className="text-xl font-semibold"
									>
										{items[index].title}
									</motion.h1>
									<motion.p
										initial={{ y: -10, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										exit={{ scaleY: -10, opacity: 0 }}
										transition={{ duration: 0.2, delay: 0.2 }}
										className="text-sm leading-[100%] py-2"
									>
										{items[index].description}
									</motion.p>
								</article>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

function UnsplashGrid() {
	const [selected, setSelected] = useState(null);

	return (
		<>
			<div className="container mx-auto sm:p-4 px-0 ">
				<div className="columns-2 md:columns-3 2xl:columns-4 gap-4">
					<>
						{items.map((item, index) => (
							<ImageItem
								key={item.id}
								item={item}
								index={index}
								setSelected={setSelected}
							/>
						))}
					</>
				</div>
			</div>
			<Modal selected={selected} setSelected={setSelected} />
		</>
	);
}
interface Item {
	id: number;
	url: string;
	title: string;
}

interface ImageItemProps {
	item: Item;
	index: number | string;
	setSelected: any;
}

function ImageItem({ item, index, setSelected }: ImageItemProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });
	return (
		<motion.figure
			initial="hidden"
			animate={isInView && "visible"}
			ref={ref}
			className="inline-block group w-full rounded-md  relative dark:bg-background bg-background  before:absolute before:top-0 before:content-[''] before:h-full before:w-full hover:before:bg-linear-to-t dark:before:from-background  before:from-background/90 before:from-5% before:to-transparent before:to-90% cursor-pointer"
			onClick={() => setSelected(item)}
		>
			<motion.img
				layoutId={`card-${item.id}`}
				whileHover={{ scale: 1.025 }}
				src={item.url}
				className="w-full bg-base-100 shadow-xl image-full cursor-pointer"
			/>
			<div className="flex flex-wrap mt-2 absolute bottom-0 left-0 p-2 group-hover:opacity-100 opacity-0 font-semibold ">
				<h1>{item.title}</h1>
			</div>
		</motion.figure>
	);
}

type ImageModalProps = {
	item: any;
	uniqueId: string;
	itemArr: any;
};

const Modal: React.FC = () => {
	return (
		<>
			<div className="columns-3 ">
				{items
					.slice(0, 8)
					?.map((item, index) => (
						<SliderModal
							item={item}
							itemArr={items}
							uniqueId={`id-${index}`}
						/>
					))}
			</div>
		</>
	);
};

const SliderModal = ({ uniqueId, itemArr }: ImageModalProps) => {
	const item = items[0];
	const [isOpen, setIsOpen] = useState(false);
	const [newItem, setNewItem] = useState(item);
	const [hight, setHight] = useState(0);
	const [constraints, setConstraints] = useState(0);
	const carousel = useRef(null);

	useEffect(() => {
		const element = carousel.current;
		const viewportHeight = element?.offsetHeight;
		const viewScrollHeight = element?.scrollHeight;
		// console.log(viewportHeight, viewScrollHeight);
		setConstraints(Number(viewportHeight) - Number(viewScrollHeight));
	}, [carousel, isOpen]);
	// console.log(constraints)
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	return (
		<>
			<motion.div
				onClick={() => {
					setIsOpen(true);
					setNewItem(item);
				}}
				className="overflow-hidden mb-3"
			>
				<motion.div layoutId={uniqueId}>
					<Image
						width={400}
						height={400}
						src={item?.url}
						className="bg-background text-foreground rounded-md w-full cursor-zoom-in"
						alt="img"
					/>
				</motion.div>
			</motion.div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 top-0 left-0  right-0 bottom-0  flex flex-col items-center w-full h-screen justify-center dark:bg-background/80 bg-background/80 backdrop-blur-lg cursor-zoom-out"
						onClick={() => {
							setNewItem(null);
							setIsOpen(false);
						}}
					>
						<button
							className="absolute top-2 right-2 p-4 border dark:bg-background/80 text-foreground  bg-background/40 backdrop-blur-lg "
							onClick={() => setIsOpen(false)}
						>
							X
						</button>
						<motion.div
							layoutId={uniqueId}
							className="rounded-md w-fit h-[80%] flex gap-2 items-center mx-auto cursor-auto "
							onClick={(e) => e.stopPropagation()}
						>
							{newItem && (
								<AnimatePresence>
									{itemArr.map(
										(
											tab: any,
											index: React.Key | null | undefined
										) => (
											<>
												<React.Fragment
													key={index + "stripe-accordion-item"}
												>
													<AnimatePresence mode="popLayout">
														{tab.id === newItem.id && (
															<motion.figure
																key={tab?.id}
																className="dark:bg-background/40 bg-background/40 border  rounded-md p-4"
															>
																<motion.div
																	initial={{ opacity: 0 }}
																	animate={{
																		opacity: 1,
																		transition: {
																			type: "ease",
																			ease: "easeInOut",
																			duration: 0.3,
																			delay: 0.2,
																		},
																	}}
																	exit={{
																		opacity: 0,
																		transition: {
																			type: "ease",
																			ease: "easeInOut",
																			duration: 0.2,
																		},
																	}}
																	transition={{
																		duration: 0.2,
																		delay: 0.2,
																	}}
																>
																	<Image
																		src={newItem.url}
																		width={1000}
																		height={1000}
																		alt="preview_img"
																		className=" object-contain h-[70vh]  mx-auto rounded-md"
																	/>
																</motion.div>
															</motion.figure>
														)}
													</AnimatePresence>
												</React.Fragment>
											</>
										)
									)}
								</AnimatePresence>
							)}
							<motion.div
								className="h-[300px] overflow-hidden dark:bg-background/40 bg-background/40 border rounded-md"
								ref={carousel}
							>
								<motion.div
									whileDrag={{ scale: 0.95 }}
									dragElastic={0.2}
									dragTransition={{ bounceDamping: 30 }}
									transition={{ duration: 0.2, ease: "easeInOut" }}
									className="h-fit "
									drag="y"
									dragConstraints={{ top: constraints, bottom: 0 }}
								>
									{itemArr?.map(
										(
											itemData: {
												url: string | StaticImport;
												id: any;
											},
											index: React.Key | null | undefined
										) => {
											return (
												<motion.div
													key={index + "accordion-stripe"}
													className={`relative p-2   cursor-grab active:cursor-grabbing`}
													onClick={() => setNewItem(itemData)}
												>
													<Image
														src={itemData?.url}
														width={400}
														height={400}
														alt="img"
														className="sm:w-28 w-52 h-16 object-cover cursor-pointer relative z-2 rounded-md pointer-events-none"
													/>
													{itemData?.id === newItem?.id && (
														<motion.div
															layoutId="slider"
															transition={{
																layout: {
																	duration: 0.2,
																	ease: "easeOut",
																},
															}}
															className="absolute top-0 left-0 h-full w-full dark:bg-background bg-background rounded-md"
														></motion.div>
													)}
												</motion.div>
											);
										}
									)}
								</motion.div>
							</motion.div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

const ExampleSlider = () => {
	return (
		<div className="columns-3 ">
			{items?.map((item, index) => (
				<SliderModal item={item} itemArr={items} uniqueId={`id-${index}`} />
			))}
		</div>
	);
};

export { StripeAccordion, UnsplashGrid, ExampleSlider };
```
