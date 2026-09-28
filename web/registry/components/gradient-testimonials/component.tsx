"use client";

import React from "react";

const Testimonials = ({ data }) => {
	return (
		<section className="h-fit w-full bg-background">
			<div className="mx-auto flex flex-wrap justify-center gradient-background cont-page">
				{data.map(({ title, comment }) => {
					return (
						<div
							className="relative gradient-card basis-1/3 grow"
							key={title}
						>
							<div
								className="absolute -inset-1 bg-background"
								style={{
									mask: "url(./TextBox_frame.svg)",
									maskSize: "contain",
									maskRepeat: "no-repeat",
								}}
							></div>
							<div className="z-10 relative p-20 text-foreground mix-blend-difference">
								{title}
								{comment}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default Testimonials;
