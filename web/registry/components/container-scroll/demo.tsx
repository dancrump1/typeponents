"use client";

import React from "react";

import { ContainerScroll } from "./component";

export default function Usage() {
	return (
		<div className="flex flex-col overflow-hidden">
			<ContainerScroll
				titleComponent={
					<>
						<h1 className="text-4xl font-semibold text-secondary dark:text-secondary">
							Unleash the power of <br />
							<span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
								Scroll Animations
							</span>
						</h1>
					</>
				}
			>
				<img
					src={`/itjustworks.jpg`}
					alt="hero"
					height={720}
					width={1400}
					className="mx-auto rounded-2xl object-cover h-full object-top-left"
					draggable={false}
				/>
			</ContainerScroll>
		</div>
	);
}
