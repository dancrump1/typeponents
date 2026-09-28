import { Dispatch, SetStateAction, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

// www.hover.dev/components/modals#spring-modal

const ExampleWrapper = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="px-4 py-64 bg-slate-900 grid place-content-center">
			<button
				onClick={() => setIsOpen(true)}
				className="bg-linear-to-r from-violet-600 to-indigo-600 text-foreground font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
			>
				Open Modal
			</button>
			<SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
		</div>
	);
};

export const SpringModal = ({
	isOpen,
	setIsOpen,
	children,
}: {
	children: any;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={() => setIsOpen(false)}
					className="bg-slate-900/20 backdrop-blur-sm p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
				>
					<motion.div
						initial={{ scale: 0, rotate: "12.5deg" }}
						animate={{ scale: 1, rotate: "0deg" }}
						exit={{ scale: 0, rotate: "0deg" }}
						onClick={(e) => e.stopPropagation()}
						className="bg-linear-to-br from-violet-600 to-indigo-600 text-foreground p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
					>
						<div className="relative z-10">{children}</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ExampleWrapper;
