"use client";

import CodeBlock2 from "./component";

export default function Usage() {
	return (
		<div className="max-w-2xl p-8">
			<CodeBlock2
				tabs={[
					{ label: "install", code: "npm install motion", language: "bash" },
					{ label: "usage", code: "import { motion } from 'motion/react'", language: "typescript" },
				]}
			/>
		</div>
	);
}
