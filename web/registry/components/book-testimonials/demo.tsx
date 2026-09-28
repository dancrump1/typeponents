"use client";

import React from "react";

import BookTestimonial3D from "./component";
import { testimonials } from "@/lib/example-data";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<BookTestimonial3D testimonials={testimonials} />
		</div>
	);
}
