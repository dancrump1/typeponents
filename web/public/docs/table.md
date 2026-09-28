# Table

- Categories: Data & Tables
- Import: `@/components/ui/table`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/table.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Usage

```tsx
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFoot,
	TableHead,
	TableHeaderCell,
	TableRoot,
	TableRow,
} from "./component";

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

export default function TableHero() {
	return (
		<TableRoot>
			<Table>
				<TableCaption>Recent invoices.</TableCaption>
				<TableHead>
					<TableRow>
						<TableHeaderCell>Name</TableHeaderCell>
						<TableHeaderCell>Sales ($)</TableHeaderCell>
						<TableHeaderCell>Region</TableHeaderCell>
						<TableHeaderCell>Status</TableHeaderCell>
						<TableHeaderCell className="text-right">
							Working Hours (h)
						</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((item) => (
						<TableRow key={item.id + "table-example"}>
							<TableCell>{item.name}</TableCell>
							<TableCell className="text-right">{item.sales}</TableCell>
							<TableCell>{item.region}</TableCell>
							<TableCell>{item.status}</TableCell>
							<TableCell className="text-right">{item.hours}</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFoot>
					<TableRow>
						<TableHeaderCell
							colSpan={2}
							scope="row"
							className="text-right"
						>
							4,642
						</TableHeaderCell>
						<TableHeaderCell
							colSpan={3}
							scope="row"
							className="text-right"
						>
							497
						</TableHeaderCell>
					</TableRow>
				</TableFoot>
			</Table>
		</TableRoot>
	);
}
```

## Source

### `components/ui/table.tsx`

```tsx
// Tremor Table [v0.0.3]

import React from "react";

import { cn } from "@/lib/utils";

const TableRoot = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, forwardedRef) => (
	<div
		ref={forwardedRef}
		// Activate if table is used in a float environment
		// className="flow-root"
	>
		<div
			// make table scrollable on mobile
			className={cn("w-full overflow-auto whitespace-nowrap", className)}
			{...props}
		>
			{children}
		</div>
	</div>
));

TableRoot.displayName = "TableRoot";

const Table = React.forwardRef<
	HTMLTableElement,
	React.TableHTMLAttributes<HTMLTableElement>
>(({ className, ...props }, forwardedRef) => (
	<table
		ref={forwardedRef}
		tremor-id="tremor-raw"
		className={cn(
			// base
			"w-full caption-bottom border-b",
			// border color
			"border-gray-200 dark:border-gray-800",
			className
		)}
		{...props}
	/>
));

Table.displayName = "Table";

const TableHead = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, forwardedRef) => (
	<thead ref={forwardedRef} className={cn(className)} {...props} />
));

TableHead.displayName = "TableHead";

const TableHeaderCell = React.forwardRef<
	HTMLTableCellElement,
	React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, forwardedRef) => (
	<th
		ref={forwardedRef}
		className={cn(
			// base
			"border-b px-4 py-3.5 text-left text-sm font-semibold",
			// text color
			"text-foreground dark:text-foreground",
			// border color
			"border-gray-200 dark:border-gray-800",
			className
		)}
		{...props}
	/>
));

TableHeaderCell.displayName = "TableHeaderCell";

const TableBody = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, forwardedRef) => (
	<tbody
		ref={forwardedRef}
		className={cn(
			// base
			"divide-y",
			// divide color
			"divide-gray-200 dark:divide-gray-800",
			className
		)}
		{...props}
	/>
));

TableBody.displayName = "TableBody";

const TableRow = React.forwardRef<
	HTMLTableRowElement,
	React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, forwardedRef) => (
	<tr
		ref={forwardedRef}
		className={cn(
			"[&_td:last-child]:pr-4 [&_th:last-child]:pr-4",
			"[&_td:first-child]:pl-4 [&_th:first-child]:pl-4",
			className
		)}
		{...props}
	/>
));

TableRow.displayName = "TableRow";

const TableCell = React.forwardRef<
	HTMLTableCellElement,
	React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, forwardedRef) => (
	<td
		ref={forwardedRef}
		className={cn(
			// base
			"p-4 text-sm",
			// text color
			"text-foreground dark:text-foreground",
			className
		)}
		{...props}
	/>
));

TableCell.displayName = "TableCell";

const TableFoot = React.forwardRef<
	HTMLTableSectionElement,
	React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, forwardedRef) => {
	return (
		<tfoot
			ref={forwardedRef}
			className={cn(
				// base
				"border-t text-left font-medium",
				// text color
				"text-foreground dark:text-foreground",
				// border color
				"border-gray-200 dark:border-gray-800",
				className
			)}
			{...props}
		/>
	);
});

TableFoot.displayName = "TableFoot";

const TableCaption = React.forwardRef<
	HTMLTableCaptionElement,
	React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, forwardedRef) => (
	<caption
		ref={forwardedRef}
		className={cn(
			// base
			"mt-3 px-3 text-center text-sm",
			// text color
			"text-foreground dark:text-foreground",
			className
		)}
		{...props}
	/>
));

TableCaption.displayName = "TableCaption";

export {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFoot,
	TableHead,
	TableHeaderCell,
	TableRoot,
	TableRow,
};
```
