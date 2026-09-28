"use client";

import React from "react";

import TextAnimate from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<TextAnimate
				once={true}
				animation="fadeIn"
				by="character"
				duration={1}
			>
				Components
			</TextAnimate>{" "}
		</div>
	);
}
