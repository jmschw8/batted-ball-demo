import type { Hit } from "@/types/Hit";
import ChartCard from "../shared/ChartCard";
import { Chart } from "@highcharts/react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RangeSlider } from "../ui/rangeSlider";
import { colors } from "@/utils/constants";
import {
	Select,
	SelectValue,
	SelectTrigger,
	SelectContent,
	SelectItem,
} from "../ui/select";
import { Switch } from "../ui/switch";

type OutcomesPieChartProps = {
	data: Hit[];
};

const OutcomesByVelocity = ({ data }: OutcomesPieChartProps) => {
	const sorted = data?.sort((a, b) => a.EXIT_SPEED - b.EXIT_SPEED);
	const maxVelocity = Math.ceil(sorted[sorted.length - 1].EXIT_SPEED);

	const step = 5;
	const ranges = Array.from({ length: maxVelocity / step }, (_, i) => [
		i * step,
		i * step + step,
	]);

	const [selectedRange, setSelectedRange] = useState([0, maxVelocity]);
	const [showCustomRange, setShowCustomRange] = useState(false);

	const filteredData = data.filter((hit) => {
		const exitSpeed = Math.ceil(hit.EXIT_SPEED);
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
				<div className="flex gap-2 text-muted-foreground text-xs mb-4">
					<Label>Use Custom Range?</Label>
					<Switch
						name="showCustomRange"
						checked={showCustomRange}
						onCheckedChange={setShowCustomRange}
					/>
				</div>

				{showCustomRange ? (
					<RangeSlider
						defaultValue={selectedRange}
						onValueCommit={(val) => {
							setSelectedRange(val);
						}}
						min={0}
						max={maxVelocity}
					/>
				) : (
					<Select
						onValueChange={(value) => setSelectedRange(JSON.parse(value))}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select Range" />
						</SelectTrigger>
						<SelectContent className="max-h-60 overflow-y-auto">
							<SelectItem value={JSON.stringify([0, maxVelocity])}>
								All
							</SelectItem>
							{ranges.map(([min, max]) => (
								<SelectItem
									value={JSON.stringify([min, max])}
								>{`${min} - ${max} mph`}</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}

				<div>
					<Label className="text-muted-foreground mt-4">
						Selected Velocities:
						<span>{`${selectedRange[0]} - ${selectedRange[1]} mph`}</span>
					</Label>
				</div>
			</div>
			<Chart options={chartOptions} />
		</ChartCard>
	);
};

export default OutcomesByVelocity;
