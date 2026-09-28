"use client";

import React from "react";

import ModelViewer from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<ModelViewer
				url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb"
				width={400}
				height={400}
			/>
		</div>
	);
}
