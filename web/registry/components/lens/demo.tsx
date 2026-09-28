"use client";

import React from "react";

import Image from "next/image";

import { Lens } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<Lens>
				<Image
					src={"/itjustworks.jpg"}
					alt={"it just woks"}
					width={100}
					height={100}
					className="object-cover max-h-[80vh] w-auto mx-auto border-8 border-background"
				/>
			</Lens>{" "}
		</div>
	);
}
