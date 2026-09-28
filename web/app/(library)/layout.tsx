import React from "react";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { HoverProvider } from "@/lib/hover-context";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "Component library",
		template: "%s · Component library",
	},
	description:
		"Installable React components for Tailwind CSS v4, distributed as a shadcn registry.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				suppressHydrationWarning
			>
				<HoverProvider>
					<NuqsAdapter>
						<ThemeProvider storageKey="library-demo" attribute="class" defaultTheme="system" enableSystem >
							{children}
						</ThemeProvider>
					</NuqsAdapter>
				</HoverProvider>
			</body>
			{process.env.NEXT_PUBLIC_GA_KEY ? (
				<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_KEY} />
			) : null}
		</html>
	);
}
