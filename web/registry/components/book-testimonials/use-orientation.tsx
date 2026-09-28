import { useEffect, useState } from "react";

export const useOrientation = () => {
	const [orientation, setOrientation] = useState("");
	const [isMobile, setIsMobile] = useState(true);

	useEffect(() => {
		// Function to update the orientation state
		function updateOrientation() {
			setOrientation(window.screen.orientation.type);
		}
		// Initial update of the orientation state
		updateOrientation();

		if (typeof window !== "undefined") {
			setIsMobile(window.innerWidth < 770);
		}

		// Add an event listener for orientation change
		window.addEventListener("orientationchange", updateOrientation);
		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener("orientationchange", updateOrientation);
		};
	}, [orientation]);

	return { isMobile, orientation };
};
