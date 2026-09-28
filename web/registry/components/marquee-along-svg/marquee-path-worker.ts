/// <reference lib="webworker" />

import SVGPathCommander from "svg-path-commander";

export type MarqueePathWorkerPayload = {
	path: string;
	originalWidth: number;
	originalHeight: number;
	newWidth: number;
	newHeight: number;
};

self.onmessage = (e: MessageEvent<MarqueePathWorkerPayload>) => {
	const { path, originalWidth, originalHeight, newWidth, newHeight } = e.data;
	if (
		!path ||
		!originalWidth ||
		!originalHeight ||
		!Number.isFinite(newWidth) ||
		!Number.isFinite(newHeight)
	) {
		self.postMessage(path ?? "");
		return;
	}
	const sx = newWidth / originalWidth;
	const sy = newHeight / originalHeight;
	const scaled = SVGPathCommander.transformPath(path, {
		scale: [sx, sy, 1],
		origin: [0, 0, 0],
	});
	self.postMessage(SVGPathCommander.pathToString(scaled));
};
