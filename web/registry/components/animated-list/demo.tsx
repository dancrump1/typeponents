"use client";

import React from "react";

import AnimatedList from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<AnimatedList
				items={[
					"Item 1",
					"Item 2",
					"Item 3",
					"Item 4",
					"Item 5",
					"Item 6",
					"Item 7",
					"Item 8",
					"Item 9",
					"Item 10",
				]}
				onItemSelect={(item, index) => console.log(item, index)}
				showGradients={true}
				enableArrowNavigation={true}
				displayScrollbar={true}
			/>
		</div>
	);
}
