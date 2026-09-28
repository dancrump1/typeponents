"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "motion/react";

const features = [
	"5 users license",
	"Access to all components",
	"Lifetime access",
	"Unlimited projects",
	"Customer supports",
	"Free updates",
];

const variants = {
	badge: {
		hidden: {
			opacity: 0,
			y: 50,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: { delay: 1.2 },
		},
	},
	card: {
		hidden: {
			opacity: 0,
			y: 50,
		},
		visible: {
			opacity: 1,
			y: 0,
		},
	},
};

export default function PopularPriceCard() {
	return (
		<div className="flex items-center justify-center relative mt-4">
			<motion.div
				className="absolute -top-7 left-0"
				variants={variants.badge}
				initial="hidden"
				animate="visible"
				transition={{ duration: 1 }}
			>
				<div className="bg-priceAccent text-foreground px-4 py-1.5 rounded-r-xl rounded-l-3xl text-sm font-medium pb-12 pl-6">
					Most Popular
				</div>
			</motion.div>
			<motion.div
				className="z-10 w-full max-w-md rounded-3xl bg-background p-6 text-foreground shadow-xl relative"
				variants={variants.card}
				initial="hidden"
				animate="visible"
				transition={{ duration: 0.5 }}
			>
				<p className="text-xl font-medium">Startup Plan</p>
				<p className="mb-6 text-sm text-foreground">
					For small development teams and startups
				</p>

				<div className="mb-2 flex items-baseline">
					<span className="text-4xl font-bold">$499</span>
					<span className="ml-2 text-lg text-foreground">/month</span>
				</div>
				<div className="my-4">
					<Button className="w-full bg-priceAccent hover:bg-priceAccent/80">
						Subscribe
					</Button>
				</div>
				<ul className="space-y-3">
					{features.map((feature, index) => (
						<motion.li
							key={index + "pipeline"}
							className="flex items-center space-x-3"
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
						>
							<motion.span
								className="flex h-5 w-5 shrink-0 items-center justify-center"
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{
									type: "spring",
									stiffness: 500,
									delay: index * 0.1 + 0.2,
								}}
							>
								<Check className="h-4 w-4 text-priceAccent" />
							</motion.span>
							<p className="text-sm text-foreground">{feature}</p>
						</motion.li>
					))}
				</ul>
			</motion.div>
		</div>
	);
}
