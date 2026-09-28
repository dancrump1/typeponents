"use client";

import Skeleton from "./component";

export default function Usage() {
	return (
		<div className="flex w-full max-w-md flex-col gap-4 p-8">
			<Skeleton className="h-12 w-12 rounded-full" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[250px]" />
				<Skeleton className="h-4 w-[200px]" />
			</div>
		</div>
	);
}
