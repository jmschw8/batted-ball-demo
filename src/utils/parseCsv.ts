import type { Hit } from "@/types/Hit";

export function parseCsv(text: string): Hit[] {
	const lines = text.trim().split("\n");
	const headers = lines[0].split(",").map((h) => h.trim());

	return lines.slice(1).map((line) => {
		const values = parseCsvLine(line);
		const row: Record<string, string> = {};
		headers.forEach((header, index) => {
			row[header] = values[index] ?? "";
		});
		return row as Hit;
	});
}

function parseCsvLine(line: string): string[] {
	const result: string[] = [];
	let current = "";
	let insideQuotes = false;

	for (let i = 0; i < line.length; i++) {
		const char = line[i];
		const nextChar = line[i + 1];

		if (char === '"' && insideQuotes && nextChar === '"') {
			current += '"';
			i++; // skip escaped quote
		} else if (char === '"') {
			insideQuotes = !insideQuotes;
		} else if (char === "," && !insideQuotes) {
			result.push(current);
			current = "";
		} else {
			current += char;
		}
	}
	result.push(current); // last value

	return result;
}
