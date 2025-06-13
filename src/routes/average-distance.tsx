import { fetchBallData } from "@/api/hitData";
import BatterAvgDistanceChart from "@/components/charts/BatterAvgDistanceChart";
import { LoadingSpinner } from "@/components/shared/Loading";
import type { Hit } from "@/types/Hit";
import { getRouteApi } from "@tanstack/react-router";

export const Route = createFileRoute({
	component: RouteComponent,
	loader: () => fetchBallData(),
	pendingComponent: () => <LoadingSpinner size={96} />,
});

function RouteComponent() {
	const routeApi = getRouteApi("/average-distance");
	const data = routeApi.useLoaderData() as Hit[];

	return (
		<div className="chart-route-container">
			<BatterAvgDistanceChart data={data} />
		</div>
	);
}
