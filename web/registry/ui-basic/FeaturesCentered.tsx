import React from "react";

export default function FeatureCentered() {
	return (
		<>
			{/*          <!-- Component: Feature item with square icon title and text --> */}
			<div className="flex flex-col items-center gap-4 text-center">
				<div className="flex items-center rounded bg-emerald-500 p-2 text-white">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="h-6 w-6"
						aria-label="Dashboard icon"
						role="graphics-symbol"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
						/>
					</svg>
				</div>
				<div className="flex w-full min-w-0 flex-col items-center justify-center gap-0 text-base">
					<h3 className="mb-2 py-2 text-lg leading-6 text-slate-700">
						Responsive Design
					</h3>
					<p className="text-slate-500">
						Wind UI ensures your web application looks and functions
						flawlessly on various devices, from smartphones to desktops.
					</p>
				</div>
			</div>
			{/*          <!-- End Feature item with square icon title and text --> */}
		</>
	);
}
