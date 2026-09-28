"use client";

import { GifText } from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<GifText gifUrl="/itjustworks.jpg" text="Animated GIF Text" />
		</div>
	);
}
