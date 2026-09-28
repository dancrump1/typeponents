/**
 * Extracts the source URL from `// Credit:` header comments in component files.
 *
 * Authors wrote these by hand, so the shapes vary: `// Credit:`, `//Credit`,
 * `// Credits:`, URL on the same line or on one of the next comment lines,
 * and occasionally a bare host with no protocol.
 */

const fs = require("fs");

const CREDIT_LINE = /^\s*\/\/\s*credits?\b:?(.*)$/i;
const COMMENT_LINE = /^\s*\/\/+\s*(.*)$/;
const URL_PATTERN = /(https?:\/\/[^\s"'`)<>]+|www\.[^\s"'`)<>]+)/i;

// How many comment lines after the `// Credit:` marker to search for a URL.
const LOOKAHEAD_LINES = 4;

const normalizeCreditUrl = (text) => {
	const match = text.match(URL_PATTERN);
	if (!match) return null;

	const url = match[1].replace(/[.,;:)\]}]+$/, "");
	return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const extractCreditFromSource = (source) => {
	const lines = source.split(/\r?\n/);

	for (let i = 0; i < lines.length; i++) {
		const creditMatch = lines[i].match(CREDIT_LINE);
		if (!creditMatch) continue;

		const inlineUrl = normalizeCreditUrl(creditMatch[1]);
		if (inlineUrl) return inlineUrl;

		const lastLine = Math.min(i + LOOKAHEAD_LINES, lines.length - 1);
		for (let j = i + 1; j <= lastLine; j++) {
			const commentMatch = lines[j].match(COMMENT_LINE);
			if (!commentMatch) break;

			const url = normalizeCreditUrl(commentMatch[1]);
			if (url) return url;
		}
	}

	return null;
};

/** First credit found across the given files, in priority order. */
const extractCreditFromFiles = (filePaths) => {
	for (const filePath of filePaths) {
		if (!filePath || !fs.existsSync(filePath)) continue;

		const credit = extractCreditFromSource(fs.readFileSync(filePath, "utf8"));
		if (credit) return credit;
	}

	return null;
};

module.exports = { extractCreditFromSource, extractCreditFromFiles };
