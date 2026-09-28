import clsx from "clsx";
import React from "react";

const SectionHeading = ({title}: {title: string}) => {
    return (
        <h2
            className={
                "heading-60-150 container scale-75 bg-background py-10 text-center text-foreground lg:py-20"
            }>
            {title}
        </h2>
    );
};

export default SectionHeading;