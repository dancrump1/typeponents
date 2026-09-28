"use client";

import React from "react";

import { AnimatedTooltip } from "./component";

export const people = [
	{
		id: 1,
		name: "John Doe",
		designation: "Software Engineer",
		image: "/itjustworks.jpg",
	},
	{
		id: 2,
		name: "Robert Johnson",
		designation: "Product Manager",
		image: "/itjustworks.jpg",
	},
	{
		id: 3,
		name: "Jane Smith",
		designation: "Data Scientist",
		image: "/itjustworks.jpg",
	},
	{
		id: 4,
		name: "Emily Davis",
		designation: "UX Designer",
		image: "/itjustworks.jpg",
	},
	{
		id: 5,
		name: "Tyler Durden",
		designation: "Soap Developer",
		image: "/itjustworks.jpg",
	},
	{
		id: 6,
		name: "Dora",
		designation: "The Explorer",
		image: "/itjustworks.jpg",
	},
];

export default function TooltipUsage() {
	return (
		<div className="flex flex-row items-center justify-center mb-10 w-full">
			<AnimatedTooltip items={people} />
		</div>
	);
}
