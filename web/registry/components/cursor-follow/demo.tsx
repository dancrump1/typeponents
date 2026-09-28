"use client";

import React from "react";

import CursorFollow from "./component";

const images = [
	{
		src: "/itjustworks.jpg",
		label: "A beautiful forest probando el largo limite del texto",
	},
	{
		src: "/itjustworks.jpg",
		label: "Mountain at sunset",
	},
];

const CursorFollowDemo = () => {
	return (
		<CursorFollow>
			<div className="flex flex-row items-center justify-center gap-8 py-8">
				{images.map((img, i) => (
					<div key={i} className="flex flex-col items-center">
						<img
							src={img.src}
							alt={img.label}
							data-cursor-text={img.label}
							className="border-background h-48 w-48 rounded-xl object-cover transition-transform duration-200 hover:scale-105"
							style={{ cursor: "none" }}
						/>
					</div>
				))}
			</div>
		</CursorFollow>
	);
};

export default CursorFollowDemo;
