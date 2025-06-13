import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import type { DateRange } from "react-day-picker";
type DaterPickerProps = {
	date: DateRange;
	setDate: (date: DateRange) => void;
};
const DaterPicker = ({ date, setDate }: DaterPickerProps) => {
	const [open, setOpen] = useState(false);
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" className="w-48 justify-between font-normal">
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
	);
};

export default DaterPicker;
