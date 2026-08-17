import { useTheme } from "../context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

function ThemeToggle({ className }: Readonly<ThemeToggleProps>) {
  const { theme, toggleTheme } = useTheme();
  const light = theme === "light";

  return (
    <button
      type="button"
      className={`theme-toggle ctrl-btn ${className ?? ""}`}
      onClick={toggleTheme}
      aria-label="Switch between dark and light mode"
    >
      <span className="theme-flip" aria-hidden="true">
        <span className="theme-flip-f">NIGHT</span>
        <span className="theme-flip-f">DAY</span>
      </span>
    </button>
  );
}

export default ThemeToggle;