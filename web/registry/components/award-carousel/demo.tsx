"use client";

import React from "react";

import AwardsCarousel from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<AwardsCarousel
				Award={[
					{
						Brand: "Tech Radar",
						Award: "Best of MWC",
						Saying:
							"This small wearable AI tech impressed us with a hands-free way to get answers and record video in a pin-ch.",
					},
					{
						Brand: "Tom's Guide",
						Award: "Best AI Pin",
						Saying:
							"The basic idea behind the Humane Ai Pin is to get you to use your phones less so you can be more present, while still keeping you connected.",
					},
					{
						Brand: "Apple",
						Award: "Ultra Pro Max",
						Saying:
							"It demonstrates that you need a smartphone for most of the things we use a AI Pin for, freeing you to be more present in the moment and with other people.",
					},
					{
						Brand: "Samsung",
						Award: "Editor's Choice",
						Saying:
							"There’s a futuristic air about the Humane Ai Pin that we can’t help but get excited about.",
					},
				]}
			/>
		</div>
	);
}
