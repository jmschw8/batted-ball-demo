import { fetchBallData } from "@/api/hitData";
import BatterAvgDistanceChart from "@/components/charts/BatterAvgDistanceChart";
import { LoadingSpinner } from "@/components/shared/Loading";
import { getRouteApi } from "@tanstack/react-router";

export const Route = createFileRoute({
	component: RouteComponent,
	loader: () => fetchBallData(),
	pendingComponent: () => <LoadingSpinner size={96} />,
});

function RouteComponent() {
	const routeApi = getRouteApi("/average-distance");
	const data = routeApi.useLoaderData();

	return (
		<div className="chart-route-container">
			{data && <BatterAvgDistanceChart data={data} />}
		</div>
	);
}
