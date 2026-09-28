"use client";

import React from "react";

import CardDeck from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<CardDeck
				images={[
					{
						src: "/itjustworks.jpg",
						alt: "Rabbit",
					},
					{
						src: "/itjustworks.jpg",
						alt: "Monkey",
					},
					{
						src: "/itjustworks.jpg",
						alt: "Donkey",
					},
					{
						src: "/itjustworks.jpg",
						alt: "Cow",
					},
					{
						src: "/itjustworks.jpg",
						alt: "Chameleon",
					},
				]}
			/>
		</div>
	);
}
