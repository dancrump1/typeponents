"use client";

import React from "react";

import CarouselCircle from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<CarouselCircle
				images={[
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
				]}
			/>{" "}
		</div>
	);
}
