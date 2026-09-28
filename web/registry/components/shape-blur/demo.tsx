"use client";

import React from "react";

import ShapeBlur from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div
				style={{
					position: "relative",
					height: "500px",
					overflow: "hidden",
				}}
			>
				<ShapeBlur
					variation={0}
					pixelRatioProp={window.devicePixelRatio || 1}
					shapeSize={0.5}
					roundness={0.5}
					borderSize={0.05}
					circleSize={0.5}
					circleEdge={1}
				/>
			</div>{" "}
		</div>
	);
}
