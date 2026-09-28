"use client";

import { DirectionAwareHover } from "./component";

export default function DirectionAwareHoverDemo() {
	const imageUrl = "/itjustworks.jpg";
	return (
		<div className="h-160 relative  flex items-center justify-center">
			<DirectionAwareHover imageUrl={imageUrl}>
				<p className="font-bold text-xl">In the mountains</p>
				<p className="font-normal text-sm">$1299 / night</p>
			</DirectionAwareHover>
		</div>
	);
}
