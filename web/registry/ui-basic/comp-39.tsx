"use client";

import { ClockIcon } from "lucide-react";
import {
	DateInput,
	DateSegment,
	Label,
	TimeField,
} from "react-aria-components";

export default function Component() {
	return (
		<TimeField className="not-first:*:mt-2">
			<Label className="text-foreground text-sm font-medium">
				Time input with end icon
			</Label>
			<div className="relative">
				<DateInput>
					{(segment) => <DateSegment segment={segment} />}
				</DateInput>{" "}
				<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 inset-e-0 z-10 flex items-center justify-center pe-3">
					<ClockIcon size={16} aria-hidden="true" />
				</div>
			</div>
			<p
				className="text-muted-foreground mt-2 text-xs"
				role="region"
				aria-live="polite"
			>
				Built with{" "}
				<a
					className="hover:text-foreground underline"
					href="https://react-spectrum.adobe.com/react-aria/DateField.html"
					target="_blank"
					rel="noopener nofollow"
				>
					React Aria
				</a>
			</p>
		</TimeField>
	);
}
