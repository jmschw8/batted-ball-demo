import { fetchBallData } from "@/api/hitData";
import HardestHits from "@/components/charts/HardestHits";
import { LoadingSpinner } from "@/components/shared/Loading";
import type { Hit } from "@/types/Hit";
import { getRouteApi } from "@tanstack/react-router";

export const Route = createFileRoute({
	component: RouteComponent,
	loader: () => fetchBallData(),
	pendingComponent: () => <LoadingSpinner size={96} />,
});

function RouteComponent() {
	const routeApi = getRouteApi("/hard-hits");

	// as Hit[] = Only because we know that fetchBallData() will always return (since it's just fetching locally). Just to avoid TS Compiler errors
	const data = routeApi.useLoaderData() as Hit[];
	return (
		<div className="chart-route-container">
			<HardestHits data={data} />
		</div>
	);
}
