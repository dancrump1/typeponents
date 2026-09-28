import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export default function Component() {
	const id = useId();
	return (
		<div className="not-first:*:mt-2">
			<Label htmlFor={id}>
				Required select (native) <span className="text-destructive">*</span>
			</Label>
			<Select id={id}>
				<option value="1">React</option>
				<option value="2">Next.js</option>
				<option value="3">Astro</option>
				<option value="4">Gatsby</option>
			</Select>
		</div>
	);
}
