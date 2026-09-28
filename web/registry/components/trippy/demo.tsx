import Trippy from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-screen relative">
			<Trippy />
			<div
				style={{
					position: "absolute",
					top: 8,
					left: 8,
					fontSize: "0.6em",
					color: "white",
				}}
			>
				{"Move mouse & Hold mouse down"}
			</div>
		</div>
	);
}
