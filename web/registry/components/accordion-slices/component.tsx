import { Dispatch, SetStateAction, useState } from "react";

import { useWindowSize } from "@/hooks/use-window-size";
import { AnimatePresence, motion } from "motion/react";
import { IconType } from "react-icons";
import { FiBarChart, FiBell, FiDollarSign, FiPlay } from "react-icons/fi";

// Credit:
// www.hover.dev/components/accordions#vertical-accordion

const AccordionSlices = () => {
	const [open, setOpen] = useState(items[0].id);

	return (
		<section className="p-4 bg-background">
			<div className="flex flex-col lg:flex-row h-fit lg:h-[450px] w-full max-w-6xl mx-auto shadow-sm overflow-hidden">
				{items.map((item) => {
					return (
						<Panel
							key={item.id}
							open={open}
							setOpen={setOpen}
							id={item.id}
							Icon={item.Icon}
							title={item.title}
							imgSrc={item.imgSrc}
							description={item.description}
						/>
					);
				})}
			</div>
		</section>
	);
};

interface PanelProps {
	open: number;
	setOpen: Dispatch<SetStateAction<number>>;
	id: number;
	Icon: IconType;
	title: string;
	imgSrc: string;
	description: string;
}

const Panel = ({
	open,
	setOpen,
	id,
	Icon,
	title,
	imgSrc,
	description,
}: PanelProps) => {
	const { width } = useWindowSize();

	const isOpen = open === id;

	return (
		<>
			<button
				className="bg-background hover:bg-foreground transition-colors p-3 border-r border-b border-slate-200 flex flex-row-reverse lg:flex-col justify-end items-center gap-4 relative group"
				onClick={() => setOpen(id)}
			>
				<span
					style={{
						writingMode: "vertical-lr",
					}}
					className="hidden lg:block text-xl font-light rotate-180"
				>
					{title}
				</span>
				<span className="block lg:hidden text-xl font-light">{title}</span>
				<div className="w-6 lg:w-full aspect-square bg-indigo-600 text-foreground grid place-items-center">
					<Icon />
				</div>
				<span className="w-4 h-4 bg-background group-hover:bg-slate-50 transition-colors border-r border-b lg:border-b-0 lg:border-t border-slate-200 rotate-45 absolute bottom-0 lg:bottom-[50%] right-[50%] lg:right-0 translate-y-[50%] translate-x-[50%] z-20" />
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						key={`panel-${id}`}
						variants={
							width && width > 1024 ? panelVariants : panelVariantsSm
						}
						initial="closed"
						animate="open"
						exit="closed"
						style={{
							backgroundimgSrc: `url(${imgSrc})`,
							backgroundPosition: "center",
							backgroundSize: "cover",
						}}
						className="w-full h-full overflow-hidden relative bg-background flex items-end"
					>
						<motion.div
							variants={descriptionVariants}
							initial="closed"
							animate="open"
							exit="closed"
							className="px-4 py-2 bg-background/40 backdrop-blur-xs text-foreground"
						>
							<p>{description}</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default AccordionSlices;

const panelVariants = {
	open: {
		width: "100%",
		height: "100%",
	},
	closed: {
		width: "0%",
		height: "100%",
	},
};

const panelVariantsSm = {
	open: {
		width: "100%",
		height: "200px",
	},
	closed: {
		width: "100%",
		height: "0px",
	},
};

const descriptionVariants = {
	open: {
		opacity: 1,
		y: "0%",
		transition: {
			delay: 0.125,
		},
	},
	closed: { opacity: 0, y: "100%" },
};

const items = [
	{
		id: 1,
		title: "Earn more",
		Icon: FiDollarSign,
		imgSrc: "/itjustworks.jpg",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eius deserunt quia consectetur aliquid obcaecati voluptatibus quos distinctio natus! Tenetur.",
	},
	{
		id: 2,
		title: "Play more",
		Icon: FiPlay,
		imgSrc: "/itjustworks.jpg",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eius deserunt quia consectetur aliquid obcaecati voluptatibus quos distinctio natus! Tenetur.",
	},
	{
		id: 3,
		title: "Keep track",
		Icon: FiBell,
		imgSrc: "/itjustworks.jpg",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eius deserunt quia consectetur aliquid obcaecati voluptatibus quos distinctio natus! Tenetur.",
	},
	{
		id: 4,
		title: "Grow faster",
		Icon: FiBarChart,
		imgSrc: "/itjustworks.jpg",
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum eius deserunt quia consectetur aliquid obcaecati voluptatibus quos distinctio natus! Tenetur.",
	},
];
