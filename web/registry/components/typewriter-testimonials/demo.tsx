import React from "react";

import TypewriterTestimonial from "./component";
import { testimonials } from "@/lib/example-data";

export const typewritterTestimonials = [
	{
		image: "/itjustworks.jpg",
		text: "Using this component library has significantly speed up our development process. The quality and ease of integration are remarkable!",
		name: "David Smith",
		jobtitle: "UI Designer",
		audio: "David.mp3",
		image: "/itjustworks.jpg",
	},
	{
		image: "/itjustworks.jpg",
		text: "I love  how intuitive and well-documented this component library is. It has significantly improved our UI consistency across projects.",
		name: "James Wilson",
		jobtitle: "Product Manager",
		audio: "James.mp3",
		image: "/itjustworks.jpg",
	},
	{
		image: "/itjustworks.jpg",
		text: "Using this library has been a game-changer for our product development.",
		name: "Michael Davis",
		jobtitle: "Full Stack Developer",
		audio: "Michael.mp3",
		image: "/itjustworks.jpg",
	},
	{
		image: "/itjustworks.jpg",
		text: "The components are highly responsive and work seamlessly across different devices and screen sizes.",
		name: "Emily Chen",
		jobtitle: "Mobile App Developer",
		audio: "Emily.mp3",
		image: "/itjustworks.jpg",
	},
	{
		image: "/itjustworks.jpg",
		text: "This library has saved us a significant amount of time and effort. The components are well-documented and easy to integrate.",
		name: "Sarah Taylor",
		jobtitle: "Backend Developer",
		audio: "Sarah.mp3",
		image: "/itjustworks.jpg",
	},
	{
		image: "/itjustworks.jpg",
		text: "I appreciate the attention to detail in the design. The components are visually appealing and professional.",
		name: "Kevin White",
		jobtitle: "UI/UX Designer",
		audio: "Kevin.mp3",
		image: "/itjustworks.jpg",
	},
	{
		image: "/itjustworks.jpg",
		text: "The components are highly customizable and can be easily integrated with our existing UI framework.",
		name: "Rachel Patel",
		jobtitle: "Full Stack Developer",
		audio: "Rachel.mp3",
		image: "/itjustworks.jpg",
	},
	{
		image: "/itjustworks.jpg",
		text: "I love how the components are designed to be highly responsive and work well across different screen sizes.",
		name: "Brian Kim",
		jobtitle: "Mobile App Developer",
		audio: "Brian.mp3",
		image: "/itjustworks.jpg",
	},
];

function UsageTypewriterTestimonial() {
	return <TypewriterTestimonial testimonials={testimonials} />;
}

export default UsageTypewriterTestimonial;
