import React from "react";

import { BackgroundGradientAnimation } from "./component";

export default function BackgroundGradientAnimationDemo() {
	return (
		<BackgroundGradientAnimation>
			<div className="absolute z-50 inset-0 flex items-center justify-center text-secondary font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
				<p className="bg-clip-text text-transparent drop-shadow-2xl bg-linear-to-b from-background/80 to-background/20">
					Gradients X Animations
				</p>
			</div>
		</BackgroundGradientAnimation>
	);
}
