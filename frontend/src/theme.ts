// theme.js
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/aldrich";
import "@fontsource-variable/genos";

// Custom theme
const theme = extendTheme({
  colors: {
    primary: { "100": "#00FFCC", "200": "#41F794" },
    secondary: {
      "100": "#5EEBFB",
      "200": "#13F7FD",
      "300": "#13004B",
    },
    tertiary: "#035829",
    background: "#1E1E1E",
    bgD: "#111622",
    bgL: "#13284B",
    black: "#121212",
    textPrimary: "#FFFFFF",
    textSecondary: "#B3B3B3",
    greyBox: "#D9D9D9",
    messageOutgoing: "#00FFCC",
    messageIncoming: "#333333",
    statusOnline: "#00FF00",
    statusAway: "#FFFF00",
    orangeV: "#F7CC41",
    statusBusy: "#FF0000",
    statusOffline: "#808080",
  },
  fonts: {
    heading: "'Genos Variable', sans-serif",
    body: "'Aldrich','Roboto', sans-serif",
  },
  styles: {
    global: {
      "html, body": {
        background: "background",
        color: "#FFFFFF",
      },
      "body, #root": {
        height: "100vh",
      },
      "*, *::before, &::after": {
        boxSizing: "border-box",
      },
    },
  },
});

export default theme;
