import { Link } from "@tanstack/react-router";
import ThemeToggleButton from "./ThemeToggle";
import { Button } from "@/components/ui/button";

const links = [
	{
		text: "Dashboard",
		path: "/dashboard",
	},
	{
		text: "Outcome By Velocity",
		path: "/outcome-by-velocity",
	},
	{
		text: "Avg Distance",
		path: "/average-distance",
	},
	{
		text: "Hardest Hits",
		path: "/hard-hits",
	},
];

const Navbar = () => {
	return (
		<nav className="flex flex-row justify-between items-center p-2 sm:p-4 bg-accent text-accent-foreground border-b-2 shadow-md shadow-sidebar-accent">
			<div className="hidden md:flex items-center">
				<Link to="/" className="text-2xl">
					Batted Balls Dashboard
				</Link>
			</div>
			<div className="flex gap-x-4">
				{links.map((link) => (
					<Button asChild key={link.text} variant={"outline"}>
						<Link to={link.path} key={link.text}>
							{link.text}
						</Link>
					</Button>
				))}
			</div>
			<div>
				<ThemeToggleButton />
			</div>
		</nav>
	);
};

export default Navbar;
