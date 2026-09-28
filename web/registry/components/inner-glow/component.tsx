import { cn } from "@/lib/utils";

// Credit:
// https://starui.link/docs/components/inner-glow

// add to scss file
// @property --hue-rotation {
//   syntax: "<angle>";
//   initial-value: 0turn;
//   inherits: false;
// }

// @theme {
//   --animate-inner-glow: inner-glow 4s linear infinite;
//   @keyframes inner-glow {
//     from {
//       --hue-rotation: 0turn;
//     }
//     to {
//       --hue-rotation: 1turn;
//     }
//   }
// }
interface InnerGlowProps extends React.HTMLAttributes<HTMLDivElement> {}

function InnerGlow({ className, ...props }: InnerGlowProps) {
	return (
		<div
			className={cn(
				"absolute -inset-3 border-10 pointer-events-none blur-md [border-image:conic-gradient(from_var(--hue-rotation)_in_hsl_longer_hue,red-600,red-600)_1] animate-inner-glow",
				className
			)}
			{...props}
		/>
	);
}

export { InnerGlow };
