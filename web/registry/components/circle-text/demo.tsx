"use client";

import React from "react";

import CircularText from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<CircularText
				text="TECH*CHUNKS*COMPONENTS*"
				onHover="speedUp"
				spinDuration={20}
			/>
		</div>
	);
}
