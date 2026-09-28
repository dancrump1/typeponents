"use client";

import { useId } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useCharacterLimit } from "@/registry/ui-basic/hooks/useCharacterLimit";

export default function Component() {
	const id = useId();
	const maxLength = 8;
	const {
		value,
		characterCount,
		handleChange,
		maxLength: limit,
	} = useCharacterLimit({ maxLength });

	return (
		<div className="not-first:*:mt-2">
			<Label htmlFor={id}>Input with characters left</Label>
			<Input
				id={id}
				type="text"
				value={value}
				maxLength={maxLength}
				onChange={handleChange}
				aria-describedby={`${id}-description`}
			/>
			<p
				id={`${id}-description`}
				className="text-muted-foreground mt-2 text-xs"
				role="status"
				aria-live="polite"
			>
				<span className="tabular-nums">{limit - characterCount}</span>{" "}
				characters left
			</p>
		</div>
	);
}
