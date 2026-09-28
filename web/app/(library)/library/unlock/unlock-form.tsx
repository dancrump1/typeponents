"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { unlockGate, type UnlockState } from "./actions";

export function UnlockForm({ next }: { next: string }) {
	const [state, action, pending] = useActionState<UnlockState, FormData>(
		unlockGate,
		null
	);

	return (
		<form action={action} className="space-y-4">
			<input type="hidden" name="next" value={next} />
			<div className="space-y-2">
				<Label htmlFor="password">Password</Label>
				<Input
					id="password"
					name="password"
					type="password"
					autoComplete="current-password"
					autoFocus
					required
				/>
			</div>
			{state?.error ? (
				<p className="text-sm text-destructive">{state.error}</p>
			) : null}
			<Button type="submit" disabled={pending} className="w-full">
				{pending ? "Checking…" : "Unlock"}
			</Button>
		</form>
	);
}
