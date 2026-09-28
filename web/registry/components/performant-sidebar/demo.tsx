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
