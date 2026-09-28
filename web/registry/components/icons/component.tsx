"use client";

import { useMemo, useRef } from "react";

import { Input } from "@/components/ui/input";
import { ICON_LIST } from "./index";
import Fuse from "fuse.js";
import { parseAsString, useQueryState } from "nuqs";

import { Card, CardTitle } from "@/components/ui/card";

const useSearch = (items: Icon[]) => {
	const [query] = useQueryState("q");

	const fuse = useMemo(
		() =>
			new Fuse(items, {
				keys: [
					{ name: "name", weight: 3 },
					{ name: "keywords", weight: 2 },
				],
				threshold: 0.3,
				ignoreLocation: true,
				findAllMatches: true,
				isCaseSensitive: false,
				minMatchCharLength: 2,
			}),
		[items]
	);

	const results = useMemo(() => {
		if (!query) return items;
		return fuse.search(query).map((result) => result.item);
	}, [fuse, query, items]);

	return { results };
};

type Icon = {
	name: string;
	content: string;
	keywords: string[];
};

export type { Icon };

type CountProps = {
	count: number;
};

const ListSearch = ({ count }: CountProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [search, setSearch] = useQueryState(
		"q",
		parseAsString.withDefault("")
	);

	const debouncedSetSearch = (value: string) => setSearch(value);

	return (
		<div className="relative">
			<Input
				ref={inputRef}
				placeholder={`Search ${count} icons...`}
				defaultValue={search ?? ""}
				onChange={(e) => debouncedSetSearch(e.target.value)}
			/>
			<kbd className="pointer-events-none absolute right-2 top-1/2 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 -translate-y-1/2">
				<span className="text-xs">⌘</span>K
			</kbd>
		</div>
	);
};

export { ListSearch };

type Props = {
	icons: Icon[];
};

const IconsList = () => {
	const icons = ICON_LIST.map((icon) => ({ ...icon, content: icon.icon }));
	const { results } = useSearch(icons);

	return (
		<div className="flex flex-col sm:mb-20 mb-10 mt-8 gap-6">
			<ListSearch count={icons?.length} />
			{results.length === 0 && <div>nothing here</div>}
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-[repeat(auto-fill,minmax(165px,1fr))] gap-3">
				{results.map((icon) => {
					const IconComponent = ICON_LIST.find(
						({ name }) => name === icon.name
					)!.icon;

					return (
						<Card key={icon.name}>
							<IconComponent />
							<CardTitle>{icon.name}</CardTitle>
						</Card>
					);
				})}
			</div>
		</div>
	);
};

export default IconsList;
