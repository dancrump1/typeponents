import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import Image1 from "@/public/itjustworks.jpg";
import { IconClipboardCopy } from "@tabler/icons-react";
import { Home } from "lucide-react";

export const typewritterTestimonials = [
	{
		image: "/itjustworks.jpg",
		text: "Using this component library has significantly speed up our development process. The quality and ease of integration are remarkable!",
		name: "David Smith",
		jobtitle: "UI Designer",
		audio: "David.mp3",
	},
	{
		image: "/itjustworks.jpg",
		text: "I love  how intuitive and well-documented this component library is. It has significantly improved our UI consistency across projects.",
		name: "James Wilson",
		jobtitle: "Product Manager",
		audio: "James.mp3",
	},
	{
		image: "/itjustworks.jpg",
		text: "Using this library has been a game-changer for our product development.",
		name: "Michael Davis",
		jobtitle: "Full Stack Developer",
		audio: "Michael.mp3",
	},
	{
		image: "/itjustworks.jpg",
		text: "The components are highly responsive and work seamlessly across different devices and screen sizes.",
		name: "Emily Chen",
		jobtitle: "Mobile App Developer",
		audio: "Emily.mp3",
	},
	{
		image: "/itjustworks.jpg",
		text: "This library has saved us a significant amount of time and effort. The components are well-documented and easy to integrate.",
		name: "Sarah Taylor",
		jobtitle: "Backend Developer",
		audio: "Sarah.mp3",
	},
	{
		image: "/itjustworks.jpg",
		text: "I appreciate the attention to detail in the design. The components are visually appealing and professional.",
		name: "Kevin White",
		jobtitle: "UI/UX Designer",
		audio: "Kevin.mp3",
	},
	{
		image: "/itjustworks.jpg",
		text: "The components are highly customizable and can be easily integrated with our existing UI framework.",
		name: "Rachel Patel",
		jobtitle: "Full Stack Developer",
		audio: "Rachel.mp3",
	},
	{
		image: "/itjustworks.jpg",
		text: "I love how the components are designed to be highly responsive and work well across different screen sizes.",
		name: "Brian Kim",
		jobtitle: "Mobile App Developer",
		audio: "Brian.mp3",
	},
];

export const data: Array<{
	id: number;
	name: string;
	sales: string;
	region: string;
	status: string;
	deltaType: string;
	hours: number;
}> = [
	{
		id: 1,
		name: "Peter McCrown",
		sales: "1,000,000",
		region: "Region A",
		status: "overperforming",
		deltaType: "moderateIncrease",
		hours: 100,
	},
	{
		id: 2,
		name: "Jon Mueller",
		sales: "2,202,000",
		region: "Region B",
		status: "overperforming",
		deltaType: "moderateIncrease",
		hours: 110,
	},
	{
		id: 3,
		name: "Peter Federer",
		sales: "1,505,000",
		region: "Region C",
		status: "underperforming",
		deltaType: "moderateDecrease",
		hours: 90,
	},
	{
		id: 4,
		name: "Maxime Bujet",
		sales: "500,000",
		region: "Region D",
		status: "overperforming",
		deltaType: "moderateDecrease",
		hours: 92,
	},
	{
		id: 5,
		name: "Emma Nelly",
		sales: "600,000",
		region: "Region E",
		status: "underperforming",
		deltaType: "moderateDecrease",
		hours: 95,
	},
];

export const dummyContent = [
	{
		title: "Lorem Ipsum Dolor Sit Amet",
		description: (
			<>
				<p>
					Sit duis est minim proident non nisi velit non consectetur.Esse
					adipisicing laboris consectetur enim ipsum reprehenderit eu
					deserunt Lorem ut aliqua anim do.Duis cupidatat qui irure
					cupidatat incididunt incididunt enim magna id est qui sunt
					fugiat.Laboris do duis pariatur fugiat Lorem aute sit ullamco.
					Qui deserunt non reprehenderit dolore nisi velit exercitation
					Lorem qui do enim culpa.Aliqua eiusmod in occaecat reprehenderit
					laborum nostrud fugiat voluptate do Lorem culpa officia sint
					labore.Tempor consectetur excepteur ut fugiat veniam commodo et
					labore dolore commodo pariatur.
				</p>
				<p>
					Dolor minim irure ut Lorem proident.Ipsum do pariatur est ad ad
					veniam in commodo id reprehenderit adipisicing.Proident duis
					exercitation ad quis ex cupidatat cupidatat occaecat adipisicing.
				</p>
				<p>
					Tempor quis dolor veniam quis dolor.Sit reprehenderit eiusmod
					reprehenderit deserunt amet laborum consequat adipisicing officia
					qui irure id sint adipisicing.Adipisicing fugiat aliqua nulla
					nostrud.Amet culpa officia aliquip deserunt veniam deserunt
					officia adipisicing aliquip proident officia sunt.
				</p>
			</>
		),
		badge: "React",
		image: "/itjustworks.jpg",
	},
	{
		title: "Lorem Ipsum Dolor Sit Amet",
		description: (
			<>
				<p>
					Ex irure dolore veniam ex velit non aute nisi labore ipsum
					occaecat deserunt cupidatat aute.Enim cillum dolor et nulla sunt
					exercitation non voluptate qui aliquip esse tempor.Ullamco ut
					sunt consectetur sint qui qui do do qui do.Labore laborum culpa
					magna reprehenderit ea velit id esse adipisicing deserunt amet
					dolore.Ipsum occaecat veniam commodo proident aliqua id ad
					deserunt dolor aliquip duis veniam sunt.
				</p>
				<p>
					In dolore veniam excepteur eu est et sunt velit.Ipsum sint esse
					veniam fugiat esse qui sint ad sunt reprehenderit do qui proident
					reprehenderit.Laborum exercitation aliqua reprehenderit ea sint
					cillum ut mollit.
				</p>
			</>
		),
		badge: "Changelog",
		image: "/itjustworks.jpg",
	},
	{
		title: "Lorem Ipsum Dolor Sit Amet",
		description: (
			<>
				<p>
					Ex irure dolore veniam ex velit non aute nisi labore ipsum
					occaecat deserunt cupidatat aute.Enim cillum dolor et nulla sunt
					exercitation non voluptate qui aliquip esse tempor.Ullamco ut
					sunt consectetur sint qui qui do do qui do.Labore laborum culpa
					magna reprehenderit ea velit id esse adipisicing deserunt amet
					dolore.Ipsum occaecat veniam commodo proident aliqua id ad
					deserunt dolor aliquip duis veniam sunt.
				</p>
			</>
		),
		badge: "Launch Week",
		image: "/itjustworks.jpg",
	},
];

export const people = [
	{
		id: 1,
		name: "John Doe",
		designation: "Software Engineer",
		image: "/itjustworks.jpg",
	},
	{
		id: 2,
		name: "Robert Johnson",
		designation: "Product Manager",
		image: "/itjustworks.jpg",
	},
	{
		id: 3,
		name: "Jane Smith",
		designation: "Data Scientist",
		image: "/itjustworks.jpg",
	},
	{
		id: 4,
		name: "Emily Davis",
		designation: "UX Designer",
		image: "/itjustworks.jpg",
	},
	{
		id: 5,
		name: "Tyler Durden",
		designation: "Soap Developer",
		image: "/itjustworks.jpg",
	},
	{
		id: 6,
		name: "Dora",
		designation: "The Explorer",
		image: "/itjustworks.jpg",
	},
];

export const DummyContent = () => {
	return (
		<Image
			src="/itjustworks.jpg"
			alt="dummy image"
			width={100}
			height={100}
			className="object-cover object-top-left h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
		/>
	);
};

export const tabs = [
	{
		title: "Product",
		value: "product",
		content: (
			<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-linear-to-br from-purple-700 to-violet-900">
				<p>Product Tab</p>
				<DummyContent />
			</div>
		),
	},
	{
		title: "Services",
		value: "services",
		content: (
			<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-linear-to-br from-purple-700 to-violet-900">
				<p>Services tab </p>
				<DummyContent />
			</div>
		),
	},
	{
		title: "Playground",
		value: "playground",
		content: (
			<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-linear-to-br from-purple-700 to-violet-900">
				<p>Playground tab </p>
				<DummyContent />
			</div>
		),
	},
	{
		title: "Content",
		value: "content",
		content: (
			<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-linear-to-br from-purple-700 to-violet-900">
				<p>Content tab </p>
				<DummyContent />
			</div>
		),
	},
	{
		title: "Random",
		value: "random",
		content: (
			<div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-linear-to-br from-purple-700 to-violet-900">
				<p>Random tab </p>
				<DummyContent />
			</div>
		),
	},
];

export const content = [
	{
		title: "Collaborative Editing",
		description:
			"Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
		content: (
			<div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
				Collaborative Editing
			</div>
		),
	},
	{
		title: "Real time changes",
		description:
			"See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
		content: (
			<div className="flex h-full w-full items-center justify-center text-white">
				<Image
					src="/itjustworks.jpg"
					width={300}
					height={300}
					className="h-full w-full object-cover"
					alt="linear board demo"
				/>
			</div>
		),
	},
	{
		title: "Version control",
		description:
			"Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
		content: (
			<div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
				Version control
			</div>
		),
	},
	{
		title: "Running out of content",
		description:
			"Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
		content: (
			<div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
				Running out of content
			</div>
		),
	},
];

export interface Step {
	title: string;
	description: string;
	image: any[];
	expandHeight?: number;
}

export const testimonialsExamples = [
	{
		quote: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
		name: "Charles Dickens",
		title: "A Tale of Two Cities",
	},
	{
		quote: "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
		name: "William Shakespeare",
		title: "Hamlet",
	},
	{
		quote: "All that we see or seem is but a dream within a dream.",
		name: "Edgar Allan Poe",
		title: "A Dream Within a Dream",
	},
	{
		quote: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
		name: "Jane Austen",
		title: "Pride and Prejudice",
	},
	{
		quote: "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
		name: "Herman Melville",
		title: "Moby-Dick",
	},
];

export const products = [
	{
		title: "Moonbeam",
		link: "https://gomoonbeam.com",
		image: [{ url: "/itjustworks.jpg" }],
	},
	{
		title: "Cursor",
		link: "https://cursor.so",
		image: [{ url: "/itjustworks.jpg" }],
	},
	{
		title: "Rogue",
		link: "https://userogue.com",
		image: [{ url: "/itjustworks.jpg" }],
	},

	{
		title: "Editorially",
		link: "https://editorially.org",
		image: [{ url: "/itjustworks.jpg" }],
	},
	{
		title: "Editrix AI",
		link: "https://editrix.ai",
		image: [{ url: "/itjustworks.jpg" }],
	},
	{
		title: "Pixel Perfect",
		link: "https://app.pixelperfect.quest",
		image: [{ url: "/itjustworks.jpg" }],
	},

	{
		title: "Algochurn",
		link: "https://algochurn.com",
		image: [{ url: "/itjustworks.jpg" }],
	},
	{
		title: "Aceternity UI",
		link: "https://ui.aceternity.com",
		image: [{ url: "/itjustworks.jpg" }],
	},
	{
		title: "Tailwind Master Kit",
		link: "https://tailwindmasterkit.com",
		image: [{ url: "/itjustworks.jpg" }],
	},
	{
		title: "SmartBridge",
		link: "https://smartbridgetech.com",
		image: [{ url: "/itjustworks.jpg" }],
	},
	{
		title: "Renderwork Studio",
		link: "https://renderwork.studio",
		image: [{ url: "/itjustworks.jpg" }],
	},

	{
		title: "Creme Digital",
		link: "https://cremedigital.com",
		image: [{ url: "/itjustworks.jpg" }],
	},
	{
		title: "Golden Bells Academy",
		link: "https://goldenbellsacademy.com",
		image: [{ url: "/itjustworks.jpg" }],
	},
	{
		title: "Invoker Labs",
		link: "https://invoker.lol",
		image: [{ url: "/itjustworks.jpg" }],
	},
	{
		title: "E Free Invoice",
		link: "https://efreeinvoice.com",
		image: [{ url: "/itjustworks.jpg" }],
	},
];

export const blogContent = {
	slug: "amazing-tailwindcss-grid-layouts",
	author: "Manu Arora",
	date: "28th March, 2023",
	title: "Amazing Tailwindcss Grid Layout Examples",
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
		<p>{title} </p>
	</div>
);

export const animeData = [
	{
		id: "1",
		title: "Solo Leveling",
		image: "/itjustworks.jpg",
		year: "2024",
		seasons: "1 season",
		platform: "Crunchyroll",
	},
	{
		id: "2",
		title: "Ishura",
		image: "/itjustworks.jpg",
		year: "2024",
		seasons: "1 season",
		platform: "Crunchyroll",
	},
	{
		id: "3",
		title: "The Apothecary Diaries",
		image: "/itjustworks.jpg",
		year: "2023",
		seasons: "2 seasons",
		platform: "Crunchyroll",
	},
	{
		id: "4",
		title: "Zenshu",
		image: "/itjustworks.jpg",
		year: "2023",
		seasons: "1 season",
		platform: "Netflix",
	},
	{
		id: "5",
		title: "Sakamoto Days",
		image: "/itjustworks.jpg",
		year: "2024",
		seasons: "1 season",
		platform: "Crunchyroll",
	},
	{
		id: "6",
		title: "Dr. Stone",
		image: "/itjustworks.jpg",
		year: "2019",
		seasons: "3 seasons",
		platform: "Crunchyroll",
	},
	{
		id: "7",
		title: "Unnamed Memory",
		image: "/itjustworks.jpg",
		year: "2024",
		seasons: "1 season",
		platform: "Crunchyroll",
	},
	{
		id: "8",
		title: "I Got Married to the Male Lead",
		image: "/itjustworks.jpg",
		year: "2024",
		seasons: "1 season",
		platform: "Crunchyroll",
	},
];

export const cards = [
	{
		bgColor: "bg-[#f97316]",
		title: "The Guiding Light",
		description:
			"Lighthouses have stood as beacons of hope for centuries, guiding sailors safely through treacherous waters. Their glowing light and towering presence serve as a reminder of humanity’s connection to the sea.",
		image: "/itjustworks.jpg",
	},
	{
		bgColor: "bg-[#0015ff]",
		title: "Life Beneath the Waves",
		description:
			"From shimmering schools of fish to solitary hunters, the ocean is home to an incredible variety of marine life. Each species plays a vital role in maintaining the balance of underwater ecosystems.",
		image: "/itjustworks.jpg",
	},
	{
		bgColor: "bg-[#ff5941]",
		title: "Alone on the Open Sea",
		description:
			"Drifting across the endless horizon, traveling alone on the sea is a test of courage and resilience. With nothing but the waves and the sky, solitude becomes both a challenge and a source of deep reflection.",
		image: "/itjustworks.jpg",
	},
	{
		bgColor: "bg-[#1f464d]",
		title: "The Art of Sailing",
		description:
			"Harnessing the power of the wind, sailing is both a skill and an adventure. Whether racing across the waves or leisurely cruising, it’s a timeless way to explore the vast blue expanse.",
		image: "/itjustworks.jpg",
	},
	{
		bgColor: "bg-[#0015ff]",
		title: "The Era of Whaling",
		description:
			"Once a thriving industry, whale hunting shaped economies and cultures across the world. Today, efforts to protect these majestic creatures highlight the shift toward conservation and respect for marine life.",
		image: "/itjustworks.jpg",
	},
];

export const itemsLinearlDialog = [
	{
		id: 1,
		url: Image1.src,
		title: "Accordion",
		description:
			"Immerse yourself in our cutting-edge interactive gallery, designed to showcase a diverse array of visual content with unparalleled clarity and style. This feature allows users to effortlessly navigate through high-resolution images, from awe-inspiring landscapes to intimate portraits and abstract art. With smooth transitions, intuitive controls, and responsive design, our gallery adapts to any device, ensuring a seamless browsing experience. Dive deeper into each piece with expandable information panels, offering insights into the artist, technique, and story behind each image. ",
		tags: ["Sunrise", "Mountains", "Golden", "Scenic", "Inspiring"],
	},
	{
		id: 2,
		url: Image1.src,
		title: "Globe Section",
		description: `Embark on a virtual journey around the world with our state-of-the-art 3D globe feature. This interactive marvel allows users to explore geographical data, global trends, and worldwide connections with unprecedented ease and detail. Spin the globe with a flick of your mouse, zoom into street-level views, or soar high for a continental perspective. Our globe section integrates real-time data feeds, showcasing everything from climate patterns and population densities to economic indicators and cultural hotspots. Customizable layers let you focus on specific data sets, while intuitive tooltips provide in-depth information at every turn. `,
		tags: ["Misty", "Path", "Mysterious", "Serene", "Rugged"],
	},
	{
		id: 3,
		url: Image1.src,

		title: "Image Mouse Trail",
		description: `Transform your browsing experience with our mesmerizing Image Mouse Trail feature. As you move your cursor across the screen, watch in wonder as a trail of carefully curated images follows in its wake, creating a dynamic and engaging visual spectacle. This innovative feature goes beyond mere aesthetics; it's an interactive showcase of your content, products, or artwork. Each image in the trail can be clickable, leading to detailed views or related content, turning casual mouse movements into opportunities for discovery.`,
		tags: ["Pathway", "Adventure", "Peaks", "Challenging", "Breathtaking"],
	},
];

export const example_cardstack_data = [
	{
		title: "something",
		images: [{ url: Image1.src, ...Image1 }],
	},
	{
		title: "nm,.nm,.",
		images: [{ url: Image1.src, ...Image1 }],
	},
	{
		title: "kl;jl;kkjl;",
		images: [{ url: Image1.src, ...Image1 }],
	},
	{
		title: "rewyrey",
		images: [{ url: Image1.src, ...Image1 }],
	},
	{
		title: "essdaf",
		images: [{ url: Image1.src, ...Image1 }],
	},
];

export const example_testimonials_data = [
	{
		title: "testimonial 1",
		comment: "etst",
	},
	{
		title: "testimonial 1",
		comment: "etst",
	},
	{
		title: "testimonial 1",
		comment: "etst",
	},
];

export const example_opposite_links_data = [
	{
		id: 1,
		title: "first entry",
		image: Image1,
		uri: "/#",
	},
	{
		id: 1,
		title: "first entry",
		image: Image1,
		uri: "/#",
	},
	{
		id: 2,
		title: "first entry",
		image: Image1,
		uri: "/#",
	},
	{
		id: 3,
		title: "first entry",
		image: Image1,
		uri: "/#",
	},
	{
		id: 4,
		title: "first entry",
		image: Image1,
		uri: "/#",
	},
	{
		id: 5,
		title: "first entry",
		image: Image1,
		uri: "/#",
	},
	{
		id: 6,
		title: "first entry",
		image: Image1,
		uri: "/#",
	},
];

export const demoItems = [
	{
		link: "#",
		text: "Mojave",
		image: "/itjustworks.jpg",
	},
	{
		link: "#",
		text: "Sonoma",
		image: "/itjustworks.jpg",
	},
	{
		link: "#",
		text: "Monterey",
		image: "/itjustworks.jpg",
	},
	{
		link: "#",
		text: "Sequoia",
		image: "/itjustworks.jpg",
	},
];

export const testimonials = [
	{
		image: "/itjustworks.jpg",
		text: "Using this library has been a game-changer for our product development.",
		name: "Michael Davis",
		jobtitle: "Full Stack Developer",
		rating: 5,
	},
	{
		image: "/itjustworks.jpg",
		text: "I love  how intuitive and well-documented this component library is. It has significantly improved our UI consistency across projects.",
		name: "James Wilson",
		jobtitle: "Product Manager",
		rating: 2,
	},
	{
		image: "/itjustworks.jpg",
		text: "This library has saved us a significant amount of time and effort. The components are well-documented and easy to integrate.",
		name: "Sarah Taylor",
		jobtitle: "Backend Developer",
		rating: 5,
	},
	{
		image: "/itjustworks.jpg",
		text: "The components are highly responsive and work seamlessly across different devices and screen sizes.",
		name: "Emily Chen",
		jobtitle: "Mobile App Developer",
		rating: 5,
	},
];

export const images = [
	{
		src: "/itjustworks.jpg",
		alt: "Rabbit",
	},
	{
		src: "/itjustworks.jpg",
		alt: "Monkey",
	},
	{
		src: "/itjustworks.jpg",
		alt: "Donkey",
	},
	{
		src: "/itjustworks.jpg",
		alt: "Cow",
	},
	{
		src: "/itjustworks.jpg",
		alt: "Chameleon",
	},
];

export const infiniteMenuItems = [
	{
		image: "/itjustworks.jpg",
		link: "https://google.com/",
		title: "Item 1",
		description: "This is pretty cool, right?",
	},
	{
		image: "/itjustworks.jpg",
		link: "https://google.com/",
		title: "Item 2",
		description: "This is pretty cool, right?",
	},
	{
		image: "/itjustworks.jpg",
		link: "https://google.com/",
		title: "Item 3",
		description: "This is pretty cool, right?",
	},
	{
		image: "/itjustworks.jpg",
		link: "https://google.com/",
		title: "Item 4",
		description: "This is pretty cool, right?",
	},
];

export const exampleData = [
	<div
		key="one"
		className="w-80 rounded-md p-5 bg-blue-100 border-2 border-blue-300 space-y-2 shadow-lg shadow-blue-200"
	>
		<p className="text-sm uppercase">Feature #1</p>
		<h3 className="text-lg text-balance font-semibold">
			Introduce a feature and its benefit.
		</h3>
		<div className="aspect-video grid place-items-center bg-neutral-200 rounded-md">
			<Image
				width={100}
				height={100}
				src={"/itjustworks.jpg"}
				alt={""}
				className="text-neutral-500"
			/>
		</div>
		<p className="text-sm">
			Explain how the feature provide value and benefit your customers. Keep
			it short and sweet.
		</p>
	</div>,
	<div
		key="tow"
		className="w-80 rounded-md p-5 bg-amber-100 border-2 border-amber-300 space-y-2 shadow-lg shadow-amber-200"
	>
		<p className="text-sm uppercase">Feature #2</p>
		<h3 className="text-lg text-balance font-semibold">
			Introduce a feature and its benefit.
		</h3>
		<div className="aspect-video grid place-items-center bg-neutral-200 rounded-md">
			<Image
				width={100}
				height={100}
				className="text-neutral-500"
				src={"/itjustworks.jpg"}
				alt={""}
			/>
		</div>
		<p className="text-sm">
			Explain how the feature provide value and benefit your customers. Keep
			it short and sweet.
		</p>
	</div>,
	<div
		key="three"
		className="w-80 rounded-md p-5 bg-green-100 border-2 border-green-300 space-y-2 shadow-lg shadow-green-200"
	>
		<p className="text-sm uppercase">Feature #3</p>
		<h3 className="text-lg text-balance font-semibold">
			Introduce a feature and its benefit.
		</h3>
		<div className="aspect-video grid place-items-center bg-neutral-200 rounded-md">
			<Image
				width={100}
				height={100}
				src={"/itjustworks.jpg"}
				alt={""}
				className="text-neutral-500"
			/>
		</div>
		<p className="text-sm">
			Explain how the feature provide value and benefit your customers. Keep
			it short and sweet.
		</p>
	</div>,
];

export const TAB_CONTENT = [
	{
		title: "2024",
		files: [
			"learning-to-meditate.md",
			"spring-garden-plans.md",
			"travel-wishlist.md",
			"new-coding-projects.md",
		],
	},
	{
		title: "2023",
		files: [
			"year-in-review.md",
			"marathon-training-log.md",
			"recipe-collection.md",
			"book-reflections.md",
		],
	},
	{
		title: "2022",
		files: [
			"moving-to-a-new-city.md",
			"starting-a-blog.md",
			"photography-basics.md",
			"first-coding-project.md",
		],
	},
	{
		title: "2021",
		files: [
			"goals-and-aspirations.md",
			"daily-gratitude.md",
			"learning-to-cook.md",
			"remote-work-journal.md",
		],
	},
];

export const projects = [
	{
		title: "Stripe",
		description:
			"A technology company that builds economic infrastructure for the internet.",
		link: "https://stripe.com",
	},
	{
		title: "Netflix",
		description:
			"A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
		link: "https://netflix.com",
	},
	{
		title: "Google",
		description:
			"A multinational technology company that specializes in Internet-related services and products.",
		link: "https://google.com",
	},
	{
		title: "Meta",
		description:
			"A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
		link: "https://meta.com",
	},
	{
		title: "Amazon",
		description:
			"A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
		link: "https://amazon.com",
	},
	{
		title: "Microsoft",
		description:
			"A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
		link: "https://microsoft.com",
	},
];

export const socials = [
	{
		name: "Instagram",
		image: "/itjustworks.jpg",
	},
	{
		name: "LinkedIn",
		image: "/itjustworks.jpg",
	},
	{
		name: "Spotify",
		image: "/itjustworks.jpg",
	},
	{
		name: "TikTok",
		image: "/itjustworks.jpg",
	},
];

export const stepsExamples: Step[] = [
	{
		title: "Welcome to Our Platform!",
		description: "Let's take a quick tour of our new features!",
		image: [
			{
				src: "/itjustworks.jpg",
			},
			{
				src: "/itjustworks.jpg",
			},
			{
				src: "/itjustworks.jpg",
			},
		],
	},
	{
		title: "Powerful Dashboard!",
		description: "Everything you need, right at your fingertips!",
		image: [
			{
				type: "video",
				src: "/placeholder.mp4",
				autoPlay: true,
				loop: true,
				className: "shadow-none",
			},
		],
		expandHeight: 120,
	},
	{
		title: "Useful Tips!",
		description: "You can also use the sidebar to go to different pages!",
		image: [
			{
				src: "/itjustworks.jpg",
			},
			{
				src: "/itjustworks.jpg",
			},
		],
		expandHeight: 140,
	},
	{
		title: "Ready to Start?",
		description: "You're all set to explore the platform!",
		image: [
			{
				src: "/itjustworks.jpg",
				className: "shadow-none",
			},
		],
		expandHeight: 140,
	},
];

export const fadeInVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.5, staggerChildren: 0.1 },
	},
};

export const wordVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

export const words = "Weekly goodies delivered straight to your inbox —".split(
	" "
);

export const transition = {
	type: "spring",
	duration: 1,
	delay: 0.4,
	bounce: 0,
};
export const highlightClass = "rounded-[0.3em] px-px";
export const highlightColor = "#F2AD91";
export const inViewOptions = { once: true, initial: true, amount: 0.1 };
export const ASCII = ["✎", "✐", "✏", "✑"];

export const filter_constants = {
	DESKTOP_ONLY: "desktop only",
	MOBILE_READY: "mobile ready",
	DARK_MODE: "dark mode ready",
	a11y_ready: "A11Y ready",
	BACKGROUND: "background",
	ACCORDION: "accordion",
	BUTTON: "button",
	BLOG_ARTICLES: "block/articles",
	CAROUSEL: "carousel",
	CARD: "card",
	CTA: "cta",
	DROPDOWN: "dropdown",
	FAQ: "faq",
	FEATURES: "features",
	FOOTER: "footer",
	FORM: "form",
	HERO: "hero",
	INTERACTIVE: "interactive",
	NAVIGATION: "navigation",
	NUMBERS: "numbers",
	PRELOADERS: "preloaders",
	PRICING: "pricing",
	SECTIONS: "sections",
	STATS: "stats",
	TABS: "tabs",
	TESTIMONIALS: "testimonials",
	TEXT: "text",
	TIMELINE: "timeline",
	TRANSITIONS: "transitions",
};

export const filterOptions = [
	{ label: "desktop only", value: "desktop only" },
	{ label: "mobile ready", value: "mobile ready" },
	{ label: "dark mode ready", value: "dark mode ready" },
	{ label: "a11y ready", value: "a11y ready" },

	{ label: "accordion", value: "accordion" },
	{ label: "Button", value: "Button" },
	{
		label: "blog/articles",
		value: "blog/articles",
	},
	{ label: "Carousel", value: "Carousel" },
	{ label: "card", value: "card" },
	{ label: "cta", value: "cta" },
	{ label: "dropdown", value: "dropdown" },
	{ label: "FAQ", value: "FAQ" },
	{ label: "features", value: "features" },
	{ label: "footer", value: "footer" },
	{ label: "form", value: "form" },
	{ label: "Hero", value: "Hero" },
	{ label: "interactive", value: "interactive" },
	{ label: "navigation", value: "navigation" },
	{ label: "numbers", value: "numbers" },
	{ label: "preloaders", value: "preloaders" },
	{ label: "pricing", value: "pricing" },
	{ label: "sections", value: "sections" },
	{ label: "stats", value: "stats" },
	{ label: "tabs", value: "tabs" },
	{ label: "testimonials", value: "testimonials" },
	{ label: "text", value: "text" },
	{ label: "timeline", value: "timeline" },
	{ label: "transitions", value: "transitions" },
];

export const exampleImages = [
	{
		url: "/itjustworks.jpg",
		author: "Branislav Rodman",
		title: "A Black and White Photo of a Woman Brushing Her Teeth",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-painting-of-a-palm-leaf-on-a-multicolored-background-AaNPwrSNOFE",
		title: "Neon Palm",
		author: "Tim Mossholder",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-blurry-photo-of-a-crowd-of-people-UgbxzloNGsc",
		author: "ANDRII SOLOK",
		title: "A blurry photo of a crowd of people",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/rippling-crystal-blue-water-9-OCsKoyQlk",
		author: "Wesley Tingey",
		title: "Rippling Crystal Blue Water",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/de/fotos/mann-im-schwarzen-hemd-unter-blauem-himmel-m8RDNiuEXro",
		author: "Serhii Tyaglovsky",
		title: "Mann im schwarzen Hemd unter blauem Himmel",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-woman-with-a-flower-crown-on-her-head-0S3muIttbsY",
		author: "Vladimir Yelizarov",
		title: "A women with a flower crown on her head",
	},
	{
		url: "/itjustworks.jpg",
		title: "A blurry photo of white flowers in a field",
		author: "Eugene Golovesov",
		link: "https://unsplash.com/photos/a-blurry-photo-of-white-flowers-in-a-field-6qbx0lzGPyc",
	},
	{
		url: "/itjustworks.jpg",
		author: "Mathilde Langevin",
		link: "https://unsplash.com/photos/a-table-topped-with-two-wine-glasses-and-plates-Ig0gRAHspV0",
		title: "A table topped with two wine glasses and plates",
	},
];

export const chromaItems = [
	{
		image: "/itjustworks.jpg",
		title: "Sarah Johnson",
		subtitle: "Frontend Developer",
		handle: "@sarahjohnson",
		borderColor: "#3B82F6",
		gradient: "linear-gradient(145deg, #3B82F6, #000)",
		url: "https://github.com/sarahjohnson",
	},
	{
		image: "/itjustworks.jpg",
		title: "Mike Chen",
		subtitle: "Backend Engineer",
		handle: "@mikechen",
		borderColor: "#10B981",
		gradient: "linear-gradient(180deg, #10B981, #000)",
		url: "https://linkedin.com/in/mikechen",
	},
];

export const mediaBetweenElements = [
	{
		src: "/itjustworks.jpg",

		left: "Tim",
		right: "Rodenböker",
		url: "https://www.instagram.com/tim_rodenbroeker/",
	},
	{
		src: "/itjustworks.jpg",

		left: "Simon ",
		right: "Alexander-Adams",
		url: "https://www.instagram.com/polyhop/",
	},
	{
		src: "/itjustworks.jpg",

		left: "Andreion",
		right: "de Castro",
		url: "https://www.instagram.com/andreiongd/",
	},
	{
		src: "/itjustworks.jpg",

		left: "Lorraine",
		right: "Li",
		url: "https://www.instagram.com/lorrr.l/",
	},
];

export const items = [
	{
		icon: <Home />,
		img: "/itjustworks.jpg",
		title: "Bridge",
		desc: "A breathtaking view of a city illuminated by countless lights, showcasing the vibrant and bustling nightlife.",
		sliderName: "bbridge",
	},
	{
		icon: <Home />,
		img: "/itjustworks.jpg",
		title: "Mountains View",
		desc: "A serene lake reflecting the surrounding mountains and trees, creating a mirror-like surface.",
		sliderName: "bmountains",
	},
	{
		icon: <Home />,
		img: "/itjustworks.jpg",
		title: "Autumn",
		desc: "A picturesque path winding through a dense forest adorned with vibrant autumn foliage.",
		sliderName: "bautumn",
	},
	{
		icon: <Home />,
		img: "/itjustworks.jpg",
		title: "Foggy",
		sliderName: "bfoggy",
		desc: "A stunning foggy view over the foresh, with the sun casting a golden glow across the forest. ",
	},
];

export const bentoItems = [
	{
		title: "The Dawn of Innovation",
		description: "Explore the birth of groundbreaking ideas and inventions.",
		header: <Skeleton />,
		icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: "The Digital Revolution",
		description: "Dive into the transformative power of technology.",
		header: <Skeleton />,
		icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: "The Art of Design",
		description: "Discover the beauty of thoughtful and functional design.",
		header: <Skeleton />,
		icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: "The Power of Communication",
		description:
			"Understand the impact of effective communication in our lives.",
		header: <Skeleton />,
		icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: "The Pursuit of Knowledge",
		description: "Join the quest for understanding and enlightenment.",
		header: <Skeleton />,
		icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: "The Joy of Creation",
		description: "Experience the thrill of bringing ideas to life.",
		header: <Skeleton />,
		icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: "The Spirit of Adventure",
		description: "Embark on exciting journeys and thrilling discoveries.",
		header: <Skeleton />,
		icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
	},
];
