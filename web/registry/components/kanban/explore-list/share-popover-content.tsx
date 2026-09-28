import React, { useState } from "react";

import { cn } from "@/lib/utils";

const SharePopoverContent = ({ onClose, shareString }) => {
	const [copied, setCopied] = useState(false);

	const userClickCopy = () => {
		setCopied(true);
		setTimeout(() => {
			onClose();
		}, 600);
	};
	return (
		<span className="flex flex-col h-fit px-2">
			<div className="flex w-full place-content-between items-center">
				<button
					onClick={() => {
						navigator.clipboard.writeText(shareString.replace(/,/g, ""));
						userClickCopy();
					}}
					className="font-manrope w-fit flex gap-2 items-center"
				>
					{copied ? (
						<svg
							viewBox="0 0 48 48"
							version="1"
							width="16"
							height="16"
							xmlns="http://www.w3.org/2000/svg"
							enable-background="new 0 0 48 48"
							fill="#000000"
						>
							<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
							<g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							></g>
							<g id="SVGRepo_iconCarrier">
								{" "}
								<polygon
									fill="#43A047"
									points="40.6,12.1 17,35.7 7.4,26.1 4.6,29 17,41.3 43.4,14.9"
								></polygon>{" "}
							</g>
						</svg>
					) : (
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M6.66668 8.66648C6.95298 9.04923 7.31825 9.36594 7.73771 9.59511C8.15717 9.82428 8.62102 9.96056 9.09778 9.9947C9.57454 10.0288 10.0531 9.96006 10.5009 9.793C10.9487 9.62594 11.3554 9.36453 11.6933 9.02648L13.6933 7.02648C14.3005 6.39781 14.6365 5.5558 14.6289 4.68181C14.6213 3.80782 14.2708 2.97178 13.6527 2.35375C13.0347 1.73573 12.1987 1.38516 11.3247 1.37757C10.4507 1.36997 9.60869 1.70595 8.98001 2.31315L7.83334 3.45315M9.33334 7.33315C9.04704 6.9504 8.68177 6.63369 8.26231 6.40452C7.84285 6.17535 7.37901 6.03907 6.90224 6.00493C6.42548 5.97078 5.94695 6.03957 5.49911 6.20663C5.05128 6.37368 4.6446 6.6351 4.30668 6.97315L2.30668 8.97315C1.69948 9.60182 1.3635 10.4438 1.3711 11.3178C1.37869 12.1918 1.72926 13.0278 2.34728 13.6459C2.96531 14.2639 3.80135 14.6145 4.67534 14.6221C5.54933 14.6297 6.39134 14.2937 7.02001 13.6865L8.16001 12.5465"
								stroke="#524359"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					)}
					<span>Copy Link</span>
				</button>
				<svg
					width="11"
					height="11"
					viewBox="0 0 11 11"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="ml-auto"
					onClick={onClose}
				>
					<rect
						width="12.7854"
						height="1.46959"
						rx="0.734794"
						transform="matrix(0.712233 -0.701943 0.712233 0.701943 0.0749512 9.64258)"
						fill="#666666"
					/>
					<rect
						width="12.7854"
						height="1.46959"
						rx="0.734794"
						transform="matrix(-0.712233 -0.701943 -0.712233 0.701943 10.1528 9.64258)"
						fill="#666666"
					/>
				</svg>
			</div>

			<span
				className={cn(
					"m-2 rounded-lg px-2 mb-4 border max-w-[300px] border-[#1E1E1E] text-nowrap text-ellipsis overflow-hidden",
					{
						"border-green-500": copied,
					}
				)}
			>
				{shareString}
			</span>
		</span>
	);
};

export default SharePopoverContent;
