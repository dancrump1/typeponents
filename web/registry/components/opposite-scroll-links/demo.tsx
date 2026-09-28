"use client";

import React from "react";

import OppositeScroll from "./component";

const data = [
	{ image: "/itjustworks.jpg", id: 1, title: "entry 1", uri: "/" },
	{ image: "/itjustworks.jpg", id: 2, title: "entry 2", uri: "/" },
	{ image: "/itjustworks.jpg", id: 3, title: "entry 3", uri: "/" },
	{ image: "/itjustworks.jpg", id: 4, title: "entry 4", uri: "/" },
	{ image: "/itjustworks.jpg", id: 5, title: "entry 5", uri: "/" },
	{ image: "/itjustworks.jpg", id: 6, title: "entry 6", uri: "/" },
];
export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<OppositeScroll works={data} />
		</div>
	);
}
