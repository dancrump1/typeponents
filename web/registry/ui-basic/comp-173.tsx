import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Component() {
	const id = useId();
	return (
		<div className="inline-flex items-center gap-2">
			<Switch
				id={id}
				className="h-5 w-8 [&_span]:size-4 [&_span]:data-[state=checked]:translate-x-3 rtl:[&_span]:data-[state=checked]:-translate-x-3"
			/>
			<Label htmlFor={id} className="sr-only">
				Small switch
			</Label>
		</div>
	);
}
