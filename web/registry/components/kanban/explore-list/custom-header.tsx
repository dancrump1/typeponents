import React, { useCallback, useState } from "react";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import { cn } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "../atoms/popover";
import InlineInputController from "./inline-input";

const CustomHeader = ({
	updateTitle,
	canAddLanes,
	onDelete,
	onDoubleClick,
	editLaneTitle,
	label,
	title,
	titleStyle,
	labelStyle,
	t,
	laneDraggable,
	cards,
	id,
	...rest
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [isCollapsed, setIsCollapsed] = useState(
		searchParams.getAll("collapsed").includes(id)
	);

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.append(name, value);

			return params.toString();
		},
		[searchParams]
	);

	const removeQueryParam = useCallback(
		(param) => {
			const params = new URLSearchParams(searchParams.toString());
			params.delete("collapsed", param);
			return params.toString();
		},
		[searchParams]
	);

	return (
		<header className="flex place-content-between md:px-12">
			<div
				draggable={laneDraggable}
				className={cn(
					"font-manrope text-xl font-extrabold w-[70%]",
					laneDraggable ? "cursor-grab" : "cursor-auto"
				)}
				onDoubleClick={onDoubleClick}
				editLaneTitle={editLaneTitle}
			>
				{editLaneTitle ? (
					<InlineInputController
						value={title}
						border
						placeholder={t("placeholder.title")}
						resize="vertical"
						onSave={updateTitle}
					/>
				) : (
					title
				)}
			</div>
			<div style={{ width: "30%", textAlign: "right", fontSize: 13 }}>
				<Popover>
					<PopoverTrigger>...</PopoverTrigger>
					<PopoverContent className="flex flex-col w-fit">
						<button onClick={onDelete} style={{ cursor: "pointer" }}>
							Delete Lane
						</button>
						{cards.length > 1 && (
							<button
								onClick={() => {
									setIsCollapsed(!isCollapsed);
									isCollapsed
										? router.push(
												"?" + removeQueryParam(id),
												undefined,
												{ shallow: true }
											)
										: router.push(
												"?" + createQueryString("collapsed", id),
												undefined,
												{ shallow: true }
											);
									!isCollapsed &&
										document.getElementById(id)?.scrollTo(0, 0);
								}}
								style={{ cursor: "pointer" }}
							>
								{!isCollapsed ? "Collapse" : "Expand"}
							</button>
						)}
					</PopoverContent>
				</Popover>
			</div>
		</header>
	);
};

export default CustomHeader;
