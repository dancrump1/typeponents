"use client";

import React from "react";

import PeelReveal from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<PeelReveal
				imageSrc={"/itjustworks.jpg"}
				width={200}
				rotate={30}
				peelBackHoverPct={20}
				peelBackActivePct={40}
				shadowIntensity={0.6}
				lightingIntensity={0.1}
				initialPosition={{ x: -100, y: 100 }}
			/>
		</div>
	);
}
