import type { Hit } from "@/types/Hit";
import ChartCard from "../shared/ChartCard";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import ReactPlayer from "react-player";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { ChevronDownIcon, Eye } from "lucide-react";
import { useState } from "react";
import { Calendar } from "../ui/calendar";
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
					<ReactPlayer playing width="100%" height="100%" url={url} />
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
	const [open, setOpen] = useState(false);
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
	console.log(date);
	return (
		<ChartCard title={"Hard Hit Balls by Date"}>
			<div className="flex">
				<Label htmlFor="date" className="m-2">
					Date of Games
				</Label>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className="w-48 justify-between font-normal"
						>
							{date
								? `${date.from?.toLocaleDateString()} - ${date.to?.toLocaleDateString()}`
								: "Select date"}
							<ChevronDownIcon />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto overflow-hidden p-0" align="start">
						<Calendar
							mode="range"
							selected={date}
							defaultMonth={date?.from}
							captionLayout="dropdown"
							onSelect={(date) => date && setDate(date)}
						/>
						<div className="flex justify-center">
							<Button
								className="p-2 mb-2 "
								variant="default"
								onClick={() => setOpen(false)}
							>
								Close
							</Button>
						</div>
					</PopoverContent>
				</Popover>
			</div>
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
							<TableCell>{hit.BATTER}</TableCell>
							<TableCell>{hit.PITCHER}</TableCell>
							<TableCell>{hit.EXIT_SPEED.toFixed(2)}</TableCell>
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
			{/* TODO Pagination */}
			<VideoDialog
				open={videoModalConfig.open}
				url={videoModalConfig.url}
				onOpenChange={() => {
					setVideoModalConfig(defaultVideoState);
				}}
			/>
		</ChartCard>
	);
};

export default HardestHits;
