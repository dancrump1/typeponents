import React, { useEffect, useRef, useState } from "react";

export default function TabsBasic() {
	const [tabSelected, setTabSelected] = useState({
		currentTab: 1,
		noTabs: 3,
	});

	const wrapperRef = useRef(null);

	const handleKeyDown = (e) => {
		if (e.keyCode === 39) {
			if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
				if (
					tabSelected.currentTab >= 1 &&
					tabSelected.currentTab < tabSelected.noTabs
				) {
					setTabSelected({
						...tabSelected,
						currentTab: tabSelected.currentTab + 1,
					});
				} else {
					setTabSelected({
						...tabSelected,
						currentTab: 1,
					});
				}
			}
		}

		if (e.keyCode === 37) {
			if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
				if (
					tabSelected.currentTab > 1 &&
					tabSelected.currentTab <= tabSelected.noTabs
				) {
					setTabSelected({
						...tabSelected,
						currentTab: tabSelected.currentTab - 1,
					});
				} else {
					setTabSelected({
						...tabSelected,
						currentTab: tabSelected.noTabs,
					});
				}
			}
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	});

	return (
		<>
			{/*<!-- Component: Basic base sized tab --> */}
			<section className="max-w-full" aria-multiselectable="false">
				<ul
					className="flex items-center border-b border-slate-200"
					role="tablist"
					ref={wrapperRef}
				>
					<li className="" role="presentation">
						<button
							className={`-mb-px inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-5 text-sm font-medium tracking-wide transition duration-300 hover:bg-emerald-50 hover:stroke-emerald-600 focus:bg-emerald-50 focus-visible:outline-hidden disabled:cursor-not-allowed ${
								tabSelected.currentTab === 1
									? "border-emerald-500 stroke-emerald-500 text-emerald-500 hover:border-emerald-600  hover:text-emerald-600 focus:border-emerald-700 focus:stroke-emerald-700 focus:text-emerald-700 disabled:border-slate-500"
									: "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-emerald-500 hover:text-emerald-500 focus:border-emerald-600 focus:stroke-emerald-600 focus:text-emerald-600 disabled:text-slate-500"
							}`}
							id="tab-label-1b"
							role="tab"
							aria-setsize="3"
							aria-posinset="1"
							tabIndex={tabSelected.currentTab === 1 ? 0 : -1}
							aria-controls="tab-panel-1b"
							aria-selected={`${
								tabSelected.currentTab === 1 ? "true" : "false"
							}`}
							onClick={() =>
								setTabSelected({ ...tabSelected, currentTab: 1 })
							}
						>
							<span>Tab 1</span>
						</button>
					</li>
					<li className="" role="presentation">
						<button
							className={`-mb-px inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-5 text-sm font-medium tracking-wide transition duration-300 hover:bg-emerald-50 hover:stroke-emerald-600 focus:bg-emerald-50 focus-visible:outline-hidden disabled:cursor-not-allowed ${
								tabSelected.currentTab === 2
									? "border-emerald-500 stroke-emerald-500 text-emerald-500 hover:border-emerald-600  hover:text-emerald-600 focus:border-emerald-700 focus:stroke-emerald-700 focus:text-emerald-700 disabled:border-slate-500"
									: "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-emerald-500 hover:text-emerald-500 focus:border-emerald-600 focus:stroke-emerald-600 focus:text-emerald-600 disabled:text-slate-500"
							}`}
							id="tab-label-2b"
							role="tab"
							aria-setsize="3"
							aria-posinset="2"
							tabIndex={tabSelected.currentTab === 2 ? 0 : -1}
							aria-controls="tab-panel-2b"
							aria-selected={`${
								tabSelected.currentTab === 2 ? "true" : "false"
							}`}
							onClick={() =>
								setTabSelected({ ...tabSelected, currentTab: 2 })
							}
						>
							<span>Tab 2</span>
						</button>
					</li>
					<li className="" role="presentation">
						<button
							className={`-mb-px inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-t border-b-2 px-5 text-sm font-medium tracking-wide transition duration-300 hover:bg-emerald-50 hover:stroke-emerald-600 focus:bg-emerald-50 focus-visible:outline-hidden disabled:cursor-not-allowed ${
								tabSelected.currentTab === 3
									? "border-emerald-500 stroke-emerald-500 text-emerald-500 hover:border-emerald-600  hover:text-emerald-600 focus:border-emerald-700 focus:stroke-emerald-700 focus:text-emerald-700 disabled:border-slate-500"
									: "justify-self-center border-transparent stroke-slate-700 text-slate-700 hover:border-emerald-500 hover:text-emerald-500 focus:border-emerald-600 focus:stroke-emerald-600 focus:text-emerald-600 disabled:text-slate-500"
							}`}
							id="tab-label-3b"
							role="tab"
							aria-setsize="3"
							aria-posinset="3"
							tabIndex={tabSelected.currentTab === 3 ? 0 : -1}
							aria-controls="tab-panel-3b"
							aria-selected={`${
								tabSelected.currentTab === 3 ? "true" : "false"
							}`}
							onClick={() =>
								setTabSelected({ ...tabSelected, currentTab: 3 })
							}
						>
							<span>Tab 3</span>
						</button>
					</li>
				</ul>
				<div className="">
					<div
						className={`px-5 py-4 ${
							tabSelected.currentTab === 1 ? "" : "hidden"
						}`}
						id="tab-panel-1b"
						aria-hidden={`${tabSelected.currentTab === 1 ? "true" : "false"}`}
						role="tabpanel"
						aria-labelledby="tab-label-1b"
						tabIndex={-1}
					>
						<p>
							What is the recipe for successful achievement? To my mind
							there are just four essential ingredients: Choose a career
							you love, give it the best there is in you, seize your
							opportunities, and be a member of the team.
						</p>
					</div>
					<div
						className={`px-5 py-4 ${
							tabSelected.currentTab === 2 ? "" : "hidden"
						}`}
						id="tab-panel-2b"
						aria-hidden={`${tabSelected.currentTab === 2 ? "true" : "false"}`}
						role="tabpanel"
						aria-labelledby="tab-label-2b"
						tabIndex={-1}
					>
						<p>
							One must be entirely sensitive to the structure of the
							material that one is handling. One must yield to it in tiny
							details of execution, perhaps the handling of the surface
							or grain, and one must master it as a whole.
						</p>
					</div>
					<div
						className={`px-5 py-4 ${
							tabSelected.currentTab === 3 ? "" : "hidden"
						}`}
						id="tab-panel-3b"
						aria-hidden={`${tabSelected.currentTab === 3 ? "true" : "false"}`}
						role="tabpanel"
						aria-labelledby="tab-label-3b"
						tabIndex={-1}
					>
						<p>
							Even though there is no certainty that the expected results
							of our work will manifest, we have to remain committed to
							our work and duties; because, even if the results are
							slated to arrive, they cannot do so without the performance
							of work.
						</p>
					</div>
				</div>
			</section>
			{/*<!-- End Basic base sized tab --> */}
		</>
	);
}
