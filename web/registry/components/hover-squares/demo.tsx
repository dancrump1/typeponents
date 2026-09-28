"use client";

import React from "react";

import { ClipPathLinks } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="bg-background px-4 py-12">
				<div className="mx-auto max-w-7xl">
					<ClipPathLinks />
				</div>
			</div>{" "}
		</div>
	);
}
