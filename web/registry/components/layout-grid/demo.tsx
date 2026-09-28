"use client";

import React from "react";

import { LayoutGrid } from "./component";

function LayoutGridDemo() {
	return (
		<div className="h-screen py-20 w-full">
			<LayoutGrid cards={cards} />
		</div>
	);
}

const SkeletonOne = () => {
	return (
		<div>
			<p className="font-bold md:text-4xl text-xl text-secondary">
				House in the woods
			</p>
			<p className="font-normal text-base text-secondary"></p>
			<p className="font-normal text-base my-4 max-w-lg text-secondary">
				A serene and tranquil retreat, this house in the woods offers a
				peaceful escape from the hustle and bustle of city life.
			</p>
		</div>
	);
};

const SkeletonTwo = () => {
	return (
		<div>
			<p className="font-bold md:text-4xl text-xl text-secondary">
				House above the clouds
			</p>
			<p className="font-normal text-base text-secondary"></p>
			<p className="font-normal text-base my-4 max-w-lg text-secondary">
				Perched high above the world, this house offers breathtaking views
				and a unique living experience. It&apos;s a place where the sky
				meets home, and tranquility is a way of life.
			</p>
		</div>
	);
};
const SkeletonThree = () => {
	return (
		<div>
			<p className="font-bold md:text-4xl text-xl text-secondary">
				Greens all over
			</p>
			<p className="font-normal text-base text-secondary"></p>
			<p className="font-normal text-base my-4 max-w-lg text-secondary">
				A house surrounded by greenery and nature&apos;s beauty. It&apos;s
				the perfect place to relax, unwind, and enjoy life.
			</p>
		</div>
	);
};
const SkeletonFour = () => {
	return (
		<div>
			<p className="font-bold md:text-4xl text-xl text-secondary">
				Rivers are serene
			</p>
			<p className="font-normal text-base text-secondary"></p>
			<p className="font-normal text-base my-4 max-w-lg text-secondary">
				A house by the river is a place of peace and tranquility. It&apos;s
				the perfect place to relax, unwind, and enjoy life.
			</p>
		</div>
	);
};

export const cards = [
	{
		id: 1,
		content: <SkeletonOne />,
		className: "md:col-span-2",
		thumbnail: "/itjustworks.jpg",
	},
	{
		id: 2,
		content: <SkeletonTwo />,
		className: "col-span-1",
		thumbnail: "/itjustworks.jpg",
	},
	{
		id: 3,
		content: <SkeletonThree />,
		className: "col-span-1",
		thumbnail: "/itjustworks.jpg",
	},
	{
		id: 4,
		content: <SkeletonFour />,
		className: "md:col-span-2",
		thumbnail: "/itjustworks.jpg",
	},
];

export default LayoutGridDemo;
