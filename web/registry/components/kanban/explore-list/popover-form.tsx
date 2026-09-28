"use client";

import React, {
	createContext,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from "react";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";

const TRANSITION = {
	type: "spring",
	bounce: 0.05,
	duration: 0.3,
};

function useClickOutside(
	ref: React.RefObject<HTMLElement>,
	handler: () => void
) {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				handler();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, handler]);
}

interface PopoverContextType {
	isOpen: boolean;
	openPopover: () => void;
	closePopover: () => void;
	uniqueId: string;
	note: string;
	setNote: (note: string) => void;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

export function usePopover() {
	const context = useContext(PopoverContext);
	if (!context) {
		throw new Error("usePopover must be used within a PopoverProvider");
	}
	return context;
}

function usePopoverLogic() {
	const uniqueId = useId();
	const [isOpen, setIsOpen] = useState(false);
	const [note, setNote] = useState("");

	const openPopover = () => setIsOpen(true);
	const closePopover = () => {
		setIsOpen(false);
		setNote("");
	};

	return { isOpen, openPopover, closePopover, uniqueId, note, setNote };
}

interface PopoverRootProps {
	children: React.ReactNode;
	className?: string;
}

export function PopoverRoot({ children, className }: PopoverRootProps) {
	const popoverLogic = usePopoverLogic();

	return (
		<PopoverContext.Provider value={popoverLogic}>
			<MotionConfig transition={TRANSITION}>
				<div
					className={cn(
						"relative flex items-center justify-center isolate",
						className
					)}
				>
					{children}
				</div>
			</MotionConfig>
		</PopoverContext.Provider>
	);
}

interface PopoverTriggerProps {
	children: React.ReactNode;
	className?: string;
}

export function PopoverTrigger({
	children,
	className,
	onClick,
}: PopoverTriggerProps) {
	const { openPopover, uniqueId } = usePopover();

	return (
		<motion.button
			key="button"
			layoutId={`popover-${uniqueId}`}
			className={cn(
				"flex h-9 items-center border border-zinc-950/10 bg-background px-3 text-foreground dark:border-zinc-50/10 dark:bg-background dark:text-foreground",
				className
			)}
			style={{
				borderRadius: 8,
			}}
			onClick={() => {
				openPopover();
				onClick?.();
				if (
					!!document.getElementsByClassName("react-trello-board").length
				) {
					document.getElementsByClassName(
						"react-trello-board"
					)[0].style.scrollBehavior = "smooth";
					setTimeout(() => {
						document.getElementsByClassName(
							"react-trello-board"
						)[0].scrollLeft =
							document.getElementsByClassName("react-trello-board")[0]
								.scrollWidth -
							document.getElementsByClassName("react-trello-board")[0]
								.clientWidth;
					}, 300);
				}
			}}
		>
			<motion.span
				layoutId={`popover-label-${uniqueId}`}
				className="text-sm"
			>
				{children}
			</motion.span>
		</motion.button>
	);
}

interface PopoverContentProps {
	children: React.ReactNode;
	className?: string;
}

export function PopoverContent({
	children,
	className,
	onCancel,
}: PopoverContentProps) {
	const { isOpen, closePopover, uniqueId } = usePopover();
	const formContainerRef = useRef<HTMLDivElement>(null);

	useClickOutside(formContainerRef, () => {
		closePopover();
		onCancel?.();
	});

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onCancel?.();
				closePopover();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [closePopover]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					ref={formContainerRef}
					layoutId={`popover-${uniqueId}`}
					className={cn(
						"absolute h-auto overflow-hidden border border-zinc-950/10 bg-background outline-hidden dark:bg-background z-50", // Changed z-90 to z-50
						className
					)}
					style={{
						borderRadius: 12,
						top: "auto", // Remove any top positioning
						left: "auto", // Remove any left positioning
						transform: "none", // Remove any transform
					}}
				>
					{React.cloneElement(children, { onClose: closePopover })}
				</motion.div>
			)}
		</AnimatePresence>
	);
}

interface PopoverFormProps {
	children: React.ReactNode;
	onSubmit?: (note: string) => void;
	className?: string;
}

export function PopoverForm({
	children,
	onSubmit,
	className,
}: PopoverFormProps) {
	const { note, closePopover } = usePopover();
	const handleSubmit = (e: React.FormEvent) => {
		e?.preventDefault();

		onSubmit?.(note);
		closePopover();
	};
	useEffect(() => {
		const listener = (event) => {
			if (event.code === "Enter" || event.code === "NumpadEnter") {
				event.preventDefault();
				handleSubmit(event);
			}
		};
		document.addEventListener("keydown", listener);
		return () => {
			document.removeEventListener("keydown", listener);
		};
	}, [note]);

	return (
		<form className={cn("flex h-full ", className)} onSubmit={handleSubmit}>
			{children}
		</form>
	);
}

interface PopoverLabelProps {
	children: React.ReactNode;
	className?: string;
}

export function PopoverLabel({ children, className }: PopoverLabelProps) {
	const { uniqueId, note } = usePopover();

	return (
		<motion.span
			layoutId={`popover-label-${uniqueId}`}
			aria-hidden="true"
			style={{
				opacity: note ? 0 : 1,
			}}
			className={cn(
				"absolute pointer-events-none content-center left-4 top-0 bottom-0 select-none text-sm text-foreground dark:text-foreground",
				className
			)}
		>
			{children}
		</motion.span>
	);
}

interface PopoverTextareaProps {
	className?: string;
}

export function PopoverTextarea({ className }: PopoverTextareaProps) {
	const { note, setNote } = usePopover();

	return (
		<textarea
			className={cn(
				"h-full w-28 resize-none content-center rounded-md bg-transparent px-4 py-3 text-sm outline-hidden",
				className
			)}
			autoFocus
			value={note}
			onChange={(e) => setNote(e.target.value)}
		/>
	);
}

interface PopoverFooterProps {
	children: React.ReactNode;
	className?: string;
}

export function PopoverFooter({ children, className }: PopoverFooterProps) {
	return (
		<div
			key="close"
			className={cn("flex justify-between px-4 items-center", className)}
		>
			{children}
		</div>
	);
}

interface PopoverCloseButtonProps {
	className?: string;
}

export function PopoverCloseButton({ className }: PopoverCloseButtonProps) {
	const { closePopover } = usePopover();

	return (
		<button
			type="button"
			className={cn("flex items-center", className)}
			onClick={closePopover}
			aria-label="Close popover"
		>
			<X size={16} className="text-foreground dark:text-foreground" />
		</button>
	);
}

interface PopoverSubmitButtonProps {
	className?: string;
}

export function PopoverSubmitButton({ className }: PopoverSubmitButtonProps) {
	return (
		<button
			className={cn(
				"relative ml-1 flex h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-foreground dark:hover:bg-background",
				className
			)}
			type="submit"
			aria-label="Submit note"
		>
			Submit
		</button>
	);
}

export function PopoverHeader({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"px-4 py-2 font-semibold text-foreground dark:text-foreground",
				className
			)}
		>
			{children}
		</div>
	);
}

export function PopoverBody({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return <div className={cn("p-4", className)}>{children}</div>;
}

// New component: PopoverButton
export function PopoverButton({
	children,
	onClick,
	className,
}: {
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
}) {
	return (
		<button
			className={cn(
				"flex w-full items-center gap-2 rounded-md px-4 py-2 text-left text-sm hover:bg-background dark:hover:bg-background",
				className
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
