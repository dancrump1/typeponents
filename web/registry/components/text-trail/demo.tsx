"use client";

import React from "react";

import TextTrail from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			{/* // Basic usage */}
			<TextTrail text="Hello World" />
			{/* // Usage with all props */}
			<TextTrail
				text="React Bits"
				fontFamily="Figtree"
				fontWeight="900"
				noiseFactor={1.2}
				noiseScale={0.001}
				rgbPersistFactor={0.95}
				alphaPersistFactor={0.92}
				animateColor={true}
				startColor="#ff6b6b"
				textColor="#4ecdc4"
				backgroundColor="#1a1a2e"
				colorCycleInterval={2000}
				supersample={2}
			/>
			{/* // With animated color cycling */}
			<TextTrail
				text="Colorful"
				animateColor={true}
				colorCycleInterval={1500}
				noiseFactor={1.5}
				noiseScale={0.002}
			/>
		</div>
	);
}
