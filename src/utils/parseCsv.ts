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
		const hit: Hit = {
			BATTER_ID: row.BATTER_ID,
			BATTER: row.BATTER,
			PITCHER_ID: row.PITCHER_ID,
			PITCHER: row.PITCHER,
			GAME_DATE: row.GAME_DATE,
			LAUNCH_ANGLE: parseFloat(row.LAUNCH_ANGLE),
			EXIT_SPEED: parseFloat(row.EXIT_SPEED),
			EXIT_DIRECTION: parseFloat(row.EXIT_DIRECTION),
			HIT_DISTANCE: parseFloat(row.HIT_DISTANCE),
			HANG_TIME: parseFloat(row.HANG_TIME),
			HIT_SPIN_RATE: parseFloat(row.HIT_SPIN_RATE),
			PLAY_OUTCOME: row.PLAY_OUTCOME,
			VIDEO_LINK: row.VIDEO_LINK,
		};
		return hit;
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
