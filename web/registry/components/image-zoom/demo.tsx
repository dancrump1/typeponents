"use client";

import React from "react";

import ImageZoom from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div>
				<ImageZoom
					outsideImage={"/oie_transparent.png"}
					insideImage={"/itjustworks.jpg"}
				/>
			</div>{" "}
		</div>
	);
}
