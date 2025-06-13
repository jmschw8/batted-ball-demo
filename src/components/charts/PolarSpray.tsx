import type { Hit } from "@/types/Hit";
import ChartCard from "../shared/ChartCard";
import { colors } from "@/utils/constants";
import { Chart } from "@highcharts/react";
import type { Options } from "highcharts";
import * as Highcharts from "highcharts";
import "highcharts/highcharts-more";
import { Label } from "../ui/label";
import DaterPicker from "../shared/DaterPicker";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

type PolarSprayProps = {
	data: Hit[];
};
const PolarSpray = ({ data }: PolarSprayProps) => {
	const [date, setDate] = useState<DateRange>({
		from: new Date("4/11/2018"),
		to: new Date("4/11/2018"),
	});

	const filtered = data.filter((hit) => {
		const gameDate = new Date(hit.GAME_DATE);
		if (date.from && date.to) {
			return gameDate >= date.from && gameDate <= date.to;
		}
		return true;
	});
	const mappedData = filtered?.reduce<
		Record<
			"HomeRun" | "Single" | "Double" | "Triple" | "Out",
			[number, number][]
		>
	>((acc, curr) => {
		const outcome = curr.PLAY_OUTCOME;
		if (
			outcome === "HomeRun" ||
			outcome === "Single" ||
			outcome === "Double" ||
			outcome === "Triple" ||
			outcome === "Out"
		) {
			if (!acc[outcome]) {
				acc[outcome] = [];
			}
			acc[outcome].push([curr.EXIT_DIRECTION, curr.HIT_DISTANCE]);
		}

		return acc;
	}, {} as Record<"HomeRun" | "Single" | "Double" | "Triple" | "Out", [number, number][]>);

	const series: Highcharts.SeriesOptionsType[] = Object.entries(mappedData).map(
		([key, value]) => ({
			name: key,
			color: colors[key],
			data: value,
			type: "scatter",
		})
	);

	const chartOptions: Options = {
		chart: {
			polar: true,
			type: "scatter",
			zooming: {
				mouseWheel: {
					enabled: true,
					type: "xy",
				},
				type: "xy",
			},
		},

		pane: {
			startAngle: -45,
			endAngle: 45,
		},
		xAxis: {
			min: -45,
			max: 45,
			tickInterval: 20,
			labels: {
				format: "{value} deg",
			},
		},
		yAxis: {
			min: 0,
			max: 500,
			title: {
				text: "Distance (ft)",
			},
		},
		tooltip: {
			pointFormat:
				"Distance: <b>{point.y} ft</b><br/>Direction: <b>{point.x}°</b>",
		},
		plotOptions: {
			scatter: {
				marker: {
					radius: 3,
				},
			},
		},
		series,
	};

	return (
		<ChartCard
			title="Hit Placement"
			tooltip="Displays the hit placement of batted balls, encoded with the outcome"
		>
			{/* Never is hacky fix to get around type error- something to do with highcharts-more */}
			<div>
				<Label className="m-2">Date Range</Label>
				<DaterPicker date={date} setDate={setDate} />
			</div>
			<Chart highcharts={Highcharts} options={chartOptions as never} />
		</ChartCard>
	);
};

export default PolarSpray;
