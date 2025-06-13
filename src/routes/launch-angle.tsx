import { fetchBallData } from "@/api/hitData";
import LaunchAngleScatter from "@/components/charts/LaunchAngleScatter";
import { getRouteApi } from "@tanstack/react-router";

export const Route = createFileRoute({
	component: RouteComponent,
	loader: () => fetchBallData(),
});

function RouteComponent() {
	const routeApi = getRouteApi("/launch-angle");
	const data = routeApi.useLoaderData();
	return (
		<div className="chart-route-container">
			{data && <LaunchAngleScatter data={data} />}
		</div>
	);
}
