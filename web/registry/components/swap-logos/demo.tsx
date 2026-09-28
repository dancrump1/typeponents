import { Spinner } from "./component";
import {
    // SiCss3,
    SiFramer,
    SiHtml5,
    SiJavascript,
    SiReact,
    SiTailwindcss,
} from "react-icons/si";

const Logos = () => {
    return (
        <section>
            <div className="mx-auto grid max-w-3xl grid-cols-3 divide-x divide-neutral-700 border border-neutral-700">
                <Spinner
                    top={<SiTailwindcss className="text-[#0DA5E9]" />}
                    bottom={<SiHtml5 className="text-[#DD4A25]" />}
                />
                <Spinner
                    top={<SiFramer className="text-[#0095FF]" />}
                    // bottom={<SiCss3 className="text-[#254BDD]" />}
                    bottom={<SiFramer className="text-[#254BDD]" />}
                />

                <Spinner
                    top={<SiReact className="text-[#58C4DC]" />}
                    bottom={<SiJavascript className="text-[#EFD81D]" />}
                />
            </div>
        </section>
    );
};


export const SwapLogos = () => {
    return (
        <div className="bg-neutral-900 py-8">
            <Logos />
        </div>
    );
};

export default SwapLogos;
