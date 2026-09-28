import React from "react";

export default function FeedTimelineWithImages() {
	return (
		<>
			{/*<!-- Component: Alternative changelog feed with images --> */}
			<ul
				aria-label="Alternative changelog feed with images"
				role="feed"
				className="relative flex flex-col gap-12 py-12 pl-6 before:absolute before:left-6 before:top-0 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:bottom-6 after:left-6 after:top-6 after:-translate-x-1/2 after:border after:border-slate-200 lg:pl-0 lg:before:left-34 lg:after:left-34"
			>
				<li
					role="article"
					className="relative pl-6 before:absolute before:left-0 before:top-2 before:z-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-emerald-500 before:ring-2 before:ring-white lg:flex lg:gap-12 lg:pl-0 lg:before:left-34"
				>
					<h4 className="hidden text-lg font-medium leading-7 text-slate-500 lg:block lg:w-28 lg:text-right">
						2023-07-15
					</h4>
					<div className="flex flex-1 flex-col gap-4">
						<h3 className="text-lg font-medium leading-7 text-emerald-500">
							v2.1.0: UI Overhaul{" "}
							<span className="font-normal text-slate-500 lg:hidden">
								{" "}
								- 2023-07-15
							</span>
						</h3>
						<div className="overflow-hidden rounded border border-slate-100 bg-slate-50">
							<img
								src="https://Tailwindmix.b-cdn.net/feeds/changelog_feed-variation-image-01.png"
								alt="Changelog image"
								width="1000"
								height="500"
							/>
						</div>
						<p className="text-slate-500">
							This release brings a fresh, modern design to our
							components, improving aesthetics and usability. New
							animations and interactions make the experience more
							engaging.
						</p>
						<ul className="list-disc pl-5 text-slate-500 marker:text-emerald-500">
							<li>Revamped layout for greater flexibility</li>
							<li>New animations for interactive elements</li>
							<li>Updated color schemes for better contrast</li>
						</ul>
					</div>
				</li>
				<li
					role="article"
					className="relative pl-6 before:absolute before:left-0 before:top-2 before:z-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-emerald-500 before:ring-2 before:ring-white lg:flex lg:gap-12 lg:pl-0 lg:before:left-34"
				>
					<h4 className="hidden text-lg font-medium leading-7 text-slate-500 lg:block lg:w-28 lg:text-right">
						2023-06-01
					</h4>
					<div className="flex flex-1 flex-col gap-4">
						<h3 className="text-lg font-medium leading-7 text-emerald-500">
							v2.0.2: Minor Updates{" "}
							<span className="font-normal text-slate-500 lg:hidden">
								{" "}
								- 2023-06-01
							</span>
						</h3>
						<p className="text-slate-500">
							This minor update addresses small UI tweaks and bug fixes
							to improve the user experience.
						</p>
						<ul className="list-disc pl-5 text-slate-500 marker:text-emerald-500">
							<li>Fixed alignment issues on mobile</li>
							<li>Improved font rendering for better readability</li>
							<li>Enhanced button styles for accessibility</li>
						</ul>
					</div>
				</li>
				<li
					role="article"
					className="relative pl-6 before:absolute before:left-0 before:top-2 before:z-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-emerald-500 before:ring-2 before:ring-white lg:flex lg:gap-12 lg:pl-0 lg:before:left-34"
				>
					<h4 className="hidden text-lg font-medium leading-7 text-slate-500 lg:block lg:w-28 lg:text-right">
						2023-06-25
					</h4>
					<div className="flex flex-1 flex-col gap-4">
						<h3 className="text-lg font-medium leading-7 text-emerald-500">
							v2.0.5: Performance Enhancements{" "}
							<span className="font-normal text-slate-500 lg:hidden">
								{" "}
								- 2023-06-25
							</span>
						</h3>
						<div className="overflow-hidden rounded border border-slate-100 bg-slate-50">
							<img
								src="https://Tailwindmix.b-cdn.net/feeds/changelog_feed-variation-image-02.png"
								alt="Changelog image"
								width="1000"
								height="500"
							/>
						</div>
						<p className="text-slate-500">
							We've streamlined our codebase and optimized loading times,
							ensuring smoother performance across devices. This update
							also brings several minor bug fixes.
						</p>
						<ul className="list-disc pl-5 text-slate-500 marker:text-emerald-500">
							<li>Reduced load time by 25%</li>
							<li>Improved rendering speed for mobile devices</li>
							<li>Fixed minor UI bugs</li>
						</ul>
					</div>
				</li>
			</ul>
			{/*<!-- End Alternative changelog feed with images --> */}
		</>
	);
}
