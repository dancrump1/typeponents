"use client";

import { Sparkles } from "lucide-react";

import {
	FamilyDrawerAnimatedContent,
	FamilyDrawerAnimatedWrapper,
	FamilyDrawerClose,
	FamilyDrawerContent,
	FamilyDrawerHeader,
	FamilyDrawerOverlay,
	FamilyDrawerPortal,
	FamilyDrawerRoot,
	FamilyDrawerTrigger,
	FamilyDrawerViewContent,
} from "./component";

function DefaultView() {
	return (
		<div className="space-y-4">
			<FamilyDrawerHeader
				icon={<Sparkles className="h-6 w-6" />}
				title="Family Drawer"
				description="Animated multi-view drawer built with Vaul."
			/>
			<p className="text-sm text-muted-foreground">
				Swipe through views or close to dismiss.
			</p>
		</div>
	);
}

export default function Usage() {
	return (
		<div className="relative flex min-h-[400px] w-full items-center justify-center p-8">
			<FamilyDrawerRoot views={{ default: DefaultView }}>
				<FamilyDrawerTrigger>Open drawer</FamilyDrawerTrigger>
				<FamilyDrawerPortal>
					<FamilyDrawerOverlay />
					<FamilyDrawerContent>
						<FamilyDrawerClose />
						<FamilyDrawerAnimatedWrapper>
							<FamilyDrawerAnimatedContent>
								<FamilyDrawerViewContent />
							</FamilyDrawerAnimatedContent>
						</FamilyDrawerAnimatedWrapper>
					</FamilyDrawerContent>
				</FamilyDrawerPortal>
			</FamilyDrawerRoot>
		</div>
	);
}
