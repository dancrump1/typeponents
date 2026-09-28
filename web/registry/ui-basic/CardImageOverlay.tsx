import React from "react";

export default function CardImageOverlay() {
	return (
		<>
			{/*<!-- Component: Image overlay card --> */}
			<div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
				{/*  <!-- Image --> */}
				<figure className="relative">
					<img
						src="/itjustworks.jpg"
						alt="card image"
						className="aspect-video w-full"
					/>
					<figcaption className="absolute bottom-0 left-0 w-full bg-linear-to-t from-slate-900 p-6 text-white">
						<h3 className="text-lg font-medium ">Most famous beaches</h3>
						<p className="text-sm opacity-75"> By George, jun 3 2023</p>
					</figcaption>
				</figure>
			</div>
			{/*<!-- End Image overlay card --> */}
		</>
	);
}
