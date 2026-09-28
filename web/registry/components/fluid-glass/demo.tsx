"use client";

import React from "react";

import FluidGlass from "./component";

// IMPORTANT INFO BELOW
// This component requires a 3D model to function correctly.
// You can find three example models in the 'public/assets/3d' directory of the repository:
// - 'lens.glb'
// - 'bar.glb'
// - 'cube.glb'
// Make sure to place these models in the correct directory or update the paths accordingly.

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div style={{ height: "600px", position: "relative" }}>
				<FluidGlass
					mode="lens" // or "bar", "cube"
					lensProps={{
						scale: 0.25,
						ior: 1.15,
						thickness: 5,
						chromaticAberration: 0.1,
						anisotropy: 0.01,
					}}
					// barProps={} // add specific props if using bar mode
					// cubeProps={} // add specific props if using cube mode
				/>
			</div>
		</div>
	);
}
