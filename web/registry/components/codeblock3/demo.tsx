"use client";

import CodeBlock3 from "./component";

export default function Usage() {
	return (
		<div className="max-w-2xl p-8">
			<CodeBlock3
				tabs={[
					{ label: "npm", code: "npm install motion", language: "bash" },
					{ label: "pnpm", code: "pnpm add motion", language: "bash" },
					{ label: "yarn", code: "yarn add motion", language: "bash" },
				]}
			/>
		</div>
	);
}
