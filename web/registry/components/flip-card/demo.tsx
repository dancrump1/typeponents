import { FlipCard } from "./component";

export default function FlipCardBasic() {
	return (
		<>
			<FlipCard
				front={<Front />}
				back={<Back />}
				panelClassName=""
				flipDirection="horizontal"
				flipRotation="forward"
			/>
			<FlipCard
				front={<Front />}
				back={<Back />}
				className="w-[350px]"
				panelClassName="rounded-2xl bg-background"
				flipDirection="vertical"
				flipRotation="reverse"
			/>
		</>
	);
}

export const Front = () => {
	return (
		<div className="w-full h-full relative flex items-center justify-center">
			<img
				src="/itjustworks.jpg"
				alt="front image"
				className="w-full h-full absolute inset-0"
			/>
			<h3 className="text-secondary text-5xl font-semibold uppercase font-mono relative">
				BLOOM
			</h3>
		</div>
	);
};

export const Back = () => {
	return (
		<div className="w-full h-full relative flex flex-col items-center justify-center gap-3 p-4 bg-background dark:bg-background text-secondary dark:text-secondary">
			<h3 className="text-xl font-bold uppercase tracking-widest">
				Explore More
			</h3>
			<p className="text-sm text-center text-secondary dark:text-secondary">
				Dive into our exclusive collection of hand-crafted visuals.
			</p>
			<button className="mt-2 px-4 py-1.5 text-sm font-medium bg-background dark:bg-background text-secondary dark:text-secondary rounded-full hover:opacity-90 transition cursor-pointer">
				Browse Now
			</button>
		</div>
	);
};
