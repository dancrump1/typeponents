"use client";

import React from "react";

import { FloatingNav } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="h-screen overflow-auto">
				<div className="h-[200vh] " />
				<FloatingNav />
			</div>
		</div>
	);
}
