"use client";

// Moved to the very top
// Re-implemented TextGradientTransition without styled-components
import React, {
	Children,
	cloneElement,
	isValidElement,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { Loader, Menu, MoveUpRight } from "lucide-react";
import {
	AnimatePresence,
	motion,
	useAnimate,
	useAnimationFrame,
	useMotionValue,
	useScroll,
	useSpring,
	useTransform,
	useVelocity,
} from "motion/react";
import {
	SiApple,
	SiFacebook,
	SiGoogle,
	SiNextdotjs,
	SiNgrx,
	SiShopify,
	SiSoundcloud,
	SiSpotify,
	SiTiktok,
} from "react-icons/si";

const titleWords = [
	{ text: "Innovate.", startColor: "#0071f2", endColor: "#01dfd8" },
	{ text: "Create.", startColor: "#7d00d9", endColor: "#ff0080" },
	{ text: "Grow.", startColor: "#ff4d4d", endColor: "#fbca00" },
];

const TextGradientTransition = () => {
	const [currentWordIndex, setCurrentWordIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentWordIndex(
				(prevIndex) => (prevIndex + 1) % titleWords.length
			);
		}, 3000); // Change word every 3 seconds
		return () => clearInterval(interval);
	}, []);

	const currentWord = titleWords[currentWordIndex];

	return (
		<div className="container text-center py-12 md:py-24 lg:py-32">
			<h1 className="mb-6 flex select-none flex-col items-center text-center text-5xl font-bold tracking-tight md:text-7xl lg:flex-row lg:justify-center lg:tracking-tighter xl:tracking-tight">
				<span className="relative inline-block">
					<AnimatePresence mode="wait">
						<motion.span
							key={currentWord.text}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5, ease: "easeOut" }}
							className="inline-block bg-clip-text text-transparent"
							style={{
								backgroundImage: `linear-gradient(90deg, ${currentWord.startColor}, ${currentWord.endColor})`,
							}}
						>
							{currentWord.text}
						</motion.span>
					</AnimatePresence>
				</span>
			</h1>
			<p className="mx-auto mb-8 max-w-3xl text-muted-foreground text-lg md:text-xl">
				We are a full-service marketing agency dedicated to helping your
				brand <span className="font-semibold text-foreground">thrive</span>{" "}
				in the digital landscape.
			</p>
			<div className="flex flex-col gap-4 sm:flex-row justify-center">
				<Link
					href="#"
					className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
				>
					Get a Free Consultation
				</Link>
				<Link
					href="#"
					className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
				>
					Learn More
				</Link>
			</div>
		</div>
	);
};

// ContentWithImage component from attachment
const ContentWithImage = ({ image = {} }) => {
	return (
		<section className="py-12 md:py-24 lg:py-32">
			<div className="mx-auto max-w-(--breakpoint-xl) px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
					<div>
						<div className="max-w-lg md:max-w-none space-y-4">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								{image.title || "Unlock Your Brand's Full Potential"}
							</h2>
							<p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								{image.description ||
									"From captivating websites to compelling graphic design and strategic PR, we offer a comprehensive suite of services tailored to elevate your brand and connect with your audience effectively."}
							</p>
						</div>
					</div>
					<div>
						<Image
							key={image.uid}
							className="h-full w-full object-cover rounded-lg shadow-lg"
							src="/itjustworks.jpg"
							title={image.alt}
							alt={image.alt || "Marketing agency services"}
							width={image.width || 1920}
							height={image.height || 1080}
							priority
							loading="eager"
							style={
								image.focalPoint
									? {
										objectPosition: `${image.focalPoint[0] * 100}% ${image.focalPoint[1] * 100}%`,
									}
									: {}
							}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

// HoverSquares component from attachment
const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
	left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
	bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
	top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
	right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
	left: [NO_CLIP, TOP_RIGHT_CLIP],
	bottom: [NO_CLIP, TOP_RIGHT_CLIP],
	top: [NO_CLIP, TOP_RIGHT_CLIP],
	right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({ Icon, href, title }) => {
	const [scope, animate] = useAnimate();

	const getNearestSide = (e) => {
		const box = e.target.getBoundingClientRect();

		const proximityToLeft = {
			proximity: Math.abs(box.left - e.clientX),
			side: "left",
		};
		const proximityToRight = {
			proximity: Math.abs(box.right - e.clientX),
			side: "right",
		};
		const proximityToTop = {
			proximity: Math.abs(box.top - e.clientY),
			side: "top",
		};
		const proximityToBottom = {
			proximity: Math.abs(box.bottom - e.clientY),
			side: "bottom",
		};

		const sortedProximity = [
			proximityToLeft,
			proximityToRight,
			proximityToTop,
			proximityToBottom,
		].sort((a, b) => a.proximity - b.proximity);

		return sortedProximity[0].side;
	};

	const handleMouseEnter = (e) => {
		const side = getNearestSide(e);

		animate(scope.current, {
			clipPath: ENTRANCE_KEYFRAMES[side],
		});
	};

	const handleMouseLeave = (e) => {
		const side = getNearestSide(e);

		animate(scope.current, {
			clipPath: EXIT_KEYFRAMES[side],
		});
	};

	return (
		<a
			href={href}
			onMouseEnter={(e) => {
				handleMouseEnter(e);
			}}
			onMouseLeave={(e) => {
				handleMouseLeave(e);
			}}
			className="relative grid h-32 w-full place-content-center sm:h-40 md:h-48 text-center"
		>
			<Icon className="text-3xl sm:text-4xl lg:text-5xl mx-auto mb-2" />
			<span className="text-lg font-semibold">{title}</span>

			<div
				ref={scope}
				style={{
					clipPath: BOTTOM_RIGHT_CLIP,
				}}
				className="absolute inset-0 grid place-content-center bg-primary text-primary-foreground"
			>
				<Icon className="text-3xl sm:text-4xl md:text-5xl mx-auto mb-2" />
				<span className="text-lg font-semibold">{title}</span>
			</div>
		</a>
	);
};

const HoverSquares = () => {
	return (
		<section className="py-12 md:py-24 lg:py-32 bg-muted">
			<div className="container mx-auto text-center mb-12">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
					Our Core Services
				</h2>
				<p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
					We offer a wide range of services to help your business succeed.
				</p>
			</div>
			<div className="divide-y divide-border border border-border max-w-4xl mx-auto rounded-lg overflow-hidden">
				<div className="grid grid-cols-1 sm:grid-cols-2 divide-x divide-border">
					<LinkBox Icon={SiGoogle} href="#" title="Website Design" />
					<LinkBox Icon={SiShopify} href="#" title="Graphic Design" />
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-x divide-border">
					<LinkBox Icon={SiApple} href="#" title="Brand Identity" />
					<LinkBox Icon={SiSoundcloud} href="#" title="Public Relations" />
					<LinkBox Icon={SiNextdotjs} href="#" title="Content Marketing" />
					<LinkBox Icon={SiFacebook} href="#" title="Social Media" />
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-3 divide-x divide-border">
					<LinkBox Icon={SiTiktok} href="#" title="SEO Optimization" />
					<LinkBox Icon={SiSpotify} href="#" title="Digital Advertising" />
					<LinkBox Icon={SiNgrx} href="#" title="Email Marketing" />
				</div>
			</div>
		</section>
	);
};

// CardSwap component from attachment
interface CardSwapProps {
	width?: number | string;
	height?: number | string;
	cardDistance?: number;
	verticalDistance?: number;
	delay?: number;
	pauseOnHover?: boolean;
	onCardClick?: (idx: number) => void;
	skewAmount?: number;
	teasing?: "linear" | "elastic";
	children: React.ReactNode;
}

interface SwapCardProps extends React.HTMLAttributes<HTMLDivElement> {
	customClass?: string;
}

const SwapCard = React.forwardRef<HTMLDivElement, SwapCardProps>(
	({ customClass, ...rest }, ref) => (
		<div
			ref={ref}
			{...rest}
			className={`absolute top-1/2 left-1/2 rounded-xl border border-border bg-card text-card-foreground transform-3d will-change-transform backface-hidden ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
		/>
	)
);
SwapCard.displayName = "SwapCard";

type CardRef = React.RefObject<HTMLDivElement>;
interface Slot {
	x: number;
	y: number;
	z: number;
	zIndex: number;
}

const makeSlot = (
	i: number,
	distX: number,
	distY: number,
	total: number
): Slot => ({
	x: i * distX,
	y: -i * distY,
	z: -i * distX * 1.5,
	zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
	gsap.set(el, {
		x: slot.x,
		y: slot.y,
		z: slot.z,
		xPercent: -50,
		yPercent: -50,
		skewY: skew,
		transformOrigin: "center center",
		zIndex: slot.zIndex,
		force3D: true,
	});

const CardSwap: React.FC<CardSwapProps> = ({
	width = 500,
	height = 400,
	cardDistance = 60,
	verticalDistance = 70,
	delay = 5000,
	pauseOnHover = false,
	onCardClick,
	skewAmount = 6,
	teasing = "elastic",
	children,
}) => {
	const config =
		teasing === "elastic"
			? {
				ease: "elastic.out(0.6,0.9)",
				durDrop: 2,
				durMove: 2,
				durReturn: 2,
				promoteOverlap: 0.9,
				returnDelay: 0.05,
			}
			: {
				ease: "power1.inOut",
				durDrop: 0.8,
				durMove: 0.8,
				durReturn: 0.8,
				promoteOverlap: 0.45,
				returnDelay: 0.2,
			};

	const childArr = useMemo(
		() => Children.toArray(children) as React.ReactElement<SwapCardProps>[],
		[children]
	);
	const refs = useMemo<CardRef[]>(
		() => childArr.map(() => React.createRef<HTMLDivElement>()),
		[childArr.length]
	);

	const order = useRef<number[]>(
		Array.from({ length: childArr.length }, (_, i) => i)
	);

	const tlRef = useRef<gsap.core.Timeline | null>(null);
	const intervalRef = useRef<number>();
	const container = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const total = refs.length;
		refs.forEach((r, i) =>
			placeNow(
				r.current!,
				makeSlot(i, cardDistance, verticalDistance, total),
				skewAmount
			)
		);

		const swap = () => {
			if (order.current.length < 2) return;

			const [front, ...rest] = order.current;
			const elFront = refs[front].current!;
			const tl = gsap.timeline();
			tlRef.current = tl;

			tl.to(elFront, {
				y: "+=500",
				duration: config.durDrop,
				ease: config.ease,
			});

			tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
			rest.forEach((idx, i) => {
				const el = refs[idx].current!;
				const slot = makeSlot(
					i,
					cardDistance,
					verticalDistance,
					refs.length
				);
				tl.set(el, { zIndex: slot.zIndex }, "promote");
				tl.to(
					el,
					{
						x: slot.x,
						y: slot.y,
						z: slot.z,
						duration: config.durMove,
						ease: config.ease,
					},
					`promote+=${i * 0.15}`
				);
			});

			const backSlot = makeSlot(
				refs.length - 1,
				cardDistance,
				verticalDistance,
				refs.length
			);
			tl.addLabel(
				"return",
				`promote+=${config.durMove * config.returnDelay}`
			);
			tl.call(
				() => {
					gsap.set(elFront, { zIndex: backSlot.zIndex });
				},
				undefined,
				"return"
			);
			tl.set(elFront, { x: backSlot.x, z: backSlot.z }, "return");
			tl.to(
				elFront,
				{
					y: backSlot.y,
					duration: config.durReturn,
					ease: config.ease,
				},
				"return"
			);

			tl.call(() => {
				order.current = [...rest, front];
			});
		};

		swap();
		intervalRef.current = window.setInterval(swap, delay);

		if (pauseOnHover) {
			const node = container.current!;
			const pause = () => {
				tlRef.current?.pause();
				clearInterval(intervalRef.current);
			};
			const resume = () => {
				tlRef.current?.play();
				intervalRef.current = window.setInterval(swap, delay);
			};
			node.addEventListener("mouseenter", pause);
			node.addEventListener("mouseleave", resume);
			return () => {
				node.removeEventListener("mouseenter", pause);
				node.removeEventListener("mouseleave", resume);
				clearInterval(intervalRef.current);
			};
		}
		return () => clearInterval(intervalRef.current);
	}, [
		cardDistance,
		verticalDistance,
		delay,
		pauseOnHover,
		skewAmount,
		teasing,
	]);

	const rendered = childArr.map((child, i) =>
		isValidElement<SwapCardProps>(child)
			? cloneElement(child, {
				key: i,
				ref: refs[i],
				style: { width, height, ...(child.props.style ?? {}) },
				onClick: (e) => {
					child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
					onCardClick?.(i);
				},
			} as SwapCardProps & React.RefAttributes<HTMLDivElement>)
			: child
	);

	return (
		<div
			ref={container}
			className="absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[900px] overflow-visible max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55]"
			style={{ width, height }}
		>
			{rendered}
		</div>
	);
};

// FancyInput component from attachment
function FancyInput() {
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
			setEmail(""); // Clear email on success
		}, 3000);
	};

	return (
		<form onSubmit={onSubmit} className="grow flex justify-center">
			<div className="relative max-w-96 w-full bg-white">
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
									show ? "text-primary" : "text-muted-foreground"
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
						show ? "border-primary" : "border-border"
					)}
				>
					<input
						id="email"
						name="email"
						type="email"
						title="email"
						className="border-none grow outline-hidden bg-transparent"
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
							className="px-6 h-10 bg-primary hover:bg-primary/90 font-semibold shrink-0 transition-colors text-primary-foreground border-none"
						>
							Subscribe
						</motion.button>
					</motion.div>

					<AnimatePresence mode="popLayout">
						{status === "loading" && (
							<motion.div
								layoutId="button"
								className="absolute inset-0 z-10 bg-primary flex items-center justify-center text-primary-foreground"
								style={{ borderRadius: 999 }}
							>
								<Loader size={18} className="animate-spin" />
							</motion.div>
						)}

						{status === "success" && (
							<div className="absolute inset-0 z-10 bg-primary flex items-center justify-center font-semibold text-primary-foreground">
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

// ImageReveal component from attachment
interface ImageData {
	id: number;
	src: string;
	alt: string;
}

const images: ImageData[] = [
	{
		id: 1,
		src: "/itjustworks.jpg",
		alt: "Marketing Campaign Dashboard",
	},
	{
		id: 2,
		src: "/itjustworks.jpg",
		alt: "Graphic Design Portfolio",
	},
	{
		id: 3,
		src: "/itjustworks.jpg",
		alt: "Brand Identity Guidelines",
	},
	{
		id: 4,
		src: "/itjustworks.jpg",
		alt: "Public Relations Strategy",
	},
];

const ImageReveal: React.FC = () => {
	const [activeImage, setActiveImage] = useState<ImageData | null>(null);
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [opacity, setOpacity] = useState(0);
	const [scale, setScale] = useState(0.5);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const requestRef = useRef<number | null>(null);
	const prevCursorPosition = useRef({ x: 0, y: 0 });

	const handleMouseMove = useCallback((e: MouseEvent) => {
		const { clientX, clientY } = e;
		const dx = clientX - prevCursorPosition.current.x;
		const dy = clientY - prevCursorPosition.current.y;

		const easeAmount = 0.2;
		const newX = prevCursorPosition.current.x + dx * easeAmount;
		const newY = prevCursorPosition.current.y + dy * easeAmount;

		setCursorPosition({ x: newX, y: newY });
		prevCursorPosition.current = { x: newX, y: newY };
	}, []);

	useEffect(() => {
		const updateCursorPosition = (e: MouseEvent) => {
			if (requestRef.current) return;
			requestRef.current = requestAnimationFrame(() => {
				handleMouseMove(e);
				requestRef.current = null;
			});
		};

		window.addEventListener("mousemove", updateCursorPosition);
		return () => {
			window.removeEventListener("mousemove", updateCursorPosition);
			if (requestRef.current) cancelAnimationFrame(requestRef.current);
		};
	}, [handleMouseMove]);

	const handleImageHover = useCallback(
		(image: ImageData) => {
			if (activeImage !== image) {
				setActiveImage(image);
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
				timeoutRef.current = setTimeout(() => {
					setOpacity(1);
					setScale(1);
				}, 50);
			} else {
				setOpacity(1);
				setScale(1);
			}
		},
		[activeImage]
	);

	const handleMouseLeave = useCallback(() => {
		setOpacity(0);
		setScale(0.5);
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			setActiveImage(null);
		}, 300);
	}, []);

	return (
		<section className="py-12 md:py-24 lg:py-32 bg-background">
			<div className="container mx-auto text-center mb-12">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
					Our Recent Work
				</h2>
				<p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
					Explore our diverse portfolio of successful projects.
				</p>
			</div>
			<div
				className="relative w-full min-h-fit bg-card rounded-md border max-w-4xl mx-auto"
				onMouseLeave={handleMouseLeave}
			>
				{images?.map((image, i) => (
					<div
						key={image.alt || i + "image-reveal"}
						className={`p-4 cursor-pointer relative sm:flex items-center justify-between`}
						onMouseEnter={() => handleImageHover(image)}
					>
						<img
							src="/itjustworks.jpg"
							className="sm:w-32 sm:h-20 w-full h-52 object-cover rounded-md block md:hidden"
							alt="mobileImg"
						/>

						<h2
							className={`text-foreground uppercase md:text-5xl sm:text-2xl text-xl font-semibold sm:py-6 py-2 leading-[100%] relative ${activeImage?.id === image?.id
								? "mix-blend-difference z-20 text-primary"
								: "text-muted-foreground"
								}`}
						>
							{image.alt}
						</h2>
						<button
							className={`sm:block hidden p-4 rounded-full transition-all duration-300 ease-out ${activeImage?.id === image?.id
								? "mix-blend-difference z-20 bg-primary text-primary-foreground"
								: ""
								}`}
						>
							<MoveUpRight className="w-8 h-8" />
						</button>
						<div
							className={`h-[2px] bg-primary absolute bottom-0 left-0 transition-all duration-300 ease-linear ${activeImage?.id === image?.id ? "w-full" : "w-0"
								}`}
						/>
					</div>
				))}
				{activeImage && (
					<Image
						height={200}
						width={200}
						src={activeImage.src || "/itjustworks.jpg"}
						alt={activeImage.alt}
						className={`fixed hidden md:block bg-card object-cover pointer-events-none z-10 w-[300px] h-[400px] rounded-lg shadow-xl`}
						style={{
							left: `${cursorPosition.x}px`,
							top: `${cursorPosition.y}px`,
							transform: `translate(-50%, -50%) scale(${scale})`,
							opacity: opacity,
						}}
					/>
				)}
			</div>
		</section>
	);
};

// FAQPage component from attachment
interface FAQItem {
	question: string;
	answer: string;
}

interface FAQData {
	[key: string]: FAQItem[];
}

const FAQPage: React.FC = () => {
	const [activeTab, setActiveTab] = useState<string>("Services");
	const [openQuestion, setOpenQuestion] = useState<string>(
		"What services does your marketing agency offer?"
	);

	const faqData: FAQData = {
		Services: [
			{
				question: "What services does your marketing agency offer?",
				answer:
					"We offer a comprehensive range of services including website design, graphic design, brand identity creation, public relations, content marketing, social media management, SEO optimization, and digital advertising.",
			},
			{
				question: "How do you approach website design projects?",
				answer:
					"Our website design process begins with understanding your brand and goals, followed by wireframing, design, development, and rigorous testing to ensure a responsive, user-friendly, and high-performing site.",
			},
			{
				question: "Can you help with my brand's social media presence?",
				answer:
					"We develop tailored social media strategies, create engaging content, manage your platforms, and analyze performance to boost your brand's online visibility and engagement.",
			},
			{
				question: "What is your process for creating brand identity?",
				answer:
					"We delve deep into your brand's values and vision to craft a unique identity that resonates with your target audience, including logo design, color palettes, typography, and brand guidelines.",
			},
		],
		Process: [
			{
				question: "What is your typical project workflow?",
				answer:
					"Our workflow generally involves initial consultation, proposal and strategy development, execution phase with regular client updates, review and feedback cycles, and final delivery with ongoing support.",
			},
			{
				question: "How do you ensure client satisfaction?",
				answer:
					"We prioritize clear communication, transparent processes, and collaborative efforts. Regular check-ins, detailed reports, and a dedicated project manager ensure your vision is realized.",
			},
			{
				question: "What is the typical timeline for a project?",
				answer:
					"Project timelines vary depending on complexity and scope. During our initial consultation, we provide a detailed timeline tailored to your specific needs and objectives.",
			},
		],
		Pricing: [
			{
				question: "How are your services priced?",
				answer:
					"Our services are custom-quoted based on the scope, complexity, and duration of your project. We offer competitive pricing and transparent breakdowns.",
			},
			{
				question: "Do you offer any packages or custom solutions?",
				answer:
					"We offer both pre-defined service packages for common needs and fully customized solutions to perfectly align with your unique marketing goals and budget.",
			},
		],
		Support: [
			{
				question:
					"What kind of support do you provide after project completion?",
				answer:
					"We offer various post-project support options, including maintenance, updates, and ongoing consultation, to ensure your marketing efforts continue to yield results.",
			},
			{
				question: "How can I get in touch with your team?",
				answer:
					"You can reach us via the contact form on our website, email, or phone. Our team is available during business hours to assist you.",
			},
		],
	};

	return (
		<section className="py-12 md:py-24 lg:py-32 bg-background">
			<div className="max-w-4xl mx-auto">
				<PageHeader
					title="FAQs"
					heading="Comprehensive Answers to Frequently Asked Questions"
					description="Find detailed answers to common questions about our services and tools."
				/>
				<div className="flex justify-center space-x-1 sm:space-x-5 mb-8 w-fit mx-auto">
					{Object.keys(faqData).map((tab) => (
						<motion.button
							key={tab}
							className={`px-2 py-1 font-bold rounded-md text-xs sm:text-sm ${activeTab === tab
								? "bg-primary text-primary-foreground"
								: "text-muted-foreground hover:text-foreground"
								}`}
							onClick={() => setActiveTab(tab)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{tab}
						</motion.button>
					))}
				</div>
				<div className="space-y-4 px-4">
					{faqData[activeTab].map((item) => (
						<motion.div
							key={item.question}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							className="border border-border rounded-lg overflow-hidden bg-card"
						>
							<motion.button
								className="w-full text-left p-4 flex justify-between items-center font-bold text-foreground"
								onClick={() =>
									setOpenQuestion(
										openQuestion === item.question
											? ""
											: item.question
									)
								}
							>
								<span>{item.question}</span>
								<motion.span
									animate={{
										rotate: openQuestion === item.question ? 45 : 0,
									}}
									transition={{ duration: 0.3 }}
								>
									+
								</motion.span>
							</motion.button>
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{
									height: openQuestion === item.question ? "auto" : 0,
									opacity: openQuestion === item.question ? 1 : 0,
								}}
								transition={{ duration: 0.3 }}
								className="overflow-hidden"
							>
								<div className="p-4 border-t border-border text-muted-foreground bg-card">
									{item.answer}
								</div>
							</motion.div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

interface PageHeaderProps {
	title: string;
	heading: string;
	description: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
	title,
	heading,
	description,
}) => {
	return (
		<div className="max-w-(--breakpoint-lg) mx-auto py-8">
			<div className="-z-50 absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[linear-gradient(to_bottom,white,transparent)]"></div>
			<p className="text-center font-bold uppercase text-sm text-primary mb-4">
				{title}
			</p>
			<h1 className="text-center lg:leading-10 mx-4 lg:mx-0">
				<span className="font-bold lg:text-5xl md:text-4xl sm:text-3xl text-2xl">
					{heading}
				</span>
			</h1>
			<p className="text-center w-full max-w-3xl mx-auto px-8 mt-4 text-sm md:text-base text-muted-foreground">
				{description}
			</p>
		</div>
	);
};

// MarqueeAlongSvgPath component from attachment
const wrap = (min: number, max: number, value: number): number => {
	const range = max - min;
	return ((((value - min) % range) + range) % range) + min;
};

type PreserveAspectRatioAlign =
	| "none"
	| "xMinYMin"
	| "xMidYMin"
	| "xMaxYMin"
	| "xMinYMid"
	| "xMidYMid"
	| "xMaxYMid"
	| "xMinYMax"
	| "xMidYMax"
	| "xMaxYMax";

interface CSSVariableInterpolation {
	property: string;
	from: number | string;
	to: number | string;
}

type PreserveAspectRatioMeetOrSlice = "meet" | "slice";

type PreserveAspectRatio =
	| PreserveAspectRatioAlign
	| `${Exclude<PreserveAspectRatioAlign, "none">} ${PreserveAspectRatioMeetOrSlice}`;

interface SpringOptions {
	damping: number;
	stiffness: number;
}

interface MarqueeAlongSvgPathProps {
	children: React.ReactNode;
	className?: string;

	// Path properties
	path: string;
	pathId?: string;
	preserveAspectRatio?: PreserveAspectRatio;
	showPath?: boolean;

	// SVG properties
	width?: string | number;
	height?: string | number;
	viewBox?: string;

	// Marquee properties
	baseVelocity?: number;
	direction?: "normal" | "reverse";
	teasing?: (value: number) => number;
	slowdownOnHover?: boolean;
	slowDownFactor?: number;
	slowDownSpringConfig?: SpringOptions;

	// Scroll properties
	useScrollVelocity?: boolean;
	scrollAwareDirection?: boolean;
	scrollSpringConfig?: SpringOptions;
	scrollContainer?: React.RefObject<HTMLElement> | HTMLElement | null;

	// Item repetition
	repeat?: number;

	// Drag properties
	draggable?: boolean;
	dragSensitivity?: number;
	dragVelocityDecay?: number;
	dragAwareDirection?: boolean;
	grabCursor?: boolean;

	// Z-index properties
	enableRollingZIndex?: boolean;
	zIndexBase?: number;
	zIndexRange?: number;

	cssVariableInterpolation?: CSSVariableInterpolation[];
}

const MarqueeAlongSvgPath = ({
	children,
	className,

	// Path defaults
	path,
	pathId,
	preserveAspectRatio = "xMidYMid meet",
	showPath = false,

	// SVG defaults
	width = "100%",
	height = "100%",
	viewBox = "0 0 100 100",

	// Marquee defaults
	baseVelocity = 5,
	direction = "normal",
	teasing,
	slowdownOnHover = false,
	slowDownFactor = 0.3,
	slowDownSpringConfig = { damping: 50, stiffness: 400 },

	// Scroll properties
	useScrollVelocity = false,
	scrollAwareDirection = false,
	scrollSpringConfig = { damping: 50, stiffness: 400 },
	scrollContainer,

	// Items repetition
	repeat = 3,

	// Drag defaults
	draggable = false,
	dragSensitivity = 0.2,
	dragVelocityDecay = 0.96,
	dragAwareDirection = false,
	grabCursor = false,

	// Z-index defaults
	enableRollingZIndex = true,
	zIndexBase = 1, // Base z-index value
	zIndexRange = 10, // Range of z-index values to use

	cssVariableInterpolation = [],
}: MarqueeAlongSvgPathProps) => {
	const container = useRef<HTMLDivElement>(null);
	const baseOffset = useMotionValue(0);

	const pathRef = useRef<SVGPathElement>(null);

	const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

	const items = React.useMemo(() => {
		const childrenArray = React.Children.toArray(children);

		return childrenArray.flatMap((child, childIndex) =>
			Array.from({ length: repeat }, (_, repeatIndex) => {
				const itemIndex = repeatIndex * childrenArray.length + childIndex;
				const key = `${childIndex}-${repeatIndex}`;
				return {
					child,
					childIndex,
					repeatIndex,
					itemIndex,
					key,
				};
			})
		);
	}, [children, repeat]);

	const calculateZIndex = useCallback(
		(offsetDistance: number) => {
			if (!enableRollingZIndex) {
				return undefined;
			}

			const normalizedDistance = offsetDistance / 100;
			return Math.floor(zIndexBase + normalizedDistance * zIndexRange);
		},
		[enableRollingZIndex, zIndexBase, zIndexRange]
	);

	const id =
		pathId || `marquee-path-${Math.random().toString(36).substring(7)}`;

	const { scrollY } = useScroll({
		container:
			(scrollContainer as React.RefObject<HTMLDivElement>) || container,
	});

	const scrollVelocity = useVelocity(scrollY);
	const smoothVelocity = useSpring(scrollVelocity, scrollSpringConfig);

	const isHovered = useRef(false);
	const isDragging = useRef(false);
	const dragVelocity = useRef(0);

	const directionFactor = useRef(direction === "normal" ? 1 : -1);

	const hoverFactorValue = useMotionValue(1);
	const defaultVelocity = useMotionValue(1);
	const smoothHoverFactor = useSpring(hoverFactorValue, slowDownSpringConfig);

	const velocityFactor = useTransform(
		useScrollVelocity ? smoothVelocity : defaultVelocity,
		[0, 1000],
		[0, 5],
		{
			clamp: false,
		}
	);

	useAnimationFrame((_, delta) => {
		if (isDragging.current && draggable) {
			baseOffset.set(baseOffset.get() + dragVelocity.current);

			dragVelocity.current *= 0.9;

			if (Math.abs(dragVelocity.current) < 0.01) {
				dragVelocity.current = 0;
			}

			return;
		}

		if (isHovered.current) {
			hoverFactorValue.set(slowdownOnHover ? slowDownFactor : 1);
		} else {
			hoverFactorValue.set(1);
		}

		let moveBy =
			directionFactor.current *
			baseVelocity *
			(delta / 1000) *
			smoothHoverFactor.get();

		if (scrollAwareDirection && !isDragging.current) {
			if (velocityFactor.get() < 0) {
				directionFactor.current = -1;
			} else if (velocityFactor.get() > 0) {
				directionFactor.current = 1;
			}
		}

		moveBy += directionFactor.current * moveBy * velocityFactor.get();

		if (draggable) {
			moveBy += dragVelocity.current;

			if (dragAwareDirection && Math.abs(dragVelocity.current) > 0.1) {
				directionFactor.current = Math.sign(dragVelocity.current);
			}

			if (!isDragging.current && Math.abs(dragVelocity.current) > 0.01) {
				dragVelocity.current *= dragVelocityDecay;
			} else if (!isDragging.current) {
				dragVelocity.current = 0;
			}
		}

		baseOffset.set(baseOffset.get() + moveBy);
	});

	const lastPointerPosition = useRef({ x: 0, y: 0 });

	const handlePointerDown = (e: React.PointerEvent) => {
		if (!draggable) return;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

		if (grabCursor) {
			(e.currentTarget as HTMLElement).style.cursor = "grabbing";
		}

		isDragging.current = true;
		lastPointerPosition.current = { x: e.clientX, y: e.clientY };

		dragVelocity.current = 0;
	};

	const handlePointerMove = (e: React.PointerEvent) => {
		if (!draggable || !isDragging.current) return;

		const currentPosition = { x: e.clientX, y: e.clientY };

		const deltaX = currentPosition.x - lastPointerPosition.current.x;
		const deltaY = currentPosition.y - lastPointerPosition.current.y;

		const delta = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
		const projectedDelta = deltaX > 0 ? delta : -delta;

		dragVelocity.current = projectedDelta * dragSensitivity;

		lastPointerPosition.current = currentPosition;
	};

	const handlePointerUp = (e: React.PointerEvent) => {
		if (!draggable) return;
		(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
		isDragging.current = false;

		if (grabCursor) {
			(e.currentTarget as HTMLElement).style.cursor = "grab";
		}
	};

	return (
		<div
			ref={container}
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			onPointerCancel={handlePointerUp}
			className={cn("relative", className)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={width}
				height={height}
				viewBox={viewBox}
				preserveAspectRatio={preserveAspectRatio}
				className="w-full h-full"
			>
				<path
					id={id}
					d={path}
					stroke={showPath ? "currentColor" : "none"}
					fill="none"
					ref={pathRef}
				/>
			</svg>

			{items.map(({ child, repeatIndex, itemIndex, key }) => {
				const itemOffset = useTransform(baseOffset, (v) => {
					const position = (itemIndex * 100) / items.length;
					const wrappedValue = wrap(0, 100, v + position);
					return `${teasing ? teasing(wrappedValue / 100) * 100 : wrappedValue}%`;
				});

				const currentOffsetDistance = useMotionValue(0);

				const zIndex = useTransform(currentOffsetDistance, (value) =>
					calculateZIndex(value)
				);

				useEffect(() => {
					const unsubscribe = itemOffset.on("change", (value: string) => {
						const match = value.match(/^([\d.]+)%$/);
						if (match && match[1]) {
							currentOffsetDistance.set(Number.parseFloat(match[1]));
						}
					});
					return unsubscribe;
				}, [itemOffset, currentOffsetDistance]);

				const cssVariables = Object.fromEntries(
					(cssVariableInterpolation || []).map(
						({ property, from, to }) => [
							property,
							useTransform(currentOffsetDistance, [0, 100], [from, to]),
						]
					)
				);

				return (
					<motion.div
						key={key}
						ref={(el) => {
							if (el) itemRefs.current.set(key, el);
						}}
						className={cn(
							"absolute top-0 left-0",
							draggable && grabCursor && "cursor-grab"
						)}
						style={{
							offsetPath: `path('${path}')`,
							offsetDistance: itemOffset,
							zIndex: enableRollingZIndex ? zIndex : undefined,
							...cssVariables,
						}}
						aria-hidden={repeatIndex > 0}
						onMouseEnter={() => (isHovered.current = true)}
						onMouseLeave={() => (isHovered.current = false)}
					>
						{child}
					</motion.div>
				);
			})}
		</div>
	);
};

export default function MarketingAgencySite() {
	const clientLogos = [
		{ src: "/abstract-geometric-logo.png", alt: "Client Logo 1" },
		{ src: "/abstract-geometric-logo.png", alt: "Client Logo 2" },
		{ src: "/abstract-geometric-logo.png", alt: "Client Logo 3" },
		{ src: "/abstract-geometric-logo.png", alt: "Client Logo 4" },
		{ src: "/abstract-logo-design-5.png", alt: "Client Logo 5" },
		{ src: "/abstract-geometric-logo.png", alt: "Client Logo 6" },
	];

	return (
		<div className="flex flex-col min-h-dvh">
			{/* Navbar */}
			<header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 border-b">
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="lg:hidden bg-transparent"
						>
							<Menu className="h-6 w-6" />
							<span className="sr-only">Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<Link
							href="/"
							className="flex items-center gap-2 text-lg font-semibold"
						>
							<Image
								src="/itjustworks.jpg"
								alt="Agency Logo"
								width={24}
								height={24}
							/>
							<span>Marketing Agency</span>
						</Link>
						<div className="grid gap-2 py-6">
							<Link
								href="#services"
								className="flex w-full items-center py-2 text-lg font-semibold"
							>
								Services
							</Link>
							<Link
								href="#portfolio"
								className="flex w-full items-center py-2 text-lg font-semibold"
							>
								Portfolio
							</Link>
							<Link
								href="#testimonials"
								className="flex w-full items-center py-2 text-lg font-semibold"
							>
								Testimonials
							</Link>
							<Link
								href="#faq"
								className="flex w-full items-center py-2 text-lg font-semibold"
							>
								FAQ
							</Link>
							<Link
								href="#contact"
								className="flex w-full items-center py-2 text-lg font-semibold"
							>
								Contact
							</Link>
						</div>
					</SheetContent>
				</Sheet>
				<Link
					href="/"
					className="mr-6 hidden lg:flex items-center gap-2 text-lg font-semibold"
				>
					<Image
						src="/itjustworks.jpg"
						alt="Agency Logo"
						width={24}
						height={24}
					/>
					<span>Marketing Agency</span>
				</Link>
				<NavigationMenu className="hidden lg:flex">
					<NavigationMenuList>
						<NavigationMenuLink asChild>
							<Link
								href="#services"
								className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-active:bg-accent/50 data-[state=open]:bg-accent/50"
							>
								Services
							</Link>
						</NavigationMenuLink>
						<NavigationMenuLink asChild>
							<Link
								href="#portfolio"
								className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-active:bg-accent/50 data-[state=open]:bg-accent/50"
							>
								Portfolio
							</Link>
						</NavigationMenuLink>
						<NavigationMenuLink asChild>
							<Link
								href="#testimonials"
								className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-active:bg-accent/50 data-[state=open]:bg-accent/50"
							>
								Testimonials
							</Link>
						</NavigationMenuLink>
						<NavigationMenuLink asChild>
							<Link
								href="#faq"
								className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-active:bg-accent/50 data-[state=open]:bg-accent/50"
							>
								FAQ
							</Link>
						</NavigationMenuLink>
						<NavigationMenuLink asChild>
							<Link
								href="#contact"
								className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-active:bg-accent/50 data-[state=open]:bg-accent/50"
							>
								Contact
							</Link>
						</NavigationMenuLink>
					</NavigationMenuList>
				</NavigationMenu>
				<div className="ml-auto">
					<Button asChild>
						<Link href="#contact">Get Started</Link>
					</Button>
				</div>
			</header>

			<main className="flex-1">
				{/* Hero Section */}
				<section
					id="home"
					className="w-full py-12 md:py-24 lg:py-32 bg-linear-to-b from-background to-muted"
				>
					<TextGradientTransition />
				</section>

				{/* Services Overview */}
				<section id="services">
					<HoverSquares />
				</section>

				{/* Detailed Services */}
				<section className="py-12 md:py-24 lg:py-32">
					<div className="container mx-auto text-center mb-12">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							What We Do Best
						</h2>
						<p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Dive deeper into our specialized marketing solutions.
						</p>
					</div>
					<ContentWithImage
						image={{
							url: "/placeholder-yirwd.png",
							alt: "Website Design & Development",
							title: "Stunning Website Design & Development",
							description:
								"We craft visually appealing and highly functional websites that serve as the digital cornerstone of your brand. Our designs are responsive, user-friendly, and optimized for performance across all devices.",
						}}
					/>
					<ContentWithImage
						image={{
							url: "/graphic-design-branding.png",
							alt: "Graphic Design & Branding",
							title: "Impactful Graphic Design & Branding",
							description:
								"From captivating logos to comprehensive brand guidelines, our graphic design services ensure your brand's visual identity is consistent, memorable, and resonates with your target audience.",
						}}
					/>
					<ContentWithImage
						image={{
							url: "/public-relations-media-outreach.png",
							alt: "Public Relations & Media Outreach",
							title: "Strategic Public Relations & Media Outreach",
							description:
								"Build and maintain a positive public image with our expert PR services. We help you tell your story, manage your reputation, and secure valuable media coverage to enhance your brand's credibility.",
						}}
					/>
				</section>

				{/* Portfolio Section */}
				<section id="portfolio">
					<ImageReveal />
				</section>

				{/* Testimonials Section */}
				<section
					id="testimonials"
					className="relative w-full py-12 md:py-24 lg:py-32 flex items-center justify-center bg-muted overflow-hidden"
				>
					<div className="container mx-auto text-center mb-12">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							What Our Clients Say
						</h2>
						<p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Hear directly from businesses we've helped succeed.
						</p>
					</div>
					<div className="relative w-full h-[450px] flex items-center justify-center">
						<CardSwap
							cardDistance={60}
							verticalDistance={70}
							delay={5000}
							pauseOnHover={true}
						>
							<SwapCard className="p-6 flex flex-col items-center justify-center text-center">
								<Image
									src="/itjustworks.jpg"
									alt="Client 1"
									width={80}
									height={80}
									className="rounded-full mb-4"
								/>
								<h3 className="text-xl font-semibold mb-2">
									"Exceptional Results!"
								</h3>
								<p className="text-muted-foreground">
									"Our website traffic doubled within three months of
									working with them. Their SEO strategy is top-notch!"
								</p>
								<p className="text-sm text-muted-foreground mt-4">
									- Jane Doe, CEO of Tech Solutions
								</p>
							</SwapCard>
							<SwapCard className="p-6 flex flex-col items-center justify-center text-center">
								<Image
									src="/itjustworks.jpg"
									alt="Client 2"
									width={80}
									height={80}
									className="rounded-full mb-4"
								/>
								<h3 className="text-xl font-semibold mb-2">
									"Creative & Professional"
								</h3>
								<p className="text-muted-foreground">
									"The brand identity they created for us perfectly
									captures our vision. Truly a pleasure to work with."
								</p>
								<p className="text-sm text-muted-foreground mt-4">
									- John Smith, Founder of Artisan Crafts
								</p>
							</SwapCard>
							<SwapCard className="p-6 flex flex-col items-center justify-center text-center">
								<Image
									src="/itjustworks.jpg"
									alt="Client 3"
									width={80}
									height={80}
									className="rounded-full mb-4"
								/>
								<h3 className="text-xl font-semibold mb-2">
									"Game Changer for PR"
								</h3>
								<p className="text-muted-foreground">
									"Their PR efforts landed us in major publications,
									significantly boosting our market presence. Highly
									recommend!"
								</p>
								<p className="text-sm text-muted-foreground mt-4">
									- Emily White, Marketing Director at Global
									Innovations
								</p>
							</SwapCard>
						</CardSwap>
					</div>
				</section>

				{/* Client Logos Marquee */}
				<section className="w-full py-12 md:py-24 lg:py-32 bg-background">
					<div className="container mx-auto text-center mb-12">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Trusted By Leading Brands
						</h2>
						<p className="mt-4 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Our commitment to excellence has earned the trust of
							diverse clients.
						</p>
					</div>
					<div className="w-full h-40 flex items-center justify-center relative overflow-hidden">
						<MarqueeAlongSvgPath
							path="M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5"
							baseVelocity={4}
							pathId="oogity-boogity"
							slowdownOnHover={true}
							draggable={true}
							repeat={2}
							dragSensitivity={0.1}
							className="absolute -left-24 sm:-left-32 top-0 scale-60 sm:scale-100 w-full h-full"
							grabCursor
							viewBox="0 0 1000 300"
						>
							{clientLogos.map((logo, i) => (
								<div
									key={i + "marqueeSVG"}
									className="w-24 h-24 flex items-center justify-center p-2 hover:scale-110 duration-300 ease-in-out"
								>
									<Image
										src="/itjustworks.jpg"
										alt={logo.alt}
										width={100}
										height={100}
										className="w-full h-full object-contain"
										draggable={false}
									/>
								</div>
							))}
						</MarqueeAlongSvgPath>
					</div>
				</section>

				{/* FAQ Section */}
				<section id="faq">
					<FAQPage />
				</section>

				{/* Contact Section */}
				<section
					id="contact"
					className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground"
				>
					<div className="container mx-auto text-center max-w-2xl">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
							Ready to Elevate Your Brand?
						</h2>
						<p className="text-lg md:text-xl mb-8">
							Join our newsletter for marketing insights or get in touch
							for a personalized consultation.
						</p>
						<FancyInput />
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
				<p className="text-xs text-muted-foreground">
					&copy; {new Date().getFullYear()} Marketing Agency. All rights
					reserved.
				</p>
				<nav className="sm:ml-auto flex gap-4 sm:gap-6">
					<Link
						href="#"
						className="text-xs hover:underline underline-offset-4 text-muted-foreground"
					>
						Privacy Policy
					</Link>
					<Link
						href="#"
						className="text-xs hover:underline underline-offset-4 text-muted-foreground"
					>
						Terms of Service
					</Link>
				</nav>
			</footer>
		</div>
	);
}
