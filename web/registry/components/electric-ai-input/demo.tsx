"use client";

import AiInput from "./component";

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center overflow-hidden p-8">
			<AiInput
  width="500px"
  backgroundColor="#0d0d0d" 
  onSubmit={async (value, file) => {
    console.log(value, file);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }}
  animationStyle="orbit" 
/>
		</div>
	);
}
