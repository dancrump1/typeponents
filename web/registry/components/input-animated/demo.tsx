"use client";

import { useState } from "react";

import { InputAnimated } from "./component";

const InputPreview = () => {
	const [value, setValue] = useState("");

	return (
		<InputAnimated
			label="Email Address"
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
};

export default InputPreview;
