"use client";

import { SandboxProvider } from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<SandboxProvider />
		</div>
	);
}
