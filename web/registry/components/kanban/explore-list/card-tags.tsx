import React from "react";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

const CardTags = ({ tags, setOpen, open }) => {
	if (tags.length > 3)
		return (
			<>
				<section
					className={cn("flex gap-1 w-full", {
						"flex-wrap": open,
					})}
				>
					<AnimatePresence mode="popLayout">
						{tags.slice(0, 2).map(({ title }) => {
							return (
								<motion.div
									layout
									key={title}
									initial={{ opacity: 1, scale: 1 }}
									animate={{
										opacity: 1,
										scale: 1,
										transition: { delay: 0.2 },
									}}
									className={
										"h-[24px] font-manrope content-center border border-[#252C30] rounded-full w-fit px-3 min-w-fit text-xs"
									}
								>
									{title}
								</motion.div>
							);
						})}
						{tags.slice(2, tags.length).map(({ title }) => {
							return (
								open && (
									<motion.div
										layout
										key={title}
										className={
											"h-[24px] font-manrope content-center shrink-0 border border-[#252C30] rounded-full w-fit px-3 min-w-fit text-xs"
										}
										initial={{ opacity: 0, scale: 0 }}
										animate={{
											opacity: 1,
											scale: 1,
											transition: { delay: 0.2 },
										}}
										exit={{
											opacity: 0,
											scale: 0,
										}}
									>
										{title}
									</motion.div>
								)
							);
						})}
						<motion.span
							key="open"
							onClick={(event) => {
								event.stopPropagation();
								setOpen(!open);
							}}
							layout
							className="mt-auto mb-[3px] mr-1 rounded-full shrink-0 border border-[#726350] w-[24px] h-[24px] flex items-center justify-center"
						>
							{open ? (
								<svg
									width="10"
									height="10"
									viewBox="0 0 10 10"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1.5 9.5C1.22386 9.77614 0.776142 9.77614 0.5 9.5C0.223858 9.22386 0.223858 8.77614 0.5 8.5L4 5L0.5 1.5C0.223857 1.22386 0.223858 0.776142 0.5 0.5C0.776142 0.223858 1.22386 0.223858 1.5 0.5L5 4L8.5 0.5C8.77614 0.223857 9.22386 0.223858 9.5 0.5C9.77614 0.776142 9.77614 1.22386 9.5 1.5L6 5L9.5 8.5C9.77614 8.77614 9.77614 9.22386 9.5 9.5C9.22386 9.77614 8.77614 9.77614 8.5 9.5L5 6L1.5 9.5Z"
										fill="#726350"
									/>
								</svg>
							) : (
								<svg
									width="4"
									height="14"
									viewBox="0 0 4 14"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M2 0C2.48125 0 2.89323 0.171354 3.23594 0.514062C3.57865 0.856771 3.75 1.26875 3.75 1.75C3.75 2.23125 3.57865 2.64323 3.23594 2.98594C2.89323 3.32865 2.48125 3.5 2 3.5C1.51875 3.5 1.10677 3.32865 0.764062 2.98594C0.421354 2.64323 0.25 2.23125 0.25 1.75C0.25 1.26875 0.421354 0.856771 0.764062 0.514062C1.10677 0.171354 1.51875 0 2 0ZM2 5.25C2.48125 5.25 2.89323 5.42135 3.23594 5.76406C3.57865 6.10677 3.75 6.51875 3.75 7C3.75 7.48125 3.57865 7.89323 3.23594 8.23594C2.89323 8.57865 2.48125 8.75 2 8.75C1.51875 8.75 1.10677 8.57865 0.764062 8.23594C0.421354 7.89323 0.25 7.48125 0.25 7C0.25 6.51875 0.421354 6.10677 0.764062 5.76406C1.10677 5.42135 1.51875 5.25 2 5.25ZM2 10.5C2.48125 10.5 2.89323 10.6714 3.23594 11.0141C3.57865 11.3568 3.75 11.7687 3.75 12.25C3.75 12.7313 3.57865 13.1432 3.23594 13.4859C2.89323 13.8286 2.48125 14 2 14C1.51875 14 1.10677 13.8286 0.764062 13.4859C0.421354 13.1432 0.25 12.7313 0.25 12.25C0.25 11.7687 0.421354 11.3568 0.764062 11.0141C1.10677 10.6714 1.51875 10.5 2 10.5Z"
										fill="#726350"
									/>
								</svg>
							)}
						</motion.span>
					</AnimatePresence>
				</section>
			</>
		);

	return (
		<span className="flex gap-1">
			{tags.map(({ title }) => (
				<div
					key={title}
					className={
						"font-manrope border content-center border-[#726350] rounded-full w-fit px-3  flex-1 min-w-fit text-xs"
					}
				>
					{title}
				</div>
			))}
		</span>
	);
};

export default CardTags;
