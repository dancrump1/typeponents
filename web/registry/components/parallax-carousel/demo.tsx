"use client";

import React from "react";

import ParallaxCarousel from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div style={{ height: "600px", position: "relative" }}>
				<ParallaxCarousel
					baseWidth={300}
					autoplay={true}
					autoplayDelay={3000}
					pauseOnHover={true}
					loop={true}
					round={false}
				/>
			</div>{" "}
		</div>
	);
}
