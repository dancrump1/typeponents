import SpotlightButton from "./component";

const ButtonWrapper = () => {
    return (
        <div className="flex min-h-[200px] items-center justify-center bg-slate-800 px-4">
            <SpotlightButton />
        </div>
    );
};
export default function SpotlightButtonUsage() {
    return (
        <div>
            <ButtonWrapper />
        </div>
    );
}