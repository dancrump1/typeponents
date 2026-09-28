"use client";

import IconWheel from "./component";

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center overflow-hidden p-8">
			<IconWheel
	icons={[
		"/stackbits/css.svg",
		"/stackbits/javascript.svg",
		"/stackbits/nextjs.svg",
		"/stackbits/nodejs.svg",
		"/stackbits/react.svg",
		"/stackbits/tailwindcss.svg",
		"/stackbits/typescript.svg",
		"/stackbits/threejs.svg",
	]}
	radius={75}
	className="!h-[32px] !w-[32px]"
/>
		</div>
	);
}
