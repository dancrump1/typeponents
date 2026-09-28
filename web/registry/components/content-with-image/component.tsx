import React from "react";

import Image from "next/image";

const ContentWithImage = ({ image = {} }) => {
	return (
		<div className="mx-auto max-w-(--breakpoint-xl) px-4 py-8 sm:px-6 lg:px-8">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
				<div>
					<div className="max-w-lg md:max-w-none">
						<h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
						</h2>

						<p className="mt-4 text-foreground">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Tenetur doloremque saepe architecto maiores repudiandae
							amet perferendis repellendus, reprehenderit voluptas sequi.
						</p>
					</div>
				</div>

				<div>
					<Image
						key={image.uid}
						className="cursor-target h-full w-full object-cover rounded"
						src={
							image?.url ||
							"https://images.unsplash.com/photo-1731690415686-e68f78e2b5bd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						}
						title={image.alt}
						alt={image.alt || image.title || "cont-w/-img"}
						width={image.width || 1920}
						height={image.height || 1080}
						priority
						loading="eager"
						style={
							image.focalPoint
								? {
										objectPosition: `${
											image.focalPoint[0] * 100
										}% ${image.focalPoint[1] * 100}%`,
									}
								: {}
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default ContentWithImage;
