import type { PropDoc } from "@/registry/types";

export function PropsTable({ props }: { props: PropDoc[] }) {
	if (!props.length) {
		return (
			<p className="text-sm text-muted-foreground">
				No props documented yet. Run{" "}
				<code className="rounded bg-muted px-1 py-0.5 text-xs">
					npm run registry:enrich
				</code>{" "}
				to extract them from the component&apos;s types, or add them to{" "}
				<code className="rounded bg-muted px-1 py-0.5 text-xs">meta.ts</code>.
			</p>
		);
	}

	return (
		<div className="overflow-x-auto rounded-lg border">
			<table className="w-full text-left text-sm">
				<thead className="border-b bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
					<tr>
						<th className="px-3 py-2 font-medium">Prop</th>
						<th className="px-3 py-2 font-medium">Type</th>
						<th className="px-3 py-2 font-medium">Default</th>
						<th className="px-3 py-2 font-medium">Description</th>
					</tr>
				</thead>
				<tbody>
					{props.map((prop) => (
						<tr key={prop.name} className="border-b last:border-0 align-top">
							<td className="whitespace-nowrap px-3 py-2">
								<code className="text-xs font-medium">{prop.name}</code>
								{prop.required ? (
									<span className="ml-1 text-[10px] text-destructive">required</span>
								) : null}
							</td>
							<td className="px-3 py-2">
								<code className="text-xs text-muted-foreground">{prop.type}</code>
							</td>
							<td className="px-3 py-2">
								{prop.default ? (
									<code className="text-xs text-muted-foreground">{prop.default}</code>
								) : (
									<span className="text-xs text-muted-foreground/50">—</span>
								)}
							</td>
							<td className="px-3 py-2 text-xs text-muted-foreground">
								{prop.description || <span className="text-muted-foreground/50">—</span>}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
