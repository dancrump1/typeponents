"use client";

import CodeBlock from "./component";

export default function Usage() {
	return (
		<div className="max-w-2xl p-8">
			<CodeBlock
				language="typescript"
				filename="example.ts"
				code={`export function greet(name: string) {
  return \`Hello, \${name}!\`;
}`}
			/>
		</div>
	);
}
