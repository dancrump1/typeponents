"use client";

import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";

import Link from "next/link";

import { motion, useInView } from "motion/react";
import { IconType } from "react-icons";

const SwapColumnFeatures = () => {
	const [featureInView, setFeatureInView] = useState<FeatureType>(features[0]);

	return (
		<section className="relative mx-auto max-w-7xl">
			<SlidingFeatureDisplay featureInView={featureInView} />

			{/* Offsets the height of SlidingFeatureDisplay so that it renders on top of Content to start */}
			<div className="-mt-[100vh] hidden md:block" />

			{features.map((s) => (
				<Content
					key={s.id}
					featureInView={s}
					setFeatureInView={setFeatureInView}
					{...s}
				/>
			))}
		</section>
	);
};

const SlidingFeatureDisplay = ({
	featureInView,
}: {
	featureInView: FeatureType;
}) => {
	return (
		<div
			style={{
				justifyContent:
					featureInView.contentPosition === "l"
						? "flex-end"
						: "flex-start",
			}}
			className="pointer-events-none sticky top-0 z-10 hidden h-screen w-full items-center justify-center md:flex"
		>
			<motion.div
				layout
				transition={{
					type: "spring",
					stiffness: 100,
					damping: 25,
				}}
				className="h-fit w-3/5 rounded-xl p-8"
			>
				<ExampleFeature featureInView={featureInView} />
			</motion.div>
		</div>
	);
};

export const Content = ({
	setFeatureInView,
	featureInView,
}: {
	setFeatureInView: Dispatch<SetStateAction<FeatureType>>;
	featureInView: FeatureType;
}) => {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		margin: "-150px",
	});

	useEffect(() => {
		if (isInView) {
			setFeatureInView(featureInView);
		}
	}, [isInView]);

	return (
		<section
			ref={ref}
			className="relative z-0 flex h-fit md:h-screen"
			style={{
				justifyContent:
					featureInView.contentPosition === "l"
						? "flex-start"
						: "flex-end",
			}}
		>
			<div className="grid h-full w-full place-content-center px-4 py-12 md:w-2/5 md:px-8 md:py-8">
				<motion.div
					initial={{ opacity: 0, y: 25 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeInOut" }}
				>
					<span className="rounded-full bg-indigo-600 px-2 py-1.5 text-xs font-medium text-foreground">
						{featureInView.callout}
					</span>
					<p className="my-3 text-5xl font-bold">{featureInView.title}</p>
					<p className="text-slate-600 dark:text-foreground">
						{featureInView.description}
					</p>
					<Link
						href={featureInView.href}
						rel="noreferrer"
						target="_blank"
						className="underline"
					>
						Visit
					</Link>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 25 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeInOut" }}
					className="mt-8 block md:hidden"
				>
					<ExampleFeature featureInView={featureInView} />
				</motion.div>
			</div>
		</section>
	);
};

const ExampleFeature = ({ featureInView }: { featureInView: FeatureType }) => {
	if (featureInView?.isVideo) {
		return (
			<video
				poster={featureInView.poster}
				className="relative md:h-fit rounded-xl bg-slate-800 shadow-xl"
				loop
				src={featureInView.image}
				autoPlay
				muted
				loop
				height={600}
				width={1200}
			/>
		);
	}
	return (
		<Image
			src={featureInView?.image}
			alt=""
			height={600}
			width={1200}
			className="relative sm:h-[75vh] md:h-fit md:w-full rounded-xl bg-slate-800 shadow-xl"
		/>
		// 	<div className="flex w-full gap-1.5 rounded-t-xl bg-slate-900 p-3">
		// 		<div className="h-3 w-3 rounded-full bg-red-500" />
		// 		<div className="h-3 w-3 rounded-full bg-yellow-500" />
		// 		<div className="h-3 w-3 rounded-full bg-green-500" />
		// 	</div>
		// 	<div className="p-2">
		// 		<span className="font-mono text-sm text-slate-200">
		// 			<span className="text-green-300">~</span> Show a part of your
		// 			product that explains what{" "}
		// 			<span className="inline-block rounded bg-indigo-600 px-1 font-semibold">
		// 				"{featureInView.title}"
		// 			</span>{" "}
		// 			means.
		// 		</span>
		// 	</div>

		// 	<span className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-9xl text-slate-700">
		// 		<featureInView.Icon />
		// 	</span>
		// </img>
	);
};

type FeatureType = {
	id: number;
	callout: string;
	title: string;
	description: string;
	contentPosition: "l" | "r";
	Icon: IconType;
};

const features: FeatureType[] = [
	{
		id: 5,
		href: "https://google.com/",
		callout: "Made in a lab",
		title: "Lab made",
		description: "Lorum ipsum",
		contentPosition: "r",
		image: "/placeholder.mp4",
		isVideo: true,
		poster: "itjustworks.jpg",
	},
	{
		id: 4,
		href: "https://google.com/",
		callout: "Technology",
		title: "Lorum Ipsum",
		description: "Test Test 123",
		contentPosition: "l",
		image: "/placeholder.mp4",
		isVideo: true,
		poster: "itjustworks.jpg",
	},
	{
		id: 1,
		callout: "Construction",
		title: "Staplers",
		description: "A simple website that serves a huge purpose.",
		contentPosition: "r",
		href: "https://google.com/",
		image: "/placeholder.mp4",
		isVideo: true,
		poster: "itjustworks.jpg",
	},
	{
		id: 6,
		href: "https://google.com/",
		callout: "How Cool",
		title: "Pencil Sharpeners",
		description: "They work pretty well.",
		contentPosition: "l",
		image: "/placeholder.mp4",
		isVideo: true,
		poster: "itjustworks.jpg",
	},
];

export default SwapColumnFeatures;
