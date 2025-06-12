import type { Hit } from "@/types/Hit";
import ChartCard from "../shared/ChartCard";
import { Chart } from "@highcharts/react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RangeSlider } from "../ui/rangeSlider";

type OutcomesPieChartProps = {
	data: Hit[];
};

// Values cribbed from https://api.highcharts.com/highcharts/colors
const colors: Record<string, string> = {
	Single: "#2caffe",
	Double: "#544fc5",
	Triple: "#00e272",
	HomeRun: "#fe6a35",
	Out: "#fa4b42",
	Walk: "#d568fb",
	Strikeout: "#feb56a",
};

const OutcomesByVelocity = ({ data }: OutcomesPieChartProps) => {
	// TODO should be parsing floats in fetch logic
	const sorted = data?.sort(
		(a, b) =>
			Math.ceil(parseFloat(a.EXIT_SPEED)) - Math.ceil(parseFloat(b.EXIT_SPEED))
	);
	console.log(sorted[sorted.length - 1].EXIT_SPEED);
	const maxVelocity = Math.ceil(
		parseFloat(sorted[sorted.length - 1].EXIT_SPEED)
	);
	const [selectedRange, setSelectedRange] = useState([0, maxVelocity]);
	const filteredData = data.filter((hit) => {
		const exitSpeed = Math.ceil(parseFloat(hit.EXIT_SPEED));
		return exitSpeed > selectedRange[0] && exitSpeed <= selectedRange[1];
	});

	const chartData = filteredData.reduce<Record<string, number>>((acc, hit) => {
		const outcome = hit.PLAY_OUTCOME;
		if (outcome && outcome !== "Undefined") {
			acc[outcome] = (acc[outcome] || 0) + 1;
		}
		return acc;
	}, {});

	const chartOptions: Highcharts.Options = {
		chart: {
			type: "pie",
		},
		tooltip: {
			pointFormat: "{series.name}: ({point.y})",
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: "pointer",
				dataLabels: {
					enabled: true,
					format: "<b>{point.name}</b>: {point.percentage:.1f}%",
				},
			},
		},
		series: [
			{
				name: "Total",
				type: "pie",
				data: Object.entries(chartData).map(([key, value]) => ({
					name: key,
					y: value,
					color: colors[key],
				})),
			},
		],
	};

	return (
		<ChartCard
			title="Outcomes by Exit Velocity"
			tooltip={
				"This displays the breakdowns of outcomes at a given range of exit velocities"
			}
		>
			<div className="flex flex-col gap-x-8">
				<div>
					<Label className="text-muted-foreground mb-4">
						Selected Velocities:
						<span>{`${selectedRange[0]} - ${selectedRange[1]} mph`}</span>
					</Label>
				</div>

				<RangeSlider
					defaultValue={selectedRange}
					onValueCommit={(val) => {
						setSelectedRange(val);
					}}
					min={0}
					max={maxVelocity}
				/>
			</div>
			<Chart options={chartOptions} />
		</ChartCard>
	);
};

export default OutcomesByVelocity;
