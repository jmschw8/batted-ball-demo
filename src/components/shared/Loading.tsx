import { cn } from "@/lib/utils";

export const LoadingSpinner = ({
	size = 32,
	className,
}: {
	className?: string;
	size?: number;
}) => {
	return (
		<div className={cn(className, "flex items-center justify-center ")}>
			<div
				className="animate-spin border-4 border-b-cyan-600 rounded-full"
				style={{ width: `${size}px`, height: `${size}px` }}
			/>
		</div>
	);
};
