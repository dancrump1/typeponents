const fs = require("fs");
const path = require("path");

const uiBasicPath = path.join(process.cwd(), "registry", "ui-basic");
const metaPath = path.join(process.cwd(), "data", "ui-basic-meta.json");

const fileNameToSlug = (fileName) => {
	const base = fileName.replace(/\.tsx$/, "");
	if (base.startsWith("comp-")) return base.toLowerCase();
	return base
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/_/g, "-")
		.toLowerCase();
};

const existing = fs.existsSync(metaPath)
	? JSON.parse(fs.readFileSync(metaPath, "utf8"))
	: {};

const files = fs.readdirSync(uiBasicPath).filter((f) => f.endsWith(".tsx"));
const next = { ...existing };

for (const file of files) {
	const slug = fileNameToSlug(file);
	if (!next[slug]) {
		next[slug] = {
			rating: 5,
			hidden: false,
			tags: ["ui-basic"],
			category: "ui-primitive",
			notes: "",
		};
	}
}

fs.mkdirSync(path.dirname(metaPath), { recursive: true });
fs.writeFileSync(metaPath, JSON.stringify(next, null, 2));
console.log(`ui-basic-meta.json: ${Object.keys(next).length} entries`);
