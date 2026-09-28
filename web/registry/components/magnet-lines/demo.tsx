"use client";

import React from "react";

import MagnetLines from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<MagnetLines
				rows={9}
				columns={9}
				containerSize="60vmin"
				lineColor="tomato"
				lineWidth="0.8vmin"
				lineHeight="5vmin"
				baseAngle={0}
				style={{ margin: "2rem auto" }}
			/>{" "}
		</div>
	);
}
