import React from "react";

// Credit:
// https://www.edilozi.pro/docs/components/checkboxes

const GradientCheckbox = () => {
	return (
		<label className="relative block cursor-pointer select-none rounded-md text-3xl outline-2 outline-offset-1 outline-gray-700 has-focus-visible:outline-solid">
			<input className="peer absolute opacity-0" type="checkbox" />
			<div className="relative left-0 top-0 h-[1.6rem] w-[1.6rem] rounded-[0.3em] bg-background transition-all duration-300 after:absolute after:left-0 after:top-0 after:h-[1.6rem] after:w-[1.6rem] after:rotate-0 after:rounded-[0.3em] after:border-2 after:border-[rgba(0,0,0,0.863)] after:transition-all after:delay-100 after:duration-300 after:content-[''] peer-checked:bg-background peer-checked:shadow-[-13px_-13px_40px_0px_rgb(17,0,248),13px_-0_40px_0px_rgb(243,11,243),13px_-13px_40px_0px_rgb(253,228,0),13px_0_40px_0px_rgb(107,255,21),13px_13px_40px_0px_rgb(76,0,255),13px_13px_40px_0px_rgb(255,196,0),-13px_13px_40px_0px_rgb(90,105,240)] peer-checked:after:left-2 peer-checked:after:top-px peer-checked:after:h-[0.6em] peer-checked:after:w-[0.35em] peer-checked:after:rotate-45 peer-checked:after:rounded-none peer-checked:after:border-b-[0.1em] peer-checked:after:border-r-[0.1em] peer-checked:after:border-[rgba(238,238,238,0)_white_white_#fff0] dark:bg-background dark:after:border-[rgba(255,255,255,0.863)] dark:peer-checked:bg-background dark:peer-checked:after:border-[rgba(238,238,238,0)_black_black_#fff0]" />
		</label>
	);
};

export default GradientCheckbox;
