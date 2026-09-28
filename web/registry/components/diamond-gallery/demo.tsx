import DiamondGallery from "./component";

export default function Usage() {
	return (
		<div className="w-96 h-96 mx-auto aspect-square">
			<DiamondGallery
				images={[
					{
						image: "/itjustworks.jpg",
						isLink: true,
						href: "https://drivebrandstudio.com",
						target: "_blank",
						rel: "noopener noreferrer",
					},
					{
						image: "/itjustworks.jpg",
						isLink: true,
						href: "https://drivebrandstudio.com",
					},
					{
						image: "/itjustworks.jpg",
						isLink: true,
						href: "https://drivebrandstudio.com",
					},
					{
						image: "/itjustworks.jpg",
						isLink: true,
						href: "https://drivebrandstudio.com",
					},
				]}
			/>
		</div>
	);
}
