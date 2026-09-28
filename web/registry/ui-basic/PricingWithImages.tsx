import React from "react";

export default function PricingGemEmerald() {
	return (
		<>
			{/*<!-- Component: Gem Pricing Table Emerald Variation --> */}
			<div className="relative max-w-sm mx-auto mt-20 text-center bg-white rounded shadow-lg shadow-slate-20 lg:max-md-full group text-slate-500">
				<img
					src="/itjustworks"
					alt="emerald"
					className="absolute left-1/2 block w-32 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_16px_16px_#84cc1650] transition-transform duration-700 group-hover:-translate-y-2/3"
				/>
				<div className="flex flex-col">
					<header className="flex flex-col gap-6 p-6 pt-28 text-slate-400">
						<h3 className="text-xl font-medium uppercase text-emerald-500">
							Emerald
						</h3>
					</header>
					<div className="w-3 h-3 mx-auto rounded-full bg-emerald-500"></div>
					<div className="p-6">
						<ul className="space-y-4">
							<li className="w-full gap-2">1 public project</li>
							<li className="w-full gap-2">public working space</li>
							<li className="w-full gap-2">unlimited pages</li>
							<li className="w-full gap-2">5 revisions</li>
						</ul>
					</div>
					<footer>
						<button className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 translate-y-1/2 rounded shadow-xl whitespace-nowrap bg-emerald-500 shadow-emerald-100 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-hidden">
							<span>Start now</span>- <span>$0</span>
						</button>
					</footer>
				</div>
			</div>
			{/*<!-- End Gem Pricing Table Emerald Variation --> */}
		</>
	);
}
