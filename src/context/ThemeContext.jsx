import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "");
  const toggleTheme = () => {
    if (theme === "") {
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      setTheme("");
      localStorage.setItem("theme", "");
    }
  };
  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);
export { useTheme, ThemeProvider };
