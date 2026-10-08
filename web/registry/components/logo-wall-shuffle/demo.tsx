"use client";

import LogoWallShuffle from "./component";

const logos = [
	{ src: "/stackbits/react.svg", alt: "React" },
	{ src: "/stackbits/nextjs.svg", alt: "Next.js" },
	{ src: "/stackbits/typescript.svg", alt: "TypeScript" },
	{ src: "/stackbits/javascript.svg", alt: "JavaScript" },
	{ src: "/stackbits/nodejs.svg", alt: "Node.js" },
	{ src: "/stackbits/tailwindcss.svg", alt: "Tailwind CSS" },
	{ src: "/stackbits/threejs.svg", alt: "Three.js" },
	{ src: "/stackbits/css.svg", alt: "CSS" },
	{ src: "/stackbits/express.svg", alt: "Express" },
];

export default function Usage() {
	return <LogoWallShuffle logos={logos} columns={[2, 3, 2]} />;
}
