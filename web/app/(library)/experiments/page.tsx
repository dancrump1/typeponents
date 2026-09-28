"use server";

import Link from "next/link";

export default async function Page() {
	return (
		<div className="h-screen w-full flex gap-3 justify-center items-center">
			<Link
				className="w-fit rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-[transform,border-radius,box-shadow] duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_pink] active:translate-x-0 active:translate-y-0 active:rounded-2xl active:shadow-none"
				href="/game"
			>
				Phaser game
			</Link>
			<Link
				className="w-fit rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-[transform,border-radius,box-shadow] duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_pink] active:translate-x-0 active:translate-y-0 active:rounded-2xl active:shadow-none"
				href="/crazydrive"
			>
				Crazy Drive
			</Link>
			<Link
				className="w-fit rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-[transform,border-radius,box-shadow] duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_pink] active:translate-x-0 active:translate-y-0 active:rounded-2xl active:shadow-none"
				href="/drive25"
			>
				Drive 2025
			</Link>
			<Link
				className="w-fit rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-[transform,border-radius,box-shadow] duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_pink] active:translate-x-0 active:translate-y-0 active:rounded-2xl active:shadow-none"
				href="/playground"
			>
				Layout playground
			</Link>
			<Link
				className="w-fit rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-[transform,border-radius,box-shadow] duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_pink] active:translate-x-0 active:translate-y-0 active:rounded-2xl active:shadow-none"
				href="/oogity"
			>
				v0 attachments test
			</Link>
		</div>
	);
}
