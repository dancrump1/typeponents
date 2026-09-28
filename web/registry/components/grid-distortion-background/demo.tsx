"use client";

import GridDistortion from "./component";

export default function Usage() {
	return (
		<div className="relative h-[28rem] w-full overflow-hidden">
			<GridDistortion>
				<div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center text-white">
					<p className="text-sm opacity-80">Grid Distortion Background</p>
					<h1 className="mt-2 max-w-lg text-2xl font-semibold">
						A canvas mesh that warps toward the pointer
					</h1>
				</div>
			</GridDistortion>
		</div>
	);
}
