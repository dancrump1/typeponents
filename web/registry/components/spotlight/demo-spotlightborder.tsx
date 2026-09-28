import { Spotlight } from "./component";

export default function SpotlightBorder() {
	return (
		<div className="relative aspect-video h-[200px] overflow-hidden rounded-xl bg-background/30 p-px dark:bg-background/30">
			<Spotlight
				className="from-blue-600 via-blue-500 to-blue-400 blur-3xl dark:from-blue-200 dark:via-blue-300 dark:to-blue-400"
				size={124}
			/>
			<div className="relative h-full w-full rounded-xl bg-background dark:bg-background"></div>
		</div>
	);
}
