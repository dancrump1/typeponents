"use client";

import React, { useEffect, useState } from "react";

import MouseFollower from "./component";

export default function Usage() {
	const [mouseFollowerContainer, setMouseFollowerContainer] = useState();

	useEffect(() => {
		if (window !== undefined) {
			setMouseFollowerContainer(document.getElementById("mouseFollower"));
		}
	}, []);

	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="w-full h-[33vh] relative" id="mouseFollower">
				<MouseFollower container={mouseFollowerContainer} />
			</div>
		</div>
	);
}
