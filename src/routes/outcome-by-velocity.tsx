import { fetchBallData } from "@/api/hitData";
import OutcomesByVelocity from "@/components/charts/OutcomesByVelocityChart";
import { LoadingSpinner } from "@/components/shared/Loading";
import { getRouteApi } from "@tanstack/react-router";

export const Route = createFileRoute({
	component: RouteComponent,
	loader: () => fetchBallData(),
	pendingComponent: () => <LoadingSpinner size={96} />,
});

function RouteComponent() {
	// TODO Typically would be fetching from distinct enpdpoints, just setting a pattern
	const routeApi = getRouteApi("/outcome-by-velocity");
	const data = routeApi.useLoaderData();

	return (
		<div className="chart-route-container">
			{data && <OutcomesByVelocity data={data} />}
		</div>
	);
}
