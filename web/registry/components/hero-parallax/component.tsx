"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";

import {
	motion,
	MotionValue,
	useScroll,
	useSpring,
	useTransform,
} from "motion/react";

// https://ui.aceternity.com/components/hero-parallax

const HeroParallax = ({
	products,
	containerRef,
}: {
	products: {
		title: string;
		slug: string;
		image: { url: string };
	}[];
}) => {
	const firstRow = products.slice(0, 5);
	const secondRow = products.slice(5, 10);
	const thirdRow = products.slice(10, 15);
	const ref = React.useRef(null);

	const [componentContainerRef, setComponentContainerRef] = useState(null);
	useEffect(() => {
		setComponentContainerRef(containerRef);
	}, [containerRef]);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
		// container: containerRef || null,
	});

	const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

	const translateX = useSpring(
		useTransform(scrollYProgress, [0, 1], [0, 1000]),
		springConfig
	);
	const translateXReverse = useSpring(
		useTransform(scrollYProgress, [0, 1], [0, -1000]),
		springConfig
	);
	const rotateX = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [15, 0]),
		springConfig
	);
	const opacity = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
		springConfig
	);
	const rotateZ = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [20, 0]),
		springConfig
	);
	const translateY = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
		springConfig
	);
	if (!!componentContainerRef && componentContainerRef?.current === undefined)
		return null;

	return (
		<div
			ref={ref}
			className="h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto perspective-[1000px] transform-3d"
		>
			<Header />
			<motion.div
				style={{
					rotateX,
					rotateZ,
					translateY,
					opacity,
				}}
				className=""
			>
				<motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
					{firstRow.map((product) => (
						<ProductCard
							product={product}
							translate={translateX}
							key={product.title}
						/>
					))}
				</motion.div>
				<motion.div className="flex flex-row  mb-20 space-x-20 ">
					{secondRow.map((product) => (
						<ProductCard
							product={product}
							translate={translateXReverse}
							key={product.title}
						/>
					))}
				</motion.div>
				<motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
					{thirdRow.map((product) => (
						<ProductCard
							product={product}
							translate={translateX}
							key={product.title}
						/>
					))}
				</motion.div>
			</motion.div>
		</div>
	);
};

export const Header = () => {
	return (
		<div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
			<h1 className="text-2xl md:text-7xl font-bold dark:text-foreground">
				The
				<span className="text-3xl md:text-9xl">Ultimate</span> <br />{" "}
				marketing studio
			</h1>
			<p className="max-w-2xl text-base md:text-xl mt-8 dark:text-foreground">
				We build beautiful products with the latest technologies and
				frameworks. We are a team of passionate developers and designers
				that love to build amazing products.
			</p>
		</div>
	);
};

export const ProductCard = ({
	product,
	translate,
}: {
	product: {
		title: string;
		slug: string;
		image: { url: string };
	};
	translate: MotionValue<number>;
}) => {
	return (
		<motion.div
			style={{
				x: translate,
			}}
			whileHover={{
				y: -20,
			}}
			key={product.title}
			className="group/product h-96 w-120 relative shrink-0"
		>
			<Link
				href={product.slug || ""}
				className="block group-hover/product:shadow-2xl "
			>
				<img
					src={product.image[0].url}
					height="600"
					width="600"
					className="object-cover object-top-left absolute h-full w-full inset-0"
					alt={product.title}
				/>
			</Link>
			<div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-background pointer-events-none"></div>
			<h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-foreground">
				{product.title}
			</h2>
		</motion.div>
	);
};

export default HeroParallax;
