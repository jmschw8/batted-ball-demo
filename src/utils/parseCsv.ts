import type { Hit } from "@/types/Hit";
import Papa from "papaparse";

export const parseCsv = (text: string): Hit[] => {
	const result = Papa.parse(text, {
		header: true,
		skipEmptyLines: true,
		transform: (value: string, field: string) => {
			if (
				[
					"LAUNCH_ANGLE",
					"EXIT_SPEED",
					"EXIT_DIRECTION",
					"HIT_DISTANCE",
					"HANG_TIME",
					"HIT_SPIN_RATE",
				].includes(field)
			) {
				return parseFloat(value);
			}
			return value;
		},
	});
	return result.data as Hit[];
};
