"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

import { SparklesCore } from "@/registry/components/sparkles/component";

// https://ui.aceternity.com/components/lamp-effect

export const LampContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={cn(
				"relative flex min-h-screen flex-col items-center md:w-1/2 justify-center overflow-hidden dark:bg-slate-950 z-0",
				className
			)}
		>
			<div className="relative flex flex-1 scale-y-125 items-center w-full justify-center isolate z-0 ">
				<motion.div
					initial={{ opacity: 0.5, width: "15rem" }}
					whileInView={{ opacity: 1, width: "30rem" }}
					viewport={{ once: true }}
					transition={{
						delay: 2,
						duration: 0.8,
						ease: "easeInOut",
					}}
					// style={{
					//   backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-from), var(--tw-gradient-to);)`,
					// }}
					className="from-[#D23A2A] via-transparent to-transparent absolute inset-auto right-1/2 h-56 overflow-visible w-120 bg-gradient-conic text-foreground [--conic-position:from_70deg_at_center_top]"
				>
					<div className="absolute  w-full left-0 dark:bg-slate-950 h-40 bottom-0 z-20 mask-[linear-gradient(to_top,white,transparent)]" />
					<div className="absolute  w-40 h-full left-0 dark:bg-slate-950  bottom-0 z-20 mask-[linear-gradient(to_right,white,transparent)]" />
				</motion.div>
				<motion.div
					initial={{ opacity: 0.5, width: "15rem" }}
					whileInView={{ opacity: 1, width: "30rem" }}
					viewport={{ once: true }}
					transition={{
						delay: 2,
						duration: 0.8,
						ease: "easeInOut",
					}}
					// style={{
					//   backgroundImage: `conic-gradient(var(--conic-position),  var(--tw-gradient-from), var(--tw-gradient-to);)`,
					// }}
					className="from-transparent via-transparent to-[#D23A2A] absolute inset-auto left-1/2 h-56 w-120 bg-gradient-conic text-foreground [--conic-position:from_290deg_at_center_top]"
				>
					<div className="absolute  w-40 h-full right-0 dark:bg-slate-950  bottom-0 z-20 mask-[linear-gradient(to_left,white,transparent)]" />
					<div className="absolute  w-full right-0 dark:bg-slate-950 h-40 bottom-0 z-20 mask-[linear-gradient(to_top,white,transparent)]" />
				</motion.div>

				<div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 dark:bg-slate-950 blur-2xl"></div>
				<div className="absolute top-1/2 z-40 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>

				<div className="absolute inset-auto z-40 h-36 w-md -translate-y-1/2 rounded-full bg-background opacity-50 blur-2xl"></div>

				<motion.div
					initial={{ width: "8rem" }}
					whileInView={{ width: "16rem" }}
					viewport={{ once: true }}
					transition={{
						delay: 2,
						duration: 0.8,
						ease: "easeInOut",
					}}
					className="absolute inset-auto z-30 h-36 w-64 -translate-y-24 rounded-full bg-background blur-2xl"
				></motion.div>
				<motion.div
					initial={{ opacity: 0.5, width: "15rem" }}
					whileInView={{ opacity: 1, width: "40rem" }}
					viewport={{ once: true }}
					transition={{
						delay: 2,
						duration: 0.8,
						ease: "easeInOut",
					}}
					className="absolute inset-auto h-40"
				>
					<SparklesCore minSize={0.4} maxSize={1} particleDensity={1200} />
				</motion.div>
				<motion.div
					initial={{ width: "15rem" }}
					whileInView={{ width: "30rem" }}
					viewport={{ once: true }}
					transition={{
						delay: 2,
						duration: 0.8,
						ease: "easeInOut",
					}}
					className="absolute inset-auto z-40 h-0.5 w-120 -translate-y-28 bg-background"
				></motion.div>

				<div className="absolute inset-auto z-40 h-44 w-full -translate-y-50 dark:bg-slate-950 "></div>
			</div>

			<div className="relative z-40 flex -translate-y-[55vh] flex-col items-center px-5">
				{children}
			</div>
		</div>
	);
};
