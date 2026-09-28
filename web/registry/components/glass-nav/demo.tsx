import GlassNavigation from "./component";

export default function Usage() {
	return (
		<section
			className="relative h-[150vh] w-full overflow-hidden bg-background"
			style={{
				backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23171717'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
			}}
		>
			<GlassNavigation />

			<span className="absolute -top-[600px] left-[50%] h-[800px] w-4/5 max-w-3xl -translate-x-[50%] rounded bg-background" />
		</section>
	);
}
