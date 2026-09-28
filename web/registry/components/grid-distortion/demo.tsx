"use client";

import GridDistortion from "./component";

export default function Usage() {
	return (
		<div className="h-[500px] w-full">
			<GridDistortion
				imageSrc="https://picsum.photos/1920/1080?grayscale"
				grid={12}
				mouse={0.1}
				strength={0.15}
				relaxation={0.9}
			/>
		</div>
	);
}
