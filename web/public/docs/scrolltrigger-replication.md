# Scrolltrigger Replication

- Categories: Grids & Layouts
- Tags: hover
- Import: `@/components/ui/scrolltrigger-replication/component`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/scrolltrigger-replication.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `@gsap/react`
- `clsx`
- `gsap`
- `lenis`
- `tempus`

## Usage

```tsx
import Link from "next/link";

import CTAButton from "./component";
import Listing from "./components/listing";
import StickyScroll1 from "./components/sticky-scroll1";
import StickyScroll2 from "./components/sticky-scroll2";
import { GsapProvider } from "./gsap-provider";
import { LenisProvider } from "./lenis-provider";

export default function ExampleScrollReplication({
	containerRef,
}: {
	containerRef?: React.RefObject<HTMLElement | null>;
} = {}) {
	return (
		<>
			<LenisProvider>
				<div>
					<div className="grid min-h-screen place-items-center bg-background py-20 text-secondary">
						<div className="container flex min-h-[50vh] flex-col justify-between text-center">
							<h1 className="heading-60-150">
								<Link
									href={"https://www.mcsaatchiabel.co.za/"}
									target="_blank"
									className="block text-blue"
								>
									m&csaatchi abel
								</Link>
								Replication
							</h1>

							<div className="heading-16-40 flex items-center justify-center gap-x-5 text-center text-blue">
								<Link
									href={
										"https://github.com/PhanDangKhoa96/mcsaatchiabel.co.za-replication"
									}
									target="_blank"
									className="hover:underline"
								>
									Source code
								</Link>
								<span>|</span>
								<Link
									href={"https://www.pldkhoa.dev/playground"}
									target="_blank"
									className="hover:underline"
								>
									All demos
								</Link>
							</div>
						</div>
					</div>
					<div className="h-px bg-background"></div>
					<StickyScroll1 containerRef={containerRef} />
					<StickyScroll2 containerRef={containerRef} />
					<CTAButton />
					<Listing />

					<div
						className="heading-60-150 container grid
             h-screen place-items-center text-balance text-center text-blue"
					>
						Have a good day!
					</div>
				</div>
			</LenisProvider>
			<GsapProvider scrollTrigger />
		</>
	);
}
```

## Source

### `components/ui/scrolltrigger-replication/component.tsx`

```tsx
"use client";

import React, { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import SectionHeading from "./components/section-heading";

const CTAButton = () => {
	const containerRef = useRef(null);
	const buttonRef = useRef(null);

	const { contextSafe } = useGSAP({ scope: containerRef });

	const onMouseOver = contextSafe(() => {
		gsap.to(buttonRef.current, {
			"--cta-target": "0%",
			ease: "power1.inOut",
			duration: 0.4,
		});
	});

	const onMouseOut = contextSafe(() => {
		gsap.to(buttonRef.current, {
			"--cta-target": "100%",
			ease: "power1.inOut",
			duration: 0.4,
		});
	});

	return (
		<section ref={containerRef} id="button">
			<SectionHeading title="CTA Button" />

			<div className="container grid min-h-[50vh] place-items-center py-10 lg:py-20">
				<div>
					<button
						ref={buttonRef}
						className="peer relative isolate pt-1"
						onMouseOver={onMouseOver}
						onMouseOut={onMouseOut}
						style={{
							background: `linear-gradient(to bottom, #fff var(--cta-target), #000 var(--cta-target))`,
						}}
					>
						<span className="heading-60-150 inline-block bg-[linear-gradient(to_bottom,#000_var(--cta-target),#fff_var(--cta-target))] pt-1 text-foreground [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] lg:pt-2 lg:text-[200px]">
							Contact Us
						</span>
					</button>

					<div className="grid grid-cols-3 overflow-hidden [&_div]:peer-hover:-translate-y-full">
						<div className="ease-power-1-in-out duration-400 relative aspect-3/1 overflow-hidden transition-transform">
							<img
								src="/itjustworks.jpg"
								className="absolute inset-0 h-full w-full object-cover"
								alt=""
								loading="lazy"
							/>
						</div>
						<div className="ease-power-1-in-out duration-400 relative aspect-3/2 h-2/3 overflow-hidden transition-transform">
							<img
								src="/itjustworks.jpg"
								className="absolute inset-0 h-full w-full object-cover"
								alt=""
								loading="lazy"
							/>
						</div>
						<div className="ease-power-1-in-out duration-400 relative aspect-square h-full overflow-hidden transition-transform">
							<img
								src="/itjustworks.jpg"
								className="absolute inset-0 h-full w-full object-cover"
								alt=""
								loading="lazy"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CTAButton;
```

### `components/ui/scrolltrigger-replication/components/section-heading.tsx`

```tsx
import clsx from "clsx";
import React from "react";

const SectionHeading = ({title}: {title: string}) => {
    return (
        <h2
            className={
                "heading-60-150 container scale-75 bg-background py-10 text-center text-foreground lg:py-20"
            }>
            {title}
        </h2>
    );
};

export default SectionHeading;
```
