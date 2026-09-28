"use client";

import { useCallback, useLayoutEffect, useRef, useState, type ReactElement } from "react";
import Link from "next/link";
import { Mail, Phone, Share2 } from "lucide-react";
import { SpringProvider, SpringElement } from "./component";
import { cn } from "@/lib/utils";

const KNOB_SPRING_PATH = {
	coilCount: 10,
	amplitudeMin: 6,
	amplitudeMax: 14,
} as const;

type ContactChannel = {
	id: string;
	label: string;
	hint: string;
	icon: ReactElement;
	href: string;
	external?: boolean;
};

const CONTACT_CHANNELS: ContactChannel[] = [
	{
		id: "call",
		label: "Schedule a call",
		hint: "Pull the knob down to book time",
		icon: <Phone className="size-5" strokeWidth={1.75} />,
		href: "/contact",
	},
	{
		id: "email",
		label: "Send an email",
		hint: "Pull the knob down to write us",
		icon: <Mail className="size-5" strokeWidth={1.75} />,
		href: "mailto:shift@drivebrandstudio.com",
	},
	{
		id: "social",
		label: "Say hi on social",
		hint: "Pull the knob down to follow along",
		icon: <Share2 className="size-5" strokeWidth={1.75} />,
		href: "https://www.instagram.com/drivebrandstudio/",
		external: true,
	},
];

function getRectOverlapRatio(a: DOMRect, b: DOMRect) {
	const overlapX = Math.min(a.right, b.right) - Math.max(a.left, b.left);
	const overlapY = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
	if (overlapX <= 0 || overlapY <= 0) return 0;

	const overlapArea = overlapX * overlapY;
	const knobArea = a.width * a.height;
	if (knobArea <= 0) return 0;

	return overlapArea / knobArea;
}

function isKnobInDropZone(knob: HTMLElement, dropZone: HTMLElement) {
	return getRectOverlapRatio(knob.getBoundingClientRect(), dropZone.getBoundingClientRect()) >= 0.35;
}

function getKnobDropTravel(
	knob: HTMLElement,
	dropZone: HTMLElement,
	track: HTMLElement,
) {
	const motionEl = knob.parentElement;
	if (!motionEl) return 132;

	const knobCenterAtRest =
		motionEl.offsetTop - track.offsetTop + knob.offsetHeight / 2;
	const zoneCenter =
		dropZone.offsetTop - track.offsetTop + dropZone.offsetHeight / 2;

	return Math.max(0, zoneCenter - knobCenterAtRest);
}

function PullKnob({
	channel,
	onActivate,
}: {
	channel: ContactChannel;
	onActivate: (channel: ContactChannel) => void;
}) {
	const trackRef = useRef<HTMLDivElement>(null);
	const anchorRef = useRef<HTMLDivElement>(null);
	const dropZoneRef = useRef<HTMLDivElement>(null);
	const knobVisualRef = useRef<HTMLDivElement>(null);
	const inZoneRef = useRef(false);
	const [progress, setProgress] = useState(0);
	const [isHot, setIsHot] = useState(false);
	const [dragBottom, setDragBottom] = useState(132);

	useLayoutEffect(() => {
		const knob = knobVisualRef.current;
		const dropZone = dropZoneRef.current;
		const track = trackRef.current;
		if (!knob || !dropZone || !track) return;

		const syncDragLimit = () => {
			setDragBottom(getKnobDropTravel(knob, dropZone, track));
		};

		syncDragLimit();
		const observer = new ResizeObserver(syncDragLimit);
		observer.observe(knob);
		observer.observe(dropZone);
		if (trackRef.current) observer.observe(trackRef.current);

		return () => observer.disconnect();
	}, []);

	const readDropZoneState = useCallback(() => {
		const knob = knobVisualRef.current;
		const dropZone = dropZoneRef.current;
		const anchor = anchorRef.current;
		if (!knob || !dropZone || !anchor) {
			return { inZone: false, progress: 0 };
		}

		const inZone = isKnobInDropZone(knob, dropZone);
		if (inZone) {
			return { inZone: true, progress: 1 };
		}

		const knobY = knob.getBoundingClientRect().top + knob.offsetHeight / 2;
		const startY = anchor.getBoundingClientRect().top + anchor.offsetHeight / 2;
		const targetY =
			dropZone.getBoundingClientRect().top + dropZone.offsetHeight / 2;
		const travel = targetY - startY;
		if (travel <= 0) {
			return { inZone: false, progress: 0 };
		}

		return {
			inZone: false,
			progress: Math.min(Math.max((knobY - startY) / travel, 0), 0.95),
		};
	}, []);

	const handlePull = useCallback(() => {
		const inZone = inZoneRef.current || readDropZoneState().inZone;
		if (inZone) {
			onActivate(channel);
			return;
		}
		setProgress(0);
		setIsHot(false);
	}, [channel, onActivate, readDropZoneState]);

	const handleDragStart = useCallback(() => {
		inZoneRef.current = false;
	}, []);

	const handleDrag = useCallback(() => {
		const { inZone, progress: nextProgress } = readDropZoneState();
		inZoneRef.current = inZone;
		setProgress(nextProgress);
		setIsHot(inZone);
	}, [readDropZoneState]);

	return (
		<article className="flex flex-col items-center gap-5">
			<div className="text-center">
				<h3 className="font-calendas text-xl tracking-tight text-white md:text-2xl">
					{channel.label}
				</h3>
				<p className="mt-1 text-sm text-white/45">{channel.hint}</p>
			</div>

			<div
				ref={trackRef}
				className="relative flex h-56 w-full flex-col items-center overflow-visible"
			>
				<SpringProvider
					containerRef={trackRef}
					anchorRef={anchorRef}
					dragElastic={0.08}
					pathConfig={KNOB_SPRING_PATH}
				>
					<div
						ref={anchorRef}
						className="absolute top-0 z-[1] flex size-10 items-center justify-center rounded-full border border-white/15 bg-[#141414]"
						aria-hidden
					>
						<div className="size-3 rounded-full bg-[#e3696b]/80 shadow-[0_0_12px_rgba(227,105,107,0.55)]" />
					</div>

					<div
						className="absolute top-5 bottom-8 left-1/2 z-[1] w-px -translate-x-1/2 bg-linear-to-b from-white/20 via-white/10 to-[#e3696b]/40"
						aria-hidden
					/>

					<div
						ref={dropZoneRef}
						className="absolute bottom-8 left-1/2 z-[1] h-14 w-24 -translate-x-1/2 rounded-full border border-dashed transition-colors duration-200"
						style={{
							borderColor: isHot ? "rgba(227,105,107,0.75)" : "rgba(255,255,255,0.12)",
							backgroundColor: isHot ? "rgba(227,105,107,0.08)" : "rgba(255,255,255,0.02)",
							boxShadow: isHot ? "0 0 28px rgba(227,105,107,0.18)" : undefined,
						}}
						aria-hidden
					/>

					<SpringElement
						className="absolute top-0 left-1/2 z-10 -translate-x-1/2"
						drag="y"
						dragConstraints={{ top: 0, bottom: dragBottom, left: 0, right: 0 }}
						dragElastic={0.08}
						onDragStart={handleDragStart}
						onPullEnd={handlePull}
						onDrag={handleDrag}
					>
						<div
							ref={knobVisualRef}
							className={cn(
								"relative flex size-14 select-none items-center justify-center rounded-full border-2 bg-linear-to-b from-[#444] to-[#1a1a1a] text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-[border-color,box-shadow,transform] duration-200",
								isHot
									? "border-[#e3696b] shadow-[0_0_24px_rgba(227,105,107,0.35)]"
									: "border-white/20"
							)}
							style={{
								transform: `scale(${1 + progress * 0.06})`,
							}}
						>
							{channel.icon}
							<span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.18em] text-white/35">
								Pull
							</span>
						</div>
					</SpringElement>
				</SpringProvider>
			</div>
		</article>
	);
}

export function ServicesSpringCta() {
	const handleActivate = useCallback((channel: ContactChannel) => {
		if (channel.external) {
			window.open(channel.href, "_blank", "noopener,noreferrer");
		} else if (channel.href.startsWith("mailto:") || channel.href.startsWith("tel:")) {
			window.location.href = channel.href;
		} else {
			window.location.assign(channel.href);
		}
	}, []);

	return (
		<section className="relative overflow-visible bg-black px-4 py-20 md:px-10 md:py-28">
		

			<div className="relative mx-auto flex w-full max-w-[1180px] flex-col items-center gap-12 md:gap-16">
				<div className="max-w-2xl text-center">
					<p className="font-brush-star text-[#e3696b] text-xl tracking-wide md:text-2xl">
						Let&apos;s connect
					</p>
					<h2 className="mt-3 font-calendas text-[36px] leading-[0.95] tracking-tight text-white sm:text-[48px] md:text-[56px]">
						Pull a knob. We&apos;ll meet you on the other end.
					</h2>
					<p className="mt-4 text-base leading-relaxed text-white/55 md:text-lg">
						Schedule a call, send a note, or stalk us on social — tug the spring
						all the way down to connect.
					</p>
				</div>


				<div className="grid w-full gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
					{CONTACT_CHANNELS.map((channel) => (
						<PullKnob
							key={channel.id}
							channel={channel}
							onActivate={handleActivate}
						/>
					))}
				</div>

				<p className="text-center text-sm text-white/35">
					Prefer the old-fashioned way?{" "}
					<Link
						href="/contact"
						className="text-white/60 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#e3696b] hover:decoration-[#e3696b]/40"
					>
						Skip to the contact form
					</Link>
				</p>
			</div>
		</section>
	);
}

export default ServicesSpringCta;
