import Attractor, { MatterBody } from "./component";
import { useWindowSize } from "@/hooks/use-window-size";

export default function AttractorPreview() {
	const screenSize = useWindowSize();

	const getImageCount = () => {
		if (screenSize.width < 150) return 50;
		if (screenSize.width < 750) return 60;
		if (screenSize.width < 1500) return 70;
		return 80;
	};

	const getMaxSize = () => {
		if (screenSize.width < 150) return 40;
		if (screenSize.width < 750) return 50;
		return 60;
	};

	const getMinSize = () => {
		if (screenSize.width < 150) return 10;
		if (screenSize.width < 750) return 20;
		return 20;
	};

	return (
		<div className="w-full h-full flex flex-col relative justify-center items-center md:items-end bg-background">
			<div>
				<p className="z-20 text-2xl sm:text-3xl md:text-3xl text-foreground dark:text-muted md:pr-24">
					join the <span className="font-calendas  italic">community</span>
				</p>
			</div>
			<Attractor
				attractorPoint={{ x: "33%", y: "50%" }}
				attractorStrength={0.0005}
				cursorStrength={-0.004}
				cursorFieldRadius={screenSize.width < 150 ? 100 : 200}
				className="w-full h-full"
			>
				{[...Array(getImageCount())].map((_, i) => {
					const size = Math.max(
						getMinSize(),
						Math.random() * getMaxSize()
					);
					return (
						<MatterBody
							key={i + "attractor-example"}
							matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
							x={`${Math.random() * 100}%`}
							y={`${Math.random() * 30}%`}
						>
							<img
								src={`https://randomuser.me/api/portraits/${
									i % 2 === 0 ? "men" : "women"
								}/${i}.jpg`}
								alt={`Avatar ${i}`}
								className="rounded-full object-cover hover:cursor-pointer"
								style={{
									width: `${size}px`,
									height: `${size}px`,
								}}
							/>
						</MatterBody>
					);
				})}
			</Attractor>
		</div>
	);
}
