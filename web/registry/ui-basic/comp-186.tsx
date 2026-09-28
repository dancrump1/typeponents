import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Component() {
	const id = useId();
	return (
		<div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-2xs outline-hidden">
			<Switch
				id={id}
				className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2"
				aria-describedby={`${id}-description`}
			/>
			<div className="grid grow gap-2">
				<Label htmlFor={id}>
					Label{" "}
					<span className="text-muted-foreground text-xs leading-[inherit] font-normal">
						(Sublabel)
					</span>
				</Label>
				<p
					id={`${id}-description`}
					className="text-muted-foreground text-xs"
				>
					A short description goes here.
				</p>
			</div>
		</div>
	);
}
