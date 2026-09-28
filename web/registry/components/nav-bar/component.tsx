"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import SVG from "react-inlinesvg";

import {
	NavAccordion,
	NavAccordionContent,
	NavAccordionItem,
	NavAccordionTrigger,
} from "@/registry/components/mobile-nav/component";
import { ThemeToggleButton } from "@/registry/components/theme-changer/component";

const NavBar = ({
	routes = [],
	header,
}: {
	routes: ApiRouteType[];
	header: any;
}) => {
	const [isToggleOpen, setIsToggleOpen] = useState(false);
	const [selected, setSelected] = useState<string>();

	useEffect(() => {
		const navbar = document.getElementById("navbar");

		window.addEventListener("click", (e) => {
			if (!navbar.contains(e.target)) {
				setIsToggleOpen(false);
			}
		});
	}, []);

	useEffect(() => {
		setSelected(routes?.[0]?.id);
	}, [routes]);

	const selectedSubRoutes = routes?.filter(
		(route) => route?.id === selected
	)[0]?.children;

	return (
		<header
			className={cn(
				"fixed top-0 z-50 w-full bg-background shadow-lg shadow-slate-700/5 header-nav-bar transition-none"
			)}
			id="navbar"
		>
			<div className="relative">
				<nav
					aria-label="main navigation"
					className="flex justify-between"
					role="navigation"
				>
					{/*      <!-- Menu trigger --> */}
					<button
						className={`relative block h-[116px] w-[116px] lg:h-[118px] lg:w-[118px] bg-background lg:bg-background
                ${isToggleOpen
								? "visible opacity-100  [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 "
								: ""
							}
              `}
						title="Toggle Navigation"
						onClick={() => {
							setIsToggleOpen(!isToggleOpen);
							setSelected(routes?.[0]?.id);
						}}
						aria-expanded={isToggleOpen ? "true" : "false"}
						aria-label="Toggle navigation"
					>
						<div className="absolute left-1/2 top-1/2 w-[37px] -translate-x-1/2 -translate-y-1/2 transform">
							<span
								aria-hidden="true"
								className="absolute block h-0.5 w-full -translate-y-3 transform rounded-full bg-background lg:bg-background transition-all duration-300"
							></span>
							<span
								aria-hidden="true"
								className="absolute block h-0.5 w-full transform rounded-full bg-background lg:bg-background transition duration-300"
							></span>
							<span
								aria-hidden="true"
								className="absolute block h-0.5 w-full origin-top-left translate-y-3 transform rounded-full bg-background lg:bg-background transition-all duration-300"
							></span>
						</div>
					</button>
					{/*      <!-- Brand logo --> */}
					<Link
						className="relative flex p-4 lg:ml-16"
						href="/"
						onClick={() => setIsToggleOpen(false)}
					>
						<Image
							src={header?.logo[0]?.url || ""}
							alt={header.logo[0]?.alt || "Logo"}
							width={header.logo[0]?.width || 115}
							height={header.logo[0]?.height || 73}
							className="z-10 max-h-[75px] w-auto self-center"
						/>
					</Link>

					{/*      <!-- Navigation links --> */}
					<div
						className={`absolute flex left-0 top-0 h-[calc(100vh-116px)] lg:h-114 w-full overflow-hidden overflow-y-auto 
							overscroll-contain bg-backgroundSecondary px-8 mt-[116px] lg:mt-[118px] transition-[opacity,visibility] duration-300 ${isToggleOpen
								? "visible opacity-100 backdrop-blur-xs"
								: "invisible opacity-0"
							}`}
					>
						{/* Desktop Nav */}
						<ul
							role="menubar"
							aria-label="Select page"
							className="my-auto border-r border-background pr-9 hidden lg:block"
						>
							{!!routes?.length &&
								routes?.map((route) => {
									return (
										<li
											key={route.id}
											role="none"
											className={cn(
												"h-[50px] first:my-0 last:my-0 my-6 font-swiss-outline uppercase text-[48px] text-foreground hover:text-secondary",
												selected === route.id &&
												"font-swiss-condensed"
											)}
										>
											<button
												onClick={() => setSelected(route.id)}
												tabIndex={0}
												className="w-full text-left uppercase"
												title={route.title}
												id={route.id}
											>
												{route.title}
											</button>
										</li>
									);
								})}
						</ul>
						<ul className="hidden lg:grid mr-auto ml-20 my-auto text-foreground text-[26px] gap-y-8 gap-x-16 grid-rows-5 grid-flow-col place-content-evenly">
							{!!selectedSubRoutes?.length &&
								selectedSubRoutes?.map((route, i) => (
									<li className="font-swiss-condensed" key={route?.id}>
										<Link
											href={route?.url || ""}
											className="hover:text-secondary"
											onClick={() => setIsToggleOpen(false)}
											target={
												!!route?.newWindow ? "_blank" : "_self"
											}
											title={route?.title}
											id={route.id}
										>
											{route?.title}
										</Link>
									</li>
								))}
						</ul>

						{/* Mobile Nav */}
						{!!routes?.length && (
							<section className="mx-auto lg:hidden">
								<NavAccordion
									type="single"
									collapsible
									className="m-auto text-foreground mt-4"
									defaultValue={routes[0]?.title.toLowerCase()}
								>
									{routes?.map((route) => {
										const alreadySelected =
											selected === route?.title.toLowerCase();
										return (
											<NavAccordionItem
												value={route.title.toLowerCase()}
												key={route.id}
											>
												<NavAccordionTrigger
													onClick={() =>
														setSelected(
															alreadySelected ? "" : route.id
														)
													}
													className={cn(
														"w-full mx-auto h-[50px] first:my-0 last:my-0 my-6 font-swiss-outline text-[40px] text-foreground uppercase",
														alreadySelected && "font-swiss"
													)}
												>
													{route.title}
												</NavAccordionTrigger>
												<NavAccordionContent>
													<ul className="flex flex-col text-center gap-5 mt-5">
														{route.children?.map((route) => (
															<li
																key={route.id}
																className="font-swiss-condensed text-[16px]"
															>
																<Link
																	href={route?.url || ""}
																	// className="h-fit lg:w-[269px]"
																	onClick={() =>
																		setIsToggleOpen(false)
																	}
																	target={
																		!!route?.newWindow
																			? "_blank"
																			: "_self"
																	}
																	title={route?.title}
																	id={route.id}
																>
																	{route?.title}
																</Link>
															</li>
														))}
													</ul>
												</NavAccordionContent>
											</NavAccordionItem>
										);
									})}
								</NavAccordion>
								<section className="flex flex-col items-center mt-5">
									<Link
										href={header.button[0]?.url || ""}
										target={header.button[0]?.target}
										referrerPolicy={
											header.button[0]?.target && "no-referrer"
										}
										className="button red-to-background lg:hidden flex justify-center"
									>
										{header.button[0]?.text}
									</Link>

									<div className="h-[70px] w-[75px] relative justify-center items-center flex mt-5">
										<ThemeToggleButton />
									</div>
								</section>
							</section>
						)}
					</div>

					{/* Webcam / Login / Season */}
					<section className="justify-center items-center lg:gap-20 lg:ml-auto md:mr-14 flex p-6">
						{!!header?.iconLink?.length && (
							<Link
								href={header.iconLink[0].linkUrl || ""}
								className="relative cursor-pointer group flex flex-col items-center gap-1"
								title={header.iconLink[0].linkText}
								onClick={() => setIsToggleOpen(false)}
							>
								{!!header.iconLink[0].linkImage.length && (
									<SVG
										src={header?.iconLink[0].linkImage?.[0].url}
										title={header.iconLink[0].linkImage?.[0].title}
										height={30}
										width={30}
										className="stroke-white"
										role="img"
										aria-label={
											header.iconLink[0].linkImage?.[0]?.alt ||
											header.iconLink[0].linkImage?.[0].title
										}
									/>
								)}
								<div className="text-foreground font-swiss-condensed text-[16px] uppercase group-hover:text-backgroundSecondary">
									{header.iconLink[0].linkText}
								</div>
							</Link>
						)}
					</section>
				</nav>
			</div>
		</header>
	);
};

export default NavBar;
