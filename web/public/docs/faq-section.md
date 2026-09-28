# FAQ Section

- Categories: Accordions
- Tags: hover
- Import: `@/components/ui/faq-section`
- Inspiration: Eclair UI (adaptation) — https://eclairui.gopx.dev/components/faq-sections

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/faq-section.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `faqs` | `FAQData` | `faqData` | — |

## Usage

```tsx
"use client";

import React from "react";

import FAQPage from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<FAQPage />
		</div>
	);
}
```

## Source

### `components/ui/faq-section.tsx`

```tsx
import React, { useState } from "react";

import { motion } from "motion/react";

// Credit:
// https://eclairui.gopx.dev/components/faq-sections

interface FAQItem {
	question: string;
	answer: string;
}

interface FAQData {
	[key: string]: FAQItem[];
}
const faqData: FAQData = {
	Components: [
		{
			question: "What are the UI components you offer?",
			answer:
				"We offer a wide range of pre-built UI components built with Tailwind CSS and Framer Motion, including buttons, cards, forms, navigation menus, and more.",
		},
		{
			question: "How can I use these components in my project?",
			answer:
				"Simply copy and paste the code for the components you need into your project, then customize the styles and functionality to match your design.",
		},
		{
			question: "Are the components responsive and mobile-friendly?",
			answer:
				"Yes, our components are designed to be fully responsive and optimized for both desktop and mobile devices.",
		},
		{
			question: "Can I modify the components to fit my branding?",
			answer:
				"Absolutely! The components are highly customizable, allowing you to easily change colors, fonts, and other styles to match your brand identity.",
		},
	],
	Features: [
		{
			question: "What makes your components unique?",
			answer:
				"Our components are built with modern technologies like Tailwind CSS and Framer Motion, offering advanced features like animations, hover effects, and smooth scrolling.",
		},
		{
			question: "Do you provide documentation and support?",
			answer:
				"Yes, we offer comprehensive documentation and support to help you get started and troubleshoot any issues you may encounter.",
		},
		{
			question: "How often are new components added?",
			answer:
				"We regularly add new components and update existing ones to ensure you always have access to the latest design trends and best practices.",
		},
		{
			question: "Can I use these components in commercial projects?",
			answer:
				"Yes, our components are licensed for commercial use, allowing you to incorporate them into your client projects without any additional fees.",
		},
	],
	Pricing: [
		{
			question: "How much do your components cost?",
			answer:
				"Our components are available at an affordable, one-time price, with no recurring fees or hidden costs.",
		},
		{
			question: "Do you offer any discounts or bundle deals?",
			answer:
				"Yes, we offer discounts for bulk purchases and bundle deals that include multiple component packs at a reduced price.",
		},
		{
			question: "What payment methods do you accept?",
			answer:
				"We accept various payment methods, including credit cards, PayPal, and cryptocurrency, to make it easy for you to purchase our components.",
		},
		{
			question: "Do you offer a money-back guarantee?",
			answer:
				"We stand behind the quality of our components and offer a 30-day money-back guarantee if you're not completely satisfied with your purchase.",
		},
	],
	Support: [
		{
			question: "What kind of support do you provide?",
			answer:
				"Our support team is available to assist you with any questions or issues you may have regarding our components, from installation to customization.",
		},
		{
			question: "How can I get in touch with your support team?",
			answer:
				"You can reach our support team via email, live chat, or our support forum, where you can also find answers to frequently asked questions.",
		},
		{
			question: "Do you offer any tutorials or guides?",
			answer:
				"Yes, we provide a variety of tutorials, guides, and code examples to help you get the most out of our components and learn best practices for web development.",
		},
		{
			question:
				"How quickly can I expect a response from your support team?",
			answer:
				"We strive to respond to all support inquiries within 24 hours, and we prioritize resolving any critical issues as quickly as possible.",
		},
	],
};

const FAQPage: React.FC = ({ faqs = faqData }: { faqs: FAQData }) => {
	const [activeTab, setActiveTab] = useState<string>(Object.keys(faqs)[0]);
	const [openQuestion, setOpenQuestion] = useState<string>(
		"What are the UI components you offer?"
	);

	return (
		<div className="mb-16 relative">
			<div className="max-w-4xl mx-auto">
				{/* <PageHeader
					title="FAQs"
					heading="Comprehensive Answers to Frequently Asked Questions"
					description="Find detailed answers to common questions about our services and tools."
				/> */}
				<div className="flex justify-center space-x-1 sm:space-x-5 mb-8 w-fit mx-auto">
					{Object.keys(faqs).map((tab) => (
						<motion.button
							key={tab}
							className={`px-2 py-1 font-bold rounded-md text-xs sm:text-sm ${
								activeTab === tab
									? "bg-linear-to-r from-red-400 to-orange-400 text-secondary dark:text-primary dark:from-red-600 dark:to-orange-600"
									: "text-primary/50 dark:text-secondary/50"
							}`}
							onClick={() => setActiveTab(tab)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{tab}
						</motion.button>
					))}
				</div>
				<div className="space-y-4">
					{faqs[activeTab].map((item) => (
						<motion.div
							key={item.question}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							className="border dark:border-white/20 border-black/20 rounded-lg overflow-hidden bg-background"
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
								<div className="p-4 border-t dark:border-white/20 border-black/20 text-foreground dark:text-foreground/70 bg-background">
									{item.answer}
								</div>
							</motion.div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
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
			<div className="-z-50 absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[linear-gradient(to_bottom,white,transparent)]"></div>
			<p className="text-center font-space-grotesk mb-8 font-roboto font-bold uppercase text-xl">
				{title}
			</p>
			<h1 className="text-center lg:leading-10 mx-4 lg:mx-0">
				<span className="font-bold font-serif lg:text-5xl md:text-4xl sm:text-3xl text-2xl">
					{heading}
				</span>
			</h1>
			<p className="text-center font-space-grotesk w-full max-w-3xl mx-auto px-8 mt-8 text-sm md:text-md opacity-70 italic font-serif">
				{description}
			</p>
		</div>
	);
};

export default FAQPage;
```

## Attribution

Source: Eclair UI · Original: https://eclairui.gopx.dev/components/faq-sections

Adapted from the original. Credit the original author when you ship this.
