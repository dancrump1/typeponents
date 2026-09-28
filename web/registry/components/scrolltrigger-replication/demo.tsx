import Link from "next/link";

import CTAButton from "./component";
import Listing from "./components/listing";
import StickyScroll1 from "./components/sticky-scroll1";
import StickyScroll2 from "./components/sticky-scroll2";
import { GsapProvider } from "./gsap-provider";
import { LenisProvider } from "./lenis-provider";

export default function ExampleScrollReplication({
	containerRef,
}: {
	containerRef?: React.RefObject<HTMLElement | null>;
} = {}) {
	return (
		<>
			<LenisProvider>
				<div>
					<div className="grid min-h-screen place-items-center bg-background py-20 text-secondary">
						<div className="container flex min-h-[50vh] flex-col justify-between text-center">
							<h1 className="heading-60-150">
								<Link
									href={"https://www.mcsaatchiabel.co.za/"}
									target="_blank"
									className="block text-blue"
								>
									m&csaatchi abel
								</Link>
								Replication
							</h1>

							<div className="heading-16-40 flex items-center justify-center gap-x-5 text-center text-blue">
								<Link
									href={
										"https://github.com/PhanDangKhoa96/mcsaatchiabel.co.za-replication"
									}
									target="_blank"
									className="hover:underline"
								>
									Source code
								</Link>
								<span>|</span>
								<Link
									href={"https://www.pldkhoa.dev/playground"}
									target="_blank"
									className="hover:underline"
								>
									All demos
								</Link>
							</div>
						</div>
					</div>
					<div className="h-px bg-background"></div>
					<StickyScroll1 containerRef={containerRef} />
					<StickyScroll2 containerRef={containerRef} />
					<CTAButton />
					<Listing />

					<div
						className="heading-60-150 container grid
             h-screen place-items-center text-balance text-center text-blue"
					>
						Have a good day!
					</div>
				</div>
			</LenisProvider>
			<GsapProvider scrollTrigger />
		</>
	);
}
