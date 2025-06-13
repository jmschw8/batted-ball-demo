import { fetchBallData } from "@/api/hitData";
import PolarSpray from "@/components/charts/PolarSpray";
import type { Hit } from "@/types/Hit";
import { getRouteApi } from "@tanstack/react-router";

export const Route = createFileRoute({
	component: RouteComponent,
	loader: () => fetchBallData(),
});

function RouteComponent() {
	// TODO Typically would be fetching from distinct enpdpoints, just setting a pattern
	const routeApi = getRouteApi("/polar-spray");
	const data = routeApi.useLoaderData() as Hit[];
	return (
		<div className="chart-route-container">
			<PolarSpray data={data} />
		</div>
	);
}
