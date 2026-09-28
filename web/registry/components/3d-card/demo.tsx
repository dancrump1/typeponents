"use client";

import React from "react";

import {
	CardBody,
	CardContainer,
	CardItem,
} from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<CardContainer className="inter-var">
				<CardBody className="bg-background relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 dark:bg-background dark:border-white/20 border-black/10 w-auto sm:w-120 h-auto rounded-xl p-6 border  ">
					<CardItem
						translateZ="50"
						className="text-xl font-bold text-secondary dark:text-secondary"
					>
						Make things float in air
					</CardItem>
					<CardItem
						as="p"
						translateZ="60"
						className="text-secondary text-sm max-w-sm mt-2 dark:text-secondary"
					>
						Hover over this card to unleash the power of CSS perspective
					</CardItem>
					<CardItem translateZ="100" className="w-full mt-4">
						<img
							src="/itjustworks.jpg"
							height="1000"
							width="1000"
							className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
							alt="thumbnail"
						/>
					</CardItem>
					<div className="flex justify-between items-center mt-20">
						<CardItem
							translateZ={20}
							as="a"
							href="https://twitter.com/mannupaaji"
							target="__blank"
							className="px-4 py-2 rounded-xl text-xs font-normal dark:text-secondary"
						>
							Try now →
						</CardItem>
						<CardItem
							translateZ={20}
							as="button"
							className="px-4 py-2 rounded-xl bg-background dark:bg-background dark:text-secondary text-secondary text-xs font-bold"
						>
							Sign up
						</CardItem>
					</div>
				</CardBody>
			</CardContainer>
		</div>
	);
}
