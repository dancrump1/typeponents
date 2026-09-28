"use client";

import MaskCursorEffect from "./component";

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center overflow-hidden p-8">
			<div className="h-full w-full flex flex-col gap-5 items-center justify-center overflow-y-auto relative p-10">
  <MaskCursorEffect
    hiddenComponent={
      <div className="max-w-4xl text-7xl font-bold">
        I'm a "full-stack developer" powered by Stack Overflow and prayer. My code is 10%
        genius, 90% duct tape.
      </div>
    }
  >
    <div className="max-w-4xl text-7xl font-bold">
      I'm a software engineer specializing in React, Next.js, and TypeScript. I build
      creative interfaces with solid backend logic.
    </div>
  </MaskCursorEffect>
</div>
		</div>
	);
}
