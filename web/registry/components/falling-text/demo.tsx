"use client";

import React from "react";

import FallingText from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="h-[400px]">
				<FallingText
					text={`React Bits is a library of animated and interactive React components designed to streamline UI development and simplify your workflow.`}
					highlightWords={[
						"React",
						"Bits",
						"animated",
						"components",
						"simplify",
					]}
					highlightClass="highlighted"
					trigger="hover"
					backgroundColor="transparent"
					wireframes={false}
					gravity={0.56}
					fontSize="2rem"
					mouseConstraintStiffness={0.9}
				/>
			</div>{" "}
		</div>
	);
}
