# Gradient Testimonials

- Categories: Testimonials
- Import: `@/components/ui/gradient-testimonials`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/gradient-testimonials.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Usage

```tsx
"use client";

import React from "react";

import Testimonials from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<Testimonials
				data={[
					{
						title: "testimonial 1",
						comment: "etst",
					},
					{
						title: "testimonial 2",
						comment: "etst",
					},
					{
						title: "testimonial 3",
						comment: "etst",
					},
				]}
			/>
		</div>
	);
}
```

## Source

### `components/ui/gradient-testimonials.tsx`

```tsx
"use client";

import React from "react";

const Testimonials = ({ data }) => {
	return (
		<section className="h-fit w-full bg-background">
			<div className="mx-auto flex flex-wrap justify-center gradient-background cont-page">
				{data.map(({ title, comment }) => {
					return (
						<div
							className="relative gradient-card basis-1/3 grow"
							key={title}
						>
							<div
								className="absolute -inset-1 bg-background"
								style={{
									mask: "url(./TextBox_frame.svg)",
									maskSize: "contain",
									maskRepeat: "no-repeat",
								}}
							></div>
							<div className="z-10 relative p-20 text-foreground mix-blend-difference">
								{title}
								{comment}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default Testimonials;
```
