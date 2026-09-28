import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function OpenInV0Button({
	name,
	className,
}: { name: string } & React.ComponentProps<typeof Button>) {
	return (
		<Button
			aria-label="Open in v0"
			className={cn(
				"h-7 gap-1 rounded-lg shadow-none bg-black px-3 text-xs text-white hover:bg-black hover:text-white dark:bg-white dark:text-black",
				className
			)}
			asChild
		>
			<a
				href={`https://v0.dev/chat/api/open?url=${process.env.NEXT_PUBLIC_BASE_URL}/r/${name}.json`}
				target="_blank"
				rel="noreferrer"
			>
				Open in AI
			</a>
		</Button>
	);
}
