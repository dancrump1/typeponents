import type React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../atoms/select";

function SelectModel({ laneOptions, moveCard }) {
	return (
		<Select onValueChange={(value) => moveCard(value)}>
			<SelectTrigger>
				<div>...</div>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{laneOptions.map(({ title, id }) => (
						<SelectItem value={id} key={title}>
							{title}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

export { SelectModel };
