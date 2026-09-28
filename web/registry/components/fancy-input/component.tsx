"use client";

import type React from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// Credit:
// https://starui.link/docs/components/subscribe

function Subscribe() {
	const [email, setEmail] = useState("");
	const [focus, setFocus] = useState(false);
	const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
	const label = "your@email.com";
	const letters = label.split("");

	const show = focus || email;

	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setStatus("loading");

		setTimeout(() => {
			setStatus("success");
		}, 3000);
	};

	return (
		<form onSubmit={onSubmit} className="grow flex justify-center">
			<div className="relative max-w-96 w-full bg-background">
				<label
					htmlFor="email"
					className="absolute inset-0 flex items-center z-10 pointer-events-none"
				>
					<span className="flex">
						{letters.map((letter, index) => (
							<motion.span
								aria-hidden
								className={cn(
									"inline-block",
									show ? "text-amber-500" : "text-foreground"
								)}
								key={index + "fancy-input"}
								initial={false}
								animate={{
									x: 20,
									y: show ? -40 : 0,
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
						"h-12 w-full transition-[border] border-2 flex items-center gap-2 rounded-full my-2 pl-5 relative overflow-hidden",
						show ? "border-amber-500" : "border-neutral-300"
					)}
				>
					<input
						id="email"
						name="email"
						type="email"
						title="email"
						className="border-none grow outline-hidden"
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
	);
}

export { Subscribe };
