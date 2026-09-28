"use client";

import {
	NavAccordion,
	NavAccordionContent,
	NavAccordionItem,
	NavAccordionTrigger,
} from "./component";

export default function Usage() {
	return (
		<div className="relative w-full max-w-md p-8">
			<NavAccordion type="single" collapsible className="w-full">
				<NavAccordionItem value="home">
					<NavAccordionTrigger>Home</NavAccordionTrigger>
					<NavAccordionContent>
						<p className="text-sm text-muted-foreground">
							Mobile navigation accordion primitives.
						</p>
					</NavAccordionContent>
				</NavAccordionItem>
				<NavAccordionItem value="about">
					<NavAccordionTrigger>About</NavAccordionTrigger>
					<NavAccordionContent>
						<p className="text-sm text-muted-foreground">
							Use these building blocks for responsive nav menus.
						</p>
					</NavAccordionContent>
				</NavAccordionItem>
			</NavAccordion>
		</div>
	);
}
