import { fetchBallData } from "@/api/hitData";
import LaunchAngleScatter from "@/components/charts/LaunchAngleScatter";
import type { Hit } from "@/types/Hit";
import { getRouteApi } from "@tanstack/react-router";

export const Route = createFileRoute({
	component: RouteComponent,
	loader: () => fetchBallData(),
});

function RouteComponent() {
	const routeApi = getRouteApi("/launch-angle");
	const data = routeApi.useLoaderData() as Hit[];
	return (
		<div className="chart-route-container">
			<LaunchAngleScatter data={data} />
		</div>
	);
}
