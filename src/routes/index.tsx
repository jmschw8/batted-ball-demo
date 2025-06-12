import { fetchBallData } from "@/api/hitData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute({
	component: Index,
	loader: () => fetchBallData(),
});

function Index() {
	return (
		<div className="mx-auto max-w-5xl px-6 py-12">
			<Card className="shadow-xl">
				<CardHeader>
					<CardTitle className="text-3xl text-center mb-4 font-semibold">
						Batted Balls Demo Application
					</CardTitle>
					<p className="text-center text-muted-foreground">
						Collection of various visualizations based on historical batted ball
						data
					</p>
				</CardHeader>
				<Separator />
				<CardContent className="space-y-8 mt-6">
					<div>
						<h3 className="text-xl font-semibold mb-2">Tech Stack</h3>
						<ul className="list-disc list-inside text-muted-foreground space-y-1">
							<li>React + TypeScript</li>
							<li>Highcharts.js (@highcharts/react)</li>
							<li>Tailwind CSS</li>
							<li>shadcn/ui</li>
							<li>TanStack Router</li>
							<li>React Player (for videos)</li>
						</ul>
					</div>

					<div>
						<h3 className="text-xl font-semibold mb-2">Running Locally</h3>
						<ol className="list-decimal list-inside space-y-1 text-muted-foreground">
							<li>
								Clone the repo:{" "}
								<a
									href="#"
									className="text-primary hover:underline hover:text-primary/80"
								>
									GitHub Link
								</a>
							</li>
							<li>
								Install dependencies:
								<code className="ml-2 px-2 py-1 rounded bg-muted text-sm">
									pnpm install
								</code>
							</li>
							<li>
								Start the dev server:
								<code className="ml-2 px-2 py-1 rounded bg-muted text-sm">
									pnpm run dev
								</code>
							</li>
							<li>
								By default, accessible on{" "}
								<a
									className="text-primary hover:underline hover:text-primary/80"
									href={"http://localhost:5173/"}
								>
									http://localhost:5173/
								</a>
							</li>
						</ol>
					</div>
					<div className="flex justify-center">
						<Button asChild>
							<Link to="/dashboard">View Dashboard</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
