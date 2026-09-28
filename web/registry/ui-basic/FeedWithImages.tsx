import React from "react";

export default function FeedWithImages() {
	return (
		<>
			{/*<!-- Component: Changelog feed with images --> */}
			<ul
				aria-label="Changelog feed"
				role="feed"
				className="relative flex flex-col gap-12 py-12 pl-6 before:absolute before:left-6 before:top-0 before:h-full before:-translate-x-1/2 before:border before:border-dashed before:border-slate-200 after:absolute after:bottom-6 after:left-6 after:top-6 after:-translate-x-1/2 after:border after:border-slate-200"
			>
				<li
					role="article"
					className="relative pl-6 before:absolute before:left-0 before:top-2 before:z-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-emerald-500 before:ring-2 before:ring-white"
				>
					<div className="flex flex-1 flex-col gap-4">
						<h4 className="text-lg font-medium text-emerald-500">
							v2.2.1: Accessibility Improvements{" "}
							<span className="text-lg font-normal text-slate-500">
								{" "}
								- 2023-09-03
							</span>
						</h4>
						<div className="overflow-hidden rounded border border-slate-100 bg-slate-50">
							<img
								src="https://Tailwindmix.b-cdn.net/feeds/changelog_feed-variation-image-03.png"
								alt="Changelog image"
								width="1000"
								height="500"
							/>
						</div>
						<p className="text-slate-500">
							Focused on enhancing accessibility across all components,
							making the template more user-friendly for people with
							disabilities. Improved keyboard navigation and screen
							reader support.
						</p>
						<ul className="list-disc pl-5 text-slate-500 marker:text-emerald-500">
							<li>Improved keyboard focus states</li>
							<li>
								Enhanced ARIA labels for better screen reader support
							</li>
							<li>Optimized color contrast for better visibility</li>
						</ul>
					</div>
				</li>
				<li
					role="article"
					className="relative pl-6 before:absolute before:left-0 before:top-2 before:z-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-emerald-500 before:ring-2 before:ring-white"
				>
					<div className="flex flex-1 flex-col gap-4">
						<h4 className="text-lg font-medium text-emerald-500">
							v2.1.6: Security Patch{" "}
							<span className="text-lg font-normal text-slate-500">
								{" "}
								- 2023-08-01
							</span>
						</h4>
						<p className="text-slate-500">
							A security patch addressing vulnerabilities reported in the
							previous version. It's recommended for all users to update
							to this version to maintain secure operations.
						</p>
						<ul className="list-disc pl-5 text-slate-500 marker:text-emerald-500">
							<li>Fixed CSRF vulnerability in forms</li>
							<li>Updated authentication mechanisms</li>
							<li>Improved session management for enhanced security</li>
						</ul>
					</div>
				</li>
				<li
					role="article"
					className="relative pl-6 before:absolute before:left-0 before:top-2 before:z-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full before:bg-emerald-500 before:ring-2 before:ring-white"
				>
					<div className="flex flex-1 flex-col gap-4">
						<h4 className="text-lg font-medium text-emerald-500">
							v2.2.3: New Components{" "}
							<span className="text-lg font-normal text-slate-500">
								{" "}
								- 2023-10-01
							</span>
						</h4>
						<div className="overflow-hidden rounded border border-slate-100 bg-slate-50">
							<img
								src="https://Tailwindmix.b-cdn.net/feeds/changelog_feed-variation-image-04.png"
								alt="Changelog image"
								width="1000"
								height="500"
							/>
						</div>
						<p className="text-slate-500">
							Introducing several new components to enhance UI
							capabilities, including new card designs, tabbed
							navigation, and progress indicators. These additions allow
							for more flexibility in building pages.
						</p>
						<ul className="list-disc pl-5 text-slate-500 marker:text-emerald-500">
							<li>New card component with hover effects</li>
							<li>Tabbed navigation for better organization</li>
							<li>Progress indicators for tracking tasks</li>
						</ul>
					</div>
				</li>
			</ul>
			{/*<!-- End Changelog feed with images--> */}
		</>
	);
}
