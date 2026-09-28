import { useState } from "react";

import Image from "next/image";

import { ProgressiveBlur } from "./component";
import { motion } from "motion/react";

export default function ProgressiveBlurUsage() {
	const [isHover, setIsHover] = useState(false);

	return (
		<section className="flex">
			<div className="relative my-4 aspect-square w-[300px] overflow-hidden rounded-[4px]">
				<Image
					src="/itjustworks.jpg"
					width={100}
					height={100}
					alt="Benjamin Spiers - Moonlight 2023"
					className="absolute inset-0"
				/>
				<ProgressiveBlur
					className="pointer-events-none absolute bottom-0 left-0 h-[50%] w-full"
					blurIntensity={6}
				/>
				<div className="absolute bottom-0 left-0">
					<div className="flex flex-col items-start gap-0 px-5 py-4">
						<p className="text-base font-medium text-secondary">
							Benjamin Spiers
						</p>
						<span className="mb-2 text-base text-secondary">
							Moonlight 2023
						</span>
						<p className="text-base text-secondary">
							Oil on linen. 40cm by 30cm
						</p>
					</div>
				</div>
			</div>
			<div
				className="relative my-4 aspect-square h-[300px] overflow-hidden rounded-[4px]"
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
			>
				<Image
					src="/itjustworks.jpg"
					width={100}
					height={100}
					alt="John Martin - Pandemonium"
					className="absolute inset-0"
				/>
				<ProgressiveBlur
					className="pointer-events-none absolute bottom-0 left-0 h-[75%] w-full"
					blurIntensity={0.5}
					animate={isHover ? "visible" : "hidden"}
					variants={{
						hidden: { opacity: 0 },
						visible: { opacity: 1 },
					}}
					transition={{ duration: 0.2, ease: "easeOut" }}
				/>
				<motion.div
					className="absolute bottom-0 left-0"
					animate={isHover ? "visible" : "hidden"}
					variants={{
						hidden: { opacity: 0 },
						visible: { opacity: 1 },
					}}
					transition={{ duration: 0.2, ease: "easeOut" }}
				>
					<div className="flex flex-col items-start gap-0 px-5 py-4">
						<p className="text-base font-medium text-secondary">
							John Martin
						</p>
						<span className="text-base text-secondary">Pandemonium</span>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
