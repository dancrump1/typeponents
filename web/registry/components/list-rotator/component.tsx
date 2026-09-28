import React, { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import styled from "styled-components";

// Credit:
// https://github.com/PhanDangKhoa96/ui-collections

const listItems = [
	{ text: "Web", emphasizedText: "Design" },
	{ text: "Mobile", emphasizedText: "App Development" },
	{ text: "E-Commerce", emphasizedText: "Solutions" },
	{ text: "Digital", emphasizedText: "Marketing" },
	{ text: "UI/UX", emphasizedText: "Design" },
	{ text: "Brand", emphasizedText: "Strategy" },
	{ text: "SEO", emphasizedText: "Optimization" },
	{ text: "Social", emphasizedText: "Media Management" },
	{ text: "Content", emphasizedText: "Creation" },
	{ text: "Data", emphasizedText: "Analytics" },
];
gsap.registerPlugin(ScrollTrigger);

const RotatorWrapper = styled.div`
	-webkit-mask-image: -webkit-linear-gradient(
		transparent 25%,
		black 40%,
		black 60%,
		transparent 75%
	);
`;

const ListRotator = ({}) => {
	const $wrapper = useRef<HTMLDivElement>(null);
	const $triggerPoint = useRef<HTMLDivElement>(null);
	const $listRotator = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const items = $wrapper.current?.querySelectorAll("li");
			const totalItems = listItems.length - 1;
			const angleIncrement = 180 / totalItems;

			items?.forEach((item, index) => {
				const rotationAngle = index * angleIncrement;
				const fontSize = gsap.getProperty(item, "fontSize") as string;
				const lineHeight = gsap.getProperty(item, "lineHeight") as string;
				const translateZ =
					(parseFloat(fontSize) + parseFloat(lineHeight)) * 1.8;

				gsap.set(item, {
					rotationX: -rotationAngle,
					transformOrigin: `center center 0`,
					transform: `rotateX(${-rotationAngle}deg) translateZ(${translateZ}px)`,
					zIndex: totalItems - index,
				});
			});

			gsap.set($listRotator.current, { rotationX: -90 });

			gsap.to($listRotator.current, {
				rotationX: 270,
				scrollTrigger: {
					trigger: $triggerPoint.current,
					// scroller: ".scroll-container",
					start: "top top",
					// markers: true,
					scrub: true,
				},
			});
		}, $wrapper);
		return () => {
			ctx.revert();
		};
	}, []);

	return (
		<div className="h-screen overflow-auto">
			<div ref={$wrapper}>
				<RotatorWrapper
					className="sticky h-screen top-0 grid place-items-center bg-background"
					style={{
						perspective: "10000px",
					}}
				>
					<ul
						className="relative flex h-full w-full flex-col gap-y-5"
						style={{
							transformStyle: "preserve-3d",
							backfaceVisibility: "hidden",
						}}
						ref={$listRotator}
					>
						{listItems.map((item, index) => {
							return (
								<li
									key={index + "list-rotator"}
									className="absolute top-1/2 w-full whitespace-nowrap text-center text-[calc(1rem+3vw)] leading-[calc(1rem+3.5vw)]"
									style={{
										backfaceVisibility: "hidden",
										transformStyle: "preserve-3d",
									}}
								>
									<span className="font-light">{item.text}</span>{" "}
									<strong className="text-indigo-700">
										{item.emphasizedText}
									</strong>
								</li>
							);
						})}
					</ul>
				</RotatorWrapper>

				<div className="h-[300vh]" ref={$triggerPoint}></div>
				{/* <div className="h-screen"></div> */}
			</div>
		</div>
	);
};

export default ListRotator;
