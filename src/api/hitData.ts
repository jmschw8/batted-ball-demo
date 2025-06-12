import { parseCsv } from "@/utils/parseCsv";

export const fetchBallData = async () => {
	try {
		// Delay to simulate loading
		await new Promise((res) => setTimeout(res, 1500));
		const data = await fetch("/data/battedBallData.csv");
		const response = await data.text();
		const parsedData = parseCsv(response);
		return parsedData;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}
		console.error(error);
	}
};
