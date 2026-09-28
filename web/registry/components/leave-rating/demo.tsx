"use client";

import LeaveRating from "./component";

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center overflow-hidden p-8">
			<div className="w-full flex items-center justify-center bg-neutral-400 h-full">
  <LeaveRating
    question="How was your experience?"
    buttonText="Submit"
    onSubmit={(selected) => console.log(selected)}
  />
</div>
		</div>
	);
}
