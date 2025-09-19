import { createContext, useEffect, useState, type ReactNode } from "react";
import type { ThemeContextProps } from "./types";

const ThemeContext = createContext<ThemeContextProps>({
    theme: "light",
    toggleTheme: () => {},
});

const ThemeProvider = ({ children } : { children: ReactNode }) => {
    const [theme, setTheme] = useState<"light"|"dark">(() => {
        const savedTheme = localStorage.getItem("theme");
        if(savedTheme && (savedTheme === "light" || savedTheme === "dark")) 
            return savedTheme;
        else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;   
            return prefersDark ? "dark" : "light";
        }
    });

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme); 
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export { ThemeContext, ThemeProvider };