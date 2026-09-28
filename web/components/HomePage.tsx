"use client";

import { useState } from "react";

import Link from "next/link";

import { credits } from "@/app/(library)/credits/page";
import getData from "@/lib/fetchJavaData";
import { SpringModal } from "@/registry/components/spring-modal/component";

import { simpleCategories } from "@/config/components";

export default function HomePage({
	files,
	categories,
}: {
	files: { name: string }[];
	categories: any;
}) {
	const [hovered, setHovered] = useState<string | null>(null);

	const [isOpen, setIsOpen] = useState(false);
	const [isNewOpen, setIsNewOpen] = useState(false);

	const [categoryId, setCategoryId] = useState(1);
	const [description, setDescription] = useState("test ste 123");
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [newData, setNewData] = useState(null);

	const handleUpdate = async () => {
		try {
			const res = await fetch(
				`https://java.techdiff.io/category/${categoryId}/description`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Basic " + btoa("john:test123"),
					},
					body: JSON.stringify({ description }),
				}
			);

			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}

			const data = await res.json();
			setResponse(data);
			setError(null);
		} catch (err) {
			console.error(err);
			setError(err.message);
		}

		setNewData(await getData());
	};

	const [items, setItems] = useState([""]);
	const [test, setSubcategories] = useState([""]);


	return (
		<main className="min-h-screen bg-zinc-950 text-white p-8">
			<section>
				<h2>Heavy animations</h2>
				<div className="grid grid-cols-7 h-full min-h-screen">
					<div className="grid grid-cols-2 col-span-7 md:col-span-3 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto h-fit">
						{Object.entries(newData ?? categories).map(
							([category, { description, components }], i) => {
								// Build query string from subcategories
								const queryString =
									category === "All"
										? ""
										: "?" +
										components
											?.map(
												(sub) =>
													`subcategory=${encodeURIComponent(sub)}`
											)
											.join("&");

								// Build href
								const href =
									category === "All"
										? "/all"
										: `/type/${encodeURIComponent(category.toLowerCase().replace(/\s&\s|\s/g, "-"))}${queryString}`;

								const categoryTotal = files.filter(
									({ name }) =>
										name.includes(category) ||
										!!components
											?.map((filter) => name.includes(filter))
											.filter((item) => !!item).length
								);

								return (
									<div className="flex flex-col">
										<Link
											key={category}
											onMouseEnter={() => {
												setHovered(category);
												setItems(
													categoryTotal.map((item) => item.name)
												);
												setSubcategories(components);
											}}
											onMouseLeave={() => {
												setHovered(null);
												setItems([]);
												setSubcategories([]);
											}}
											href={href}
											className={`rounded-2xl h-fit relative px-6 py-4 bg-zinc-800 hover:bg-zinc-700 transition-colors text-center font-medium shadow-md ${category === "All"
												? "text-red-400"
												: "text-white"
												}`}
										>
											{category === "All" && hovered === "All"
												? "will cause lag"
												: category}
											<br />

											{categoryTotal.length}
											<br />
											{description}
										</Link>
										<button
											onClick={() => {
												setIsOpen(true);
												setCategoryId(i + 1);
												setDescription(description);
											}}
											className="bg-linear-to-r from-violet-600 to-indigo-600 text-foreground font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity h-fit"
										>
											Open Modal
										</button>
									</div>
								);
							}
						)}
						<SpringModal isOpen={isOpen} setIsOpen={setIsOpen}>
							<div
								style={{
									padding: "1rem",
									maxWidth: "500px",
								}}
							>
								<h2>Update Category Description</h2>
								<input
									type="text"
									placeholder="New description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									style={{
										width: "100%",
										padding: "0.5rem",
										marginBottom: "0.5rem",
									}}
								/>
								<input
									type="number"
									placeholder="category to change"
									value={categoryId}
									onChange={(e) => setCategoryId(e.target.value)}
									style={{
										width: "100%",
										padding: "0.5rem",
										marginBottom: "0.5rem",
									}}
								/>
								<button
									onClick={handleUpdate}
									style={{
										padding: "0.5rem 1rem",
										cursor: "pointer",
									}}
								>
									Update
								</button>

								{response && (
									<div
										style={{
											marginTop: "1rem",
											color: "green",
										}}
									>
										<strong>Updated category:</strong>{" "}
										{JSON.stringify(response)}
									</div>
								)}

								{error && (
									<div
										style={{
											marginTop: "1rem",
											color: "red",
										}}
									>
										<strong>Error:</strong> {error}
									</div>
								)}
							</div>
						</SpringModal>
						<span
							className={`rounded-2xl h-fit relative px-6 py-4 bg-zinc-800 transition-colors text-center font-medium shadow-md ${"text-white"}`}
						>
							⭐: Component added within a week
							<br />
							All: May cause lag
						</span>

						<SpringModal isOpen={isNewOpen} setIsOpen={setIsNewOpen}>
							<div
								style={{
									padding: "1rem",
									maxWidth: "500px",
								}}
							>
								<h2>new Category Description</h2>
								<input
									type="text"
									placeholder="New description"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									style={{
										width: "100%",
										padding: "0.5rem",
										marginBottom: "0.5rem",
									}}
								/>
								<input
									type="number"
									placeholder="category to change"
									value={categoryId}
									onChange={(e) => setCategoryId(e.target.value)}
									style={{
										width: "100%",
										padding: "0.5rem",
										marginBottom: "0.5rem",
									}}
								/>
								<button
									onClick={handleUpdate}
									style={{
										padding: "0.5rem 1rem",
										cursor: "pointer",
									}}
								>
									Add new Category
								</button>

								{response && (
									<div
										style={{
											marginTop: "1rem",
											color: "green",
										}}
									>
										<strong>added category:</strong>{" "}
										{JSON.stringify(response)}
									</div>
								)}

								{error && (
									<div
										style={{
											marginTop: "1rem",
											color: "red",
										}}
									>
										<strong>Error:</strong> {error}
									</div>
								)}
							</div>
						</SpringModal>
						<span
							className={`rounded-2xl h-fit relative px-6 py-4 bg-zinc-800 transition-colors text-center font-medium shadow-md ${"text-white"}`}
						>
							New Category
						</span>
						<button
							onClick={() => {
								setIsNewOpen(true);
								setCategoryId(i + 1);
								setDescription(description);
							}}
							className="bg-linear-to-r from-violet-600 to-indigo-600 text-foreground font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity h-fit"
						>
							Open Modal
						</button>
					</div>
					<div className="hidden md:block col-span-2">
						<span className="text-lg border-b-2 border-white">
							Matching Items:
						</span>
						<ul className="flex flex-col flex-wrap h-full max-h-[50vh] overflow-hidden">
							{items.map((item) => (
								<li>{item.replace(".json", "")}</li>
							))}
						</ul>
					</div>
					{/* <div className="hidden md:block col-span-1">
						<span className="text-lg border-b-2 border-white">
							Filter Match:
						</span>
						<ul className="flex flex-col flex-wrap h-full overflow-hidden">
							{test.map((item) => (
								<li>{item.replace(".json", "")}</li>
							))}
						</ul>
					</div> */}
					<div className="hidden md:block col-span-1">
						<div className="hidden md:block ">
							<span className="text-lg border-b-2 border-white">
								New Items:
							</span>
						</div>
					</div>
				</div>
			</section>
			<section className="h-[50vh]">
				<h2>Credits ({credits.length}):</h2>
				<div className="flex flex-wrap gap-2">
					{credits.sort().map((item, i) => (
						<a
							href={item}
							target="_blank"
							rel="noopener noreferrer"
							className={`rounded-2xl h-fit relative px-6 py-4 bg-zinc-800 hover:bg-zinc-700 transition-colors text-center font-medium shadow-md ${"text-white"}`}
						>
							{item
								.replace("https://", "")
								.replace("www.", "")
								.replace(".dev", "")
								.replace(".com", "")
								.replace(".net", "")
								.replace(".me", "")
								.replace(".io", "")
								.replace(".app", "")
								.replace("/", "")
								.replace(".design", "")}
						</a>
					))}
				</div>
			</section>
			<section>
				<h3>Basic Animations</h3>
				<div className="grid grid-cols-2 col-span-7 md:col-span-3 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto h-fit">
					{simpleCategories.map(({ slug, name }) => (
						<Link
							href={"/" + slug}
							className="rounded-2xl h-fit relative px-6 py-4 bg-zinc-800 hover:bg-zinc-700 transition-colors text-center font-medium shadow-md text-white"
							tabIndex={-1}
						>
							{name}
						</Link>
					))}
				</div>
			</section>
		</main>
	);
}
