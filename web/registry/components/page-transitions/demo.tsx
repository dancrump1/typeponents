import HeroHome from "./component";
import { TransitionProvider } from "./transition-provider";
import { GsapProvider } from "@/registry/components/scrolltrigger-replication/gsap-provider";
import { LenisProvider } from "@/registry/components/scrolltrigger-replication/lenis-provider";

export default function Usage() {
	return (
		<TransitionProvider>
			<LenisProvider>
				<div className="flex min-h-svh justify-between flex-col gap-y-12 lg:min-h-screen lg:gap-y-20">
					<HeroHome />
				</div>
			</LenisProvider>
			<GsapProvider scrollTrigger />
		</TransitionProvider>
	);
}
