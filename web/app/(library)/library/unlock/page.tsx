import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { isLibraryUnlocked } from "@/lib/gate-server";
import { safeNextPath } from "@/lib/gate";

import { UnlockForm } from "./unlock-form";

export const metadata: Metadata = {
	title: "Unlock internal collection",
	robots: { index: false, follow: false },
};

export default async function UnlockPage({
	searchParams,
}: {
	searchParams: Promise<{ next?: string }>;
}) {
	const { next: rawNext } = await searchParams;
	const next = safeNextPath(rawNext);
	if (await isLibraryUnlocked()) redirect(next);

	return (
		<div className="mx-auto flex min-h-svh w-full max-w-md flex-col justify-center px-6 py-16">
			<Link
				href="/library"
				className="mb-8 text-xs text-muted-foreground hover:text-foreground"
			>
				← Library
			</Link>
			<h1 className="text-2xl font-semibold tracking-tight">
				Internal collection
			</h1>
			<p className="mt-2 text-sm text-muted-foreground">
				A subset of this library is licensed for internal use only and is not
				listed publicly. Enter the password to browse and copy those components.
			</p>
			<div className="mt-8">
				<UnlockForm next={next} />
			</div>
		</div>
	);
}
