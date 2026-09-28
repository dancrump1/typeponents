import {
	Timeline,
	TimelineDate,
	TimelineHeader,
	TimelineIndicator,
	TimelineItem,
	TimelineSeparator,
	TimelineTitle,
} from "@/components/ui/timeline";

const items = [
	{
		id: 1,
		date: "Mar 15, 2024",
		title: "Project Kickoff",
	},
	{
		id: 2,
		date: "Mar 22, 2024",
		title: "Design Phase",
	},
	{
		id: 3,
		date: "Apr 5, 2024",
		title: "Development Sprint",
	},
	{
		id: 4,
		date: "Apr 19, 2024",
		title: "Testing & Deployment",
	},
	{
		id: 5,
		date: "May 3, 2024",
		title: "User Training",
	},
	{
		id: 6,
		date: "May 17, 2024",
		title: "Project Handover",
	},
];

export default function Component() {
	return (
		<Timeline defaultValue={3}>
			{items.map((item) => (
				<TimelineItem
					key={item.id}
					step={item.id}
					className="w-[calc(50%-1.5rem)] odd:ms-auto even:text-right group-data-[orientation=vertical]/timeline:even:ms-0 group-data-[orientation=vertical]/timeline:even:me-8 **:data-[slot=timeline-indicator]:group-data-[orientation=vertical]/timeline:even:-right-6 **:data-[slot=timeline-indicator]:group-data-[orientation=vertical]/timeline:even:left-auto **:data-[slot=timeline-indicator]:group-data-[orientation=vertical]/timeline:even:translate-x-1/2 **:data-[slot=timeline-separator]:group-data-[orientation=vertical]/timeline:even:-right-6 **:data-[slot=timeline-separator]:group-data-[orientation=vertical]/timeline:even:left-auto **:data-[slot=timeline-separator]:group-data-[orientation=vertical]/timeline:even:translate-x-1/2"
				>
					<TimelineHeader>
						<TimelineSeparator />
						<TimelineDate>{item.date}</TimelineDate>
						<TimelineTitle>{item.title}</TimelineTitle>
						<TimelineIndicator />
					</TimelineHeader>
				</TimelineItem>
			))}
		</Timeline>
	);
}
