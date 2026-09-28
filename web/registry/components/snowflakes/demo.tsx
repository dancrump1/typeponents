"use client";

import { useEffect } from "react";

export default function Usage() {
	useEffect(() => {
		void import("./component");
	}, []);

	return (
		<div className="flex h-[500px] w-full items-center justify-center text-sm text-muted-foreground">
			Snowflakes particle background loads on mount
		</div>
	);
}
