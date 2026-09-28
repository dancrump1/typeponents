"use client";

import React from "react";

import Testimonials from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<Testimonials
				data={[
					{
						title: "testimonial 1",
						comment: "etst",
					},
					{
						title: "testimonial 2",
						comment: "etst",
					},
					{
						title: "testimonial 3",
						comment: "etst",
					},
				]}
			/>
		</div>
	);
}
