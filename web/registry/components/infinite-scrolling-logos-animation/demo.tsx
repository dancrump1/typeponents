"use client";

import InfiniteScrollingLogosAnimation from "./component";

const assets = [
	{ src: "/itjustworks.jpg", alt: "Logo 1" },
	{ src: "/itjustworks.jpg", alt: "Logo 2" },
	{ src: "/itjustworks.jpg", alt: "Logo 3" },
];

export default function Usage() {
	return (
		<div className="w-full py-8">
			<InfiniteScrollingLogosAnimation assets={assets} />
		</div>
	);
}
