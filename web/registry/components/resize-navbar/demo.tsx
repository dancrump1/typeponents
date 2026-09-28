"use client";

import ResizeNavBar from "./component";

const navItems = [
	{ link: "#home", title: "Home" },
	{ link: "#about", title: "About" },
	{ link: "#contact", title: "Contact" },
];

export default function Usage() {
	return (
		<div className="min-h-[300px] w-full">
			<ResizeNavBar navItems={navItems} />
		</div>
	);
}
