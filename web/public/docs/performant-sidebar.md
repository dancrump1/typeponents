# Performant Sidebar

- Categories: Navigation
- Import: `@/components/ui/performant-sidebar/component`
- Inspiration: joshuawootonn.com (adaptation) — https://www.joshuawootonn.com/react-treeview-component

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/performant-sidebar.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `clsx`
- `is-hotkey`
- `lodash.clamp`
- `motion`
- `uuid`

## Usage

```tsx
import { PointerEvent as ReactPointerEvent, useRef, useState } from "react";

import { Content } from "./component";
import { TreeviewComponent } from "./treeview";
import clsx from "clsx";
import clamp from "lodash.clamp";

// Credit:
// https://www.joshuawootonn.com/sidebar-animation-performance

const Open = {
	Open: "open",
	Closed: "closed",
} as const;

type Open = (typeof Open)[keyof typeof Open];

export default function GitlabSidebarPage({ isDemo = false }) {
	const [selected, select] = useState<string | null>(null);
	const [width, setWidth] = useState(250);
	const originalWidth = useRef(width);
	const originalClientX = useRef(width);
	const [isDragging, setDragging] = useState(false);
	const [isOpen, setOpen] = useState<Open>(Open.Open);

	return (
		<div className="flex w-screen justify-start items-start h-screen relative">
			<nav
				className={clsx(
					"fixed top-0 bottom-0 left-0 flex flex-col space-y-2 h-screen max-h-screen shrink-0 bg-[rgb(251,251,250)] transition-transform ease-[cubic-bezier(0.165,0.84,0.44,1)] duration-300",
					{
						["cursor-col-resize"]: isDragging,
						sticky: isDemo,
					},
					isDragging
						? "shadow-[rgba(0,0,0,0.2)_-2px_0px_0px_0px_inset]"
						: "shadow-[rgba(0,0,0,0.04)_-2px_0px_0px_0px_inset]",
					isOpen === Open.Open ? "translate-x-0" : "-translate-x-full"
				)}
				aria-labelledby="nav-heading"
				style={{ width }}
			>
				<div className="flex flex-col space-y-2 p-3 h-full overflow-auto">
					<h2 id="nav-heading" className="text-lg font-bold">
						Lorem Ipsum
					</h2>
					<TreeviewComponent />
					<a
						className="underline text-center"
						href="https://www.joshuawootonn.com/react-treeview-component"
					>
						more about this treeview
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2.5}
							stroke="currentColor"
							className="h-4 w-4 inline-block ml-1 -translate-y-1"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
							/>
						</svg>
					</a>
				</div>
				<button
					className="absolute bg-background p-1 border-y-2 border-r-2 border-[rgba(0,0,0,0.08)] text-slate-600 -right-[34px]"
					onClick={() =>
						setOpen((isOpen) =>
							isOpen === Open.Closed ? Open.Open : Open.Closed
						)
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className={clsx(
							"w-6 h-6 transition-transform ease-[cubic-bezier(0.165,0.84,0.44,1)] duration-300",
							isOpen === Open.Open ? "rotate-180" : "rotate-0"
						)}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
						/>
					</svg>
				</button>

				<div className="absolute z-10 right-0 w-0 grow-0 top-0 bottom-0">
					<div
						onPointerDown={(e: ReactPointerEvent) => {
							// this prevents dragging from selecting
							e.preventDefault();

							const { ownerDocument } = e.currentTarget;
							originalWidth.current = width;
							originalClientX.current = e.clientX;
							setDragging(true);

							function onPointerMove(e: PointerEvent) {
								if (e.clientX < 50) setOpen(Open.Closed);
								else setOpen(Open.Open);

								setWidth(
									Math.floor(
										clamp(
											originalWidth.current +
												e.clientX -
												originalClientX.current,
											200,
											400
										)
									)
								);
							}

							function onPointerUp() {
								ownerDocument.removeEventListener(
									"pointermove",
									onPointerMove
								);
								setDragging(false);
							}

							ownerDocument.addEventListener(
								"pointermove",
								onPointerMove
							);
							ownerDocument.addEventListener("pointerup", onPointerUp, {
								once: true,
							});
						}}
						className={clsx("w-3 h-full cursor-col-resize shrink-0")}
					/>
				</div>
			</nav>

			<main
				style={{ paddingLeft: isOpen === Open.Open ? width : 0 }}
				className={clsx(
					"flex grow max-h-screen",
					isDragging
						? "transition-none"
						: "transition-all ease-[cubic-bezier(0.165,0.84,0.44,1)] duration-300"
				)}
			>
				<div className="flex flex-col px-5 py-12 grow overflow-auto">
					<div className="prose mx-auto">
						<h1>Gitlab</h1>
						<Content />
					</div>
				</div>
			</main>
		</div>
	);
}
```

## Source

### `components/ui/performant-sidebar/component.tsx`

```tsx
import { PerfSlayer } from "./perf-slayer";

export function Content() {
	return (
		<>
			<h2>External links to all the sidebars</h2>
			<div className="flex space-x-4">
				<a href="https://react-components-from-scratch.vercel.app/sidebar/initial">
					Initial
				</a>
				<a href="https://react-components-from-scratch.vercel.app/sidebar/linear">
					Linear
				</a>
				<a href="https://react-components-from-scratch.vercel.app/sidebar/notion">
					Notion
				</a>
				<a href="https://react-components-from-scratch.vercel.app/sidebar/gitlab">
					Gitlab
				</a>
			</div>

			<h2>
				<code>PerfSlayer</code>
			</h2>
			<p className="">
				Increase this value to intentionally bottle neck the main thread
			</p>

			<PerfSlayer className="h-96 w-full mb-12" />
			<h2>External links to each sidebar examples</h2>

			<p>
				<strong>Pellentesque habitant morbi tristique</strong> senectus et
				netus et malesuada fames ac turpis egestas. Vestibulum tortor quam,
				feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu
				libero sit amet quam egestas semper.{" "}
				<em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend
				leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum
				erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit
				amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros
				ipsum rutrum orci, sagittis tempus lacus enim ac dui.{" "}
				<a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut
				felis.
			</p>

			<h2>Header Level 2</h2>

			<ol>
				<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
				<li>Aliquam tincidunt mauris eu risus.</li>
			</ol>

			<blockquote>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
					magna. Cras in mi at felis aliquet congue. Ut a est eget ligula
					molestie gravida. Curabitur massa. Donec eleifend, libero at
					sagittis mollis, tellus est malesuada tellus, at luctus turpis
					elit sit amet quam. Vivamus pretium ornare est.
				</p>
			</blockquote>

			<h3>Header Level 3</h3>

			<ul>
				<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
				<li>Aliquam tincidunt mauris eu risus.</li>
			</ul>

			<pre>
				<code>
					{`#header h1 a {
display: block;
width: 300px;
height: 80px;
}`}
				</code>
			</pre>
			<h2>Header Level 2</h2>

			<ol>
				<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
				<li>Aliquam tincidunt mauris eu risus.</li>
			</ol>

			<blockquote>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
					magna. Cras in mi at felis aliquet congue. Ut a est eget ligula
					molestie gravida. Curabitur massa. Donec eleifend, libero at
					sagittis mollis, tellus est malesuada tellus, at luctus turpis
					elit sit amet quam. Vivamus pretium ornare est.
				</p>
			</blockquote>

			<h3>Header Level 3</h3>

			<ul>
				<li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
				<li>Aliquam tincidunt mauris eu risus.</li>
			</ul>

			<pre>
				<code>
					{`#header h1 a {
display: block;
width: 300px;
height: 80px;
}`}
				</code>
			</pre>
		</>
	);
}
```

### `components/ui/performant-sidebar/perf-slayer.tsx`

```tsx
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";

import clsx from "clsx";
import clamp from "lodash.clamp";

function Truck() {
	const [positionY] = useState(() => Math.random());
	const [speed] = useState(() => Math.random());

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={2}
			stroke="black"
			className="absolute w-6 h-6 -z-10"
			data-truck
			data-speed={speed}
			data-positiony={positionY}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				stroke="black"
				d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
			/>
		</svg>
	);
}

export function PerfSlayer(props: ComponentPropsWithoutRef<"div">) {
	const [number, setNumber] = useState(0);
	const ref = useRef<HTMLDivElement | null>(null);
	const offset = useRef(0);
	const requestRef = useRef<number>(0);

	useEffect(() => {
		const animate = () => {
			offset.current = offset.current + 1;
			if (number === 0 || ref.current == null) return;

			const rect = ref.current.getBoundingClientRect();

			document
				.querySelectorAll<SVGElement>("[data-truck]")
				.forEach((truck) => {
					const speed = parseFloat(truck.dataset.speed ?? "0");
					const positionY = parseFloat(truck.dataset["positiony"] ?? "0");

					const direction = Math.cos((offset.current * speed) / 100) > 0;

					const positionX =
						(Math.sin((offset.current * speed) / 100) * rect.width +
							rect.width) /
						2;

					truck.style.top = `${positionY * rect.height}px`;
					truck.style.left = `${positionX}px`;
					truck.style.transform = `rotateY(${
						direction ? "0deg" : "180deg"
					}) translateX(-50%)`;
				});

			requestRef.current = requestAnimationFrame(animate);
		};
		requestRef.current = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(requestRef.current);
	}, [number]);

	return (
		<div {...props} className={clsx("relative p-4", props.className)}>
			{new Array(number).fill("").map((_, i) => (
				<Truck key={i + "truck"} />
			))}

			<div className="relative flex w-min mx-auto border-black border-4 p-2 translate-y-1/4 justify-center items-center bg-background">
				<button
					onClick={() => setNumber((prev) => clamp(prev + 5, 0, 5000))}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={3.5}
						stroke="currentColor"
						className="w-8 h-8"
					>
						<path d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
				</button>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={3.5}
					stroke="currentColor"
					className="absolute -top-10 text-center animate-bounce ease-in-out mx-auto w-8 h-8"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
					/>
				</svg>
				<input
					className="w-20 font-semibold text-3xl text-center"
					value={number}
					onChange={(e) => {
						const num = parseInt(e.currentTarget.value);
						isNaN(num) ? setNumber(0) : setNumber(clamp(num, 0, 5000));
					}}
				></input>
				<button
					onClick={() => setNumber((prev) => clamp(prev - 5, 0, 5000))}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={3.5}
						stroke="currentColor"
						className="w-8 h-8"
					>
						<path d="M19.5 12h-15" />
					</svg>
				</button>
			</div>
			<div ref={ref} className="h-full w-full"></div>
		</div>
	);
}
```

## Attribution

Source: joshuawootonn.com · Original: https://www.joshuawootonn.com/react-treeview-component

Adapted from the original. Credit the original author when you ship this.
