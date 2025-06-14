import type { Hit } from "@/types/Hit";
import ChartCard from "../shared/ChartCard";
import { Chart } from "@highcharts/react";
import Highcharts from "highcharts/highcharts.src";
import { colors } from "@/utils/constants";

type LaunchAngleScatterProps = {
	data: Hit[];
};

const LaunchAngleScatter = ({ data }: LaunchAngleScatterProps) => {
	const mappedData = data?.reduce<
		Record<"HomeRun" | "Single" | "Double" | "Triple", [number, number][]>
	>((acc, curr) => {
		const outcome = curr.PLAY_OUTCOME;
		if (
			outcome === "HomeRun" ||
			outcome === "Single" ||
			outcome === "Double" ||
			outcome === "Triple"
		) {
			if (!acc[outcome]) {
				acc[outcome] = [];
			}
			acc[outcome].push([curr.EXIT_SPEED, curr.LAUNCH_ANGLE]);
		}

		return acc;
	}, {} as Record<"HomeRun" | "Single" | "Double" | "Triple", [number, number][]>);

	const series: Highcharts.SeriesOptionsType[] = Object.entries(mappedData).map(
		([key, value]) => ({
			name: key,
			color: colors[key],
			data: value,
			type: "scatter",
		})
	);
	const chartOptions: Highcharts.Options = {
		chart: {
			type: "scatter",
		},
		tooltip: {
			pointFormat: "{series.name}: {point.x} mph",
		},
		yAxis: {
			title: {
				text: "Launch Angle",
			},
			labels: {
				format: "{value} deg",
			},
			showLastLabel: true,
			startOnTick: true,
			endOnTick: true,
		},
		xAxis: {
			title: { text: "Exit Velocity" },
			labels: { format: "{value} mph" },
		},
		plotOptions: {
			scatter: {
				marker: {
					radius: 3,
					symbol: "circle",
				},
				cursor: "pointer",
				dataLabels: {},
			},
		},
		series: series,
	};

	return (
		<ChartCard
			title={"Launch Angle Scatter Plot"}
			tooltip="Displays a scatter plot of launch angle vs velocity, encoded by result"
		>
			<Chart options={chartOptions} />
		</ChartCard>
	);
};

export default LaunchAngleScatter;
