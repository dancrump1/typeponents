import React, { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { v4 as uuidv4 } from "uuid";

import {
	PopoverButton,
	PopoverContent,
	PopoverFooter,
	PopoverForm,
	PopoverLabel,
	PopoverSubmitButton,
	PopoverTextarea,
} from "./popover-form";

const AddLaneForm = ({ onAdd, onCancel, t }) => {
	const [email, setEmail] = useState("");
	const [focus, setFocus] = useState(false);
	const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
	const label = "New Lane";
	const letters = label.split("");

	const show = focus || email;

	const handleSubmit = (value) => {
		// event.preventDefault();

		onAdd({
			id: uuidv4(),
			title: value,
		});
	};

	return (
		<PopoverContent onCancel={onCancel}>
			{/* <div className="p-4 w-full relative h-fit flex-col inline-block">
				<form
					onSubmit={(event) => handleSubmit(event)}
					className="grow flex justify-center"
				>
					<label
					htmlFor="email"
					className="absolute inset-0 flex items-center"
				>
					<span className="flex">
						{letters.map((letter, index) => (
							<motion.span
								aria-hidden
								className="inline-block"
								key={index + "addlaneform"}
								initial={false}
								animate={{
									x: 20,
									y: show ? -40 : 0,
									color: show ? "red" : "grey",
									opacity: status === "success" ? 0 : 1,
								}}
								transition={{
									type: "spring",
									duration: 0.4,
									delay: index * 0.01,
								}}
							>
								{letter}
							</motion.span>
						))}
						<span className="sr-only">{label}</span>
					</span>
				</label>

				<div
					className={cn(
						"h-12 w-full transition-[outline] outline-2 flex items-center gap-2 rounded-full pl-5 relative overflow-hidden",
						show ? "outline-amber-500" : "outline-neutral-300"
					)}
				>
					<input
						id="email"
						name="email"
						type="text"
						title="email"
						className="outline-hidden grow border-none"
						placeholder=""
						autoComplete="off"
						spellCheck="false"
						autoFocus
						value={email}
						ref={refInput}
						onChange={(e) => setEmail(e.target.value)}
						onFocus={() => setFocus(true)}
						onBlur={() => setFocus(false)}
					/>
					<motion.div
						className="absolute"
						initial={false}
						animate={{
							right: 4,
							x: show ? "calc(0% + 0px)" : "calc(100% + 4px)",
						}}
						transition={{ type: "spring", bounce: 0.3 }}
					>
						<motion.button
							layoutId="button"
							type="submit"
							style={{ borderRadius: 999 }}
							className="px-6 h-10 bg-linear-to-b from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 font-semibold shrink-0 transition-colors text-foreground border-none"
						>
							Save Lane
						</motion.button>
					</motion.div>
				</div>

					<div className="relative max-w-96 w-full bg-background">
					<label
						htmlFor="email"
						className="absolute inset-0 flex items-center"
					>
						<span className="flex">
							{letters.map((letter, index) => (
								<motion.span
									aria-hidden
									className="inline-block"
									key={index + 'add-lane-forms-letters}
									initial={false}
									animate={{
										x: 20,
										y: show ? -40 : 0,
										color: show
											? "var(--color-amber-500)"
											: "var(--color-neutral-400)",
										opacity: status === "success" ? 0 : 1,
									}}
									transition={{
										type: "spring",
										duration: 0.4,
										delay: index * 0.01,
									}}
								>
									{letter}
								</motion.span>
							))}
							<span className="sr-only">{label}</span>
						</span>
					</label>

					<div
						className={cn(
							"h-12 w-full transition-[outline] outline-2 flex items-center gap-2 rounded-full pl-5 relative overflow-hidden",
							show ? "outline-amber-500" : "outline-neutral-300"
						)}
					>
						<input
							id="email"
							name="email"
							type="email"
							title="email"
							className="outline-hidden grow border-none"
							placeholder=""
							required
							autoComplete="off"
							spellCheck="false"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onFocus={() => setFocus(true)}
							onBlur={() => setFocus(false)}
						/>
						<motion.div
							className="absolute"
							initial={false}
							animate={{
								right: 4,
								x: show ? "calc(0% + 0px)" : "calc(100% + 4px)",
							}}
							transition={{ type: "spring", bounce: 0.3 }}
						>
							<motion.button
								layoutId="button"
								type="submit"
								style={{ borderRadius: 999 }}
								className="px-6 h-10 bg-linear-to-b from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 font-semibold shrink-0 transition-colors text-foreground border-none"
							>
								Subscribe
							</motion.button>
						</motion.div>

						<AnimatePresence mode="popLayout">
							{status === "loading" && (
								<motion.div
									layoutId="button"
									className="absolute inset-0 z-10 bg-linear-to-b from-amber-400 to-amber-500 flex items-center justify-center text-foreground"
									style={{ borderRadius: 999 }}
								>
									<Loader size={18} className="animate-spin" />
								</motion.div>
							)}

							{status === "success" && (
								<div className="absolute inset-0 z-10 bg-linear-to-b from-amber-400 to-amber-500 flex items-center justify-center font-semibold text-foreground">
									<motion.span
										initial={{ y: -20, filter: "blur(4px)" }}
										animate={{ y: 0, filter: "blur(0px)" }}
										transition={{ type: "spring" }}
									>
										Your email has been subscribed!
									</motion.span>
								</div>
							)}
						</AnimatePresence>
					</div>
				</div>
				</form>
			</div> */}
			<PopoverForm onSubmit={handleSubmit}>
				<PopoverLabel>Add a Day</PopoverLabel>
				<PopoverTextarea />
				<PopoverFooter>
					<PopoverSubmitButton />
				</PopoverFooter>
			</PopoverForm>
		</PopoverContent>
	);
};

export default AddLaneForm;
