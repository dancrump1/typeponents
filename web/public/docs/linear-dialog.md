# Linear Dialog

- Categories: Modals
- Tags: keyboard
- Import: `@/components/ui/linear-dialog`
- Inspiration: UI Layouts (adaptation) — https://www.ui-layouts.com/components/linear-card

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/linear-dialog.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `lucide-react`
- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `transition` | `Transition` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import {
	Dialog,
	DialogClose,
	DialogContainer,
	DialogContent,
	DialogDescription,
	DialogImage,
	DialogTitle,
	DialogTrigger,
} from "./component";
import { Plus } from "lucide-react";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="flex gap-4">
				{[
					{
						id: 1,
						url: "/itjustworks.jpg",
						title: "Accordion",
						description:
							"Immerse yourself in our cutting-edge interactive gallery, designed to showcase a diverse array of visual content with unparalleled clarity and style. This feature allows users to effortlessly navigate through high-resolution images, from awe-inspiring landscapes to intimate portraits and abstract art. With smooth transitions, intuitive controls, and responsive design, our gallery adapts to any device, ensuring a seamless browsing experience. Dive deeper into each piece with expandable information panels, offering insights into the artist, technique, and story behind each image. ",
						tags: [
							"Sunrise",
							"Mountains",
							"Golden",
							"Scenic",
							"Inspiring",
						],
					},
					{
						id: 2,
						url: "/itjustworks.jpg",
						title: "Globe Section",
						description: `Embark on a virtual journey around the world with our state-of-the-art 3D globe feature. This interactive marvel allows users to explore geographical data, global trends, and worldwide connections with unprecedented ease and detail. Spin the globe with a flick of your mouse, zoom into street-level views, or soar high for a continental perspective. Our globe section integrates real-time data feeds, showcasing everything from climate patterns and population densities to economic indicators and cultural hotspots. Customizable layers let you focus on specific data sets, while intuitive tooltips provide in-depth information at every turn. `,
						tags: ["Misty", "Path", "Mysterious", "Serene", "Rugged"],
					},
					{
						id: 3,
						url: "/itjustworks.jpg",

						title: "Image Mouse Trail",
						description: `Transform your browsing experience with our mesmerizing Image Mouse Trail feature. As you move your cursor across the screen, watch in wonder as a trail of carefully curated images follows in its wake, creating a dynamic and engaging visual spectacle. This innovative feature goes beyond mere aesthetics; it's an interactive showcase of your content, products, or artwork. Each image in the trail can be clickable, leading to detailed views or related content, turning casual mouse movements into opportunities for discovery.`,
						tags: [
							"Pathway",
							"Adventure",
							"Peaks",
							"Challenging",
							"Breathtaking",
						],
					},
				].map((item, i) => {
					return (
						<>
							<Dialog
								transition={{
									type: "spring",
									bounce: 0.05,
									duration: 0.5,
								}}
							>
								<DialogTrigger
									style={{
										borderRadius: "12px",
									}}
									className="flex w-full flex-col overflow-hidden  border    dark:bg-background bg-background hover:bg-background dark:hover:bg-background"
								>
									<DialogImage
										src={"/itjustworks.jpg"}
										alt=""
										className=" h-64 w-full object-cover"
									/>
									<div className="flex grow flex-row items-end justify-between p-3">
										<div>
											<DialogTitle className="text-secondary text-xl dark:text-secondary">
												{item.title}
											</DialogTitle>
										</div>
										<button className="absolute bottom-2 right-2 p-2 dark:bg-background bg-background hover:bg-background rounded-full dark:hover:bg-background">
											<Plus className="w-6 h-6" />
										</button>
									</div>
								</DialogTrigger>
								<DialogContainer className="pt-20">
									<DialogContent
										style={{
											borderRadius: "24px",
										}}
										className=" relative flex h-full mx-auto flex-col overflow-y-auto border dark:bg-background bg-background hover:bg-background dark:hover:bg-background lg:w-[900px] w-[80%] "
									>
										<DialogImage
											src={"/itjustworks.jpg"}
											alt=""
											className="h-full  object-contain w-[60%] mx-auto"
										/>
										<div className="p-6">
											<DialogTitle className="text-5xl text-secondary dark:text-secondary">
												{item.title}
											</DialogTitle>

											<DialogDescription
												disableLayoutAnimation
												variants={{
													initial: {
														opacity: 0,
														scale: 0.8,
														y: -40,
													},
													animate: {
														opacity: 1,
														scale: 1,
														y: 0,
													},
													exit: {
														opacity: 0,
														scale: 0.8,
														y: -50,
													},
												}}
											>
												<p className="mt-2 text-secondary dark:text-secondary">
													{item.description}
												</p>
											</DialogDescription>
										</div>
										<DialogClose className="text-secondary  dark:bg-background bg-background p-4 hover:bg-background rounded-full dark:hover:bg-background" />
									</DialogContent>
								</DialogContainer>
							</Dialog>
						</>
					);
				})}
			</div>{" "}
		</div>
	);
}
```

## Source

### `components/ui/linear-dialog.tsx`

```tsx
"use client";

import React, {
	useCallback,
	useContext,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";

import { cn } from "@/lib/utils";
// import useClickOutside from '@/hooks/useClickOutside';
import { XIcon } from "lucide-react";
import {
	AnimatePresence,
	motion,
	MotionConfig,
	Transition,
	Variant,
} from "motion/react";
import { createPortal } from "react-dom";

// Credit:
// https://www.ui-layouts.com/components/linear-card

interface DialogContextType {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	uniqueId: string;
	triggerRef: React.RefObject<HTMLDivElement>;
}

const DialogContext = React.createContext<DialogContextType | null>(null);

function useDialog() {
	const context = useContext(DialogContext);
	if (!context) {
		throw new Error("useDialog must be used within a DialogProvider");
	}
	return context;
}

type DialogProviderProps = {
	children: React.ReactNode;
	transition?: Transition;
};

function DialogProvider({ children, transition }: DialogProviderProps) {
	const [isOpen, setIsOpen] = useState(false);
	const uniqueId = useId();
	const triggerRef = useRef<HTMLDivElement>(null);

	const contextValue = useMemo(
		() => ({ isOpen, setIsOpen, uniqueId, triggerRef }),
		[isOpen, uniqueId]
	);

	return (
		<DialogContext.Provider value={contextValue}>
			<MotionConfig transition={transition}>{children}</MotionConfig>
		</DialogContext.Provider>
	);
}

type DialogProps = {
	children: React.ReactNode;
	transition?: Transition;
};

function Dialog({ children, transition }: DialogProps) {
	return (
		<DialogProvider>
			<MotionConfig transition={transition}>{children}</MotionConfig>
		</DialogProvider>
	);
}

type DialogTriggerProps = {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
	triggerRef?: React.RefObject<HTMLDivElement>;
};

function DialogTrigger({
	children,
	className,
	style,
	triggerRef,
}: DialogTriggerProps) {
	const { setIsOpen, isOpen, uniqueId } = useDialog();

	const handleClick = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen, setIsOpen]);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				setIsOpen(!isOpen);
			}
		},
		[isOpen, setIsOpen]
	);

	return (
		<motion.div
			ref={triggerRef}
			layoutId={`dialog-${uniqueId}`}
			className={cn("relative cursor-pointer", className)}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			style={style}
			role="button"
			aria-haspopup="dialog"
			aria-expanded={isOpen}
			aria-controls={`dialog-content-${uniqueId}`}
		>
			{children}
		</motion.div>
	);
}

type DialogContent = {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
};

function DialogContent({ children, className, style }: DialogContent) {
	const { setIsOpen, isOpen, uniqueId, triggerRef } = useDialog();
	const containerRef = useRef<HTMLDivElement>(null);
	const [firstFocusableElement, setFirstFocusableElement] =
		useState<HTMLElement | null>(null);
	const [lastFocusableElement, setLastFocusableElement] =
		useState<HTMLElement | null>(null);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
			if (event.key === "Tab") {
				if (!firstFocusableElement || !lastFocusableElement) return;

				if (event.shiftKey) {
					if (document.activeElement === firstFocusableElement) {
						event.preventDefault();
						lastFocusableElement.focus();
					}
				} else {
					if (document.activeElement === lastFocusableElement) {
						event.preventDefault();
						firstFocusableElement.focus();
					}
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [setIsOpen, firstFocusableElement, lastFocusableElement]);

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden");
			const focusableElements = containerRef.current?.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			if (focusableElements && focusableElements.length > 0) {
				setFirstFocusableElement(focusableElements[0] as HTMLElement);
				setLastFocusableElement(
					focusableElements[focusableElements.length - 1] as HTMLElement
				);
				(focusableElements[0] as HTMLElement).focus();
			}
			// Scroll to the top when dialog opens
			if (containerRef.current) {
				containerRef.current.scrollTop = 0;
			}
		} else {
			document.body.classList.remove("overflow-hidden");
			triggerRef.current?.focus();
		}
	}, [isOpen, triggerRef]);

	return (
		<>
			<motion.div
				ref={containerRef}
				layoutId={`dialog-${uniqueId}`}
				className={cn("overflow-hidden", className)}
				style={style}
				role="dialog"
				aria-modal="true"
				aria-labelledby={`dialog-title-${uniqueId}`}
				aria-describedby={`dialog-description-${uniqueId}`}
			>
				{children}
			</motion.div>
		</>
	);
}

type DialogContainerProps = {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
};

function DialogContainer({ children, className }: DialogContainerProps) {
	const { isOpen, setIsOpen, uniqueId } = useDialog();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		if (isOpen) {
			window.scrollTo(0, 0);
		}
		setMounted(true);
		return () => setMounted(false);
	}, []);

	if (!mounted) return null;
	// createPortal(
	return (
		<AnimatePresence initial={false} mode="sync">
			{isOpen && (
				<>
					<motion.div
						key={`backdrop-${uniqueId}`}
						className="fixed inset-0 h-full z-50  w-full bg-background/40 backdrop-blur-xs dark:bg-background/40 "
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setIsOpen(false)}
					/>
					<div
						className={cn(`fixed  inset-0 z-50 w-fit mx-auto`, className)}
					>
						{children}
					</div>
				</>
			)}
		</AnimatePresence>
	);
	//   document.body
	// )
}

type DialogTitleProps = {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
};

function DialogTitle({ children, className, style }: DialogTitleProps) {
	const { uniqueId } = useDialog();

	return (
		<motion.div
			layoutId={`dialog-title-container-${uniqueId}`}
			className={className}
			style={style}
			layout
		>
			{children}
		</motion.div>
	);
}

type DialogSubtitleProps = {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
};

function DialogSubtitle({ children, className, style }: DialogSubtitleProps) {
	const { uniqueId } = useDialog();

	return (
		<motion.div
			layoutId={`dialog-subtitle-container-${uniqueId}`}
			className={className}
			style={style}
		>
			{children}
		</motion.div>
	);
}

type DialogDescriptionProps = {
	children: React.ReactNode;
	className?: string;
	disableLayoutAnimation?: boolean;
	variants?: {
		initial: Variant;
		animate: Variant;
		exit: Variant;
	};
};

function DialogDescription({
	children,
	className,
	variants,
	disableLayoutAnimation,
}: DialogDescriptionProps) {
	const { uniqueId } = useDialog();

	return (
		<motion.div
			key={`dialog-description-${uniqueId}`}
			layoutId={
				disableLayoutAnimation
					? undefined
					: `dialog-description-content-${uniqueId}`
			}
			variants={variants}
			className={className}
			initial="initial"
			animate="animate"
			exit="exit"
			id={`dialog-description-${uniqueId}`}
		>
			{children}
		</motion.div>
	);
}

type DialogImageProps = {
	src: string;
	alt: string;
	className?: string;
	style?: React.CSSProperties;
};

function DialogImage({ src, alt, className, style }: DialogImageProps) {
	const { uniqueId } = useDialog();

	return (
		<motion.img
			src={src}
			alt={alt}
			className={cn(className)}
			layoutId={`dialog-img-${uniqueId}`}
			style={style}
		/>
	);
}

type DialogCloseProps = {
	children?: React.ReactNode;
	className?: string;
	variants?: {
		initial: Variant;
		animate: Variant;
		exit: Variant;
	};
};

function DialogClose({ children, className, variants }: DialogCloseProps) {
	const { setIsOpen, uniqueId } = useDialog();

	const handleClose = useCallback(() => {
		setIsOpen(false);
	}, [setIsOpen]);

	return (
		<motion.button
			onClick={handleClose}
			type="button"
			aria-label="Close dialog"
			key={`dialog-close-${uniqueId}`}
			className={cn("absolute right-6 top-6", className)}
			initial="initial"
			animate="animate"
			exit="exit"
			variants={variants}
		>
			{children || <XIcon size={24} />}
		</motion.button>
	);
}

export {
	Dialog,
	DialogTrigger,
	DialogContainer,
	DialogContent,
	DialogClose,
	DialogTitle,
	DialogSubtitle,
	DialogDescription,
	DialogImage,
};
```

## Attribution

Source: UI Layouts · Original: https://www.ui-layouts.com/components/linear-card

Adapted from the original. Credit the original author when you ship this.
