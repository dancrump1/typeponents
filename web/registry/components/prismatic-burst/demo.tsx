import PrismaticBurst from "./component";

export default function Usage() {
	return (
		<div style={{ width: "100%", height: "600px", position: "relative" }}>
			<PrismaticBurst
				animationType="rotate3d"
				intensity={2}
				speed={0.5}
				distort={1.0}
				paused={false}
				offset={{ x: 0, y: 0 }}
				hoverDampness={0.25}
				rayCount={24}
				mixBlendMode="lighten"
				colors={["#ff007a", "#4d3dff", "#ffffff"]}
			/>
		</div>
	);
}
