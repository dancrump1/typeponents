import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { isLibraryUnlocked } from "@/lib/gate-server";
import { readPublishStatus } from "@/lib/intake-job";

import { IntakeForm } from "./intake-form";

export const metadata: Metadata = {
	title: "Add a component",
	robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export default async function IntakePage() {
	if (!(await isLibraryUnlocked())) {
		redirect("/library/unlock?next=/library/intake");
	}

	return (
		<div className="mx-auto flex min-h-svh w-full max-w-lg flex-col px-6 py-16">
			<Link
				href="/library"
				className="mb-8 text-xs text-muted-foreground hover:text-foreground"
			>
				← Library
			</Link>
			<h1 className="text-2xl font-semibold tracking-tight">Add a component</h1>
			<p className="mt-2 text-sm text-muted-foreground">
				Paste a registry item URL. Intake copies it into this library, normalises
				its imports, and files it under the category you pick.
			</p>
			<div className="mt-8">
				<IntakeForm initialPublish={readPublishStatus()} />
			</div>
		</div>
	);
}
