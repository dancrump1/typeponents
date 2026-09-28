"use client";

import React from "react";

import { Compare } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<Compare firstImage="itjustworks.jpg" secondImage="itjustworks.jpg" />
		</div>
	);
}
