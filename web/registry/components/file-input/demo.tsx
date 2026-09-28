"use client";

import FileInput from "./component";

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center overflow-hidden p-8">
			<FileInput allowMultiple onFileChange={(files) => console.log(files)} />
		</div>
	);
}
