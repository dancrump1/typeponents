"use client";

import React from "react";

import { MaskContainer } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<MaskContainer revealText="it just works">
				<div>Some content</div>
			</MaskContainer>
		</div>
	);
}
