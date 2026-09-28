import { useEffect, useRef, useState } from "react";

//optional hook for smooth scrolling
// import useLenis from "@/hooks/useLenis";
import { motion, useScroll, useTransform } from "motion/react";

// Credit:
// https://www.edilozi.pro/docs/components/horizontal-scroll
const Example = ({ containerRef }) => {
	return (
		<div className="bg-background">
			<div className="flex h-48 items-center justify-center">
				<span className="font-semibold uppercase text-foreground">
					Scroll down
				</span>
			</div>
			<HorizontalScrollCarousel containerRef={containerRef} />
			<div className="flex h-48 items-center justify-center">
				<span className="font-semibold uppercase text-foreground">
					Scroll up
				</span>
			</div>
		</div>
	);
};

export const HorizontalScrollCarousel = ({ containerRef }) => {
	const targetRef = useRef<HTMLDivElement | null>(null);
	const [componentContainerRef, setComponentContainerRef] = useState(null);

	const { scrollYProgress } = useScroll({
		target: targetRef,
		// container: componentContainerRef,
	});

	const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

	// useLenis();

	useEffect(() => {
		setComponentContainerRef(containerRef);
	}, [containerRef]);

	if (!!componentContainerRef && componentContainerRef?.current === undefined)
		return null;

	return (
		<section ref={targetRef} className="relative h-[300vh] bg-background">
			<div className="sticky top-0 flex h-screen items-center overflow-hidden">
				<motion.div style={{ x }} className="flex gap-4">
					{cards.map((card) => {
						return <Card card={card} key={card.id} />;
					})}
				</motion.div>
			</div>
		</section>
	);
};

const Card = ({ card }: { card: CardType }) => {
	return (
		<div
			key={card.id}
			className="group relative h-[450px] w-[450px] overflow-hidden bg-background"
		>
			<div
				style={{
					backgroundImage: `url(${card.url})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
				className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
			></div>
			<div className="absolute inset-0 z-10 grid place-content-center">
				<p className="bg-linear-to-br from-background/20 to-background/0 p-8 text-6xl font-black uppercase text-foreground backdrop-blur-lg">
					{card.title}
				</p>
			</div>
		</div>
	);
};

export default Example;

type CardType = {
	url: string;
	title: string;
	id: number;
};

const cards: CardType[] = [
	{
		url: "/itjustworks.jpg",
		title: "Title 1",
		id: 1,
	},
	{
		url: "/itjustworks.jpg",
		title: "Title 2",
		id: 2,
	},
	{
		url: "/itjustworks.jpg",
		title: "Title 3",
		id: 3,
	},
	{
		url: "/itjustworks.jpg",
		title: "Title 4",
		id: 4,
	},
	{
		url: "/itjustworks.jpg",
		title: "Title 5",
		id: 5,
	},
	{
		url: "/itjustworks.jpg",
		title: "Title 6",
		id: 6,
	},
	{
		url: "/itjustworks.jpg",
		title: "Title 7",
		id: 7,
	},
];
