"use client";

import React from "react";

import MatrixBackground from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="h-[50vh] w-full relative">
				<MatrixBackground />
			</div>
		</div>
	);
}
