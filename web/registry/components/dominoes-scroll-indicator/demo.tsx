"use client";

import DominoesScrollIndicator from "./component";
import Image from "next/image";

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
		<div className="relative h-[480px] w-full overflow-hidden">
			<div className="h-full w-full flex items-start justify-center gap-2 relative overflow-hidden">
  <div id="dominoes-scroll-target" className="h-full w-full overflow-y-scroll">
    <div className="flex flex-col items-center justify-start gap-2 pb-14">
      {images.map((image, i) => {
        return (
          <Image key={i} src={image.image} alt={image.image} width={512} height={512} />
        );
      })}
    </div>
  </div>

  <div className="absolute bottom-4 right-4 z-[999] bg-black/50 p-2 rounded">
    <DominoesScrollIndicator
      scrollContainerId="dominoes-scroll-target"
      direction="vertical"
    />
  </div>
</div>
		</div>
	);
}
