import type { Hit } from "@/types/Hit";
import { useMemo, useState } from "react";
import ChartCard from "../shared/ChartCard";
import { Chart } from "@highcharts/react";
import type * as Highcharts from "highcharts";
import { MultiSelect } from "../ui/multi-select";
import { Badge } from "../ui/badge";
import { outComes } from "@/utils/constants";
import { formatName } from "@/utils/utils";

type BatterAvgDistanceChartProps = {
	data: Hit[];
};

function getUniqueBatters(data: Hit[]) {
	const uniques = new Set();
	return data.reduce<{ id: string; name: string }[]>((acc, curr) => {
		if (!uniques.has(curr.BATTER_ID)) {
			uniques.add(curr.BATTER_ID);
			acc.push({ id: curr.BATTER_ID, name: curr.BATTER });
		}
		return acc;
	}, []);
}

const BatterAvgDistanceChart = ({ data }: BatterAvgDistanceChartProps) => {
	const [selectedBatter, setSelectedBatter] = useState<string[]>([]);
	const [selectedOutcome, setSelectedOutcome] = useState("");

	const batters = useMemo(
		() =>
			getUniqueBatters(data)
				.sort((a, b) => a.name.localeCompare(b.name))
				.map((batter) => ({
					label: batter.name,
					value: batter.id,
				})),
		[data]
	);

	const filteredData = useMemo(() => {
		const set = selectedBatter
			? data
					.filter((hit) => selectedBatter.includes(hit.BATTER_ID))
					.filter((hit) => {
						if (selectedOutcome) {
							return hit.PLAY_OUTCOME === selectedOutcome;
						} else {
							return hit;
						}
					})
			: data;

		const map = new Map<string, Hit[]>();

		for (const hit of set) {
			if (!map.has(hit.BATTER_ID)) {
				map.set(hit.BATTER_ID, []);
			}
			map.get(hit.BATTER_ID)!.push(hit);
		}

		return Array.from(map.entries()).map(([id, hits]) => {
			const avgDistance = Math.floor(
				hits.reduce((acc, curr) => acc + curr.HIT_DISTANCE, 0) / hits.length
			);
			const batter = batters.find((b) => b.value === id);
			return { name: batter ? formatName(batter.label) : "", y: avgDistance };
		});
	}, [data, selectedBatter, batters, selectedOutcome]);

	const chartOptions: Highcharts.Options = {
		chart: {
			type: "bar",
		},
		xAxis: {
			type: "category",
			title: {
				text: "Batters",
			},
		},
		yAxis: {
			title: {
				text: "Average Distance (feet)",
			},
		},
		tooltip: {
			pointFormat: "Average Distance: <b>{point.y} ft</b>",
		},
		series: [
			{
				type: "bar",
				name: "Average Distance",
				data: filteredData,
				colorByPoint: true,
				dataLabels: {
					enabled: true,
					format: "{y} ft",
					align: "right",
					inside: true,
					style: {
						fontWeight: "bold",
						textOutline: "none",
					},
				},
			},
		],
	};
	return (
		<ChartCard
			title="Average Batted Ball Distance by Player"
			tooltip="Displays the average batted ball distance per batter"
		>
			<div className="flex flex-col gap-4">
				<MultiSelect
					options={batters}
					onValueChange={setSelectedBatter}
					defaultValue={selectedBatter}
					placeholder="Select Player"
					disableSelectAll
				/>
				<div className="flex justify-center flex-wrap gap-2">
					{outComes
						.filter((outcome) => outcome.value !== "Sacrifice")
						.map((outcome) => {
							const isSelected = selectedOutcome === outcome.value;
							return (
								<Badge
									className="cursor-pointer"
									key={outcome.value}
									onClick={() =>
										setSelectedOutcome(isSelected ? "" : outcome.value)
									}
									variant={isSelected ? "default" : "secondary"}
								>
									{outcome.label}
								</Badge>
							);
						})}
				</div>
			</div>
			<div>
				{selectedBatter.length > 0 ? (
					filteredData.length > 0 ? (
						<Chart options={chartOptions as never} />
					) : (
						<div className="w-full h-72 flex flex-col justify-center">
							<h3 className="text-xl text-center">
								There is no data with your selected filters
							</h3>
						</div>
					)
				) : (
					<div className="w-full h-72 flex flex-col justify-center">
						<h3 className="text-xl text-center">
							Please select a minimum of one player
						</h3>
					</div>
				)}
			</div>
		</ChartCard>
	);
};

export default BatterAvgDistanceChart;
