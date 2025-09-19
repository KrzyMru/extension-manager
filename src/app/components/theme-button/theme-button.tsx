import { useContext } from "react";
import Sun from "../../../assets/images/icon-sun.svg";
import Moon from "../../../assets/images/icon-moon.svg";
import { ThemeContext } from "../../../contexts/theme-context/theme-context";

const ThemeButton = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const icon = theme === "light" ? Sun : Moon;

    return (
        <button
            type="button"
            title="Toggle theme"
            onClick={toggleTheme}
            className="button button--theme"
        >
            <img 
                src={icon}
                alt="theme"
                className="theme__icon"
            />
        </button>
    );
}

export default ThemeButton;