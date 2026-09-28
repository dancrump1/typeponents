import React from "react";

export default function ButtonGroupRounded() {
	return (
		<>
			{/*<!-- Component: Base sized primary basic button group --> */}
			<div className="inline-flex overflow-hidden rounded-full">
				<button className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
					<span>Base button</span>
				</button>
				<button className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
					<span>Base button</span>
				</button>
				<button className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap bg-emerald-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none">
					<span>Base button</span>
				</button>
			</div>
			{/*<!-- End Base sized primary basic button group --> */}
		</>
	);
}
