"use client";

import PixelatedCarousel from "./component";

const images = [
  {
    "image": "https://picsum.photos/seed/stackbits1/800/800"
  },
  {
    "image": "https://picsum.photos/seed/stackbits2/800/800"
  },
  {
    "image": "https://picsum.photos/seed/stackbits3/800/800"
  },
  {
    "image": "https://picsum.photos/seed/stackbits4/800/800"
  },
  {
    "image": "https://picsum.photos/seed/stackbits5/800/800"
  },
  {
    "image": "https://picsum.photos/seed/stackbits6/800/800"
  },
  {
    "image": "https://picsum.photos/seed/stackbits7/800/800"
  },
  {
    "image": "https://picsum.photos/seed/stackbits8/800/800"
  },
  {
    "image": "https://picsum.photos/seed/stackbits9/800/800"
  },
  {
    "image": "https://picsum.photos/seed/stackbits10/800/800"
  }
];

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center overflow-hidden p-8">
			<div className="h-[1000px] w-full flex items-center justify-center">
  <div className="h-[500px] w-[800px]">
    <PixelatedCarousel
      pixelSize={50}
      pixelTransitionDuration={0.01}
      images={["https://picsum.photos/seed/godofwar/800/500", "https://picsum.photos/seed/lastofus/800/500", "https://picsum.photos/seed/rdr2/800/500", "https://picsum.photos/seed/uncharted/800/500"]}
    />
  </div>
</div>
		</div>
	);
}
