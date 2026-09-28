"use client";

import { Suspense, useEffect, useState } from "react";

import dynamic from "next/dynamic";

import { demoLoaders } from "@/registry/__generated__/demos";
import { useRouter } from "next/navigation";

import { useApiValidation } from "@/lib/useApiValidation";

import ApiKeyError from "./ApiKeyError";
import { ChatComponentPreview, ComponentLoading } from "./chat-preview";
import ErrorDialog from "./ErrorDialog";
import PromptComponent from "./PromptComponent";
import RateLimitDialog from "./RateLimitDialog";

export default function V0Chat({
	files,
	categories,
}: {
	files: any;
	categories: any;
}) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [projects, setProjects] = useState<any[]>([]);
	const [projectsLoaded, setProjectsLoaded] = useState(false);
	const [selectedProjectId, setSelectedProjectId] = useState("new");
	const [selectedChatId, setSelectedChatId] = useState("new");
	const [projectChats, setProjectChats] = useState<any[]>([]);
	const [showRateLimitDialog, setShowRateLimitDialog] = useState(false);
	const [rateLimitInfo, setRateLimitInfo] = useState<{
		resetTime?: string;
		remaining?: number;
	}>({});
	const [showErrorDialog, setShowErrorDialog] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [projectChatsLoaded, setProjectChatsLoaded] = useState(false);

	// API validation on page load
	const { isValidating, showApiKeyError } = useApiValidation();

	// Load projects on page mount (only if API is valid)
	useEffect(() => {
		if (!isValidating && !showApiKeyError) {
			loadProjectsWithCache();
		}
	}, [isValidating, showApiKeyError]);

	const loadProjectsWithCache = async () => {
		// First, try to load from sessionStorage for immediate display
		try {
			const cachedProjects = sessionStorage.getItem("projects");
			if (cachedProjects) {
				const parsedProjects = JSON.parse(cachedProjects);
				setProjects(parsedProjects);
				setProjectsLoaded(true);
			}
		} catch (err) {
			// Silently handle cache loading errors
		}

		// Then fetch fresh data in the background
		loadProjects();
	};

	const loadProjects = async () => {
		try {
			const response = await fetch("/api/projects");
			if (response.ok) {
				const data = await response.json();
				const projectsData = data.data || data || [];
				setProjects(projectsData);
				setProjectsLoaded(true);

				// Store in sessionStorage for next time
				try {
					sessionStorage.setItem("projects", JSON.stringify(projectsData));
				} catch (err) {
					// Silently handle cache storage errors
				}
			} else if (response.status === 401) {
				const errorData = await response.json();
				if (errorData.error === "API_KEY_MISSING") {
					// API key error is now handled by useApiValidation hook
					return;
				}
			}
		} catch (err) {
			// Silently handle project loading errors
		} finally {
			// Mark as loaded even if there was an error
			setProjectsLoaded(true);
		}
	};

	const loadProjectChatsWithCache = async (projectId: string) => {
		// First, try to load from sessionStorage for immediate display
		try {
			const cachedChats = sessionStorage.getItem(
				`project-chats-${projectId}`
			);
			if (cachedChats) {
				const parsedChats = JSON.parse(cachedChats);
				setProjectChats(parsedChats);
				setProjectChatsLoaded(true);
			}
		} catch (err) {
			// Silently handle cache loading errors
		}

		// Then fetch fresh data in the background
		try {
			const response = await fetch(`/api/projects/${projectId}`);
			if (response.ok) {
				const data = await response.json();
				const chatsData = data.chats || [];
				setProjectChats(chatsData);
				setProjectChatsLoaded(true);

				// Store in sessionStorage for next time
				try {
					sessionStorage.setItem(
						`project-chats-${projectId}`,
						JSON.stringify(chatsData)
					);
				} catch (err) {
					// Silently handle cache storage errors
				}
			}
		} catch (err) {
			// Silently handle project chats loading errors
		}
	};

	const handleProjectChange = async (newProjectId: string) => {
		if (newProjectId === "new") {
			// Stay on homepage for new project
			setSelectedProjectId("new");
			setSelectedChatId("new");
			setProjectChats([]);
		} else {
			// Redirect to the selected project page
			router.push(`/projects/${newProjectId}`);
		}
	};

	const handleChatChange = (newChatId: string) => {
		setSelectedChatId(newChatId);
	};

	const handleSubmit = async (
		prompt: string,
		settings: {
			modelId: string;
			imageGenerations: boolean;
			thinking: boolean;
		},
		attachments?: { url: string; name?: string; type?: string }[]
	) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/generate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: prompt,
					modelId: settings.modelId,
					imageGenerations: settings.imageGenerations,
					thinking: settings.thinking,
					...(attachments && attachments.length > 0 && { attachments }),
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();

				// Check for API key error
				if (
					response.status === 401 &&
					errorData.error === "API_KEY_MISSING"
				) {
					// API key error is now handled by useApiValidation hook
					return;
				}

				// Check for rate limit error
				if (
					response.status === 429 &&
					errorData.error === "RATE_LIMIT_EXCEEDED"
				) {
					setRateLimitInfo({
						resetTime: errorData.resetTime,
						remaining: errorData.remaining,
					});
					setShowRateLimitDialog(true);
					return;
				}

				setErrorMessage(errorData.error || "Failed to generate app");
				setShowErrorDialog(true);
				return;
			}

			const data = await response.json();

			// Redirect to the new chat
			if (data.id || data.chatId) {
				const newChatId = data.id || data.chatId;
				const projectId = data.projectId || "default"; // Fallback project
				router.push(`/projects/${projectId}/chats/${newChatId}`);
				return;
			}
		} catch (err) {
			setErrorMessage(
				err instanceof Error
					? err.message
					: "Failed to generate app. Please try again."
			);
			setShowErrorDialog(true);
		} finally {
			setIsLoading(false);
			setProjectChatsLoaded(true);
		}
	};

	const [selectedComponents, setSelectedComponents] = useState([]);
	const [previewComponent, setPreviewComponent] = useState();

	// Show API key error page if needed
	if (showApiKeyError) {
		return <ApiKeyError />;
	}
	const { All, New, ...otherCats } = categories;

	// Demos are resolved through the generated loader map rather than a dynamic
	// path expression, so the bundler can split them into per-component chunks.
	const previewSlug = previewComponent?.name?.replace(".json", "");
	const previewLoader = previewSlug ? demoLoaders[previewSlug] : undefined;

	const PreviewComponentImport = dynamic(
		previewLoader ??
			(async () => ({
				default: () => (
					<div className="flex h-full items-center justify-center p-4 text-center text-xs text-muted-foreground">
						No demo available{previewSlug ? ` for ${previewSlug}` : ""}
					</div>
				),
			})),
		{ loading: ComponentLoading, ssr: false }
	);

	return (
		<div className="relative min-h-dvh bg-background">
			{/* Homepage Welcome Message */}
			<div className="flex items-center justify-center">
				<div className="text-center px-4 sm:px-6">
					<h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 text-pretty">
						Drive Brand Studio GEN
					</h1>
					<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
						This is a collection of {files.length} animated components.
						<br />
						{files.filter((file) => file.name.includes("comp-")).length} basic and {files.filter((file) => !file.name.includes("comp-")).length} animated
					</p>
				</div>
			</div>

			<section className="flex pb-[200px]">
				<div>
					{/* {Object.entries(otherCats).map(
						([category, { components, description }], i) => {
							const categoryTotal = files.filter(
								({ name }) =>
									name.includes(category) ||
									!!components
										.map((filter) => name.includes(filter))
										.filter((item) => !!item).length
							);

							return (
								<div className="mx-auto w-[50vw] py-6">
									{category}
									<ul
										key={category}
										className="grid grid-cols-6 gap-3"
									>
										{categoryTotal.map((item) => {
											const itemName = item.name.replace(
												".json",
												""
											);

											return (
												<li
													onMouseEnter={() =>
														setPreviewComponent(item)
													}
													onClick={() => {
														selectedComponents.includes(itemName)
															? setSelectedComponents((prev) =>
																	prev.filter(
																		(prevItem) =>
																			itemName !== prevItem
																	)
																)
															: setSelectedComponents([
																	itemName,
																	...selectedComponents,
																]);
													}}
													className={`rounded-2xl h-full content-center relative px-6 py-4 bg-zinc-800 hover:bg-zinc-700 transition-colors text-center font-medium shadow-md ${
														category === "All"
															? "text-red-400"
															: "text-white"
													}`}
												>
													{item.name
														.replace(".json", "")
														.replaceAll("-", " ")}
												</li>
											);
										})}
									</ul>
								</div>
							);
						}
					)} */}

					<div className="mx-auto w-[50vw] py-6">
						<ul
							key={'allthemthans'}
							className="grid grid-cols-6 gap-3"
						>
							{files.map((item) => {
								const itemName = item.name.replace(
									".json",
									""
								);

								return (
									<li
										key={itemName}
										onMouseEnter={() =>
											setPreviewComponent(item)
										}
										onClick={() => {
											selectedComponents.includes(itemName)
												? setSelectedComponents((prev) =>
													prev.filter(
														(prevItem) =>
															itemName !== prevItem
													)
												)
												: setSelectedComponents([
													itemName,
													...selectedComponents,
												]);
										}}
										className={`rounded-2xl h-full content-center relative px-6 py-4 bg-zinc-800 hover:bg-zinc-700 transition-colors text-center font-medium shadow-md text-white`}
									>
										{item.name
											.replace(".json", "")
											.replaceAll("-", " ")}
									</li>
								);
							})}
						</ul>
					</div>

				</div>
				{!!previewComponent?.name && (
					<div className="fixed right-0 top-0 bottom-0 overflow-hidden max-w-[25vw]">
						<button onClick={() => setPreviewComponent()}>x</button>
						<Suspense fallback={<span>Loading</span>}>
							{" "}
							<ChatComponentPreview
									title={previewSlug ?? ""}
									registryUrl={previewSlug ? `https://components.drivedev.net/r/${previewSlug}.json` : undefined}
									onClose={() => setPreviewComponent(undefined)}
								>
								{!!PreviewComponentImport ? (
									<PreviewComponentImport />
								) : (
									<div>
										failed to load{" "}
										{previewComponent.name.replace(".json", "")}
									</div>
								)}
							</ChatComponentPreview>
						</Suspense>
					</div>
				)}
			</section>

			<PromptComponent
				onSubmit={handleSubmit}
				isLoading={isLoading}
				placeholder="Describe your app..."
				showDropdowns={projectsLoaded}
				projects={projects}
				projectChats={projectChats}
				currentProjectId={selectedProjectId}
				currentChatId={selectedChatId}
				onProjectChange={handleProjectChange}
				onChatChange={handleChatChange}
				selectedComponents={selectedComponents}
				setSelectedComponents={setSelectedComponents}
			/>

			<RateLimitDialog
				isOpen={showRateLimitDialog}
				onClose={() => setShowRateLimitDialog(false)}
				resetTime={rateLimitInfo.resetTime}
				remaining={rateLimitInfo.remaining}
			/>

			<ErrorDialog
				isOpen={showErrorDialog}
				onClose={() => setShowErrorDialog(false)}
				message={errorMessage}
			/>
		</div>
	);
}
