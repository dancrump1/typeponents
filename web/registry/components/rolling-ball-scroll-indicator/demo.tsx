"use client";

import RollingBallScrollIndicator from "./component";
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
			<div className="h-full w-full flex items-start justify-center gap-2 relative">
    <div
        id="scroll-target"
        className="h-full w-full overflow-y-scroll absolute top-0 left-0"
    >
        <div className="flex flex-col items-center justify-start gap-2 pb-14">
        {images.map((image, i) => {
            return (
            <Image key={i} src={image.image} alt={image.image} width={512} height={512} />
            );
        })}
        </div>
    </div>
    <div className="sticky top-full right-10 z-[999] w-full bg-black/50 p-2 flex items-end justify-center backdrop-blur-xl h-14">
        <RollingBallScrollIndicator scrollContainerId="scroll-target" direction="vertical" />
    </div>
</div>
		</div>
	);
}
