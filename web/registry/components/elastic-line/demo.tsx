"use client";

import React from "react";

import ElasticLine from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="w-full px-6 sm:px-8 md:px-12">
				<ElasticLine
					releaseThreshold={50}
					strokeWidth={1}
					animateInTransition={{
						type: "spring",
						stiffness: 300,
						damping: 30,
						delay: 0.15,
					}}
				/>
			</div>{" "}
		</div>
	);
}
