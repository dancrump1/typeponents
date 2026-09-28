"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";

import Preloader from "@/components/custom/preloader";
import { useHover } from "@/lib/hover-context";
import ContentWithImage from "@/registry/components/content-with-image/component";
import InfiniteScrollingLogosAnimation from "@/registry/components/infinite-scrolling-logos-animation/component";
import OppositeScroll from "@/registry/components/opposite-scroll-links/component";
import {
	ScrollVelocityContainer,
	ScrollVelocityRow,
} from "@/registry/components/scroll-velocity/component";
import { AnimatePresence } from "motion/react";
import SVG from "react-inlinesvg";

export const fake_workspotlight = [
	{
		id: "work1",
		title: "work 1",
		image: { url: "/itjustworks.jpg" },
		uri: "https://google.com",
	},
	{
		id: "work2",
		title: "work 2",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work3",
		title: "work 3",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work4",
		title: "work 4",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work5",
		title: "work 5",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work6",
		title: "work 6",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work7",
		title: "work 7",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work8",
		title: "work 8",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work9",
		title: "work 9",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work10",
		title: "work 10",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
];

export const exampleImages = [
	{
		url: "/itjustworks.jpg",
		author: "Branislav Rodman",
		title: "A Black and White Photo of a Woman Brushing Her Teeth",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-painting-of-a-palm-leaf-on-a-multicolored-background-AaNPwrSNOFE",
		title: "Neon Palm",
		author: "Tim Mossholder",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-blurry-photo-of-a-crowd-of-people-UgbxzloNGsc",
		author: "ANDRII SOLOK",
		title: "A blurry photo of a crowd of people",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/rippling-crystal-blue-water-9-OCsKoyQlk",
		author: "Wesley Tingey",
		title: "Rippling Crystal Blue Water",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/de/fotos/mann-im-schwarzen-hemd-unter-blauem-himmel-m8RDNiuEXro",
		author: "Serhii Tyaglovsky",
		title: "Mann im schwarzen Hemd unter blauem Himmel",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-woman-with-a-flower-crown-on-her-head-0S3muIttbsY",
		author: "Vladimir Yelizarov",
		title: "A women with a flower crown on her head",
	},
	{
		url: "/itjustworks.jpg",
		title: "A blurry photo of white flowers in a field",
		author: "Eugene Golovesov",
		link: "https://unsplash.com/photos/a-blurry-photo-of-white-flowers-in-a-field-6qbx0lzGPyc",
	},
	{
		url: "/itjustworks.jpg",
		author: "Mathilde Langevin",
		link: "https://unsplash.com/photos/a-table-topped-with-two-wine-glasses-and-plates-Ig0gRAHspV0",
		title: "A table topped with two wine glasses and plates",
	},
];

function extractString(str: string) {
	// Find the last occurrence of '/'
	const lastSlashIndex = str.lastIndexOf("/");

	// Find the first occurrence of '?' after the last '/'
	const questionMarkIndex = str.indexOf("?", lastSlashIndex);

	// Extract the part after the last '/' and before the first '?'
	if (questionMarkIndex !== -1) {
		return str.substring(lastSlashIndex + 1, questionMarkIndex);
	} else {
		// If there's no '?' in the string, return the part after the last '/'
		return str.substring(lastSlashIndex + 1);
	}
}

function Home({ data, result }) {
	const [loader, setLoader] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoader(false);
		}, 2250);
	}, [loader]);

	const { image, headline, workSpotlight, callToAction } = data.homeEntries[0];
	const { assets, asset, cta } = data;
	const hero = image;

	const video = hero?.find((asset) => !!asset.embeddedAsset)?.embeddedAsset;
	const videoId = video ? extractString(video.iframeSrc) : null;

	const { hovered } = useHover();

	return (
		<>
			<AnimatePresence mode="wait">
				{loader && <Preloader />}
			</AnimatePresence>


			{!loader && (
				<main className="">
					<section className="h-screen w-full flex items-center justify-center relative overflow-x-clip">
						<div className="w-full h-screen overflow-hidden md:overflow-visible flex flex-col items-center justify-center relative">
							<span>{result}</span>

							<div className="flex py-32 flex-col justify-center items-center w-[250px] sm:w-[300px] md:w-[500px] lg:w-[700px] z-50 pointer-events-auto">
								<SVG
									src={"/dbsbottom.svg"}
									title={"half of our logo"}
									height={100}
									width={800}
									className="stroke-white"
									role="img"
									aria-label={"half of our logo"}
									loader={<span>Loading...</span>}
								/>
							</div>
						</div>
					</section>

					<section className="bg-secondary my-32 py-32">
						<ScrollVelocityContainer className="text-4xl md:text-7xl md:leading-20 font-bold tracking-[-0.02em]">
							<ScrollVelocityRow
								baseVelocity={5}
								direction={1}
								className="z-10 relative"
							>
								{callToAction?.title}
							</ScrollVelocityRow>
							<Image
								src={asset?.url}
								alt={asset?.title}
								height={300}
								width={300}
								className="absolute left-[calc(50vw-155px)] -top-[70px] z-20 h-[250px] w-fit"
							/>
							<ScrollVelocityRow
								baseVelocity={5}
								direction={-1}
								className="z-30 relative"
							>
								{callToAction?.customText}
							</ScrollVelocityRow>
						</ScrollVelocityContainer>{" "}
					</section>

					<section className="flex my-32 relative">
						<ContentWithImage image={{ url: cta?.url }} />
					</section>

					<section className="my-32">
						<OppositeScroll works={workSpotlight} />
					</section>

					<section className="my-64">
						<InfiniteScrollingLogosAnimation assets={assets} />
					</section>
				</main>
			)}
		</>
	);
}

export default Home;
