import { fetchBallData } from "@/api/hitData";
import BatterAvgDistanceChart from "@/components/charts/BatterAvgDistanceChart";
import HardestHits from "@/components/charts/HardestHits";
import LaunchAngleScatter from "@/components/charts/LaunchAngleScatter";
import OutcomesByVelocity from "@/components/charts/OutcomesByVelocityChart";
import PolarSpray from "@/components/charts/PolarSpray";
// import PolarSpray from "@/components/charts/PolarSpray";
import { LoadingSpinner } from "@/components/shared/Loading";
import type { Hit } from "@/types/Hit";
import { getRouteApi } from "@tanstack/react-router";

export const Route = createFileRoute({
	component: RouteComponent,
	loader: () => fetchBallData(),
	pendingComponent: () => <LoadingSpinner size={96} />,
});

function RouteComponent() {
	const routeApi = getRouteApi("/dashboard");

	// as Hit[] = Only because we know that fetchBallData() will always return (since it's just fetching locally). Just to avoid TS Compiler errors
	const data = routeApi.useLoaderData() as Hit[];

	const chartRegistry = [
		{ Component: () => <OutcomesByVelocity data={data} />, id: "outcomesByEV" },
		{
			Component: () => <LaunchAngleScatter data={data} />,
			id: "launchAngleScatter",
		},
		{
			Component: () => <PolarSpray data={data} />,
			id: "polarSpray",
		},
		{ Component: () => <BatterAvgDistanceChart data={data} />, id: "avgDist" },
		{ Component: () => <HardestHits data={data} />, id: "hardestHit" },
	];
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 justify-items-center gap-6 p-1 sm:p4 lg:p-8">
			{chartRegistry.map(({ Component, id }) => (
				<Component key={id} />
			))}
		</div>
	);
}
