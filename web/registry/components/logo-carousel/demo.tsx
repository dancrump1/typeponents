"use client";

import LogoCarousel from "./component";
import React from "react";

export function LogoCarouselDemo() {
	return (
		<div className="space-y-8  py-24">
			<div className="w-full max-w-(--breakpoint-lg) mx-auto flex flex-col items-center space-y-8">
				<LogoCarousel columnCount={3} />
			</div>
		</div>
	);
}

export default LogoCarouselDemo;
