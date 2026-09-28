"use client";

import {
	CardContainer,
	CardContent,
	CardHeader,
	CardHr,
	FlipCardBackContent,
	FlipCardButton,
} from "./component";
import { useState } from "react";

export default function Usage() {
	const [flipped, setFlipped] = useState(false);

	return (
		<div className="flex items-center justify-center p-8">
			<CardContainer>
				{!flipped ? (
					<CardContent key="front">
						<CardHeader>Hover to explore</CardHeader>
						<CardHr />
						<div className="p-6 text-center text-muted-foreground">
							A flip card built from compound card primitives.
						</div>
						<FlipCardButton onClick={() => setFlipped(true)}>
							Flip card
						</FlipCardButton>
					</CardContent>
				) : (
					<FlipCardBackContent key="back">
						<CardHeader>Back side</CardHeader>
						<div className="p-6 text-center text-muted-foreground">
							Reverse content with the same motion system.
						</div>
						<FlipCardButton onClick={() => setFlipped(false)}>
							Flip back
						</FlipCardButton>
					</FlipCardBackContent>
				)}
			</CardContainer>
		</div>
	);
}
