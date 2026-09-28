import { Tabs } from "./component";

export const ShiftingDropDown = () => {
    return (
        <div className="flex h-96 w-full justify-start bg-neutral-950 p-8 text-neutral-200 md:justify-center">
            <Tabs />
        </div>
    );
};

export default function ShiftingDropdownUsage() {
    return (
        <div>
            <ShiftingDropDown />
        </div>
    );
}