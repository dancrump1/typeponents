import React, { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

// Credit:
// https://www.serenity-ui.com/components/testimonials/typewritertestimonial

type Testimonial = {
	image: string;
	text: string;
	name: string;
	jobtitle: string;
};

type TestimonialsProps = {
	testimonials: Testimonial[];
};

const TypewriterTestimonial: React.FC<TestimonialsProps> = ({
	testimonials,
}) => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const [hasBeenHovered, setHasBeenHovered] = useState<boolean[]>(
		new Array(testimonials.length).fill(false)
	);
	const [typedText, setTypedText] = useState("");
	const typewriterRef = useRef<NodeJS.Timeout | null>(null);
	const currentTextRef = useRef("");

	const handleMouseEnter = (index: number) => {
		setHoveredIndex(index);

		setHasBeenHovered((prev) => {
			const updated = [...prev];
			updated[index] = true;
			return updated;
		});
		startTypewriter(testimonials[index].text);
	};

	const handleMouseLeave = () => {
		setHoveredIndex(null);
		stopTypewriter();
	};

	const startTypewriter = (text: string) => {
		let i = 0;
		setTypedText("");
		currentTextRef.current = text;

		const type = () => {
			if (i <= text.length) {
				setTypedText(text.slice(0, i));
				i++;
				typewriterRef.current = setTimeout(type, 50);
			}
		};

		type();
	};

	const stopTypewriter = () => {
		if (typewriterRef.current) {
			clearTimeout(typewriterRef.current);
		}
		setTypedText("");
		currentTextRef.current = "";
	};

	useEffect(() => {
		return () => {
			if (typewriterRef.current) {
				clearTimeout(typewriterRef.current);
			}
		};
	}, []);

	return (
		<div className="flex justify-center items-center gap-4 flex-wrap">
			{testimonials.map((testimonial, index) => (
				<motion.div
					key={index + "typewriter-testimonial"}
					className="relative flex flex-col items-center"
					onMouseEnter={() => handleMouseEnter(index)}
					onMouseLeave={handleMouseLeave}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<motion.img
						src={testimonial.image}
						alt={`Testimonial ${index}`}
						className="w-16 h-16 rounded-full border-4 hover:animate-pulse border-gray-300"
						animate={{
							borderColor:
								hoveredIndex === index || hasBeenHovered[index]
									? "#ACA0FB"
									: "#E5E7EB",
						}}
						transition={{ duration: 0.3 }}
					/>
					<AnimatePresence>
						{hoveredIndex === index && (
							<motion.div
								initial={{ opacity: 0, scale: 0.8, y: -10 }}
								animate={{ opacity: 1, scale: 1, y: -20 }}
								exit={{ opacity: 0, scale: 0.8, y: -10 }}
								transition={{ duration: 0.4 }}
								className="absolute bottom-20 bg-background text-foreground text-sm px-4 py-3 rounded-lg shadow-2xl max-w-xs w-56"
							>
								<div className="h-24 overflow-hidden whitespace-pre-wrap">
									{typedText}
									<span className="animate-blink">|</span>
								</div>
								<p className="mt-2 text-right font-semibold">
									{testimonial.name}
								</p>
								<p className="text-right text-foreground text-sm">
									{testimonial.jobtitle}
								</p>
								<div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4">
									<div className="w-3 h-3 bg-background rounded-full shadow-lg"></div>
									<div className="w-2 h-2 bg-background rounded-full shadow-lg mt-1"></div>
									<div className="w-1 h-1 bg-background rounded-full shadow-lg mt-1"></div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			))}
		</div>
	);
};

export default TypewriterTestimonial;
