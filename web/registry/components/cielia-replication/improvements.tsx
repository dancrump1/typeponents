"use client";

import React, { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import SectionHeader from "./section-header";

const galleryItems = [
	["/itjustworks.jpg", "/itjustworks.jpg", "/itjustworks.jpg"],
	["/itjustworks.jpg", "/itjustworks.jpg", "/itjustworks.jpg"],
	["/itjustworks.jpg", "/itjustworks.jpg", "/itjustworks.jpg"],
];

const Improvements = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const galleryRef = useRef<HTMLDivElement>(null);
	useGSAP(
		() => {
			const GridSecAnim = gsap.timeline({
				scrollTrigger: {
					// scroller: ".scroll-container",
					trigger: ".gallery-wrapper",
					start: "top 100%",
					end: "top 0%",
					scrub: true,
				},
			});
			GridSecAnim.fromTo(
				".gallery-col:nth-of-type(1)",
				{
					transform: "translateY(-10vh)",
				},
				{
					transform: "translateY(0vh)",
				},
				"<"
			);
			GridSecAnim.fromTo(
				".gallery-col:nth-of-type(2)",
				{
					transform: "translateY(10vh)",
				},
				{
					transform: "translateY(0vh)",
				},
				"<"
			);
			GridSecAnim.fromTo(
				".gallery-col:nth-of-type(3)",
				{
					transform: "translateY(-10vh)",
				},
				{
					transform: "translateY(0vh)",
				},
				"<"
			);

			const gridSecPinAnim = gsap.timeline({
				scrollTrigger: {
					// scroller: ".scroll-container",
					trigger: ".gallery-wrapper",
					start: "top 0%",
					end: "+=200%",
					scrub: true,
					pin: true,
				},
			});

			gridSecPinAnim.fromTo(
				".gallery-col",
				{
					width: "31.97vw",
					height: "150vh",
					filter: "brightness(1)",
				},
				{
					width: "100vw",
					height: "300vh",
					filter: "brightness(0.7)",
				},
				"<"
			);

			gridSecPinAnim.fromTo(
				[".title-wrap", ".desc-wrap"],
				{
					opacity: 0,
				},
				{
					opacity: 1,
				},
				"<"
			);
			gridSecPinAnim.fromTo(
				".title-wrap h2 span",
				{
					clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
				},
				{
					clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
				}
			);
		},
		{ scope: sectionRef }
	);
	return (
		<section className="overflow-hidden" ref={sectionRef}>
			<SectionHeader>Improvements</SectionHeader>
			<div className="gallery-wrapper relative h-screen overflow-hidden">
				<div
					className="gallery absolute left-1/2 top-1/2 flex h-[150vh] w-fit -translate-x-1/2 -translate-y-1/2 scale-110 items-center justify-between gap-8"
					ref={galleryRef}
				>
					{galleryItems.map((cols, index) => (
						<div
							key={index + "improvements"}
							className="gallery-col flex h-full w-[33vw] flex-col gap-8"
						>
							{cols.map((img, colIndex) => (
								<div
									key={colIndex}
									className="gallery-row grid h-[33%] w-full place-items-center overflow-hidden bg-background text-foreground"
								>
									<img
										src={img}
										alt="improve images"
										className="h-full w-full object-cover"
									/>
								</div>
							))}
						</div>
					))}
				</div>

				<div className="title-wrap absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-foreground fs-25-43">
					<h2 className="w-max text-center">
						<span>
							Reevaluating past housing facilities and storage features.
						</span>
						<br />
						<br />
						<span>
							Small improvements can bring great satisfaction to your
							daily life.
						</span>
					</h2>
				</div>

				<div className="desc-wrap absolute bottom-10 right-[3vw] w-[31vw] border-t border-white pt-2.5 text-right text-foreground">
					これまで
				</div>
			</div>
		</section>
	);
};

export default Improvements;
