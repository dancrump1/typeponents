import { FollowerPointerCard } from "./component";

export default function Usage() {
	return (
		<div className="mx-auto w-80">
			<FollowerPointerCard
				title={
					<TitleComponent
						title={blogContent.author}
						avatar={blogContent.authorAvatar}
					/>
				}
			>
				<div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-100 bg-background transition duration-200 hover:shadow-xl">
					<div className="relative aspect-16/10 w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-background">
						<img
							src={blogContent.image}
							alt="thumbnail"
							className="h-full transform object-cover transition duration-200 group-hover:scale-95 group-hover:rounded-2xl"
						/>
					</div>
					<div className="p-4">
						<h2 className="my-4 text-lg font-bold text-secondary">
							{blogContent.title}
						</h2>
						<h2 className="my-4 text-sm font-normal text-secondary">
							{blogContent.description}
						</h2>
						<div className="mt-10 flex flex-row items-center justify-between">
							<span className="text-sm text-secondary">
								{blogContent.date}
							</span>
							<div className="relative z-10 block rounded-xl bg-background px-6 py-2 text-xs font-bold text-secondary">
								Read More
							</div>
						</div>
					</div>
				</div>
			</FollowerPointerCard>
		</div>
	);
}

export const blogContent = {
	slug: "amazing-tailwindcss-grid-layouts",
	author: "Manu Arora",
	date: "28th March, 2023",
	title: "Amazing Tailwindcss Grid Layout Usages",
	description:
		"Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.",
	image: "/itjustworks.jpg",
	authorAvatar: "/itjustworks.jpg",
};

export const TitleComponent = ({
	title,
	avatar,
}: {
	title: string;
	avatar: string;
}) => (
	<div className="flex items-center space-x-2">
		<img
			src={avatar}
			height="20"
			width="20"
			alt="thumbnail"
			className="rounded-full border-2 border-white"
		/>
		<p>{title}</p>
	</div>
);
