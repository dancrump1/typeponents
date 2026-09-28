"use client";

import React from "react";

import FlowingMenu from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<FlowingMenu
				items={[
					{
						link: "#",
						text: "Mojave",
						image: "/itjustworks.jpg",
					},
					{
						link: "#",
						text: "Sonoma",
						image: "/itjustworks.jpg",
					},
					{
						link: "#",
						text: "Monterey",
						image: "/itjustworks.jpg",
					},
					{
						link: "#",
						text: "Sequoia",
						image: "/itjustworks.jpg",
					},
				]}
			/>
		</div>
	);
}
