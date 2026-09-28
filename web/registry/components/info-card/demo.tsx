import { useState } from "react";

import {
	InfoCard,
	InfoCardAction,
	InfoCardContent,
	InfoCardDescription,
	InfoCardDismiss,
	InfoCardFooter,
	InfoCardMedia,
	InfoCardTitle,
} from "./component";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

export interface Step {
	title: string;
	description: string;
	image: any[];
	expandHeight?: number;
}

export default function MultiStepContent() {
	const [currentStep, setCurrentStep] = useState(0);

	const steps: Step[] = [
		{
			title: "Welcome to Our Platform!",
			description: "Let's take a quick tour of our new features!",
			image: [
				{
					src: "https://cd-misc.s3.us-east-2.amazonaws.com/sidebar/second.webp",
				},
				{
					src: "https://cd-misc.s3.us-east-2.amazonaws.com/sidebar/third.webp",
				},
				{
					src: "https://cd-misc.s3.us-east-2.amazonaws.com/sidebar/first.webp",
				},
			],
		},
		{
			title: "Powerful Dashboard!",
			description: "Everything you need, right at your fingertips!",
			image: [
				{
					type: "video",
					src:
						"https://video.twimg.com/ext_tw_video/" +
						"1811493439357476864/pu/vid/avc1/1280x720/r_A2n1_eDbYiTMkU.mp4?tag=12",
					autoPlay: true,
					loop: true,
					className: "shadow-none",
				},
			],
			expandHeight: 120,
		},
		{
			title: "Useful Tips!",
			description: "You can also use the sidebar to go to different pages!",
			image: [
				{
					src: "https://cd-misc.s3.us-east-2.amazonaws.com/sidebar/third.webp",
				},
				{
					src: "https://cd-misc.s3.us-east-2.amazonaws.com/sidebar/second.webp",
				},
			],
			expandHeight: 140,
		},
		{
			title: "Ready to Start?",
			description: "You're all set to explore the platform!",
			image: [
				{
					src: "https://cd-misc.s3.us-east-2.amazonaws.com/sidebar/first.webp",
					className: "shadow-none",
				},
			],
			expandHeight: 140,
		},
	];

	const handleNext = () => {
		setCurrentStep((prev) => prev + 1);
	};

	return (
		<InfoCard>
			<InfoCardContent>
				<InfoCardTitle>{steps[currentStep].title}</InfoCardTitle>
				<InfoCardDescription>
					{steps[currentStep].description}
				</InfoCardDescription>
				{steps[currentStep].image && (
					<InfoCardMedia
						media={steps[currentStep].image}
						expandHeight={steps[currentStep].expandHeight || undefined}
					/>
				)}
				<InfoCardFooter>
					{currentStep === steps.length - 1 ? (
						<>
							<div />
							<InfoCardDismiss className="flex flex-row items-center gap-1 hover:underline hover:cursor-pointer">
								Got it!
							</InfoCardDismiss>
						</>
					) : (
						<>
							<InfoCardDismiss>Dismiss</InfoCardDismiss>
							<InfoCardAction
								onClick={handleNext}
								className="flex flex-row items-center gap-1 hover:underline hover:cursor-pointer"
							>
								Next
							</InfoCardAction>
						</>
					)}
				</InfoCardFooter>
			</InfoCardContent>
		</InfoCard>
	);
}
