"use client";

import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { cn } from "@/lib/utils";

export const lightBg = "#a3c2e7";
export const baseBg = "#859cb7";
export const hoverBg = "#647991";

export default function NavbarActionButton({ header }) {
	const [isToggleOpen, setIsToggleOpen] = useState(false);
	const router = useRouter();

	return (
		<header className="fixed top-0 z-20 w-full border-b shadow-lg border-slate-200 bg-background/90 shadow-slate-700/5 after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-xs lg:after:hidden">
			<div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-384">
				<nav
					aria-label="main navigation"
					className="flex h-22 items-stretch justify-between font-medium text-slate-700"
					role="navigation"
				>
					{/*      <!-- Brand logo --> */}
					<Link
						id="WindUI"
						aria-label="WindUI logo"
						aria-current="page"
						className="flex items-center gap-2 py-3 text-lg whitespace-nowrap focus:outline-hidden lg:flex-1"
						href="/"
					>
						{!!header.globalSet?.logo.length && (
							<Image
								src={header.globalSet.logo?.[0].url}
								width={260}
								height={60}
								alt="Logo"
							/>
						)}
					</Link>
					{/*      <!-- Mobile trigger --> */}
					<button
						className={`relative order-10 block h-10 w-10 self-center lg:hidden
              ${
						isToggleOpen
							? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
							: ""
					}
            `}
						onClick={() => setIsToggleOpen(!isToggleOpen)}
						aria-expanded={isToggleOpen ? "true" : "false"}
						aria-label="Toggle navigation"
					>
						<div className="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
							<span
								aria-hidden="true"
								className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
							></span>
							<span
								aria-hidden="true"
								className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
							></span>
							<span
								aria-hidden="true"
								className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
							></span>
						</div>
					</button>
					{/*      <!-- Navigation links --> */}
					<ul
						role="menubar"
						aria-label="Select page"
						className={`absolute left-0 top-0 z-[-1] h-114 w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-background/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-background/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
							isToggleOpen
								? "visible opacity-100 backdrop-blur-xs"
								: "invisible opacity-0"
						}`}
					>
						<li role="none" className="flex items-stretch">
							<Link
								role="menuitem"
								aria-haspopup="false"
								className={cn(
									`flex items-center gap-2 py-4 transition-colors duration-300 hover:text-foreground focus:text-foreground focus:outline-hidden focus-visible:outline-hidden lg:px-8`,
									router.asPath.includes("services") &&
										`text-foreground`
								)}
								href="/about"
							>
								<span>About</span>
							</Link>
						</li>
					</ul>
					{!!header.globalSet.button?.length && (
						<div className="flex items-center px-6 ml-auto lg:ml-0 lg:p-0">
							<Link
								className={`inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-foreground transition duration-300 rounded shadow-md whitespace-nowrap bg-background shadow-[#b0cef0] hover:bg-background hover:shadow-xs hover:shadow-[#a3c2e7] focus:bg-background focus:shadow-xs focus:shadow-[#647991] focus-visible:outline-hidden`}
								href={header.globalSet.button?.[0].linkUrl}
							>
								{header.globalSet.button?.[0].linkText}
							</Link>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
}
