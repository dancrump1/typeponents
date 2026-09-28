import React, { useEffect, useRef, useState } from "react";

import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { AnimatePresence } from "motion/react";

const Lane = ({ children, ...rest }) => {
	const ref = useRef(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (ref.current) {
			const { height } = ref.current.getBoundingClientRect();
			setHeight(height);
		}
	}, []);
	const laneId = children
		.find((card) => !!card)
		.props.children?.[0]?.props.children.props.laneId?.toLowerCase()
		.replace(/\s/g, "");
	const params = useSearchParams();
	const isCollapsed = params
		.getAll("collapsed")
		.includes(laneId?.toLowerCase().replace(/\s/g, ""));
	const childrenWithPassedHoverStatus = {
		...children[0],
		props: {
			...children[0].props,
			children: children[0].props.children.map((child, i) => ({
				...child,
				props: {
					children: {
						...child.props.children,
						props: {
							...child.props.children.props,
							isHovered: !isCollapsed,
							position: i + 1,
							laneHeight: height,
						},
					},
				},
			})),
		},
	};

	const columns = document.getElementsByClassName("scroll-column");

	return (
		<div
			// onMouseEnter={({ target }) => {
			// 	!isCollapsed &&
			// 		setTimeoutRef(setTimeout(() => setIsHovered(true), 200));
			// }}
			// onMouseLeave={({ target }) => {
			// 	!isCollapsed &&
			// 		[...columns].forEach((column) => (column.scrollTop = 0));

			// 	if (timeoutRef) {
			// 		clearTimeout(timeoutRef);
			// 		setTimeoutRef(null);
			// 	}

			// 	console.log("why");
			// 	console.log(!isCollapsed);

			// 	!isCollapsed &&
			// 		setTimeout(() => {
			// 			setIsHovered(false);
			// 		}, 200);
			// }}
			className={cn(
				"scroll-column flex-1 w-full md:w-fit h-full overflow-y-auto md:min-w-[250px] overflow-x-hidden self-center max-h-[90vh] flex-col justify-content-between px-1 md:px-5 py-2 scroll-smooth relative",
				!isCollapsed ? "overflow-y-auto" : "overflow-y-hidden"
			)}
			id={laneId?.toLowerCase().replace(/\s/g, "")}
		>
			<AnimatePresence propagate>
				{!!children.length && childrenWithPassedHoverStatus}
			</AnimatePresence>
		</div>
	);
};

export default Lane;
