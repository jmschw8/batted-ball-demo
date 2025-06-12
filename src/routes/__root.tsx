import Navbar from "@/features/nav/Navbar";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<Navbar />
			<main className="p-1 lg:p-8 ">
				<Outlet />
			</main>
		</>
	);
}
