import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("medium");
  const [fontMode, setFontMode] = useState("default");
  const [device, setDevice] = useState("desktop");
  const [layoutWidth, setLayoutWidth] = useState("fullWidth");


  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    document.documentElement.style.fontSize =
      fontSize === "small" ? "13px" : fontSize === "large" ? "18px" : "16px";

    if (fontMode === "dyslexic") {
      document.documentElement.style.fontFamily =
        "OpenDyslexic, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    } else if (fontMode === "serif") {
      document.documentElement.style.fontFamily =
        "Georgia, 'Times New Roman', serif";
    } else {
      document.documentElement.style.fontFamily =
        "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    }
  }, [theme, fontSize, fontMode]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        fontSize,
        setFontSize,
        fontMode,
        setFontMode,
        device,
        setDevice,
        layoutWidth,
        setLayoutWidth,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
