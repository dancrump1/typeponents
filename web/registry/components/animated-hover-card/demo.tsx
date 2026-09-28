"use client";

import React from "react";

import AnimatedCard from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<AnimatedCard
				title="Hover to see the wizardry"
				subtitle="You hovered"
			/>
		</div>
	);
}
