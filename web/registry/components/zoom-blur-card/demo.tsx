"use client";

import React from "react";

import ZoomBlurCard from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="w-full max-w-md">
				<ZoomBlurCard
					title="Zoom Blur Card"
					description="The card component with zoom blur-sm effect"
					imageUrl="/itjustworks.jpg"
				/>
			</div>{" "}
		</div>
	);
}
