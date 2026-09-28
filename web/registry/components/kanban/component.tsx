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
