# Kanban

Kanban board with draggable cards across columns.

**Interaction.** Drag cards between columns. Unpublished until missing dependencies are vendored in.

- Categories: Data & Tables
- Tags: drag
- Import: `@/components/ui/kanban/component`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/kanban.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `autosize`
- `fast-average-color`
- `html-react-parser`
- `lucide-react`
- `motion`
- `prop-types`
- `react-trello`
- `uuid`

## Usage

```tsx
export default function Usage() {
	return (
		<div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-foreground">
			Kanban is unpublished — it still depends on modules that are not in this
			repo.
		</div>
	);
}
```

## Source

### `components/ui/kanban/component.tsx`

```tsx
import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Board from "react-trello";

import GradientHeader from "../GradientHeader";
import Magnet from "../library/Magnet";
import AddLaneForm from "./explore-list/add-lane-form";
import CustomHeader from "./explore-list/custom-header";
import ListCard from "./explore-list/favorite-card";
import Lane from "./explore-list/lane";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "./explore-list/popover-form";
import SharePopoverContent from "./explore-list/share-popover-content";

// const DynamicBoard = dynamic(() => import("react-trello"), {
// 	loading: () => <span>loading...</span>,
// });

export const localStorageKey = "savedCards";

function isEqual(x, y) {
	const ok = Object.keys,
		tx = typeof x,
		ty = typeof y;
	return x && y && tx === "object" && tx === ty
		? ok(x).length === ok(y).length &&
				ok(x).every((key) => isEqual(x[key], y[key]))
		: x === y;
}

const FavoritesBoard = ({ data }) => {
	// Will be used to hold localstorage value in useState
	const [componentStorageData, setComponentStorageData] = useState("[]");
	const searchParams = useSearchParams();

	// Used for holding custom actions for the Board
	const [eventBus, setEventBus] = useState(undefined);

	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0,
	});

	// Set windowSize value for determining if cards can be dragged
	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		if (typeof window !== "undefined") {
			window.addEventListener("resize", handleResize);
			handleResize(); // Get initial window size

			return () => window.removeEventListener("resize", handleResize);
		}
	}, []);

	// Used for converting local storage + component storage data into boardData
	const [favoritesListItems, setFavoritesListItems] = useState<any>([]);

	const [boardData, setBoardData] = useState<{
		lanes: { [x: string]: any }[];
	}>({
		lanes: [],
	});

	// Set useState variable equal to local storage
	useEffect(() => {
		setComponentStorageData(localStorage.getItem(localStorageKey) || "[]");
	}, []);

	// Create data used to generate boardData
	useEffect(() => {
		// Card ids from the URL
		const linkIds = searchParams.getAll("cardId");

		// Cards from the URL
		const sharedCards = linkIds?.map((card, i) => ({
			id: card,
			laneId: searchParams
				.getAll("laneId")
				[i]?.toLowerCase()
				.replace(/\s/g, ""),
			laneTitle: searchParams.getAll("laneTitle")[i],
		}));

		// Cards from useState storage
		const savedCards = JSON.parse(componentStorageData);

		const createCardList = (item) => {
			return {
				...item,
				...data.experiencesEntries.find(
					(data) => data.id === item.id || data.id === item.title
				),
			};
		};

		setFavoritesListItems(
			linkIds.length // If there is a share link
				? [
						...sharedCards.filter(
							(card) => !savedCards.find((saved) => saved.id === card.id)
						), // Cards from the share link
						...savedCards, // All cards in personal explore List
				  ].map(createCardList)
				: savedCards.map(createCardList)
		);
	}, [searchParams, componentStorageData]);

	// On mount
	// 1) Take localStorage and add to Component Storage
	// 2) Build board config object based on cards list
	// On change of explore list items:
	// 1) Regenerate data
	useEffect(() => {
		// Go over each card and pull out the laneId
		// Make a new array of only laneIds
		const laneList = new Set([
			// Existing board data
			...boardData.lanes.map((lane) => lane.id),
			// Shared items from a link
			...searchParams
				.getAll("laneId")
				.map((laneId) => laneId?.toLowerCase().replace(/\s/g, "")),
			// Selected items from the home page
			...favoritesListItems
				.map((card) => card?.laneId?.toLowerCase().replace(/\s/g, ""))
				.filter((item) => !!item),
		]);

		// If no cards have a lane assigned, create the first lane
		const realList = [...laneList].length ? [...laneList] : ["day1"];

		// Build object based on library expectations
		const dataList = realList.map((lane, i) => {
			return {
				id: lane,
				title:
					boardData.lanes.find((existing) => {
						return existing.id === lane;
					})?.title || "Day 1",
				disallowAddingCard: true,
				currentPage: 1,
				cards: favoritesListItems
					.filter(
						(card) =>
							card.laneId?.toLowerCase().replace(/\s/g, "") === lane ||
							(i === 0 && card.laneId === undefined)
					)
					.map((card, i) => ({
						id: card.title,
						label: card.title,
						key: card.title,
						...card,
						...data.experiencesEntries.find(
							(data) =>
								data.id === card.id ||
								data.title?.toLowerCase() === card.title?.toLowerCase()
						),
					})),
			};
		});

		setBoardData({
			lanes: dataList,
		});
	}, [favoritesListItems]);

	// Used to share cards with others
	const shareString =
		process.env.NEXT_PUBLIC_SITEMAP_URL +
		"explore-list?" +
		boardData.lanes
			.map((lane) => lane.cards)
			.flat()
			.map(
				(number, i) =>
					"cardId=" +
					number.title +
					"&" +
					"laneId=" +
					number.laneId?.toLowerCase().replace(/\s/g, "") +
					"&" +
					"laneTitle=" +
					number.laneTitle?.toLowerCase().replace(/\s/g, "") +
					(boardData.lanes.map((lane) => lane.cards).flat().length - 1 ===
					i
						? ""
						: "&")
			);

	const moveCard = (newLaneId, cardData) => {
		eventBus?.publish({
			type: "MOVE_CARD",
			fromLaneId: cardData.laneId?.toLowerCase().replace(/\s/g, ""),
			toLaneId: newLaneId?.toLowerCase().replace(/\s/g, ""),
			cardId: cardData.id,
			index: 0,
		});
	};

	return !!favoritesListItems.length ? (
		<section>
			<span className="flex place-content-between items-center cont-page">
				<div>
					<GradientHeader className="font-manrope text-6xl mb-4">
						Saved Cards
					</GradientHeader>
					<p className="max-w-[80ch]">
						Visit our explore page to discover some of our favorite
						activities to do in Telluride. Saved cards will live on this
						page in lists that you can organize however you'd like.
					</p>
				</div>
				<PopoverRoot>
					<PopoverTrigger className="font-manrope border-button h-fit w-fit flex gap-2 items-center">
						{/* <button
							onClick={() =>
								navigator.clipboard.writeText(
									shareString.replace(/,/g, "")
								)
							}
							className="font-manrope border-button h-fit w-fit flex gap-2 items-center"
						> */}
						<div className="flex gap-2">
							<svg
								width="18"
								height="22"
								viewBox="0 0 18 22"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M1 11V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H15C15.5304 21 16.0391 20.7893 16.4142 20.4142C16.7893 20.0391 17 19.5304 17 19V11M13 5L9 1M9 1L5 5M9 1V14"
									stroke="#524359"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
							Share Link
						</div>
						{/* </button> */}
					</PopoverTrigger>
					<PopoverContent className="shadow-xl">
						<SharePopoverContent shareString={shareString} />
					</PopoverContent>
				</PopoverRoot>
			</span>
			<div className="mx-auto cont-page mb-8">
				<PopoverRoot>
					<Board
						eventBusHandle={setEventBus}
						laneStyle={{
							backgroundColor: "#66666610",
							borderRadius: "25px",
							maxHeight: "80vh",
							fontFamily: "var(--manrope), sans-serif",
							height: "100%",
							marginBottom: "5px",
						}}
						data={boardData}
						canAddLanes
						editable
						cardDraggable={windowSize.width > 650}
						draggable={windowSize.width > 650}
						cardDragClass="draggingCard"
						onDataChange={(newData) => {
							const newBuild = JSON.stringify(
								newData.lanes
									.map((lane) => {
										return lane.cards.map((card) => ({
											laneId: lane.id
												?.toLowerCase()
												.replace(/\s/g, ""),
											laneTitle: lane.title,
											...card,
										}));
									})
									.flat()
							);

							!isEqual(newData, boardData) &&
								localStorage.setItem(localStorageKey, newBuild);
							// !isEqual(newData, boardData) &&
							// 	setComponentStorageData(newBuild);
						}}
						// onCardMoveAcrossLanes={(params) => {
						// 	console.log(params)
						// }}
						onLaneAdd={(params) => {
							setBoardData({
								lanes: [
									...boardData.lanes,
									{
										...params,
										currentPage: 1,
										disallowAddingCard: true,
										cards: [],
									},
								],
							});
						}}
						editLaneTitle
						components={{
							Card: (props) => (
								<ListCard
									{...props}
									laneOptions={boardData.lanes}
									moveCard={moveCard}
								/>
							),
							LaneHeader: CustomHeader,
							AddCardLink: () => <span />,
							ScrollableLane: Lane,
							NewLaneSection: ({ onClick }) => (
								// <Magnet
								// 	padding={50}
								// 	disabled={false}
								// 	magnetStrength={50}
								// >
								// 	<button
								// 		onClick={onClick}
								// 		className="w-fit bg-background rounded-md px-2"
								// 	>
								// 		+ Add a Day
								// 	</button>
								// </Magnet>
								<PopoverTrigger onClick={onClick}>
									+ Add a Day
								</PopoverTrigger>
							),
							NewLaneForm: AddLaneForm,
						}}
						style={{ background: "unset", maxHeight: "82vh" }}
						id="favorite-board"
					/>
				</PopoverRoot>
			</div>
		</section>
	) : (
		<section className="cont-page flex gap-32">
			<span>
				<GradientHeader className="lg:text-6xl">
					Time to start planning your Telluride adventures!
				</GradientHeader>
				<p>
					Visit our explore page to discover some of our favorite
					activities to do in Telluride. Saved cards will live on this page
					in lists that you can organize however you'd like.
				</p>
				<Link
					className="py-[6px] px-[10px] rounded-xl bg-backgroundSecondary text-foreground"
					href={"/explore"}
				>
					EXPLORE
				</Link>
			</span>
			<button
				onClick={() =>
					navigator.clipboard.writeText(shareString.replace(/,/g, ""))
				}
				className="mt-20 font-manrope border-button h-fit w-fit flex gap-2 items-center text-nowrap"
			>
				<svg
					width="22"
					height="22"
					viewBox="0 0 22 22"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M8.99996 12C9.42941 12.5741 9.97731 13.0491 10.6065 13.3929C11.2357 13.7367 11.9315 13.9411 12.6466 13.9923C13.3617 14.0435 14.0795 13.9403 14.7513 13.6897C15.4231 13.4392 16.0331 13.047 16.54 12.54L19.54 9.53997C20.4507 8.59695 20.9547 7.33394 20.9433 6.02296C20.9319 4.71198 20.4061 3.45791 19.479 2.53087C18.552 1.60383 17.2979 1.07799 15.987 1.0666C14.676 1.0552 13.413 1.55918 12.47 2.46997L10.75 4.17997M13 9.99996C12.5705 9.42584 12.0226 8.95078 11.3934 8.60703C10.7642 8.26327 10.0684 8.05885 9.3533 8.00763C8.63816 7.95641 7.92037 8.0596 7.24861 8.31018C6.57685 8.56077 5.96684 8.9529 5.45996 9.45996L2.45996 12.46C1.54917 13.403 1.04519 14.666 1.05659 15.977C1.06798 17.288 1.59382 18.542 2.52086 19.4691C3.4479 20.3961 4.70197 20.9219 6.01295 20.9333C7.32393 20.9447 8.58694 20.4408 9.52995 19.53L11.24 17.82"
						stroke="#524359"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				Copy Link
			</button>
		</section>
	);
};

export default FavoritesBoard;
```

### `components/ui/kanban/explore-list/add-lane-form.tsx`

```tsx
import React, { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { v4 as uuidv4 } from "uuid";

import {
	PopoverButton,
	PopoverContent,
	PopoverFooter,
	PopoverForm,
	PopoverLabel,
	PopoverSubmitButton,
	PopoverTextarea,
} from "./popover-form";

const AddLaneForm = ({ onAdd, onCancel, t }) => {
	const [email, setEmail] = useState("");
	const [focus, setFocus] = useState(false);
	const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
	const label = "New Lane";
	const letters = label.split("");

	const show = focus || email;

	const handleSubmit = (value) => {
		// event.preventDefault();

		onAdd({
			id: uuidv4(),
			title: value,
		});
	};

	return (
		<PopoverContent onCancel={onCancel}>
			{/* <div className="p-4 w-full relative h-fit flex-col inline-block">
				<form
					onSubmit={(event) => handleSubmit(event)}
					className="grow flex justify-center"
				>
					<label
					htmlFor="email"
					className="absolute inset-0 flex items-center"
				>
					<span className="flex">
						{letters.map((letter, index) => (
							<motion.span
								aria-hidden
								className="inline-block"
								key={index + "addlaneform"}
								initial={false}
								animate={{
									x: 20,
									y: show ? -40 : 0,
									color: show ? "red" : "grey",
									opacity: status === "success" ? 0 : 1,
								}}
								transition={{
									type: "spring",
									duration: 0.4,
									delay: index * 0.01,
								}}
							>
								{letter}
							</motion.span>
						))}
						<span className="sr-only">{label}</span>
					</span>
				</label>

				<div
					className={cn(
						"h-12 w-full transition-[outline] outline-2 flex items-center gap-2 rounded-full pl-5 relative overflow-hidden",
						show ? "outline-amber-500" : "outline-neutral-300"
					)}
				>
					<input
						id="email"
						name="email"
						type="text"
						title="email"
						className="outline-hidden grow border-none"
						placeholder=""
						autoComplete="off"
						spellCheck="false"
						autoFocus
						value={email}
						ref={refInput}
						onChange={(e) => setEmail(e.target.value)}
						onFocus={() => setFocus(true)}
						onBlur={() => setFocus(false)}
					/>
					<motion.div
						className="absolute"
						initial={false}
						animate={{
							right: 4,
							x: show ? "calc(0% + 0px)" : "calc(100% + 4px)",
						}}
						transition={{ type: "spring", bounce: 0.3 }}
					>
						<motion.button
							layoutId="button"
							type="submit"
							style={{ borderRadius: 999 }}
							className="px-6 h-10 bg-linear-to-b from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 font-semibold shrink-0 transition-colors text-foreground border-none"
						>
							Save Lane
						</motion.button>
					</motion.div>
				</div>

					<div className="relative max-w-96 w-full bg-background">
					<label
						htmlFor="email"
						className="absolute inset-0 flex items-center"
					>
						<span className="flex">
							{letters.map((letter, index) => (
								<motion.span
									aria-hidden
									className="inline-block"
									key={index + 'add-lane-forms-letters}
									initial={false}
									animate={{
										x: 20,
										y: show ? -40 : 0,
										color: show
											? "var(--color-amber-500)"
											: "var(--color-neutral-400)",
										opacity: status === "success" ? 0 : 1,
									}}
									transition={{
										type: "spring",
										duration: 0.4,
										delay: index * 0.01,
									}}
								>
									{letter}
								</motion.span>
							))}
							<span className="sr-only">{label}</span>
						</span>
					</label>

					<div
						className={cn(
							"h-12 w-full transition-[outline] outline-2 flex items-center gap-2 rounded-full pl-5 relative overflow-hidden",
							show ? "outline-amber-500" : "outline-neutral-300"
						)}
					>
						<input
							id="email"
							name="email"
							type="email"
							title="email"
							className="outline-hidden grow border-none"
							placeholder=""
							required
							autoComplete="off"
							spellCheck="false"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onFocus={() => setFocus(true)}
							onBlur={() => setFocus(false)}
						/>
						<motion.div
							className="absolute"
							initial={false}
							animate={{
								right: 4,
								x: show ? "calc(0% + 0px)" : "calc(100% + 4px)",
							}}
							transition={{ type: "spring", bounce: 0.3 }}
						>
							<motion.button
								layoutId="button"
								type="submit"
								style={{ borderRadius: 999 }}
								className="px-6 h-10 bg-linear-to-b from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 font-semibold shrink-0 transition-colors text-foreground border-none"
							>
								Subscribe
							</motion.button>
						</motion.div>

						<AnimatePresence mode="popLayout">
							{status === "loading" && (
								<motion.div
									layoutId="button"
									className="absolute inset-0 z-10 bg-linear-to-b from-amber-400 to-amber-500 flex items-center justify-center text-foreground"
									style={{ borderRadius: 999 }}
								>
									<Loader size={18} className="animate-spin" />
								</motion.div>
							)}

							{status === "success" && (
								<div className="absolute inset-0 z-10 bg-linear-to-b from-amber-400 to-amber-500 flex items-center justify-center font-semibold text-foreground">
									<motion.span
										initial={{ y: -20, filter: "blur(4px)" }}
										animate={{ y: 0, filter: "blur(0px)" }}
										transition={{ type: "spring" }}
									>
										Your email has been subscribed!
									</motion.span>
								</div>
							)}
						</AnimatePresence>
					</div>
				</div>
				</form>
			</div> */}
			<PopoverForm onSubmit={handleSubmit}>
				<PopoverLabel>Add a Day</PopoverLabel>
				<PopoverTextarea />
				<PopoverFooter>
					<PopoverSubmitButton />
				</PopoverFooter>
			</PopoverForm>
		</PopoverContent>
	);
};

export default AddLaneForm;
```

### `components/ui/kanban/explore-list/card-tags.tsx`

```tsx
import React from "react";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

const CardTags = ({ tags, setOpen, open }) => {
	if (tags.length > 3)
		return (
			<>
				<section
					className={cn("flex gap-1 w-full", {
						"flex-wrap": open,
					})}
				>
					<AnimatePresence mode="popLayout">
						{tags.slice(0, 2).map(({ title }) => {
							return (
								<motion.div
									layout
									key={title}
									initial={{ opacity: 1, scale: 1 }}
									animate={{
										opacity: 1,
										scale: 1,
										transition: { delay: 0.2 },
									}}
									className={
										"h-[24px] font-manrope content-center border border-[#252C30] rounded-full w-fit px-3 min-w-fit text-xs"
									}
								>
									{title}
								</motion.div>
							);
						})}
						{tags.slice(2, tags.length).map(({ title }) => {
							return (
								open && (
									<motion.div
										layout
										key={title}
										className={
											"h-[24px] font-manrope content-center shrink-0 border border-[#252C30] rounded-full w-fit px-3 min-w-fit text-xs"
										}
										initial={{ opacity: 0, scale: 0 }}
										animate={{
											opacity: 1,
											scale: 1,
											transition: { delay: 0.2 },
										}}
										exit={{
											opacity: 0,
											scale: 0,
										}}
									>
										{title}
									</motion.div>
								)
							);
						})}
						<motion.span
							key="open"
							onClick={(event) => {
								event.stopPropagation();
								setOpen(!open);
							}}
							layout
							className="mt-auto mb-[3px] mr-1 rounded-full shrink-0 border border-[#726350] w-[24px] h-[24px] flex items-center justify-center"
						>
							{open ? (
								<svg
									width="10"
									height="10"
									viewBox="0 0 10 10"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1.5 9.5C1.22386 9.77614 0.776142 9.77614 0.5 9.5C0.223858 9.22386 0.223858 8.77614 0.5 8.5L4 5L0.5 1.5C0.223857 1.22386 0.223858 0.776142 0.5 0.5C0.776142 0.223858 1.22386 0.223858 1.5 0.5L5 4L8.5 0.5C8.77614 0.223857 9.22386 0.223858 9.5 0.5C9.77614 0.776142 9.77614 1.22386 9.5 1.5L6 5L9.5 8.5C9.77614 8.77614 9.77614 9.22386 9.5 9.5C9.22386 9.77614 8.77614 9.77614 8.5 9.5L5 6L1.5 9.5Z"
										fill="#726350"
									/>
								</svg>
							) : (
								<svg
									width="4"
									height="14"
									viewBox="0 0 4 14"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M2 0C2.48125 0 2.89323 0.171354 3.23594 0.514062C3.57865 0.856771 3.75 1.26875 3.75 1.75C3.75 2.23125 3.57865 2.64323 3.23594 2.98594C2.89323 3.32865 2.48125 3.5 2 3.5C1.51875 3.5 1.10677 3.32865 0.764062 2.98594C0.421354 2.64323 0.25 2.23125 0.25 1.75C0.25 1.26875 0.421354 0.856771 0.764062 0.514062C1.10677 0.171354 1.51875 0 2 0ZM2 5.25C2.48125 5.25 2.89323 5.42135 3.23594 5.76406C3.57865 6.10677 3.75 6.51875 3.75 7C3.75 7.48125 3.57865 7.89323 3.23594 8.23594C2.89323 8.57865 2.48125 8.75 2 8.75C1.51875 8.75 1.10677 8.57865 0.764062 8.23594C0.421354 7.89323 0.25 7.48125 0.25 7C0.25 6.51875 0.421354 6.10677 0.764062 5.76406C1.10677 5.42135 1.51875 5.25 2 5.25ZM2 10.5C2.48125 10.5 2.89323 10.6714 3.23594 11.0141C3.57865 11.3568 3.75 11.7687 3.75 12.25C3.75 12.7313 3.57865 13.1432 3.23594 13.4859C2.89323 13.8286 2.48125 14 2 14C1.51875 14 1.10677 13.8286 0.764062 13.4859C0.421354 13.1432 0.25 12.7313 0.25 12.25C0.25 11.7687 0.421354 11.3568 0.764062 11.0141C1.10677 10.6714 1.51875 10.5 2 10.5Z"
										fill="#726350"
									/>
								</svg>
							)}
						</motion.span>
					</AnimatePresence>
				</section>
			</>
		);

	return (
		<span className="flex gap-1">
			{tags.map(({ title }) => (
				<div
					key={title}
					className={
						"font-manrope border content-center border-[#726350] rounded-full w-fit px-3  flex-1 min-w-fit text-xs"
					}
				>
					{title}
				</div>
			))}
		</span>
	);
};

export default CardTags;
```

### `components/ui/kanban/explore-list/custom-header.tsx`

```tsx
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
```

### `components/ui/kanban/explore-list/explore-card.tsx`

```tsx
import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { FastAverageColor } from "fast-average-color";
import parse from "html-react-parser";
import { motion } from "motion/react";

import CardTags from "./card-tags";
import { localStorageKey } from "../component";

export function hexToRgb(hex) {
	// Remove '#' if present
	if (hex.charAt(0) === "#") {
		hex = hex.slice(1);
	}

	// Parse the hex into RGB values
	let r = parseInt(hex.slice(0, 2), 16);
	let g = parseInt(hex.slice(2, 4), 16);
	let b = parseInt(hex.slice(4, 6), 16);

	return { r, g, b };
}

export function colorDistance(color1, color2) {
	// Calculate the Euclidean distance between two RGB colors
	let rDiff = color1.r - color2.r;
	let gDiff = color1.g - color2.g;
	let bDiff = color1.b - color2.b;

	return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}

export function closestColor(inputHex) {
	const randomColors = [
		"#FF5733",
		"#33FF57",
		"#3357FF",
		"#F9A825",
		"#FF00FF",
		"#00FFFF",
		"#FF6347",
		"#BFFF00",
		"#D2691E",
		"#9400D3",
	];

	const inputRgb = hexToRgb(inputHex);
	let closest = randomColors[0];
	let minDistance = Infinity;

	// Loop through each color and find the closest match
	randomColors.forEach((colorHex) => {
		const colorRgb = hexToRgb(colorHex);
		const distance = colorDistance(inputRgb, colorRgb);
		if (distance < minDistance) {
			minDistance = distance;
			closest = colorHex;
		}
	});

	return closest;
}

const ExploreCard = ({
	card,
	shouldRender = true,
	isHovered,
	position,
	laneHeight,
	...props
}) => {
	// Pull browser's Local Storage state into useState variable
	const [componentStorageData, setComponentStorageData] = useState("[]");

	// Store average image color to apply to card text
	const [imgColor, setImgColor] = useState("");

	// Open more details
	const [openCard, setOpenCard] = useState(false);

	const cardData = card?.title ? card : props;

	const fac = new FastAverageColor();
	const [open, setOpen] = useState(false);

	// On mount:
	// 1) pull list of selected cards
	// 2) set color of text to average color of image
	useEffect(() => {
		// Fetch existing selected cards and store in component state
		setComponentStorageData(localStorage.getItem(localStorageKey) || "[]");

		// Smitha asked about making the title text match the average color of an image
		!!document.querySelector(
			`.${cardData.title.toLowerCase().replaceAll(" ", "-")}`
		) &&
			fac
				.getColorAsync(
					document.querySelector(
						`.${cardData.title.toLowerCase().replaceAll(" ", "-")}`
					)
				)
				.then((color) => setImgColor(closestColor(color.hex)));
	}, []);

	const saveToLocalStorageAndUpdateComponentStorage = (e, title) => {
		e.preventDefault();
		const existingData = JSON.parse(localStorage.getItem(localStorageKey));

		// Either add to existing data or, if no existing data, create first data entry
		const dataToSet = existingData?.length
			? [
					...existingData,
					{
						title,
						laneId: props.laneId?.toLowerCase().replace(/\s/g, ""),
						laneTitle: props?.laneTitle,
					},
				]
			: [
					{
						title,
						laneId: props.laneId?.toLowerCase().replace(/\s/g, ""),
						laneTitle: props?.laneTitle,
					},
				];

		// Store new item in browser's Local Storage
		localStorage.setItem(localStorageKey, JSON.stringify(dataToSet));

		// Store new item in useState variable
		setComponentStorageData(JSON.stringify(dataToSet));
	};

	const deleteFromLocalStorageAndComponentStorage = (e, title) => {
		e.preventDefault();
		// Get current data from browser's Local Storage
		const existingData = JSON.parse(localStorage.getItem(localStorageKey));

		// Get a new list with selected card removed
		const listWithCardRemoved = existingData.filter(
			(number) => number.title !== title
		);

		// Overwrite browser's Local Storage with new list
		localStorage.setItem(
			localStorageKey,
			JSON.stringify(listWithCardRemoved)
		);

		// Overwrite useState variable with new list
		setComponentStorageData(JSON.stringify(listWithCardRemoved));
	};

	const cardFilters = [
		...cardData?.eventCategories,
		...cardData?.kidsCategories,
		...cardData?.tourCategories,
		...cardData?.summerCategories,
		...cardData?.winterCategories,
		...cardData?.miscellaneousCategories,
	];

	return (
		shouldRender && (
			<motion.div
				layout
				transition={{
					type: "spring",
					bounce: 0.1,
					mass: 1,
					damping: 25,
					stiffness: 300,
				}}
				exit={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				initial={{ opacity: 1 }}
				key={cardData.title.toLowerCase().replaceAll(" ", "-")}
				onClick={() => setOpenCard(!openCard)}
				className={cn(
					"group border relative overflow-hidden rounded-lg max-h-[500px] shadow-xl font-manrope max-w-[300px]"
				)}
			>
				{(cardData.images?.length || cardData.img?.src) && (
					<Image
						src={
							cardData.images?.length
								? cardData.images[0].url
								: cardData.img?.src
						}
						height={
							cardData.images?.length ? cardData.images[0].height : 200
						}
						width={
							cardData.images?.length ? cardData.images[0]?.width : 300
						}
						alt="test1"
						crossOrigin="anonymous"
						className={cn(
							`peer h-full w-full object-cover pb-[110px] md:pb-[170px] object-center ${cardData.title
								.toLowerCase()
								.replaceAll(" ", "-")} `
						)}
					/>
				)}

				<span className="group-hover:visible invisible absolute inset-0 bg-background/30 text-foreground text-center content-center">
					Click to reveal more
				</span>

				<div
					className={cn(
						"bg-background w-full absolute bottom-0 transition-[height,top] duration-500",
						{
							"h-full! top-0! bottom-0!": openCard,
							"h-[110px] md:h-[170px] top-[calc(100%-110px)] md:top-[calc(100%-170px)]":
								!open,
							"h-[110px] md:h-[200px] top-[calc(100%-110px)] md:top-[calc(100%-200px)]":
								open,
						}
					)}
				>
					<h2 style={{ color: imgColor }} className=" px-5 my-0 text-2xl">
						{cardData.title}
					</h2>
					<h3 className="text-[14px] px-5 font-spectral font-medium">
						{cardData.subhead}
					</h3>
					<span
						className={cn(
							"block opacity-0 text-foreground  px-5 mt-6 pb-11 text-xs",
							openCard && "opacity-100 duration-500"
						)}
					>
						{parse(cardData?.copy || "")}
					</span>
				</div>
				<span className="absolute bottom-0 py-2 left-2 flex justify-between items-center w-[90%] bg-background">
					<CardTags tags={cardFilters} setOpen={setOpen} open={open} />
					<button
						className="text-foreground shrink-0 h-8 w-8 overflow-hidden mt-auto"
						onClick={(e) => {
							e.stopPropagation();
							JSON.parse(componentStorageData).find(
								(number) => number.title === cardData.title
							)
								? deleteFromLocalStorageAndComponentStorage(
										e,
										cardData.title
									)
								: saveToLocalStorageAndUpdateComponentStorage(
										e,
										cardData.title
									);
						}}
					>
						<svg
							width="27"
							height="24"
							viewBox="0 0 27 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className={cn(
								"hover/card:stroke-white",
								JSON.parse(componentStorageData).find(
									(number) => number.title === cardData.title
								) && "fill-[#9B5B40] h-full w-full"
							)}
						>
							<path
								d="M23.3804 4.0482C22.8219 3.48944 22.1588 3.04619 21.4289 2.74377C20.6991 2.44136 19.9168 2.28571 19.1268 2.28571C18.3367 2.28571 17.5545 2.44136 16.8246 2.74377C16.0948 3.04619 15.4316 3.48944 14.8731 4.0482L13.714 5.20729L12.555 4.0482C11.4268 2.92007 9.89674 2.28629 8.30132 2.28629C6.7059 2.28629 5.17582 2.92007 4.04768 4.0482C2.91955 5.17634 2.28577 6.70642 2.28577 8.30184C2.28577 9.89727 2.91955 11.4273 4.04768 12.5555L13.714 22.2218L23.3804 12.5555C23.9392 11.997 24.3824 11.3339 24.6848 10.604C24.9873 9.87415 25.1429 9.09187 25.1429 8.30184C25.1429 7.51182 24.9873 6.72953 24.6848 5.99968C24.3824 5.26983 23.9392 4.60671 23.3804 4.0482Z"
								stroke="#9B5B40"
								stroke-width="3"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</span>
			</motion.div>
		)
	);
};

export default ExploreCard;
```

### `components/ui/kanban/explore-list/favorite-card.tsx`

```tsx
import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { FastAverageColor } from "fast-average-color";
import parse from "html-react-parser";
import { motion } from "motion/react";

import CardTags from "./card-tags";
import { closestColor } from "./explore-card";
import { localStorageKey } from "../component";
import { SelectModel } from "./list-dropdown";

const ListCard = ({
	card,
	shouldRender = true,
	isHovered,
	position,
	laneHeight,
	fill = false,
	laneOptions,
	moveCard,
	...props
}) => {
	// Pull browser's Local Storage state into useState variable
	const [componentStorageData, setComponentStorageData] = useState("[]");

	// Store average image color to apply to card text
	const [imgColor, setImgColor] = useState("");

	// Open more details
	const [openCard, setOpenCard] = useState(false);

	const [hoverState, setHoverState] = useState(fill || isHovered || false);

	const cardData = card?.title ? card : props;

	const fac = new FastAverageColor();

	const [open, setOpen] = useState(false);

	// On mount:
	// 1) pull list of selected cards
	// 2) set color of text to average color of image
	useEffect(() => {
		setHoverState(isHovered || fill);
		// Fetch existing selected cards and store in component state
		setComponentStorageData(localStorage.getItem(localStorageKey) || "[]");

		// Smitha asked about making the title text match the average color of an image
		!!document.querySelector(
			`.${cardData.title.toLowerCase().replaceAll(" ", "-")}`
		) &&
			fac
				.getColorAsync(
					document.querySelector(
						`.${cardData.title.toLowerCase().replaceAll(" ", "-")}`
					)
				)
				.then((color) => setImgColor(closestColor(color.hex)));
	}, []);

	useEffect(() => {
		setHoverState(isHovered || fill);
	}, [isHovered, fill]);

	const saveToLocalStorageAndUpdateComponentStorage = (e, title) => {
		e.preventDefault();
		const existingData = JSON.parse(localStorage.getItem(localStorageKey));

		// Either add to existing data or, if no existing data, create first data entry
		const dataToSet = existingData?.length
			? [
					...existingData,
					{
						title,
						laneId: props.laneId?.toLowerCase().replace(/\s/g, ""),
						laneTitle: props?.laneTitle,
					},
				]
			: [
					{
						title,
						laneId: props.laneId?.toLowerCase().replace(/\s/g, ""),
						laneTitle: props?.laneTitle,
					},
				];

		// Store new item in browser's Local Storage
		localStorage.setItem(localStorageKey, JSON.stringify(dataToSet));

		// Store new item in useState variable
		setComponentStorageData(JSON.stringify(dataToSet));
	};

	const deleteFromLocalStorageAndComponentStorage = (e, title) => {
		e.preventDefault();
		// Get current data from browser's Local Storage
		const existingData = JSON.parse(localStorage.getItem(localStorageKey));

		// Get a new list with selected card removed
		const listWithCardRemoved = existingData.filter(
			(number) => number.title !== title
		);

		// Overwrite browser's Local Storage with new list
		localStorage.setItem(
			localStorageKey,
			JSON.stringify(listWithCardRemoved)
		);

		// Overwrite useState variable with new list
		setComponentStorageData(JSON.stringify(listWithCardRemoved));
	};

	const cardFilters = [
		...(cardData?.eventCategories || []),
		...(cardData?.kidsCategories || []),
		...(cardData?.tourCategories || []),
		...(cardData?.summerCategories || []),
		...(cardData?.winterCategories || []),
		...(cardData?.miscellaneousCategories || []),
	];

	const variants = {
		hover: { translateY: "0", height: "100%" },
		stack: {
			translateY: `calc(-95px * ${position - 1})`,
			height: position === 1 ? "100%" : "100px",
		},
	};

	const removeCard = (cardData, e) => {
		deleteFromLocalStorageAndComponentStorage(e, cardData.title);
		props.onDelete(cardData.id);
	};

	return (
		<motion.div
			layout
			key={cardData.id}
			onClick={() => setOpenCard(!openCard)}
			// onMouseLeave={() => setOpenCard(false)}
			style={
				isHovered || position === 1
					? {
							zIndex: Math.round(10 / position),
						}
					: {
							zIndex: Math.round(10 / position),
						}
			}
			initial={"hover"}
			variants={variants}
			transition={{ ease: "linear", duration: 0.25 }}
			animate={isHovered ? "hover" : "stack"}
			exit={{ scale: 0, opacity: 0 }}
			className={cn(
				"group border relative overflow-hidden rounded-lg max-h-[500px] shadow-xl w-full md:w-[300px]"
			)}
		>
			{(cardData.images?.length || cardData.img?.src) && (
				<Image
					src={
						cardData.images?.length
							? cardData.images[0].url
							: cardData.img?.src
					}
					height={
						cardData.images?.length ? cardData.images[0].height : 200
					}
					width={cardData.images?.length ? cardData.images[0]?.width : 300}
					alt="test1"
					crossOrigin="anonymous"
					className={cn(
						`peer h-full w-full object-cover pb-[110px] md:pb-[170px] object-center ${cardData.title
							.toLowerCase()
							.replaceAll(" ", "-")} `
					)}
				/>
			)}

			<div className="visible md:invisible absolute z-100 top-0 ">
				<SelectModel
					laneOptions={laneOptions}
					moveCard={(value) => moveCard(value, cardData)}
				/>
			</div>

			<span className="hidden md:block card-dragger group-hover:visible invisible absolute top-0 right-0 left-0 bg-background text-foreground justify-items-center text-center content-center cursor-grab active:cursor-grabbing">
				<svg
					width="24"
					height="14"
					viewBox="0 0 24 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 10.1665C11.3096 10.1665 10.75 10.7261 10.75 11.4165C10.75 12.1069 11.3096 12.6665 12 12.6665C12.6904 12.6665 13.25 12.1069 13.25 11.4165C13.25 10.7261 12.6904 10.1665 12 10.1665Z"
						fill="#E8E7DD"
					/>
					<path
						d="M3.25 10.1665C2.55964 10.1665 2 10.7261 2 11.4165C2 12.1069 2.55964 12.6665 3.25 12.6665C3.94036 12.6665 4.5 12.1069 4.5 11.4165C4.5 10.7261 3.94036 10.1665 3.25 10.1665Z"
						fill="#E8E7DD"
					/>
					<path
						d="M20.75 10.1665C20.0596 10.1665 19.5 10.7261 19.5 11.4165C19.5 12.1069 20.0596 12.6665 20.75 12.6665C21.4404 12.6665 22 12.1069 22 11.4165C22 10.7261 21.4404 10.1665 20.75 10.1665Z"
						fill="#E8E7DD"
					/>
					<path
						d="M12 10.1665C11.3096 10.1665 10.75 10.7261 10.75 11.4165C10.75 12.1069 11.3096 12.6665 12 12.6665C12.6904 12.6665 13.25 12.1069 13.25 11.4165C13.25 10.7261 12.6904 10.1665 12 10.1665Z"
						stroke="#E8E7DD"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M3.25 10.1665C2.55964 10.1665 2 10.7261 2 11.4165C2 12.1069 2.55964 12.6665 3.25 12.6665C3.94036 12.6665 4.5 12.1069 4.5 11.4165C4.5 10.7261 3.94036 10.1665 3.25 10.1665Z"
						stroke="#E8E7DD"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M20.75 10.1665C20.0596 10.1665 19.5 10.7261 19.5 11.4165C19.5 12.1069 20.0596 12.6665 20.75 12.6665C21.4404 12.6665 22 12.1069 22 11.4165C22 10.7261 21.4404 10.1665 20.75 10.1665Z"
						stroke="#E8E7DD"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M12 1.8335C11.3096 1.8335 10.75 2.39314 10.75 3.0835C10.75 3.77385 11.3096 4.3335 12 4.3335C12.6904 4.3335 13.25 3.77385 13.25 3.0835C13.25 2.39314 12.6904 1.8335 12 1.8335Z"
						fill="#E8E7DD"
					/>
					<path
						d="M3.25 1.83349C2.55964 1.83349 2 2.39314 2 3.08349C2 3.77385 2.55964 4.33349 3.25 4.33349C3.94036 4.33349 4.5 3.77385 4.5 3.08349C4.5 2.39314 3.94036 1.83349 3.25 1.83349Z"
						fill="#E8E7DD"
					/>
					<path
						d="M20.75 1.8335C20.0596 1.8335 19.5 2.39314 19.5 3.0835C19.5 3.77385 20.0596 4.3335 20.75 4.3335C21.4404 4.3335 22 3.77385 22 3.0835C22 2.39314 21.4404 1.8335 20.75 1.8335Z"
						fill="#E8E7DD"
					/>
					<path
						d="M12 1.8335C11.3096 1.8335 10.75 2.39314 10.75 3.0835C10.75 3.77385 11.3096 4.3335 12 4.3335C12.6904 4.3335 13.25 3.77385 13.25 3.0835C13.25 2.39314 12.6904 1.8335 12 1.8335Z"
						stroke="#E8E7DD"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M3.25 1.83349C2.55964 1.83349 2 2.39314 2 3.08349C2 3.77385 2.55964 4.33349 3.25 4.33349C3.94036 4.33349 4.5 3.77385 4.5 3.08349C4.5 2.39314 3.94036 1.83349 3.25 1.83349Z"
						stroke="#E8E7DD"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M20.75 1.8335C20.0596 1.8335 19.5 2.39314 19.5 3.0835C19.5 3.77385 20.0596 4.3335 20.75 4.3335C21.4404 4.3335 22 3.77385 22 3.0835C22 2.39314 21.4404 1.8335 20.75 1.8335Z"
						stroke="#E8E7DD"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>
			<div
				className={cn(
					"bg-background w-full absolute bottom-0 transition-[height,top] duration-500",
					{
						"h-full! top-0! bottom-0!": openCard,
						"h-[110px] md:h-[170px] top-[calc(100%-110px)] md:top-[calc(100%-170px)]":
							!open,
						"h-[110px] md:h-[200px] top-[calc(100%-110px)] md:top-[calc(100%-200px)]":
							open,
					}
				)}
			>
				<div className="flex flex-col">
					<h2
						style={{ color: imgColor }}
						className="font-spectral px-5 my-0 text-2xl"
					>
						{cardData.title}
					</h2>
					<h3 className="text-[14px] px-5 font-spectral font-medium">
						{cardData.subhead}
					</h3>
				</div>
				<span
					className={cn(
						"block opacity-0 text-foreground  px-5 mt-6 pb-11 text-xs",
						openCard && "opacity-100 duration-500"
					)}
				>
					{parse(cardData?.copy || "")}
				</span>
			</div>
			<div className="absolute bottom-0 py-2 left-2 flex justify-between items-center w-[90%] bg-background">
				<CardTags tags={cardFilters} setOpen={setOpen} open={open} />
				<button
					className="text-foreground shrink-0 h-8 w-8 overflow-hidden mt-auto"
					onClick={(e) => {
						e.stopPropagation();
						JSON.parse(componentStorageData).find(
							(number) => number.title === cardData.title
						)
							? deleteFromLocalStorageAndComponentStorage(
									e,
									cardData.title
								)
							: saveToLocalStorageAndUpdateComponentStorage(
									e,
									cardData.title
								);
						removeCard(cardData, e);
					}}
				>
					<svg
						width="27"
						height="24"
						viewBox="0 0 27 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className={cn(
							"hover/card:stroke-white",
							JSON.parse(componentStorageData).find(
								(number) => number.title === cardData.title
							) && "fill-[#9B5B40] h-full w-full"
						)}
					>
						<path
							d="M23.3804 4.0482C22.8219 3.48944 22.1588 3.04619 21.4289 2.74377C20.6991 2.44136 19.9168 2.28571 19.1268 2.28571C18.3367 2.28571 17.5545 2.44136 16.8246 2.74377C16.0948 3.04619 15.4316 3.48944 14.8731 4.0482L13.714 5.20729L12.555 4.0482C11.4268 2.92007 9.89674 2.28629 8.30132 2.28629C6.7059 2.28629 5.17582 2.92007 4.04768 4.0482C2.91955 5.17634 2.28577 6.70642 2.28577 8.30184C2.28577 9.89727 2.91955 11.4273 4.04768 12.5555L13.714 22.2218L23.3804 12.5555C23.9392 11.997 24.3824 11.3339 24.6848 10.604C24.9873 9.87415 25.1429 9.09187 25.1429 8.30184C25.1429 7.51182 24.9873 6.72953 24.6848 5.99968C24.3824 5.26983 23.9392 4.60671 23.3804 4.0482Z"
							stroke="#9B5B40"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			</div>
		</motion.div>
	);
};

export default ListCard;
```

### `components/ui/kanban/explore-list/inline-input.js`

```tsx
import React from "react";

import autosize from "autosize";
import PropTypes from "prop-types";

class InlineInputController extends React.Component {
	onFocus = (e) => e.target.select();

	// This is the way to select all text if mouse clicked
	onMouseDown = (e) => {
		if (document.activeElement != e.target) {
			e.preventDefault();
			this.refInput.focus();
		}
	};

	onBlur = () => {
		this.updateValue();
	};

	onKeyDown = (e) => {
		if (e.keyCode == 13) {
			this.refInput.blur();
			e.preventDefault();
		}
		if (e.keyCode == 27) {
			this.setValue(this.props.value);
			this.refInput.blur();
			e.preventDefault();
		}
		if (e.keyCode == 9) {
			if (this.getValue().length == 0) {
				this.props.onCancel();
			}
			this.refInput.blur();
			e.preventDefault();
		}
	};

	getValue = () => this.refInput.value;
	setValue = (value) => (this.refInput.value = value);

	updateValue = () => {
		if (this.getValue() != this.props.value) {
			this.props.onSave(this.getValue());
		}
	};

	setRef = (ref) => {
		this.refInput = ref;
		if (this.props.resize != "none") {
			autosize(this.refInput);
		}
	};

	UNSAFE_componentWillReceiveProps(nextProps) {
		this.setValue(nextProps.value);
	}

	render() {
		const { autoFocus, border, value, placeholder } = this.props;

		return (
			<textarea
				ref={this.setRef}
				border={border}
				onMouseDown={this.onMouseDown}
				onFocus={this.onFocus}
				onBlur={this.onBlur}
				onKeyDown={this.onKeyDown}
				placeholder={value.length == 0 ? undefined : placeholder}
				defaultValue={value}
				autoComplete="off"
				autoCorrect="off"
				autoCapitalize="off"
				spellCheck="false"
				dataGramm="false"
				rows={1}
				autoFocus={autoFocus}
				className="text-foreground text-4xl bg-inherit w-[230px]"
			/>
		);
	}
}

InlineInputController.propTypes = {
	onSave: PropTypes.func,
	border: PropTypes.bool,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	autoFocus: PropTypes.bool,
	resize: PropTypes.oneOf(["none", "vertical", "horizontal"]),
};

InlineInputController.defaultProps = {
	onSave: () => {},
	placeholder: "",
	value: "",
	border: false,
	autoFocus: false,
	resize: "none",
};

export default InlineInputController;
```

### `components/ui/kanban/explore-list/lane.tsx`

```tsx
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
```

### `components/ui/kanban/explore-list/list-dropdown.tsx`

```tsx
import type React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../atoms/select";

function SelectModel({ laneOptions, moveCard }) {
	return (
		<Select onValueChange={(value) => moveCard(value)}>
			<SelectTrigger>
				<div>...</div>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{laneOptions.map(({ title, id }) => (
						<SelectItem value={id} key={title}>
							{title}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

export { SelectModel };
```

### `components/ui/kanban/explore-list/popover-form.tsx`

```tsx
"use client";

import React, {
	createContext,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from "react";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";

const TRANSITION = {
	type: "spring",
	bounce: 0.05,
	duration: 0.3,
};

function useClickOutside(
	ref: React.RefObject<HTMLElement>,
	handler: () => void
) {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				handler();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, handler]);
}

interface PopoverContextType {
	isOpen: boolean;
	openPopover: () => void;
	closePopover: () => void;
	uniqueId: string;
	note: string;
	setNote: (note: string) => void;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

export function usePopover() {
	const context = useContext(PopoverContext);
	if (!context) {
		throw new Error("usePopover must be used within a PopoverProvider");
	}
	return context;
}

function usePopoverLogic() {
	const uniqueId = useId();
	const [isOpen, setIsOpen] = useState(false);
	const [note, setNote] = useState("");

	const openPopover = () => setIsOpen(true);
	const closePopover = () => {
		setIsOpen(false);
		setNote("");
	};

	return { isOpen, openPopover, closePopover, uniqueId, note, setNote };
}

interface PopoverRootProps {
	children: React.ReactNode;
	className?: string;
}

export function PopoverRoot({ children, className }: PopoverRootProps) {
	const popoverLogic = usePopoverLogic();

	return (
		<PopoverContext.Provider value={popoverLogic}>
			<MotionConfig transition={TRANSITION}>
				<div
					className={cn(
						"relative flex items-center justify-center isolate",
						className
					)}
				>
					{children}
				</div>
			</MotionConfig>
		</PopoverContext.Provider>
	);
}

interface PopoverTriggerProps {
	children: React.ReactNode;
	className?: string;
}

export function PopoverTrigger({
	children,
	className,
	onClick,
}: PopoverTriggerProps) {
	const { openPopover, uniqueId } = usePopover();

	return (
		<motion.button
			key="button"
			layoutId={`popover-${uniqueId}`}
			className={cn(
				"flex h-9 items-center border border-zinc-950/10 bg-background px-3 text-foreground dark:border-zinc-50/10 dark:bg-background dark:text-foreground",
				className
			)}
			style={{
				borderRadius: 8,
			}}
			onClick={() => {
				openPopover();
				onClick?.();
				if (
					!!document.getElementsByClassName("react-trello-board").length
				) {
					document.getElementsByClassName(
						"react-trello-board"
					)[0].style.scrollBehavior = "smooth";
					setTimeout(() => {
						document.getElementsByClassName(
							"react-trello-board"
						)[0].scrollLeft =
							document.getElementsByClassName("react-trello-board")[0]
								.scrollWidth -
							document.getElementsByClassName("react-trello-board")[0]
								.clientWidth;
					}, 300);
				}
			}}
		>
			<motion.span
				layoutId={`popover-label-${uniqueId}`}
				className="text-sm"
			>
				{children}
			</motion.span>
		</motion.button>
	);
}

interface PopoverContentProps {
	children: React.ReactNode;
	className?: string;
}

export function PopoverContent({
	children,
	className,
	onCancel,
}: PopoverContentProps) {
	const { isOpen, closePopover, uniqueId } = usePopover();
	const formContainerRef = useRef<HTMLDivElement>(null);

	useClickOutside(formContainerRef, () => {
		closePopover();
		onCancel?.();
	});

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onCancel?.();
				closePopover();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [closePopover]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					ref={formContainerRef}
					layoutId={`popover-${uniqueId}`}
					className={cn(
						"absolute h-auto overflow-hidden border border-zinc-950/10 bg-background outline-hidden dark:bg-background z-50", // Changed z-90 to z-50
						className
					)}
					style={{
						borderRadius: 12,
						top: "auto", // Remove any top positioning
						left: "auto", // Remove any left positioning
						transform: "none", // Remove any transform
					}}
				>
					{React.cloneElement(children, { onClose: closePopover })}
				</motion.div>
			)}
		</AnimatePresence>
	);
}

interface PopoverFormProps {
	children: React.ReactNode;
	onSubmit?: (note: string) => void;
	className?: string;
}

export function PopoverForm({
	children,
	onSubmit,
	className,
}: PopoverFormProps) {
	const { note, closePopover } = usePopover();
	const handleSubmit = (e: React.FormEvent) => {
		e?.preventDefault();

		onSubmit?.(note);
		closePopover();
	};
	useEffect(() => {
		const listener = (event) => {
			if (event.code === "Enter" || event.code === "NumpadEnter") {
				event.preventDefault();
				handleSubmit(event);
			}
		};
		document.addEventListener("keydown", listener);
		return () => {
			document.removeEventListener("keydown", listener);
		};
	}, [note]);

	return (
		<form className={cn("flex h-full ", className)} onSubmit={handleSubmit}>
			{children}
		</form>
	);
}

interface PopoverLabelProps {
	children: React.ReactNode;
	className?: string;
}

export function PopoverLabel({ children, className }: PopoverLabelProps) {
	const { uniqueId, note } = usePopover();

	return (
		<motion.span
			layoutId={`popover-label-${uniqueId}`}
			aria-hidden="true"
			style={{
				opacity: note ? 0 : 1,
			}}
			className={cn(
				"absolute pointer-events-none content-center left-4 top-0 bottom-0 select-none text-sm text-foreground dark:text-foreground",
				className
			)}
		>
			{children}
		</motion.span>
	);
}

interface PopoverTextareaProps {
	className?: string;
}

export function PopoverTextarea({ className }: PopoverTextareaProps) {
	const { note, setNote } = usePopover();

	return (
		<textarea
			className={cn(
				"h-full w-28 resize-none content-center rounded-md bg-transparent px-4 py-3 text-sm outline-hidden",
				className
			)}
			autoFocus
			value={note}
			onChange={(e) => setNote(e.target.value)}
		/>
	);
}

interface PopoverFooterProps {
	children: React.ReactNode;
	className?: string;
}

export function PopoverFooter({ children, className }: PopoverFooterProps) {
	return (
		<div
			key="close"
			className={cn("flex justify-between px-4 items-center", className)}
		>
			{children}
		</div>
	);
}

interface PopoverCloseButtonProps {
	className?: string;
}

export function PopoverCloseButton({ className }: PopoverCloseButtonProps) {
	const { closePopover } = usePopover();

	return (
		<button
			type="button"
			className={cn("flex items-center", className)}
			onClick={closePopover}
			aria-label="Close popover"
		>
			<X size={16} className="text-foreground dark:text-foreground" />
		</button>
	);
}

interface PopoverSubmitButtonProps {
	className?: string;
}

export function PopoverSubmitButton({ className }: PopoverSubmitButtonProps) {
	return (
		<button
			className={cn(
				"relative ml-1 flex h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-foreground dark:hover:bg-background",
				className
			)}
			type="submit"
			aria-label="Submit note"
		>
			Submit
		</button>
	);
}

export function PopoverHeader({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"px-4 py-2 font-semibold text-foreground dark:text-foreground",
				className
			)}
		>
			{children}
		</div>
	);
}

export function PopoverBody({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return <div className={cn("p-4", className)}>{children}</div>;
}

// New component: PopoverButton
export function PopoverButton({
	children,
	onClick,
	className,
}: {
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
}) {
	return (
		<button
			className={cn(
				"flex w-full items-center gap-2 rounded-md px-4 py-2 text-left text-sm hover:bg-background dark:hover:bg-background",
				className
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
```

### `components/ui/kanban/explore-list/share-popover-content.tsx`

```tsx
import React, { useState } from "react";

import { cn } from "@/lib/utils";

const SharePopoverContent = ({ onClose, shareString }) => {
	const [copied, setCopied] = useState(false);

	const userClickCopy = () => {
		setCopied(true);
		setTimeout(() => {
			onClose();
		}, 600);
	};
	return (
		<span className="flex flex-col h-fit px-2">
			<div className="flex w-full place-content-between items-center">
				<button
					onClick={() => {
						navigator.clipboard.writeText(shareString.replace(/,/g, ""));
						userClickCopy();
					}}
					className="font-manrope w-fit flex gap-2 items-center"
				>
					{copied ? (
						<svg
							viewBox="0 0 48 48"
							version="1"
							width="16"
							height="16"
							xmlns="http://www.w3.org/2000/svg"
							enable-background="new 0 0 48 48"
							fill="#000000"
						>
							<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
							<g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							></g>
							<g id="SVGRepo_iconCarrier">
								{" "}
								<polygon
									fill="#43A047"
									points="40.6,12.1 17,35.7 7.4,26.1 4.6,29 17,41.3 43.4,14.9"
								></polygon>{" "}
							</g>
						</svg>
					) : (
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M6.66668 8.66648C6.95298 9.04923 7.31825 9.36594 7.73771 9.59511C8.15717 9.82428 8.62102 9.96056 9.09778 9.9947C9.57454 10.0288 10.0531 9.96006 10.5009 9.793C10.9487 9.62594 11.3554 9.36453 11.6933 9.02648L13.6933 7.02648C14.3005 6.39781 14.6365 5.5558 14.6289 4.68181C14.6213 3.80782 14.2708 2.97178 13.6527 2.35375C13.0347 1.73573 12.1987 1.38516 11.3247 1.37757C10.4507 1.36997 9.60869 1.70595 8.98001 2.31315L7.83334 3.45315M9.33334 7.33315C9.04704 6.9504 8.68177 6.63369 8.26231 6.40452C7.84285 6.17535 7.37901 6.03907 6.90224 6.00493C6.42548 5.97078 5.94695 6.03957 5.49911 6.20663C5.05128 6.37368 4.6446 6.6351 4.30668 6.97315L2.30668 8.97315C1.69948 9.60182 1.3635 10.4438 1.3711 11.3178C1.37869 12.1918 1.72926 13.0278 2.34728 13.6459C2.96531 14.2639 3.80135 14.6145 4.67534 14.6221C5.54933 14.6297 6.39134 14.2937 7.02001 13.6865L8.16001 12.5465"
								stroke="#524359"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					)}
					<span>Copy Link</span>
				</button>
				<svg
					width="11"
					height="11"
					viewBox="0 0 11 11"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="ml-auto"
					onClick={onClose}
				>
					<rect
						width="12.7854"
						height="1.46959"
						rx="0.734794"
						transform="matrix(0.712233 -0.701943 0.712233 0.701943 0.0749512 9.64258)"
						fill="#666666"
					/>
					<rect
						width="12.7854"
						height="1.46959"
						rx="0.734794"
						transform="matrix(-0.712233 -0.701943 -0.712233 0.701943 10.1528 9.64258)"
						fill="#666666"
					/>
				</svg>
			</div>

			<span
				className={cn(
					"m-2 rounded-lg px-2 mb-4 border max-w-[300px] border-[#1E1E1E] text-nowrap text-ellipsis overflow-hidden",
					{
						"border-green-500": copied,
					}
				)}
			>
				{shareString}
			</span>
		</span>
	);
};

export default SharePopoverContent;
```
