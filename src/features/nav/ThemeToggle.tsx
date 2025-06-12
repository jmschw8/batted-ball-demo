import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

const ThemeToggleButton = () => {
	const { setTheme, isDark } = useTheme();

	const toggleTheme = () => {
		if (!isDark) {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	};
	return (
		<Button className="cursor-pointer " variant="outline" onClick={toggleTheme}>
			{isDark ? <Sun /> : <Moon />}
		</Button>
	);
};

export default ThemeToggleButton;
