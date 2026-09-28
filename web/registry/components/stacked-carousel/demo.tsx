"use client";

import React from "react";

import StackedCarousel from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="w-full h-full flex justify-center items-center pt-12 pb-4">
				<StackedCarousel
					images={[
						"/itjustworks.jpg",
						"/itjustworks.jpg",
						"/itjustworks.jpg",
						"/itjustworks.jpg",
						"/itjustworks.jpg",
					]}
					width={300}
					height={400}
					borderColor="white"
					borderWidth={8}
				/>
			</div>{" "}
		</div>
	);
}
