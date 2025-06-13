import type { Hit } from "@/types/Hit";
import ChartCard from "../shared/ChartCard";
import ReactPlayer from "react-player";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import type { DateRange } from "react-day-picker";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { formatName } from "@/utils/utils";
import DaterPicker from "../shared/DaterPicker";
import { Eye } from "lucide-react";

type VideoProps = {
	url: string | undefined;
	open: boolean;
	onOpenChange: (val: boolean) => void;
};
const VideoDialog = ({ url, open, onOpenChange }: VideoProps) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="w-96 md:w-lg lg:w-xl p-2">
				{/* Getting rid of a11y warning, not for production */}
				<DialogHeader className="hidden">
					<DialogTitle>HardHitBallVideo</DialogTitle>
					<DialogDescription>video of baseball hit</DialogDescription>
				</DialogHeader>

				<div className="w-full">
					{/* Issue with video, keeps playing after modal close. TBD why */}
					<ReactPlayer playing={open} width="100%" height="100%" url={url} />
				</div>
			</DialogContent>
		</Dialog>
	);
};

type HardestHitsProps = { data: Hit[] };

const HardestHits = ({ data }: HardestHitsProps) => {
	const [date, setDate] = useState<DateRange>({
		from: new Date("4/10/2018"),
		to: new Date("4/17/2018"),
	});
	const defaultVideoState = { open: false, url: undefined };

	const [videoModalConfig, setVideoModalConfig] = useState<{
		open: boolean;
		url: string | undefined;
	}>(defaultVideoState);

	const filteredData = data
		.sort((a, b) => b.EXIT_SPEED - a.EXIT_SPEED)
		.filter((hit) => {
			const gameDate = new Date(hit.GAME_DATE);
			if (date.from && date.to) {
				return gameDate >= date.from && gameDate <= date.to;
			}
			return true;
		})
		.slice(0, 7);
	return (
		<ChartCard
			title={"Hard Hit Balls by Date"}
			tooltip="Displays the top hardest hit balls, filterable by a date range"
		>
			<div>
				<Label className="m-2">Date Range</Label>
				<DaterPicker date={date} setDate={setDate} />
			</div>
			{filteredData.length > 0 ? (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Player</TableHead>
							<TableHead>Pitcher</TableHead>
							<TableHead>Exit Velocity</TableHead>
							<TableHead>Video</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredData.map((hit) => (
							<TableRow key={`${hit.BATTER_ID}-${hit.EXIT_SPEED}`}>
								<TableCell>{formatName(hit.BATTER)}</TableCell>
								<TableCell>{formatName(hit.PITCHER)}</TableCell>
								<TableCell>{`${hit.EXIT_SPEED.toFixed(2)} mph`}</TableCell>
								<TableCell>
									<Button
										variant="ghost"
										onClick={() =>
											setVideoModalConfig({ url: hit.VIDEO_LINK, open: true })
										}
									>
										<Eye />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			) : (
				<div className="w-full h-72 flex flex-col justify-center">
					<h3 className="text-xl text-center">
						There is no data for the specified date range
					</h3>
				</div>
			)}
			{/* TODO Pagination */}
			{videoModalConfig.open && (
				<VideoDialog
					open={videoModalConfig.open}
					url={videoModalConfig.url}
					onOpenChange={() => {
						setVideoModalConfig(defaultVideoState);
					}}
				/>
			)}
		</ChartCard>
	);
};

export default HardestHits;
