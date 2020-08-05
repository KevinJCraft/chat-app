import { createContext } from "react";

export const ThemeContext = createContext(null);
export const themes = {
  light: {
    backgroundColor: "white",
    color: "black",
  },
  dark: {
    backgroundColor: "black",
    color: "white",
  },
};
