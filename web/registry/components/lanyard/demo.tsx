"use client";

import React from "react";

import Lanyard from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />{" "}
		</div>
	);
}
