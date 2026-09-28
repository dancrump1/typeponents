"use client";

import React from "react";

import Ballpit from "./component";

export default function Usage() {
	return (
		<div className="relative w-full flex items-center justify-center">
			<Ballpit
				count={200}
				gravity={0.7}
				friction={0.8}
				wallBounce={0.95}
				followCursor={true}
			/>
		</div>
	);
}
