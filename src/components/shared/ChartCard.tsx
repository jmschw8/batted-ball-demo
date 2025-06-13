import { cn } from "@/lib/utils";
import { Card, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Info } from "lucide-react";
type ChartCardProps = {
	children: React.ReactNode;
	title: string;
	tooltip?: string;
};

const ChartCard = ({ children, title, tooltip }: ChartCardProps) => {
	return (
		<Card className={cn("p-5 w-full max-w-xl ")}>
			<CardHeader>
				<div className="flex justify-center gap-x-4 items-center mb-4">
					<h3 className="text-2xl ">{title}</h3>
					{tooltip && (
						// TODO Not working on mobile, suggested to use popover
						<Tooltip>
							<TooltipTrigger>
								<Info size={16} />
							</TooltipTrigger>
							<TooltipContent className="p-4">
								<p className="text-wrap">{tooltip}</p>
							</TooltipContent>
						</Tooltip>
					)}
				</div>
				<Separator />
			</CardHeader>
			{children}
		</Card>
	);
};

export default ChartCard;
