import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
////////////////////////////////
// localStorage.setItem("dark", !dark ? "true" : "false");
// localStorage.getItem("dark") !== "false" ? true : false
// useEffect(() => {
//   setdark(
//     window.matchMedia &&
//       window.matchMedia("(prefers-color-scheme: dark)").matches
//   );
//   window
//     .matchMedia("(prefers-color-scheme: dark)")
//     .addEventListener("change", (event) => {
//       setdark(event.matches);
//     });
// }, []);
////////////////////////////////

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          text: {
            primary: "#2B3445",
            button: "#2B3445",
            main: "#000",
          },
          body_color: {
            primary: "#f6f6f6",
            main: "#fff",
          },
          grey_: {
            primary: grey[100],
          },
          bg_main: {
            primary: "#f3f5f9",
            main: "#fff",
      
          },
          neutral: {
            main: "#64748B",
          },

          favColor: {
            main: grey[300],
          },
          red_main: {
            main: "#d23f57",
            primary:"#e94560",
          },
        }
      : {
          // palette values for dark mode
          neutral: {
            main: "#64748B",
          },
          bg_main: {
            primary: "#999",
            main: "#000",
          },
          grey_: {
            primary: grey[600],
          },

          favColor: {
            main: grey[800],
          },
          body_color: {
            primary: grey[900],
          },
          text: {
            primary: "#fff",
            main: "#fff",
            button: "#888",
          },
          red_main: {
            main: "#d23f57",
            primary:"#e94560",
          },
        }),
  },
});

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});
export const DialogContext = createContext();
// localStorage.clear();
export const useMode = () => {
  const [mode, setMode] = useState(
    // localStorage.getItem("mode") ? localStorage.getItem("mode") : "light"
    localStorage.getItem("mode")
      ? localStorage.getItem("mode")
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return [theme, colorMode];
};
